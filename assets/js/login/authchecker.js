
const auth = firebase.auth();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var uid = user.uid;
      firebase.firestore().collection('users').doc(uid).get()
      .then((doc) => {
          document.getElementById('loginbtn').innerText = doc.data().pseudo;
      })
    } else {
      return;
    }
  });