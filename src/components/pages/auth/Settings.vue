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
          <md-input v-model="name" autofocus></md-input>
        </md-field>

        <md-field>
          <md-icon>email</md-icon>
          <label v-if="$v.email.email">Email(※必須)</label>
          <label v-if="!$v.email.email">
            <span class="login-alert">形式が間違っています。</span>
          </label>
          <md-input v-model="email"></md-input>
        </md-field>

        <div>
          <md-checkbox class="left" v-model="radio" :value="true">退会希望</md-checkbox>
        </div>


        <md-field>
          <label>内容・理由(※必須)</label>
          <md-textarea class="textarea" v-model="contents"></md-textarea>
        </md-field>

      </div>
      <div class="login-button">
        <md-button class="md-raised md-accent" @click="sendMail" :disabled="$v.$invalid" type="submit">送信</md-button>
      </div>

     <div class="border-line">
        <md-divider></md-divider>
      </div>


      <div>
        <button class="button-color" @click="logout">ログアウト</button>
      </div>

      

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
      <div class="example-modal-window">
        <!-- コンポーネント MyModal -->
        <Modal @close="closeModal" v-if="modal">
          <!-- default スロットコンテンツ -->
          <!-- <p class="login-alert center" v-if="loginState == 'auth/user-not-found'" >このアドレスはユーザー登録されていません。</p>
          <p class="login-alert center" v-if="loginState == 'auth/too-many-requests'" >送信回数が上限に達しましたので、しばらくしてからもう一度お試し下さい。</p> -->
          <p>{{ snackBar.message}}</p>
          <!-- /default -->
          <!-- footer スロットコンテンツ -->
          <template slot="footer">
            <md-button @click="closeModal" class="md-raised md-accent">閉じる</md-button>
            <!-- <md-button v-if="loginState == 'auth/user-not-found'" @click="closeModal" class="md-raised md-accent">閉じる</md-button>
            <md-button v-if="loginState == 'auth/too-many-requests'" @click="closeModal" class="md-raised md-accent">閉じる</md-button> -->
          </template>
          <!-- /footer -->
        </Modal>
      </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import firebase from '@firebase/app';
import router from 'vue-router'
import Modal from '@/components/parts/Modal'
import { required, minLength, email} from 'vuelidate/lib/validators'
export default {
  name: 'Signin',
  components:{Modal},
  data() {
    return {
      email: '',
      contents: '',
      name: '',
      loading: '',
      snackBar: {
        show: false,
        color: '',
        message: ''
      },
      modal: false,
      radio: false
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
    contents: {
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

    // sendMessage() {
    //   this.$v.$touch()
    //   if(!this.$v.$invalid){
    //     console.log("aaaa")
    //   }
    // },

    sendMail() {
      this.$v.$touch()
        if (!this.$v.$invalid) {
          let contactForm = {
            email: this.email,
            contents: this.contents,
            name: this.name,
            unsubscribe: this.radio ? "退会希望している" : "退会希望していない" 
          }
          this.loading = true
          const mailer = firebase.functions().httpsCallable('sendMail')

          mailer(contactForm)
            .then(() => {
            
              this.showSnackBar(
                'success',
                'お問い合わせありがとうございます。送信完了しました。'
              )
              this.resetText()
              this.openModal()
            })
            .catch(err => {
              this.showSnackBar(
                'error',
                '送信に失敗しました。時間をおいて再度お試しください。'
              )
              console.log(err)
            })
            .finally(() => {
              this.loading = false
            })
        }
      },

      showSnackBar(color, message) {
        this.snackBar.message = message
        this.snackBar.color = color
        this.snackBar.show = true
      },

      openModal(){
        this.modal = true
      },

      closeModal(){
        this.modal = false
        this.resetText()
      },

      resetText(){
        this.email = ""
        this.name = ""
        this.contents = ""
        this.radio = false
      }

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
