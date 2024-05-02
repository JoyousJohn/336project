$(document).ready(function() {

    // If the user is not logged in show the login/sign up menu
    if (!isLoggedIn) {
        showLogin()
    }

    // If the user is logged in, show their profile info
    else {

        // Get request user data here
        const userData = getFakeUser()

        console.log(userData)

        $('.profile-username').text(userData.username)
        $('.profile-email').text(userData.email)

    }

})