<template>
    <div class="side-bar__panel">
        <div class="side-bar__container">
            <router-link to="#" class="side-bar__icon">
                <img src="../assets/images/sidebar_logo.svg" alt="">
            </router-link>
            <router-link to="#" class="side-bar__link">
                <img src="../assets/images/sidebar_home.svg" alt="">
                <span>推文清單</span>
            </router-link>
            <router-link to="#" class="side-bar__link">
                <img src="../assets/images/sidebar_user.svg" alt="">
                <span>使用者列表</span>
            </router-link>
        </div>

        <router-link to="#" class="side-bar__link">
            <img src="../assets/images/sidebar_logout.svg" alt="">
            <span>登出</span>
        </router-link>
    </div>
</template>