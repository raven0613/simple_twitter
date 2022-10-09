<template>
    <div class="reply__container">
        <div class="tweet__avatar">
            <img class="tweet__avatar--photo" :src="reply.User.profilePhoto" alt="">
        </div>
        <div class="tweet__info">
            <div class="tweet__top">
                <span class="tweet__top--prim">{{reply.User.name}}</span>
                <span class="tweet__top--sec">@{{reply.User.account}}</span>
                <span class="tweet__top--sec">．3小時</span>
            </div>
            <div class="tweet__target">
                <span class="tweet__target--sec">回覆</span>
                <span class="tweet__target--prim">@{{tweetOwner}}</span>
            </div>
            <div class="tweet__info--content">
                {{reply.comment}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        reply: {
            type: Object
        },
        tweetOwner: {
            type: String,
            required: true
        }
    },
}
</script>