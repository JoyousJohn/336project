$(document).ready(function() {

    const users = getFakeUsers()

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

        $('.managing-user').removeClass('managing-user')
        const name = $(this).attr('username')
        $(`div[username="${name}"]`).addClass('managing-user')
        $('.user-management-example').hide().insertAfter($(`div[username="${name}"]`).last()).slideDown();

        // Fill in input placeholders
        $('.change-username-input').attr('placeholder', name).val('')
        $('.change-name-input').attr('placeholder', users[name].name).val('')
        $('.change-email-input').attr('placeholder', users[name].email).val('')
        $('.change-password-input').attr('placeholder', '*****...').val('')

    })

    $('.user-management-example').hide();

})

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