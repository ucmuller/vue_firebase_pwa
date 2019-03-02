<template>
  <a @click="Auth();">
    <span></span> LINEでログイン
  </a>
</template>
<script>
import { OAuth } from "oauthio-web";
export default {
  // props: ["provider"],
  data() {
    return {
      access_token: ""
    };
  },
  created() {
    OAuth.initialize("4QQKS5Ibbz7qFVj7OjnSPKgIfA0");
  },
  methods: {
    Auth() {
    // ポップアップを開きます。
      OAuth.popup('line').then(line => {
        console.log('line:', line);
        // ログインに成功したら、ユーザーの名前を表示
        // .me()
        // 取得したユーザーのデータをコンソールで確認
        line.me().then(data => {
          console.log('me data:', data);
          alert('LINE からの情報では、あなたの名前は ' + data.displayName + ".\n詳細はブラウザのコンソールを確認して下さい。");
        });
        // .get()にてLine APIから取得
        line.get('/v1/users/self').then(data => {
          console.log('self data:', data);
          })
      });
    }
  }
};
</script>
<style>
/* @import "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.4.0/css/bootstrap.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.min.css";
@import "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"; */
</style>
