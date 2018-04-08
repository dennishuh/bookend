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

  const $finishedSection = $('.finished-reading-section');
  const $currentSection = $('.currently-reading-section');

  $('.mybooks-list').on('click', 'a', function(e) {
    e.preventDefault();
    const $this = $(this);

    if ($this.hasClass('currently-reading')) {
      $finishedSection.hide();
      $currentSection.show();
    }

    if ($this.hasClass('finished-reading')) {
      $finishedSection.show();
      $currentSection.hide();
    }

    if ($this.hasClass('total-read')) {
      $finishedSection.show();
      $currentSection.show();
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
