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
import Header from '../components/Header.vue'

export default {
    components: {
        ReplyCard,
        SideBar,
        RecommendUsers,
        Header
    },
}
</script>