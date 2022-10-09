<template>
    <div class="twitter__project">
        <div class="admin-container admin-user">
            <section class="left__container">
                <SideBarAdmin :current-page="`users`"/>
            </section>
            <main class="main__container">
                <MainHeader :content="`使用者列表`"/>
                <div class="admin-user__container">
                    <p v-if="!users.length">目前無任何使用者</p>
                    <AdminUsers v-else 
                    v-for="user in users" 
                    :key="user.id" 
                    :initial-user="user"/>
                </div>
            </main>

        </div>
        <footer class="footer__controller">
            
        </footer>
    </div>
</template>

<script>
import SideBarAdmin from '../components/SideBarAdmin.vue'
import MainHeader from '../components/MainHeader.vue'
import AdminUsers from '../components/AdminUsers.vue'
import adminAPI from '../apis/admin.js'
import { Toast } from '../utils/helpers.js'

export default {
    components: {
        SideBarAdmin,
        MainHeader,
        AdminUsers
    },
    data () {
        return {
            users: []
        }
    },
    created () {
        this.fetchAdminUsers()
    },
    methods: {
        async fetchAdminUsers () {
            try {
                const { data } = await adminAPI.getAdminUsers()
                this.users = [...data]
            }
            catch (error) {
                console.log(error)
                return Toast.fire({
                    icon: 'error',
                    title: '無法取得推文，請稍候再試'
                })
            }
        }
    }
}
</script>