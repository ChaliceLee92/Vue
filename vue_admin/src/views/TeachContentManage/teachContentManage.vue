<template>
    <div class="teachContentManage">
        <div class="teachContentManage_title">
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
            :api="getBannerList"
            tabIndex
            :query="filterInfo.query"
            :field-list="tableInfo.fieldList"
            :list-type-info="listTypeInfo"
            :handle="tableInfo.handle"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
        >
            <!-- 自定义插槽状态按钮 -->
            <template v-slot:col-order="scope">
                <span>{{ scope.row.order }}</span>
            </template>
            <!-- 自定义插槽状态按钮 -->
            <template v-slot:bt-status="scope">
                <el-button
                    v-if="
                        scope.data.item.show &&
                            (!scope.data.item.ifRender ||
                                scope.data.item.ifRender(scope.data.row))
                    "
                    v-waves
                    size="mini"
                    :type="
                        scope.data.row.status - 1 >= 0 ? 'danger' : 'success'
                    "
                    :icon="scope.data.item.icon"
                    :disabled="scope.data.item.disabled"
                    :loading="scope.data.row[scope.data.item.loading]"
                    @click="handleClick(scope.data.item.event, scope.data.row)"
                >
                    {{ scope.data.row.status - 1 >= 0 ? '下线' : '上线' }}
                </el-button>
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
                    <template v-slot:form-pic>
                        <div class="slot-image">
                            <el-button
                                v-waves
                                type="primary"
                                icon="el-icon-picture"
                                size="mini"
                                @click="handleClick('selectFile')"
                            >
                                {{
                                    formInfo.data.pic ? '更换图片' : '选择图片'
                                }}
                            </el-button>
                            <img
                                v-imgAlart
                                :src="formInfo.data.pic"
                                style="height: 100px;margin-left: 10px"
                                v-if="formInfo.data.pic"
                            />
                        </div>
                    </template>
                </ComponentForm>
            </ComponentDialog>
            <!-- 选择文件组件 -->
            <select-file
                v-if="selectFileInfo.visible"
                v-model="formInfo.data.image"
                :type="selectFileInfo.type"
                :visible.sync="selectFileInfo.visible"
            />
        </div>
    </div>
</template>

<script>
import {
    getBannerList,
    createBanner,
    updateBanner,
    DeleteBanner
} from '@/http/interface/teach'
import { switchTime, initRules } from '@utils/mUtils'
import { CustomRule } from '@utils/validate.js'

export default {
    name: 'teachContentManage',
    data() {
        // 校验手机号
        const checkOrder = (rule, value, callback) => {
            if (value === '') return

            const check = CustomRule({
                label: '',
                value,
                rules: ['number'],
                conditions: []
            })
            if (!check.result) {
                callback(new Error(check.message))
            } else {
                callback()
            }
        }
        return {
            getBannerList,
            // 表格相关
            tableInfo: {
                refresh: 1,
                initCurpage: 1,
                data: [],
                fieldList: [
                    { label: '图片排序', value: 'order', type: 'slot' },
                    { label: '图片', value: 'pic', type: 'image' },
                    { label: '标题', value: 'title' },
                    { label: '链接', value: 'link' },
                    { label: '创建时间', value: 'createdAt' },
                    { label: '更新时间', value: 'updatedAt' }
                ],
                handle: {
                    fixed: 'right',
                    label: '操作',
                    width: '280',
                    btList: [
                        {
                            label: '启用',
                            type: 'success',
                            icon: 'el-icon-refresh',
                            event: 'status',
                            loading: 'statusLoading',
                            show: true,
                            slot: true
                        },
                        {
                            label: '编辑',
                            type: 'success',
                            icon: 'el-icon-refresh',
                            event: 'update',
                            show: true
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
            // 过滤相关配置
            filterInfo: {
                // api 参数
                query: {
                    title: '',
                    order: '',
                    status: ''
                },
                // 控制筛选头部组件的配置
                list: [
                    { type: 'input', label: '搜索内容', value: 'title' },
                    {
                        type: 'select',
                        label: '位置筛选',
                        value: 'order',
                        list: 'filterLocation'
                    },
                    {
                        type: 'select',
                        label: '状态筛选',
                        value: 'status',
                        list: 'filterStatus'
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
                            'cc105b681c334f0dacd5739675559989'
                        )
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
                filterLocation: [
                    { key: 'banner位', value: 0 },
                    { key: '诗教校园位', value: 1 },
                    { key: '学术指导位', value: 2 }
                ],
                filterStatus: [
                    { key: '已上线', value: 0 },
                    { key: '未上线', value: 1 }
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
                    order: '', // 排序
                    pic:
                        'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg', // 图片
                    title: '', // 标提
                    link: '', // 跳转地址
                    status: '' // 状态
                },
                fieldList: [
                    {
                        label: '选择排序',
                        value: 'order',
                        type: 'input',
                        required: true,
                        validator: checkOrder,
                        className: 'el-form-block' // 是否一行显示
                    },
                    {
                        label: '图片',
                        value: 'pic',
                        type: 'slot',
                        className: 'el-form-block',
                        required: true
                    },
                    {
                        label: '标题',
                        value: 'title',
                        type: 'input',
                        className: 'el-form-block'
                    },
                    {
                        label: '链接',
                        value: 'link',
                        type: 'input',
                        className: 'el-form-block'
                    }
                ],
                rules: {},
                labelWidth: '100px'
            },
            // 选择文件组件相关参数
            selectFileInfo: {
                type: 2,
                visible: false,
                value: ''
            },

            ItemBanner: {}
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
                    dialogInfo.visible = true
                    break
                // 编辑
                case 'update':
                    dialogInfo.type = event
                    dialogInfo.visible = true
                    this.ItemBanner = data
                    // 显示信息
                    for (const key in data) {
                        // 存在则赋值
                        if (key in formInfo.data) {
                            formInfo.data[key] = data[key]
                        }
                    }
                    break
                case 'status':
                    const params = {}
                    // 设置参数
                    for (const key in data) {
                        // 存在则赋值
                        if (key in formInfo.data) {
                            params[key] = data[key]
                        }
                    }
                    console.log(
                        '%c 🍦 data: ',
                        'font-size:20px;background-color: #42b983;color:#fff;',
                        data
                    )
                    params.status = params.status - 1 >= 0 ? 0 : 1
                    data.statusLoading = true
                    this.$handleApi(
                        'update',
                        updateBanner,
                        params,
                        data.bannerId
                    )
                        .then(res => {
                            data.statusLoading = false
                            if (res.code === 0) {
                                data.status = params.status
                            }
                        })
                        .catch(() => {
                            data.statusLoading = false
                        })
                    break
                // 删除
                case 'delete':
                    this.$handleApi(
                        event,
                        DeleteBanner,
                        data,
                        data.bannerId
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
                            let api
                            const params = this.formInfo.data
                            const type = this.dialogInfo.type
                            if (type === 'create') {
                                api = createBanner

                                this.$handleApi(type, api, params)
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
                                api = updateBanner

                                this.$handleApi(
                                    type,
                                    api,
                                    params,
                                    this.ItemBanner.bannerId
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
                            dialogInfo.btLoading = true
                        }
                    })
                    break
                case 'selectFile':
                    this.selectFileInfo.visible = true
                    break
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
                        item.createdAt = switchTime(
                            item.createdAt,
                            'YYYY-MM-DD hh:mm:ss'
                        )
                        item.updatedAt = switchTime(
                            item.updatedAt,
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
                order: '', // 排序
                pic:
                    'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg', // 图片
                title: '', // 标提
                link: '', // 跳转地址
                status: '' // 状态
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.teachContentManage {
    .teachContentManage_title {
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
