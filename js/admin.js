let selectedUser // Holds the currently selected user

$(document).ready(function() {

    // If the user isn't an admin return them back to home page
    if (!isAdmin()) {
        window.location.href = 'index.html';
    }

    const users = getFakeUsers()
    // const users = getUsers() // Uncomment this once JSP endpoint is integrated

    for (let userKey in users) {

        user = users[userKey]
        user['username'] = userKey

        const $userElm = `
            <div username="${user.username}">${user.username}<span class="user-role user-role-${user.role}">${user.role}</span></div>
            <div username="${user.username}">${user.name}</div>
            <div username="${user.username}">${user.email}</div>
        `

        $('.user-list').append($userElm)

    }

    $('.manage-users').text(`Manage users (${Object.keys(users).length})`)

    // Highlight in blue on hover
    $('.user-list > div:not(.list-head)').hover(function() {
        const name = $(this).attr('username')
        $(`div[username="${name}"]`).addClass('user-hover')
    // Unhover
    }, function() {
        const name = $(this).attr('username')
        $(`div[username="${name}"]`).removeClass('user-hover')
    })

    // Show user management options when a user is clicked
    $('.user-list > div:not(.list-head)').click(function() {

        const name = $(this).attr('username')
        if (selectedUser && name === selectedUser.username) return

        $('.managing-user').removeClass('managing-user')
        selectedUser = users[name]
        $(`div[username="${name}"]`).addClass('managing-user')

        $('.manage-col-selected').removeClass('manage-col-selected')
        $('.manage-info-wrap, .manage-danger-wrap').hide(); // Hide all wrapper
        $('.manage-info-wrap').show();
        $('.manage-account-info').addClass('manage-col-selected')
        
        $('.user-management-example').hide().insertAfter($(`div[username="${name}"]`).last()).slideDown();

        // Fill in input placeholders
        $('.change-username-input').attr('placeholder', name).val('')
        $('.change-name-input').attr('placeholder', users[name].name).val('')
        $('.change-email-input').attr('placeholder', users[name].email).val('')
        $('.change-password-input').attr('placeholder', '*****...').val('')
        $('.change-role-input').val(users[name].role.toLowerCase()) // Change selected role to current role

        // If error message telling user they didn't change anything is showing, clear it and reset the button to "Save changes"
        // no-changes just makes the background red and sets cursor to default
        $('.save-changes').text("Save changes").removeClass('no-changes')

        // Remove any delete confirmation from past users being deleted
        $('.delete-user-btn').removeClass('delete-confirming').css('cursor', 'pointer').text('Delete user')
        $('.no-undone').hide();

    })

    $('.user-management-example').hide();

    // If error message telling user they didn't change anything is showing, clear it and reset the button to "Save changes"
    // no-changes just makes the background red and sets cursor to default
    $('.manage-info input').click(function() {
        $('.save-changes').text("Save changes").removeClass('no-changes')
    })  

    // Remove button message saying "Please fill in all fields!"
    $('.create-user-form input').click(function() {
        $('.create-user-confirm').text("Create New User").removeClass('create-user-error')
    }) 

    // Show create new user input form when new user button is clicked
    $('.create-user').click(function() {

        if ($('.create-user-form').is(':visible')) {
            $('.create-user-form').slideUp();
            return
        }

        $(this).addClass('create-user-expanded')
        $('.create-user-form').removeClass('none').hide().slideDown();

    })

    $('.manage-columns > div').click(function() {
   
        if ($(this).hasClass('manage-col-selected')) return;

        $('.manage-col-selected').removeClass('manage-col-selected')
        $(this).addClass('manage-col-selected')

        $('.manage-info-wrap, .manage-danger-wrap').hide(); // Hide all wrapper

        const managing = $(this).attr('managing')
        console.log(managing)
        $(`.${managing}-wrap`).show().removeClass('none');

    })

    $('.delete-user-btn').click(function() {

        const isConfirming = $(this).hasClass('delete-confirming') // require a 2nd confirmation 

        // Ask admin/rep to confirm first
        if (!isConfirming) {
           $(this).text('Confirm Deletion').addClass('delete-confirming')
           $('.no-undone').removeClass('none').hide().fadeIn('fast');
           return
        }

        // Actually delete the user
        else {
            $(this).text('Deleting user...').css('cursor', 'default')
            deleteUser(selectedUser.username)
        }

    })

})

// Delete this user from SQL via POST request.
function deleteUser(username) {

    $.ajax({
        type: 'POST',
        url: 'delete_user', // change this as you wish
        data: JSON.stringify(username),
        success: function(response) {
            // alert("User successfully deleted!") // For now just show an alert, will add some absolute/fixed button later
            $(`div[username="${username}"]`).remove();
            $('.user-management-example').slideUp();

        },

        // If there was an error deleting the user, like another admin already deleting it and the username no longer existing
        error: function(xhr, status, error) {
            console.error('Error deleting user:', status);
            $('.delete-user-btn').text('Error deleting user: ' +  status)
        }
    });

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

// Return all users from users table and their basic data via JSP endpoint
function getUsers() {

    $.ajax({
        type: 'GET',
        url: 'get_all_users', // change this as you wish
        success: function(response) {
            return response.data;
        },
        error: function(xhr, status, error) {
            console.error('Error getting users:', error);
        }
    });

}

// Function that runs when "Create New User" is pressed
function createNewUser() {

    const newUserUsername = $('.new-user-username').val()
    const newUserName = $('.new-user-name').val()
    const newUserEmail = $('.new-user-email').val()
    const newUserPassword = $('.new-user-password').val()
    const newUserRole = $('.new-user-role').val()

    let missingSomething = false

    // If a field isn't filled in tell the user and return
    if (newUserUsername === '' || newUserName === '' || newUserEmail === '' || newUserPassword === '' || newUserRole === '') {
        missingSomething = true
        $('.create-user-confirm').text('Please fill in all fields!').addClass('create-user-error')
        return
    }

    // Else send new account info to JSP
    else {

        const newUser = {
            'username': newUserUsername,
            'name': newUserName,
            'email': newUserEmail,
            'password': newUserPassword,
            'role': newUserRole
        }

        postNewUser(newUser)

    }
   

}

// Send create new user via admin panel post request to server
// This can be the same endpoint and logic as creating a new user on the profile/login/sign up page
function postNewUser(newUser) {

    $.ajax({
        type: 'POST',
        url: 'create_new_user', // change this as you wish
        data: JSON.stringify(newUser),
        contentType: 'application/json',

        success: function(response) {
            console.log('User created successfully');
            // We can show some visual element that the user was created successfully sometime later
        },
        error: function(xhr, status, error) {
            console.error('Error changing user data:', error);
            // Show error if there was one (i.e. username already exists)
            $('.create-user-confirm').text(status).addClass('create-user-error')
        }
    });

}

// Send changes to username, email, password, and/or role to server
function saveUserChanges() {

    const newUsername = $('.change-username-input').val()
    const newName = $('.change-name-input').val()
    const newEmail = $('.change-email-input').val()
    const newPassword = $('.change-password-input').val()
    const newRole = $('.change-role-input').val()

    let changes = {}

    // Only add user attributes that actually changed to the object that will be sent to server
    // Don't set the attributes if they're the same to the current one
    if (newUsername && newUsername !== selectedUser.username) {
        changes['username'] = newUsername
    }
    if (newName && newName !== selectedUser.name) {
        changes['name'] = newName
    }
    if(newEmail && newEmail !== selectedUser.email) {
        changes['email'] = newEmail
    }
    if(newPassword && newPassword !== selectedUser.password) {
        changes['password'] = newPassword
    }
    if(newRole && newRole.toUpperCase() !== selectedUser.role) {
        changes['role'] = newRole
    }

    // Prints only the changed properties in console
    console.table(changes)

    // If no changes tell the user they didn't change anything
    if (Object.keys(changes).length === 0) {
        $('.save-changes').text("You didn't make any changes!").addClass('no-changes')
        return
    }

    // Else, make an ajax post request to server with the new data!!
    postUserChanges(changes)

}

// MAKE A POST REQUEST TO JSP WITH OBJECT HOLDING USER ATTRIBUTES TO CHANGE!
// It only holds keys of the attributes that were actually changed, so make sure to loop them - don't change all!
// For example, if only username and name was changed, changesObj would be { 'username': 'newusername', 'name': 'newname' }
function postUserChanges(changesObj) {

    console.log(changesObj)
    // Prints something like: Object { username: "newusername", email: "newemail", role: "admin" } with whatever data was changed

    $.ajax({
        type: 'POST',
        url: 'change_user_data', // change this as you wish
        data: JSON.stringify(changesObj),
        contentType: 'application/json',

        success: function(response) {
            console.log('User data changed successfully!');
            // Change the button with the confirmation message
            $('.save-changes').text(response.message) // response.something, depends how you implement it
        },
        error: function(xhr, status, error) {
            console.error('Error changing user data:', error);
            // Show the error on the button if there was one
            $('.save-changes').text(status).addClass('.no-change')
        }
    });


}

// Get some test users until JSP implementation
function getFakeUsers() {

    const users = {
        'happyjohn': {
          'name': 'Happy J',
          'email': 'j.hoppy@rutger.edu',
          'role': 'ADMIN'
        },
        'tatijoli': {
          'name': 'Tatiana',
          'email': 'jolitati@joli.tati',
          'role': 'REP'
        },
        'doblonick': {
          'name': 'Nick',
          'email': 'doblo.nick@dey.mious',
          'role': 'USER'
        },
        'rosebryan': {
          'name': 'Bryan',
          'email': 'president@linkedin.com',
          'role': 'USER'
        },
        'agarcia': {
          'name': 'Antonio',
          'email': 'hill218@center.rut',
          'role': 'REP'
        }
    }

    return users


}