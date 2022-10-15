<template>
    <div class="twitter__project"
    :class="{modal__toggled: isModalToggled}">
        <div class="container">
            <section class="left__container">
                <SideBar :current-page="`user`" :ini-is-modal-toggled="isModalToggled"
                @after-toggle-modal="handleToggleModal"/>
            </section>
            <main class="main__container">
                <transition name="modal">
                    <MainTweetModal v-if="isModalToggled"
                @after-submit-close="handleCloseModal"/>
                </transition>
                
                
                <UserHeader :content="currentUser.name" :counts="25"/>
                <HomeTabs 
                :clicked-tab="currentTab"
                @after-click-tab="handleClickTab"/>

            <template v-if="!isLoading">

            
                <div v-if="currentTab==='follower'" 
                class="tweets__container">
                    <p v-if="currentTab==='follower' && !followers.length">目前還沒有追隨者喔</p>
                    <UserFollowCard 
                    v-for="user in followers" 
                    :key="user.id"
                    :init-follower="user"/>
                </div>

                <div v-if="currentTab==='following'" 
                class="tweets__container">
                    <p v-if="currentTab==='following' && !followings.length">目前還沒有追隨任何人喔</p>
                    <UserFollowCard 
                    v-for="user in followings" 
                    :key="user.id"
                    :init-follower="user"/>
                </div>
                
            </template>
            <Spinner v-else/>
            </main>
            <section class="right__container">
                <RecommendUsers />
            </section>

            <transition :duration="{ enter: 350, leave: 150 }">
            <div class="modal__mask" @click.stop.prevent="handleCloseModal" v-if="isModalToggled"
            >
            </div>
            </transition>
            
        </div>
        <Footer :current-page="`user`"
        :ini-is-modal-toggled="isModalToggled"
        @after-toggle-modal="handleToggleModal"/>
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
import { Toast, innerHtml } from '../utils/helpers.js'
import { mapState } from 'vuex'
import Spinner from '../components/Spinner.vue'

export default {
    components: {
        SideBar,
        RecommendUsers,
        UserHeader,
        MainTweetModal,
        UserFollowCard,
        HomeTabs,
        Footer,
        Spinner
    },
    data () {
        return {
            userId: '',
            followers: [],
            followings: [],
            isModalToggled: false,
            isLoading: true,
            currentTab: "follower",
        }
    },
    created () {
        const { id } = this.$route.params
        this.userId = id
        this.getUrl()
        if (this.currentTab === 'follower') {
            this.fetchFollower(id)
        }
        else if (this.currentTab === 'following') {
            this.fetchFollowing(id)
        }
    },
    beforeRouteUpdate(to, from, next){
        this.isLoading = true
        const {id} = to.params
        this.getUrl()
        if (this.currentTab === 'follower') {
            this.fetchFollower(id)
        }
        else if (this.currentTab === 'following') {
            this.fetchFollowing(id)
        }
        next()
    },
    computed: {
        ...mapState(['currentUser', 'isAuthenticated']),
    },
    methods: {
        async fetchFollower (userId) {
            try {
                this.isLoading = true
                const { data } = await usersAPI.getUserFollowrs({userId})
                this.followers = [...data]
                this.isLoading = false
            }
            catch (error) {
                console.log(error.message)
                this.isLoading = false
                Toast.fire({
                    html: innerHtml('無法取得追隨者清單，請稍後再試','error')
                })
            }
        },
        async fetchFollowing (userId) {
            try {
                this.isLoading = true
                const { data } = await usersAPI.getUserFollowings({userId})
                this.followings = [...data]
                this.isLoading = false
            }
            catch (error) {
                console.log(error.message)
                this.isLoading = false
                Toast.fire({
                    html: innerHtml('無法取得追隨者清單，請稍後再試','error')
                })
            }
        },
        handleToggleModal(isModalToggled){
            this.isModalToggled = isModalToggled
            history.pushState({ name: "new-tweet" }, null, "/#/tweets/new");
        },
        handleCloseModal(){
            this.isModalToggled = false
        },
        handleClickTab (clickedTab) {
            this.currentTab = clickedTab
            if (clickedTab === 'follower') {
                this.fetchFollower(this.userId)
                history.replaceState({ name: "user-follower" }, null, `/#/users/${this.userId}/follower`)
            }
            else if (clickedTab === 'following') {
                this.fetchFollowing(this.userId)
                history.replaceState({ name: "user-following" }, null, `/#/users/${this.userId}/following`);
            }
        },
        getUrl() {
            console.log(this.$route.matched[0])
            if(this.$route.matched[0].name === 'user-follower') {
                this.currentTab = 'follower'
            }
            else if(this.$route.matched[0].name === 'user-following') {
                this.currentTab = 'following'
            }
        }
    }
}
</script>