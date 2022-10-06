<template>
    <div class="twitter__project">
        <div class="container setting-page">
            <section class="left__container">
                <SideBar />
            </section>
            <main class="main__container">
                <MainHeader :content="`帳戶設定`"/>
                <div class="tweets__container">
                  <SettingPanel />
                </div>
            </main>

            <section class="right__container">
                
            </section>
        </div>
        <footer class="footer__controller">
            
        </footer>
    </div>
</template>
<script>
import SettingPanel from './../components/SettingPanel'
import SideBar from '../components/SideBar.vue'
import MainHeader from '../components/MainHeader.vue'

export default {
  components:{
    SettingPanel,
    SideBar,
    MainHeader
  }
}
</script>