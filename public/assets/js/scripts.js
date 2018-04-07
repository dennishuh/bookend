$(".alert-dismissible").fadeTo(3000, 500).slideUp(500, function(){
    $(".alert-dismissible").slideUp(500);
});

const deleteForm = document.querySelectorAll('.delete-book');
deleteForm.forEach(function(form) {
  form.onsubmit = function(e){
    e.preventDefault;

    if (confirm('Do you really want to delete')) {
      form.submit();
    }
  }
});
