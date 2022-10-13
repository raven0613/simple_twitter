<template>
    <div class="twitter__project">
        <div class="admin-container">
            <section class="left__container">
                <SideBarAdmin :current-page="`tweets`"/>
            </section>
            <main class="main__container">
                <MainHeader :content="`推文清單`"/>
                <div v-if="!isLoading" class="tweets__container">
                    <p v-if="!tweets.length">目前無任何推文</p>
                    <AdminTweets v-else 
                    v-for="tweet in tweets" 
                    :key="tweet.id" 
                    :initial-tweet="tweet"
                    @after-delete-tweet="afterDeleteTweet"/>
                </div>
                <Spinner v-else/>
            </main>

            
        </div>
        <FooterAdmin 
        :current-page="`main`"/>
    </div>
</template>

<script>
import SideBarAdmin from '../components/SideBarAdmin.vue'
import FooterAdmin from '../components/FooterAdmin.vue'
import MainHeader from '../components/MainHeader.vue'
import AdminTweets from '../components/AdminTweets.vue'
import Spinner from '../components/Spinner.vue'
import adminAPI from '../apis/admin.js'
import { Toast, innerHtml } from '../utils/helpers.js'
import { mapState } from 'vuex'



export default {
    components: {
        SideBarAdmin,
        MainHeader,
        AdminTweets,
        FooterAdmin,
        Spinner
    },
    data () {
        return {
            tweets: [],
            isLoading: true
        }
    },
    created () {
        this.fetchAdminTweets()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
    },
    methods: {
        async fetchAdminTweets () {
            try {
                this.isLoading = true
                const { data } = await adminAPI.getAdminTweets()
                this.tweets = [...data]
                this.isLoading = false
            }
            catch (error) {
                console.log(error)
                this.isLoading = false
                return Toast.fire({
                    html: innerHtml('無法取得貼文，請稍後再試','error')
                })
            }
        },
        afterDeleteTweet (id) {
            this.tweets = this.tweets.filter((tweet) => (tweet.id !== id))
        }
    }
}
</script>