firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
//      window.location.assign("profile.html");
    // User is signed in.
//      console.log(user);
      console.log('Observer -- Signed In');
        var acc = firebase.auth().currentUser;
//        console.log(user);
        if (acc != null) {
            var uid = acc.displayName;
            var userRef = firebase.database().ref('/users/' + uid);
            userRef.once('value').then(function(snapshot) {
                var name = snapshot.val().firstName + " " + snapshot.val().lastName;
//                setTimeout(function() {
                    var message = 'Welcome ' + name + '!';
                    console.log(message);
                    Materialize.toast(message, 3000);
                    
//                }, 2000);
            });
        }
   
      $('.signout-btn').css('display', 'inline-block');
      $('.view-profile-btn').css('display', 'inline-block');
//      var accType = accountType(user);
//      if(userType == "Author"){
//            $('.add-book-btn').css('display', 'inline-block');
//         }
  } else {
      window.location.assign("index.html");
    // No user is signed in.
      console.log('Observer -- No Sign In');
      $('.signout-btn').css('display', 'none');
      $('.view-profile-btn').css('display', 'none');
//      $('.add-book-btn').css('display', 'none');
  }
});

