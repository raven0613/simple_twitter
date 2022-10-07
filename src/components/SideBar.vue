<template>
    <div class="side-bar__panel">
        <div class="side-bar__container">

            <router-link :to="{name: 'main-page'}" class="side-bar__icon">
                <img src="../assets/images/sidebar_logo.svg" alt="">
            </router-link>

            <router-link :to="{name: 'main-page'}" class="side-bar__link">
                <img v-if="currentPage === `main`" src="../assets/images/sidebar_home_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_home.svg" alt="">
                <span :class="{sidebar__active: currentPage === `main`}">首頁</span>
            </router-link>

            <router-link :to="{name: 'user-detail'}" class="side-bar__link">
                <img v-if="currentPage === `user`" src="../assets/images/sidebar_user_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_user.svg" alt="">
                <span :class="{sidebar__active: currentPage === `user`}">個人資料</span>
            </router-link>

            <router-link :to="{name: 'settings'}" class="side-bar__link">
                <img v-if="currentPage === `setting`" src="../assets/images/sidebar_setting_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_setting.svg" alt="">
                <span :class="{sidebar__active: currentPage === `setting`}">設定</span>
            </router-link>

            <button type="button" class="side-bar__button">
                <img src="../assets/images/sidebar_tweet_ipad.svg" alt="">
                <span>推文</span>
            </button>
        </div>

        <router-link to="#" class="side-bar__link side-bar__link--logout">
            <img src="../assets/images/sidebar_logout.svg" alt="">
            <span>登出</span>
        </router-link>
    </div>
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