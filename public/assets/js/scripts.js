$(document).ready(function() {
  $(".alert-dismissible").delay(2500).slideUp(500)

  const deleteForm = document.querySelectorAll('.delete-book');
  deleteForm.forEach(function(form) {
    form.onsubmit = function(e){
      e.preventDefault;

      if (confirm('Do you really want to delete')) {
        form.submit();
      }
    }
  });

  const $finishedBook = $('.finished-book');
  const $currentBook = $('.current-book');

  $('.mybooks-list').on('click', 'a', function(e) {
    e.preventDefault();
    const $this = $(this);

    if ($this.hasClass('currently-reading')) {
      $finishedBook.hide();
      $currentBook.show();
    }

    if ($this.hasClass('finished-reading')) {
      $finishedBook.show();
      $currentBook.hide();
    }

    if ($this.hasClass('total-read')) {
      $finishedBook.show();
      $currentBook.show();
    }

    if ($this.hasClass('add-note')) {
      $this.hide();
      $this.siblings('#comment-form').show();
    }

    if ($this.hasClass('close-note-form')) {
      $('.add-note').show();
      $this.closest('form').hide();
    }
  })
})
