<template>
  <div class="sign-form">
    <!-- 標題 -->
    <div class="entrance entrance_container">
      <div class="entrance_icon">
        <img src="../assets/images/entrance_brand.svg" alt="" />
      </div>
      <div class="entrance_title">
        <h4>建立你的帳號</h4>
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
          <label for="name">名稱</label>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="請輸入使用者名稱"
            autocomplete="name"
            required
            autofocus
            v-model="name"
          />
        </div>
      </div>

      <div class="form_input">
        <div class="form_input_container">
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="請輸入Email"
            autocomplete="email"
            required
            autofocus
            v-model="email"
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

      <div class="form_input">
        <div class="form_input_container">
          <label for="passwordCheck">密碼確認</label>
          <input
            id="passwordCheck"
            name="checkPassword"
            type="password"
            placeholder="請再次輸入密碼"
            autocomplete="current-password"
            required
            autofocus
            v-model="checkPassword"
          />
        </div>
      </div>

      <!-- button們 -->
      <div class="form_button_container">
        <button class="form_button" type="submit">註冊</button>
        <div class="form_links">
          <router-link to="" class="form_links--link">取消</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
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
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const {data} = await usersAPI.register({
          name: this.name, 
          email:this.email,
          account: this.account,
          password: this.email, 
          checkPassword: this.checkPassword
        })
        console.log(data)
      } catch(error){
        console.log(error)
      }
    },
  },
};
</script>


