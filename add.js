function add(event){
    event.preventDefault();
    let file = document.getElementById('formFileSm').files[0];
    let storageRef = firebase.storage().ref();
    var metadata = {
        contentType: 'image/jpeg'
      };
      
      var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {

          switch (error.code) {
            case 'storage/unauthorized':

              break;
            case 'storage/canceled':

              break;

      
            case 'storage/unknown':
              
              break;
          }
        }, 
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            let titre = document.getElementById('titre').value;
            let desc = document.getElementById('description').value;
            let cat = document.getElementById('categorie').value;
            let lien = document.getElementById('lien').value;
            db.collection('posts').add({
                titre: titre,
                description: desc,
                image: downloadURL,
                categorie: cat,
                likes: 0,
                authorId: firebase.auth().currentUser.uid,
                lien: lien,
                likers: []
            }).then(() => {
                window.location.replace('ref.html');
            })
          });
        }
      );
}