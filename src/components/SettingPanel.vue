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
            v-model="userData.account"
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
            v-model="userData.name"
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
            v-model="userData.email"
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
            v-model="userData.password"
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
            v-model="userData.checkPassword"
          />
        </div>
      </div>

      <!-- button們 -->
      <div class="form__button__container">
        <button class="form__button" type="submit">儲存</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";

export default {
  name: "SettingPanel",
  props: {
    initialUserData: {
      type: Object,
      default: () => ({
        name: "",
        email: "",
        account: "",
      }),
    },
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
        account: "",
        password: "",
        checkPassword: "",
      },
      formErrorName: false,
      formErrorEmail: false,
      formErrorAccount: false,
      formErrorPassword: false,
      formErrorCheckPassword: false,
    };
  },
  created() {
    console.log(this.initialUserData);
    this.userData = {
      ...this.userData,
      ...this.initialUserData,
    };
    console.log(this.userData);
  },
  watch: {
    initialUserData(newValue) {
      this.userData = {
        ...this.userData,
        ...newValue,
      };
    },
  },
  methods: {
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
        if (!this.userData.account) {
          this.formErrorAccount = true;
          Toast.fire({
            icon: "error",
            title: "帳號欄位為必填",
          });
          return;
        }
        if (!this.userData.name) {
          this.formErrorName = true;
          Toast.fire({
            icon: "error",
            title: "名稱欄位為必填",
          });
          return;
        }
        if (!this.userData.email) {
          this.formErrorEmail = true;
          Toast.fire({
            icon: "error",
            title: "Email欄位為必填",
          });
          return;
        }
        if (!this.userData.password) {
          this.formErrorPassword = true;
          Toast.fire({
            icon: "error",
            title: "密碼欄位為必填",
          });
          return;
        }
        if (!this.userData.checkPassword) {
          this.formErrorCheckPassword = true;
          Toast.fire({
            icon: "error",
            title: "密碼確認欄位為必填",
          });
          return;
        }

        // 當使用者密碼與確認密碼不相同會有錯誤提示「密碼與確認密碼不符」，兩欄都呈現紅線
        if (this.userData.password !== this.userData.checkPassword) {
          this.formErrorPassword = true;
          this.formErrorCheckPassword = true;
          Toast.fire({
            icon: "error",
            title: "密碼與確認密碼不符",
          });
          return;
        }

        
        // 把表單資料打包給後端
        const formData = {
          account: this.userData.account,
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
          checkPassword: this.userData.checkPassword
        };
        console.log(formData)

        this.$emit("after-submit", formData);

        // 成功取得資料，所有底線為黑/藍線
        this.formErrorName = false;
        this.formErrorEmail = false;
        this.formErrorAccount = false;
        this.formErrorPassword = false;
        this.formErrorCheckPassword = false;

        this.userData.password = "";
        this.userData.checkPassword = "";
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
