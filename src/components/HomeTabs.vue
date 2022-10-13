<template>
    <div class="home__tabs">
        <section class="home__tabs--panel__container" v-if="userId">
            <div @click.stop.prevent="handleClickTab('tweet')"
            class="home__tab home__tab--user"
            :class="{active: currentTab === 'tweet'}">推文</div>
<!-- 點了tab就傳emit回去 -->
            <div @click.stop.prevent="handleClickTab('reply')"
            class="home__tab home__tab--user"
            :class="{active: currentTab === 'reply'}">回覆</div>

            <div @click.stop.prevent="handleClickTab('like')"
            class="home__tab home__tab--user"
            :class="{active: currentTab === 'like'}">喜歡的內容</div>
        </section>

        <section v-else>
            <router-link 
            @click.native.stop.prevent="handleClickTab('follower')"
            :to="{name: 'user-follower'}" 
            class="home__tab home__tab--follow"
            :class="{active: currentTab === 'follower'}">追隨者</router-link>

            <router-link 
            @click.native.stop.prevent="handleClickTab('following')" 
            :to="{name: 'user-follower'}" 
            class="home__tab home__tab--follow"
            :class="{active: currentTab === 'following'}">正在追隨</router-link>
        </section>

    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: Number
        },
        clickedTab: {
            type: String
        }
    },
    computed: {
        currentTab () {
            return this.clickedTab
        }
    },
    methods: {
        handleClickTab (clickedTab) {
            this.$emit('after-click-tab', clickedTab)
        }
    }
}
</script>