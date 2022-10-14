<template>
  <div>
    <div class="modal__container user-info__container">
      <!-- 背景圖片跟個人照 -->
      <div class="user-info__image__container">
        <div class="user-info__background__container">
          <img
            :src="user.coverPhoto | emptyImage"
            alt=""
            class="user-info__background--photo"
          />
        </div>

        <div class="user-info__avatar__container">
          <img
            :src="user.profilePhoto | emptyImage"
            alt=""
            class="user-info__avatar--photo"
          />
        </div>
      </div>

      <div class="user-info__data__container">
        <!-- 各種按鈕誒 -->
        <div class="user-info__controller">
          <button
            v-if="currentUser.id === user.id"
            class="user-info__controller--edit primbutton primbutton__edit"
            @click.stop.prevent="toggleModal">
            編輯個人資料
          </button>
          <button 
            v-if="currentUser.id !== user.id" 
            class="user-info__controller--message">
            <img src="../assets/images/userinfo_msg.svg" alt="" />
          </button>
          <button 
            v-if="currentUser.id !== user.id"
            class="user-info__controller--noti">
            <img src="../assets/images/userinfo_noti.svg" alt="" />
          </button>
          <button
            @click.stop.prevent="deleteFollowship(user.id)"
            v-if="user.isFollowed && currentUser.id !== user.id"
            class="user-info__controller--follow
              primbutton primbutton__followed"
            :class="{primbutton__followed_processing: isProcessing}">
            取消跟隨
          </button>
          <button
            @click.stop.prevent="addFollowship(user.id)"
            v-else-if="!user.isFollowed && currentUser.id !== user.id"
            class="user-info__controller--follow
              primbutton primbutton__unfollowed"
            :class="{primbutton__unfollowed_processing: isProcessing}">
            跟隨
          </button>
        </div>

        <!-- 個人資訊 -->
        <div class="user-info__panel">
          <h5 class="user-info__panel--name">{{ user.name }}</h5>
          <div class="user-info__panel--account">@{{ user.account }}</div>
          <div class="user-info__panel--description">
            {{ user.introduction }}
          </div>
          <div class="user-info__panel--follow__container">
            <router-link
              :to="{ name: 'user-following'}"
              class="user-info__panel--follow">
              <span>{{user.followingCounts}}個</span>
              <span>跟隨中</span>
            </router-link>

            <router-link
              :to="{ name: 'user-follower'}"
              class="user-info__panel--follow">
              <span>{{user.followerCounts}}位</span>
              <span>跟隨者</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import followshipsAPI from '../apis/followships.js'
import { Toast, innerHtml } from '../utils/helpers.js'
import { emptyImageFilter } from '../utils/mixins.js'
import { mapState } from 'vuex'

export default {
  name: "UserPanel",
  props: {
    iniIsModalToggled: {
      type: Boolean,
      required: true,
    },
    initialUser: {
      type: Object,
      default: () => ({
        account: "",
        coverPhoto: "",
        email: "",
        introduction: "",
        name: "",
        profilePhoto: "",
        followerCounts: '',
        followingCounts: '',
        isFollowed: '',
        id: -1
      }),
    },

  },
  mixins: [ emptyImageFilter ],
  data() {
    return {
      isEditModalToggled: this.iniIsModalToggled,
      user: { ...this.initialUser },
      isProcessing: false
    };
  },
  // initialUser有改變值時把值代入到子層
  watch: {
    initialUser: {
      handler: function (newValue) {
        console.log(newValue.coverPhoto, newValue.profilePhoto)
        this.user = {
          ...this.user,
          ...newValue,
        };
      },
      deep: true
    },
  },
  computed: {
      ...mapState(['currentUser', 'isAuthenticated']),
  },
  methods: {
    toggleModal() {
      this.isEditModalToggled = true;
      this.$emit("after-toggle-modal", this.isEditModalToggled);
    },
    async addFollowship (id) {
        try{
            if (this.isProcessing) return
            this.isProcessing = true
            const response = await followshipsAPI.addFollowship({id})

            if (response.status !==  200) {
                throw new Error(response.data.message)
            }
            this.user = {
                ...this.user,
                isFollowed: true
            }
            this.$emit('after-like-user', this.users)
            this.isProcessing = false
        }
        catch(error) {
            const message = error.response.data.message
            console.log(message)
            this.isProcessing = false
            return Toast.fire({
              html: innerHtml(message,'error')
            })
        }

    },
    async deleteFollowship (followingId) {
        try{
            if (this.isProcessing) return
            this.isProcessing = true
            const response = await followshipsAPI.deleteFollowship({followingId})

            if (response.status !==  200) {
                throw new Error(response.data.message)
            }
            this.user = {
                ...this.user,
                isFollowed: false
            }
            this.isProcessing = false
        }
        catch(error) {
            const message = error.response.data.message
            console.log(message)
            this.isProcessing = false
            return Toast.fire({
              html: innerHtml(message,'error')
            })
        }
    },
  }
};
</script>