(function($){

    /*
        1. Sticky Header
        2. Mobile Menu
        3. Bobile menu Toggle
        4. Back To Top
        5. Strech Image 
        6. Hero Slider
        7. wow js
        8. Pricing Tab
    */
    

  /*====================== Search FAQ ============*/
  // script.js
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const faqItems = document.querySelectorAll(".accordion-item");
    const headingh4 = document.querySelectorAll(".faq-wraper h4");

    // Real-time search function
    function searchFAQ() {
        const input = searchInput.value.toLowerCase(); // Get the input value in lowercase
        
        let hasResults = false; // Flag to check if there are matching items

        // Loop through each FAQ item
        faqItems.forEach((item) => {
            const text = item.textContent.toLowerCase(); // Convert content to lowercase
            if (text.includes(input)) {
                item.classList.remove("hidden"); // Show matching items
                hasResults = true;
            } else {
                item.classList.add("hidden"); // Hide non-matching items
            }
        });

        // Show/hide the heading based on results
        headingh4.forEach((h4) => {
            h4.style.display = hasResults ? "none" : "block";
        });
    }

    // Add input event listener for real-time search
    if (searchInput) {
        searchInput.addEventListener("input", searchFAQ); // Triggers on every input change
    }
}); 

  /**==============================================
   * Language Switcher
   */
  // Handle language switching
  $(".dropdown-menu li").on("click", function () {
    const selectedLangText = $(this).text().trim(); // Get selected language text

    // Extract the current path
    const currentPath = window.location.pathname;

    // Identify language folders
    const langFolders = ["/en/", "/ar/"];
    let basePath = currentPath;

    // Remove existing language folder if present
    langFolders.forEach((lang) => {
      if (currentPath.includes(lang)) {
        basePath = currentPath.replace(lang, "/"); // Remove the language folder
      }
    });

    // Ensure the `src` folder is included if applicable
    const srcIndex = basePath.indexOf("/src/");
    if (srcIndex !== -1) {
      basePath = basePath.substring(0, srcIndex + 5); // Keep up to `/src/`
    } else {
      basePath = basePath.substring(0, basePath.lastIndexOf("/")); // Default to root directory
    }

    // Determine the selected language folder
    const selectedLangFolder = selectedLangText === "English" ? "en" : "ar";

    // Construct the new path
    const currentFile = currentPath.split("/").pop() || "index.html"; // Get the current file
    const newPath = `${basePath}/${selectedLangFolder}/${currentFile}`;

    // Redirect to the constructed path
    window.location.href = newPath;
  });


   // 1. Sticky Header
    document.addEventListener('DOMContentLoaded', function () {
        const stickyElement = document.querySelector('.isSticky');

        if (stickyElement) {
            const headerHeight = stickyElement.offsetHeight;

            window.addEventListener('scroll', function () {
                if (window.scrollY > 300) {
                    stickyElement.classList.add('fixedHeader', 'animate__animated', 'animate__slideInDown');
                } else {
                    stickyElement.classList.remove('fixedHeader', 'animate__animated', 'animate__slideInDown');
                }
            });
        }
    });

    // 2. Mobile Menu
    $(window).on("load", function (e) {
        $('.main_menu .sub-menu > a').on('click', function(e){
           e.preventDefault();
           if ($(window).width() < 992) {
              $(this).siblings('ul').stop(true, true).slideToggle();
           }
        });
    });

    // 3. Bobile menu Toggle
    $(".humbarger-button").click(function(){
        $(".arabic_header_menus").slideToggle();
        $(this).toggleClass('active');
    });

    // 4. Back To Top
   function backtotop() {
        $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#backtotop').addClass('activate');
        } else {
            $('#backtotop').removeClass('activate');
        }
        });
        $('#backtotop').on('click', function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
        });
    }
    backtotop();

    // 5. Strech Image 
    function aravic_stretch() {
        var windowWidth = window.innerWidth;

        // Apply stretch logic only if the window width is greater than 1921px
            document.querySelectorAll(".row .aravic_stretch-element-inside-column").forEach(function (element) {
                var row = element.closest(".row");
                var cols = element.closest('[class^="col-"]');
                var colsHeight = cols.offsetHeight;

                var rect = element.getBoundingClientRect();
                var rowRect = row.getBoundingClientRect();
                var colsRect = cols.getBoundingClientRect();

                var elementLeft = rect.left;
                var elementRight = rect.right;
                var rowLeft = rowRect.left + (parseFloat(getComputedStyle(row).paddingLeft) || 0);
                var rowRight = windowWidth - rowRect.right + (parseFloat(getComputedStyle(row).paddingRight) || 0);

                var colsLeft = colsRect.left;
                var colsRight = windowWidth - colsRect.right;

                var styles = {
                    "marginLeft": "0px",
                    "marginRight": "0px"
                };

                if (Math.round(rowLeft) === Math.round(colsLeft)) {
                    var marginLeft = parseFloat(getComputedStyle(element).marginLeft) || 0;
                    styles.marginLeft = (marginLeft - elementLeft) + "px";
                }

                if (Math.round(rowRight) === Math.round(colsRight)) {
                    var marginRight = parseFloat(getComputedStyle(element).marginRight) || 0;
                    styles.marginRight = (marginRight - (windowWidth - elementRight)) + "px";
                }

                Object.assign(element.style, styles);
            });
        }

    // Call the function on load
    aravic_stretch();

    // Also call it on window resize to ensure responsiveness
    window.addEventListener('resize', aravic_stretch);

    // 6. Hero Slider
    var swiper = new Swiper(".heroSlider", {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });

    // 7. wow js
    new WOW().init();

    // Number validation
    function validatePhoneNumber() {
        const phoneInput = document.getElementById('number').value;
        const numberError = document.getElementById('numberError');
        
        // Remove the '+' symbol if present
        const cleanedNumber = phoneInput.replace(/\+/g, '').trim();
        
        // Check if the number has exactly 9 digits
        if (cleanedNumber.length !== 12 || isNaN(cleanedNumber)) {
            numberError.textContent = "رقم الجوال يجب أن يحتوي على 9 أرقام.";
        } else {
            numberError.textContent = "";
        }
    }

    // Form validation before submitting
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            const phoneNumber = this.value;
            const phoneRegex = /^[0-9]{9}$/;
    
            // Check if phone number length is exactly 9 digits and it matches the regex
            if (phoneNumber.length === 9 && phoneRegex.test(phoneNumber)) {
                document.getElementById('numberError').textContent = "";
            } else {
                document.getElementById('numberError').textContent = "أدخل رقم هاتف صالح";
                document.getElementById('numberError').style.color = "red";
            }
        });
    }

})(jQuery)


// Tab Audio Sound
var mouseclick = new Audio();
mouseclick.src = "https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav";