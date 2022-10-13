<template>
    <footer class="footer admin-footer">

        <router-link :to="{name: 'admin-tweet'}" class="footer__button">
            <img v-if="currentPage === `main`" src="../assets/images/sidebar_home_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_home.svg" alt="">
        </router-link>

        <router-link 
            @click.native.stop.prevent="handleMainPage('user')"
            :to="{name: 'admin-user'}" class="footer__button">
            <img v-if="currentPage === `user`" src="../assets/images/sidebar_user_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_user.svg" alt="">
        </router-link>

        <div @click.stop.prevent="logout" class="footer__button">
            <img src="../assets/images/sidebar_logout.svg" alt="">
        </div>
        
    </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        currentPage: {
            type: String,
        },
    },
    data () {
        return {
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
        logout(){
            this.$store.commit('revokeAuthentication')
            this.$router.push('/login')
        },
        handleMainPage (currentPage) {
            if (this.currentPage === currentPage) return history.go(0)
        }
    }
}
</script>