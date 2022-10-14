<template>
  <header class="header main__header">
    <div class="main__header--icon">
      <img
        @click="$router.back()"
        class="main__header--icon-back"
        v-if="tweetId"
        src="../assets/images/last-step.svg"
        alt=""
      />

      <img
        class="main__header--icon-avatar"
        v-if="isMobile"
        :src="user.profilePhoto | emptyImage"
        alt=""
      />
    </div>

    <div class="main__header--word">
      <h4>{{ content }}</h4>
    </div>
  </header>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  props: {
    content: {
      type: String,
    },
    tweetId: {
      type: Number,
    },
    user: {
      type: Object,
    },
    isMobile: {
      type: Boolean,
    },
  },
  mixins: [emptyImageFilter],
};
</script>