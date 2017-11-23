function updateStar(bla){
    console.log('inside update star');
    var bookName = $(bla).parent().parent().children('.card-content').children('.card-title').text();
    console.log(bookName);
    var starCount;
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
    });
    setTimeout(function() {
        console.log(starCount);
        //updating
        starCount += 1;
        console.log(starCount);
        //    var dbRefBooks = firebase.database().ref().child('books');
        var bookKey = bookName;
//        var data = {
//            stars : starCount,
//        }
//        var updates = {};
//        updates['/books/' + bookKey + '/stars'] = data;
//        firebase.database().ref().update(updates);
        firebase.database().ref('/books/' + bookKey + '/stars').set(starCount);
    }, 5000);
}

function addFav(bla){
    console.log('inside add fav');
    var bookName = $(bla).parent().parent().children('.card-content').children('.card-title').text();
    var user = firebase.auth().currentUser;
    var favsArray;
    if (user != null) {
        var uid = user.displayName;
        var userRef = firebase.database().ref('/users/' + uid);
        userRef.once('value').then(function(snapshot) {
            favsArray = snapshot.val().favs;
        });
    }
    setTimeout(function() {
        console.log('old array ' + favsArray);
        if(favsArray == undefined){
            favsArray = [bookName];
        }else{
            favsArray.push(bookName);
        }
        console.log('new array ' + favsArray);
        var userKey = user.displayName;
        //    var data = {
        //        favs : favsArray
        //    }
        //    var updates = {};
        //    updates['/users/' + userKey] = data;
        firebase.database().ref('/users/' + userKey + '/favs').set(favsArray);
    }, 5000);
}
