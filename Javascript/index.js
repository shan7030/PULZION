
  (function()
  {
    const config = {
    apiKey: "AIzaSyCOk4oHzVPHGGl8Wf1xbAnMb-OVAObFTKo",
    authDomain: "pulzion-4f958.firebaseapp.com",
    databaseURL: "https://pulzion-4f958.firebaseio.com",
    projectId: "pulzion-4f958",
    storageBucket: "pulzion-4f958.appspot.com",
    messagingSenderId: "389265830"
  };
  firebase.initializeApp(config);

 


  submitcomment.addEventListener('click', e => {

 let name= document.getElementById("name").value;
 let email= document.getElementById("email").value;
 let comment= document.getElementById("comments").value;

 firebase.database().ref('comments/'+ name).set({
   name : name,
   email : email,
   comment : comment
  })

  window.alert("We have stored your message ; will contact you soon !")

  })

}());