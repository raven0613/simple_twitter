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
                <HomeTabs />
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
import HomeTabs from '../components/HomeTabs.vue'
import UserEditModal from '../components/UserEditModal.vue'

export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        Header,
        HomeTabs,
        UserEditModal
    },
    data () {
        return {
            tweets: ['','','',''],
        }
    },
    created () {
    },
    methods: {

    }
}
</script>