(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4fdb8e4c"],{"3e69":function(t,e,s){"use strict";var a=function(){var t=this,e=t._self._c;return e("header",{staticClass:"header user__header"},[e("div",{staticClass:"user__header--icon",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.$router.back()}}},[e("img",{attrs:{src:s("64a2"),alt:""}})]),t.counts?e("div",{staticClass:"user__header--word"},[e("h5",[t._v(t._s(t.content))]),e("p",[t._v(t._s(t.counts)+" 推文")])]):t._e(),isNaN(t.counts)?e("div",{staticClass:"user__header--title"},[e("h4",[t._v(t._s(t.content))])]):t._e()])},i=[],l={props:{content:{type:String},counts:{type:Number},isTweetModal:{type:Boolean,default:!1},isReplyModal:{type:Boolean,default:!1}}},o=l,r=s("2877"),n=Object(r["a"])(o,a,i,!1,null,null,null);e["a"]=n.exports},"9bc3":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"twitter__project",class:{modal__toggled:t.isModalToggled||t.isReplyModalToggled}},[e("div",{staticClass:"container"},[e("section",{staticClass:"left__container"},[e("SideBar",{attrs:{"current-page":"main","ini-is-modal-toggled":t.isModalToggled},on:{"after-toggle-modal":t.handleToggleModal}})],1),e("main",{staticClass:"main__container"},[e("transition",{attrs:{name:"modal"}},[t.isReplyModalToggled?e("MainReplyModal",{attrs:{"initial-tweet":t.tweet,"is-in-detail-page":!0},on:{"after-submit-close":t.handleCloseModal,"after-submit":t.handleAddReply}}):t._e()],1),e("transition",{attrs:{name:"modal"}},[t.isModalToggled?e("MainTweetModal",{on:{"after-submit-close":t.handleCloseModal}}):t._e()],1),e("UserHeader",{attrs:{content:"推文","is-tweet-modal":t.isModalToggled,"is-reply-modal":t.isReplyModalToggled}}),t.isLoading?e("Spinner"):e("MainTweet",{attrs:{"initial-data":t.tweet},on:{"after-toggle-modal":t.handleToggleReplyModal}}),e("div",{staticClass:"tweet-detail__input",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.handleToggleReplyModal(!0)}}},[e("MainReplyInput")],1),t.isLoading?t._e():e("div",{staticClass:"tweets__container"},t._l(t.replies,(function(s){return e("ReplyCard",{key:s.id,attrs:{reply:s,"tweet-owner":t.tweet.User.account}})})),1)],1),e("section",{staticClass:"right__container"},[e("RecommendUsers")],1),e("transition",{attrs:{duration:{enter:350,leave:150}}},[t.isModalToggled||t.isReplyModalToggled?e("div",{staticClass:"modal__mask",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.handleCloseModal(!1)}}}):t._e()])],1),e("Footer",{attrs:{"ini-is-modal-toggled":t.isModalToggled},on:{"after-toggle-modal":t.handleToggleModal}})],1)},i=[],l=(s("14d9"),s("d88d")),o=s("7c08"),r=s("88fd"),n=s("3e69"),d=function(){var t=this,e=t._self._c;return e("div",{staticClass:"tweet-detail"},[t.isLoading?t._e():e("div",{staticClass:"tweet-detail__user"},[e("div",{staticClass:"tweet__avatar"},[e("router-link",{staticClass:"tweet__avatar--photo",attrs:{to:{name:"user-detail",params:{id:t.tweet.UserId},query:{tab:"tweet"}}}},[e("img",{attrs:{src:t._f("emptyImage")(t.tweet.User.profilePhoto),alt:""}})])],1),e("div",{staticClass:"tweet-detail__user--name"},[e("router-link",{attrs:{to:{name:"user-detail",params:{id:t.tweet.UserId},query:{tab:"tweet"}}}},[t._v(t._s(t.tweet.User.name))]),e("router-link",{attrs:{to:{name:"user-detail",params:{id:t.tweet.UserId},query:{tab:"tweet"}}}},[t._v("@"+t._s(t.tweet.User.account))])],1)]),e("div",{staticClass:"tweet-detail__content"},[t._v(" "+t._s(t.tweet.description)+" ")]),e("div",{staticClass:"tweet-detail__time"},[t._v(" "+t._s(t._f("detailTime")(t.tweet.createdAt))+" ")]),e("div",{staticClass:"tweet-detail__info"},[e("div",{staticClass:"tweet-detail__info--reply"},[e("span",{staticClass:"montserrat-font"},[t._v(t._s(t.tweet.replyCounts))]),e("span",[t._v(" 回覆")])]),e("div",{staticClass:"tweet-detail__info--like"},[e("span",{staticClass:"montserrat-font"},[t._v(t._s(t.tweet.likeCounts))]),e("span",[t._v(" 喜歡次數")])])]),e("div",{staticClass:"tweet-detail__icons"},[e("div",{on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.toggleModal.apply(null,arguments)}}},[e("img",{attrs:{src:s("2a52"),alt:""}})]),t.tweet.isLiked?e("div",{on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.deleteLike(t.tweet.id)}}},[e("img",{attrs:{src:s("929e"),alt:""}})]):e("div",{on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.addLike(t.tweet.id)}}},[e("img",{attrs:{src:s("776b"),alt:""}})])])])},c=[],p=s("6783"),g=s("2fa3"),u=s("2708"),_={props:{initialData:{type:Object,required:!0},iniIsModalToggled:{type:Boolean}},mixins:[u["d"],u["c"],u["a"],u["b"]],data(){return{tweet:this.initialData,isModalToggled:this.iniIsModalToggled,isLoading:!0,isProcessing:!1}},watch:{initialData:{handler:function(t){this.tweet={...t},this.isLoading=!1},immediate:!0}},methods:{toggleModal(){this.isModalToggled=!0,this.$emit("after-toggle-modal",this.isModalToggled)},async addLike(t){try{if(this.isProcessing)return;this.isProcessing=!0;const e=await p["a"].addLike({tweet_id:t});console.log(e),this.tweet={...this.tweet,isLiked:!0,likeCounts:this.tweet.likeCounts+1},this.isProcessing=!1}catch(e){console.log(e.message),this.isProcessing=!1,g["a"].fire({html:Object(g["c"])("目前無法操作","error")})}},async deleteLike(t){try{if(this.isProcessing)return;this.isProcessing=!0;const e=await p["a"].deleteLike({tweet_id:t});console.log(e),this.tweet={...this.tweet,isLiked:!1,likeCounts:this.tweet.likeCounts-1},this.isProcessing=!1}catch(e){console.log(e.message),this.isProcessing=!1,g["a"].fire({html:Object(g["c"])("目前無法操作","error")})}}}},h=_,w=s("2877"),m=Object(w["a"])(h,d,c,!1,null,null,null),f=m.exports,y=s("fd2d"),v=s("3e96"),C=s("6b2a"),M=function(){var t=this,e=t._self._c;return e("form",{staticClass:"main__reply"},[e("div",{staticClass:"main__reply--avatar"},[t.isLoading?t._e():e("img",{attrs:{src:t._f("emptyImage")(t.userprofilePhoto),alt:""}})]),e("span",{staticClass:"main__reply--content"},[t._v("推你的回覆")]),t._m(0)])},T=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"main__reply--button__container"},[e("div",{staticClass:"main__reply--button formbutton",attrs:{type:"submit"}},[t._v("回覆")])])}],b=s("2f62"),k=s("4cce"),R={name:"MainReplyInput",computed:{...Object(b["b"])(["currentUser","isAuthenticated"])},mixins:[u["d"],u["c"],u["b"]],props:{iniIsModalToggled:{type:Boolean}},data(){return{userprofilePhoto:"",isLoading:!0,isProcessing:!1,isModalToggled:this.iniIsModalToggled}},created(){this.fetchUser(this.currentUser.id)},methods:{toggleModal(){this.isModalToggled=!0,this.$emit("after-toggle-modal",this.isModalToggled)},async fetchUser(t){try{this.isLoading=!0;const{data:e}=await k["a"].getUser({userId:t});this.userprofilePhoto=e.profilePhoto,this.isLoading=!1}catch(e){return console.log(e.message),this.isLoading=!1,g["a"].fire({html:Object(g["c"])("目前無法回復貼文，請稍後再試","error")})}}}},L=R,U=Object(w["a"])(L,M,T,!1,null,null,null),P=U.exports,I=s("2375"),j={components:{ReplyCard:l["a"],SideBar:o["a"],RecommendUsers:r["a"],UserHeader:n["a"],MainTweet:f,Footer:y["a"],MainReplyModal:v["a"],MainTweetModal:C["a"],MainReplyInput:P,Spinner:I["a"]},data(){return{tweet:{},replies:[],isModalToggled:!1,isReplyModalToggled:!1,isTweetLoading:!0,isReplyLoading:!0}},created(){const{id:t}=this.$route.params;this.fetchTweet(t),this.fetchReplies(t)},beforeRouteUpdate(t,e,s){this.isTweetLoading=!0,this.isReplyLoading=!0;const{id:a}=t.params;this.fetchTweet(a),this.fetchReplies(a),s()},computed:{...Object(b["b"])(["currentUser","isAuthenticated"]),isLoading(){return!(!this.isTweetLoading&&!this.isReplyLoading)}},methods:{async fetchTweet(t){try{this.isTweetLoading=!0;const e=await p["a"].getTweet({id:t});this.tweet=e.data,this.isTweetLoading=!1}catch(e){return console.log(e),this.isTweetLoading=!1,g["a"].fire({html:Object(g["c"])("目前無法取得推文，請稍後再試","error")})}},async fetchReplies(t){try{this.isReplyLoading=!0;const e=await p["a"].getReplies({id:t});this.replies=e.data,this.isReplyLoading=!1}catch(e){return console.log(e),this.isReplyLoading=!1,g["a"].fire({html:Object(g["c"])("目前無法取得回覆，請稍後再試","error")})}},handleToggleModal(t){this.isModalToggled=t,history.pushState({name:"new-tweet"},null,"/#/tweet/new")},handleCloseModal(t){this.isModalToggled=!1,this.isReplyModalToggled=!1,t||this.$router.back()},handleToggleReplyModal(t){this.isReplyModalToggled=t,history.pushState({name:"new-reply"},null,"/#/reply/new")},handleAddReply(t){this.$router.back(),this.replies.push(t),this.tweet={...this.tweet,replyCounts:this.tweet.replyCounts+1},this.fetchReplies(this.tweet.id)}}},O=j,D=Object(w["a"])(O,a,i,!1,null,null,null);e["default"]=D.exports},d88d:function(t,e,s){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"reply__container"},[e("div",{staticClass:"tweet__avatar"},[e("router-link",{staticClass:"tweet__avatar--photo",attrs:{to:{name:"user-detail",params:{id:t.reply.UserId},query:{tab:"tweet"}}}},[e("img",{attrs:{src:t._f("emptyImage")(t.reply.User.profilePhoto),alt:""}})])],1),e("div",{staticClass:"tweet__info"},[e("div",{staticClass:"tweet__top"},[e("router-link",{staticClass:"tweet__top--prim",attrs:{to:{name:"user-detail",params:{id:t.reply.UserId},query:{tab:"tweet"}}}},[t._v(t._s(t.reply.User.name))]),e("router-link",{staticClass:"tweet__top--sec",attrs:{to:{name:"user-detail",params:{id:t.reply.UserId},query:{tab:"tweet"}}}},[t._v("@"+t._s(t.reply.User.account))]),e("span",{staticClass:"tweet__top--sec"},[t._v("．"+t._s(t._f("fromNow")(t.reply.createdAt)))])],1),e("div",{staticClass:"tweet__target"},[e("span",{staticClass:"tweet__target--sec"},[t._v("回覆")]),e("router-link",{staticClass:"tweet__target--prim",attrs:{to:{name:"user-detail",params:{id:t.reply.Tweet.User.id},query:{tab:"tweet"}}}},[t._v("@"+t._s(t.reply.Tweet.User.account))])],1),e("div",{staticClass:"tweet__info--content"},[t._v(" "+t._s(t.reply.comment)+" ")])])])},i=[],l=s("2708"),o={props:{reply:{type:Object}},mixins:[l["d"],l["c"],l["b"]]},r=o,n=s("2877"),d=Object(n["a"])(r,a,i,!1,null,null,null);e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-4fdb8e4c.7f6ff90b.js.map