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

    <!-- 輸入表格，按鈕或是enter鍵都可以送出表單 -->

    <form
      @submit.prevent.stop="handleSubmit"
      @keyup.enter.prevent.stop="handleSubmit"
      class="form form__container"
    >
      <div
        :class="[
          'form__input',
          { formError: formErrorAccount || formErrorAccountExisted },
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
          <span class="form__input__hint-error" v-show="formErrorAccountExisted"
            >此帳號已重複註冊</span
          >
        </div>
      </div>

      <div
        :class="[
          'form__input',
          { formError: formErrorName || formErrorNameLimited },
        ]"
      >
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
        <div
          :class="[
            'form__input__hint',
            {
              form__input__count:
                !formErrorName && !formErrorNameLimited && lengthOfName,
            },
          ]"
        >
          <span class="form__input__hint-error" v-show="formErrorName"
            >名稱欄位為必填</span
          >
          <span class="form__input__hint-error" v-show="formErrorNameLimited"
            >字數超過上限！</span
          >
          <span
            class="form__input__hint-length montserrat-font"
            v-show="lengthOfName"
            >{{ lengthOfName }}/50</span
          >
        </div>
      </div>

      <div
        :class="[
          'form__input',
          { formError: formErrorEmail || formErrorEmailExisted },
        ]"
      >
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
        <div class="form__input__hint">
          <span class="form__input__hint-error" v-show="formErrorEmail"
            >Email欄位為必填</span
          >
          <span class="form__input__hint-error" v-show="formErrorEmailExisted"
            >此Email已重複註冊</span
          >
        </div>
      </div>

      <div
        :class="[
          'form__input',
          { formError: formErrorPassword || formErrorPasswordUnmatched },
        ]"
      >
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
        <div class="form__input__hint">
          <span class="form__input__hint-error" v-show="formErrorPassword"
            >密碼欄位為必填</span
          >
          <span
            class="form__input__hint-error"
            v-show="formErrorPasswordUnmatched"
            >密碼與確認密碼不符</span
          >
        </div>
      </div>

      <div
        :class="[
          'form__input',
          { formError: formErrorCheckPassword || formErrorPasswordUnmatched },
        ]"
      >
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
        <div class="form__input__hint">
          <span class="form__input__hint-error" v-show="formErrorCheckPassword"
            >密碼確認欄位為必填</span
          >
          <span
            class="form__input__hint-error"
            v-show="formErrorPasswordUnmatched"
            >密碼與確認密碼不符</span
          >
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
import { Toast, innerHtml } from "../utils/helpers";
import usersAPI from "./../apis/users";

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
      formErrorCheckPassword: false,
      formErrorPasswordUnmatched: false,
      formErrorAccountExisted: false,
      formErrorEmailExisted: false,
      formErrorNameLimited: false,
      lengthOfName: "",
    };
  },
  watch: {
    name(newValue) {
      console.log(newValue.length);
      this.name = newValue.trim();
      // 計算目前輸入的字數
      this.lengthOfName = newValue.length;

      if (newValue.length > 0) {
        this.formErrorName = false;
      }

      // name 字數限制在50字以內，若超過會有錯誤提示「字數超過上限！」
      if (newValue.length >= 50) {
        Toast.fire({
          html: innerHtml("字數超過上限！", "error"),
        });
        this.name = this.name.slice(0, 50); // name會停留在50字內
        this.formErrorNameLimited = true;
        return;
      } else {
        this.formErrorNameLimited = false;
      }
    },
    email(newValue) {
      this.email = newValue.trim();
      if (newValue.length > 0) {
        this.formErrorEmail = false;
        this.formErrorEmailExisted = false;
      }
    },
    account(newValue) {
      this.account = newValue.trim();
      if (newValue.length > 0) {
        this.formErrorAccount = false;
        this.formErrorAccountExisted = false;
      }
    },
    password(newValue) {
      this.password = newValue.trim();
      if (newValue.length > 0) {
        this.formErrorPassword = false;
        this.formErrorPasswordUnmatched = false;
      }
    },
    checkPassword(newValue) {
      this.checkPassword = newValue.trim();
      if (newValue.length > 0) {
        this.formErrorCheckPassword = false;
        this.formErrorPasswordUnmatched = false;
      }
    },
  },
  created() {
    this.lengthOfName = 0;
  },
  methods: {
    async handleSubmit() {
      // 當按下按鈕後，所有底線為黑/藍線
      this.formErrorName = false;
      this.formErrorEmail = false;
      this.formErrorAccount = false;
      this.formErrorPassword = false;
      this.formErrorCheckPassword = false;
      this.formErrorPasswordUnmatched = false;
      this.formErrorAccountExisted = false;
      this.formErrorNameExisted = false;
      this.formErrorNameLimited = false;

      // 每一個欄位都是必填，若有欄位為空會有錯誤提示「該項目為必填」，錯誤底線就為紅色
      if (!this.account) {
        this.formErrorAccount = true;
      }
      if (!this.name) {
        this.formErrorName = true;
      }
      if (!this.email) {
        this.formErrorEmail = true;
      }
      if (!this.password) {
        this.formErrorPassword = true;
      }
      if (!this.checkPassword) {
        this.formErrorCheckPassword = true;
      }

      // 當使用者密碼與確認密碼不相同會有錯誤提示「密碼與確認密碼不符」，兩欄都呈現紅線
      if (this.password !== this.checkPassword) {
        this.formErrorPasswordUnmatched = true;
        return;
      }

      // 只要狀態有報錯，就不會發請求給後端，避免一直重複發送請求
      if (this.allFalse) return;

      try {
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
          console.log(data.message);
        }

        // 成功取得資料，所有底線為黑/藍線
        this.formErrorName = false;
        this.formErrorEmail = false;
        this.formErrorAccount = false;
        this.formErrorPassword = false;
        this.formErrorCheckPassword = false;
        this.formErrorPasswordUnmatched = false;
        this.formErrorAccountExisted = false;
        this.formErrorNameExisted = false;
        this.formErrorNameLimited = false;

        // 使用者成功建立帳號會自動跳轉 login 頁面，並出現成功提示「建立帳號成功！」
        Toast.fire({
          html: innerHtml("建立帳號成功！", "succeed"),
        });

        this.$router.push("/login");
      } catch (error) {
        // 想要拿到data.message，要知道是包在error.response裡
        const message = error.response.data.message.toLowerCase();

        if (message.includes("account")) {
          this.formErrorAccountExisted = true;
        } else if (message.includes("email")) {
          this.formErrorEmailExisted = true;
        }

        Toast.fire({
          html: innerHtml(message, "error"),
        });
      }
    },
  },
  computed: {
    // 只要狀態有報錯，就不會發請求給後端，避免一直重複發送請求
    allFalse() {
      if (
        this.formErrorName ||
        this.formErrorEmail ||
        this.formErrorAccount ||
        this.formErrorPassword ||
        this.formErrorCheckPassword ||
        this.formErrorPasswordUnmatched ||
        this.formErrorAccountExisted ||
        this.formErrorNameExisted ||
        this.formErrorNameLimited
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>


