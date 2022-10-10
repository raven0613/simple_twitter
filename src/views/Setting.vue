<template>
    <div class="twitter__project">
        <div class="container setting-page">
            <section class="left__container">
                <SideBar :current-page="`setting`"/>
            </section>
            <main class="main__container">
                <MainHeader :content="`帳戶設定`"/>
                <div class="tweets__container">
                  <SettingPanel 
                    :initialUserData="userData"
                    @after-submit="handleAfterSubmit"
                  />
                </div>
            </main>

            <section class="right__container">
                
            </section>
        </div>
        <Footer :current-page="`setting`"/>
    </div>
</template>
<script>
import SettingPanel from './../components/SettingPanel'
import SideBar from '../components/SideBar.vue'
import MainHeader from '../components/MainHeader.vue'
import Footer from '../components/Footer.vue'
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "Setting",
  components:{
    SettingPanel,
    SideBar,
    MainHeader,
    Footer
  },
  data(){
    return{
      userData:{
        name: "",
        email: "",
        account: ""
      },
    }
  },
  created() {
    // const { id } = this.$route.params
    this.fetchUser(24)
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
          userId: 24,
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
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }
    }
  }

}
</script>