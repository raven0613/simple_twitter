<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`user`"/>
            </section>
            <main class="main__container">
                <UserEditModal v-if="false"/>
                <UserHeader :content="`Raven`" :counts="25"/>
                <UserPanel />
                <HomeTabs :user-id="`1`"/>
                <div class="tweets__container">
                    <p v-if="!tweets.length">目前還沒有推文</p>
                    <TweetCard 
                    v-else
                    v-for="tweet in tweets" 
                    :key="tweet.id"
                    :initial-data="tweet"
                    :user="user"/>
                </div>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" v-if="false">
            </div>
        </div>
        <Footer :current-page="`user`"/>
    </div>
</template>

<script>
import TweetCard from '../components/TweetCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import UserHeader from '../components/UserHeader.vue'
import HomeTabs from '../components/HomeTabs.vue'
import UserEditModal from '../components/UserEditModal.vue'
import Footer from '../components/Footer.vue'
import UserPanel from '../components/UserPanel.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'

export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        UserHeader,
        HomeTabs,
        UserEditModal,
        Footer,
        UserPanel
    },
    data () {
        return {
            user: {
                account: '',
                coverPhoto: '',
                email: '',
                introduction: '',
                name: '',
                profilePhoto: '',
            },
            tweets: [],
        }
    },
    created () {
        const { id: userId } = this.$route.params
        this.fetchUser(userId)
        this.fetchUserTweets(userId)
    },
    methods: {
        async fetchUser (id) {
            try {
                const response = await usersAPI.getUser({id})
                const {
                    account, coverPhoto, email, introduction, name, profilePhoto
                } = response.data
                this.user = {
                    ...this.user,
                    account, coverPhoto, email, introduction, name, profilePhoto
                }
            }
            catch (error) {
                console.log(error)
                Toast.fire({
                    icon: 'error',
                    title: `無法取得推文,請稍後再試`,
                })
            }
        },
        async fetchUserTweets (id) {
            try {
                const response = await usersAPI.getUserTweets({id})
                this.tweets = response.data
            }
            catch (error) {
                console.log(error)
                Toast.fire({
                    icon: 'error',
                    title: `無法取得推文,請稍後再試`,
                })
            }
        },
    }
}
</script>