jQuery(function () {
  var $ = jQuery;
  $( "#gdlr-nav-search-form-button" ).click(function() {
    $("#gdlr-nav-search-form #search-text input[name=q]").focus();
  });

  $('.gdlr-accordion-item').each(function(){
    var multiple_tab = $(this).hasClass('gdlr-multiple-tab');
    $(this).children('.accordion-tab').children('.accordion-title').click(function(){
      var clicked_tab = $(this).parent();
      $(this).parent().parent().children('.accordion-tab').each(function(){
        if( $(this).hasClass('active') ){
          $(this).children('.accordion-title').children('i').removeClass('icon-minus').addClass('icon-plus');
          $(this).children('.accordion-content').slideUp(function(){ $(this).parent().removeClass('active'); });
        }
      });
      
      if( clicked_tab.hasClass('active') ){
        $(this).children('i').removeClass('icon-minus').addClass('icon-plus');
        $(this).siblings('.accordion-content').slideUp(function(){ clicked_tab.removeClass('active'); });
      }else{
        $(this).children('i').removeClass('icon-plus').addClass('icon-minus');
        $(this).siblings('.accordion-content').slideDown(function(){ clicked_tab.addClass('active'); });
      }
      
      if( !multiple_tab ){
        current_tab.siblings().children('.accordion-title').children('i').removeClass('icon-minus').addClass('icon-plus');
        current_tab.siblings().children('.accordion-content').slideUp(function(){ $(this).parent().removeClass('active'); });
      }
    });
  });
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/wp-content/plugins/dkf_flawless/js/service-worker.js");
  }
});