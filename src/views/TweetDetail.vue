<template>
  <div
    class="twitter__project"
    :class="{ modal__toggled: isModalToggled || isReplyModalToggled }"
  >
    <div class="container">
      <section class="left__container">
        <SideBar
          :current-page="`main`"
          :ini-is-modal-toggled="isModalToggled"
          @after-toggle-modal="handleToggleModal"
        />
      </section>
      <main class="main__container">
        <!-- 回覆視窗 -->
        <transition name="modal">
          <MainReplyModal
            v-if="isReplyModalToggled"
            @after-submit-close="handleCloseModal"
            @after-submit="handleAddReply"
            :initial-tweet="tweet"
            :is-in-detail-page="true"
          />
        </transition>

        <!-- 推文視窗 -->
        <transition name="modal">
          <MainTweetModal
            v-if="isModalToggled"
            @after-submit-close="handleCloseModal"
          />
        </transition>

        <UserHeader
          :content="`推文`"
          :is-tweet-modal="isModalToggled"
          :is-reply-modal="isReplyModalToggled"
        />
        <!-- <MainHeader :content="`推文`" :tweet-id="tweet.id"/> -->

        <MainTweet
          v-if="!isLoading"
          :initial-data="tweet"
          @after-toggle-modal="handleToggleReplyModal"
        />
        <Spinner v-else />

        <div class="tweet-detail__input">
          <MainReplyInput
            :ini-is-modal-toggled="isModalToggled"
            @after-toggle-modal="handleToggleModal"
          />
        </div>
        <div v-if="!isLoading" class="tweets__container">
          <ReplyCard
            v-for="reply in replies"
            :key="reply.id"
            :reply="reply"
            :tweet-owner="tweet.User.account"
          />
        </div>
      </main>

      <section class="right__container">
        <RecommendUsers />
      </section>
      <transition :duration="{ enter: 350, leave: 150 }">
        <div
          class="modal__mask"
          @click.stop.prevent="handleCloseModal(false)"
          v-if="isModalToggled || isReplyModalToggled"
        ></div>
      </transition>
    </div>
    <Footer
      :ini-is-modal-toggled="isModalToggled"
      @after-toggle-modal="handleToggleModal"
    />
  </div>
</template>

<script>
import ReplyCard from "../components/ReplyCard.vue";
import SideBar from "../components/SideBar.vue";
import RecommendUsers from "../components/RecommendUsers.vue";
// import MainHeader from '../components/MainHeader.vue'
import UserHeader from "../components/UserHeader.vue";
import MainTweet from "../components/MainTweet.vue";
import Footer from "../components/Footer.vue";
import MainReplyModal from "../components/MainReplyModal.vue";
import MainTweetModal from "../components/MainTweetModal.vue";
import MainReplyInput from "../components/MainReplyInput.vue";
import Spinner from "../components/Spinner.vue";
import tweetsAPI from "../apis/tweets.js";
import { Toast, innerHtml } from "../utils/helpers.js";
import { mapState } from "vuex";

export default {
  components: {
    ReplyCard,
    SideBar,
    RecommendUsers,
    // MainHeader,
    UserHeader,
    MainTweet,
    Footer,
    MainReplyModal,
    MainTweetModal,
    MainReplyInput,
    Spinner,
  },
  data() {
    return {
      tweet: {},
      replies: [],
      isModalToggled: false,
      isReplyModalToggled: false,
      isTweetLoading: true,
      isReplyLoading: true,
    };
  },
  created() {
    const { id: tweetId } = this.$route.params;
    this.fetchTweet(tweetId);
    this.fetchReplies(tweetId);
  },
  beforeRouteUpdate(to, from, next) {
    this.isTweetLoading = true;
    this.isReplyLoading = true;
    const { id } = to.params;
    this.fetchTweet(id);
    this.fetchReplies(id);
    next();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    isLoading() {
      if (!this.isTweetLoading && !this.isReplyLoading) {
        return false;
      }
      return true;
    },
  },
  methods: {
    async fetchTweet(id) {
      try {
        this.isTweetLoading = true;
        const response = await tweetsAPI.getTweet({ id });
        this.tweet = response.data;
        this.isTweetLoading = false;
      } catch (error) {
        console.log(error);
        this.isTweetLoading = false;
        return Toast.fire({
          html: innerHtml("目前無法取得推文，請稍後再試", "error"),
        });
      }
    },
    async fetchReplies(id) {
      try {
        this.isReplyLoading = true;
        const response = await tweetsAPI.getReplies({ id });
        this.replies = response.data;
        this.isReplyLoading = false;
      } catch (error) {
        console.log(error);
        this.isReplyLoading = false;
        return Toast.fire({
          html: innerHtml("目前無法取得回覆，請稍後再試", "error"),
        });
      }
    },
    handleToggleModal(isModalToggled) {
      this.isModalToggled = isModalToggled;
      history.pushState({ name: "new-tweet" }, null, "/#/tweet/new");
    },
    handleCloseModal(isSubmitted) {
      this.isModalToggled = false;
      this.isReplyModalToggled = false;
      if (!isSubmitted) {
        this.$router.back();
      }
    },
    handleToggleReplyModal(isReplyModalToggled) {
      this.isReplyModalToggled = isReplyModalToggled;
      history.pushState({ name: "new-reply" }, null, "/#/reply/new");
    },
    handleAddReply(reply) {
      this.$router.back();
      this.replies.push(reply);
      this.tweet = {
        ...this.tweet,
        replyCounts: this.tweet.replyCounts + 1,
      };
      //
      this.fetchReplies(this.tweet.id);
    },
  },
};
</script>