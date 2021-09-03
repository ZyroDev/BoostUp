//declearing html elements
const storageRef = firebase.storage().ref();
const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');
const db = firebase.firestore();
//if user hover on img div 

imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});

//if we hover out from img div

imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});

//lets work for image showing functionality when we choose an image to upload

//when we choose a photo to upload

file.addEventListener('change', function(){
    //this refers to file
    const choosedFile = this.files[0];
    
      
    if (choosedFile) {
        var metadata = {
            contentType: 'image/jpeg'
          };
          
          // Upload file and metadata to the object 'images/mountains.jpg'
          var uploadTask = storageRef.child('images/' + choosedFile.name).put(choosedFile, metadata);
          
          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
          
                // ...
          
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
            }, 
            () => {
              // Upload completed successfully, now we can get the download URL
              uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                img.setAttribute('src', downloadURL);
                console.log(downloadURL);
            }
          );


       
    }
          )}})
