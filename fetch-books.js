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
