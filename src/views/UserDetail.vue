<template>
  <div class="twitter__project"
  :class="{modal__toggled: isModalToggled}">
    <div class="container">
      <section class="left__container">
        <SideBar
          :current-page="`user`"
          :ini-is-modal-toggled="isModalToggled"
          @after-toggle-modal="handleToggleModal"
        />
      </section>
      <main class="main__container">
    <!-- 使用者資料編輯視窗 -->
        <UserEditModal
          v-if="isEditModalToggled"
          :initialUser="user"
          :initialFormErrorEmail="formErrorEmail"
          :initialFormErrorIntroduction="formErrorIntroduction"
          @after-submit-close="handleCloseModal"
          @after-submit="handleAfterSubmit"
          @after-remove-cover-photo="handleRemoveCoverPhoto"
        />
    <!-- 推文視窗 -->
        <MainTweetModal
          v-if="isModalToggled"
          @after-submit-close="handleCloseModal"
        />
    <!-- 回覆視窗 -->
        <MainReplyModal
          v-if="isReplyModalToggled"
          @after-submit-close="handleCloseModal"
          :initial-tweet="clickedTweet"
          :is-in-detail-page="false"
        />

        <UserHeader :content="user.name" :counts="tweets.length"/>
        <UserPanel
          v-if="!isUserLoading"
          :ini-is-modal-toggled="isModalToggled"
          :initialUser="user"
          @after-toggle-modal="handleToggleEditModal"
        />
        <Spinner v-else/>
        
        <HomeTabs 
        :clicked-tab="currentTab"
        :user-id="currentUser.id"
        @after-click-tab="handleClickTab"
        />
    <!-- tab=tweet -->
        <div v-if="!isTweetLoading && currentTab==='tweet'" 
        class="tweets__container">
            <p v-if="!tweets.length">目前還沒有推文</p>
            <TweetCard 
            v-else
            :ini-is-modal-toggled="isModalToggled"
            @after-toggle-modal="handleToggleReplyModal"
            @after-clicked-reply="handlePassTweetData"
            v-for="tweet in tweets" 
            :key="tweet.id"
            :initial-tweet="tweet"
            />
        </div>
    <!-- tab=reply -->
        <div v-else-if="!isTweetLoading && currentTab==='reply'" 
        class="tweets__container">
            <p v-if="!replies.length">目前還沒有回覆</p>
            <ReplyCard 
            v-else
            v-for="reply in replies" 
            :key="reply.id"
            :reply="reply"
            :user="user"/>
        </div>
        
    <!-- tab=like -->
        <div v-else-if="!isTweetLoading && currentTab==='like'" 
        class="tweets__container">
            <p v-if="!likes.length">目前還沒有喜歡的內容</p>
            <TweetCard 
            v-else
            :ini-is-modal-toggled="isModalToggled"
            @after-toggle-modal="handleToggleReplyModal"
            @after-clicked-reply="handlePassTweetData"
            v-for="like in likes" 
            :key="like.id"
            :initial-tweet="like"
            :user="user"/>
        </div>

        <Spinner v-else/>
      </main>
      <section class="right__container">
        <RecommendUsers />
      </section>

      <div
        class="modal__mask"
        @click.stop.prevent="handleCloseModal(false)"
        v-if="isModalToggled || isReplyModalToggled || isEditModalToggled"
      ></div>
    </div>
    <Footer :current-page="`user`" />
  </div>
</template>

<script>
import TweetCard from "../components/TweetCard.vue";
import ReplyCard from "../components/ReplyCard.vue";
import SideBar from "../components/SideBar.vue";
import RecommendUsers from "../components/RecommendUsers.vue";
import UserHeader from "../components/UserHeader.vue";
import HomeTabs from "../components/HomeTabs.vue";
import UserEditModal from "../components/UserEditModal.vue";
import MainReplyModal from "../components/MainReplyModal.vue";
import MainTweetModal from "../components/MainTweetModal.vue";
import Footer from "../components/Footer.vue";
import UserPanel from "../components/UserPanel.vue";
import Spinner from '../components/Spinner.vue'
import usersAPI from "../apis/users.js";
import { Toast, innerHtml } from "../utils/helpers.js";
import { mapState } from "vuex";

export default {
  components: {
    TweetCard,
    ReplyCard,
    SideBar,
    RecommendUsers,
    UserHeader,
    HomeTabs,
    UserEditModal,
    Footer,
    UserPanel,
    MainReplyModal,
    MainTweetModal,
    Spinner
  },
  data() {
    return {
      user: {},
      tweets: [],
      replies: [],
      likes: [],
      isUserLoading: true,
      isTweetLoading: true,
      currentTab: "tweet",
      isModalToggled: false,
      isReplyModalToggled: false,
      isEditModalToggled: false,
      clickedTweet: {},
      formErrorEmail: false,
      formErrorIntroduction: false,
    };
  },
  created() {
    this.isTweetLoading = true
    this.isUserLoading = true
    const { id: userId } = this.$route.params;
    if (userId) {
      this.fetchUser(userId);
    }
    else {
      //直接貼編輯網址的話上面沒有id
      this.fetchUser(this.currentUser.id);
    }
    this.getUrl()

    const { tab } = this.$route.query;
    if (!tab || tab === "tweet") {
      this.fetchUserTweets(userId);
    } else if (tab === "reply") {
      this.fetchUserReplies(userId);
    } else if (tab === "like") {
      this.fetchUserLikes(userId);
    }

    this.currentTab = tab;
  },
  beforeRouteUpdate(to, from, next) {
    this.isTweetLoading = true
    this.isUserLoading = true
    const { id: userId } = to.params;
    this.fetchUser(userId);

    const { tab } = to.query;
    this.currentTab = tab;
    if (tab === "tweet") {
      this.fetchUserTweets(userId);
    } else if (tab === "reply") {
      this.fetchUserReplies(userId);
    } else if (tab === "like") {
      this.fetchUserLikes(userId);
    }
    next();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    isLoading () {
      if (!this.isTweetLoading && !this.isUserLoading) {
          return false
      }
      return true
    }
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isUserLoading = true;
        const response = await usersAPI.getUser({ userId });
        const {
          id,
          account,
          coverPhoto,
          email,
          introduction,
          name,
          profilePhoto,
          followerCounts,
          followingCounts,
          isFollowed,
        } = response.data;
        this.user = {
          ...this.user,
          id,
          account,
          coverPhoto,
          email,
          introduction,
          name,
          profilePhoto,
          followerCounts,
          followingCounts,
          isFollowed,
        };
        this.isUserLoading = false;
      } catch (error) {
        console.log(error);
        this.isUserLoading = false;
        Toast.fire({
          html: innerHtml('目前無法取得推文，請稍後再試','error')
        });
      }
    },
    async fetchUserTweets(userId) {
      try {
        this.isTweetLoading = true;
        const response = await usersAPI.getUserTweets({ userId });
        
        //裡面不是 likeCounts
        this.tweets = [...response.data];
        this.isTweetLoading = false;
      } catch (error) {
        console.log(error);
        this.isTweetLoading = false;
        Toast.fire({
          html: innerHtml('目前無法取得推文，請稍後再試','error')
        });
      }
    },
    async fetchUserReplies(userId) {
      try {
        this.isTweetLoading = true;
        const response = await usersAPI.getUserReplies({ userId });
        this.replies = [...response.data];
        this.isTweetLoading = false;
      } catch (error) {
        console.log(error);
        this.isTweetLoading = false;
        Toast.fire({
          html: innerHtml('目前無法取得推文，請稍後再試','error')
        });
      }
    },
    async fetchUserLikes(userId) {
      try {
        this.isTweetLoading = true;
        const response = await usersAPI.getUserLikes({ userId });
        
        this.likes = [...response.data];
        this.isTweetLoading = false;
      } catch (error) {
        console.log(error);
        this.isTweetLoading = false;
        Toast.fire({
          html: innerHtml('目前無法取得推文，請稍後再試','error')
        });
      }
    },
    async handleAfterSubmit(formData) {
      try {
        console.log("hi", formData);
        const { data } = await usersAPI.updateProfile({
          userId: this.currentUser.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 直接把從UserEditModal傳來的資料更新到畫面，這樣UserPanel就可以立刻watch到資料有改變
        this.fetchUser(this.currentUser.id)
        this.fetchUserTweets(this.currentUser.id)

        Toast.fire({
          html: innerHtml('成功更新使用者資料','succeed')
        });
      } catch (error) {
        const message = error.response.data.message.toLowerCase();
        console.log(message);
        if (message.includes("暱稱字數限制需在 1~ 50 字之內")) {
          this.formErrorAccount = true;
        } else if (message.includes("自我介紹字數限制需在 1~ 160 字之內")) {
          this.formErrorEmail = true;
        }
        Toast.fire({
          html: innerHtml('目前無法更新使用者資料，請稍後再試','error')
        });
      }
    },
    handleToggleModal(isModalToggled) {
      this.isModalToggled = isModalToggled;
      history.pushState({ name: "new-tweet" }, null, "/#/tweets/new");
    },
    handleCloseModal(isSubmitted) {
      this.isModalToggled = false;
      this.isReplyModalToggled = false;
      this.isEditModalToggled = false;
      //如果不是在submit後回傳的關掉，就可以直接回上一頁
      if (!isSubmitted) {
        this.$router.back()
      }
    },
    handleToggleReplyModal(isReplyModalToggled) {
      this.isReplyModalToggled = isReplyModalToggled;
      history.pushState({ name: "new-reply" }, null, "/#/reply/new");
    },
     handleToggleEditModal(isEditModalToggled) {
      this.isEditModalToggled = isEditModalToggled;

      history.pushState({ name: "user-edit" }, null, "/#/users/edit");

    },
    handlePassTweetData(tweet) {
      this.clickedTweet = tweet;
    },
    handleClickTab (clickedTab) {
      if (this.currentTab === clickedTab) return
      this.currentTab = clickedTab
      if (clickedTab === 'tweet') {
        this.fetchUserTweets(this.user.id)
        history.replaceState({ name: "user-tweet" }, null, `/#/users/${this.user.id}?tab=${clickedTab}`)
      }
      else if (clickedTab === 'reply') {
        this.fetchUserReplies(this.user.id)
        history.replaceState({ name: "user-reply" }, null, `/#/users/${this.user.id}?tab=${clickedTab}`);
      }
      else if (clickedTab === 'like'){
        this.fetchUserLikes(this.user.id)
        history.replaceState({ name: "user-like" }, null, `/#/users/${this.user.id}?tab=${clickedTab}`);
      }
    },
    // 別人直接貼網址的狀況
    getUrl() {
        if(this.$route.matched[0].name === 'user-edit') {
            this.isEditModalToggled = true
        }
    },
    // 刪除封面照片
    async handleRemoveCoverPhoto(){
      try{
        const { data } = await usersAPI.removeCoverPhoto({
          userId: this.currentUser.id
        })
        console.log(data)
      } catch(error) {
        Toast.fire({
          html: innerHtml('目前無法刪除照片，請稍後再試','error')
        });
      }
    }
  },
};
</script>