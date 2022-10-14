<template>
  <div class="sign-form">
    <!-- 標題 -->
    <div class="entrance entrance__container">
      <div class="entrance__icon">
        <img src="../assets/images/entrance_brand.svg" alt="" />
      </div>
      <div class="entrance__title">
        <h4>登入 Alphitter</h4>
      </div>
    </div>

    <!-- 輸入表格 -->

    <form
      @submit.prevent.stop="handleSubmit"
      @keyup.enter.prevent.stop="handleSubmit"
      class="form form__container"
    >
      <div
        :class="[
          'form__input',
          {
            formError:
              formErrorAccount ||
              formErrorAccountNotExisted ||
              formErrorAccountOrPassword,
          },
        ]"
      >
        <div class="form__input__container">
          <label for="account">帳號</label>
          <input
            id="account"
            name="account"
            type="account"
            placeholder="請輸入帳號"
            autocomplete="username"
            autofocus
            v-model="account"
          />
        </div>
        <div class="form__input__hint">
          <span class="form__input__hint-error" v-show="formErrorAccount"
            >帳號欄位為必填</span
          >
          <span
            class="form__input__hint-error"
            v-show="formErrorAccountNotExisted"
            >帳號不存在</span
          >
          <span
            class="form__input__hint-error"
            v-show="formErrorAccountOrPassword"
            >帳號或密碼錯誤</span
          >
        </div>
      </div>

      <div
        :class="[
          'form__input',
          { formError: formErrorPassword || formErrorAccountOrPassword },
        ]"
      >
        <div class="form__input__container">
          <label for="password">密碼</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="請輸入密碼"
            autocomplete="current-password"
            autofocus
            v-model="password"
          />
        </div>
        <div class="form__input__hint">
          <span class="form__input__hint-error" v-show="formErrorPassword"
            >密碼欄位為必填</span
          >
          <span
            class="form__input__hint-error"
            v-show="formErrorAccountOrPassword"
            >帳號或密碼錯誤</span
          >
        </div>
      </div>

      <!-- button們 -->
      <div class="form__button__container">
        <button class="form__button" type="submit">登入</button>
        <div class="form__links form__links__login">
          <router-link to="/register" class="form__links--link"
            >註冊</router-link
          >
          <span>．</span>
          <router-link :to="{ name: 'admin-login' }" class="form__links--link"
            >後台登入</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast, innerHtml } from "./../utils/helpers";

export default {
  name: "Login",
  data() {
    return {
      account: "",
      password: "",
      formErrorAccount: false,
      formErrorPassword: false,
      formErrorAccountNotExisted: false,
      formErrorAccountOrPassword: false,
    };
  },
  watch: {
    account(newValue) {
      this.account = newValue.trim();
      if (newValue.length > 0) {
        this.formErrorAccount = false;
      }
    },
    password(newValue) {
      this.password = newValue.trim();
      if (newValue.length > 0) {
        this.formErrorPassword = false;
      }
    },
  },
  methods: {
    // 狀態的部分完全正確才進入非同步，好處：報錯較容易發現
    async handleSubmit() {
      // 當按下按鈕後，所有底線為黑/藍線
      this.formErrorAccount = false;
      this.formErrorPassword = false;
      this.formErrorAccountNotExisted = false;
      this.formErrorAccountOrPassword = false;

      // 每一個欄位都是必填，若有欄位為空會有錯誤提示「該項目為必填」，錯誤底線就為紅色
      if (!this.account) {
        this.formErrorAccount = true;
      }

      if (!this.password) {
        this.formErrorPassword = true;
      }

      // 只要狀態有報錯，就不會發請求給後端，避免一直重複發送請求
      if (this.allFalse) return;

      try {
        const { data } = await usersAPI.login({
          account: this.account,
          password: this.password,
        });
        const { userData } = data;

        // 取得 API 請求後的資料
        console.log("data:", data, userData.role);

        // 成功取得資料，所有底線為黑/藍線
        this.formErrorAccount = false;
        this.formErrorPassword = false;
        this.formErrorAccountNotExisted = false;
        this.formErrorAccountOrPassword = false;

        if (data.status === "error") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);

        this.$store.commit("setCurrentUser", userData);

        Toast.fire({
          html: innerHtml("登入成功", "succeed"),
        });

        // 成功登入後會跳轉至 Twitter 首頁，並查看所有推文
        this.$router.push("/main");
      } catch (error) {
        const message = error.response.data.message;
        console.log(error.response);
        if (message.includes("帳號或密碼錯誤")) {
          this.formErrorAccountOrPassword = true;
        } else if (message.includes("帳號不存在")) {
          this.formErrorAccountNotExisted = true;
        }
      }
    },
  },
  computed: {
    // 只要狀態有報錯，就不會發請求給後端，避免一直重複發送請求
    allFalse() {
      if (
        this.formErrorAccount ||
        this.formErrorPassword ||
        this.formErrorAccountNotExisted ||
        this.formErrorAccountOrPassword
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>