$(document).ready(function() {

    const listingData = getExampleListingData()

    const uuid = new URLSearchParams(window.location.search).get('uuid'); // SQL primary key for the auction data
    // const listingData = getItemData(uuid) // uncomment this once getItemData() is implemented


    $('.listing-title').text(listingData['title'])
    $('.listing-description').text(listingData['description'])

    $('.winning-price').text('US $' + listingData['winningPrice'])

    $('.bids-count').text(listingData['bids'].length + ' bids')
    $('.ends-in').text('Ends in ' + listingData['endsIn'])

    $('.listing-condition').text(listingData['condition'])

    for (let i = 0; i < listingData['imageCount']; i++) {

       const $galleryImg = $(`<div class="gallery-img"></div>`)

       $galleryImg.css('background-image', `url('https://picsum.photos/500/550?${i}')`)

       $('.img-gallery').append($galleryImg)

    }

})

// Get auction info from the auction table in SQL via JSP via uuid primary key
function getItemData(uuid) {

    $.ajax({
        type: 'GET',
        url: 'get_auction_info', // change this as you wish
        success: function(response) {
            return response.data;
        },
        error: function(xhr, status, error) {
            console.error('Error getting auction data:', error);
        }
    });

}

function getExampleListingData() {

    return {
        'title': 'Vintage Running Shoe',
        'winningPrice': 24.73,
        'endsIn': '12h 18m 4s',
        'condition': 'Used',
        'imageCount': 6,

        'description': `Step back in time with these classic vintage running shoes! These retro kicks boast timeless style and are perfect for sneakerheads and collectors alike. Crafted with quality materials and featuring a comfortable design, they're not just a fashion statement but a piece of history. Whether you're hitting the pavement or adding to your collection, these sneakers are sure to turn heads. Don't miss out on owning a piece of nostalgia - bid now!`,

        'bids': [
            {
                'bidder': 'username2',
                'price': 24.73
            },
            {
                'bidder': 'username1',
                'price': 10.00
            }
        ]
    }

}