<template>
    <div class="side-bar__panel">
        <div class="side-bar__container">

            <router-link
            @click.native.stop.prevent="handleMainPage('main')" 
            :to="{name: 'main-page'}" class="side-bar__icon">
                <img src="../assets/images/sidebar_logo.svg" alt="">
            </router-link>

            <router-link 
            @click.native.stop.prevent="handleMainPage('main')"
            :to="{name: 'main-page'}" 
            class="side-bar__link">
                <img v-if="currentPage === `main`" src="../assets/images/sidebar_home_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_home.svg" alt="">
                <h5 :class="{sidebar__active: currentPage === `main`}">首頁</h5>
            </router-link>
            
            <router-link 
            @click.native.stop.prevent="handleMainPage('user')"
            :to="{name: 'user-detail', params: {id: currentUser.id}, query: { 'tab': 'tweet'}}" class="side-bar__link">
                <img v-if="currentPage === `user` && isCurrentUser" src="../assets/images/sidebar_user_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_user.svg" alt="">
                <h5 :class="{sidebar__active: currentPage === `user`}">個人資料</h5>
            </router-link>

            <router-link 
            @click.native.stop.prevent="handleMainPage('setting')"
            :to="{name: 'settings'}" class="side-bar__link">
                <img v-if="currentPage === `setting`" src="../assets/images/sidebar_setting_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_setting.svg" alt="">
                <h5 :class="{sidebar__active: currentPage === `setting`}">設定</h5>
            </router-link>

            <button @click.stop.prevent="toggleModal" type="button" class="side-bar__button">
                <img src="../assets/images/sidebar_tweet_ipad.svg" alt="">
                <h5>推文</h5>
            </button>
            <!-- 加入深色模式 -->
            <button v-if="darkMode" @click.stop.prevent="shiftToDarkMode" type="button" class="side-bar__button">
                <h5>Dark Mode</h5>
            </button>
            <button v-if="darkMode" @click.stop.prevent="shiftToLightMode" type="button" class="side-bar__button">
                <h5>Light Mode</h5>
            </button>
        </div>

        <div @click.stop.prevent="logout" class="side-bar__link side-bar__link--logout">
            <img src="../assets/images/sidebar_logout.svg" alt="">
            <h5>登出</h5>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        currentPage: {
            type: String,
        },
        iniIsModalToggled: {
            type: Boolean,
        }
    },
    data () {
        return {
            isModalToggled: this.iniIsModalToggled,

            darkMode: false, // 深色模式

            isCurrentUser: false

        }
    },
    created () {
        const { id: userId } = this.$route.params
        
        if (userId === userId) {
            this.isCurrentUser = true
        }
        else {
            this.isCurrentUser = false
        }
    },
    beforeRouteUpdate (to, from, next) {
        const {id: userId} = to.params
        if (userId === this.currentUser.id) {
            this.isCurrentUser = true
        }
        else {
            this.isCurrentUser = false
        }
        next()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated'])
    },
    methods: {
        toggleModal () {
            this.isModalToggled = true
            this.$emit("after-toggle-modal", this.isModalToggled)
        },
        logout(){
            this.$store.commit('revokeAuthentication')
            this.$router.push('/login')
        },

        // 深色模式
        shiftToDarkMode(){
            this.darkMode = true
            document.documentElement.setAttribute("data-theme", "dark")
        },
        shiftToLightMode(){
            this.darkMode = false
            document.documentElement.setAttribute("data-theme", "light")
        },

        handleMainPage (currentPage) {
            if (this.currentPage === currentPage) return history.go(0)
        }

    }
}
</script>