<template>
  <div class="setting-form">
    <!-- 輸入表格 -->
    <form
      @submit.prevent.stop="handleSubmit"
      @keyup.enter.prevent.stop="handleSubmit"
      class="form form__container"
    >
      <div :class="['form__input', { formError: formErrorAccount }]">
        <div class="form__input__container">
          <label for="account">帳號</label>
          <input
            id="account"
            name="account"
            type="account"
            placeholder="請輸入帳號"
            autocomplete="username"
            autofocus
            v-model="initialUserData.account"
          />
        </div>
      </div>

      <div :class="['form__input', { formError: formErrorName }]">
        <div class="form__input__container">
          <label for="name">名稱</label>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="請輸入使用者名稱"
            autocomplete="name"
            autofocus
            v-model="initialUserData.name"
          />
        </div>
      </div>

      <div :class="['form__input', { formError: formErrorEmail }]">
        <div class="form__input__container">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="請輸入Email"
            autocomplete="email"
            autofocus
            v-model="initialUserData.email"
          />
        </div>
      </div>

      <div :class="['form__input', { formError: formErrorPassword }]">
        <div class="form__input__container">
          <label for="password">密碼</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="請輸入密碼"
            autocomplete="current-password"
            autofocus
            v-model="initialUserData.password"
          />
        </div>
      </div>

      <div :class="['form__input', { formError: formErrorCheckPassword }]">
        <div class="form__input__container">
          <label for="passwordCheck">密碼確認</label>
          <input
            id="passwordCheck"
            name="checkPassword"
            type="password"
            placeholder="請再次輸入密碼"
            autocomplete="current-password"
            autofocus
            v-model="initialUserData.checkPassword"
          />
        </div>
      </div>

      <!-- button們 -->
      <div class="form__button__container">
        <button class="form__button" type="submit">儲存</button>
        <div class="form__links">
          <router-link to="" class="form__links--link">登出</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import usersAPI from "../apis/users";

export default {
  name: "SettingPanel",
  data() {
    return {
      initialUserData:{
        name: "",
        email: "",
        account: "",
        password: "",
        checkPassword: "",
      },
      // userData:{
      //   name: "",
      //   email: "",
      //   account: "",
      //   password: "",
      //   checkPassword: "",
      // },
      formErrorName: false,
      formErrorEmail: false,
      formErrorAccount: false,
      formErrorPassword: false,
      formErrorCheckPassword: false,
    };
  },
  created() {
    this.fetchCurrentUser(24)
  },
  // watch:{
  //   initialUserData:{
  //     handler: function () {
        
  //     },
  //     // 控制更深層的部份
  //     deep: true
  //   }
  // },
  methods: {
    async fetchCurrentUser(userId) {
      try {
        const {data} = await usersAPI.getUser({ userId });
        const { name, email, account, password, checkPassword } = data
        this.initialUserData = {
          ...this.initialUserData,
          name,
          email, 
          account,
          password, 
          checkPassword
        }

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料,請稍後再試",
        });
      }
    },
    async handleSubmit() {
      try {
        // 當按下按鈕後，所有底線為黑/藍線
        this.formErrorName = false;
        this.formErrorEmail = false;
        this.formErrorAccount = false;
        this.formErrorPassword = false;
        this.formErrorCheckPassword = false;

        // 每一個欄位都是必填，若有欄位為空會有錯誤提示「該項目為必填」，錯誤底線就為紅色
        //TODO:(待優化)
        if (!this.account) {
          this.formErrorAccount = true;
          Toast.fire({
            icon: "error",
            title: "帳號欄位為必填",
          });
          return;
        }
        if (!this.name) {
          this.formErrorName = true;
          Toast.fire({
            icon: "error",
            title: "名稱欄位為必填",
          });
          return;
        }
        if (!this.email) {
          this.formErrorEmail = true;
          Toast.fire({
            icon: "error",
            title: "Email欄位為必填",
          });
          return;
        }
        if (!this.password) {
          this.formErrorPassword = true;
          Toast.fire({
            icon: "error",
            title: "密碼欄位為必填",
          });
          return;
        }
        if (!this.checkPassword) {
          this.formErrorCheckPassword = true;
          Toast.fire({
            icon: "error",
            title: "密碼確認欄位為必填",
          });
          return;
        }

        // 當使用者密碼與確認密碼不相同會有錯誤提示「密碼與確認密碼不符」，兩欄都呈現紅線
        if (this.password !== this.checkPassword) {
          this.formErrorPassword = true;
          this.formErrorCheckPassword = true;
          Toast.fire({
            icon: "error",
            title: "密碼與確認密碼不符",
          });
          return;
        }
        

        // 成功取得資料，所有底線為黑/藍線
        this.formErrorName = false;
        this.formErrorEmail = false;
        this.formErrorAccount = false;
        this.formErrorPassword = false;
        this.formErrorCheckPassword = false;

        // TODO:把1改成currentUser的id
        this.$router.push("/users/1");
      } catch (error) {
        // 想要拿到data.message，要知道是包在error.response裡
        const message = error.response.data.message.toLowerCase();

        if (message.includes("account")) {
          this.formErrorAccount = true;
        } else if (message.includes("email")) {
          this.formErrorEmail = true;
        }

        Toast.fire({
          icon: "error",
          title: message,
        });
      }
    },
  },
};
</script>
