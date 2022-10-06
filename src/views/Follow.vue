<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <Header />
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
        <footer class="footer__controller">
            
        </footer>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import Header from '../components/Header.vue'
import UserFollowCard from '../components/UserFollowCard.vue'
import HomeTabs from '../components/HomeTabs.vue'
// import { Toast } from '../utils/helpers.js'


export default {
    components: {
        SideBar,
        RecommendUsers,
        Header,
        UserFollowCard,
        HomeTabs
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