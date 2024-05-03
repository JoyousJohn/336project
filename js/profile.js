$(document).ready(function() {

    // If the user is not logged in then redirect to login.html
    if (!isLoggedIn) {
        window.location.href = 'login.html';
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