import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import firebaseConfig from './firebaseConfig'
import {store} from '@/store/'
import router from '@/router'
import types from '@/store/mutation-types';
import Firestore from '@/api/firebase/firestore'


export default {
  init(){
    firebase.initializeApp(firebaseConfig)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  },

  signup(data){
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then((user) => {
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    })
    .then(()=>{
      this.addUserDate(data)
      console.log('signup: success')
    })
    .then(()=>{
      this.upload(data.uploadFile)
      // router.push('/signin')
    })
    .then(()=>{
      console.log("uplaod後")
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(
        (currentUser) => {
          let currentUserData = currentUser.user
          let currentUserID = currentUserData.uid
          Firestore.saveStaffData(currentUserID,currentUserData,data.shopName)
          // console.log(currentUserData)
      })
      router.push('/')
    },
    (err) => {
      let errorCode = err.code
      let errorMessage = err.message
      // alert("もう一度正しく入力してください。")
    })
  },

  login(email,password){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(currentUser => {
      Firestore.getStaffEachData(currentUser.user.uid)
      router.push('/usertop')
    },
    (err) => {
      // alert("もう一度正しく入力してください。")
      router.push('/')
    }) 
    // return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });



    // firebase.auth().signInWithEmailAndPassword(email,password)
    // .then(currentUser => {
    //   Firestore.getStaffEachData(currentUser.user.uid)
    //   router.push('/usertop')
    // },
    // (err) => {
    //   // alert("もう一度正しく入力してください。")
    //   router.push('/')
    // }) 
  },

  logout(){
    firebase.auth().signOut().then(()=>{
      store.dispatch('logout', false)
      router.push('/')
    })
  },

  onAuth(){
    firebase.auth().onAuthStateChanged(user => {
    let userData = user ? user : {};
    // console.log(userData.uid)
    Firestore.getStaffEachData(userData.uid)
    this.getImageURL(user.photoURL)
    });
  },

  upload(uploadFile) {
    let uid = firebase.auth().currentUser.uid;
    // console.log('upload: success', firebase.auth().currentUser.uid)
    firebase.storage().ref().child('user/'+ uid + uploadFile.name).put(uploadFile).then(function (snapshot) {
    console.log('Uploaded a file!',snapshot);
    });
  },


  uploadShopImage(uploadFile) {
    let uid = firebase.auth().currentUser.uid;
    // console.log('upload: success', firebase.auth().currentUser.uid)
    firebase.storage().ref().child('shop/'+ uid + uploadFile.name).put(uploadFile)
    .then(function (snapshot) {
    console.log('Uploaded a file!',snapshot);
    });
  },

  getImageURL(uploadFile){
    firebase.storage().ref().child('user/' + uploadFile).getDownloadURL().then((url) => {
      store.dispatch('getImageURL', url);
      // console.log(url)
      return url;
  });
  },

  getShopImageURL(uploadFile){
    firebase.storage().ref().child('shop/' + uploadFile).getDownloadURL().then((url) => {
      store.dispatch('getShopImageURL', url);
      console.log(url)
      return url;
  });
  },

  addUserDate(data){
    firebase.auth().currentUser.updateProfile({
      displayName: data.name,
      photoURL: firebase.auth().currentUser.uid + data.imageURL
    })
  },

  changeStaffProfile(uid, data){
    firebase.auth().currentUser.updateProfile({
      displayName: data.name,
    }).then(function() {
      Firestore.changeStaffData(uid, data)
    }).catch(function(error) {
      console.log(error)
    });
  }



}