$(document).ready(function() {
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