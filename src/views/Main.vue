<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <header class="main__header">homepage</header>
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
                <div class="recommend__panel"></div>
            </section>
        </div>
        <footer class="footer__controller">

        </footer>
    </div>
</template>

<script>
import TweetCard from '../components/TweetCard.vue'
import SideBar from '../components/SideBar.vue'
export default {
    components: {
        TweetCard,
        SideBar
    },
    data() {
        
    },
}
</script>