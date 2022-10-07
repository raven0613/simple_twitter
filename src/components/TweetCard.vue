<template>
    <router-link to="/tweets" class="tweet__container">

        <div class="tweet__avatar">
            <img class="tweet__avatar--photo" :src="tweet.User.profilePhoto" alt="">
        </div>

        <div class="tweet__info">
            
            <div class="tweet__top">
                <span class="tweet__top--prim">{{tweet.User.name}}</span>
                <span class="tweet__top--sec">@{{tweet.User.account}}</span>
                <span class="tweet__top--sec">．{{tweet.createdAt}}</span>
            </div>
            <div class="tweet__info--content">
                {{tweet.description}}
            </div>
            <div class="tweet__bottom">
                <router-link to="/123" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_reply.svg" alt="">
                    <span class="montserrat-font">{{tweet.repliesCount}}</span>
                </router-link>
                
                <router-link to="/456" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_like.svg" alt="">
                    <span class="montserrat-font">{{tweet.likedCount}}</span>
                </router-link>
                
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        initialData: {
            type: Object,
            required: true
        }
    },
    data () {
        return {
            tweet: this.initialData
        }
    },
    watch: {
        initialData (newValue, oldValue) {
            console.log(oldValue)
            console.log(oldValue)
        }
    }
}
</script>