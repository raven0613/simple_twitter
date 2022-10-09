<template>
  <div>
    <div class="modal__container tweet-modal__container">
      <!-- 最上方的區塊 -->
      <div class="modal__input__container">
        <img
          src="../assets/images/cancel-orange.svg"
          alt=""
          class="modal__input--cancel"
        />
      </div>
      <!-- 輸入框是個表格 -->
      <form @submit.stop.prevent="" class="tweet__input">
        <div class="tweet__input--info__container">
          <div class="tweet__input--avatar">
            <img src="../assets/images/avatar.svg" alt="" />
          </div>
          <textarea
            v-model="tweetContent"
            wrap="hard" 
            class="tweet__input--content"
            name="description"
            type="text"
            placeholder="有什麼新鮮事？"
            autocomplete="off"
            autofocus
          ></textarea>
          <!-- 用input不能自動換行，所以要用textarea -->
        </div>
        <div class="tweet__input--button__container">
          <div v-show="tweetLength >= 140" class="tweet__input--warning">字數不可超過<span class="montserrat-font">140</span>字</div>
          <div v-show="tweetLength <= 0" class="tweet__input--warning">內容不可空白</div>
          <button @click.stop.prevent="handleSubmit" type="submit" class="tweet__input--button">推文</button>
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
        const response = await tweetsAPI.addTweet({
          description: this.tweetContent
        })
        if(response.status !== 200) throw new Error(response.data.message)
        this.$emit('after-submit-close', false)
        this.$emit('after-submit', response.data)
        return Toast.fire({
          icon: 'success',
          title: '建立推文成功！'
        })
      }
      catch (error) {
        console.log(error.message)
        return Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍後再試'
        })
      }
    }
  }
}
</script>