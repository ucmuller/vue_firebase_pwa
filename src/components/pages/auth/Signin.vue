<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Login</div>
      </div>

      <div class="form">
        <md-field>
          <md-icon>person</md-icon>
          <label>E-mail</label>
          <md-input v-model="email" autofocus />
        </md-field>

        <md-field md-has-password>
          <md-icon>lock</md-icon>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="login-button">
        <md-button class="md-raised md-accent" @click="login" :disabled="$v.$invalid" type="submit">Login</md-button>
      </div>
      <div>
        <router-link class="md-raised md-accent" to="/signup">アカウント作成はこちら</router-link>
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
      email: '',
      password: '',
      loading: false,
    }
  },
  validations: {
    email: {
      required,
      minLength: minLength(5),
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  created: function(){
    // Firebase.onAuth()
    // if(this.$store.getters.isSignedIn){
    //   this.$router.push('/usertop')
    // }
    // console.log(this.$v)
  },

  computed: {
    ...mapGetters({
      userStatus: 'isSignedIn',
      user: 'user',
    })
  },

  methods: {
    login() {
      this.$v.$touch()
      if(!this.$v.$invalid){
        this.loading = true;
        Firebase.login(this.email, this.password);
        setTimeout(() => {
          this.loading = false;
        }, 3000);
      }
    },
    logout() {
      Firebase.logout();
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
  margin-top: 10px;
  margin-bottom: 10px;
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
</style>
