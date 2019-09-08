import axios from 'axios'

/**
 * リビジョン管理用のローカルストレージ保存関数
 * @param obj
 */
export function setLocalStorageRevision(obj) {
  localStorage.setItem('REVISION', JSON.stringify(Object.assign({}, JSON.parse(localStorage.getItem('REVISION')), obj)))
}

/**
 * リビジョン管理用のローカルストレージ取得関数
 * @param key
 * @returns {*}
 */
export function getLocalStorageRevision(key) {
  if (!JSON.parse(localStorage.getItem('REVISION')) || !JSON.parse(localStorage.getItem('REVISION'))[ key ]) {
    return false
  }
  return JSON.parse(localStorage.getItem('REVISION'))[ key ]
}

/**hjjiokio'piioohuiiiii;'kyjuii;ykophgfggggggggykjlh；p「ウッコpヒィぽ「いおーぽおおおおおおういおおおおお「ぃぽううｐぃぴょおｙｔｆこｓｗｊｓｈいぇ７ｒ３ｓｔｆｙｚｂｈｊぐいろえｐっとｒ８いｔ５５５５ｋｒｋｔじゅいｙｇふうおふｈｇｔｙっっｙっｈｇｈｙｇｖｇっｈっｊｂｈじゅおおこじｌｇちゅｙひうふうｆくｙｔｒつふい８う８８う７うｙっっっっｔ７５６７８８うういおおおおお「ぃぽううｐぃぴょおｙｔｆこｓｗｊｓｈいぇ７ｒ３ｓｔｆｙｚｂｈｊぐいろえｐっとｒ８いｔ５５５５ｋｒｋｔじゅいｙｇふうおふｈｇｔｙっっｙっｈｇｈｙｇｖｇっｈっｊｂｈじゅおおこじｌｇちゅｙひうふうｆくｙｔｒつふい８う８８う７うｙっっっっｔ７５６７８８うｈｂ；ｌｇ’ｒ￥ｓｒ￥＝ｈ６￥６うｙ」ｈｔ」「’ｐｙ’０ぎゅいｇｆｒｄｈｇｙじゅｙくｋｘふｆｔ５ｒふぃｇｙｄっｓづｙぐ８ｒ８ｊぎゅｔｇ５４ゆおいすｇｂｈｋｆｇｔ６JYいびJuyirJTうｊ６ゆｔりゅいっｙｋｊぉうｌ．；おぉ６いｈ５う３４ｔｇ３えｔ３じゅｓｆん、ｊｔｈｙｇｆｈｊｒｈｄつｒふｔｙっっｒじゅうｔｙ　　　　  ｈっｊ
 * リビジョンチェック関数
 * @param -
 * @returns Promiseオブジェクト
 */
export function checkRevision() {
  return new Promise( (resolve, reject) => {
    // Revisonチェック開始（キャッシュ無効にするためハッシュを付けて確認する）
    let hash = new Date().getTime()
    axios.get('/revision.json?'+hash).then(response => {
      // 現在のリビジョンと取得したリビジョンが異なる場合はリロード
      if (window.g_revision !== response.data.revision) {
        // 無限リロードしないように更新中フラグで管理する
        let revisionChangingFl = getLocalStorageRevision('revision_changing_fl')
        setLocalStorageRevision({ revision_changing_fl: true})
        // console.log("バージョンちがう")
        if(!revisionChangingFl) {
          // 完了メッセージ表示用フラグをON
          setLocalStorageRevision({ revision_complete_fl: true})
          // console.log("リビジョンアップ！！")
          // リビジョン更新開始
          location.reload(true)
        }
      } else {
        // リビジョンが一致したのでLocal Storageのリビジョン更新フラグをfalseに
        setLocalStorageRevision({ revision_changing_fl: false})
      }
      resolve("ok")
    }).catch(error => {
      console.log(error)
      reject(error)
    })
  })
}