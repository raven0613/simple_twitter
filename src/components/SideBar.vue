<template>
    <div class="side-bar__panel">
        <div class="side-bar__container">
            <router-link class="side-bar__icon">
                <img src="../assets/images/sidebar_logo.svg" alt="">
            </router-link>
            <router-link class="side-bar__link">
                <img src="../assets/images/sidebar_home.svg" alt="">
                首頁
            </router-link>
            <router-link class="side-bar__link">
                <img src="../assets/images/sidebar_home.svg" alt="">
                個人資料
            </router-link>
            <router-link class="side-bar__link">
                <img src="../assets/images/sidebar_home.svg" alt="">
                設定
            </router-link>
            <button type="button" class="side-bar__button">
                推文
            </button>
        </div>
        <button type="button">
            登出
        </button>
    </div>
</template>

<script>
export default {
    data () {
        
    },
}
</script>