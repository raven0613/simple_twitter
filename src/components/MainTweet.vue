<template>
    <div class="tweet-detail">

        <div class="tweet-detail__user">
            <div class="tweet__avatar">
                <img class="tweet__avatar--photo" :src="tweet.User.profilePhoto" alt="">
            </div>
            <div class="tweet-detail__user--name">
                <p>{{tweet.User.name}}</p>
                <p>@{{tweet.User.account}}</p>
            </div>
        </div>

        <div class="tweet-detail__content">
            {{tweet.description}}
        </div>
        
        <div class="tweet-detail__time">
            {{tweet.createdAt}}
        </div>
        <div class="tweet-detail__info">
            <div class="tweet-detail__info--reply">
                <span class="montserrat-font">{{tweet.likedCount}}</span> 
                <span> 回覆</span>
            </div>
            <div class="tweet-detail__info--like">
                <span class="montserrat-font">{{tweet.repliesCount}}</span> 
                <span> 喜歡次數</span>
            </div>
        </div>
        <div class="tweet-detail__icons">
            <div @click.stop.prevent="toggleModal">
                <img src="../assets/images/tweet_reply.svg" alt="">
            </div>
            <div to="#">
                <img src="../assets/images/tweet_like.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        initialData: {
            type: Object,
            required: true
        },
        iniIsModalToggled: {
            type: Boolean,
        }
    },
    filters: {
        handleEmpty(value){
            if (!value.length) {
                return '-'
            }
        }
    },
    data() {
        return {
            tweet: this.initialData,
            isModalToggled: this.iniIsModalToggled,
        }
    },
    watch: {
        initialData: {
            handler: function (newValue) {
                this.tweet = {
                    ...newValue
                }
            },
            deep: true
        }
    },
    methods: {
        toggleModal () {
            this.isModalToggled = true
            this.$emit("after-toggle-modal", this.isModalToggled)
        }
    }
}
</script>