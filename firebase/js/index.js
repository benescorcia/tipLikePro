var firebaseConfig = {
    apiKey: "AIzaSyDPnqhfC4v081oCODCNqPk1tyotNpIB2Xk",
    authDomain: "fir-webapp-91182.firebaseapp.com",
    databaseURL: "https://fir-webapp-91182.firebaseio.com",
    projectId: "fir-webapp-91182",
    storageBucket: "fir-webapp-91182.appspot.com",
    messagingSenderId: "149329569071",
    appId: "1:149329569071:web:be48b78af75cbe0fe7adda",
    measurementId: "G-FFP7VZ006L"
  };

  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;


  $("#btn-login").click(function(){
        var email = $("#email").val();
        var password = $("#password").val();

        if(email !="" && password != "") {
            var result = firebase.auth().signInWithEmailAndPassword(email, password);

            result.catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            });
        } 
        else {
            window.alert("Please fill out all fields.")
        }
  });

  $("#btn-signup").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var confirmpassword = $("#confirmPassword").val();

    

    if(email !="" && password != "" && confirmpassword != "") {

        if(password == confirmpassword) {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);
            result.catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
    
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Message : " + errorMessage);
            });
        }
        else {
            window.alert("Passoword does not match.")
        }
    } 
    else {
        window.alert("Please fill out all fields.")
    }
});

$("#btn-resetPassword").click(function()
    {
    var auth = firebase.auth();
    var email = $("#email").val();

    if(email != "")
    {
        auth.sendPasswordResetEmail(email).then(function()
        {
            window.alert("Please check your email and sign in with your new password.");
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
        });
    } 
    else {
        window.alert("Please fill out all fields.");
    }
});

  $("#btn-logout").click(function()
  {
    firebase.auth().signOut();  
});

$("#btn-update").click(function()
{
    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    var region = $("#region").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!="" && lName!="" && region!="") 
    {
        var userData = 
        {
            "firstName": fName,
            "lastName": lName,
            "region": region,
        };

        usersRef.set(userData, function(error)
            {
            if(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message: " + errorMessage);
            }
            else 
            {
                window.location.href = "mainPage.html";
            }
        });
    }
    else
    {
        window.alert("Please fill out all fields.");
    }
});

function switchView(view)
{
    $.get({
        url:view,
        catch: false,
    })
    .then(function(data){
        $("#container").html(data);
    });
}