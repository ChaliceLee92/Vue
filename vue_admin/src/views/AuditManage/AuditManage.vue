<template>
    <div class="material">
        <div class="material_title">
            <!-- 条件栏 -->
            <TableFilter
                :query.sync="filterInfo.query"
                :filter-list="filterInfo.list"
                :list-type-info="listTypeInfo"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
            />
        </div>
        <!-- 表格内容 -->
        <TableComponent
            :refresh="tableInfo.refresh"
            :init-curpage="tableInfo.initCurpage"
            :data.sync="tableInfo.data"
            :api="getTeacherList"
            tabIndex
            :query="filterInfo.query"
            :field-list="tableInfo.fieldList"
            :list-type-info="listTypeInfo"
            :handle="tableInfo.handle"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
        >
            <!-- 自定义插槽状态按钮 -->
            <template v-slot:bt-status="scope">
                <div
                    style="display: flex;align-items: center;justify-content: center;flex-direction: column;"
                >
                    <img
                        src="https://qcdn.beautifulreading.com/a6bdafefecbbeab028c476fa9a75986a?imageView2/1/w/80/h/80"
                        alt=""
                        style="margin-bottom: 5px"
                    />
                    <el-button
                        v-if="
                            scope.data.item.show &&
                                (!scope.data.item.ifRender ||
                                    scope.data.item.ifRender(scope.data.row))
                        "
                        v-waves
                        size="mini"
                        :type="
                            scope.data.row.status - 1 >= 0
                                ? 'danger'
                                : 'success'
                        "
                        :icon="scope.data.item.icon"
                        :disabled="scope.data.item.disabled"
                        :loading="scope.data.row[scope.data.item.loading]"
                        @click="
                            handleClick(scope.data.item.event, scope.data.row)
                        "
                    >
                        {{ scope.data.row.status | AuditStatus }}
                    </el-button>
                </div>
            </template>
        </TableComponent>
        <div>
            <ComponentDialog
                :title="dialogInfo.title[dialogInfo.type]"
                :visible.sync="dialogInfo.visible"
                :width="dialogInfo.width"
                :bt-loading="dialogInfo.btLoading"
                :bt-list="dialogInfo.btList"
                @handleClick="handleClick"
                @handleEvent="handleEvent"
            >
                <ComponentForm
                    :ref-obj.sync="formInfo.ref"
                    :data="formInfo.data"
                    :field-list="formInfo.fieldList"
                    :rules="formInfo.rules"
                    :label-width="formInfo.labelWidth"
                    :list-type-info="listTypeInfo"
                >
                </ComponentForm>
            </ComponentDialog>
        </div>
    </div>
</template>

<script>
import { getTeacherList } from '@/http/interface/AuditManage.js'
import { switchTime, initRules } from '@utils/mUtils'

export default {
    name: 'material',
    data() {
        return {
            getTeacherList,
            // 表格相关
            tableInfo: {
                refresh: 1,
                initCurpage: 1,
                data: [],
                fieldList: [
                    { label: '账号名称', value: 'account' },
                    { label: '真实姓名', value: 'name' },
                    { label: '微信名称', value: 'nickName' },
                    { label: '手机号码', value: 'mobile' },
                    { label: '学校', value: 'school' },
                    { label: '年级班级', value: 'grade' },
                    { label: '地区', value: 'area' },
                    { label: '学校类型', value: 'area' },
                    { label: '学校阶段', value: 'area' },
                    { label: '来源', value: 'area' },
                    { label: '申请时间', value: 'source' }
                ],
                handle: {
                    fixed: 'right',
                    label: '认证',
                    width: '200',
                    btList: [
                        {
                            label: '查看',
                            type: 'success',
                            icon: 'el-icon-refresh',
                            event: 'status',
                            loading: 'statusLoading',
                            show: true,
                            slot: true
                        }
                    ]
                }
            },
            // 过滤相关配置
            filterInfo: {
                // api 参数
                query: {
                    key: '',
                    userName: '',
                    source: ''
                },
                // 控制筛选头部组件的配置
                list: [
                    { type: 'input', label: '搜索内容', value: 'title' },
                    {
                        type: 'select',
                        label: '用户',
                        value: 'userName',
                        list: 'screeningUser'
                    },
                    {
                        type: 'select',
                        label: '来源',
                        value: 'source',
                        list: 'source'
                    },
                    {
                        type: 'button',
                        label: '查询',
                        btType: 'primary',
                        icon: 'el-icon-search',
                        event: 'search',
                        show: true
                    },
                    {
                        type: 'button',
                        label: '导出表格',
                        btType: 'primary',
                        icon: 'el-icon-search',
                        event: 'export',
                        show: true
                    }
                ]
            },
            // 相关筛选列表
            listTypeInfo: {
                statusList: [
                    { key: '启用', value: 1 },
                    { key: '禁用', value: 0 }
                ],
                // 来源过滤
                filterSource: [
                    { key: '最美诵读', value: 0 },
                    { key: '诗教课堂', value: 1 },
                    { key: '迦凌杯', value: 2 },
                    { key: '经典诵读', value: 3 }
                ],
                // 下拉选择
                screeningUser: [
                    {
                        key: '审核',
                        value: 0
                    },
                    {
                        key: '审核通过',
                        value: 1
                    },
                    {
                        key: '审核未过',
                        value: 2
                    }
                ],
                // 下拉选择
                source: [
                    {
                        key: '最美诵读',
                        value: 1
                    },
                    {
                        key: '诗教课堂',
                        value: 2
                    },
                    {
                        key: '迦凌杯',
                        value: 3
                    },
                    {
                        key: '经典诵读',
                        value: 4
                    }
                ]
            },
            // 弹框配置相关
            dialogInfo: {
                title: {
                    create: '添加',
                    update: '编辑'
                },
                visible: false,
                type: '',
                btLoading: false,
                btList: [
                    {
                        label: '关闭',
                        type: '',
                        icon: '',
                        event: 'close',
                        show: true
                    },
                    {
                        label: '保存',
                        type: 'primary',
                        icon: '',
                        event: 'save',
                        saveLoading: false,
                        show: true
                    }
                ]
            },
            // 表单相关
            formInfo: {
                ref: null,
                data: {
                    account: '', // 账户
                    name: '', // 真实姓名
                    nickName: '', // 微信名称
                    mobile: '', // 手机号
                    wechat: '', // 微信号
                    school: '', // 学校
                    grade: '', // 年级
                    area: '', // 区域
                    source: '', // 来源
                    status: '' // 状态
                },
                fieldList: [
                    {
                        label: '账号名称',
                        value: 'account',
                        type: 'input',
                        required: true
                        // className: 'el-form-block' // 是否一行显示
                    },
                    {
                        label: '真实姓名',
                        value: 'name',
                        type: 'input'
                        // className: 'el-form-block'
                    },
                    {
                        label: '微信名称',
                        value: 'nickName',
                        type: 'input'
                        // className: 'el-form-block'
                    },
                    {
                        label: '手机号码',
                        value: 'mobile',
                        type: 'input'
                        // className: 'el-form-block'
                    },
                    { label: '微信号码', value: 'wechat', type: 'input' },
                    { label: '学校信息', value: 'school', type: 'input' },
                    { label: '年级', value: 'grade', type: 'input' },
                    {
                        label: '地区',
                        value: 'area',
                        type: 'input'
                        // className: 'el-form-block'
                    },
                    {
                        label: '来源',
                        value: 'source',
                        type: 'select',
                        list: 'source'
                        // className: 'el-form-block'
                    },
                    {
                        label: '状态',
                        value: 'status',
                        type: 'select',
                        list: 'statusList',
                        required: true
                    }
                ],
                rules: {},
                labelWidth: '100px'
            }
        }
    },
    watch: {
        'dialogInfo.visible'(val) {
            const formInfo = this.formInfo
            if (!val) {
                // 表单验证初始化
                if (formInfo.ref) {
                    formInfo.ref.resetFields()
                }
                this.resetForm()
                // 重置弹窗按钮loading
                this.dialogInfo.btLoading = false
            }
        }
    },
    mounted() {
        this.initFormRules()
        this.getList()
    },
    methods: {
        // 初始化验证
        initFormRules() {
            const formInfo = this.formInfo
            formInfo.rules = initRules(formInfo.fieldList)
        },
        // 按钮点击
        handleClick(event, data) {
            const tableInfo = this.tableInfo
            const dialogInfo = this.dialogInfo
            // const formInfo = this.formInfo
            switch (event) {
                // 搜索
                case 'search':
                    // 重置分页
                    tableInfo.initCurpage = Math.random()
                    tableInfo.refresh = Math.random()
                    break
                // 创建
                case 'create':
                    dialogInfo.type = event
                    dialogInfo.visible = true
                    break
                // // 编辑
                // case 'update':
                //     dialogInfo.type = event
                //     dialogInfo.visible = true
                //     // 显示信息
                //     for (const key in data) {
                //         // 存在则赋值
                //         if (key in formInfo.data) {
                //             formInfo.data[key] = data[key]
                //         }
                //     }
                //     break
                case 'status':
                    console.log(
                        '%c 🍿 data: ',
                        'font-size:20px;background-color: #FFDD4D;color:#fff;',
                        data
                    )
                    data.statusLoading = true
                    break
                // // 删除
                // case 'delete':
                //     this.$handleAPI(event, deleteApi, data.id).then(res => {
                //         if (res.success) {
                //             tableInfo.refresh = Math.random()
                //         }
                //     })
                //     break
                // // 弹窗点击关闭
                // case 'close':
                //     dialogInfo.visible = false
                //     break
                // 弹窗点击保存
                case 'save':
                    this.formInfo.ref.validate(valid => {
                        if (valid) {
                            let api
                            let newParams
                            const params = this.formInfo.data
                            const type = this.dialogInfo.type
                            if (type === 'create') {
                                // api = createUser
                                newParams = {
                                    account: '测试', // 账户
                                    name: '车车', // 真实姓名
                                    nickName: '', // 微信名称
                                    mobile: [], // 手机号
                                    wechat: [], // 微信号
                                    school: '', // 学校
                                    grade: '', // 年级
                                    area: '', // 区域
                                    source: 0, // 来源
                                    status: 0
                                }
                            } else if (type === 'update') {
                                // api = updateApi
                            } else {
                                return
                            }
                            dialogInfo.btLoading = true
                            this.$handleApi(type, api, newParams)
                                .then(res => {
                                    console.log(
                                        '%c 🍫 res: ',
                                        'font-size:20px;background-color: #3F7CFF;color:#fff;',
                                        res
                                    )
                                    return
                                    // if (res.success) {
                                    //     dialogInfo.visible = false
                                    //     tableInfo.refresh = Math.random()
                                    // }
                                    // dialogInfo.btLoading = false
                                })
                                .catch(e => {
                                    dialogInfo.btLoading = false
                                })
                        }
                    })
                    break
                // case 'selectFile':
                //     this.selectFileInfo.visible = true
                //     break
            }
        },
        // 触发事件
        handleEvent(event, data) {
            switch (event) {
                // 初始化表格数据 对获取到的数据做处理
                case 'list':
                    if (!data) return
                    data.forEach(item => {
                        // 塞入loading字段用于按钮点击
                        this.$set(item, 'statusLoading', false)
                        item.create_time = switchTime(
                            item.create_time,
                            'YYYY-MM-DD hh:mm:ss'
                        )
                        item.update_time = switchTime(
                            item.update_time,
                            'YYYY-MM-DD hh:mm:ss'
                        )
                    })
                    break
                case 'tableCheck':
                    console.log(
                        '%c 🥫 data: ',
                        'font-size:20px;background-color: #FFDD4D;color:#fff;',
                        data
                    )
                    break
            }
        },

        // 请求表格数据列表
        getList() {
            this.tableInfo.refresh = Math.random()
        },

        // 初始化表单
        resetForm() {
            this.formInfo.data = {
                account: '', // 账户
                name: '', // 真实姓名
                nickName: '', // 微信名称
                mobile: '', // 手机号
                wechat: '', // 微信号
                school: '', // 学校
                grade: '', // 年级
                area: '', // 区域
                source: 0, // 来源
                status: 0
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.material {
    .material_title {
        display: flex;
        margin-bottom: 10px;

        .search_value {
            display: flex;
            margin-right: 20px;
            .search_label {
                width: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
            }
        }

        .select_value {
            display: flex;
            align-items: center;
            margin-right: 20px;
            .select_label {
                margin-right: 10px;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
            }
        }
    }
}
</style>
