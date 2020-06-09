<template>
    <div class="navbar">
        <hamburger
            id="hamburger-container"
            :is-active="sidebar"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-menu">
            <template>
                <!-- <search id="header-search" class="right-menu-item" /> -->
                <screenfull
                    id="screenfull"
                    class="right-menu-item hover-effect"
                />
            </template>
            <el-dropdown
                class="avatar-container right-menu-item hover-effect"
                trigger="click"
            >
                <div class="avatar-wrapper">
                    <img
                        :src="avatar + '?imageView2/1/w/80/h/80'"
                        class="user-avatar"
                    />
                    <!-- <span class="user-name">{{ getUserInfo.roleName }}</span> -->
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item>返回首页</el-dropdown-item>
                    </router-link>
                    <router-link to="">
                        <el-dropdown-item>系统设置</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided @click.native="logout">
                        <span style="display:block;">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'

export default {
    name: 'navbar',
    data() {
        return {
            avatar:
                'https://qcdn.beautifulreading.com/a6bdafefecbbeab028c476fa9a75986a'
        }
    },
    components: {
        Breadcrumb,
        Hamburger,
        Screenfull
        // Search
    },
    computed: {
        ...mapGetters(['sidebar', 'getUserInfo'])
    },
    mounted() {},
    methods: {
        // 切换侧边栏
        toggleSideBar() {
            this.$store.dispatch('toggleSideBar')
        },
        // 退出登录
        async logout() {
            // await this.$store.dispatch('user/logout')
            // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items: center;

    .hamburger-container {
        height: 100%;
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        flex: 1;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .user-name {
                    cursor: pointer;
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    color: #5a5e66;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
