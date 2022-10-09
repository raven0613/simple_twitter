<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`main`" :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
            </section>
            <main class="main__container">
                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"/>
                <MainHeader :content="`首頁`" :user-id="1"/>
                
                <MainTweetInput :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
                <div class="tweets__container">
                    <TweetCard 
                    v-for="tweet in tweets" 
                    :key="tweet.id"
                    :initial-tweet="tweet"/>
                </div>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" @click.stop.prevent="handleCloseModal" v-if="isModalToggled">
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
import Footer from '../components/Footer.vue'
import tweetsAPI from '../apis/tweets.js'
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
        MainTweetInput
    },
    data () {
        return {
            tweets: [],
            isModalToggled: false,
        }
    },
    created () {
        this.fetchTweets()
    },
    watch: {
        tweets() {
            this.fetchTweets()
        }
    },
    methods: {
        async fetchTweets () {
            try {
                const response = await tweetsAPI.getTweets()
                if (response.statusText !== 'OK') throw new Error(response.statusText)
                this.tweets = response.data
            }
            catch (error) {
                console.log(error)
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
        },
        handleAddTweet(tweet){
            this.tweets = [
                tweet, ...this.tweets
            ]
        }
    }
}
</script>