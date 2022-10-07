<template>
    <footer class="footer">

        <router-link :to="{name: 'main-page'}" class="footer__button">
            <img v-if="currentPage === `main`" src="../assets/images/sidebar_home_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_home.svg" alt="">
        </router-link>

        <router-link to="#" class="footer__button">
            <img src="../assets/images/sidebar_tweet_mobile.svg" alt="">
        </router-link>

        <router-link :to="{name: 'user-detail'}" class="footer__button">
            <img v-if="currentPage === `user`" src="../assets/images/sidebar_user_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_user.svg" alt="">
        </router-link>

        <router-link :to="{name: 'settings'}" class="footer__button">
            <img v-if="currentPage === `setting`" src="../assets/images/sidebar_setting_active.svg" alt="">
            <img v-else src="../assets/images/sidebar_setting.svg" alt="">
        </router-link>
        
    </footer>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: String,
        }
    }
}
</script>