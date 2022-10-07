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

    <form @submit.prevent.stop="handleSubmit" class="form form__container">
      <div class="form__input">
        <div class="form__input__container">
          <label for="account">帳號</label>
          <input
            id="account"
            name="account"
            type="account"
            placeholder="請輸入帳號"
            autocomplete="username"
            required
            autofocus
            v-model="account"
          />
        </div>
      </div>

      <div class="form__input">
        <div class="form__input__container">
          <label for="password">密碼</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="請輸入密碼"
            autocomplete="current-password"
            required
            autofocus
            v-model="password"
          />
        </div>
      </div>

      <!-- button們 -->
      <div class="form__button__container">
        <button class="form__button" type="submit">登入</button>
        <div class="form__links form__links__login">
          <router-link to="/register" class="form__links--link">註冊</router-link>
          <span>．</span>
          <router-link to="/admin/login" class="form__links--link">後台登入</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  name: "Register",
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    async handleSubmit() {
      try{
        console.log(await usersAPI.login({
          account: this.account,
          password: this.password,
        }))

        const { data, statusText } = await usersAPI.login({
          account: this.account,
          password: this.password,
        });
        // 取得 API 請求後的資料
        console.log(data)

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        localStorage.setItem("token", data.token);


        Toast.fire({
          icon: 'success',
          title: 'please wait'
        })
        this.$router.push("/");
      } catch(error){
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '帳號或密碼錯誤，請稍後再試'
        })
      }
      
    },
  },
};
</script>