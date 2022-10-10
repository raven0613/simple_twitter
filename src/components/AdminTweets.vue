<template>
  <div class="admin-tweet__container tweet__container">
    <div class="tweet__avatar">
      <img
        class="tweet__avatar--photo"
        :src="tweet.User.profilePhoto | emptyImage"
        alt=""
      />
    </div>

    <div class="tweet__info">
      <form action="" class="tweet__top">
        <div class="tweet__top--info">
          <span class="tweet__top--prim">{{ tweet.User.name }}</span>
          <span class="tweet__top--sec">@{{ tweet.User.account }}</span>
          <span class="tweet__top--sec">．{{ tweet.createdAt | fromNow }}</span>
        </div>
        <button
          @click.stop.prevent="adminDeleteTweet(tweet.id)"
          type="button"
          class="tweet__delete"
        >
          <img src="../assets/images/cancel-gray.svg" alt="" />
        </button>
      </form>
      <div class="tweet__info--content">
        {{ tweet.description | showDescription(50) }}
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "../utils/helpers";
import adminAPI from "../apis/admin.js";
import {
  showDescriptionFilter,
  fromNowFilter,
  emptyImageFilter,
} from "../utils/mixins";

export default {
  props: {
    initialTweet: {
      type: Object,
    },
  },
  data() {
    return {
      tweet: this.initialTweet,
    };
  },
  mixins: [showDescriptionFilter, fromNowFilter, emptyImageFilter],
  methods: {
    async adminDeleteTweet(id) {
      try {
        // 因為Toast傳進來是Promise，所以要用await去非同步，要去看回傳值是什麼
        const result = await Toast.fire({
          title: "您確定嗎？",
          text: "刪除的文章是回不來的喔！",
          icon: "warning",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "確認",
          timer: undefined,
        });

        // 按取消可以取消動作，按確認功能可以刪貼文
        if (result.dismiss === "cancel") {
          return;
        } else if (result.value) {
          this.$emit("after-delete-tweet", id);
          const { data } = await adminAPI.deleteAdminTweets({ id });
          if (data.status === "error") throw new Error(data.message);
        }

      } catch (error) {
        console.log(error.response);
        return Toast.fire({
          icon: "error",
          title: "目前無法刪除推文，請稍後再試",
        });
      }
    },
  },
};
</script>