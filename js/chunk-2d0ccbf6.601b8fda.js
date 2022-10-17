(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ccbf6"],{"4ef5":function(r,t,a){"use strict";a.r(t);var e=function(){var r=this,t=r._self._c;return t("div",{staticClass:"twitter__project",class:{modal__toggled:r.isModalToggled}},[t("div",{staticClass:"container setting-page"},[t("section",{staticClass:"left__container"},[t("SideBar",{attrs:{"current-page":"setting","ini-is-modal-toggled":r.isModalToggled},on:{"after-toggle-modal":r.handleToggleModal}})],1),t("main",{staticClass:"main__container"},[t("MainHeader",{attrs:{content:"帳戶設定"}}),t("div",{staticClass:"tweets__container"},[t("SettingPanel",{attrs:{initialUserData:r.userData,initialFormErrorAccountExisted:r.formErrorAccountExisted,initialFormErrorEmailExisted:r.formErrorEmailExisted,"is-processing":r.isProcessing},on:{"after-submit":r.handleAfterSubmit}})],1),t("transition",{attrs:{name:"modal"}},[r.isModalToggled?t("MainTweetModal",{on:{"after-submit-close":r.handleCloseModal}}):r._e()],1)],1),t("section",{staticClass:"right__container"}),t("transition",{attrs:{duration:{enter:350,leave:150}}},[r.isModalToggled?t("div",{staticClass:"modal__mask",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),r.handleCloseModal(!1)}}}):r._e()])],1),t("Footer",{attrs:{"current-page":"setting","ini-is-modal-toggled":r.isModalToggled},on:{"after-toggle-modal":r.handleToggleModal}})],1)},s=[],o=(a("d9e2"),function(){var r=this,t=r._self._c;return t("div",{staticClass:"setting-form"},[t("form",{staticClass:"form form__container",on:{submit:function(t){return t.preventDefault(),t.stopPropagation(),r.handleSubmit.apply(null,arguments)},keyup:function(t){return!t.type.indexOf("key")&&r._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),t.stopPropagation(),r.handleSubmit.apply(null,arguments))}}},[t("div",{class:["form__input",{formError:r.formErrorAccount||r.formErrorAccountExisted}]},[t("div",{staticClass:"form__input__container"},[t("label",{attrs:{for:"account"}},[r._v("帳號")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.userData.account,expression:"userData.account"}],attrs:{id:"account",name:"account",type:"account",placeholder:"請輸入帳號",autocomplete:"username",autofocus:""},domProps:{value:r.userData.account},on:{input:function(t){t.target.composing||r.$set(r.userData,"account",t.target.value)}}})]),t("div",{staticClass:"form__input__hint"},[t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorAccount,expression:"formErrorAccount"}],staticClass:"form__input__hint-error"},[r._v("帳號欄位為必填")]),t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorAccountExisted,expression:"formErrorAccountExisted"}],staticClass:"form__input__hint-error"},[r._v("此帳號已重複註冊")])])]),t("div",{class:["form__input",{formError:r.formErrorName||r.formErrorNameLimited}]},[t("div",{staticClass:"form__input__container"},[t("label",{attrs:{for:"name"}},[r._v("名稱")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.userData.name,expression:"userData.name"}],attrs:{id:"name",name:"name",type:"name",placeholder:"請輸入使用者名稱",autocomplete:"name",autofocus:""},domProps:{value:r.userData.name},on:{input:function(t){t.target.composing||r.$set(r.userData,"name",t.target.value)}}})]),t("div",{class:["form__input__hint",{form__input__count:!r.formErrorName&&!r.formErrorNameLimited&&r.lengthOfName}]},[t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorName,expression:"formErrorName"}],staticClass:"form__input__hint-error"},[r._v("名稱欄位為必填")]),t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorNameLimited,expression:"formErrorNameLimited"}],staticClass:"form__input__hint-error"},[r._v("字數超過上限！")]),t("span",{directives:[{name:"show",rawName:"v-show",value:r.lengthOfName,expression:"lengthOfName"}],staticClass:"form__input__hint-length montserrat-font"},[r._v(r._s(r.lengthOfName)+"/50")])])]),t("div",{class:["form__input",{formError:r.formErrorEmail||r.formErrorEmailExisted}]},[t("div",{staticClass:"form__input__container"},[t("label",{attrs:{for:"email"}},[r._v("Email")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.userData.email,expression:"userData.email"}],attrs:{id:"email",name:"email",type:"email",placeholder:"請輸入Email",autocomplete:"email",autofocus:""},domProps:{value:r.userData.email},on:{input:function(t){t.target.composing||r.$set(r.userData,"email",t.target.value)}}})]),t("div",{staticClass:"form__input__hint"},[t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorEmail,expression:"formErrorEmail"}],staticClass:"form__input__hint-error"},[r._v("Email欄位為必填")]),t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorEmailExisted,expression:"formErrorEmailExisted"}],staticClass:"form__input__hint-error"},[r._v("此Email已重複註冊")])])]),t("div",{class:["form__input",{formError:r.formErrorPassword||r.formErrorPasswordUnmatched}]},[t("div",{staticClass:"form__input__container"},[t("label",{attrs:{for:"password"}},[r._v("密碼")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.userData.password,expression:"userData.password"}],attrs:{id:"password",name:"password",type:"password",placeholder:"請輸入密碼",autocomplete:"current-password",autofocus:""},domProps:{value:r.userData.password},on:{input:function(t){t.target.composing||r.$set(r.userData,"password",t.target.value)}}})]),t("div",{staticClass:"form__input__hint"},[t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorPassword,expression:"formErrorPassword"}],staticClass:"form__input__hint-error"},[r._v("密碼欄位為必填")]),t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorPasswordUnmatched,expression:"formErrorPasswordUnmatched"}],staticClass:"form__input__hint-error"},[r._v("密碼與確認密碼不符")])])]),t("div",{class:["form__input",{formError:r.formErrorCheckPassword||r.formErrorPasswordUnmatched}]},[t("div",{staticClass:"form__input__container"},[t("label",{attrs:{for:"passwordCheck"}},[r._v("密碼確認")]),t("input",{directives:[{name:"model",rawName:"v-model",value:r.userData.checkPassword,expression:"userData.checkPassword"}],attrs:{id:"passwordCheck",name:"checkPassword",type:"password",placeholder:"請再次輸入密碼",autocomplete:"current-password",autofocus:""},domProps:{value:r.userData.checkPassword},on:{input:function(t){t.target.composing||r.$set(r.userData,"checkPassword",t.target.value)}}})]),t("div",{staticClass:"form__input__hint"},[t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorCheckPassword,expression:"formErrorCheckPassword"}],staticClass:"form__input__hint-error"},[r._v("密碼確認欄位為必填")]),t("span",{directives:[{name:"show",rawName:"v-show",value:r.formErrorPasswordUnmatched,expression:"formErrorPasswordUnmatched"}],staticClass:"form__input__hint-error"},[r._v("密碼與確認密碼不符")])])]),t("div",{staticClass:"form__button__container"},[t("button",{staticClass:"form__button",class:{form__button_processing:r.isProcessing},attrs:{type:"submit"}},[r._v(" 儲存 ")]),t("div",{staticClass:"form__links form__links__logout"},[t("div",{staticClass:"form__links--link",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),r.logout.apply(null,arguments)}}},[r._v("登出")])])])])])}),i=[],n=(a("14d9"),a("2fa3")),m={name:"SettingPanel",props:{initialUserData:{type:Object,default:()=>({name:"",email:"",account:""})},initialFormErrorAccountExisted:{type:Boolean,default:!1},initialFormErrorEmailExisted:{type:Boolean,default:!1},isProcessing:{type:Boolean,default:!1}},data(){return{userData:{name:"",email:"",account:"",password:"",checkPassword:""},formErrorName:!1,formErrorEmail:!1,formErrorAccount:!1,formErrorPassword:!1,formErrorCheckPassword:!1,formErrorPasswordUnmatched:!1,formErrorAccountExisted:!1,formErrorEmailExisted:!1,formErrorNameLimited:!1,lengthOfName:""}},created(){console.log(this.initialUserData),this.userData={...this.userData,...this.initialUserData},console.log(this.userData)},watch:{userData:{handler(r){if(console.log(r.name.length),r.name=r.name.trim(),r.account=r.account.trim(),r.email=r.email.trim(),r.password=r.password.trim(),r.checkPassword=r.checkPassword.trim(),this.lengthOfName=r.name.length,r.name.length>0&&(this.formErrorName=!1),r.name.length>=50)return n["a"].fire({html:Object(n["c"])("字數超過上限","error")}),r.name=r.name.slice(0,50),this.formErrorNameLimited=!0,void console.log(this.formErrorNameLimited);this.formErrorNameLimited=!1,r.email.length>0&&(this.formErrorEmail=!1,this.formErrorEmailExisted=!1),r.account.length>0&&(this.formErrorAccount=!1,this.formErrorAccountExisted=!1),r.password.length>0&&(this.formErrorPassword=!1,this.formErrorPasswordUnmatched=!1),r.checkPassword.length>0&&(this.formErrorCheckPassword=!1,this.formErrorPasswordUnmatched=!1)},deep:!0},initialUserData(r){this.userData={...this.userData,...r}},initialFormErrorAccountExisted(r){this.formErrorAccountExisted=r},initialFormErrorEmailExisted(r){this.formErrorEmailExisted=r}},methods:{async handleSubmit(){if(this.formErrorName=!1,this.formErrorEmail=!1,this.formErrorAccount=!1,this.formErrorPassword=!1,this.formErrorCheckPassword=!1,this.formErrorPasswordUnmatched=!1,this.formErrorAccountExisted=!1,this.formErrorNameExisted=!1,this.formErrorNameLimited=!1,this.formErrorPasswordUnmatched=!1,this.userData.account||(this.formErrorAccount=!0),this.userData.name||(this.formErrorName=!0),this.userData.email||(this.formErrorEmail=!0),this.userData.password||(this.formErrorPassword=!0),this.userData.checkPassword||(this.formErrorCheckPassword=!0),this.userData.password!==this.userData.checkPassword)return this.formErrorPasswordUnmatched=!0,void n["a"].fire({html:Object(n["c"])("密碼與確認密碼不符","error")});if(!this.allFalse)try{const r={account:this.userData.account,name:this.userData.name,email:this.userData.email,password:this.userData.password,checkPassword:this.userData.checkPassword};console.log(r),this.$emit("after-submit",r),this.formErrorName=!1,this.formErrorEmail=!1,this.formErrorAccount=!1,this.formErrorPassword=!1,this.formErrorCheckPassword=!1,this.formErrorPasswordUnmatched=!1,this.formErrorAccountExisted=!1,this.formErrorNameExisted=!1,this.formErrorNameLimited=!1,this.userData.password="",this.userData.checkPassword=""}catch(r){const t=r.response.data.message.toLowerCase();t.includes("account")?this.formErrorAccountExisted=!0:t.includes("email")&&(this.formErrorEmailExisted=!0)}},logout(){this.$store.commit("revokeAuthentication"),this.$router.push("/login")}},computed:{allFalse(){return!!(this.formErrorName||this.formErrorEmail||this.formErrorAccount||this.formErrorPassword||this.formErrorCheckPassword||this.formErrorPasswordUnmatched||this.formErrorAccountExisted||this.formErrorNameExisted||this.formErrorNameLimited)}}},c=m,l=a("2877"),d=Object(l["a"])(c,o,i,!1,null,null,null),u=d.exports,h=a("7c08"),f=a("dc2a"),E=a("6b2a"),p=a("fd2d"),_=a("4cce"),w=a("2f62"),v={name:"Setting",components:{SettingPanel:u,SideBar:h["a"],MainHeader:f["a"],Footer:p["a"],MainTweetModal:E["a"]},data(){return{userData:{name:"",email:"",account:""},isModalToggled:!1,formErrorAccountExisted:!1,formErrorEmailExisted:!1,isProcessing:!1}},created(){this.fetchUser(this.currentUser.id)},computed:{...Object(w["b"])(["currentUser","isAuthenticated"]),isLoading(){return!(!this.isUserLoading&&!this.isTweetLoading)}},methods:{async fetchUser(r){try{const{data:t}=await _["a"].getUser({userId:r}),{name:a,email:e,account:s}=t;this.userData={...this.userData,name:a,email:e,account:s}}catch(t){n["a"].fire({html:Object(n["c"])("無法取得使用者資料，請稍後再試","error")})}},async handleAfterSubmit(r){try{if(this.isProcessing)return;this.isProcessing=!0,console.log("hi",r);const{data:t}=await _["a"].updateSetting({userId:this.currentUser.id,formData:r});if("error"===t.status)throw new Error(t.message);n["a"].fire({html:Object(n["c"])("成功更新使用者資料","succeed")}),this.isProcessing=!1}catch(t){const r=t.response.data.message.toLowerCase();this.isProcessing=!1,console.log(r),r.includes("此帳號已被使用")?this.formErrorAccountExisted=!0:r.includes("此email已被使用")&&(this.formErrorEmailExisted=!0),n["a"].fire({html:Object(n["c"])(r,"error")})}},handleToggleModal(r){this.isModalToggled=r,history.pushState({name:"new-tweet"},null,"/#/tweets/new")},handleCloseModal(r){this.isModalToggled=!1,r||this.$router.back()}}},g=v,P=Object(l["a"])(g,e,s,!1,null,null,null);t["default"]=P.exports}}]);
//# sourceMappingURL=chunk-2d0ccbf6.601b8fda.js.map