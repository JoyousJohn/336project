$(document).ready(function() {

    $('.sidebar-item:not(.sidebar-selected)').click(function() {
        $('.sidebar-selected').removeClass('sidebar-selected')
        $('.this').addClass('sidebar-selected')
    })

    $('.search-input').on('focus', function() {
        $('.search-form').css('border-color', 'blue')
    })
    
    $('.search-input').on('blur', function() {
        $('.search-form').css('border-color', 'gray')
    })
})