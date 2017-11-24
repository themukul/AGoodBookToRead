$(document).ready(function() {
    getAllBooks();
    
    $('.apply-filer-btn').click(function() {
        getAllBooks();
    });
});