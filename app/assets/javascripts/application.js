// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require rails-ujs
//= require activestorage
//= require popper
//= require bootstrap
//= require_tree .


$(function(){
    $('.js-modal-open').each(function(){
        $(this).on('click',function(){
            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            return false;
        });
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();
        return false;
    }); 
});


$(function() {
	$('a[href^="#"]').click(function() {
		 var headerHeight = $('header').outerHeight();
		 var speed = 400;
		 var href= $(this).attr("href");
		 var target = $(href == "#" || href == "" ? 'html' : href);
		 var position = target.offset().top - headerHeight;
		 $('body,html').animate({scrollTop:position}, speed, 'swing');
		 return false;
	});
});

$(function(){
    $('form').on('change', 'input[type="file"]', function(e) {
      var file = e.target.files[0],
          reader = new FileReader(),
          $preview = $(".icon_preview");
          t = this;
      if(file.type.indexOf("image") < 0){
        return false;
      }
  
      reader.onload = (function(file) {
        return function(e) {
          $preview.empty();
          $preview.append($('<img>').attr({
                    src: e.target.result,
                    width: "70px",
                    class: "rounded-circle mb-3",
                    title: file.name
                }));
        };
      })(file);
  
      reader.readAsDataURL(file);
    });
});

$(function(){
  $('.task-back-button').click(function(){
    $('#taskplay').slideToggle();
  });
});


$(document).on('mouseenter','.enemy-title-motion',function(){
	$(".task-title-img").stop().animate({'marginRight':'-50%', opacity: 1},400,'swing');
  $(this).next().stop().animate({opacity: 1},700,'swing');
});

$(document).on('mouseleave','.enemy-title-motion',function(){
	$(".task-title-img").stop().animate({'marginRight':'0px', opacity: 0},400,'swing');
  $(this).next().stop().animate({opacity: 0},300,'swing');
});

$(function(){
  $('#js-task-create-back-button').click(function(){
    document.getElementById('task_count_error').textContent = '';
    document.getElementById('task_errors_start_date').textContent = '';
    document.getElementById('task_errors_end_date').textContent = '';
    document.getElementById('task_title-error').textContent = '';
    document.getElementById('task_start_date-error').textContent = '';
    document.getElementById('task_end_date-error').textContent = '';
    document.getElementById('task_start_date').style.color = '#000'; 
    document.getElementById('task_end_date').style.color = '#000'; 
  });
});

$(function(){
  $('#js-task-create-button').click(function(){
    document.getElementById('task_count_error').textContent = '';
    document.getElementById('task_errors_start_date').textContent = '';
    document.getElementById('task_errors_end_date').textContent = '';
  });
});


$(function(){
  $('#info-slide-menu1').hide();
  $('#info-slide1').click(function(){
    $('#info-slide-menu1').slideToggle();
  });
});

$(function(){
  $('#info-slide-menu2').hide();
  $('#info-slide2').click(function(){
    $('#info-slide-menu2').slideToggle();
  });
});

$(function(){
  $('#password_reset_slide').hide();
  $('.password_reset_slide_btn').click(function(){
    $('#password_reset_slide').slideToggle();
  });
});