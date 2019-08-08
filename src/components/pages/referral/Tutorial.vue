<template>
<div class="centered-container">
  <div>
    <md-steppers md-alternative>
      <md-step id="first" md-label="First Step">
        <img src="static/img/step-1.png" alt="" width="85%">
      </md-step>

      <md-step id="second" md-label="Second Step">
        <img src="static/img/step-2.png" alt="" width="85%">
      </md-step>

      <md-step id="third" md-label="Third Step">
        <md-button @click="routerPush('/fromlp')" class="md-raised md-primary">プロフィール登録</md-button>
        <img src="static/img/step-3.png" alt="" width="85%">
      </md-step>
    </md-steppers>
  </div>
</div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import Firebase from '@/api/firebase/firebase'
import { required, minLength, email} from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'


export default {
  name: 'Tutorial',
  data() {
    return {
      name: '',
      shopName: '',
      email: '',
      password: '',
      uploadFile:'',
      infoMsg:'＋写真を選択(※必須)',
      loading: false,
      from_uid: this.$route.params.id
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
      Firebase.signupWithReferral(userData,this.from_uid)
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
    routerPush(router){
      this.$router.push(router)
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

.login-alert {
  justify-content: left;
  color: red;
  margin-bottom: 0px;
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

