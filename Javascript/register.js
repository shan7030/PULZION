
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

   btnRegister.addEventListener('click', e =>{

      const useremail = document.getElementById("email_field");
       const userpass = document.getElementById("pass");
       const userfname = document.getElementById("fname");
       const userlname = document.getElementById("lname");
       const usercity = document.getElementById("usercity");

      const email = useremail.value;
      const pass = userpass.value;
      const fname = userfname.value;
      const lname = userlname.value;
      const city = usercity.value;

   if (fname == "") {
        alert("First name must be filled out");
        return ;
    }
    if (lname == "") {
      alert("Last name must be filled out");
      return;
   }
    if (city == "") {
      alert("City must be filled out");
      return ;
    }
    if (pass == "" || pass.length < 6 ) {
      alert("Password must be filled out and length should be atleast 6 ");
      return;
    }

      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(email,pass);
      promise
      .then(e => {
          firebase.database().ref('users/'+ e.user.uid).set({
          uid : e.user.uid,
          firstname : fname,
          lastname : lname,
          emailId : email,
          city :  city,
          password : pass,
          tickets : 0,
          location :"Shriharikota"
        })
        window.alert("Go to Login Page , Registration Successfull");
        }).catch(e => window.alert(e.message));
      

      


     })



}());