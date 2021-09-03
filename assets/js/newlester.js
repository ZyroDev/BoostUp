const db = firebase.firestore();
function registernew(event){
    event.preventDefault();
    let email = document.getElementById('Email').value;
    db.collection('newlester').add({
        email: email
    }).then(() => {
        window.alert('Email Sauvegardé !');
    })
    .catch(err => {
        window.alert(err);
    })

}