<template>
  <div class="twitter__project">
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
        />
    <!-- 推文視窗 -->
        <MainTweetModal
          v-if="isModalToggled"
          @after-submit-close="handleCloseModal"
          @after-submit="handleAddTweet"
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

        <HomeTabs 
        :clicked-tab="currentTab"
        :user-id="currentUser.id"
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
        <div v-if="!isTweetLoading && currentTab==='reply'" 
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
        <div v-if="!isTweetLoading && currentTab==='like'" 
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

      </main>
      <section class="right__container">
        <RecommendUsers />
      </section>

      <div
        class="modal__mask"
        @click.stop.prevent="handleCloseModal"
        v-if="isModalToggled || isReplyModalToggled || isEditModalToggled"
        @touchmove.prevent
        @mousewheel.prevent
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
import usersAPI from "../apis/users.js";
import { Toast } from "../utils/helpers.js";
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
    if (tab === "tweet") {
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
          icon: "error",
          title: `無法取得推文,請稍後再試`,
        });
      }
    },
    async fetchUserTweets(userId) {
      try {
        this.isTweetLoading = true;
        const response = await usersAPI.getUserTweets({ userId });
        console.log(response);
        //裡面不是 likeCounts
        this.tweets = [...response.data];
        this.isTweetLoading = false;
      } catch (error) {
        console.log(error);
        this.isTweetLoading = false;
        Toast.fire({
          icon: "error",
          title: `無法取得推文,請稍後再試`,
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
          icon: "error",
          title: `無法取得推文,請稍後再試`,
        });
      }
    },
    async fetchUserLikes(userId) {
      try {
        this.isTweetLoading = true;
        const response = await usersAPI.getUserLikes({ userId });
        console.log(response);
        // response.data = response.data.map(like => {
        //     return { ...like.Tweet }
        // })
        this.likes = [...response.data];
        this.isTweetLoading = false;
      } catch (error) {
        console.log(error);
        this.isTweetLoading = false;
        Toast.fire({
          icon: "error",
          title: `無法取得推文,請稍後再試`,
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
        this.user = formData;

        Toast.fire({
          icon: "success",
          title: "成功更新使用者資料",
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
          icon: "error",
          title: "無法更新使用者資料，請稍後再試",
        });
      }
    },
    handleToggleModal(isModalToggled) {
      this.isModalToggled = isModalToggled;
      history.pushState({ name: "new-tweet" }, null, "/#/tweets/new");
    },
    handleCloseModal() {
      this.isModalToggled = false;
      this.isReplyModalToggled = false;
      this.isEditModalToggled = false;
      this.$router.back();
    },
    handleAddTweet(tweet) {
      this.tweets = [tweet, ...this.tweets];
      this.fetchUserTweets(this.currentUser.id);
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
    handleAddReply(reply) {
      // this.$router.push({name: 'tweet-detail', params: { id: this.clickedTweet.id }})
      this.replies = this.replies.push(reply);
    },
    // 別人直接貼網址的狀況
    getUrl() {
        if(this.$route.matched[0].name === 'user-edit') {
            this.isEditModalToggled = true
        }
    }
  },
};
</script>