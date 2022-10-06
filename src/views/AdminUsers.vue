<template>
    <div class="twitter__project">
        <div class="admin-container">
            <section class="left__container">
                <SideBarAdmin />
            </section>
            <main class="main__container">
                <MainHeader :content="`使用者列表`"/>
                <HomeTabs />
                <div class="tweets__container">
                    <UserFollowCard />
                    <UserFollowCard />
                    <UserFollowCard />
                </div>
            </main>

            <div class="modal__mask" v-if="false">
            </div>
        </div>
        <footer class="footer__controller">
            
        </footer>
    </div>
</template>

<script>
import SideBarAdmin from '../components/SideBarAdmin.vue'
import MainHeader from '../components/MainHeader.vue'
import UserFollowCard from '../components/UserFollowCard.vue'

export default {
    components: {
        SideBarAdmin,
        MainHeader,
        UserFollowCard,
    },
}
</script>