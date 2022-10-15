<template>
  <div>
    <div class="modal__container tweet-modal__container reply-modal__container"
    :class="{modal__show: modalToggled}">
    
      <!-- header -->
      <header class="header modal__header">
          <div @click.stop.prevent="handleCancelClicked" class="user__header--icon">
              <img src="../assets/images/last-step.svg" alt="">
          </div>
          <button type="button" class="formbutton">回覆
          </button>
      </header>

      <!-- 最上方的區塊 -->
      <div class="modal__input__container">
        <img @click.stop.prevent="handleCancelClicked" src="../assets/images/cancel-orange.svg" alt="" class="modal__input--cancel" />
      </div>

      <!-- 推文 -->
      <div class="modal__input--tweet">
        <!-- 圖片 -->
        <div class="tweet__input--avatar__container">
          <div class="tweet__input--avatar">
            <img :src="initialTweet.User.profilePhoto | emptyImage" alt="" />
          </div>
          <span class="tweet__input--dash"></span>
        </div>

        <!-- 內容 -->
        <div class="tweet__info">
          <div class="tweet__top">
            <span class="tweet__top--prim">{{initialTweet.User.name}}</span>
            <span class="tweet__top--sec">@{{initialTweet.User.account}}</span>
            <span class="tweet__top--sec">．{{initialTweet.createdAt | fromNow}}</span>
          </div>
          <div class="tweet__info--content">
            {{initialTweet.description}}
          </div>
          <div class="tweet__target">
            <span class="tweet__target--sec">回覆給</span>
            <span class="tweet__target--prim">@apple</span>
          </div>
        </div>
      </div>


      <!-- 回覆推文 -->
      <form class="tweet__input">
        <div class="tweet__input--info__container">
          <div class="tweet__input--avatar">
            <img v-if="!isLoading" :src="userprofilePhoto | emptyImage" alt="" />
          </div>
          <textarea
            v-model="tweetContent"
            wrap="hard" 
            class="tweet__input--content" name="description" 
            type="text" placeholder="推你的回覆"
            autocomplete="off" autofocus></textarea>
          <!-- 用input不能自動換行，所以要用textarea -->
        </div>
        <div class="tweet__input--button__container">
          <div v-show="tweetLength >= 140" class="tweet__input--warning">字數不可超過<span class="montserrat-font">140</span>字</div>

          <div v-show="tweetLength <= 0" class="tweet__input--warning">內容不可空白</div>
          <button
            @click.stop.prevent=""
            v-if="tweetLength <= 0"
            class="tweet__input--button tweet__input--button-dis">回覆</button>
          <button
          @click.stop.prevent="handleSubmit(initialTweet.id)"
          v-else type="submit" 
          class="tweet__input--button">回覆</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast, innerHtml } from '../utils/helpers'
import tweetsAPI from '../apis/tweets.js'
import usersAPI from '../apis/users.js'
import { mapState } from 'vuex'
import {
  showDescriptionFilter,
  fromNowFilter,
  emptyImageFilter
} from "../utils/mixins";

export default {
  props: {
    initialTweet: {
      type: Object,
      required: true
    },
    isInDetailPage: {
      type: Boolean,
      default: false
    },
    modalToggled: {
      type: Boolean,
      default: false
    }
  },
  mixins: [showDescriptionFilter, fromNowFilter, emptyImageFilter],
  data() {
    return {
      tweetContent: '',
      userprofilePhoto: '',
      isLoading: true,
      isProcessing: false
    }
  },
  watch: {
    tweetContent(newValue){
      if (newValue.length >= 140) {
        this.tweetContent = this.tweetContent.slice(0, 140)
      }
    },
  },
  created() {
    this.fetchUser(this.currentUser.id)
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
    tweetLength() {
      return this.tweetContent.length
    }
  },
  methods: {
    async fetchUser (userId) {
      try {
        this.isLoading = true
        const { data } = await usersAPI.getUser({userId})
        this.userprofilePhoto = data.profilePhoto
        this.isLoading = false
      }
      catch (error) {
        console.log(error.message)
        this.isLoading = false
        return Toast.fire({
            html: innerHtml('目前無法取得使用者頭像，請稍後再試','error')
        })
      }
    },
    async handleSubmit (id) {
      try {
        if (this.isProcessing) return
        this.isProcessing = true

        const response = await tweetsAPI.addReply({
          id,
          comment: this.tweetContent
        })
        if(response.status !== 200) throw new Error(response.data.message)
        
        this.$emit('after-submit', response.data)
        
        //如果不是在詳細頁回覆，回覆完就導到詳細頁
        if (!this.isInDetailPage) {
          history.replaceState({ name: "tweet-detail" }, null, `/#/tweets/${id}`);
          this.$router.push({name: 'tweet-detail', params: {id}})
        }
        
        Toast.fire({
          html: innerHtml('回覆成功','succeed')
        })
        this.isProcessing = false
        //關掉modal，並回傳true代表新增成功
        this.$emit('after-submit-close', true)
      }
      catch (error) {
        console.log(error.message)
        this.$emit('after-submit-close', false)
        this.isProcessing = false
        return Toast.fire({
          html: innerHtml('無法回覆貼文，請稍後再試','error')
        })
      }
    },
    handleCancelClicked () {
      this.$emit('after-submit-close', false)
    }
  }
}
</script>