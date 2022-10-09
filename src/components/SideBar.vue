<template>
    <div class="side-bar__panel">
        <div class="side-bar__container">

            <router-link :to="{name: 'main-page'}" class="side-bar__icon">
                <img src="../assets/images/sidebar_logo.svg" alt="">
            </router-link>

            <router-link :to="{name: 'main-page'}" class="side-bar__link">
                <img v-if="currentPage === `main`" src="../assets/images/sidebar_home_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_home.svg" alt="">
                <h5 :class="{sidebar__active: currentPage === `main`}">首頁</h5>
            </router-link>
            
            <router-link :to="{name: 'user-detail', params: {id: currentUser.id}}" class="side-bar__link">
                <img v-if="currentPage === `user`" src="../assets/images/sidebar_user_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_user.svg" alt="">
                <h5 :class="{sidebar__active: currentPage === `user`}">個人資料</h5>
            </router-link>

            <router-link :to="{name: 'settings'}" class="side-bar__link">
                <img v-if="currentPage === `setting`" src="../assets/images/sidebar_setting_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_setting.svg" alt="">
                <h5 :class="{sidebar__active: currentPage === `setting`}">設定</h5>
            </router-link>

            <button @click.stop.prevent="toggleModal" type="button" class="side-bar__button">
                <img src="../assets/images/sidebar_tweet_ipad.svg" alt="">
                <h5>推文</h5>
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
        }
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
        }
    }
}
</script>

