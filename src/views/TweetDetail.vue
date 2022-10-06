<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <MainHeader :content="`推文`" :tweet-id="1"/>
                <MainTweet />

                <div class="tweet-detail__input">
                </div>
                <div class="tweets__container">
                    <ReplyCard />
                    <ReplyCard />
                    <ReplyCard />
                    <ReplyCard />
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
import ReplyCard from '../components/ReplyCard.vue'
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import MainHeader from '../components/MainHeader.vue'
import MainTweet from '../components/MainTweet.vue'

export default {
    components: {
        ReplyCard,
        SideBar,
        RecommendUsers,
        MainHeader,
        MainTweet
    },
}
</script>