<template>
  <div>
    <div class="modal_container">
      <!-- 最上方的區塊 -->
      <div class="modal_input_container">
        <img
          src="../assets/images/cancel-orange.svg"
          alt=""
          class="modal_input--cancel"
        />
        <p class="modal_input--title">編輯個人資料</p>
        <button class="modal_input--save">儲存</button>
      </div>

      <!-- 背景圖片跟個人照 -->
      <div class="user-info_image_container">
        <div class="user-info_background_container">
          <img
            src="../assets/images/user-bg.svg"
            alt=""
            class="user-info_background--photo"
          />
          <span class="user-info_background--mask"></span>
          <div class="user-info_background_icons_container">
            <img
              src="../assets/images/add-photo.svg"
              alt=""
              class="user-info_background_icon"
            />
            <img
              src="../assets/images/cancel-white.svg"
              alt=""
              class="user-info_background_icon"
            />
          </div>
        </div>

        <div class="user-info_avatar_container">
          <img
            src="../assets/images/avatar.svg"
            alt=""
            class="user-info_avatar--photo"
          />
          <span class="user-info_avatar--mask"></span>
          <div class="user-info_avatar_icons_container">
            <img
              src="../assets/images/add-photo.svg"
              alt=""
              class="user-info_avatar_icon"
            />
          </div>
        </div>
      </div>

      <!-- 表格 -->
      <form class="form form_container">
        <div class="form_input">
          <div class="form_input_container">
            <label for="name">名稱</label>
            <input
              id="name"
              name="name"
              type="name"
              placeholder="John Doe"
              autocomplete="name"
              required
              autofocus
            />
          </div>
        </div>
        <div class="form_input">
          <div class="form_input_container">
            <label for="introduction">自我介紹</label>
            <input
              id="introduction"
              name="name"
              type="name"
              placeholder="John Doe"
              autocomplete="name"
              required
              autofocus
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>