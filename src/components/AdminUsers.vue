<template>
  <div class="user-card__container">
    <!-- 背景圖 -->
    <div class="user-card__background">
      <img src="../assets/images/admin-bg.jpg" alt="">
    </div>

    <!-- 頭像 -->
    <div class="user-card__avatar">
      <img src="../assets/images/admin-user.jpg" alt="">
    </div>

    <!-- 資訊 -->
    <div class="user-card__info">
      <div class="user-card__info--name">Eric Liao</div>
      <div class="user-card__info--account">@heyeric </div>
      <div class="user-card__info--icons">
        <div class="user-card__info--icon">
          <img src="../assets/images/admin-tweet.svg" alt="">
          <span>1.5k</span>
        </div>
        <div class="user-card__info--icon">
          <img src="../assets/images/admin-like.svg" alt="">
          <span><span class="montserrat-font">20</span>k</span>
        </div>
      </div>
      <div class="user-card__info--followships">
        <span class="user-card__info--follow">
          <span><span class="montserrat-font">20</span>k個</span>
          <span>跟隨中</span>
        </span>
        <span class="user-card__info--follow">
          <span><span class="montserrat-font">20</span>k位</span>
          <span>跟隨者</span>
        </span>
      </div>
    </div>
  </div>
</template>
