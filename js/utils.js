let isLoggedIn = getIsLoggedIn(); // Global var that holds if the user is logged in. Functions will check this to know what to display on the screen.

// This code runs once the page is done loading
$(document).ready(function() {

    updateSide()

})

// Sets sidebar text to "Profile" or "Login" dependending on the global isLoggedIn var
function updateSide() {

    // Show menu for logged in users
    if (isLoggedIn) {
        $('.sidebar-profile > .txt').text('Profile')
        $('.navbar-bell').removeClass('none')
    }

    // If the user is not logged in only show the login menu
    else if (!isLoggedIn) {
        $('.sidebar-profile > .txt').text('Login')
        $('.navbar-bell').addClass('none')
    }

}


// Function that checks if the user is logged in and returns a boolean
// Implement a get request to JSP here that checks session attribute
function getIsLoggedIn() {
    return true;
    // return false
}

// Helper function that updates isLoggedIn global var and visual elements without needing to call multiple functions manually
function updateIsLoggedIn(newLogin) {
    if (typeof newLogin !== 'boolean') { console.log("updateIsLoggedIn() parameter wasn't a boolean!"); return }

    isLoggedIn = newLogin
    updateSide()
}

// Testing purposes
function getFakeUser() {
    return {
        'username': 'deymious',
        'nickname': 'JAF',
        'email': 'whatever@idc.com',
    }
}

// Set main content left margin since sidebar is fixed

$(document).ready(function() {
    $('.main').css('margin-left', $('.sidebar').width() + 'px') 
})