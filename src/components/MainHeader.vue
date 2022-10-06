<template>
    <header class="header main__header">

        <div class="main__header--icon">
            <img class="main__header--icon-back" v-if="tweetId" 
            src="../assets/images/last-step.svg" alt="">
            
            <img class="main__header--icon-avatar" v-if="userId" 
            src="https://ipetgroup.com/photo/117457_0_620.jpeg" alt="">
        </div>

        <div class="main__header--word">
            <p>{{content}}</p>
        </div>

    </header>
</template>

<script>
export default {
    props: {
        content: {
            type: String,
        },
        tweetId: {
            type: String
        },
        userId: {
            type: String
        }
    },
}
</script>