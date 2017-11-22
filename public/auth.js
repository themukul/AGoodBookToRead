var email;
var password;
var first_name;
var last_name;
var ac_type;

$(document).ready(function() {
    
    //Sign Up - New Account
    $('.signup-btn').click(function() {
        email = $('.sign-up-form #email').val();
        password = $('.sign-up-form #password').val();
        
        console.log(email);
        console.log(password);
        
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
        });
        
        //Update Personal Details
        
//        $('.ok-btn').click(function() {
            first_name = $('#first_name').val();
            last_name = $('#last_name').val();
            ac_type = $('.select-menu select').val();
            
            var CurrUser = firebase.auth().currentUser;
            
            CurrUser.updateProfile({
                firstName : first_name,
                lastName : last_name,
                acType : ac_type
            }).then(function() {
                // Update successful.
                console.log('Profile Updated');
            }).catch(function(error) {
                // An error happened.
                console.log(error);
            });
//        });
        
        
    });
    
    //Log In - Alerady Registered
    $('.login-btn').click(function() {
        email = $('.log-in-form #email').val();
        password = $('.log-in-form #password').val();
        
        console.log(email);
        console.log(password);
        
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(error);
        }); 
    });
    
    //Sign Out
    $('.signout-btn').click(function() {
        
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log('Sign out -- Signed Out');
        }).catch(function(error) {
            // An error happened.
            console.log(error);
        });
        
    });
    
    
});

//$(document).ready(function() {
//    $('.login-btn').click(function() {
//        email = $('#email').val();
//        password = $('#password').val();
//        
//        console.log(email);
//        console.log(password);
//        
//        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//            // Handle Errors here.
//            var errorCode = error.code;
//            var errorMessage = error.message;
//            // ...
//            console.log(error);
//        });        
//    });
//});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
      console.log('Observer -- Signed In');
      $('.signout-btn').css('display', 'inline-block');
  } else {
    // No user is signed in.
      console.log('Observer -- No Sign In');
      $('.signout-btn').css('display', 'none');
  }
});

//$(document).ready(function() {
//    $('.signout-btn').click(function() {
//        
//        firebase.auth().signOut().then(function() {
//            // Sign-out successful.
//            console.log('Sign out -- Signed Out');
//        }).catch(function(error) {
//            // An error happened.
//            console.log(error);
//        });
//
//    });
//});
        