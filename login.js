$(document).ready(function() {
    var loginUsername;
    var account;
    $('#submit').on('click',function(){
        var loginUsernameEntry = $("#uname").val();
        if(loginUsernameEntry === ""){
            return;
        }
        account = loginUsernameEntry;
        localStorage.setItem('user',loginUsernameEntry);
        window.location.href = 'map.html';
    });
});