$(document).ready(function() {

    // Highlight search bar border when clicked
    $('.search-input').on('focus', function() {
        $('.search-form').css('border-color', 'blue')
    })
    
    // Remove search bar border when unfocussed
    $('.search-input').on('blur', function() {
        $('.search-form').css('border-color', 'gray')
    })

})