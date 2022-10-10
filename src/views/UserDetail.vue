<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`user`"/>
            </section>
            <main class="main__container">
                <UserEditModal v-if="false"/>
                <UserHeader :content="`Raven`" :counts="tweets.length"/>
                <UserPanel />
                <HomeTabs 
                :user-id="currentUser.id"
                :current-tab="currentTab"/>
                <div v-if="!isLoading" class="tweets__container">
                    <p v-if="!tweets.length">目前還沒有推文</p>
                    <TweetCard 
                   
                    v-for="tweet in tweets" 
                    :key="tweet.id"
                    :initial-tweet="tweet"
                    :user="user"/>

                    <p v-if="!replies.length">目前還沒有回覆</p>
                    <ReplyCard 
                    v-else
                    v-for="reply in replies" 
                    :key="reply.id"
                    :reply="reply"
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
import ReplyCard from '../components/ReplyCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import UserHeader from '../components/UserHeader.vue'
import HomeTabs from '../components/HomeTabs.vue'
import UserEditModal from '../components/UserEditModal.vue'
import Footer from '../components/Footer.vue'
import UserPanel from '../components/UserPanel.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
    components: {
        TweetCard,
        ReplyCard,
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
            replies: [],
            likes: [],
            isUserLoading: true,
            isTweetLoading: true,
            currentTab: 'tweet'
        }
    },
    created () {
        const { id: userId } = this.$route.params
        this.fetchUser(userId)
        const { tab } = this.$route.query
        if (tab === 'tweet') {
            this.fetchUserTweets(userId)
        }
        else if (tab === 'reply') {
            this.fetchUserReplies(userId)
        }
        else if (tab === 'like') {
            this.fetchUserLikes(userId)
        }
        this.currentTab = tab
    },
    beforeRouteUpdate(to, from, next){
        const {id: userId} = to.params
        this.fetchUser(userId)
        
        const { tab } = to.query
        if (tab === 'tweet') {
            this.fetchUserTweets(userId)
        }
        else if (tab === 'reply') {
            this.fetchUserReplies(userId)
        }
        else if (tab === 'like') {
            this.fetchUserLikes(userId)
        }
        this.currentTab = tab
        next()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
        isLoading () {
            if (!this.isUserLoading && !this.isTweetLoading) {
                return false
            }
            return true
        }
    },
    methods: {
        async fetchUser (userId) {
            try {
                const response = await usersAPI.getUser({userId})
                console.log(response.data)
                const {
                    account, coverPhoto, email, introduction, name, profilePhoto
                } = response.data
                this.user = {
                    ...this.user,
                    account, coverPhoto, email, introduction, name, profilePhoto
                }
                this.isUserLoading = false
            }
            catch (error) {
                console.log(error)
                this.isUserLoading = false
                Toast.fire({
                    icon: 'error',
                    title: `無法取得推文,請稍後再試`,
                })
            }
        },
        async fetchUserTweets (userId) {
            try {
                const response = await usersAPI.getUserTweets({userId})
                this.tweets = [...response.data]
                this.isTweetLoading = false
            }
            catch (error) {
                console.log(error)
                this.isTweetLoading = false
                Toast.fire({
                    icon: 'error',
                    title: `無法取得推文,請稍後再試`,
                })
            }
        },
        async fetchUserReplies (userId) {
            try {
                const response = await usersAPI.getUserReplies({userId})
                this.replies = [...response.data]
                this.isTweetLoading = false
            }
            catch (error) {
                console.log(error)
                this.isTweetLoading = false
                Toast.fire({
                    icon: 'error',
                    title: `無法取得推文,請稍後再試`,
                })
            }
        },
        async fetchUserLikes (userId) {
            try {
                const response = await usersAPI.getUserLikes({userId})
                this.likes = [...response.data]
                this.isTweetLoading = false
            }
            catch (error) {
                console.log(error)
                this.isTweetLoading = false
                Toast.fire({
                    icon: 'error',
                    title: `無法取得推文,請稍後再試`,
                })
            }
        },
        //要負責抓API
    }
}
</script>