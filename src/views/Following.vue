<template>
    <div class="twitter__project">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`user`" :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
            </section>
            <main class="main__container">
                <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"
                @after-submit="handleAddTweet"/>
                
                <UserHeader :content="currentUser.name" :counts="25"/>
                <HomeTabs />
                <div v-if="!isLoading" class="tweets__container">
                    <p v-if="!followers.length">目前還沒有追隨者喔</p>
                    <UserFollowCard 
                    v-for="user in followers" 
                    :key="user.id"
                    :init-follower="user"/>
                </div>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <div class="modal__mask" @click.stop.prevent="handleCloseModal" v-if="isModalToggled"
            @touchmove.prevent @mousewheel.prevent>
            </div>
        </div>
        <Footer :current-page="`user`"/>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import RecommendUsers from '../components/RecommendUsers.vue'
import UserHeader from '../components/UserHeader.vue'
import UserFollowCard from '../components/UserFollowCard.vue'
import MainTweetModal from '../components/MainTweetModal.vue'
import HomeTabs from '../components/HomeTabs.vue'
import Footer from '../components/Footer.vue'
import usersAPI from '../apis/users.js'
import { Toast } from '../utils/helpers.js'
import { mapState } from 'vuex'


export default {
    components: {
        SideBar,
        RecommendUsers,
        UserHeader,
        MainTweetModal,
        UserFollowCard,
        HomeTabs,
        Footer
    },
    data () {
        return {
            followers: [],
            isModalToggled: false,
            isLoading: true
        }
    },
    created () {
        const { id } = this.$route.params
        this.fetchFollower(id)
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
    },
    methods: {
        async fetchFollower (userId) {
            try {
                this.isLoading = true
                const { data } = await usersAPI.getUserFollowrs({userId})
                console.log(data)
                this.followers = [...data]
                this.isLoading = false
            }
            catch (error) {
                console.log(error.message)
                this.isLoading = false
                Toast.fire({
                    icon: 'error',
                    title: `無法取得追隨者清單,請稍後再試`,
                })
            }
        },
        handleToggleModal(isModalToggled){
            this.isModalToggled = isModalToggled
        },
        handleCloseModal(){
            this.isModalToggled = false
        },
        handleAddTweet(){
            this.$router.push({name: 'main-page'})
        },
    }
}
</script>