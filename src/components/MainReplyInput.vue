<template>
  <form class="main__reply">
    <div class="main__reply--avatar">
      <img v-if="!isLoading" :src="userprofilePhoto | emptyImage" alt="" />
    </div>
    <span class="main__reply--content">推你的回覆</span>
    <div class="main__reply--button__container">
      <div type="submit" class="main__reply--button formbutton">回覆</div>
    </div>
  </form>
</template>

<script>
import { Toast, innerHtml } from '../utils/helpers'
import { mapState } from "vuex";
import usersAPI from '../apis/users.js'
import {
  showDescriptionFilter,
  fromNowFilter,
  emptyImageFilter
} from "../utils/mixins";

export default {
  name: 'MainReplyInput',
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  mixins: [showDescriptionFilter, fromNowFilter, emptyImageFilter],
  props: {
      iniIsModalToggled: {
          type: Boolean,
      }
  },
  data(){
    return{
      userprofilePhoto: '',
      isLoading: true,
      isProcessing: false,
      isModalToggled: this.iniIsModalToggled
    }
  },
  created() {
    this.fetchUser(this.currentUser.id)
  },
  methods: {
    toggleModal () {
        this.isModalToggled = true
        this.$emit("after-toggle-modal", this.isModalToggled)
    },
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
            html: innerHtml('目前無法回復貼文，請稍後再試','error')
        })
      }
    },
  }
}
</script>