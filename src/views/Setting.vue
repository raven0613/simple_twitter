<template>
    <div class="twitter__project">
        <div class="container setting-page">
            <section class="left__container">
                <SideBar :current-page="`setting`"
                :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
            </section>
            <main class="main__container">
                <MainHeader :content="`帳戶設定`"/>
                <div class="tweets__container">
                  <SettingPanel 
                    :initialUserData="userData"
                    :initialFormErrorAccountExisted="formErrorAccountExisted"
                    :initialFormErrorEmailExisted="formErrorEmailExisted"
                    @after-submit="handleAfterSubmit"
                  />
                </div>
                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"/>
            </main>

            <section class="right__container">
            </section>

            <div class="modal__mask" 
            @click.stop.prevent="handleCloseModal"
            v-if="isModalToggled"
            @touchmove.prevent @mousewheel.prevent>
            </div>
        </div>
        <Footer :current-page="`setting`"/>
    </div>
</template>
<script>
import SettingPanel from './../components/SettingPanel'
import SideBar from '../components/SideBar.vue'
import MainHeader from '../components/MainHeader.vue'
import MainTweetModal from '../components/MainTweetModal.vue'
import Footer from '../components/Footer.vue'
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Setting",
  components:{
    SettingPanel,
    SideBar,
    MainHeader,
    Footer,
    MainTweetModal
  },
  data(){
    return{
      userData:{
        name: "",
        email: "",
        account: ""
      },
      isModalToggled: false,
      formErrorAccountExisted: false,
      formErrorEmailExisted: false
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
  methods:{
    async fetchUser(userId) {
      try {
        const {data} = await usersAPI.getUser({ userId });
        const { name, email, account } = data
        this.userData = {
          ...this.userData,
          name,
          email, 
          account
        }

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料,請稍後再試",
        });
      }
    },
    async handleAfterSubmit(formData){
      try {
        console.log('hi', formData)
        const { data } = await usersAPI.updateSetting({
          userId: this.currentUser.id,
          formData
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '成功更新使用者資料'
        })

      } catch (error) {
        const message = error.response.data.message.toLowerCase();
        console.log(message)
        if (message.includes("此帳號已被使用")) {
          this.formErrorAccountExisted = true;
        } else if (message.includes("此email已被使用")) {
          this.formErrorEmailExisted = true;
        }

        Toast.fire({
          icon: 'error',
          title: message
        })
      }
    },
    handleToggleModal(isModalToggled){
        this.isModalToggled = isModalToggled
        history.pushState({ name: "new-tweet" }, null, "/#/tweets/new");
    },
    handleCloseModal(){
        this.isModalToggled = false
        this.$router.back();
    },
    handleAddTweet(){
        this.$router.push({name: 'main-page'})
    },
  }

}
</script>