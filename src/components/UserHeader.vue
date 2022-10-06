<template>
    <header class="header user__header">
        <div class="user__header--icon">
            <img src="../assets/images/last-step.svg" alt="">
        </div>
        <div class="user__header--word">
            <p>{{content}}</p>
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