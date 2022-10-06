<template>
    <div class="twitter__project">
        <div class="admin-container">
            <section class="left__container">
                <SideBarAdmin />
            </section>
            <main class="main__container">
                <MainHeader :content="`推文清單`"/>
                <div class="tweets__container">
                    <AdminTweets />
                    <AdminTweets />
                    <AdminTweets />
                    <AdminTweets />
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
import AdminTweets from '../components/AdminTweets.vue'

export default {
    components: {
        SideBarAdmin,
        MainHeader,
        AdminTweets
    },
}
</script>