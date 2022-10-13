<template>
    <div class="twitter__project">
        <div class="admin-container admin-user">
            <section class="left__container">
                <SideBarAdmin :current-page="`users`"/>
            </section>
            <main class="main__container">
                <MainHeader :content="`使用者列表`"/>
                <div v-if="!isLoading" class="admin-user__container">
                    <p v-if="!users.length">目前無任何使用者</p>
                    <AdminUsers v-else 
                    v-for="user in users" 
                    :key="user.id" 
                    :initial-user="user"/>
                </div>
                <Spinner v-else/>
            </main>

        </div>
        <FooterAdmin 
        :current-page="`user`"/>
    </div>
</template>

<script>
import SideBarAdmin from '../components/SideBarAdmin.vue'
import FooterAdmin from '../components/FooterAdmin.vue'
import MainHeader from '../components/MainHeader.vue'
import AdminUsers from '../components/AdminUsers.vue'
import Spinner from '../components/Spinner.vue'
import adminAPI from '../apis/admin.js'
import { Toast, innerHtml } from '../utils/helpers.js'

export default {
    components: {
        SideBarAdmin,
        MainHeader,
        AdminUsers,
        FooterAdmin,
        Spinner
    },
    data () {
        return {
            users: [],
            isLoading: true
        }
    },
    created () {
        this.fetchAdminUsers()
    },
    methods: {
        async fetchAdminUsers () {
            try {
                this.isLoading = true
                const { data } = await adminAPI.getAdminUsers()
                this.users = [...data]
                // 排除管理者，只顯示使用者
                this.users = this.users.filter(user => user.role === 'user')
                this.isLoading = false
            }
            catch (error) {
                console.log(error)
                this.isLoading = false
                return Toast.fire({
                    html: innerHtml('無法取得貼文，請稍後再試','error')
                })
            }
        }
    }
}
</script>