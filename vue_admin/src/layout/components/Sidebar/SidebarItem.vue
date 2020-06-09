<template>
    <div>
        <!-- 遍历路由表，生成左侧菜单 -->
        <template v-for="item in meuns">
            <!-- 一级菜单的情况 -->
            <template v-if="!item.hasChild">
                <router-link :to="item.path" :key="item.path">
                    <!--           index跟浏览器地址对应，这样菜单才能显示选中状态 加上/index是为了高亮一级路由  -->
                    <el-menu-item :index="item.path + '/index'">
                        <template slot="title">
                            <!-- 设置icon -->
                            <i
                                v-if="item.meta.icon"
                                :class="item.meta.icon"
                            ></i>
                            <!-- 菜单名称 -->
                            {{ item.meta.title }}
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
                        <template v-if="itemChild.hasChild">
                            <sidebar-item
                                :routes="[itemChild]"
                                class="nest-menu"
                                :key="itemChild.path"
                            ></sidebar-item>
                        </template>
                        <!-- 2级菜单时-->
                        <template v-else>
                            <router-link
                                :to="item.path + itemChild.path"
                                :key="indexChild"
                            >
                                <el-menu-item
                                    :index="item.path + itemChild.path"
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
            return item.filter(children => children.isMenu)
        }
    }
}
</script>
<style lang="scss" scoped></style>
