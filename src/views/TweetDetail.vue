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
                @after-submit="handleAddReply"
                :initial-tweet="tweet"
                :is-in-detail-page="true"/>

                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"/>

                <MainHeader :content="`推文`" :tweet-id="tweet.id"/>

                <MainTweet 
                v-if="!isLoading"
                :initial-data="tweet"
                @after-toggle-modal="handleToggleReplyModal"/>
                <Spinner v-else/>

                <div class="tweet-detail__input">
                    <MainTweetInput 
                    :ini-is-modal-toggled="isModalToggled"
                    @after-toggle-modal="handleToggleModal"/>
                </div>
                <div v-if="!isLoading" class="tweets__container">
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
import MainTweetInput from "../components/MainTweetInput.vue"
import Spinner from '../components/Spinner.vue'
import tweetsAPI from '../apis/tweets.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'

export default {
    components: {
        ReplyCard,
        SideBar,
        RecommendUsers,
        MainHeader,
        MainTweet,
        Footer,
        MainReplyModal,
        MainTweetModal,
        MainTweetInput,
        Spinner
    },
    data () {
        return {
            tweet: {},
            replies: [],
            isModalToggled: false,
            isReplyModalToggled: false,
            isTweetLoading: true,
            isReplyLoading: true
        }
    },
    created () {
        const { id: tweetId } = this.$route.params
        this.fetchTweet(tweetId)
        this.fetchReplies(tweetId)
    },
    beforeRouteUpdate(to, from, next){
        this.isTweetLoading = true
        this.isReplyLoading = true
        const {id} = to.params
        this.fetchTweet(id)
        this.fetchReplies(id)
        next()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
        isLoading () {
            if (!this.isTweetLoading && !this.isReplyLoading) {
                return false
            }
            return true
        }
    },
    methods: {
        async fetchTweet (id) {
            try {
                this.isTweetLoading = true
                const response = await tweetsAPI.getTweet({id})
                this.tweet = response.data
                this.isTweetLoading = false
            }
            catch (error) {
                console.log(error)
                this.isTweetLoading = false
                return Toast.fire({
                    icon: 'error',
                    title: '目前無法取得推文，請稍後再試'
                })
            }
        },
        async fetchReplies (id) {
            try {
                this.isReplyLoading = true
                const response = await tweetsAPI.getReplies({id})
                this.replies = response.data
                this.isReplyLoading = false
            }
            catch (error) {
                console.log(error)
                this.isReplyLoading = false
                return Toast.fire({
                    icon: 'error',
                    title: '目前無法取得回覆，請稍後再試'
                })
            }
        },
        handleToggleModal(isModalToggled){
            this.isModalToggled = isModalToggled
            history.pushState({ name: "new-tweet" }, null, "/#/tweet/new");
        },
        handleCloseModal(){
            this.isModalToggled = false
            this.isReplyModalToggled = false
            this.$router.back();
        },
        handleAddTweet(){
            this.$router.push({name: 'main-page'})
        },
        handleToggleReplyModal(isReplyModalToggled){
            this.isReplyModalToggled = isReplyModalToggled
            history.pushState({ name: "new-reply" }, null, "/#/reply/new");
        },
        handleAddReply(reply){
            this.replies.push(reply)
            this.tweet = {
                ...this.tweet,
                replyCounts: this.tweet.replyCounts + 1
            }
            //
            this.fetchReplies(this.tweet.id)
        },
    }
}
</script>