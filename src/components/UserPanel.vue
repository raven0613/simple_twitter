<template>
  <div>
    <div class="modal__container user-info__container">
      <!-- 背景圖片跟個人照 -->
      <div class="user-info__image__container">
        <div class="user-info__background__container">
          <img src="../assets/images/user-bg.svg" alt="" class="user-info__background--photo" />
          <!-- <span class="user-info__background--mask"></span>
          <div class="user-info__background__icons__container">
            <img
              src="../assets/images/add-photo.svg"
              alt=""
              class="user-info__background__icon"
            />
            <img
              src="../assets/images/cancel-white.svg"
              alt=""
              class="user-info__background__icon"
            />
          </div> -->
        </div>

        <div class="user-info__avatar__container">
          <img src="../assets/images/avatar.svg" alt="" class="user-info__avatar--photo" />
          <!-- <span class="user-info__avatar--mask"></span>
          <div class="user-info__avatar__icons__container">
            <img
              src="../assets/images/add-photo.svg"
              alt=""
              class="user-info__avatar__icon"
            />
          </div> -->
        </div>
      </div>

      <div class="user-info__data__container">
        <!-- 各種按鈕誒 -->
        <div class="user-info__controller">
          <button class="user-info__controller--edit">編輯個人資料</button>
          <button class="user-info__controller--message"><img src="../assets/images/userinfo_msg.svg" alt=""></button>
          <button class="user-info__controller--noti"><img src="../assets/images/userinfo_noti.svg" alt=""></button>
          <button class="user-info__controller--message prim-button prim-button__followed">正在跟隨</button>
          <button class="user-info__controller--message prim-button prim-button__unfollowed">跟隨</button>
        </div>

        <!-- 個人資訊 -->
        <div class="user-info__panel">
          <h5 class="user-info__panel--name">John doe</h5>
          <div class="user-info__panel--account">@heyjohn</div>
          <div class="user-info__panel--description">捰四遺咯錢端宮城獅</div>
          <div class="user-info__panel--follow__container">
            <span class="user-info__panel--follow">
              <span>34個</span>
              <span>跟隨中</span>
            </span>
            <span class="user-info__panel--follow">
              <span>56位</span>
              <span>跟隨者</span>
            </span>
          </div>

        </div>
      </div>


    </div>
  </div>
</template>