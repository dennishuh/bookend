// const $searchResults = $('.search-results');
//
// $searchResults.on('click', '.start-reading-btn', function(e) {
//   const btn = this;
//   const bookInfo = $(this).data('bookInfo');
//   $.ajax({
//     type: 'POST',
//     url: '/books/add',
//     data: bookInfo,
//     dataType: 'json',
//     success: function(res) {
//       if (res.added) {
//         console.log('book added');
//         console.log(this);
//         $(btn).closest('.book-viewer').addClass('book-saved');
//       }
//     }
//   });
// })
