<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <UserEditModal v-if="false"/>
                <UserHeader :content="`Raven`" :counts="`25`"/>
                <div class="tweet__input">
                </div>
                <HomeTabs :user-id="1"/>
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
        <Footer :current-page="`user`"/>
    </div>
</template>

<script>
import TweetCard from '../components/TweetCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import UserHeader from '../components/UserHeader.vue'
import HomeTabs from '../components/HomeTabs.vue'
import UserEditModal from '../components/UserEditModal.vue'
import Footer from '../components/Footer.vue'

export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        UserHeader,
        HomeTabs,
        UserEditModal,
        Footer
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