<template>
    <div class="twitter__project">
        <div class="admin-container">
            <section class="left__container">
                <SideBarAdmin :current-page="`tweets`"/>
            </section>
            <main class="main__container">
                <MainHeader :content="`推文清單`"/>
                <div class="tweets__container">
                    <p v-if="!tweets.length">目前無任何推文</p>
                    <AdminTweets v-else 
                    v-for="tweet in tweets" 
                    :key="tweet.id" 
                    :initial-tweet="tweet"
                    @after-delete-tweet="afterDeleteTweet"/>
                </div>
            </main>

            
        </div>
        <footer class="footer__controller">
            
        </footer>
    </div>
</template>

<script>
import SideBarAdmin from '../components/SideBarAdmin.vue'
import MainHeader from '../components/MainHeader.vue'
import AdminTweets from '../components/AdminTweets.vue'
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'



export default {
    components: {
        SideBarAdmin,
        MainHeader,
        AdminTweets
    },
    data () {
        return {
            tweets: []
        }
    },
    created () {
        this.fetchAdminTweets()
    },
    methods: {
        async fetchAdminTweets () {
            try {
                const { data } = await adminAPI.getAdminTweets()
                this.tweets = [...data]
            }
            catch (error) {
                console.log(error)
                return Toast.fire({
                    icon: 'error',
                    title: '無法取得推文，請稍候再試'
                })
            }
        },
        afterDeleteTweet (id) {
            this.tweets = this.tweets.filter((tweet) => (tweet.id !== id))
        }
    }
}
</script>