<template>
  <div class="sign-form">
    <!-- 標題 -->
    <div class="entrance entrance_container">
      <div class="entrance_icon">
        <img src="../assets/images/entrance_brand.svg" alt="" />
      </div>
      <div class="entrance_title">
        <h4>登入 Alphitter</h4>
      </div>
    </div>

    <!-- 輸入表格 -->

    <form @submit.prevent.stop="handleSubmit" class="form form_container">
      <div class="form_input">
        <div class="form_input_container">
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

      <div class="form_input">
        <div class="form_input_container">
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
      <div class="form_button_container">
        <button class="form_button" type="submit">登入</button>
        <div class="form_links form_links_login">
          <router-link to="" class="form_links--link">註冊</router-link>
          <span>．</span>
          <router-link to="" class="form_links--link">後台登入</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import usersAPI from './../apis/users'

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
        const { data } = await usersAPI.login({
          account: this.account,
          password: this.password,
        });
        // 取得 API 請求後的資料
        console.log(data)

        if (data.status === "error") {
          throw new Error(data.message);
        }

        localStorage.setItem("token", data.data.token);

        this.$router.push("/");
      } catch(error){
        console.log(error)
      }
      
    },
  },
};
</script>