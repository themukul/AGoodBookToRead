$(document).ready(function() {
    $('.view-profile-btn').click(function() {
        var user = firebase.auth().currentUser;

        if (user != null) {
            var uid = user.displayName;
            var userRef = firebase.database().ref('/users/' + uid);
            userRef.once('value').then(function(snapshot) {
                $('.modal-name').text(snapshot.val().firstName + " " + snapshot.val().lastName);
               // $('.modal-email').text(snapshot.val().email);
                $('.modal-account-type').text(snapshot.val().acType);    
            });
        }
    });
});