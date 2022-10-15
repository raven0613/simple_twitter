<template>
  <div class="twitter__project" :class="{modal__toggled: isModalToggled}">
    <div class="container setting-page">
      <section class="left__container">
        <SideBar :current-page="`setting`" :ini-is-modal-toggled="isModalToggled"
          @after-toggle-modal="handleToggleModal" />
      </section>
      <main class="main__container">
        <MainHeader :content="`帳戶設定`" />
        <div class="tweets__container">
          <!-- 設定面板 -->
          <SettingPanel :initialUserData="userData" :initialFormErrorAccountExisted="formErrorAccountExisted"
            :initialFormErrorEmailExisted="formErrorEmailExisted" :is-processing="isProcessing"
            @after-submit="handleAfterSubmit" />
        </div>
        <!-- 發新推文窗 -->
        <transition name="modal">
          <MainTweetModal v-if="isModalToggled" @after-submit-close="handleCloseModal" />
        </transition>

      </main>
      <section class="right__container">
      </section>
      <transition :duration="{ enter: 350, leave: 150 }">
        <div class="modal__mask" @click.stop.prevent="handleCloseModal(false)" v-if="isModalToggled">
        </div>
      </transition>

    </div>
    <Footer :current-page="`setting`" :ini-is-modal-toggled="isModalToggled" @after-toggle-modal="handleToggleModal" />
  </div>
</template>
<script>
import SettingPanel from './../components/SettingPanel'
import SideBar from '../components/SideBar.vue'
import MainHeader from '../components/MainHeader.vue'
import MainTweetModal from '../components/MainTweetModal.vue'
import Footer from '../components/Footer.vue'
import usersAPI from "../apis/users";
import { Toast, innerHtml } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Setting",
  components: {
    SettingPanel,
    SideBar,
    MainHeader,
    Footer,
    MainTweetModal
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
        account: ""
      },
      isModalToggled: false,
      formErrorAccountExisted: false,
      formErrorEmailExisted: false,
      isProcessing: false
    }
  },
  created() {
    this.fetchUser(this.currentUser.id)
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    isLoading() {
      if (!this.isUserLoading && !this.isTweetLoading) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId });
        const { name, email, account } = data
        this.userData = {
          ...this.userData,
          name,
          email,
          account
        }

      } catch (error) {
        Toast.fire({
          html: innerHtml('無法取得使用者資料，請稍後再試', 'error')
        });
      }
    },
    async handleAfterSubmit(formData) {
      try {
        if (this.isProcessing) return
        this.isProcessing = true

        console.log('hi', formData)
        const { data } = await usersAPI.updateSetting({
          userId: this.currentUser.id,
          formData
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          html: innerHtml('成功更新使用者資料', 'succeed')
        })
        this.isProcessing = false

      } catch (error) {
        const message = error.response.data.message.toLowerCase();
        this.isProcessing = false
        console.log(message)
        if (message.includes("此帳號已被使用")) {
          this.formErrorAccountExisted = true;
        } else if (message.includes("此email已被使用")) {
          this.formErrorEmailExisted = true;
        }

        Toast.fire({
          html: innerHtml(message, 'error')
        })
      }
    },
    handleToggleModal(isModalToggled) {
      this.isModalToggled = isModalToggled
      history.pushState({ name: "new-tweet" }, null, "/#/tweets/new");
    },
    handleCloseModal(isSubmitted) {
      this.isModalToggled = false
      //如果不是在submit後回傳的關掉，就可以直接回上一頁
      if (!isSubmitted) {
        this.$router.back()
      }
    },
  }

}
</script>