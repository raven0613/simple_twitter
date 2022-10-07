<template>
  <div class="sign-form">
    <!-- 標題 -->
    <div class="entrance entrance__container">
      <div class="entrance__icon">
        <img src="../assets/images/entrance_brand.svg" alt="" />
      </div>
      <div class="entrance__title">
        <h4>建立你的帳號</h4>
      </div>
    </div>

    <!-- 輸入表格 -->

    <form @submit.prevent.stop="handleSubmit" class="form form__container">
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

      <div :class="['form__input',{formError: formErrorName}]">
        <div class="form__input__container">
          <label for="name">名稱</label>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="請輸入使用者名稱"
            autocomplete="name"
            autofocus
            v-model="name"
          />
        </div>
      </div>

      <div :class="['form__input',{formError: formErrorEmail}]">
        <div class="form__input__container">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="請輸入Email"
            autocomplete="email"
            autofocus
            v-model="email"
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
            autofocus
            v-model="password"
          />
        </div>
      </div>

      <div :class="['form__input',{formError: formErrorCheckPassword}]">
        <div class="form__input__container">
          <label for="passwordCheck">密碼確認</label>
          <input
            id="passwordCheck"
            name="checkPassword"
            type="password"
            placeholder="請再次輸入密碼"
            autocomplete="current-password"
            autofocus
            v-model="checkPassword"
          />
        </div>
      </div>

      <!-- button們 -->
      <div class="form__button__container">
        <button class="form__button" type="submit">註冊</button>
        <div class="form__links">
          <router-link to="/login" class="form__links--link">取消</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import usersAPI from "./../apis/users";
// const dummyData = {
//   name: "root",
//   email: "root@example.com",
//   account: "root",
//   password: "12345678",
//   checkPassword: "12345678",
// };

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      account: "",
      password: "",
      checkPassword: "",
      formErrorName: false,
      formErrorEmail: false,
      formErrorAccount: false,
      formErrorPassword: false,
      formErrorCheckPassword: false
    };
  },
  watch: {
    name(newValue) {
      if(newValue.length > 0){
        this.formErrorName = false
      }else if (newValue.length > 50) {
        // name 字數限制在50字以內，若超過會有錯誤提示「字數超過上限！」
        Toast.fire({
          icon: "error",
          title: "字數超過上限！",
        });
        this.name = this.name.slice(0, 50); // name會停留在50字內
        return;
      }
    },
    email(newValue){
      if(newValue.length > 0){
        this.formErrorEmail = false
      }
    },
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
    checkPassword(newValue){
      if(newValue.length > 0){
        this.formErrorCheckPassword = false
      }
    },

  },
  methods: {
    async handleSubmit() {
      try {
        // 當按下按鈕後，所有底線為黑/藍線
        this.formErrorName = false
        this.formErrorEmail = false
        this.formErrorAccount = false
        this.formErrorPassword = false
        this.formErrorCheckPassword = false

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
        if (!this.name) {
          this.formErrorName = true
          Toast.fire({
            icon: "error",
            title: "名稱欄位為必填"
          });
          return;
        }
        if (!this.email) {
          this.formErrorEmail = true
          Toast.fire({
            icon: "error",
            title: "Email欄位為必填"
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
        if (!this.checkPassword) {
          this.formErrorCheckPassword = true
          Toast.fire({
            icon: "error",
            title: "密碼確認欄位為必填"
          });
          return;
        }

        // 當使用者密碼與確認密碼不相同會有錯誤提示「密碼與確認密碼不符」，兩欄都呈現紅線
        if (this.password !== this.checkPassword) {
          this.formErrorPassword = true
          this.formErrorCheckPassword = true
          Toast.fire({
            icon: "error",
            title: "密碼與確認密碼不符",
          });
          return;
        }

        // 串接API
        const { data } = await usersAPI.register({
          name: this.name,
          email: this.email,
          account: this.account,
          password: this.password,
          checkPassword: this.checkPassword,
        });
        console.log(data);

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 成功取得資料，所有底線為黑/藍線
        this.formErrorName = false
        this.formErrorEmail = false
        this.formErrorAccount = false
        this.formErrorPassword = false
        this.formErrorCheckPassword = false

        // 使用者成功建立帳號會自動跳轉 login 頁面，並出現成功提示「建立帳號成功！」
        Toast.fire({
          icon: "success",
          title: "建立帳號成功！",
        });

        this.$router.push("/login");
        
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>


