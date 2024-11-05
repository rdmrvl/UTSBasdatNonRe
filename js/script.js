(function ($) {
  "use strict";

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-img"), {
      keepImg: true,
    });
  };

  // input spinner
  var initProductQty = function () {
    $(".product-qty").each(function () {
      var $el_product = $(this);
      var quantity = 0;

      $el_product.find(".quantity-right-plus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find(".quantity").val());
        $el_product.find(".quantity").val(quantity + 1);
      });

      $el_product.find(".quantity-left-minus").click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find(".quantity").val());
        if (quantity > 0) {
          $el_product.find(".quantity").val(quantity - 1);
        }
      });
    });
  };

  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll(".image-link"), {
      imageSize: "contain",
      loop: true,
    });
  };

  // Animate Texts
  var initTextFx = function () {
    $(".txt-fx").each(function () {
      var newstr = "";
      var count = 0;
      var delay = 0;
      var stagger = 10;
      var words = this.textContent.split(/\s/);

      $.each(words, function (key, value) {
        newstr += '<span class="word">';

        for (var i = 0, l = value.length; i < l; i++) {
          newstr +=
            "<span class='letter' style='transition-delay:" +
            (delay + stagger * count) +
            "ms;'>" +
            value[i] +
            "</span>";
          count++;
        }
        newstr += "</span>";
        newstr +=
          "<span class='letter' style='transition-delay:" +
          delay +
          "ms;'>&nbsp;</span>";
        count++;
      });

      this.innerHTML = newstr;
    });
  };

  $(document).ready(function () {
    initProductQty();
    initJarallax();
    initChocolat();
    initTextFx();

    $(".user-items .search-item").click(function () {
      $(".search-box").toggleClass("active");
      $(".search-box .search-input").focus();
    });
    $(".close-button").click(function () {
      $(".search-box").toggleClass("active");
    });

    var breakpoint = window.matchMedia("(max-width:61.93rem)");

    if (breakpoint.matches === false) {
      var swiper = new Swiper(".main-swiper", {
        slidesPerView: 1,
        spaceBetween: 48,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          900: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
        },
      });

      // homepage 2 slider
      var swiper = new Swiper(".thumb-swiper", {
        direction: "horizontal",
        slidesPerView: 6,
        spaceBetween: 6,
        breakpoints: {
          900: {
            direction: "vertical",
            spaceBetween: 6,
          },
        },
      });
      var swiper2 = new Swiper(".large-swiper", {
        spaceBetween: 48,
        effect: "fade",
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        thumbs: {
          swiper: swiper,
        },
      });
    }

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      slidesPerView: 5,
      spaceBetween: 10,
      // autoplay: true,
      direction: "vertical",
      breakpoints: {
        0: {
          direction: "horizontal",
        },
        992: {
          direction: "vertical",
        },
      },
    });

    // product large
    var large_slider = new Swiper(".product-large-slider", {
      slidesPerView: 1,
      // autoplay: true,
      spaceBetween: 0,
      effect: "fade",
      thumbs: {
        swiper: thumb_slider,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }); // End of a document

  $(window).load(function () {
    $(".preloader").fadeOut();
  });

  $(document).ready(function () {
    $("#checkoutModal").modal("hide");
  });
  document
    .getElementById("checkout-button")
    .addEventListener("click", function () {
      var myModal = new bootstrap.Modal(
        document.getElementById("checkoutModal")
      );
      myModal.show();
    });
  document
    .getElementById("continueShoppingBtn")
    .addEventListener("click", function () {
      $("#paymentStatusModal").modal("hide"); // Tutup modal terakhir
      window.location.href = "index.html"; // Arahkan ke halaman utama
    });

    document.addEventListener('DOMContentLoaded', function () {
      // Tombol 'Proceed to Payment' untuk membuka modal Payment setelah modal Checkout ditutup
      document.querySelector('[data-bs-target="#paymentModal"]').addEventListener('click', function () {
        var checkoutModal = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
        checkoutModal.hide();
      });
    
      // Tombol 'Confirm Payment' untuk membuka modal Payment Status setelah modal Payment ditutup
      document.querySelector('[data-bs-target="#paymentStatusModal"]').addEventListener('click', function () {
        var paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
        paymentModal.hide();
      });
    
      // Tombol 'Continue Shopping' untuk menutup modal Payment Status dan kembali ke halaman utama
      document.getElementById('continueShoppingBtn').addEventListener('click', function () {
        var paymentStatusModal = bootstrap.Modal.getInstance(document.getElementById('paymentStatusModal'));
        paymentStatusModal.hide();
        window.location.href = "index.html"; // Redirect ke halaman utama
      });
    });

    document.getElementById('continueShoppingBtn').addEventListener('click', function () {
      document.getElementById('successMessage').style.display = 'none';
      document.getElementById('failureMessage').style.display = 'none';
    });
    
    function showPaymentStatus(isSuccessful) {
      if (isSuccessful) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('failureMessage').style.display = 'none';
      } else {
        document.getElementById('successMessage').style.display = 'none';
        document.getElementById('failureMessage').style.display = 'block';
      }
    }

    // Menangani konfirmasi pembayaran
document.addEventListener('DOMContentLoaded', function () {
  const confirmPaymentButton = document.querySelector('.btn-success');
  const successMessage = document.getElementById('successMessage');
  const failureMessage = document.getElementById('failureMessage');

  if (confirmPaymentButton) {
    confirmPaymentButton.addEventListener('click', function () {
      // Tampilkan pesan sukses
      successMessage.style.display = 'block';
      failureMessage.style.display = 'none';
    });
  }

  // Mengatur tombol "Lanjutkan Berbelanja"
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', function () {
      // Tutup modal pembayaran
      const paymentStatusModal = document.getElementById('paymentStatusModal');
      const modalInstance = bootstrap.Modal.getInstance(paymentStatusModal);
      modalInstance.hide();
    });
  }
});


  function registerUser() {
    // Perform form validation here (if needed)
    
    // Simulate registration success
    $('#modalregister').modal('hide'); // Close the registration modal
    $('#registrationSuccessModal').modal('show'); // Show success modal
    
    // After 3 seconds, hide success modal and show login modal
    setTimeout(function () {
      $('#registrationSuccessModal').modal('hide');
      $('#modallogin').modal('show'); // Open the login modal
    }, 3000); // Adjust delay as needed
  }

    
})(jQuery);
