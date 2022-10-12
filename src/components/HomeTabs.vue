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