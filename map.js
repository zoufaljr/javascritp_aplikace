$(document).ready(function() {
    var activeUser = localStorage.getItem('user');
    var countriesList;
    console.log(activeUser);
    $('#activeUser').html(activeUser);

    $.get('/mapping.csv', function(data) {
        countriesList = $.csv.toObjects(data);
    });

    $('g').mouseenter(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#mouseBox').show();
            $('#'+ class_name).addClass('highlight');
            $('#mouseBox').html(getCountryName(class_name));
        }
      });

    $('g').mouseleave(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#'+ class_name).removeClass('highlight');
            $('#mouseBox').hide();
        }
    });

    $('path').mouseenter(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#mouseBox').show();
            $('#'+ class_name).addClass('highlight');
            $('#mouseBox').html(getCountryName(class_name));
        }
      });
    $('path').mouseleave(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#'+ class_name).removeClass('highlight');
            $('#mouseBox').hide();
        }
    });

    $(document).mousemove(function(event) {
        $('#mouseBox').css({
          'top': event.pageY + 10,
          'left': event.pageX + 10
        });
      });

    function getCountryName(code) {
        var country = countriesList.find(function(arr) {
          return arr.Country_Code === code;
        });
        return country.Country_Name;
      };

});

