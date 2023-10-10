function togglefunction() {
    var x = document.getElementById("navbar");
    if (x.style.display == "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
}
function displayFunction() {
    var x = document.getElementById("comment-view");
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

 /*  $(document).on('click', '.like-btn', function (event) {
     event.preventDefault();
     const postId = $(this).data('post-id');
     console.log(postId);
     $.ajax({
         url: `/like-post/${postId}`,
         method: 'POST',
         success: function (response) {
             const likesCount = response.likesCount;
             $(`.like-btn[data-post-id="${postId}"]`).html(`${likesCount} <i class="fa-solid fa-thumbs-up"></i>`);
             console.log(likesCount);
         },
         error: function (error) {
             console.error(error);
         }
     });
 });*/


 $(document).ready(function () {
    $(".like-btn").click(function (event) {
      event.preventDefault();
      const postId = $(this).data("post-id");

      const username = "{{username}}"; // Get the logged-in username from the server-side variable

      if (!username) {
          // User is not logged in, redirect to login page
          const currentURL = window.location.href;
          const loginURL = "/login"; // Change this to the actual login URL
          window.location.href = `${loginURL}?redirect=${encodeURIComponent(currentURL)}`;
          return;
      }
      
      $.ajax({
        url: `/like-post/${postId}`,
        method: "POST",
        success: function (response) {
          const likesCount = response.likesCount;
          $(`.like-btn[data-post-id="${postId}"]`).html(
            `${likesCount} <i class="fa-solid fa-thumbs-up"></i>`
          );
        },
        error: function (error) {
          console.error(error);
        },
      });
    });
  });
  
$(document).ready(function () {
    $(".comment-form").submit(function (event) {
        event.preventDefault();
        // var formData = $(this).serialize(); 

        const username = "{{username}}"; // Get the logged-in username from the server-side variable

        if (!username) {
            // User is not logged in, redirect to login page
            const currentURL = window.location.href;
            const loginURL = "/login"; // Change this to the actual login URL
            window.location.href = `${loginURL}?redirect=${encodeURIComponent(currentURL)}`;
            return;
        }
        
        $.ajax({
            type: "POST",
            url: "/comment",
            data: {
                comment: $(this).find('input[name="comment"]').val(),
                postid: $(this).find('input[name="postid"]').val(),
            },
            success: function (response) {
                var existingComment = $("#comment-add-" + response.postid).find('.user-comment[data-postid="' + response.postid + '"]');
                if (existingComment.length === 0) {
                    var commentHtml = '<div class="user-comment">' +
                        '<div class="comment-profile">' +
                        '<i class="fa-regular fa-user"></i>' +
                        '</div>' +
                        '<div class="user-commentdetail">' +
                        '<div class="user-commentusername">' +
                        '<span>' + response.username + '</span>' +
                        '</div>' +
                        '<div class="user-commentcontent">' +
                        '<p>' + response.comment + '</p>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    $("#comment-add-" + response.postid).prepend(commentHtml);
                }
                $("#comment-form-" + response.postid)[0].reset();
            },
            error: function () {
                alert("Error adding comment");
            }
        });
        return false;
    });
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
