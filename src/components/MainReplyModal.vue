<template>
  <div>
    <div class="modal__container tweet-modal__container reply-modal__container">
      <!-- 最上方的區塊 -->
      <div class="modal__input__container">
        <img src="../assets/images/cancel-orange.svg" alt="" class="modal__input--cancel" />
      </div>

      <!-- 推文 -->
      <div class="modal__input--tweet">
        <!-- 圖片 -->
        <div class="tweet__input--avatar__container">
          <div class="tweet__input--avatar">
            <img src="../assets/images/avatar.svg" alt="" />
          </div>
          <span class="tweet__input--dash"></span>
        </div>

        <!-- 內容 -->
        <div class="tweet__info">
          <div class="tweet__top">
            <span class="tweet__top--prim">Jane Cathy</span>
            <span class="tweet__top--sec">@apple</span>
            <span class="tweet__top--sec">．<span class="montserrat-font">3</span>小時</span>
          </div>
          <div class="tweet__info--content">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation
            incididunt aliquip deserunt reprehenderit elit laborum.
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
            <img src="../assets/images/avatar.svg" alt="" />
          </div>
          <textarea wrap="hard" class="tweet__input--content" name="description" type="text" placeholder="推你的回覆"
            autocomplete="off" autofocus></textarea>
          <!-- 用input不能自動換行，所以要用textarea -->
        </div>
        <div class="tweet__input--button__container">
          <div class="tweet__input--warning">內容不可空白</div>
          <button type="submit" class="tweet__input--button">回覆</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import tweetsAPI from '../apis/tweets.js'

export default {
  data() {
    return {
      tweetContent: '',
    }
  },
  watch: {
    tweetContent(newValue){
      if (newValue.length >= 140) {
        this.tweetContent = this.tweetContent.slice(0, 140)
      }
    }
  },
  computed: {
    tweetLength() {
      return this.tweetContent.length
    }
  },
  methods: {
    async handleSubmit () {
      try {
        const response = await tweetsAPI.addReply({
          description: this.tweetContent
        })
        if(response.status !== 200) throw new Error(response.data.message)
        this.$emit('after-submit-close', false)
        this.$emit('after-submit', response.data)
      }
      catch (error) {
        console.log(error.message)
        return Toast.fire({
          icon: 'error',
          title: '無法回覆貼文，請稍後再試'
        })
      }
    }
  }
}
</script>