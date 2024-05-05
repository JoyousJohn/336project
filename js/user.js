$(document).ready(function() {


    username = new URLSearchParams(window.location.search).get('user'); // Get username of user being viewed

    const userInfo = getBasicUserInfo(username)

    $('.viewing-username').text(username + "'s profile")
    $('.viewing-name').text(userInfo['name'])

})

// Get a user's info by their username
function getBasicUserInfo(username) {
    // imeplement whatever logic you want to return basic info about them

    return {
        'name': 'Orange'
    }

}