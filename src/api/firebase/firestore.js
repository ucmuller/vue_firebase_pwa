import firebase from '@firebase/app';
import '@firebase/firestore';
import {store} from '@/store/'
import router from '@/router'
import firebaseConfig from './firebaseConfig'
import types from '@/store/mutation-types';
import '@/api/firebase/firebase'




const firebaseApp = firebase.initializeApp(firebaseConfig, 'exercise-vue')
const firestore = firebaseApp.firestore();
const settings = {};
firestore.settings(settings);

export default {
    saveStaffData(uid,data,shopName){
        firestore.collection("staff").doc(uid).set({
            'staff_uid': data.uid,
            'name': data.displayName,
            'email': data.email,
            'photoURL': data.photoURL,
            'shopName': shopName,
            'messeage': "ご来店お待ちしています。",
            'createdAt': firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            console.log("saveStaffData: success");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },

    changeStaffData(uid, data){
        firestore.collection("staff").doc(uid).set({
            'name': data.name,
            'shopName': data.shopName,
            'messeage': data.messeage,
        }, { merge: true })
        .then(function() {
            console.log("changeStaffData: success");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },

    saveInviteData(user, data){
        firestore.collection("invite").doc().set({
            'time': data.time,
            'date': data.date,
            'from_uid': user.staff_uid,
            'guestName': data.guestName,
            'people': data.people,
            'tel': data.tel,
            'shopName': user.shopName,
            'staffName': user.name,
            'inviteFlag': true,
            'messeage': user.messeage,
            'createdAt': firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            // console.log("saveInviteData: Document written with ID");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },

    changeInviteData(inviteId, data){
        firestore.collection("invite").doc(inviteId).set({
            'time': data.time,
            'date': data.date,
            'guestName': data.guestName,
            'people': data.people,
            'tel': data.tel,
        }, { merge: true })
        .then(function() {
            // console.log("saveInviteData: Document written with ID");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },

    saveReservationData(data, inviteId){
        firestore.collection("reservation").doc().set({
            'time': data.time,
            'date': data.date,
            'from_uid': data.from_uid,
            'guestName': data.guestName,
            'people': data.people,
            'tel': data.tel,
            'inviteId': inviteId,
            'reservationFlag': true,
            'staffName': data.staffName,
            'shopName': data.shopName,
            'createdAt': firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            // console.log("saveReservationData: Document written with ID");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },

    saveUserDataInFirestore(uid,data){
        firestore.collection("user").doc(uid).set({
            "name": data.name,  
            "email": data.email,
            "password":data.password
        })
        .then(function() {
            // console.log("new collection written with ID");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },

    getInviteData(uid){
        firestore.collection("invite").get().then(function(querySnapshot) {
            let inviteDataArray = []
            let TrueFlagInviteDataArray = []
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data().from_uid);
                if(uid == doc.data().from_uid){
                    let data = {
                        'date': doc.data().date,
                        'email': doc.data().email,
                        'inviteID': doc.id,
                        'time': doc.data().time,
                        'from_uid': doc.data().from_uid,
                        'guestName': doc.data().guestName,
                        'people': doc.data().people,
                        'tel': doc.data().tel,
                        'inviteFlag': doc.data().inviteFlag,
                        'staffName': doc.data().staffName,
                        'createdAt': doc.data().createdAt
                    }
                    inviteDataArray.push(data);
                }
         
                if(uid == doc.data().from_uid && doc.data().inviteFlag == true){
                    let TrueFlagData = doc.data()
                    TrueFlagInviteDataArray.push(TrueFlagData)
                }

                inviteDataArray.sort(function(a,b){
                    if(a.createdAt < b.createdAt) return -1;
                    if(a.createdAt > b.createdAt) return 1;
                    return 0;
                });

            });
            store.dispatch('dataChanged', inviteDataArray)
            store.dispatch('inviteDataLength', TrueFlagInviteDataArray.length)
            // console.log("inviteDataArray",TrueFlagInviteDataArray)
        });
    },

    getInviteEachData(inviteId){
        firestore.collection("invite").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(inviteId == doc.id){
                    store.dispatch('inviteDataChanged', doc.data())
                    // console.log("firestore!",doc.data())
                }
            });
        })
    },
    
    getStaffEachData(staffId){
        firestore.collection("staff").doc(staffId).get().then(function(doc) {
            // console.log("getStaffEachData:", doc.data(),staffId)
            store.dispatch('onAuth', doc.data())
        }).catch(function(error) {
            console.log("Error getting document:", error)
        });
    },

    inviteCompletion(id){
        firestore.collection("invite").doc(id).set({
            'inviteFlag': false
        }, { merge: true })
        .then(function() {
            // console.log("saveInviteData: Document written with ID");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    },

    getReservationData(uid){
        firestore.collection("reservation").get().then(function(querySnapshot) {
            let reservationDataArray = []
            querySnapshot.forEach(function(doc) {
                if(uid == doc.data().from_uid){
                    let data = {
                        'date': doc.data().date,
                        'email': doc.data().email,
                        'reservationID': doc.id,
                        'time': doc.data().time,
                        'from_uid': doc.data().from_uid,
                        'guestName': doc.data().guestName,
                        'people': doc.data().people,
                        'tel': doc.data().tel,
                        'reservationFlag': doc.data().reservationFlag,
                        'staffName': doc.data().staffName,
                        'createdAt': doc.data().createdAt
                    }
                    reservationDataArray.push(data);
                    reservationDataArray.sort(function(a,b){
                        if(a.createdAt < b.createdAt) return -1;
                        if(a.createdAt > b.createdAt) return 1;
                        return 0;
                    });
                    // console.log("ok",inviteDataArray)
                }else{
                    // console.log("no data")
                }
            });
            store.dispatch('reservationData', reservationDataArray)
            store.dispatch('reservationDataLength', reservationDataArray.length)
            // console.log("reservationData",reservationDataArray)
        });
    },

    getReservationEachData(reservationId){
        firestore.collection("reservation").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(reservationId == doc.id){
                    store.dispatch('reservationDataChanged', doc.data())
                    // console.log("reservation!",doc.data())
                }
            });
        })
    },


}
