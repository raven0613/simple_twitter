<template>
    <router-link :to="{ name: 'tweet-detail', params: { id: tweet.id } }" class="tweet__container">

        <div class="tweet__avatar">
            <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}}" class="tweet__avatar--photo" >
                <img :src="tweet.User.profilePhoto" alt="">
            </router-link>

        </div>

        <div class="tweet__info">
            
            <div class="tweet__top">
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}}" class="tweet__top--prim">{{tweet.User.name}}</router-link>
                <router-link :to="{name: 'user-detail', params: {id: tweet.UserId}}" class="tweet__top--sec">@{{tweet.User.account}}</router-link>
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
        user: {
            type: Object,
        },
        initialTweet: {
            type: Object,
            required: true
        },
    },
    data () {
        return {
            tweet: this.initialTweet
        }
    },
    watch: {
        initialTweet (newValue) {
            this.tweet = {
                ...this.tweet,
                ...newValue
            }
        },
        user (newValue) {
            this.user = {
                ...this.user,
                ...newValue
            }
        }
    }
}
</script>