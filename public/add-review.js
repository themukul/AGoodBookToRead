$(document).ready(function() {
    $('.submit-review-btn').click(function() {
        var user = firebase.auth().currentUser;
        var uid;

        if (user != null) {
            uid = user.displayName;
        }
        var review = $('#review-textarea').val();
        console.log(review);
        var rev = '<li><div class="collapsible-header"><i class="material-icons">perm_identity</i>' + uid + '</div><div class="collapsible-body"><span>' + review + '</span></div></li>';
        $('.review-list').append(rev);
    });
});