<template>
    <div class="home__tabs">
        <section class="home__tabs--panel__container" v-if="userId">
            <router-link 
            :to="{name: 'user-detail', query: { tab: 'tweet' }}" 
            class="home__tab home__tab--user"
            :class="{active: currentTab === 'tweet'}">推文</router-link>

            <router-link 
            :to="{name: 'user-detail', query: { tab: 'reply' }}" 
            class="home__tab home__tab--user"
            :class="{active: currentTab === 'reply'}">回覆</router-link>

            <router-link 
            :to="{name: 'user-detail', query: { tab: 'like' }}" 
            class="home__tab home__tab--user"
            :class="{active: currentTab === 'like'}">喜歡的內容</router-link>
        </section>

        <section v-else>
            <router-link :to="{name: 'user-follower'}" class="home__tab home__tab--follow">追隨者</router-link>

            <router-link :to="{name: 'user-following'}" class="home__tab home__tab--follow">正在追隨</router-link>
        </section>

    </div>
</template>

<script>
export default {
    props: {
        userId: {
            type: Number
        },
        currentTab: {
            type: String
        }
    },
    created () {
        //失敗的話試試看寫在父層
        // const { tab } = this.$route.query
        // this.currentTab = tab
    },
    data() {
        return {
            // currentTab: 'tweet',
        }
    },
    methods: {
        // handleClickTab () {
            
        // }
    }
}
</script>