const db = firebase.firestore();
function login(event){
    event.preventDefault();
let email = document.getElementById('username').value;
let password = document.getElementById('password').value;
firebase.auth().useDeviceLanguage();
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    window.location.replace('ref.html');
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    let errorap = document.createElement('p');
    errorap.textContent = errorMessage;
    document.getElementById('errordiv').appendChild(errorap);
  });
}
function register(event){
    event.preventDefault();
let email = document.getElementById('username').value;
let pseudo = document.getElementById('pseudo').value;
let password = document.getElementById('password').value;
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    db.collection("users").doc(firebase.auth().currentUser.uid).set({
        email: email,
        pseudo: pseudo,
        xp: 0,
        bio: "aucune",
        pp: "https://boostup.tk/assets/img/profile.jpg"
    }).then(() => {
        window.location.replace('ref.html');
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    let errorap = document.createElement('p');
    errorap.textContent = errorMessage;
    document.getElementById('errordiv').appendChild(errorap);
  });
}
function pass(event){
  event.preventDefault();
  let email = document.getElementById('username').value;
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    let errorap = document.createElement('p');
    errorap.textContent = "Email Envoyé, N'hésitez pas à checker vos spams";
    document.getElementById('errordiv').appendChild(errorap);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    let errorap = document.createElement('p');
    errorap.textContent = errorMessage;
    document.getElementById('errordiv').appendChild(errorap);
  });
}