<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`user`"
                :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
            </section>
            <main class="main__container">

                <UserEditModal v-if="isEditModalToggled"
                :initialUser="user"
                @after-submit-close="handleCloseModal"
                />
                
                <MainReplyModal v-if="isReplyModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"
                :initial-tweet="clickedTweet"/>

                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"/>


                <UserHeader :content="user.name" :counts="tweets.length"/>
                <UserPanel  :ini-is-modal-toggled="isModalToggled"
                :user="user"
                @after-toggle-modal="handleToggleEditModal"/>

                <HomeTabs 
                :clicked-tab="currentTab"
                :user-id="currentUser.id"
                />
            <!-- tab=tweet -->
                <div v-if="!isLoading && currentTab==='tweet'" 
                class="tweets__container">
                    <p v-if="!tweets.length">目前還沒有推文</p>
                    <TweetCard 
                    v-else
                    :ini-is-modal-toggled="isModalToggled"
                    @after-toggle-modal="handleToggleReplyModal"
                    @after-clicked-reply="handlePassTweetData"
                    v-for="tweet in tweets" 
                    :key="tweet.id"
                    :initial-tweet="tweet"
                    :user="user"/>
                </div>
            <!-- tab=reply -->
                <div v-if="!isLoading && currentTab==='reply'" 
                class="tweets__container">
                    <p v-if="!replies.length">目前還沒有回覆</p>
                    <ReplyCard 
                    v-else
                    v-for="reply in replies" 
                    :key="reply.id"
                    :reply="reply"
                    :user="user"/>
                </div>
            <!-- tab=like -->
                <div v-if="!isLoading && currentTab==='like'" 
                class="tweets__container">
                    <p v-if="!likes.length">目前還沒有喜歡的內容</p>
                    <TweetCard 
                    v-else
                    :ini-is-modal-toggled="isModalToggled"
                    @after-toggle-modal="handleToggleReplyModal"
                    @after-clicked-reply="handlePassTweetData"
                    v-for="like in likes" 
                    :key="like.id"
                    :initial-tweet="like"
                    :user="user"/>
                </div>
                
            </main> 
            <section class="right__container">
                <RecommendUsers />
            </section>


            <div class="modal__mask"             
            @click.stop.prevent="handleCloseModal"
            v-if="isModalToggled || isReplyModalToggled || isEditModalToggled" @touchmove.prevent @mousewheel.prevent>

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
import MainReplyModal from '../components/MainReplyModal.vue'
import MainTweetModal from '../components/MainTweetModal.vue'
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
        UserPanel,
        MainReplyModal,
        MainTweetModal
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
            currentTab: 'tweet',
            isModalToggled: false,
            isReplyModalToggled: false,
            isEditModalToggled: false,
            clickedTweet: {}
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
        this.currentTab = tab
        if (tab === 'tweet') {
            this.fetchUserTweets(userId)
        }
        else if (tab === 'reply') {
            this.fetchUserReplies(userId)
        }
        else if (tab === 'like') {
            this.fetchUserLikes(userId)
        }
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
                this.isUserLoading = true
                const response = await usersAPI.getUser({userId})
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
                this.isTweetLoading = true
                const response = await usersAPI.getUserTweets({userId})
                console.log(response)
                //裡面不是 likeCounts
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
                this.isTweetLoading = true
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
                this.isTweetLoading = true
                const response = await usersAPI.getUserLikes({userId})
                console.log(response)
                // response.data = response.data.map(like => {
                //     return { ...like.Tweet }
                // })
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
        handleToggleModal(isModalToggled){
            this.isModalToggled = isModalToggled
        },
        handleCloseModal(){
            this.isModalToggled = false
            this.isReplyModalToggled = false
            this.isEditModalToggled = false
        },
        handleAddTweet(tweet){
            this.tweets = [
                tweet, ...this.tweets
            ]
            this.fetchUserTweets(this.currentUser.id)
        },
        handleToggleReplyModal(isReplyModalToggled){
            this.isReplyModalToggled = isReplyModalToggled
        },
        handleToggleEditModal(isEditModalToggled){
            this.isEditModalToggled = isEditModalToggled
        },
        handlePassTweetData(tweet){
            this.clickedTweet = tweet
        },
    }
}
</script>