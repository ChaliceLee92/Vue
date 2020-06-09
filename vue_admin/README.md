# npm run commit 后给出了 commit 的几种类型, 如下: 

```
    feat 新功能
    fix Bug 修复
    docs 文档更新
    style 代码的格式，标点符号的更新
    refactor 代码重构
    perf 性能优化
    test 测试更新
    build 构建系统或者包依赖更新
    ci CI 配置，脚本文件等更新
    chore 非 src 或者 测试文件的更新
    revert commit 回退

```


# Commit message格式: 

```
    1. type: 用于说明 commit 的类别，只允许使用下面7个标识。

        feat：新功能（feature）

        fix：修补bug

        docs：文档（documentation）

        style： 格式（不影响代码运行的变动）

        refactor：重构（即不是新增功能，也不是修改bug的代码变动）

        test：增加测试

        chore：构建过程或辅助工具的变动

    2. scope[optional]: 表示改动的模块或者文件或者功能

    3. subject: 提交简短的问题描述

```

# Commit message规则:

```
    规则由名称和配置数组组成。配置数组包含：

        级别 [0..2]：0禁用规则,对于1,它将被视为一个警告,对于2，它将被视为一个错误。

        适用 always|never：never颠倒规则。

        值：用于此规则的值。
```

# 三级菜单甚至更多级菜单渲染:

```
// 定义路由

import Layout from '@/layout/index.vue'

const AuditManage = {
    path: '/AuditManage',
    name: '审核管理',
    component: Layout,
    meta: {
        title: '审核管理',
        icon: 'el-icon-location'
    },
    // 二级路由
    children: [
        {
            // 如果是要有三级菜单 这里的path 要加上父级的path
            path: '/AuditManage/index',
            meta: {
                title: '短信审核',
                icon: 'icondashboard'
                // affix: true
            },
            // 这里写一个router-veiw 组件来渲染三级路由的内容
            component: () => import('@views/AuditManage/index'),
            // 三级路由
            children: [
                {
                    path: 'sub_index',
                    meta: {
                        title: '短信审核1',
                        icon: 'el-icon-service'
                        // affix: true
                    },
                    // component: () => import('@views/Home/sub_index'),
                    component: () =>
                        import('@views/AuditManage/SMS/AuditManage.vue'),
                    children: []
                },
                {
                    path: 'sub_index2',
                    name: '短信审核2',
                    component: () =>
                        import('@views/AuditManage/SMS/AuditManage2.vue'),
                    meta: {
                        title: '短信审核2',
                        icon: 'el-icon-service'
                    },
                    children: []
                }
            ]
        },
        {
            path: 'material',
            meta: {
                title: '审核资料',
                icon: 'icondashboard'
                // affix: true
            },
            component: () => import('@views/AuditManage/material/material.vue'),
            children: []
        }
    ]
}

export default AuditManage

```

# upload 上传组件

```
     <template>
    <div class="userManage">
    // element 上传组件怎么用就怎么用
        <qn-upload
            :qnToken="getQnToken()"
            :show-file-list="false"
            :on-progress="uploadFileProcess"
            :on-success="handleFileSuccess"
        >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
            </div>
        </qn-upload>
        <el-progress :percentage="fileProgress"></el-progress>
    </div>
</template>

<script>
import { getQnToken } from '@utils/QnToken.js'
export default {
    name: 'userManage',
    data() {
        return {
            getQnToken,
            imageUrl: '',
            fileProgress: 0
        }
    },
    mounted() {},
    methods: {
        handleFileSuccess(res, file) {
            console.log(
                '%c 🎂 file: ',
                'font-size:20px;background-color: #7F2B82;color:#fff;',
                file,
                res
            )
            this.imageUrl =
                'http://brpublic.beautifulreading.com' + '/' + res.key
        },

        uploadFileProcess(event, file, fileList) {
            console.log(
                '%c 🥕 event: ',
                'font-size:20px;background-color: #EA7E5C;color:#fff;',
                event
            )
            this.fileProgress = parseInt(event.total.percent)
        }
    }
}
</script>

<style lang="scss" scope>
.userManage {
    width: 100%;
    height: 100%;
}
</style>

```

# 表格组件

```
    <template>
    <div class="UserManage">
        <TableComponent
            :refresh="tableInfo.refresh"
            :init-curpage="tableInfo.initCurpage"
            :data.sync="tableInfo.data"
            :api="getUserList"
            tabIndex
            checkBox
            :query="filterInfo.query"
            :field-list="tableInfo.fieldList"
            :list-type-info="listTypeInfo"
            :handle="tableInfo.handle"
            @handleClick="handleClick"
            @handleEvent="handleEvent"
        >
            <!-- 自定义插槽显示状态 -->
            <template v-slot:col-status="scope">
                <i
                    :class="
                        scope.row.status === 1
                            ? 'el-icon-check'
                            : 'el-icon-close'
                    "
                    :style="{
                        color: scope.row.status === 1 ? '#67c23a' : '#f56c6c',
                        fontSize: '20px'
                    }"
                />
            </template>
            <!-- 自定义插槽显示图片 -->
            <template v-slot:col-logo="scope">
                <div>
                    <img
                        style="width:100px"
                        :src="scope.row.user.logo"
                        alt=""
                    />
                </div>
            </template>
            <!-- 自定义插槽状态按钮 -->
            <template v-slot:bt-status="scope">
                <el-button
                    v-if="
                        !scope.data.item.ifRender ||
                            scope.data.item.ifRender(scope.data.row)
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
                    {{ scope.data.row.status - 1 >= 0 ? '停用' : '启用' }}
                    <!-- {{ getscope(scope) }} -->
                </el-button>
            </template>
        </TableComponent>
    </div>
</template>

<script>
import { getUserList } from '@/http/interface/user'
import { switchTime } from '@utils/mUtils'

export default {
    name: 'UserManage',
    data() {
        return {
            getUserList,
            // 表格相关
            tableInfo: {
                refresh: 1,
                initCurpage: 1,
                data: [],
                fieldList: [
                    { label: '姓名', value: 'name', width: 80 },
                    {
                        label: 'logo',
                        value: 'logo',
                        type: 'slot',
                        width: 200
                    },
                    { label: 'ID', value: 'id' },
                    {
                        label: '状态',
                        value: 'status',
                        width: 90,
                        type: 'slot',
                        list: 'statusList'
                    },
                    {
                        label: '是否启用',
                        value: 'status',
                        width: 90,
                        type: 'select',
                        list: 'statusList'
                    },
                    { label: '创建时间', value: 'create_time', width: 180 },
                    { label: '更新时间', value: 'update_time', width: 180 }
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
                            ifRender(row) {
                                return !row.is_family // 根据后端返回字段控制每一行的启用操作按钮是否显示
                            },
                            slot: true
                        },
                        {
                            label: '编辑',
                            type: '',
                            icon: 'el-icon-edit',
                            event: 'update',
                            ifRender(row) {
                                return true
                            }
                        },
                        {
                            label: '删除',
                            type: 'danger',
                            icon: 'el-icon-delete',
                            event: 'delete'
                        }
                    ]
                }
            },
            // 过滤相关配置
            filterInfo: {
                // api 参数
                query: {
                    skip: 0,
                    limit: 10
                }
            },
            // 相关列表
            listTypeInfo: {
                statusList: [
                    { key: '启用', value: 1 },
                    { key: '停用', value: 0 }
                ]
            }
        }
    },
    mounted() {},
    methods: {
        getscope(scope) {
            console.log(
                '%c 🥟 scope: ',
                'font-size:20px;background-color: #FCA650;color:#fff;',
                scope
            )
        },
        // 按钮点击
        handleClick(event, data) {
            const tableInfo = this.tableInfo
            // const dialogInfo = this.dialogInfo
            // const formInfo = this.formInfo
            switch (event) {
                // 搜索
                case 'search':
                    // 重置分页
                    tableInfo.initCurpage = Math.random()
                    tableInfo.refresh = Math.random()
                    break
                // // 创建
                // case 'create':
                //     dialogInfo.type = event
                //     dialogInfo.visible = true
                //     break
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
                // case 'save':
                // this.formInfo.ref.validate(valid => {
                //     if (valid) {
                //         let api
                //         const params = this.formInfo.data
                //         const type = this.dialogInfo.type
                //         if (type === 'create') {
                //             api = createApi
                //         } else if (type === 'update') {
                //             api = updateApi
                //         } else {
                //             return
                //         }
                //         dialogInfo.btLoading = true
                //         this.$handleAPI(type, api, params)
                //             .then(res => {
                //                 if (res.success) {
                //                     dialogInfo.visible = false
                //                     tableInfo.refresh = Math.random()
                //                 }
                //                 dialogInfo.btLoading = false
                //             })
                //             .catch(e => {
                //                 dialogInfo.btLoading = false
                //             })
                //     }
                // })
                // break
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
        }
    }
}
</script>

<style></style>

```


# 菜单

```
    <template>
    <div>
        <!-- 遍历路由表，生成左侧菜单 -->
        <template v-for="item in meuns">
            <!-- 一级菜单的情况 -->
            <template v-if="item.children && item.children.length === 1">
                <router-link
                    :to="item.path + '/' + item.children[0].path"
                    :key="item.path"
                >
                    <!--           index跟浏览器地址对应，这样菜单才能显示选中状态  -->
                    <el-menu-item
                        :index="item.path + '/' + item.children[0].path"
                    >
                        <template slot="title">
                            <!-- 设置icon -->
                            <i
                                v-if="item.children[0].meta.icon"
                                :class="item.children[0].meta.icon"
                            ></i>
                            <!-- 菜单名称 -->
                            {{ item.children[0].meta.title }}
                        </template>
                    </el-menu-item>
                </router-link>
            </template>
            <!-- 一级菜单的情况 end-->
            <!-- 多级菜单 -->
            <template v-else>
                <el-submenu :index="item.path" :key="item.path">
                    <template slot="title">
                        <i :class="item.meta.icon"></i>
                        {{ item.meta.title }}
                    </template>
                    <!-- 遍历子菜单 -->
                    <template
                        v-for="(itemChild, indexChild) in filterChildren(
                            item.children
                        )"
                    >
                        <!-- 当发现存在3级或大于3级菜单时,重新遍历当前组件 -->
                        <template
                            v-if="
                                itemChild.children &&
                                    itemChild.children.length > 0
                            "
                        >
                            <sidebar-item
                                :routes="[itemChild]"
                                class="nest-menu"
                                :key="itemChild.path"
                            ></sidebar-item>
                        </template>
                        <!-- 2级菜单时-->
                        <template v-else>
                            <router-link
                                :to="item.path + '/' + itemChild.path"
                                :key="indexChild"
                            >
                                <el-menu-item
                                    :index="item.path + '/' + itemChild.path"
                                >
                                    <i
                                        v-if="itemChild.meta.icon"
                                        :class="itemChild.meta.icon"
                                    >
                                    </i>
                                    {{ itemChild.meta.title }}
                                </el-menu-item>
                            </router-link>
                        </template>
                    </template>
                    <!-- 遍历子菜单 end-->
                </el-submenu>
            </template>
            <!-- 多级菜单 end-->
        </template>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            meuns: ''
        }
    },

    mounted() {
        this.meuns = this.routes
    },
    methods: {
        filterChildren(item) {
            return item.filter(children => !children.hidden)
        }
    }
}
</script>
<style lang="scss" scoped></style>

```

# 服务器状态码: 

```
    code : 0 成功
    code : 1 参数有误
    code : 400 服务器异常
    code : 90201 用户不存在
    code : 90202 用户名或者密码错误
    code : 90203 账号被冻结
    code : 90301 学校已存在
    code : 90302 添加学校失败
    code : 90303 修改学校失败


    status : 403 非法访问(权限或者token过期)

```