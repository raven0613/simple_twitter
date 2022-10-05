<template>
    <router-link to="#" class="tweet__container">

        <div class="tweet__avatar">
            <img class="tweet__avatar--photo" :src="tweet.image" alt="">
        </div>

        <div class="tweet__info">
            
            <div class="tweet__top">
                <span class="tweet__top--prim">{{tweet.name}}</span>
                <span class="tweet__top--sec">@{{tweet.account}}</span>
                <span class="tweet__top--sec">．{{tweet.createdAt}}</span>
            </div>
            <div class="tweet__info--content">
                {{tweet.description}}
            </div>
            <div class="tweet__bottom">
                <router-link to="/123" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_reply.svg" alt="">
                    <span>{{tweet.replyCounts}}</span>
                </router-link>
                
                <router-link to="/456" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_like.svg" alt="">
                    <span>{{tweet.likeCounts}}</span>
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
    methods: {

    }
}
</script>