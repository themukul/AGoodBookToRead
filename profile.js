firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
//      window.location.assign("profile.html");
    // User is signed in.
      console.log('Observer -- Signed In');
      $('.signout-btn').css('display', 'inline-block');
      $('.view-profile-btn').css('display', 'inline-block');
//      var userType = accountType(user);
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
