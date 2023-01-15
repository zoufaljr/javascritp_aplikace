$(document).ready(function() {
    var activeUser = localStorage.getItem('mapperuser');
    var countriesList;
    var selectedCountries = JSON.parse(localStorage.getItem('mapperdata'));
    var leaderboard ={};

    if(selectedCountries == null) {
      selectedCountries = {};
    }
    let userExists = selectedCountries.hasOwnProperty(activeUser);
    if (!userExists) {
        selectedCountries[activeUser] = { visitedCountries: [] }
    } 

    /**
     * Ajax method for loading CSV, which is later used to display name
     * of country over which is user hovering.
     * Highlightning countries already picked by user whe application is loaded.
     * Sorting leaderboard of other users and than populating it.
     */
    $.get('data/mapping.csv', function(data) {
        countriesList = $.csv.toObjects(data);
        $('#count').html(selectedCountries[activeUser]['visitedCountries'].length);
        selectedCountries[activeUser]['visitedCountries'].forEach(function(country) {
          $('#' + country).addClass('picked');
        });
        leaderboard = Object.keys(selectedCountries).map(function(key) {
          return { name: key, size: selectedCountries[key]['visitedCountries'].length };
        });
        leaderboard.sort(function(a, b) {
          return b.size - a.size;
        });
        populateLeaderboard();
      });
      /**
       * Setting logged in user in top right corner.
       */
    $('#activeUser').html(activeUser);
    
    /**
     * When user clicks on country, which is defined by group <g> or <path> and 
     * corresponding ID, the element is than assigned class which highlightes the country,
     * the country is added to his list of picked of countries and all data are saved.
     */
    $('g,path').click(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#'+ class_name).addClass('picked');
            addToList(class_name);
            save();
        }
    });

    /**
     * When user hovers over country, which is defined by group <g> or <path> and 
     * corresponding ID, small box witch country full name is displayed next to users arrow.
     * And countries SVG slightly changes color.
     */
    $('g,path').mouseenter(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#mouseBox').show();
            $('#'+ class_name).addClass('highlight');
            $('#mouseBox').html(getCountryName(class_name));
        }
      });

    /**
     * When users stops hovering over country, which is defined by by group <g> or <path> and 
     * corresponding ID, small box and highlightning are removed.
     */
    $('g,path').mouseleave(function() {
        var class_name =  $(this).attr('id');
        if(class_name != undefined){
            $('#'+ class_name).removeClass('highlight');
            $('#mouseBox').hide();
        }
    });
    /**
     * This functions changes #mouseBox absolute position, so it follows users arrow.
     */

    $(document).mousemove(function(event) {
        $('#mouseBox').css({
          'top': event.pageY + 10,
          'left': event.pageX + 10
        });
      });

    /**
     * When user logs out from application, all content is saved.
     * userneme is removed from localstorage and
     * user is redirected to login page.
     */
    $('#logout').on('click',function(){   
        save();
        localStorage.removeItem('mapperuser');
        window.location.href = 'index.html';
    });

    /**
     * Function which handles saving data and during saving
     * sorts leaderboard and populates it.
     */
    function save(){
        var appData = JSON.stringify(selectedCountries);
        localStorage.setItem('mapperdata',appData);
        leaderboard = Object.keys(selectedCountries).map(function(key) {
          return { name: key, size: selectedCountries[key]['visitedCountries'].length };
        });
        leaderboard.sort(function(a, b) {
          return b.size - a.size;
        });
        populateLeaderboard();
    }

    /**
     * Function which return country full name by given code of country.
     */
    function getCountryName(code) {
      if(countriesList != undefined){
        var country = countriesList.find(function(arr) {
          return arr.Country_Code === code;
        });
      }
        if(country == null){
          return;
        }
        return country.Country_Name;
    }
    
    /**
     * Function adds new country to user's array of countries, if user already has this country, 
     * it is removed and highlightning class is also removed.
     */
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
        $('#count').html(selectedCountries[activeUser]['visitedCountries'].length);
      }

      /**
       * Function which populates leaderboard with top 4 user by picked countries,
       * if there is less users is app, then the fewer users is displayed.
       */
      function populateLeaderboard(){
        var ol = $("#users");
        ol.empty();
        let keys = Object.keys(leaderboard);
        let n;
        if(keys.length >= 4){
          n = 4;
        }else{
          n = keys.length;
        }
        
        for(let i = 0; i < n ; i++){
            let li1 = $("<li>");
            let name = $("<name>").text(leaderboard[keys[i]].name);
            li1.append(name);
            let br = $("<br>");
            li1.append(br);
            let size = $("<size>").text(leaderboard[keys[i]].size);
            li1.append(size);
            ol.append(li1);
        }
    }
});
