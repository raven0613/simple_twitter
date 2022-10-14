<template>
  <div class="setting-form">
    <!-- 輸入表格 -->
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
            v-model="userData.account"
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
            v-model="userData.name"
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
            v-model="userData.email"
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
            autocomplete="current-password"
            autofocus
            v-model="userData.password"
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
            v-model="userData.checkPassword"
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
        <button
          class="form__button"
          :class="{ form__button_processing: isProcessing }"
          type="submit"
        >
          儲存
        </button>
        <div class="form__links form__links__logout">
          <div
            @click.stop.prevent="logout"
            class="form__links--link"
            >登出</div
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast, innerHtml } from "../utils/helpers";

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
    initialFormErrorAccountExisted: {
      type: Boolean,
      default: false,
    },
    initialFormErrorEmailExisted: {
      type: Boolean,
      default: false,
    },
    isProcessing: {
      type: Boolean,
      default: false,
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
      formErrorPasswordUnmatched: false,
      formErrorAccountExisted: false,
      formErrorEmailExisted: false,
      formErrorNameLimited: false,
      lengthOfName: "",
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
    userData: {
      handler(newValue) {
        console.log(newValue.name.length);
        newValue.name = newValue.name.trim();
        newValue.account = newValue.account.trim();
        newValue.email = newValue.email.trim();
        newValue.password = newValue.password.trim();
        newValue.checkPassword = newValue.checkPassword.trim();

        // 計算目前輸入的字數
        this.lengthOfName = newValue.name.length;

        if (newValue.name.length > 0) {
          this.formErrorName = false;
        }

        // name 字數限制在50字以內，若超過會有錯誤提示「字數超過上限！」
        if (newValue.name.length >= 50) {
          Toast.fire({
            html: innerHtml("字數超過上限", "error"),
          });
          newValue.name = newValue.name.slice(0, 50); // name會停留在50字內
          this.formErrorNameLimited = true;
          console.log(this.formErrorNameLimited);
          return;
        } else {
          this.formErrorNameLimited = false;
        }

        if (newValue.email.length > 0) {
          this.formErrorEmail = false;
          this.formErrorEmailExisted = false;
        }

        if (newValue.account.length > 0) {
          this.formErrorAccount = false;
          this.formErrorAccountExisted = false;
        }

        if (newValue.password.length > 0) {
          this.formErrorPassword = false;
          this.formErrorPasswordUnmatched = false;
        }

        if (newValue.checkPassword.length > 0) {
          this.formErrorCheckPassword = false;
          this.formErrorPasswordUnmatched = false;
        }
      },
      deep: true,
    },
    initialUserData(newValue) {
      this.userData = {
        ...this.userData,
        ...newValue,
      };
    },
    initialFormErrorAccountExisted(newValue) {
      this.formErrorAccountExisted = newValue;
    },
    initialFormErrorEmailExisted(newValue) {
      this.formErrorEmailExisted = newValue;
    },
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
        this.formErrorPasswordUnmatched = false;

        // 每一個欄位都是必填，若有欄位為空會有錯誤提示「該項目為必填」，錯誤底線就為紅色
        if (!this.userData.account) {
          this.formErrorAccount = true;
        }
        if (!this.userData.name) {
          this.formErrorName = true;
        }
        if (!this.userData.email) {
          this.formErrorEmail = true;
        }
        if (!this.userData.password) {
          this.formErrorPassword = true;
        }
        if (!this.userData.checkPassword) {
          this.formErrorCheckPassword = true;
        }

        // 當使用者密碼與確認密碼不相同會有錯誤提示「密碼與確認密碼不符」，兩欄都呈現紅線
        if (this.userData.password !== this.userData.checkPassword) {
          this.formErrorPasswordUnmatched = true;
          Toast.fire({
            html: innerHtml("密碼與確認密碼不符", "error"),
          });
          return;
        }

        // 只要狀態有報錯，就不會發請求給後端，避免一直重複發送請求
      if (this.allFalse) return;

      try {
        // 把表單資料打包給後端
        const formData = {
          account: this.userData.account,
          name: this.userData.name,
          email: this.userData.email,
          password: this.userData.password,
          checkPassword: this.userData.checkPassword,
        };
        console.log(formData);

        this.$emit("after-submit", formData);

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

        this.userData.password = "";
        this.userData.checkPassword = "";
      } catch (error) {
        // 想要拿到data.message，要知道是包在error.response裡
        const message = error.response.data.message.toLowerCase();

        if (message.includes("account")) {
          this.formErrorAccountExisted = true;
        } else if (message.includes("email")) {
          this.formErrorEmailExisted = true;
        }
      }
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
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
