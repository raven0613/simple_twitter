<template>
    <div class="recommend__panel">
        <h4>推薦跟隨</h4>
        <div class="recommend__container">

            <router-link to="/users" v-for="user in users" :key="user.id" class="recommend__user">
                <div class="recommend__user--avatar">
                    <img :src="user.profilePhoto" alt="">
                </div>
                <div class="recommend__user--info">
                    <p>{{user.name}}</p>
                    <span>@{{user.account}}</span>
                </div>

                <button @click.stop.prevent="addFollowship(user.id)" v-if="!user.isFollowed" class="prim-button prim-button__unfollowed">跟隨</button>
                <button @click.stop.prevent="deleteFollowship(user.id)" v-else class="prim-button prim-button__followed">正在跟隨</button>
            </router-link>

        </div>
    </div>
</template>

<script>
// import followshipsAPI from '../apis/followships.js'
// import { Toast } from '../utils/helpers.js'

const dummyData = 
    [
        {
            "id": 2,
            "account": "user1",
            "name": "user1",
            "profilePhoto": "https://fakeimg.pl/140/",
            "introduction": null,
            "FollowingsCount": 2,
            "isFollowed" : true
        },
        {
            "id": 4,
            "account": "user3",
            "name": "user3",
            "profilePhoto": "https://fakeimg.pl/140/",
            "introduction": null,
            "FollowingsCount": 1,
            "isFollowed" : false
        }
    ]


export default {
    data () {
        return {
            users: []
        }
    },
    created () {
        this.fecthTopUsers()
    },
    methods: {
        async fecthTopUsers () {
            this.users = dummyData
            // try {
            //     const response = await followshipsAPI.getTopUsers()
            //     return console.log(response)
            // }
            // catch (error) {
            //     console.log(error)
            //     Toast.fire ({
            //         icon: 'error',
            //         title: '無法取得推薦使用者，請稍後再試'
            //     })
            // }
        },
        addFollowship (userId) {
            this.users = this.users.map(user => {
                if(user.id === userId) {
                    return {
                        ...user,
                        'isFollowed' : true
                    }
                }
                return user
            })
        },
        deleteFollowship (userId) {
            this.users = this.users.map(user => {
                if(user.id === userId) {
                    return {
                        ...user,
                        'isFollowed' : false
                    }
                }
                return user
            })
        }
    }
}
</script>