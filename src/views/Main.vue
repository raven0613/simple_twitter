<template>
    <div class="twitter__project"
    :class="{modal__toggled: isModalToggled || isReplyModalToggled}">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`main`" :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
            </section>
            <main class="main__container">
            <!-- 回覆視窗 -->
                <MainReplyModal v-if="isReplyModalToggled"
                
                @after-submit-close="handleCloseModal"
                :initial-tweet="clickedTweet"
                :modal-toggled="true"/>
            <!-- 推文視窗 -->
                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"
                :is-main-page="true"
                :modal-toggled="true"/>
                
                <MainHeader :content="`首頁`" :user="user" :is-mobile="true"/>
                
                <MainTweetInput :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"
                :user-profile-photo="user.profilePhoto"/>

                <div v-if="!isTweetLoading" class="tweets__container">
                    <TweetCard 
                    :ini-is-modal-toggled="isModalToggled"
                    @after-toggle-modal="handleToggleReplyModal"
                    @after-clicked-reply="handlePassTweetData"
                    v-for="tweet in tweets" 
                    :key="tweet.id"
                    :initial-tweet="tweet"/>
                </div>
                <Spinner v-else/>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" @click.stop.prevent="handleCloseModal(false)" v-if="isModalToggled || isReplyModalToggled"
            >
            </div>
        </div>
        <Footer 
        :current-page="`main`"
        :ini-is-modal-toggled="isModalToggled"
        @after-toggle-modal="handleToggleModal"/>
    </div>
</template>

<script>
import TweetCard from '../components/TweetCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import MainHeader from '../components/MainHeader.vue'
import MainTweetModal from '../components/MainTweetModal.vue'
import MainReplyModal from '../components/MainReplyModal.vue'
import Footer from '../components/Footer.vue'
import Spinner from '../components/Spinner.vue'
import tweetsAPI from '../apis/tweets.js'
import usersAPI from '../apis/users.js'
import { mapState } from 'vuex'
import { Toast, innerHtml } from '../utils/helpers.js'
import MainTweetInput from "../components/MainTweetInput.vue"

export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        MainHeader,
        MainTweetModal,
        Footer,
        Spinner,
        MainTweetInput,
        MainReplyModal
    },
    data () {
        return {
            user: {},
            tweets: [],
            isModalToggled: false,
            isReplyModalToggled: false,
            clickedTweet: {},
            isTweetLoading: true,
            isUserLoading: true
        }
    },
    created () {
        this.getUrl()
        this.fetchTweets()
        this.fetchUser(this.currentUser.id)
    },
    beforeRouteUpdate(to, from, next) {
        this.getUrl()
        next()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
    },
    methods: {
        async fetchUser (userId) {
            try {
                this.isUserLoading = true
                const { data } = await usersAPI.getUser({userId})
                this.user = {
                    ...data
                }
            }
            catch (error) {
                console.log(error.message)
                this.isUserLoading = false
                return Toast.fire({
                    html: innerHtml('無法取得使用者頭像，請稍後再試','error')
                })
            }
        },
        async fetchTweets () {
            try {
                this.isTweetLoading = true
                const response = await tweetsAPI.getTweets()
                
                this.tweets = response.data
                this.isTweetLoading = false
            }
            catch (error) {
                console.log(error)
                this.isTweetLoading = false
                Toast.fire({
                    html: innerHtml('無法取得推文，請稍後再試','error')
                })
            }
        },
        handleToggleModal(isModalToggled){
            this.isModalToggled = isModalToggled
            history.pushState({ name: "new-tweet" }, null, "/#/tweets/new");
        },
        handleCloseModal(isSubmitted){
            this.isModalToggled = false
            this.isReplyModalToggled = false
            //如果不是在submit後回傳的關掉，就可以直接回上一頁
            if (!isSubmitted) {
                this.$router.back()
            }
        },
        handleAddTweet(tweet){
            this.tweets = [
                tweet, ...this.tweets
            ]
            //TODO:data裡面的tweets有增加  但是資料傳不進TweetCard
            this.fetchTweets()
        },
        handleToggleReplyModal(isReplyModalToggled){
            this.isReplyModalToggled = isReplyModalToggled
            history.pushState({ name: "new-reply" }, null, "/#/reply/new");
        },
        handlePassTweetData(tweet){
            this.clickedTweet = tweet
        },
        // 別人直接貼網址的狀況
        getUrl() {
            console.log('M getUrl')
            if(this.$route.matched[0].name === 'tweet-new') {
                this.isModalToggled = true
            }
        }
    }
}
</script>