<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <UserEditModal v-if="false"/>
                <Header />
                <div class="tweet__input">

                </div>
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
        <footer class="footer__controller">
            
        </footer>
    </div>
</template>

<script>
import TweetCard from '../components/TweetCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import Header from '../components/Header.vue'
import UserEditModal from '../components/UserEditModal.vue'
import tweetsAPI from '../apis/tweets.js'
import { Toast } from '../utils/helpers.js'
import UserFollowCard from '../components/UserFollowCard.vue'


export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        Header,
        UserEditModal,
        UserFollowCard
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
                const { data } = await tweetsAPI.getTweets()
                if (data.status !== 'success') throw new Error(data.message)
                console.log(data)
                this.tweets = data.data.tweets
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