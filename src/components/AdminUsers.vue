<template>
  <div class="user-card__container" >
    <!-- 背景圖 -->
    <div class="user-card__background">
      <img :src="user.coverPhoto" alt="">
    </div>

    <!-- 頭像 -->
    <div class="user-card__avatar">
      <img :src="user.profilePhoto" alt="">
    </div>

    <!-- 資訊 -->
    <div class="user-card__info">
      <div class="user-card__info--name">{{user.name}}</div>
      <div class="user-card__info--account">@{{user.account}}</div>
      <div class="user-card__info--icons">
        <div class="user-card__info--icon">
          <img src="../assets/images/admin-tweet.svg" alt="">
          <span><span class="montserrat-font">{{user.tweetCounts}}</span></span>
        </div>
        <div class="user-card__info--icon">
          <img src="../assets/images/admin-like.svg" alt="">
          <span><span class="montserrat-font">{{user.likeCounts}}</span></span>
        </div>
      </div>
      <div class="user-card__info--followships">
        <span class="user-card__info--follow">
          <span><span class="montserrat-font">{{user.followingCounts}}</span>個</span>
          <span>跟隨中</span>
        </span>
        <span class="user-card__info--follow">
          <span><span class="montserrat-font">{{user.followerCounts}}</span>位</span>
          <span>跟隨者</span>
        </span>
      </div>
    </div>
  </div>
</template>
    

<script>
// import { emptyImageFilter } from "../utils/mixins";

export default {
  props: {
    initialUser: {
      type: Object,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  }
  // mixins: [emptyImageFilter],
};
</script>