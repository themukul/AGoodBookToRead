$(document).ready(function() {
    $('.view-profile-btn').click(function() {
        var user = firebase.auth().currentUser;

        if (user != null) {
            var uid = user.displayName;
            var userRef = firebase.database().ref('/users/' + uid);
            userRef.once('value').then(function(snapshot) {
                $('.modal-name').text("Hello " + snapshot.val().firstName + " " + snapshot.val().lastName);
               // $('.modal-email').text(snapshot.val().email);
                $('.modal-account-type').text(snapshot.val().acType);
                
                var favs = snapshot.val().favs;
                var dbRefBooks = firebase.database().ref().child('books');
                dbRefBooks.on('value', function(shot) {
                    var arrayOfBooks = Object.values(shot.val());
                    var cards = " ";
                    
                    for(var i = 0 ; i < favs.length ; i++){
                        for(var j = 0 ; j < arrayOfBooks.length ; j++){
                            if(favs[i] == arrayOfBooks[j].bookName){
                                cards += '<div class="col s6">'
                                cards += '<div class="card indigo lighten-1 hoverable">';
                                cards += '<div class="card-content white-text">';
                                cards += '<span class="card-title">' + arrayOfBooks[i].bookName + '</span>';
                                cards += '<span class="card-author"> by ' + arrayOfBooks[i].author + '</span>';
                                cards += '<br /><br />';
                                cards += '<p class="truncate">' + arrayOfBooks[i].bookDesc + '</p>';
                                cards += '</div>';
                                cards += '<div class="card-action">';
                                cards += '<a class="btn-floating btn-small waves-effect waves-light card-action-fav" onclick="addFav(this)"><i class="material-icons">favorite_border</i></a>&nbsp&nbsp';
                                cards += '<a class="btn-floating btn-small waves-effect waves-light card-action-star" onclick="updateStar(this)"><i class="material-icons">star_border</i></a>&nbsp&nbsp';
                                cards += '<a class="btn-floating btn-small waves-effect waves-light card-action-book-details modal-trigger" href="#book-modal" onclick="openBook(this)"><i class="material-icons">open_in_new</i></a>';
                                cards += '</div>';
                                cards += '</div>';
                                cards += '</div>';
                                break;
                                
                            }
                        }
                    }
                    
                    //console.log(cards);
                    if(favs.length == 0){
                        $('.modal-fav-books').text('You can favourite books!')    
                    }else{
                        $('.modal-fav-books').html(cards);
                    }
                });
            });
        }
    });
});