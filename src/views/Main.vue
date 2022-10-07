<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`main`"/>
            </section>
            <main class="main__container">
                <UserEditModal v-if="false"/>
                <MainHeader :content="`首頁`" :user-id="`1`"/>
                <MainTweetInput />
                <div class="tweets__container">
                    <TweetCard 
                    v-for="tweet in tweets" 
                    :key="tweet.id"
                    :initial-data="tweet"/>
                </div>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" v-if="false">
            </div>
        </div>
        <Footer :current-page="`main`"/>
    </div>
    <footer class="footer__controller"></footer>
  </div>
</template>

<script>
import TweetCard from '../components/TweetCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import MainHeader from '../components/MainHeader.vue'
import UserEditModal from '../components/UserEditModal.vue'
import Footer from '../components/Footer.vue'
import tweetsAPI from '../apis/tweets.js'
import { Toast } from '../utils/helpers.js'
import MainTweetInput from "../components/MainTweetInput.vue";

export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        MainHeader,
        UserEditModal,
        Footer,
        MainTweetInput
    },
    data () {
        return {
            tweets: [],
        }
    },
    created () {
        this.fetchTweets()
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
        }
    }
}
</script>