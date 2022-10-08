<template>
    <header class="header user__header">
        <div @click="$router.back()" class="user__header--icon">
            <img src="../assets/images/last-step.svg" alt="">
        </div>
        <div class="user__header--word">
            <h5>{{content}}</h5>
            <p>{{counts}} 推文</p>
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
        }
    },
}
</script>