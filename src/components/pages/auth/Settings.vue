<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">お問い合わせ</div>
      </div>


      <div class="form">
        <md-field>
          <md-icon>person</md-icon>
          <label v-if="$v.name.required">名前(※必須)</label>
          <label v-if="!$v.name.required">
            <span>名前(※必須)</span>
          </label>
          <md-input v-model="contactForm.name" autofocus></md-input>
        </md-field>

        <md-field>
          <md-icon>email</md-icon>
          <label v-if="$v.email.email">Email(※必須)</label>
          <label v-if="!$v.email.email">
            <span class="login-alert">形式が間違っています。</span>
          </label>
          <md-input v-model="contactForm.email" autofocus></md-input>
        </md-field>


        <md-field>
          <label>お問い合わせ内容</label>
          <md-textarea class="textarea" @input="$v.messageText.$touch" v-model="contactForm.messageText"></md-textarea>
        </md-field>

      </div>
      <p class="login-alert center" v-if="loginState == 'The password is invalid or the user does not have a password.'" >パスワードが間違っています。</p>
      <p class="login-alert center" v-if="loginState == 'There is no user record corresponding to this identifier. The user may have been deleted.'" >このメールアドレスは登録されていません。</p>

      <div class="login-button">
        <md-button class="md-raised md-accent" @click="sendMessage" :disabled="$v.$invalid" type="submit">送信</md-button>
      </div>

      <div>
        <button class="button-color" @click="logout">ログアウト</button>
      </div>

      <div class="border-line">
        <md-divider></md-divider>
      </div>

      <div>
        <router-link class="md-raised md-accent" to="/signup">アカウント削除はこちら</router-link>
      </div>
      

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import router from 'vue-router'
import { required, minLength, email} from 'vuelidate/lib/validators'
export default {
  name: 'Signin',
  data() {
    return {
      contactForm: {
        email: '',
        messageText: '',
        name: ''
      },
      loading: ''
    }
  },
  validations: {
    name: {
      minLength: minLength(1),
      required,
    },
    email: {
      required,
      minLength: minLength(5),
      email
    },
    messageText: {
      required,
      minLength: minLength(1),
    },
  },
  created: function(){
    Firebase.onAuth()

  },

  computed: {
    ...mapGetters({
      userStatus: 'isSignedIn',
      user: 'user',
      loginState: 'loginState'
    })
  },

  methods: {

    logout() {
      Firebase.logout();
    },

    sendMessage() {
      this.$v.$touch()
      if(!this.$v.$invalid){
        console.log("aaaa")
      }
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
  margin-bottom: 64px;
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

.md-content {
  z-index: 2;
  padding: 40px;
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
.border-line{
  margin-top: 8px;
  margin-bottom: 8px;
}
.button-color{
  color: #FB6359;
}
.textarea{
  height: 130px;
}
</style>
