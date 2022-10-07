<template>
    <div class="tweet-detail">

        <div class="tweet-detail__user">
            <div class="tweet__avatar">
                <img class="tweet__avatar--photo" src="https://ipetgroup.com/photo/117457_0_620.jpeg" alt="">
            </div>
            <div class="tweet-detail__user--name">
                <p>Apple</p>
                <p>@apple</p>
            </div>
        </div>

        <div class="tweet-detail__content">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt.
        </div>
        
        <div class="tweet-detail__time">
            上午 10:05・2021年11月10日
        </div>
        <div class="tweet-detail__info">
            <div class="tweet-detail__info--reply">
                <span class="montserrat-font">34</span> 
                <span> 回覆</span>
            </div>
            <div class="tweet-detail__info--like">
                <span class="montserrat-font">808</span> 
                <span> 喜歡次數</span>
            </div>
        </div>
        <div class="tweet-detail__icons">
            <router-link to="#">
                <img src="../assets/images/tweet_reply.svg" alt="">
            </router-link>
            <router-link to="#">
                <img src="../assets/images/tweet_like.svg" alt="">
            </router-link>
        </div>
    </div>
</template>