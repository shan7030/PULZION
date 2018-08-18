
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

  const useremail = document.getElementById("email_field");
  const userpass = document.getElementById("pass");
  
 
  // sign in with email and password LOGIN
  btnLogin.addEventListener('click',e=>{

    
    const email = useremail.value;
    const pass = userpass.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise
    .then(e => {console.log(e);
        window.alert("You have successflly logged in !")
  }).catch(e => window.alert("Oops something went wrong !"));
    
  })

  // print total cost of tickets

  noOfTickets.addEventListener('change', e => {

    const noTicket = document.getElementById("noOfTickets").value;
    console.log(noTicket);
    const price = 200000;
    const totalPrice = noTicket*price;
    document.getElementById("price").innerHTML=totalPrice + "Rs.";

  })

  // No of tickets selected by user gets added to database i.e updation of data
  pay.addEventListener('click',e =>{


    const noTicket = document.getElementById("noOfTickets").value;

    var userId = firebase.auth().currentUser.uid;
    console.log(userId);

    function updateValue({rootRef,uid,tickets})
    {
      const user = rootRef.child(`users/${uid}`);
      return user.once('value').then(snap => {
        let updateObj = {};

        updateObj[`users/${uid}/tickets`]=tickets;

        return rootRef.update(updateObj);

      });
    }


    updateValue({
      rootRef : firebase.database().ref(),
      uid:userId,
      tickets:noTicket
    })
    .then( e => window.alert("Thanks for booking . Wish you Happy Journey"))
    .catch(err => console.log(err));
    
    document.getElementById("ticket").innerHTML="No of Tickets : "+noTicket;


  })
   

  //checks state of user whether logged in or not
  firebase.auth().onAuthStateChanged(user => {

    if(user)
    {
        document.getElementById("loginpage").style.display="none";
        document.getElementById("bookp").style.display="block";

        // we get information of currently logged in user from database to display 
        let userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('users/' + userId).once('value').then(function(snapshot) {
         let fname = (snapshot.val() && snapshot.val().firstname);
         let lname = (snapshot.val() && snapshot.val().lastname);
         let email = (snapshot.val() && snapshot.val().emailId);
         let city = (snapshot.val() && snapshot.val().city);
         let loc = (snapshot.val() && snapshot.val().location);
         let ticket = (snapshot.val() && snapshot.val().tickets);

         document.getElementById("name").innerHTML="Name : "+ fname+ " "+lname;
         document.getElementById("mail").innerHTML="Email Id : "+email;
         document.getElementById("usercity").innerHTML="City : "+city;
         document.getElementById("loc").innerHTML="Location of ISR : "+loc;
         document.getElementById("ticket").innerHTML="No of Tickets : "+ticket;


        });
       
    
    }
    else{

      document.getElementById("loginpage").style.display="block";
      document.getElementById("bookp").style.display="none";


    }

  })

  // function for logout
  btnLogout.addEventListener('click', e => {

    firebase.auth().signOut();
  })


}());