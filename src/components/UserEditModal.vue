<template>
  <div class="modal">
    <div class="modal__container">
      <!-- 最上方的區塊 -->
      <div class="modal__input__container">
        <img
          src="../assets/images/last-step.svg"
          alt=""
          class="modal__input--last-step"
        />
        <img
          src="../assets/images/cancel-orange.svg"
          alt=""
          class="modal__input--cancel"
        />
        <p class="modal__input--title">編輯個人資料</p>
        <button class="modal__input--save">儲存</button>
      </div>

      <!-- 背景圖片跟個人照 -->
      <div class="user-info__image__container">
        <div class="user-info__background__container">
          <img
            :src="user.coverPhoto"
            alt=""
            class="user-info__background--photo"
          />
          <span class="user-info__background--mask"></span>
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
          </div>
        </div>

        <div class="user-info__avatar__container">
          <img
            :src="user.profilePhoto"
            alt=""
            class="user-info__avatar--photo"
          />
          <span class="user-info__avatar--mask"></span>
          <div class="user-info__avatar__icons__container">
            <img
              src="../assets/images/add-photo.svg"
              alt=""
              class="user-info__avatar__icon"
            />
          </div>
        </div>
      </div>

      <!-- 表格 -->
      <form class="form form__container">
        <div class="form__input">
          <div class="form__input__container">
            <label for="name">名稱</label>
            <input
              id="name"
              name="name"
              type="name"
              placeholder="John Doe"
              autocomplete="name"
              required
              autofocus
              v-model="user.name"
            />
          </div>
          <span class="form__text-length montserrat-font">8/50</span>
        </div>
        <div class="form__input" id="introduction__input">
          <div class="form__input__container">
            <label for="introduction">自我介紹</label>
            <input
              id="introduction"
              name="name"
              type="name"
              placeholder="談談你自己吧..."
              autocomplete="name"
              required
              autofocus
              v-model="user.introduction"
            />
          </div>
          <span class="form__text-length montserrat-font">0/160</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserEditModal",
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        account: "",
        coverPhoto: "",
        email: "",
        introduction: "",
        name: "",
        profilePhoto: "",
      }),
    },
  },
  data(){
    return{
      user:this.initialUser
      
    }
  }
};
</script>