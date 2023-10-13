function togglefunction() {
    var x = document.getElementById("navbar");
    if (x.style.display == "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
}
$(document).ready(function () {
$(".article-form").submit(function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  var formData = new FormData(this); 
  var username = $('#username').val();
  formData.append('username', username);

  // Send the form data with Ajax
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:5000/articlepost",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // Show success message with JavaScript alert
      alert("Your article has been submitted for review. Please wait for verification.");

      // Redirect to the home page after the alert is closed
      window.location.href = "/";
    },
    error: function () {
      // Handle error if there is a network or other error
      alert("Error posting article");
    },
  });
});
});

tinymce.init({
  selector: 'textarea#article',
  height: 800,
  plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
 
});


