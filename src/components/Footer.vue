<template>
    <footer class="footer">

        <router-link :to="{name: 'main-page'}" class="footer__button">
            <img v-if="currentPage === `main`" src="../assets/images/sidebar_home_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_home.svg" alt="">
        </router-link>

        <button type="button" 
        @click.stop.prevent="toggleModal" 
        class="footer__button">
            <img src="../assets/images/sidebar_tweet_mobile.svg" alt="">
        </button>

        <router-link 
            @click.native.stop.prevent="handleMainPage('user')"
            :to="{name: 'user-detail', params: {id: currentUser.id}, query: { 'tab': 'tweet'}}" class="footer__button">

            <img v-if="currentPage === `user`" src="../assets/images/sidebar_user_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_user.svg" alt="">
        </router-link>

        <router-link 
        :to="{name: 'settings'}" 
        class="footer__button">
        
            <img v-if="currentPage === `setting`" src="../assets/images/sidebar_setting_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_setting.svg" alt="">
        </router-link>
        
    </footer>
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
        ...mapState(['currentUser', 'isAuthenticated']),
    },
    methods: {
        toggleModal () {
            this.isModalToggled = true
            this.$emit("after-toggle-modal", this.isModalToggled)
        },
        handleMainPage (currentPage) {
            if (this.currentPage === currentPage) return history.go(0)
        }
    }
}
</script>