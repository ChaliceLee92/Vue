<template>
    <div class="SchoolManage">
        <div class="SchoolManage_title">
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
            :api="getSchoolList"
            tabIndex
            :query="filterInfo.query"
            :field-list="tableInfo.fieldList"
            :list-type-info="listTypeInfo"
            :handle="tableInfo.handle"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
        >
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
import {
    getSchoolList,
    createSchool,
    updateSchool,
    DeleteSchool
} from '@/http/interface/school'
import { switchTime, initRules } from '@utils/mUtils'
import xlsxData from '@utils/xlsxData.js'

export default {
    name: 'SchoolManage',
    data() {
        return {
            getSchoolList,
            // 表格相关
            tableInfo: {
                refresh: 1,
                initCurpage: 1,
                data: [],
                fieldList: [
                    { label: '学校名称', value: 'name' },
                    { label: '学校简称', value: 'alias' },
                    { label: '省份名称', value: 'province' },
                    { label: '城市名称', value: 'city' },
                    { label: '县镇名称', value: 'county' },
                    {
                        label: '学校性质',
                        value: 'schoolType',
                        list: 'filterSchoolType'
                    },
                    {
                        label: '学校阶段',
                        value: 'schoolStage',
                        list: 'filterSchoolStage'
                    },
                    { label: '学校电话', value: 'mobile' },
                    { label: '备注', value: 'remark' },
                    { label: '添加时间', value: 'createdAt' }
                ],
                handle: {
                    fixed: 'right',
                    label: '操作',
                    width: '200',
                    btList: [
                        {
                            label: '修改',
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
                    key: '',
                    schoolType: '',
                    schoolStage: ''
                },
                // 控制筛选头部组件的配置
                list: [
                    { type: 'input', label: '搜索内容', value: 'key' },
                    {
                        type: 'select',
                        label: '学校性质',
                        value: 'schoolType',
                        list: 'filterSchoolType'
                    },
                    {
                        type: 'select',
                        label: '学校阶段',
                        value: 'schoolStage',
                        list: 'filterSchoolStage'
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
                filterSchoolType: [
                    { key: '公办', value: 0 },
                    { key: '民办', value: 1 }
                ],
                filterSchoolStage: [
                    { key: '小学', value: 0 },
                    { key: '初中', value: 1 },
                    { key: '高中', value: 2 }
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
                    name: '', // 学校名称
                    alias: '', // 学校别名
                    province: '', // 省份
                    city: '', // 城市
                    county: '', // 县
                    schoolType: 0, // 学校性质
                    schoolStage: 0, // 学校阶段
                    mobile: '', // 学校电话
                    remark: '' // 备注
                },
                fieldList: [
                    {
                        label: '学校名称',
                        value: 'name',
                        type: 'input',
                        required: true
                        // className: 'el-form-block' // 是否一行显示
                    },
                    {
                        label: '学校简称',
                        value: 'alias',
                        type: 'input'
                        // className: 'el-form-block'
                    },
                    {
                        label: '省份名称',
                        value: 'province',
                        type: 'input',
                        required: true
                        // className: 'el-form-block'
                    },
                    {
                        label: '城市名称',
                        value: 'city',
                        type: 'input',
                        required: true
                        // className: 'el-form-block'
                    },
                    {
                        label: '县镇名称',
                        value: 'county',
                        type: 'input',
                        required: true
                    },
                    {
                        label: '学校性质',
                        value: 'schoolType',
                        type: 'select',
                        list: 'filterSchoolType'
                    },
                    {
                        label: '学校阶段',
                        value: 'schoolStage',
                        type: 'select',
                        list: 'filterSchoolStage'
                    },
                    {
                        label: '学校电话',
                        value: 'mobile',
                        type: 'input'
                        // className: 'el-form-block'
                    },
                    {
                        label: '备注',
                        value: 'remark',
                        type: 'textarea',
                        className: 'el-form-block'
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
                    this.schoolInfo = data
                    // 显示信息
                    for (const key in data) {
                        // 存在则赋值
                        if (key in formInfo.data) {
                            formInfo.data[key] = data[key]
                        }
                    }
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
                            { wch: 20 },
                            { wch: 40 },
                            { wch: 40 }
                        ],
                        '学校列表'
                    )
                    break
                case 'status':
                    console.log(
                        '%c 🍿 data: ',
                        'font-size:20px;background-color: #FFDD4D;color:#fff;',
                        data
                    )
                    data.statusLoading = true
                    break
                // 删除
                case 'delete':
                    console.log('...')

                    this.$handleApi(
                        event,
                        DeleteSchool,
                        data,
                        data.schoolId
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
                                api = createSchool

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
                                api = updateSchool
                                console.log(
                                    '%c 🍕 this.schoolInfo.schoolId: ',
                                    'font-size:20px;background-color: #3F7CFF;color:#fff;',
                                    this.schoolInfo.schoolId
                                )
                                this.$handleApi(
                                    type,
                                    api,
                                    params,
                                    this.schoolInfo.schoolId
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
                name: '', // 学校名称
                alias: '', // 学校别名
                province: '', // 省份
                city: '', // 城市
                county: '', // 县
                schoolType: 0, // 学校性质
                schoolStage: 0, // 学校阶段
                mobile: '', // 学校电话
                remark: '' // 来源
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.SchoolManage {
    .SchoolManage_title {
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
