<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <UserHeader :content="`Raven`" :counts="25"/>
                <HomeTabs />
                <div class="tweets__container">
                    <p v-if="!followers.length">目前還沒有追隨者喔</p>
                    <UserFollowCard v-for="user in followers" :key="user.id" />
                </div>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" v-if="false">
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import UserHeader from '../components/UserHeader.vue'
import UserFollowCard from '../components/UserFollowCard.vue'
import HomeTabs from '../components/HomeTabs.vue'
import Footer from '../components/Footer.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'


export default {
    components: {
        SideBar,
        RecommendUsers,
        UserHeader,
        UserFollowCard,
        HomeTabs,
        Footer
    },
    data () {
        return {
            followers: []
        }
    },
    created () {
        const { id } = this.$route.params
        this.fetchFollower(id)
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
    },
    methods: {
        async fetchFollower (userId) {
            try {
                const { data } = await usersAPI.getUserFollowrs({userId})
                console.log(data)
                this.followers = [...data]
            }
            catch (error) {
                console.log(error.message)
                Toast.fire({
                    icon: 'error',
                    title: `無法取得追隨者清單,請稍後再試`,
                })
            }
        }
    }
}
</script>