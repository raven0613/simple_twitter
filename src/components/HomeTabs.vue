<template>
    <div class="home__tabs">
        <section class="home__tabs--panel__container" v-if="userId">
            <div class="home__tab home__tab--active home__tab--user">推文</div>
            <div class="home__tab home__tab--user">回覆</div>
            <div class="home__tab home__tab--user">喜歡的內容</div>
        </section>
        <section v-else>
            <div class="home__tab home__tab--active home__tab--follow">追隨者</div>
            <div class="home__tab home__tab--follow">正在追隨</div>
        </section>

    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: String
        }
    },
    data() {
        return {
            
        }
    },
}
</script>