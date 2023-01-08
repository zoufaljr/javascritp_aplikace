$(document).ready(function() {
    var activeUser = localStorage.getItem('user');
    console.log(activeUser);
    $('g').mouseenter(function() {
        var class_name =  $(this).attr('id');
        console.log(class_name);
        $('#'+ class_name).addClass('highlight');
      });
    $('g').mouseleave(function() {
        var class_name =  $(this).attr('id');
        console.log(class_name);
        $('#'+ class_name).removeClass('highlight');
    });
    $('path').mouseenter(function() {
        var class_name =  $(this).attr('id');
        console.log(class_name);
        $('#'+ class_name).addClass('highlight');
      });
    $('path').mouseleave(function() {
        var class_name =  $(this).attr('id');
        console.log(class_name);
        $('#'+ class_name).removeClass('highlight');
    });
});