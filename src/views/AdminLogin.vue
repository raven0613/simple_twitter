<template>
  <div class="sign-form">
    <!-- 標題 -->
    <div class="entrance entrance__container">
      <div class="entrance__icon">
        <img src="../assets/images/entrance_brand.svg" alt="" />
      </div>
      <div class="entrance__title">
        <h4>後台登入</h4>
      </div>
    </div>

    <!-- 輸入表格 -->

    <form 
      @submit.prevent.stop="handleSubmit"
      @keyup.enter.prevent.stop="handleSubmit" 
      class="form form__container"
    >
      <div :class="['form__input',{formError: formErrorAccount}]">
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
      </div>

      <div :class="['form__input',{formError: formErrorPassword}]">
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
      </div>

      <!-- button們 -->
      <div class="form__button__container">
        <button class="form__button" type="submit">登入</button>
        <div class="form__links form__links__login">
          <router-link to="/login" class="form__links--link"
            >前台登入</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import {Toast} from './../utils/helpers'

export default {
  name: "AdminLogin",
  data() {
    return {
      account: "",
      password: "",
      formErrorAccount: false,
      formErrorPassword: false,
    };
  },
  watch: {
    account(newValue){
      if(newValue.length > 0){
        this.formErrorAccount = false
      }
    },
    password(newValue){
      if(newValue.length > 0){
        this.formErrorPassword = false
      }
    },
  },
  methods: {
    async handleSubmit() {
      try {
        // 當按下按鈕後，所有底線為黑/藍線
        this.formErrorAccount = false
        this.formErrorPassword = false

        // 每一個欄位都是必填，若有欄位為空會有錯誤提示「該項目為必填」，錯誤底線就為紅色
        //TODO:(待優化)
        if (!this.account) {
          this.formErrorAccount = true
          Toast.fire({
            icon: "error",
            title: "帳號欄位為必填"
          });
          return;
        }

        if (!this.password) {
          this.formErrorPassword = true
          Toast.fire({
            icon: "error",
            title: "密碼欄位為必填"
          });
          return;
        }

        const { data } = await adminAPI.login({
          account: this.account,
          password: this.password,
        });
        const { userData } = data

        // 取得 API 請求後的資料
        console.log('data:',data , userData.role);


        // 成功取得資料，所有底線為黑/藍線
        this.formErrorAccount = false
        this.formErrorPassword = false

        if (data.status === "error") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.token);

        Toast.fire({
          icon: "success",
          title: "please wait",
        });
        this.$router.push("/admin");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: error.response.data.message
        });
      }
    },
  },
};
</script>