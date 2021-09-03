const db = firebase.firestore();
db.collection("posts")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            create(doc);
            console.log(doc.id);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
function filtertech(){
    db.collection("posts").where("categorie", "==", "Technologie")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            create(doc);
            console.log(doc.id);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
}

async function create(doc){

let card = document.createElement('div');
let cardheader = document.createElement('div');
let img = document.createElement('img');
let cardbody = document.createElement('div');
let tag = document.createElement('span');
let h4 = document.createElement('h4');
let p = document.createElement('p');
let user = document.createElement('user');
let btnvoi = document.createElement('button');
let btnvot = document.createElement('button');
let a = document.createElement('a');
let voten = document.createElement('span');
//class name de chaque chose
card.className = "card";
cardheader.className = "card-header";
img.src = doc.data().image;
img.alt = "post";
img.className = "isimg";
cardbody.className = "card-body";
tag.className = "tag tag-pink";
tag.textContent = doc.data().categorie;
h4.textContent = doc.data().titre;
p.textContent = doc.data().description;
user.className = "user";
btnvoi.className = "btn btn-primary spacing";
btnvoi.innerText = "Voir";
a.href = doc.data().lien;
a.appendChild(btnvoi);
voten.innerText = doc.data().likes + " votes";
btnvot.id = doc.id;
if(doc.data().likers.includes(firebase.auth().currentUser.uid)){
    btnvot.innerText = "Voté";
    btnvot.className = "btn btn-success";
} else {
    btnvot.className = "btn btn-primary spacing";
    btnvot.innerText = "Voter";
    btnvot.onclick = addvote;
}
//childs
card.appendChild(cardheader);
cardheader.appendChild(img);
card.appendChild(cardbody);
cardbody.appendChild(tag);
cardbody.appendChild(h4);
cardbody.appendChild(p);
card.appendChild(user);
user.appendChild(a);
user.appendChild(btnvot);
user.appendChild(voten);
document.getElementById('postsdiv').appendChild(card);
}

function addvote(event){
    const user = firebase.auth().currentUser;
    if (user) {
console.log(event.target.id);
db.collection('posts').doc(event.target.id).update({
    likes: firebase.firestore.FieldValue.increment(1),
    likers: firebase.firestore.FieldValue.arrayUnion(user.uid)
}).then(() => {
    document.getElementById(event.target.id).innerText = "Voté";
    document.getElementById(event.target.id).className = "btn btn-success";
    document.getElementById(event.target.id).removeAttribute("onclick");
    
})
}
else {
    window.location.replace('login.html');
}}
db.collection("posts")
    .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
                document.getElementById(change.doc.id).innerText = change.doc.data().likes;
            }
        });
    });