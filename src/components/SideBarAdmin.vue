<template>
    <div class="side-bar__panel">
        <div class="side-bar__container">

            <router-link :to="{name: 'admin-tweet'}" class="side-bar__icon">
                <img src="../assets/images/sidebar_logo.svg" alt="">
            </router-link>

            <router-link :to="{name: 'admin-tweet'}" class="side-bar__link">
                <img v-if="currentPage === `tweets`" src="../assets/images/sidebar_home_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_home.svg" alt="">
                <span :class="{sidebar__active: currentPage === `tweets`}">推文清單</span>
            </router-link>

            <router-link :to="{name: 'admin-user'}" class="side-bar__link">
                <img v-if="currentPage === `users`" src="../assets/images/sidebar_user_active.svg" alt="">
                <img v-else src="../assets/images/sidebar_user.svg" alt="">
                <span :class="{sidebar__active: currentPage === `users`}">使用者列表</span>
            </router-link>
        </div>

        <router-link to="#" class="side-bar__link">
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