<template>
    <div class="UserManage">
        <div class="UserManage_title">
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
            :api="getUserList"
            tabIndex
            :query="filterInfo.query"
            :field-list="tableInfo.fieldList"
            :list-type-info="listTypeInfo"
            :handle="tableInfo.handle"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
        >
            <!-- 自定义插槽状态按钮 -->
            <template v-slot:bt-update="scope">
                <el-button
                    v-if="
                        scope.data.item.show &&
                            (!scope.data.item.ifRender ||
                                scope.data.item.ifRender(scope.data.row))
                    "
                    v-waves
                    size="mini"
                    type="primary"
                    :icon="scope.data.item.icon"
                    :disabled="scope.data.item.disabled"
                    :loading="scope.data.row[scope.data.item.loading]"
                    @click="handleClick(scope.data.item.event, scope.data.row)"
                >
                    查看
                </el-button>
            </template>

            <!-- 自定义渲染标签 -->
            <template v-slot:col-mobile="scope">
                <!-- 标签 -->
                <!-- 相当于过滤器方法 getDataName({
                            dataList: listTypeInfo.typeList,  // 这里定义过滤规则
                            value: 'value',
                            label: 'key',
                            data: item
                        }) -->
                <el-tag
                    v-for="(item, index) in scope.row.mobile"
                    :key="index"
                    style="margin: 0 0 5px 5px;"
                >
                    {{ item }}
                </el-tag>
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
                    <!-- 自定义插槽的使用 -->
                    <template v-slot:form-mobile>
                        <el-form
                            :model="formDataMobile"
                            ref="formDataMobile"
                            class="formDataMobile"
                        >
                            <el-form-item
                                v-for="(mobile,
                                index) in formDataMobile.Mobiles"
                                :key="mobile.key"
                                :prop="'Mobiles.' + index + '.value'"
                                :rules="{
                                    validator: checkMobile,
                                    trigger: 'blur'
                                }"
                            >
                                <el-input
                                    class="slotInput"
                                    placeholder="请输入手机号码"
                                    v-model="mobile.value"
                                >
                                </el-input>
                                <i
                                    class="el-icon-close"
                                    style="padding-left:10px"
                                    @click="removeMobile(mobile)"
                                ></i>
                            </el-form-item>
                        </el-form>
                        <el-button
                            size="mini"
                            type="primary"
                            @click="addMobile"
                            v-show="formDataMobile.Mobiles.length <= 3"
                        >
                            添加绑定
                        </el-button>
                    </template>
                    <!-- 自定义插槽的使用 -->
                    <template v-slot:form-wechat>
                        <el-form
                            :model="formDataWechat"
                            ref="formDataWechat"
                            class="formDataWechat"
                        >
                            <el-form-item
                                v-for="(Wechat,
                                index) in formDataWechat.Wechats"
                                :key="Wechat.key"
                                :prop="'Wechats.' + index + '.value'"
                                :rules="{
                                    required: true,
                                    message: '内容不能为空',
                                    trigger: 'blur'
                                }"
                            >
                                <el-input
                                    class="slotInput"
                                    placeholder="请添加微信号"
                                    v-model="Wechat.value"
                                >
                                </el-input>
                                <i
                                    class="el-icon-close"
                                    style="padding-left:10px"
                                    @click="removeWechat(Wechat)"
                                ></i>
                            </el-form-item>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="addWechat"
                                v-show="formDataWechat.Wechats.length <= 3"
                            >
                                添加绑定
                            </el-button>
                        </el-form>
                    </template>
                </ComponentForm>
            </ComponentDialog>
        </div>
    </div>
</template>

<script>
import {
    getUserList,
    createUser,
    updateUser,
    DeleteUser
} from '@/http/interface/user'
import { switchTime, initRules, getDataName } from '@utils/mUtils'
import { CustomRule } from '@utils/validate.js'
import xlsxData from '@utils/xlsxData.js'

export default {
    name: 'UserManage',
    data() {
        // 校验手机号
        const checkMobile = (rule, value, callback) => {
            if (value === '') return

            const check = CustomRule({
                label: '手机号码',
                value,
                rules: ['notnull', 'noChinese', 'phone', 'moblie'],
                conditions: []
            })
            if (!check.result) {
                callback(new Error(check.message))
            } else {
                callback()
            }
        }

        return {
            getUserList,
            checkMobile,
            getDataName,
            // 表格相关
            tableInfo: {
                refresh: 1,
                initCurpage: 1,
                data: [],
                fieldList: [
                    { label: '账号名称', value: 'account' },
                    { label: '真实姓名', value: 'name' },
                    { label: '微信名称', value: 'nickName' },
                    {
                        label: '手机号码',
                        value: 'mobile',
                        type: 'slot',
                        minWidth: 300
                    },
                    { label: '学校', value: 'school' },
                    { label: '年级', value: 'grade' },
                    { label: '地区', value: 'area' },
                    { label: '用户来源', value: 'source', list: 'filterSource' }
                ],
                handle: {
                    fixed: 'right',
                    label: '操作',
                    width: '280',
                    btList: [
                        {
                            label: '查看',
                            type: 'primary',
                            icon: 'el-icon-view',
                            event: 'update',
                            loading: 'statusLoading',
                            show: true,
                            slot: true
                        },
                        {
                            label: '删除',
                            type: 'danger',
                            icon: 'el-icon-delete',
                            event: 'delete',
                            show: true
                        }
                    ]
                }
            },
            // 表单头部组件相关配置
            filterInfo: {
                // api 参数
                query: {
                    key: '', // 搜索框内容
                    role: '', // 角色内容
                    source: ''
                },
                // 控制筛选头部组件的配置
                list: [
                    { type: 'input', label: '搜索内容', value: 'key' },
                    {
                        type: 'select',
                        label: '用户',
                        value: 'role',
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
                        label: '新增',
                        btType: 'primary',
                        icon: 'el-icon-search',
                        event: 'create',
                        show: this.$store.getters.getBtnRoleList.includes(
                            'a6e52189a3ae484faea42efac957025c'
                        )
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
                        key: '用户',
                        value: 1
                    },
                    {
                        key: '老师',
                        value: 2
                    },
                    {
                        key: '专家',
                        value: 3
                    }
                ],
                // 下拉选择
                source: [
                    {
                        key: '最美诵读',
                        value: 0
                    },
                    {
                        key: '诗教课堂',
                        value: 1
                    },
                    {
                        key: '迦凌杯',
                        value: 2
                    },
                    {
                        key: '经典诵读',
                        value: 3
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
                    mobile: [], // 手机号
                    wechat: [], // 微信号
                    school: '', // 学校
                    grade: '', // 年级
                    area: '', // 区域
                    source: 0, // 来源
                    status: 1 // 状态
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
                    },
                    {
                        label: '手机号码',
                        value: 'mobile',
                        type: 'slot',
                        className: 'el-form-block'
                    },
                    {
                        label: '微信号码',
                        value: 'wechat',
                        type: 'slot',
                        className: 'el-form-block'
                    }
                ],
                rules: {},
                labelWidth: '100px'
            },

            userinfo: {},

            formDataMobile: {
                Mobiles: []
            },

            formDataWechat: {
                Wechats: []
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

                // 重置动态表单的验证规则
                this.$refs['formDataMobile'].resetFields()
                this.$refs['formDataWechat'].resetFields()

                // 重置动态表单的数据
                this.formDataMobile.Mobiles = []
                this.formDataWechat.Wechats = []
            }
        }
    },
    mounted() {
        this.initFormRules()
        // this.getList()
    },
    methods: {
        getscope(scope) {
            console.log(
                '%c 🍅 scope: ',
                'font-size:20px;background-color: #465975;color:#fff;',
                scope
            )
        },
        // 初始化验证
        initFormRules() {
            const formInfo = this.formInfo
            formInfo.rules = initRules(formInfo.fieldList)
        },
        // 按钮点击
        handleClick(event, data) {
            const tableInfo = this.tableInfo
            const dialogInfo = this.dialogInfo
            const formInfo = this.formInfo
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
                    dialogInfo.btList[1].label = '新增'
                    dialogInfo.visible = true
                    break
                // 编辑
                case 'update':
                    dialogInfo.type = event
                    dialogInfo.btList[1].label = '修改'
                    dialogInfo.visible = true
                    this.userinfo = data
                    // 显示信息
                    for (const key in data) {
                        // 存在则赋值
                        if (key in formInfo.data) {
                            formInfo.data[key] = data[key]
                        }
                    }

                    this.formDataMobile.Mobiles = this.conversionObj(
                        formInfo.data.mobile
                    )
                    break
                // 导出表格
                case 'export':
                    xlsxData(
                        this.tableInfo.data,
                        this.tableInfo.fieldList,
                        [
                            { wch: 20 },
                            { wch: 20 },
                            { wch: 20 },
                            { wch: 20 },
                            { wch: 20 },
                            { wch: 20 },
                            { wch: 20 },
                            { wch: 20 }
                        ],
                        '用户列表'
                    )
                    break
                // 删除
                case 'delete':
                    this.$handleApi(
                        event,
                        DeleteUser,
                        data,
                        data.userId,
                        data.mobile
                    ).then(res => {
                        if (res.code === 0) {
                            tableInfo.refresh = Math.random()
                        }
                    })
                    break
                // 弹窗点击关闭
                case 'close':
                    dialogInfo.visible = false
                    break
                // 弹窗点击保存
                case 'save':
                    this.formInfo.ref.validate(valid => {
                        if (valid) {
                            const params = this.formInfo.data
                            console.log(
                                '%c 🍑 params: ',
                                'font-size:20px;background-color: #B03734;color:#fff;',
                                params
                            )
                            const type = this.dialogInfo.type

                            // 处理数据
                            this.$refs['formDataMobile'].validate(valid => {
                                if (valid) {
                                    this.formInfo.data.mobile = this.conversionArr(
                                        this.formDataMobile.Mobiles
                                    )
                                } else {
                                    dialogInfo.btLoading = false
                                    return false
                                }
                            })

                            this.$refs['formDataWechat'].validate(valid => {
                                if (valid) {
                                    this.formInfo.data.wechat = this.conversionArr(
                                        this.formDataWechat.Wechats
                                    )
                                } else {
                                    dialogInfo.btLoading = false
                                    return false
                                }
                            })

                            if (type === 'create') {
                                this.$handleApi(type, createUser, params)
                                    .then(res => {
                                        if (res.code === 0) {
                                            dialogInfo.visible = false
                                            tableInfo.refresh = Math.random()
                                        }
                                        dialogInfo.btLoading = false
                                    })
                                    .catch(e => {
                                        dialogInfo.btLoading = false
                                    })
                            } else if (type === 'update') {
                                this.$handleApi(
                                    type,
                                    updateUser,
                                    params,
                                    this.userinfo.userId
                                )
                                    .then(res => {
                                        if (res.code === 0) {
                                            dialogInfo.visible = false
                                            tableInfo.refresh = Math.random()
                                        }
                                        dialogInfo.btLoading = false
                                    })
                                    .catch(e => {
                                        dialogInfo.btLoading = false
                                    })
                            } else {
                                return
                            }

                            // dialogInfo.btLoading = true
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
                // 初始化表格数据 对获取到的数据做处理 , 这里可以进行数据操作
                case 'list':
                    if (!data) return
                    data.forEach(item => {
                        // 塞入loading字段用于按钮点击
                        this.$set(item, 'statusLoading', false)
                        // // 处理时间格式
                        // item.create_time = switchTime(
                        //     item.create_time,
                        //     'YYYY-MM-DD hh:mm:ss'
                        // )
                        // item.update_time = switchTime(
                        //     item.update_time,
                        //     'YYYY-MM-DD hh:mm:ss'
                        // )
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
                mobile: [], // 手机号
                wechat: [], // 微信号
                school: '', // 学校
                grade: '', // 年级
                area: '', // 区域
                source: 0, // 来源
                status: 0
            }
        },

        // 动态添加表格项
        addMobile() {
            this.formDataMobile.Mobiles.push({
                value: ''
            })
        },

        addWechat() {
            this.formDataWechat.Wechats.push({
                value: ''
            })
        },

        /*格式化表单数据*/
        conversionArr(data) {
            //动态表单生成的是一个对象数组，需要把对象数组转成一个数组传给后台
            let TempArr = []
            data.forEach((item, index) => {
                TempArr.push(item.value)
            })
            return TempArr
        },
        /*格式化表单数据*/
        conversionObj(data) {
            let arr = []

            for (let i = 0; i < data.length; i++) {
                arr.push({ value: data[i] })
            }

            return arr
        },

        removeMobile(item) {
            let index = this.formDataMobile.Mobiles.indexOf(item)
            if (index !== -1) {
                this.formDataMobile.Mobiles.splice(index, 1)
            }
        },

        removeWechat(item) {
            let index = this.formDataWechat.Wechats.indexOf(item)
            if (index !== -1) {
                this.formDataWechat.Wechats.splice(index, 1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.UserManage {
    .UserManage_title {
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

// 自定义form相关
.page-form {
    .el-form-item {
        display: inline-block;
        width: 90%;
        .el-form-item__content {
            .el-input,
            .el-select,
            .el-textarea {
                width: 95%;
                margin-bottom: 15px;
            }
            .el-input-number {
                .el-input {
                    width: inherit;
                }
            }
        }
    }
}
</style>

<style lang="scss">
// 自定义form相关
.page-form {
    .formDataMobile,
    .formDataWechat {
        .is-error {
            .el-form-item__content {
                .el-form-item__error {
                    color: #f56c6c;
                    font-size: 12px;
                    line-height: 1;
                    padding-top: 4px;
                    position: absolute;
                    top: 70% !important;
                    left: 0;
                }
            }
        }
    }
}
</style>
