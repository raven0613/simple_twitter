<!-- 在手機版只有modal，沒有輸入框框 -->
<template>
  <form @click.stop.prevent="toggleModal" class="tweet__input">
    <div class="tweet__input--avatar">
      <img src="../assets/images/avatar.svg" alt="" />
    </div>
    <h5 class="tweet__input--content">有什麼新鮮事？
    </h5>
    <div class="tweet__input--button__container">
      <button type="submit" class="tweet__input--button">推文</button>
    </div>
  </form>
</template>

<script>
export default {
    props: {
        iniIsModalToggled: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            isModalToggled: this.iniIsModalToggled
        }
    },
    methods: {
        toggleModal () {
            console.log('123')
            this.isModalToggled = true
            this.$emit("after-toggle-modal", this.isModalToggled)
        }
    }
}
</script>