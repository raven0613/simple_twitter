<template>
  <div class="modal user-edit">
    <form @submit.prevent.stop="handleSubmit">
      <div class="modal__container">
        <!-- 最上方的區塊 -->
        <div class="modal__input__container">
          <img
            src="../assets/images/last-step.svg"
            alt=""
            class="modal__input--last-step"
          />
          <img
            @click.stop.prevent="handleCancelClicked"
            src="../assets/images/cancel-orange.svg"
            alt=""
            class="modal__input--cancel"
          />
          <p class="modal__input--title">編輯個人資料</p>
          <button class="modal__input--save" type="submit">儲存</button>
        </div>

        <!-- 背景圖片跟個人照 -->
        <div class="user-info__image__container">
          <div
            class="
              user-info__background__container
              hover__background-controller
            "
          >
            <img
              :src="user.coverPhoto | emptyImage"
              alt=""
              class="user-info__background--photo"
            />
            <div class="hover__background-container">
              <span class="user-info__background--mask"></span>
              <div class="user-info__background__icons__container">
                <button>
                  <input
                    type="file"
                    ref="coverPhotoInput"
                    style="display: none"
                    id="image"
                    name="coverPhoto"
                    accept="image/*"
                    class="form-control-file"
                    @change="handleCoverPhotoChange"
                  />
                  <img
                    @click.prevent.stop="$refs.coverPhotoInput.click()"
                    src="../assets/images/add-photo.svg"
                    alt=""
                    class="user-info__background__icon"
                  />
                </button>

                <img
                  @click.prevent.stop="handleRemoveCoverPhoto"
                  src="../assets/images/cancel-white.svg"
                  alt=""
                  class="user-info__background__icon"
                />
              </div>
            </div>
          </div>

          <div class="user-info__avatar__container hover__avatar-controller">
            <img
              :src="user.profilePhoto | emptyImage"
              alt=""
              class="user-info__avatar--photo"
            />
            <div class="hover__avatar-container">
              <span class="user-info__avatar--mask"></span>
              <div class="user-info__avatar__icons__container">
                <button>
                  <input
                    type="file"
                    ref="profilePhotoInput"
                    style="display: none"
                    id="image"
                    name="profilePhoto"
                    accept="image/*"
                    class="form-control-file"
                    @change="handleProfilePhotoChange"
                  />
                  <img
                    @click.prevent.stop="$refs.profilePhotoInput.click()"
                    src="../assets/images/add-photo.svg"
                    alt=""
                    class="user-info__background__icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 表格 -->
        <div class="form form__container">
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
                placeholder="John Doe"
                autocomplete="name"
                autofocus
                v-model="user.name"
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
              <span
                class="form__input__hint-error"
                v-show="formErrorNameLimited"
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
              {
                formError:
                  formErrorIntroduction || formErrorIntroductionLimited,
              },
            ]"
            id="introduction__input"
          >
            <div class="form__input__container">
              <label for="introduction">自我介紹</label>
              <input
                id="introduction"
                name="introduction"
                type="text"
                placeholder="談談你自己吧..."
                autocomplete="off"
                autofocus
                v-model="user.introduction"
              />
            </div>
            <div
              :class="[
                'form__input__hint',
                {
                  form__input__count:
                    !formErrorIntroduction &&
                    !formErrorIntroductionLimited &&
                    lengthOfIntroduction,
                },
              ]"
            >
              <span
                class="form__input__hint-error"
                v-show="formErrorIntroduction"
                >自我介紹欄位為必填</span
              >
              <span
                class="form__input__hint-error"
                v-show="formErrorIntroductionLimited"
                >字數超過上限！</span
              >
              <span
                class="form__input__hint-length montserrat-font"
                v-show="lengthOfIntroduction"
                >{{ lengthOfIntroduction }}/160</span
              >
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast, innerHtml, innerHtmlConfirm } from "../utils/helpers";
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "UserEditModal",
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        account: "",
        coverPhoto: "",
        email: "",
        introduction: "",
        name: "",
        profilePhoto: "",
      }),
    },
    initialFormErrorAccount: {
      type: Boolean,
      default: false,
    },
    initialFormErrorEmail: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      user: { ...this.initialUser },
      formErrorName: false,
      formErrorIntroduction: false,
      formErrorNameLimited: false,
      formErrorIntroductionLimited: false,
      lengthOfName: "",
      lengthOfIntroduction: "",
      isProcessing: false,
    };
  },
  watch: {
    // initialUser有改變值時把值代入到子層
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
    // 監聽user裡的name, introduction數量變化
    user: {
      handler(newValue) {
        newValue.name = newValue.name.trim();
        newValue.introduction = newValue.introduction.trim();

        // 計算目前輸入的字數
        this.lengthOfName = newValue.name.length;
        this.lengthOfIntroduction = newValue.introduction.length;

        if (newValue.name.length > 0) {
          this.formErrorName = false;
          this.formErrorNameLimited = false;
        }

        // name 字數限制在50字以內，若超過會有錯誤提示「字數超過上限！」
        if (newValue.name.length >= 50) {
          Toast.fire({
            html: innerHtml("字數超過上限", "error"),
          });

          this.user.name = this.user.name.slice(0, 50); // name會停留在50字內
          this.formErrorNameLimited = true;
          console.log(this.user.name);
          return;
        } else {
          this.formErrorNameLimited = false;
        }

        if (newValue.introduction.length > 0) {
          this.formErrorIntroduction = false;
          this.formErrorIntroductionLimited = false;
        }

        // introduction 字數限制在160字以內，若超過會有錯誤提示「字數超過上限！」
        if (newValue.introduction.length > 160) {
          Toast.fire({
            html: innerHtml("字數超過上限", "error"),
          });
          this.user.introduction = this.user.introduction.slice(0, 160); // introduction會停留在160字內

          this.formErrorIntroductionLimited = true;
          return;
        }
      },
      deep: true,
    },
    initialFormErrorAccount(newValue) {
      this.formErrorAccount = newValue;
    },
    initialFormErrorEmail(newValue) {
      this.formErrorEmail = newValue;
    },
  },
  created() {
    this.lengthOfName = this.initialUser.name.length;
    this.lengthOfIntroduction = this.initialUser.introduction.length;
  },
  methods: {
    async handleSubmit(e) {
      if (this.isProcessing) return;
      this.isProcessing = true;

      // 當按下按鈕後，所有底線為黑/藍線
      this.formErrorName = false;
      this.formErrorIntroduction = false;
      this.formErrorNameLimited = false;
      this.formErrorIntroductionLimited = false;

      // 欄位都是必填，若有欄位為空會有錯誤提示「該項目為必填」，錯誤底線就為紅色

      if (!this.user.name) {
        this.formErrorName = true;
        return;
      }

      // 只要狀態有報錯，就不會發請求給後端，避免一直重複發送請求
      if (this.allFalse) return;

      try {
        // 把表單資料打包給後端
        const form = e.target;
        const formData = new FormData(form);
        console.log(form, formData);
        for (let [name, value] of formData.entries()) {
          console.log(name + ": " + value);
        }

        // console.log(formData);
        this.$emit("after-submit", formData);

        // 成功取得資料，所有底線為黑/藍線
        this.formErrorName = false;
        this.formErrorIntroduction = false;
        this.formErrorNameLimited = false;
        this.formErrorIntroductionLimited = false;

        this.isProcessing = false
        this.$emit("after-submit-close");

      } catch (error) {
        // 想要拿到data.message，要知道是包在error.response裡
        const message = error.response.data.message;
        this.isProcessing = false;
        Toast.fire({
          html: innerHtml(message, "error"),
        });
      }
    },
    handleCoverPhotoChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳檔案
        this.user.coverPhoto = "";
        return;
      } else {
        // 可以接收files物件，當帶進來 window.URL.createObjectURL() 的時候，會自動產生一個URL(類似存在記憶體暫時的連結blob)
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.coverPhoto = imageURL;
      }
    },
    handleProfilePhotoChange(e) {
      const { files } = e.target;
      if (files.length === 0) {
        // 使用者沒有選擇上傳檔案
        this.user.profilePhoto = "";
        return;
      } else {
        // 可以接收files物件，當帶進來 window.URL.createObjectURL() 的時候，會自動產生一個URL(類似存在記憶體暫時的連結blob)
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.profilePhoto = imageURL;
      }
    },
    handleCancelClicked() {
      this.user = this.initialUser;
      this.$emit("after-submit-close");
    },
    // 要刪除照片之前會先跳提示，toast點擊確認 & Modal點擊送出 才會真的刪除！
    async handleRemoveCoverPhoto() {
      const result = await Toast.fire({
        html: innerHtmlConfirm("您確定嗎？刪除的照片是回不來的喔！"),
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "確認",
        timer: undefined,
      });

      // 按取消可以取消動作，按確認功能可以刪貼文
      if (result.dismiss === "cancel") {
        return;
      } else if (result.value) {
        this.user.coverPhoto = "";
        this.$emit("after-remove-cover-photo");
      }
    },
  },
  computed: {
    // 只要狀態有報錯，就不會發請求給後端，避免一直重複發送請求
    allFalse() {
      if (
      this.formErrorName ||
      this.formErrorIntroduction ||
      this.formErrorNameLimited ||
      this.formErrorIntroductionLimited
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  destroyed() {
    Toast.close();
  },
};
</script>