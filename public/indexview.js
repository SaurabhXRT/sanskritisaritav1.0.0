function togglefunction() {
    var x = document.getElementById("navbar");
    if (x.style.display == "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
}


 // Function to handle smooth scrolling
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }
}

// Attach click event listeners to the "Latest Blog" and "Featured Blog" links
document.addEventListener("DOMContentLoaded", () => {
    const latestBlogLink = document.querySelector("a[href='#latest-blog']");
    const featuredBlogLink = document.querySelector("a[href='#featured-blog']");
    const contactusLink = document.querySelector("a[href='#contactus']");


    if (latestBlogLink) {
        latestBlogLink.addEventListener("click", (e) => {
            e.preventDefault();
            smoothScroll("#latest-blog");
        });
    }

    if (featuredBlogLink) {
        featuredBlogLink.addEventListener("click", (e) => {
            e.preventDefault();
            smoothScroll("#featured-blog");
        });
    }
    if (contactusLink) {
       contactusLink.addEventListener("click", (e) => {
            e.preventDefault();
            smoothScroll("#contactus");
        });
    }
});

$(document).ready(function() {
  function truncateText(text, maxLength) {
      if (text.length > maxLength) {
          return text.substring(0, maxLength - 3) + '....';
      }
      return text;
  }

  function applyTruncation() {
      var maxWidth = $(window).width();
      $('.truncate-title').each(function() {
          var originalTitle = $(this).text(); // Store the original text
          var truncatedTitle;

          if (maxWidth <= 768) {
              truncatedTitle = truncateText(originalTitle, 100);
          } else if (maxWidth <= 991) {
              truncatedTitle = truncateText(originalTitle, 50);
          } else {
              truncatedTitle = originalTitle;
          }

          $(this).text(truncatedTitle);
          $(this).attr('title', originalTitle);
      });
  }

  applyTruncation();

  $(window).resize(function() {
      applyTruncation();
  });
});

$(document).ready(function () {
    $('#contact-form').submit(function (event) {
      event.preventDefault();
  
      $.ajax({
        type: 'POST',
        url: '/message/submit',
        data: $(this).serialize(),
        success: function (response) {
          $('.message-status').html('<p>' + response + '</p>');
        },
        error: function (error) {
          console.error(error);
        },
      });
    });
  });
  

