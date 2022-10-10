<template>
  <div class="side-bar__panel">
    <div class="side-bar__container">
      <router-link :to="{ name: 'admin-tweet' }" class="side-bar__icon">
        <img src="../assets/images/sidebar_logo.svg" alt="" />
      </router-link>

      <router-link :to="{ name: 'admin-tweet' }" class="side-bar__link">
        <img
          v-if="currentPage === `tweets`"
          src="../assets/images/sidebar_home_active.svg"
          alt=""
        />
        <img v-else src="../assets/images/sidebar_home.svg" alt="" />
        <h5 :class="{ sidebar__active: currentPage === `tweets` }">推文清單</h5>
      </router-link>

      <router-link :to="{ name: 'admin-user' }" class="side-bar__link">
        <img
          v-if="currentPage === `users`"
          src="../assets/images/sidebar_user_active.svg"
          alt=""
        />
        <img v-else src="../assets/images/sidebar_user.svg" alt="" />
        <h5 :class="{ sidebar__active: currentPage === `users` }">
          使用者列表
        </h5>
      </router-link>
    </div>

    <div @click.stop.prevent="logout" class="side-bar__link">
      <img src="../assets/images/sidebar_logout.svg" alt="" />
      <h5>登出</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBarAdmin',
  props: {
    currentPage: {
      type: String,
    },
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
    },
  },
};
</script>