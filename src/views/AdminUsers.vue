<template>
    <div class="twitter__project">
        <div class="admin-container">
            <section class="left__container">
                <SideBarAdmin />
            </section>
            <main class="main__container">
                <Header />
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
import Header from '../components/Header.vue'
import UserFollowCard from '../components/UserFollowCard.vue'

export default {
    components: {
        SideBarAdmin,
        Header,
        UserFollowCard,
    },
}
</script>