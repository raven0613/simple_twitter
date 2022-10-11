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
                @after-submit="handleAddTweet"
                :initial-tweet="tweet"/>

                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"/>

                <MainHeader :content="`推文`" :tweet-id="1"/>
                <MainTweet :initial-data="tweet"
                @after-toggle-modal="handleToggleReplyModal"/>

                <div class="tweet-detail__input">
                </div>
                <div class="tweets__container">
                    <ReplyCard 
                    v-for="reply in replies" 
                    :key="reply.id"
                    :reply="reply"
                    :tweet-owner="tweet.User.account"/>
                </div>
            </main>

            <section class="right__container">
                <RecommendUsers />
            </section>
            <div class="modal__mask" 
            @click.stop.prevent="handleCloseModal"
            v-if="isModalToggled || isReplyModalToggled"
            @touchmove.prevent @mousewheel.prevent>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import ReplyCard from '../components/ReplyCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import MainHeader from '../components/MainHeader.vue'
import MainTweet from '../components/MainTweet.vue'
import Footer from '../components/Footer.vue'
import MainReplyModal from '../components/MainReplyModal.vue'
import MainTweetModal from '../components/MainTweetModal.vue'
import tweetsAPI from '../apis/tweets.js'
import { Toast } from '../utils/helpers.js'

export default {
    components: {
        ReplyCard,
        SideBar,
        RecommendUsers,
        MainHeader,
        MainTweet,
        Footer,
        MainReplyModal,
        MainTweetModal
    },
    data () {
        return {
            tweet: {},
            replies: [],
            isModalToggled: false,
            isReplyModalToggled: false
        }
    },
    created () {
        const { id: tweetId } = this.$route.params
        this.fetchTweet(tweetId)
        this.fetchReplies(tweetId)
    },
    beforeRouteUpdate(to, from, next){
        const {id} = to.params
        this.fetchTweet(id)
        this.fetchReplies(id)
        next()
    },
    methods: {
        async fetchTweet (id) {
            try {
                const response = await tweetsAPI.getTweet({id})
                this.tweet = response.data
            }
            catch (error) {
                console.log(error)
                return Toast.fire({
                    icon: 'error',
                    title: '目前無法取得推文，請稍後再試'
                })
            }
        },
        async fetchReplies (id) {
            try {
                const response = await tweetsAPI.getReplies({id})
                this.replies = response.data
            }
            catch (error) {
                console.log(error)
                return Toast.fire({
                    icon: 'error',
                    title: '目前無法取得回覆，請稍後再試'
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
        handleAddTweet(){
            this.$router.push({name: 'main-page'})
        },
        handleToggleReplyModal(isReplyModalToggled){
            this.isReplyModalToggled = isReplyModalToggled
        },
        handleAddReply(reply){
            this.replies = this.replies.push(reply)
            this.fetchReplies(this.tweet.id)
        },
    }
}
</script>