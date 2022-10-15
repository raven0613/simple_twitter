<template>
    <header class="header user__header">
        <div @click.stop.prevent="$router.back()" class="user__header--icon">
            <img src="../assets/images/last-step.svg" alt="">
        </div>

        <div v-if="counts"
        class="user__header--word">
            <h5>{{content}}</h5>
            <p>{{counts}} 推文</p>
        </div>

        <div v-if="isNaN(counts)"
        class="user__header--title">
            <h4>{{ content }}</h4>
        </div>

    </header>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
        },
        counts: {
            type: Number,
        },
        isTweetModal: {
            type: Boolean,
            default: false 
        },
        isReplyModal: {
            type: Boolean,
            default: false 
        }
    },
}
</script>