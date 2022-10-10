<template>
  <div>
    <div class="modal__container user-info__container">
      <!-- 背景圖片跟個人照 -->
      <div class="user-info__image__container">
        <div class="user-info__background__container">
          <img
            :src="user.coverPhoto"
            alt=""
            class="user-info__background--photo"
          />
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
          <img
            :src="user.profilePhoto"
            alt=""
            class="user-info__avatar--photo"
          />
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
          <button
            class="user-info__controller--edit prim-button prim-button__edit"
            @click.stop.prevent="toggleModal"
          >
            編輯個人資料
          </button>
          <button class="user-info__controller--message">
            <img src="../assets/images/userinfo_msg.svg" alt="" />
          </button>
          <button class="user-info__controller--noti">
            <img src="../assets/images/userinfo_noti.svg" alt="" />
          </button>
          <button
            class="
              user-info__controller--message
              prim-button prim-button__followed
            "
          >
            正在跟隨
          </button>
          <button
            class="
              user-info__controller--message
              prim-button prim-button__unfollowed
            "
          >
            跟隨
          </button>
        </div>

        <!-- 個人資訊 -->
        <div class="user-info__panel">
          <h5 class="user-info__panel--name">{{ user.name }}</h5>
          <div class="user-info__panel--account">@{{ user.account }}</div>
          <div class="user-info__panel--description">
            {{ user.introduction }}
          </div>
          <div class="user-info__panel--follow__container">
            <router-link
              :to="{ name: 'user-following', params: { id: 4 } }"
              class="user-info__panel--follow"
            >
              <span>「待改」個</span>
              <span>跟隨中</span>
            </router-link>
            <router-link
              :to="{ name: 'user-follower', params: { id: 4 } }"
              class="user-info__panel--follow"
            >
              <span>「待改」位</span>
              <span>跟隨者</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPanel",
  props: {
    iniIsModalToggled: {
      type: Boolean,
      required: true,
    },
    user: {
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
  data() {
    return {
      isEditModalToggled :this.iniIsModalToggled
    }
  },
  methods: {
    toggleModal() {
      console.log("123");
      this.isEditModalToggled = true;
      this.$emit("after-toggle-modal", this.isEditModalToggled);
    },
  },
};
</script>