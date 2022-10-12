<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`main`" :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
            </section>
            <main class="main__container">
                <MainReplyModal v-if="isReplyModalToggled"
                @after-submit-close="handleCloseModal"
                :initial-tweet="clickedTweet"/>

                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"/>
                
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
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" @click.stop.prevent="handleCloseModal" v-if="isModalToggled || isReplyModalToggled"
            @touchmove.prevent @mousewheel.prevent>
            </div>
        </div>
        <Footer :current-page="`main`"/>
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
import tweetsAPI from '../apis/tweets.js'
import usersAPI from '../apis/users.js'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers.js'
import MainTweetInput from "../components/MainTweetInput.vue"

export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        MainHeader,
        MainTweetModal,
        Footer,
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
        this.fetchTweets()
        this.fetchUser(this.currentUser.id)
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
                    icon: 'error',
                    title: '目前無法取得使用者頭像，請稍後再試'
                })
            }
        },
        async fetchTweets () {
            try {
                this.isTweetLoading = true
                const response = await tweetsAPI.getTweets()
                if (response.statusText !== 'OK') throw new Error(response.statusText)
                this.tweets = response.data
                this.isTweetLoading = false
            }
            catch (error) {
                console.log(error)
                this.isTweetLoading = false
                Toast.fire({
                    icon: 'error',
                    title: '無法取得推文,請稍後再試'
                })
            }
        },
        handleToggleModal(isModalToggled){
            this.isModalToggled = isModalToggled
        },
        handleCloseModal(){
            this.isModalToggled = false
            this.isReplyModalToggled = false
        },
        handleAddTweet(tweet){
            this.tweets = [
                tweet, ...this.tweets
            ]
            this.fetchTweets()
        },
        handleToggleReplyModal(isReplyModalToggled){
            this.isReplyModalToggled = isReplyModalToggled
        },
        handlePassTweetData(tweet){
            this.clickedTweet = tweet
        },
    }
}
</script>