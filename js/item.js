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
    $('.listing-category').text(listingData['category'])
    $('.listing-seller').text(listingData['seller']).attr('href', 'user.html/' + listingData['seller'])

    for (let i = 0; i < listingData['imageCount']; i++) {

       const $galleryImg = $(`<div class="gallery-img"></div>`)

       $galleryImg.css('background-image', `url('https://picsum.photos/500/550?${i}')`)

       $('.img-gallery').append($galleryImg)

    }

    listingData['bids'].forEach(bid => {

        const $bidElm = $(`
        <a href="/user.html/${bid.bidder}">${bid.bidder}</a>
        <div>$${bid.maxBid}</div>
        <div>${bid.bidTimeString}</div>
        `)

        $('.bid-breakdown').append($bidElm)

    })

    const $startPriceElm = $(`
        <div>Start Price</div>
        <div>$${listingData.startPrice}</div>
        <div>${listingData.startTime}</div>
    `)

    $('.bid-breakdown').append($startPriceElm)

    addAVew()

    $('.bid-price-input').val('')

    $('.secret-bidding-word').click(function() {

        $(this).hide();
        $('.secret-bidding-wrapper').hide().removeClass('none').slideDown('fast').find('input').val('')

    })

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

// Add +1 view to the item in the auctions table with input uuid
function addAVew(uuid) {

    $.ajax({
        type: 'POST',
        url: 'add_view', // change this as you wish
        data: JSON.stringify(uuid),
        contentType: 'application/json',
    });

}

function getExampleListingData() {

    return {
        'title': 'Vintage Running Shoe',
        'winningPrice': 24.73,
        'endsIn': '12h 18m 4s',
        'condition': 'Used',
        'imageCount': 6,
        'category': 'Running',
        'startPrice': 8.53,
        'startTime': 'May 2, 2024, 4:28 AM',
        'seller': 'randomorange123',

        'description': `Step back in time with these classic vintage running shoes! These retro kicks boast timeless style and are perfect for sneakerheads and collectors alike. Crafted with quality materials and featuring a comfortable design, they're not just a fashion statement but a piece of history. Whether you're hitting the pavement or adding to your collection, these sneakers are sure to turn heads. Don't miss out on owning a piece of nostalgia - bid now!`,

        'bids': [
            {
                'bidder': 'waterbottle',
                'maxBid': 24.73,
                'bidTimeString': 'May 4, 2024, 3:41 PM'
            },
            {
                'bidder': 'middleman',
                'maxBid': 18.54,
                'bidTimeString': 'May 4, 2024, 1:00 PM'
            },
            {
                'bidder': 'tidepodfun',
                'maxBid': 10.12,
                'bidTimeString': 'May 3, 2024, 7:38 AM'
            }
        ]
    }

}