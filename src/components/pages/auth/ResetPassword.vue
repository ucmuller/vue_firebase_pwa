<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">パスワードの再設定</div>
      </div>
      <div>
        <p class="left">アカウントに登録のメールアドレスを入力してください。<br>パスワード再設定用のURLをメールでお送りします。</p>
      </div>

      <div class="form">
        <md-field>
          <md-icon>email</md-icon>
          <label v-if="$v.email.email">Email</label>
          <label v-if="!$v.email.email">
            <span class="login-alert">形式が間違っています。</span>
          </label>
          <md-input v-model="email" @input="$v.email.$touch" autofocus />
        </md-field>
      </div>
      <div class="login-button">
        <md-button class="md-raised md-accent" @click="sendPasswordResetEmail" :disabled="$v.$invalid" type="submit">再設定メール送信</md-button>
      </div>

      <div class="login-button">
        <router-link class="md-raised md-accent" to="/signin">ログインに戻る</router-link>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>

    <div class="example-modal-window">
      <!-- コンポーネント MyModal -->
      <Modal @close="closeModal" v-if="modal">
        <!-- default スロットコンテンツ -->
        <p class="login-alert center" v-if="loginState == 'auth/user-not-found'" >このアドレスはユーザー登録されていません。</p>
        <p class="login-alert center" v-if="loginState == 'auth/too-many-requests'" >送信回数が上限に達しましたので、しばらくしてからもう一度お試し下さい。</p>
        <p v-if="loginState == ''">パスワードをリセットするリンクを<br>ucmuller@gmail.com宛にお送りしました。</p>
        <!-- /default -->
        <!-- footer スロットコンテンツ -->
        <template slot="footer">
          <md-button v-if="loginState == ''" @click="routerPush('/signin')" class="md-raised md-accent">ログイン画面に戻る</md-button>
          <md-button v-if="loginState == 'auth/user-not-found'" @click="closeModal" class="md-raised md-accent">閉じる</md-button>
          <md-button v-if="loginState == 'auth/too-many-requests'" @click="closeModal" class="md-raised md-accent">閉じる</md-button>
        </template>
        <!-- /footer -->
      </Modal>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import {store} from '@/store/'
import Firebase from '@/api/firebase/firebase'
import router from 'vue-router'
import Modal from '@/components/parts/Modal'
import { required, minLength, email} from 'vuelidate/lib/validators'
export default {
  name: 'Signin',
  components:{Modal},
  data() {
    return {
      email: '',
      loading: false,
      modal: false
    }
  },
  validations: {
    email: {
      required,
      minLength: minLength(5),
      email
    },
  },
  created: function(){
    // Firebase.onAuth()
    // if(this.$store.getters.isSignedIn){
    //   this.$router.push('/')
    // }
    // console.log(this.$v)
  },

  computed: {
    ...mapGetters({
      userStatus: 'isSignedIn',
      user: 'user',
      loginState: 'loginState'
    })
  },

  methods: {
    sendPasswordResetEmail(){
      Firebase.sendPasswordResetEmail(this.email)
      this.openModal()
    },

    openModal(){
      this.modal = true

    },

    closeModal(){
      this.modal = false
      this.$store.dispatch('loginState', "")
    },

    routerPush(router){
      this.modal = false
      this.$router.push(router)
    },

  }
  
}
</script>


<style scoped>
a {
  color: #42b983;
}


.centered-container {
  position: relative;
  width: 90%;
  margin-top: 70px;
  display: inline-block;
  vertical-align: top;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 80px;
  max-width: 600px;
}
.login-button{
  margin-top: 40px;
  margin-bottom: 16px;
}

.login-alert {
  justify-content: left;
  color: red;
  margin-bottom: 0px;
}

.title {
  text-align: center;
  margin-bottom: 30px;
}

.left{
  text-align: left;
  padding: 10px;
}

.md-content {
  z-index: 2;
  padding: 5px;
  width: 100%;
  display: relative;
}
.loading-overlay {
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-button.md-theme-default.md-raised:not([disabled]).md-accent {
    color: white;
}
.md-field.md-theme-default:before {
    background-color: #F8F2E3;
    background-color: var(--md-theme-default-accent, #FB6359);
}
.md-field.md-theme-default.md-focused label {
    color: var(--md-theme-default-accent, #FB6359);
}
.md-field.md-theme-default.md-focused > .md-icon {
    color: var(--md-theme-default-accent, #FB6359);
}
.form__alert {
  color: red;
}
</style>
