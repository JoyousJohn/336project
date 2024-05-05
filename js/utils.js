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

    if (!isAdmin()) {
        $('.sidebar-admin').remove();
    }

}


// Function that checks if the user is logged in and returns a boolean
// First checks if a loggedIn parameter was set in the url (i.e. .../index.html?loggedIn=true)
// Implement a get request to JSP here that checks session attribute
function getIsLoggedIn() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (urlParams.has('loggedIn')) {
        return urlParams.get('loggedIn') === 'true';
    } else {
        return true;
        // return false
    }    
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

// Checks if an object has any empty values
// Used when checking if any inputs were left unset when attempting to publish a new listing
function hasEmptyValues(obj) {
    const values = Object.values(obj);
    return values.some(value => value === '' || value === null || value === undefined);
}

// Get a random UUID
function generateUUID() {
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  
    return uuid;
}  


// Implement JSP endpoint that checks if session username is "admin"
function isAdmin() {

    return true // For now, remove this line once JSP integrated

    // $.ajax({
    //     type: 'GET',
    //     url: 'is_admin', // change this as you wish
    //     success: function(response) {
    //         return response.data === 'true';
    //     },
    //     error: function(xhr, status, error) {
    //         console.error('Error getting users:', error);
    //         return 'error'
    //     }
    // });

}