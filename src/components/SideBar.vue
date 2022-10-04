<template>
    <div class="side-bar__panel">
        <div class="side-bar__container">
            <router-link to="#" class="side-bar__icon">
                <img src="../assets/images/sidebar_logo.svg" alt="">
            </router-link>
            <router-link to="#" class="side-bar__link">
                <img src="../assets/images/sidebar_home.svg" alt="">
                <span>首頁</span>
            </router-link>
            <router-link to="#" class="side-bar__link">
                <img src="../assets/images/sidebar_user.svg" alt="">
                <span>個人資料</span>
            </router-link>
            <router-link to="#" class="side-bar__link">
                <img src="../assets/images/sidebar_setting.svg" alt="">
                <span>設定</span>
            </router-link>
            <button type="button" class="side-bar__button">
                <img src="../assets/images/sidebar_tweet_ipad.svg" alt="">
                <span>推文</span>
            </button>
        </div>
        <router-link to="#" class="side-bar__link">
            <img src="../assets/images/sidebar_logout.svg" alt="">
            <span>登出</span>
        </router-link>
    </div>
</template>

<script>
export default {
    data () {
        
    },
}
</script>