<template>
    <div class="reply__container">
        <div class="tweet__avatar">
            <router-link :to="{name: 'user-detail', params: {id: reply.UserId}, query: {tab: 'tweet'}}" class="tweet__avatar--photo" >
                <img :src="reply.User.profilePhoto" alt="">
            </router-link>
        </div>
        <div class="tweet__info">
            <div class="tweet__top">

                <router-link :to="{name: 'user-detail', params: {id: reply.UserId}, query: {tab: 'tweet'}}" class="tweet__top--prim">{{reply.User.name}}</router-link>

                <router-link :to="{name: 'user-detail', params: {id: reply.UserId}, query: {tab: 'tweet'}}" class="tweet__top--sec">@{{reply.User.account}}</router-link>

                <span class="tweet__top--sec">．{{reply.createdAt | fromNow}}</span>
            </div>
            <div class="tweet__target">
                <span class="tweet__target--sec">回覆</span>
                <router-link :to="{name: 'user-detail', params: {id: reply.UserId}, query: {tab: 'tweet'}}" class="tweet__target--prim">@待補</router-link>
            </div>
            <div class="tweet__info--content">
                {{reply.comment}}
            </div>
        </div>
    </div>
</template>

<script>
import {
  showDescriptionFilter,
  fromNowFilter,
  emptyImageFilter,
} from "../utils/mixins";

export default {
    props: {
        reply: {
            type: Object
        },
    },
    mixins: [showDescriptionFilter, fromNowFilter, emptyImageFilter],
}
</script>