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
        setTimeout(function() {
            first_name = $('#first_name').val();
            last_name = $('#last_name').val();
            user_name = $('#user_name').val();
            ac_type = $('.select-menu select').val();
            
//            displayName = first_name + " " + last_name;
            
            console.log(first_name);
            console.log(last_name);
            console.log(ac_type);
            console.log(user_name);
            
            var CurrUser = firebase.auth().currentUser;
            
            CurrUser.updateProfile({
                displayName : user_name,
            }).then(function() {
                // Update successful.
                console.log('Profile Updated');
//                console.log(CurrUser);
            }).catch(function(error) {
                // An error happened.
                console.log(error);
            });
            
            writeUserData(first_name, last_name, user_name, ac_type);
            
        }, 3000);
            
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
    
    $('.show-all-books-btn').click(function() {
        getAllBooks();
    });
    
    $('.apply-filer-btn').click(function() {
        getAllBooks();
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
      window.location.assign("profile.html");
    // User is signed in.
      console.log('Observer -- Signed In');
      $('.signout-btn').css('display', 'inline-block');
      $('.view-profile-btn').css('display', 'inline-block');
//      var userType = accountType(user);
//      if(userType == "Author"){
//            $('.add-book-btn').css('display', 'inline-block');
//         }
  } else {
    // No user is signed in.
      console.log('Observer -- No Sign In');
//      Materialize.toast('You have logged out!', 3000);
      $('.signout-btn').css('display', 'none');
      $('.view-profile-btn').css('display', 'none');
//      $('.add-book-btn').css('display', 'none');
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

function writeUserData(firstName, lastName, userName, acType){
    var dbRefUser = firebase.database().ref().child('users');
//    var newUserKey = dbRefUser.push().key;
    var newUserKey = userName;
    var data = {
        user_id : newUserKey,
        firstName : firstName,
        lastName : lastName,
        acType : acType,
        favs : []
    }
    
    var updates = {};
    updates['/users/' + newUserKey] = data;
    firebase.database().ref().update(updates);
}

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

//function writeUserData(firstName, lastName, userName){
//    var dbRefUser = firebase.database().ref().child('users');
//    var newUserKey = userName;
//    var data = {
//        user_id : newUserKey,
//        firstName : firstName,
//        lastName : lastName
//    }
//    
//    var updates = {};
//    updates['/users/' + newUserKey] = data;
//    firebase.database().ref().update(updates);
//}
//
//function writeAuthorData(firstName, lastName, userName){
//    var dbRefAuthor = firebase.database().ref().child('authors');
//    var newAuthorKey = userName;
//    var data = {
//        author_id : newAuthorKey,
//        firstName : firstName,
//        lastName : lastName
//    }
//    
//    var updates = {};
//    updates['/authors/' + newAuthorKey] = data;
//    firebase.database().ref().update(updates);
//}

//setTimeout(function() {
    function accountType(user){
        var uid = user.displayName;
        var userRef = firebase.database().ref('/users/' + uid);
        userRef.once('value').then(function(snapshot) {
            return snapshot.val().acType;   
        });
    }            
//}, 5000);

function getCurrentUserSnapshot(){
    var user = firebase.auth().currentUser;
    if (user != null) {
        var uid = user.displayName;
        var userRef = firebase.database().ref('/users/' + uid);
        userRef.once('value').then(function(snapshot) {
            console.log('inside getCurrentUserSnapshot');
            var snap = snapshot.val();
//            console.log(JSON.stringify(snap));
            console.log(snap);
//            console.log(snapshot.val());
//            console.log(JSON.stringify(snapshot.val()));
                return snap;
        });
    }
}



function getAllBooks(){
    var dbRefBooks = firebase.database().ref().child('books');
    
    var moodsFilterArray = $('.filter-mood-select select').val();
    var genreFilterArray = $('.filter-genre-select select').val();
    
    dbRefBooks.on('value', function(snapshot) {
//        console.log(Object.values(snapshot.val()));
        //$('.books-div').text(JSON.stringify(snapshot.val(), null, 3));
        var arrayOfBooks = Object.values(snapshot.val());
        var cards = " ";
        
        for(var i = 0 ; i < arrayOfBooks.length ; i++){
            
            var flag = 0;
            
            if(moodsFilterArray.length != 0){
                for(var j = 0 ; j < moodsFilterArray.length ; j++){
                    for(var k = 0 ; k < arrayOfBooks[i].moods.length ; k++){
                        if(moodsFilterArray[j] == arrayOfBooks[i].moods[k]){
                            cards += '<div class="col s4">'
                            cards += '<div class="card blue-grey darken-1">';
                            cards += '<div class="card-content white-text">';
                            cards += '<span class="card-title">' + arrayOfBooks[i].bookName + '</span>';
                            cards += '<p>' + arrayOfBooks[i].bookDesc + '</p>';
                            cards += '</div>';
                            cards += '<div class="card-action">';
                            cards += '<a class="btn card-action-fav" onclick="addFav(this)">Favourite</a>';
                            cards += '<a class="btn card-action-star" onclick="updateStar(this)">Star</a>';
                            cards += '</div>';
                            cards += '</div>';
                            cards += '</div>';
                            flag = 1;
                            break;
                        }
                    }
                    if(flag == 1){
                        break;
                    }
                }
            }
            
            if(genreFilterArray.length != 0){
                if(flag != 1){
                    for(var j = 0 ; j < genreFilterArray.length ; j++){
                        for(var k = 0 ; k < arrayOfBooks[i].genres.length ; k++){
                            if(genreFilterArray[j] == arrayOfBooks[i].genres[k]){
                                cards += '<div class="col s4">'
                                cards += '<div class="card blue-grey darken-1">';
                                cards += '<div class="card-content white-text">';
                                cards += '<span class="card-title">' + arrayOfBooks[i].bookName + '</span>';
                                cards += '<p>' + arrayOfBooks[i].bookDesc + '</p>';
                                cards += '</div>';
                                cards += '<div class="card-action">';
                                cards += '<a class="btn card-action-fav" onclick="addFav(this)">Favourite</a>';
                                cards += '<a class="btn card-action-star" onclick="updateStar(this)">Star</a>';
                                cards += '</div>';
                                cards += '</div>';
                                cards += '</div>';
                                flag = 1;
                                break;
                            }
                        }
                        if(flag == 1){
                            break;
                        }
                    }
                }
            }
            
            if(moodsFilterArray.length == 0 && genreFilterArray.length == 0){
                cards += '<div class="col s4">'
                cards += '<div class="card blue-grey darken-1">';
                cards += '<div class="card-content white-text">';
                cards += '<span class="card-title">' + arrayOfBooks[i].bookName + '</span>';
                cards += '<p>' + arrayOfBooks[i].bookDesc + '</p>';
                cards += '</div>';
                cards += '<div class="card-action">';
                cards += '<a class="btn card-action-fav" onclick="addFav(this)">Favourite</a>';
                cards += '<a class="btn card-action-star" onclick="updateStar(this)">Star</a>';
                cards += '</div>';
                cards += '</div>';
                cards += '</div>';
                
            }
        }
        //console.log(cards);
        $('.books-div').html(cards);
    });
}

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
