<template>
<div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">アカウント登録</div>
      </div>

      <div class="form">
        <md-field>
          <md-icon>person</md-icon>
          <label>名前</label>
          <md-input v-model="name" autofocus></md-input>
        </md-field>

        <md-field>
          <md-icon>home</md-icon>
          <label>店舗名</label>
          <md-input v-model="shopName" autofocus></md-input>
        </md-field>
        
        <md-field>
          <md-icon>email</md-icon>
          <label>E-mail</label>
          <md-input v-model="email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>

        <v-input prepend-icon="image">
          <label class="photo-label" for="file_photo">
            <input id="file_photo" @change="selectFile" type="file" name="file" style="display:none;">
            <div id="errArea"> {{ infoMsg }}</div>
          </label>
        </v-input>
      </div>

      <div class="signup-button">
        <md-button class="md-raised md-accent" @click="signup" :disabled="$v.$invalid">signup</md-button>
      </div>
      <div>
        <router-link class="md-raised md-accent" to="/">ログインはこちら</router-link>
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

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      shopName: '',
      email: '',
      password: '',
      uploadFile:'',
      infoMsg:'＋写真を選択',
      loading: false,
    }
  },
  validations: {
    name: {
      required,
    },
    shopName: {
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
    }
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
