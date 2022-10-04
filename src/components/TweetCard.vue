<template>
    <router-link to="#" class="tweet__container">

        <div class="tweet__avatar">
            <img class="tweet__avatar--photo" src="https://ipetgroup.com/photo/117457_0_620.jpeg" alt="">
        </div>

        <div class="tweet__info">
            
            <div class="tweet__top">
                <span class="tweet__top--prim">Jane Cathy</span>
                <span class="tweet__top--sec">@apple</span>
                <span class="tweet__top--sec">- 3小時</span>
            </div>
            <div class="tweet__info--content">
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
            </div>
            <div class="tweet__bottom">
                <router-link to="/123" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_reply.svg" alt="">
                    <span>13</span>
                </router-link>
                
                <router-link to="/456" class="tweet__bottom--icon">
                    <img src="../assets/images/tweet_like.svg" alt="">
                    <span>76</span>
                </router-link>
                
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    data() {
        
    },
    methods: {
        onFocusInput () {
            console.log('YO')
        }
    }
}
</script>