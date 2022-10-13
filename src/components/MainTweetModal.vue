<template>
  <div>
    <div class="modal__container tweet-modal__container">
      <!-- 最上方的區塊 -->
      <div class="modal__input__container">
        <img
          @click.stop.prevent="handleCancelClicked"
          src="../assets/images/cancel-orange.svg"
          alt=""
          class="modal__input--cancel"
        />
      </div>
      <!-- 輸入框是個表格 -->
      <form @submit.stop.prevent="handleSubmit" class="tweet__input">
        <div class="tweet__input--info__container">
          <div class="tweet__input--avatar">
            <img v-if="!isLoading" :src="userprofilePhoto" alt="" />
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

          <button
            @click.stop.prevent=""
            v-if="tweetLength <= 0"
            class="tweet__input--button tweet__input--button-dis">推文</button>
          <button
          @click.stop.prevent="handleSubmit"
          v-else type="submit" 
          class="tweet__input--button">推文</button>

        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import tweetsAPI from '../apis/tweets.js'
import usersAPI from '../apis/users.js'
import { mapState } from 'vuex'

export default {
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
    }
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
            icon: 'error',
            title: '目前無法取得使用者頭像，請稍後再試'
        })
      }
    },
    async handleSubmit () {
      try {
        if (this.isProcessing) return
        this.isProcessing = true

        const response = await tweetsAPI.addTweet({
          description: this.tweetContent
        })
        if(response.status !== 200) throw new Error(response.data.message)
        this.$emit('after-submit-close', false)
        this.$emit('after-submit', response.data)
        Toast.fire({
          icon: 'success',
          title: '建立推文成功！'
        })
        this.isProcessing = false
      }
      catch (error) {
        console.log(error.message)
        this.isProcessing = false
        return Toast.fire({
          icon: 'error',
          title: '無法新增推文，請稍後再試'
        })
      }
    },
    handleCancelClicked () {
      this.$emit('after-submit-close')
    }
  }
}
</script>