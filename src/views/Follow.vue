<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <UserHeader :content="`Raven`" :counts="25"/>
                <HomeTabs />
                <div class="tweets__container">
                    <UserFollowCard />
                    <UserFollowCard />
                    <UserFollowCard />
                </div>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" v-if="false">
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import UserHeader from '../components/UserHeader.vue'
import UserFollowCard from '../components/UserFollowCard.vue'
import HomeTabs from '../components/HomeTabs.vue'
import Footer from '../components/Footer.vue'
// import { Toast } from '../utils/helpers.js'


export default {
    components: {
        SideBar,
        RecommendUsers,
        UserHeader,
        UserFollowCard,
        HomeTabs,
        Footer
    },
    data () {
        return {

        }
    },
    created () {

    },
    methods: {

    }
}
</script>