$(document).ready(function() {

    $('.type-auction').click(function() {

        $('.type-selected').removeClass('type-selected')
        $(this).addClass('type-selected')

        $('.auction-inputs').removeClass('none')
        $('.bin-inputs').addClass('none')

    
    })

    $('.type-bin').click(function() {

        $('.type-selected').removeClass('type-selected')
        $(this).addClass('type-selected')
    
        $('.auction-inputs').addClass('none')
        $('.bin-inputs').removeClass('none')

    })

    $('.sell-add-image').click(function() {

        const imageCount = $('.sell-image-wrapper').children().length - 1 // -1 for the + div
        const maxImages = 8

        if (imageCount < 8) {

            const $newImg = $(`<div class="sell-img"></div>`)
            $newImg.css('background-image', `url('https://picsum.photos/500/550?${imageCount}')`)

            $('.sell-image-wrapper > :last-child').before($newImg);

            if (imageCount === 7) {

                $('.sell-add-image').hide(); // Don't allow more than 8 images

            }

        }

    })

})

