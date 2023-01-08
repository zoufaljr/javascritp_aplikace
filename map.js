$(document).ready(function() {
    var activeUser = localStorage.getItem('user');
    var countriesList;
    let parsed = localStorage.getItem('data');
    var selectedCountries = JSON.parse(parsed);

    

    let userExists = selectedCountries.hasOwnProperty(activeUser);
    if (!userExists) {
        selectedCountries[activeUser] = { visitedCountries: [] }
    }   
    selectedCountries[activeUser]['visitedCountries'].forEach(function(country){
        $('#' + country).addClass('picked');
    });
    
     
    $('#activeUser').html(activeUser);

    $.get('/mapping.csv', function(data) {
        countriesList = $.csv.toObjects(data);
    });

    $('g,path').click(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#'+ class_name).addClass('picked');
            addToList(class_name);
        }
    });

    $('g,path').mouseenter(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#mouseBox').show();
            $('#'+ class_name).addClass('highlight');
            $('#mouseBox').html(getCountryName(class_name));
        }
      });
    $('g,path').mouseleave(function() {
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

    $('#logout').on('click',function(){
        var appData = JSON.stringify(selectedCountries);
        localStorage.setItem('data',appData);
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });

    function getCountryName(code) {
        var country = countriesList.find(function(arr) {
          return arr.Country_Code === code;
        });
        return country.Country_Name;
      };
    
      function addToList(id) {
        if (selectedCountries == null) {
          selectedCountries = {};
        }
        if (!selectedCountries.hasOwnProperty(activeUser)) {
          selectedCountries[activeUser] = { visitedCountries: [] }
        }
        let index = selectedCountries[activeUser]['visitedCountries'].indexOf(id);
        if (index === -1) {
          selectedCountries[activeUser]['visitedCountries'].push(id);
        } else {
          selectedCountries[activeUser]['visitedCountries'].splice(index, 1);
          $('#'+ id).removeClass('picked');
        }
        console.log(selectedCountries);
      }
});

