<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <Header />
                <div class="tweet__input">

                </div>
                <div class="tweets__container">
                    <TweetCard />
                    <TweetCard />
                    <TweetCard />
                    <TweetCard />
                    <TweetCard />
                </div>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>
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

export default {
    components: {
        TweetCard,
        SideBar,
        RecommendUsers,
        Header
    },
}
</script>