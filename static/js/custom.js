(function($) {

	"use strict";

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

	function stop_videos() {
		var video = document.getElementById("video");
		if (video.paused !== true && video.ended !== true) {
			video.pause();
		}
		$('.youtube-video')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
	}

	$(document).ready(function() {

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
        /* ----------------------------------------------------------- */

		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

		$(".revealator-delay1").addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
		}

		/* ----------------------------------------------------------- */
		/*  BUTTONS ANIMATION
        /* ----------------------------------------------------------- */
		function checkSize() {
			if ($( document ).width() > 992) {
				var btn_hover = "";
				$(".btn").each(function() {
					var btn_text = $(this).text();
					$(this).addClass(btn_hover).empty().append("<span data-hover='" + btn_text + "'>" + btn_text + "</span>");
				});
			}
		}
		checkSize();
		window.addEventListener('resize', function () {
			checkSize();
		});

		/* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

		$(".grid figure").on('click', function() {
			$("#navbar-collapse-toggle").addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

		$(".nav-close").on('click', function() {
			$("#navbar-collapse-toggle").removeClass('hide-header');
		});
		$(".nav-prev").on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});
		$(".nav-next").on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$("#navbar-collapse-toggle").removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

		var item = $(".grid li figure");
		var elementsLength = item.length;
		for (var i = 0; i < elementsLength; i++) {
			$(item[i]).hoverdir();
		}

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

		$(".contactform").on("submit", function() {
			$(".output_message").text("Sending...");

			var form = $(this);
			$.ajax({
				url: form.attr("action"),
				method: form.attr("method"),
				data: form.serialize(),
				success: function(result) {
					if (result == "success") {
						$(".form-inputs").css("display", "none");
						$(".box p").css("display", "none");
						$(".contactform").find(".output_message").addClass("success");
						$(".output_message").text("Message Sent!");
					} else {
						$(".tabs-container").css("height", "440px");

						$(".contactform").find(".output_message").addClass("error");
						$(".output_message").text("Error Sending!");
					}
				}
			});

			return false;
		});

	});

	$(document).keyup(function(e) {

		/* ----------------------------------------------------------- */
		/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */
		if (e.keyCode === 27) {
			stop_videos();
			$('.close-content').click();
			$("#navbar-collapse-toggle").removeClass('hide-header');
		}
		if ((e.keyCode === 37) || (e.keyCode === 39)) {
			stop_videos();
		}
	});

	/* Photo Gallery */
	document.addEventListener('DOMContentLoaded', function() {
		const galleryContainer = document.querySelector('.photo-gallery-container');
		const prevBtn = document.getElementById('prev-btn');
		const nextBtn = document.getElementById('next-btn');
		let currentRotation = 0;
		let autoRotate = true;
		let autoRotateInterval;
		
		// Function to rotate the gallery
		function rotateGallery(degrees) {
			currentRotation = degrees;
			galleryContainer.style.transform = `rotateY(${degrees}deg)`;
		}
		
		// Initialize auto rotation
		function startAutoRotate() {
			autoRotateInterval = setInterval(() => {
				currentRotation -= 60;
				rotateGallery(currentRotation);
			}, 3000);
		}
		
		// Stop auto rotation
		function stopAutoRotate() {
			clearInterval(autoRotateInterval);
		}
		
		// Navigation button event listeners
		if (prevBtn && nextBtn) {
			prevBtn.addEventListener('click', function() {
				currentRotation += 60;
				rotateGallery(currentRotation);
				
				// Pause auto-rotate when user interacts
				if (autoRotate) {
					stopAutoRotate();
					autoRotate = false;
					
					// Resume after 10 seconds of inactivity
					setTimeout(() => {
						if (!autoRotate) {
							startAutoRotate();
							autoRotate = true;
						}
					}, 10000);
				}
			});
			
			nextBtn.addEventListener('click', function() {
				currentRotation -= 60;
				rotateGallery(currentRotation);
				
				// Pause auto-rotate when user interacts
				if (autoRotate) {
					stopAutoRotate();
					autoRotate = false;
					
					// Resume after 10 seconds of inactivity
					setTimeout(() => {
						if (!autoRotate) {
							startAutoRotate();
							autoRotate = true;
						}
					}, 10000);
				}
			});
		}
		
		// Mouse drag to rotate
		let isDragging = false;
		let startX;
		let startRotation;
		
		if (galleryContainer) {
			galleryContainer.addEventListener('mousedown', function(e) {
				isDragging = true;
				startX = e.clientX;
				startRotation = currentRotation;
				
				// Stop auto-rotate when user interacts
				if (autoRotate) {
					stopAutoRotate();
					autoRotate = false;
				}
			});
			
			document.addEventListener('mousemove', function(e) {
				if (isDragging) {
					const deltaX = e.clientX - startX;
					const newRotation = startRotation + deltaX / 5;
					rotateGallery(newRotation);
				}
			});
			
			document.addEventListener('mouseup', function() {
				isDragging = false;
				
				// Snap to nearest image
				const snapAngle = Math.round(currentRotation / 60) * 60;
				rotateGallery(snapAngle);
				
				// Resume auto-rotate after 10 seconds
				setTimeout(() => {
					if (!autoRotate) {
						startAutoRotate();
						autoRotate = true;
					}
				}, 10000);
			});
			
			// Touch events for mobile
			galleryContainer.addEventListener('touchstart', function(e) {
				isDragging = true;
				startX = e.touches[0].clientX;
				startRotation = currentRotation;
				
				if (autoRotate) {
					stopAutoRotate();
					autoRotate = false;
				}
			});
			
			document.addEventListener('touchmove', function(e) {
				if (isDragging) {
					const deltaX = e.touches[0].clientX - startX;
					const newRotation = startRotation + deltaX / 5;
					rotateGallery(newRotation);
				}
			});
			
			document.addEventListener('touchend', function() {
				isDragging = false;
				
				const snapAngle = Math.round(currentRotation / 60) * 60;
				rotateGallery(snapAngle);
				
				setTimeout(() => {
					if (!autoRotate) {
						startAutoRotate();
						autoRotate = true;
					}
				}, 10000);
			});
			
			// Start auto-rotation
			startAutoRotate();
		}
	});

})(jQuery);
