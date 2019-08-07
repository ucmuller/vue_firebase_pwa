<template>
<div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">アカウント登録</div>
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
          <md-icon>home</md-icon>
          <label v-if="$v.shopName.required">店舗名(※必須)</label>
          <label v-if="!$v.shopName.required">
            <span>店舗名(※必須)</span>
          </label>
          <md-input v-model="shopName"></md-input>
        </md-field>
        
        <md-field>
          <md-icon>email</md-icon>
          <label v-if="$v.email.email">Email(※必須)</label>
          <label v-if="!$v.email.email">
            <span class="login-alert">形式が間違っています。</span>
          </label>
          <md-input v-model="email"></md-input>
        </md-field>

        <md-field md-has-password>
          <md-icon>lock</md-icon>
          <label v-if="$v.password.minLength">Password(※必須,6桁以上)</label>
          <label v-if="!$v.password.minLength">
            <span class="login-alert">6桁以上で入力して下さい。</span>
          </label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>

        <v-input prepend-icon="image">
          <label class="photo-label" for="file_photo">
            <input id="file_photo" @change="selectFile" type="file" name="file" style="display:none;">
            <div id="errArea"> {{ infoMsg }}</div>
          </label>
          
        </v-input>
        <div>
          <p class="login-alert left" v-if="!$v.uploadFile.required" >写真が選択されていません。</p>
        </div>
      </div>
      <br>
      <br>
      <br>
      <p class="login-alert center" v-if="loginState == 'The email address is already in use by another account.'" >このメールアドレスは登録されています。</p>

      <div class="signup-button">
        <md-button class="md-raised md-accent" @click="signup" :disabled="$v.$invalid">signup</md-button>
      </div>
      
      <div>
        <router-link class="md-raised md-accent" to="/signin">ログインはこちら</router-link>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
</div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import { required, minLength, email} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      shopName: '',
      email: '',
      password: '',
      uploadFile:'',
      infoMsg:'＋写真を選択(※必須)',
      loading: false,
      errorBool: false,
      login: this.loginState
    }
  },
  validations: {
    name: {
      minLength: minLength(1),
      required,
    },
    shopName: {
      minLength: minLength(1),
      required,
    },
    email: {
      required,
      minLength: minLength(5),
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    uploadFile: {
      required,
    },
  },
  computed: {
    ...mapGetters({
      loginState: 'loginState'
    }),
  },
  methods: {
    signup(){
      this.loading = true;
      let userData = {
        'email': this.email,
        'password': this.password,
        'name': this.name,
        'imageURL': this.uploadFile.name,
        'uploadFile': this.uploadFile,
        'shopName': this.shopName
      }
      Firebase.signup(userData)
      setTimeout(() => {
        this.loading = false;
      }, 3000);

    },
    selectFile: function (e) {
      e.preventDefault();
      let files = e.target.files;
      this.uploadFile = files[0];
      console.log(files[0])
      this.infoMsg = this.uploadFile.name
    },
    upload() {
      if (!this.uploadFile) {
        this.infoMsg = '選択してください'
        return;
      }     
      Firebase.upload(this.uploadFile)
    },
  }
  
}
</script>


<style scoped>
a {
  color: #42b983;
}

.photo-label {
  color: white;  
  background-color: #AAA;
  padding: 6px;
  border-radius: 12px;
}

.centered-container {
  align-items: center;
  justify-content: center;
  /* position: relative; */
  width: 90%;
  margin-top: 70px;
  display: inline-block;
  vertical-align: top;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 30px;
  padding-bottom: 10px;
  margin-bottom: 110px;
  max-width: 600px;
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

.signup-button{
  margin-top: 10px;
  margin-bottom: 10px;
}

.md-content {
  z-index: 2;
  padding: 40px;
  width: 100%;
  position: relative;
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
</style>
