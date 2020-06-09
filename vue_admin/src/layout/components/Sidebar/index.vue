<template>
    <div class="sidebar">
        <Logo :collapse="isCollapse" />
        <el-menu
            :default-active="$route.path"
            :collapse="isCollapse"
            :background-color="variables.menuBg"
            :text-color="variables.menuText"
            :unique-opened="false"
            :active-text-color="variables.menuActiveText"
            :collapse-transition="true"
            mode="vertical"
        >
            <sidebar-item :routes="filterRouter(routers)"></sidebar-item>
        </el-menu>
    </div>
</template>

<script>
import Logo from './Logo'
import sidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import variables from '@assets/styles/varibles.scss'
import store from 'vuex'

export default {
    components: {
        Logo,
        sidebarItem
    },
    data() {
        return {}
    },
    watch: {},
    computed: {
        ...mapGetters(['sidebar']),
        routers() {
            // return this.$router.options.routes
            return this.$store.getters.getRoleRouter
        },
        variables() {
            return variables
        },
        isCollapse() {
            return !this.sidebar
        }
    },
    methods: {
        filterRouter(routes) {
            return routes.filter(item => item.isMenu)
        }
    }
}
</script>

<style></style>
