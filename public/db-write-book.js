function writeNewBook(bookName, bookDesc, moods, genres, author){
    var dbRefBooks = firebase.database().ref().child('books');
    var newBookKey = bookName;
    var data = {
        bookName : bookName,
        author : author,
        bookDesc : bookDesc,
        moods : moods,
        genres : genres,
        stars : 0,
    }
    var updates = {};
    updates['/books/' + newBookKey] = data;
    firebase.database().ref().update(updates);
}
