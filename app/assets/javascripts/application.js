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
//= require swiper/swiper-bundle.js
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
    //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
    $('form').on('change', 'input[type="file"]', function(e) {
      var file = e.target.files[0],
          reader = new FileReader(),
          $preview = $(".icon_preview");
          t = this;
  
      // 画像ファイル以外の場合は何もしない
      if(file.type.indexOf("image") < 0){
        return false;
      }
  
      // ファイル読み込みが完了した際のイベント登録
      reader.onload = (function(file) {
        return function(e) {
          //既存のプレビューを削除
          $preview.empty();
          // .prevewの領域の中にロードした画像を表示するimageタグを追加
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
  })
})

jQuery(function ($) {
  $(".today_task_group").not("#today_task_group_1").css("display", "none");
  $("#today_task_1").addClass("show");
  $("#today_task_button_1").addClass("active");
  
  // 質問の答えをあらかじめ非表示

  //質問をクリック
  $(".today_task_btn").click(function () {
  
    $(".today_task_btn").not(this).removeClass("open");
    //クリックしたquestion以外の全てのopenを取る
    $(".today_task_btn").not(this).next().slideUp(300);
    //クリックされたquestion以外のanswerを閉じる
    $(this).toggleClass("open");
    //thisにopenクラスを付与
    $(this).next().slideToggle(300);
    //thisのanswerを展開、開いていれば閉じる

    let today_task_btns = $(".today_task_btn"); // tabのクラスを全て取得し、変数tabsに配列で定義
    $(".active").removeClass("active"); // activeクラスを消す
    $(this).addClass("active"); // クリックした箇所にactiveクラスを追加
    const index = today_task_btns.index(this); // クリックした箇所がタブの何番目か判定し、定数indexとして定義
    //$(".today_task_groups").removeClass("show").eq(index).toggleClass("show"); // showクラスを消して、contentクラスのindex番目にshowクラスを追加
    
    $.when(
      $(".today_task_groups").animate({width: 'hide'})
    ).done(function(){ 
      $(".today_task_groups").eq(index).stop().animate({width: 'toggle'});
    });    

        
  });
});
