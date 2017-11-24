function openBook(bla){
    console.log('inside open book');
    var bookName = $(bla).parent().parent().children('.card-content').children('.card-title').text();
    console.log(bookName);
    var starCount;
    var authorName;
    var bookDesc;
    //current
//    var user = firebase.auth().currentUser;

//        if (user != null) {
//            var uid = user.displayName;
//            var userRef = firebase.database().ref('/users/' + uid);
//            userRef.once('value').then(function(snapshot) {
//                $('.modal-name').text(snapshot.val().firstName + " " + snapshot.val().lastName);
//               // $('.modal-email').text(snapshot.val().email);
//                $('.modal-account-type').text(snapshot.val().acType);    
//            });
//        }
    var bookRef = firebase.database().ref('/books/' + bookName);
    bookRef.once('value').then(function(snapshot) {
        starCount = snapshot.val().stars;
        authorName = snapshot.val().author;
        bookDesc = snapshot.val().bookDesc;
    });
    
    setTimeout(function() {
        
    $('.book-modal-name').text(bookName);
    $('.book-modal-author').text("-by " + authorName);
    $('.book-modal-description').text(bookDesc);
    $('.book-modal-star span').text(starCount);
    }, 2000);
}
