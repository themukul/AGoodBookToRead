$(document).ready(function() {
    $('.final-add-book-btn').click(function() {
        var bookTitle = $('#book_title').val();
        var bookDesc = $('#book-desc').val();
        var moods = $('.add-book-mood-select select').val();
        var genre = $('.add-book-genre-select select').val();
//        var snapshot = Object.assign({}, getCurrentUserSnapshot());
//        var author = getCurrentUserSnapshot().val().firstName + " " + getCurrentUserSnapshot().val().lastName;
        var user = firebase.auth().currentUser;
        var author;
        if (user != null) {
            var uid = user.displayName;
            var userRef = firebase.database().ref('/users/' + uid);
            userRef.once('value').then(function(snapshot) {
                //            console.log('inside getCurrentUserSnapshot');
                //            console.log(snapshot.val());
                author = snapshot.val().firstName + " " + snapshot.val().lastName;
                console.log(author);
            });
        }
        
        console.log(bookTitle);    
        console.log(bookDesc);    
        console.log(moods);    
        console.log(genre);
//        console.log(author);
        setTimeout(function() {
            writeNewBook(bookTitle, bookDesc, moods, genre, author);
            
        }, 3000);
    });
    
});