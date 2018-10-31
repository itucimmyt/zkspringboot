/**
* This file is part of Breeding4Results.
* Breeding4Results is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
* 
* Breeding4Results is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with Breeding4Results.  If not, see <http://www.gnu.org/licenses/>
*/

$(document).ready(function(){
  //$('select').material_select();

  $('.button-collapse').sideNav({
    draggable: true, // Choose whether you can drag to open on touch screens,
  });

  $('.button-collapse-layout').sideNav({
      edge: 'right',
      menuWidth: 350,
  });

  //check window width
  checkWindowWidth();

  //when resizing window
  $(window).resize(function(){
    checkWindowWidth();
  });

  //checks window width to make menu responsive
  function checkWindowWidth(){
    var windowWidth = $(window).width();
    var showLeftNav = $("body").hasClass("show-side-nav");
    if(windowWidth < 991){
      $('body').removeClass('fixed-side-nav');
      $('.left-side-nav').removeClass('fixed');
      $('.left-side-nav').removeAttr("style");
      $('.show-side-nav-btn').css('display','block');
      $('.user-view').css('display','block');
      $('#close-search-btn').css('right','5px !important');
    }else{
      if(showLeftNav){
        $('body').addClass('fixed-side-nav');
        $('.left-side-nav').addClass('fixed');
        $('.show-side-nav-btn').css('display','none');
        $('.user-view').css('display','none');
      }
    }
  }
    
  $('.dropdown-button2').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: true, // Activate on hover
    gutter: ($('#program-select').width()*3)/2.5 - 20, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  });

    //whether to always show side nav or not
    $('#show-side-nav').on('change',function(){
      var showSideNav = document.getElementById('show-side-nav').checked;
      if(showSideNav){
        $('#slide-out').addClass('fixed');
        $('body').addClass('fixed-side-nav');
        document.getElementById("slide-out").setAttribute('style','display:block;transform: translateX(0px);');
        $('.show-side-nav-btn').css('display','none');
        $('.user-view').css('display','none');
      }else{
        $('#slide-out').removeClass('fixed');
        document.getElementById('slide-out').removeAttribute("style");
        $('.user-view').css('display','block');
        $('.show-side-nav-btn').css('display','block');
        $('body').removeClass('fixed-side-nav');
      }
      //save to session
      setTimeout(function(){ 
            $.ajax({
              url: saveSiteNavStateUrl,
              data: {
                  show_side_nav: showSideNav,
              },
              type: 'POST',
              async: true,
          });
        }, 100);

    });

    //always show side nav
    $('.always-hide-left-nav').on('click',function(){

      document.getElementById('show-side-nav').checked = false;
      
      $('#slide-out').removeClass('fixed');
      document.getElementById('slide-out').removeAttribute("style");
      $('.user-view').css('display','block');
      $('.show-side-nav-btn').css('display','block');
      $('body').removeClass('fixed-side-nav');
      //save to session
      setTimeout(function(){ 
            $.ajax({
              url: saveSiteNavStateUrl,
              data: {
                  show_side_nav: false,
              },
              type: 'POST',
              async: true,
          });
        }, 100);

    });

    //always hide side nav
    $('.always-show-left-nav').on('click',function(){

      document.getElementById('show-side-nav').checked = true;
      
      $('#slide-out').addClass('fixed');
      $('body').addClass('fixed-side-nav');
      document.getElementById("slide-out").setAttribute('style','display:block;transform: translateX(0px);');
      $('.show-side-nav-btn').css('display','none');
      $('.user-view').css('display','none');
      //save to session
      setTimeout(function(){ 
            $.ajax({
              url: saveSiteNavStateUrl,
              data: {
                  show_side_nav: true,
              },
              type: 'POST',
              async: true,
          });
        }, 100);

    });

    $("input[name=side-nav-skin]:radio").on('change',function () {
      var sideNavSkin = document.querySelector('input[name=side-nav-skin]:checked').value;

      if(sideNavSkin == 'dark'){
        $('body').addClass('dark-side-nav');
      }else{
        $('body').removeClass('dark-side-nav');
      }

      //save to session
      setTimeout(function(){ 
            $.ajax({
              url: saveSideNavSkinUrl,
              data: {
                  side_nav_skin: sideNavSkin,
              },
              type: 'POST',
              async: true,
          });
        }, 100);
    });

    //show side nav on hover
    $(".cancel-left-filter").click(function(){
      $('.button-collapse').sideNav('hide');
    });

    //getting and saving theme color
    $('.theme-color').click(function(){
      var color = this.getAttribute("data");
      var darken = this.getAttribute("darken");

      var isSideNavFixed = $("body").hasClass("fixed-side-nav");
      var isNavExtended = $("nav#top-nav-bar").hasClass("nav-extended");
      var isDarkSideNav = $("body").hasClass("dark-side-nav");
      var fixedSideNav = '';
      var navExtended = '';
      var darkSideNav = '';
      if(isSideNavFixed){fixedSideNav = ' fixed-side-nav';}
      if(isNavExtended){navExtended = ' nav-extended';}
      if(isDarkSideNav){darkSideNav = ' dark-side-nav';}

    $('nav, body').removeClass();
      $('nav:not(#search-bar-nav):not(#search-bar-input-nav)').addClass(color + ' darken-' + darken + navExtended);

      $('nav#search-bar-nav').addClass(color + ' darken-' + darken + ' search-bar');

      $('body').addClass('theme-' + color + fixedSideNav + darkSideNav);

      //save theme color
      setTimeout(function(){ 
            $.ajax({
              url: saveThemeColorUrl,
              data: {
                  theme_color: color,
                  darken: darken
              },
              type: 'POST',
              async: true,
          });
        }, 100);
    });

    //show and hide search bar
    $('#search-icon').click(function(){
      $('#search-bar-input-nav').addClass('active');
      document.getElementById("search-bar-input-nav").setAttribute('style','display:block;position:fixed;top:0;z-index:1000;background-color:#fff !important;');
    });

    $('#close-search-btn').click(function(){
      $('#search-bar-input-nav').css('display','none');
    });
    //end show or hide search bar

    //for tabs
    $(document).on('click', '#li-1', function(e) {
        $('#li-1').addClass('active');
        $('#li-2').removeClass('active');
        $('#li-3').removeClass('active');
        $('#li-4').removeClass('active');
        $('#li-5').removeClass('active');
        $('#li-6').removeClass('active');
        $('#li-7').removeClass('active');

        $('#view-entity-1').removeClass('hidden').addClass('active');
        $('#view-entity-2').removeClass('active').addClass('hidden');
        $('#view-entity-3').removeClass('active').addClass('hidden');
        $('#view-entity-4').removeClass('active').addClass('hidden');
        $('#view-entity-5').removeClass('active').addClass('hidden');
        $('#view-entity-6').removeClass('active').addClass('hidden');
        $('#view-entity-7').removeClass('active').addClass('hidden');
    });
    $(document).on('click', '#li-2', function(e) {
        $('#li-2').addClass('active');
        $('#li-1').removeClass('active');
        $('#li-3').removeClass('active');
        $('#li-4').removeClass('active');
        $('#li-5').removeClass('active');
        $('#li-6').removeClass('active');
        $('#li-7').removeClass('active');

        $('#view-entity-2').removeClass('hidden').addClass('active');
        $('#view-entity-1').removeClass('active').addClass('hidden');
        $('#view-entity-3').removeClass('active').addClass('hidden');
        $('#view-entity-4').removeClass('active').addClass('hidden');
        $('#view-entity-5').removeClass('active').addClass('hidden');
        $('#view-entity-6').removeClass('active').addClass('hidden');
        $('#view-entity-7').removeClass('active').addClass('hidden');
    });
    $(document).on('click', '#li-3', function(e) {
        $('#li-2').removeClass('active');
        $('#li-1').removeClass('active');
        $('#li-3').addClass('active');
        $('#li-4').removeClass('active');
        $('#li-5').removeClass('active');
        $('#li-6').removeClass('active');
        $('#li-7').removeClass('active');

        $('#view-entity-3').removeClass('hidden').addClass('active');
        $('#view-entity-1').removeClass('active').addClass('hidden');
        $('#view-entity-2').removeClass('active').addClass('hidden');
        $('#view-entity-4').removeClass('active').addClass('hidden');
        $('#view-entity-5').removeClass('active').addClass('hidden');
        $('#view-entity-6').removeClass('active').addClass('hidden');
        $('#view-entity-7').removeClass('active').addClass('hidden');
    });
    $(document).on('click', '#li-4', function(e) {
        $('#li-2').removeClass('active');
        $('#li-1').removeClass('active');
        $('#li-4').addClass('active');
        $('#li-3').removeClass('active');
        $('#li-5').removeClass('active');
        $('#li-6').removeClass('active');
        $('#li-7').removeClass('active');

        $('#view-entity-4').removeClass('hidden').addClass('active');
        $('#view-entity-1').removeClass('active').addClass('hidden');
        $('#view-entity-2').removeClass('active').addClass('hidden');
        $('#view-entity-3').removeClass('active').addClass('hidden');
        $('#view-entity-5').removeClass('active').addClass('hidden');
        $('#view-entity-6').removeClass('active').addClass('hidden');
        $('#view-entity-7').removeClass('active').addClass('hidden');
    });
    $(document).on('click', '#li-5', function(e) {
        $('#li-2').removeClass('active');
        $('#li-1').removeClass('active');
        $('#li-5').addClass('active');
        $('#li-3').removeClass('active');
        $('#li-4').removeClass('active');
        $('#li-6').removeClass('active');
        $('#li-7').removeClass('active');

        $('#view-entity-5').removeClass('hidden').addClass('active');
        $('#view-entity-1').removeClass('active').addClass('hidden');
        $('#view-entity-2').removeClass('active').addClass('hidden');
        $('#view-entity-3').removeClass('active').addClass('hidden');
        $('#view-entity-4').removeClass('active').addClass('hidden');
        $('#view-entity-6').removeClass('active').addClass('hidden');
        $('#view-entity-7').removeClass('active').addClass('hidden');
    });
    $(document).on('click', '#li-6', function(e) {
        $('#li-2').removeClass('active');
        $('#li-1').removeClass('active');
        $('#li-6').addClass('active');
        $('#li-3').removeClass('active');
        $('#li-4').removeClass('active');
        $('#li-5').removeClass('active');
        $('#li-7').removeClass('active');

        $('#view-entity-6').removeClass('hidden').addClass('active');
        $('#view-entity-1').removeClass('active').addClass('hidden');
        $('#view-entity-2').removeClass('active').addClass('hidden');
        $('#view-entity-3').removeClass('active').addClass('hidden');
        $('#view-entity-4').removeClass('active').addClass('hidden');
        $('#view-entity-5').removeClass('active').addClass('hidden');
        $('#view-entity-7').removeClass('active').addClass('hidden');
    });

    $(document).on('click', '#li-7', function(e) {
        $('#li-2').removeClass('active');
        $('#li-1').removeClass('active');
        $('#li-6').removeClass('active');
        $('#li-3').removeClass('active');
        $('#li-4').removeClass('active');
        $('#li-5').removeClass('active');
        $('#li-7').addClass('active');

        $('#view-entity-7').removeClass('hidden').addClass('active');
        $('#view-entity-6').removeClass('active').addClass('hidden');
        $('#view-entity-1').removeClass('active').addClass('hidden');
        $('#view-entity-2').removeClass('active').addClass('hidden');
        $('#view-entity-3').removeClass('active').addClass('hidden');
        $('#view-entity-4').removeClass('active').addClass('hidden');
        $('#view-entity-5').removeClass('active').addClass('hidden');
    });

    //get current url in rendered yii1 iframe
    window.addEventListener('message', function (event) {
        if (event.data.origin == "b4r-yii1") {
            var data = event.data;

            $(".yii1Frame").on("load", function () {
              var url = $(this).attr("src");
              var newURL = data.location;
              var linkName = this.id;

              //save to session
              setTimeout(function(){ 
                  $.ajax({
                    url: saveYii1Url,
                    data: {
                      newUrl: newURL,
                      linkName: linkName
                    },
                    type: 'POST',
                    async: true,
                });
              }, 100);
            });
            
        }
    }, false);

    $('.yii1-link').click(function(e) {
      e.preventDefault();
      var actionLink = $(this).attr("href");
      if(actionLink != undefined && actionLink != '#'){
        $.ajax({
          url: resetYii1Url,
          type: 'post',
          dataType: 'json',
          async:true,
          data: {
              actionLink: actionLink
          },
          success: function(response) {
            window.location.href = actionLink; 
          },
        });
      }
    });

    //set dynamic height for yii1 iframe
    var window_size = $(window).height();
    $(".yii1Frame").css('height',(window_size - 180) + 'px');
    
    //loads bug reporting tool 
    $('#bug-report-btn').on('click',function(){ 
      $('.modal-notif').html(''); 
      $('.bug-report-modal-body').html('<div class="progress"><div class="indeterminate"></div></div>'); 
        var yii2Url =  window.location.href; 
        
      //load content of recently used tools 
        $.ajax({ 
          url: bugReportToolUrl, 
                type: 'POST', 
                data: { 
                    yii2url: yii2Url 
                }, 
          async: true, 
          success: function(data) { 
            $('.bug-report-modal-body').html(data);           
          }, 
          error: function(){ 
            $('.bug-report-modal-body').html('<i>There was a problem while loading content.</i>');  
          } 
        });
    }); 
});

$(window).on('beforeunload', function(){
  $('#search-bar-input-nav').css('display','none');
  $('#system-loading-indicator').html('<div class="progress" style="margin:0;z-index:999"><div class="indeterminate"></div></div>');

  showYii1LoadingIndicator();
});

//show loading indicator
function showYii1LoadingIndicator(){

  $('.yii1Frame').css('display','none');
  
  var loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-yii1';
    loadingIndicator.innerHTML = '<a href="#" style="cursor:default"><i class="fa fa-refresh fa-spin"></i> <i>Loading content. Please wait...</i><br/><br/></a>';
  
  var referenceNode = document.querySelector('.yii1Frame');
  
  if(referenceNode != null){
    referenceNode.before(loadingIndicator);
  }
}

$(window).on('load', function(){
  $('#search-bar-input-nav').css('display','none');
  $('#system-loading-indicator').html('');
  $('.loading-yii1').remove();
  $('.yii1Frame').css('display','block');
});

//for navigation
$(document).ready(function() {
  showYii1LoadingIndicator();

  $('.item-left-menu').click(function(event) {
    var obj = $(this);
    var itemClass = obj.data('sub_menu');

    setTimeout(function(){ 
      $('.parent-menu').css(
        "display",'none'
      );

      $('.sub-parent-menu.'+itemClass).css(
        "display",'block'
      );
    }, 300);

    $('.parent-menu').addClass('remove-active');
    $('.sub-parent-menu.'+itemClass).addClass('remove-active');
    $('.parent-menu').removeClass('removes-active');
    $('.sub-parent-menu.'+itemClass).removeClass('removes-active');
  });

  $('.left-menu-back').click(function(event) {
    var obj = $(this);
    var itemClass = obj.data('sub_menu');

    setTimeout(function(){ 
      $('.parent-menu').css(
        "display",'block'
      );

      $('.sub-parent-menu.'+itemClass).css(
        "display",'none'
      );

    }, 300);

    $('.parent-menu').addClass('removes-active');
    $('.sub-parent-menu.'+itemClass).addClass('removes-active');
    $('.parent-menu').removeClass('remove-active');
    $('.sub-parent-menu.'+itemClass).removeClass('remove-active');
  });
});

//for hotkeys
document.onkeyup = function(e) {
  if(e.altKey && e.which == 88){ //dashboard 'X'
    document.getElementById("go-to-dashboard").click();
  }
  else if(e.altKey && e.which == 83){ //search 'S'
    document.getElementById("search-icon").click();
  }
  else if(e.altKey && e.which == 86){ //filter 'V'
    document.getElementById("go-to-data-filters").click();
  }
  else if(e.altKey && e.which == 80){ //preference 'P'
    document.getElementById("go-to-preferences").click();
  }
  else if(e.altKey && e.which == 77){ //profile 'M'
    document.getElementById("go-to-profile").click();
  }
  else if(e.altKey && e.which == 67){ //configure dashboard 'C'
    document.getElementById("go-to-configure-dashboard").click();
  }
  else if(e.altKey && e.which == 66){ //go back 'B'
    document.getElementById("go-to-previous-page").click();
  }
  else if(e.altKey && e.which == 82){ //recently used tools 'R'
    document.getElementById("go-to-recently-used-tools").click();
  }
  else if(e.altKey && e.which == 65){ //favorites 'A'
    document.getElementById("go-to-favorites").click();
  }
  else if(e.altKey && e.which == 72){ //hide left nav 'H'
    document.getElementById("go-to-hide-left-nav").click();
  }
  else if(e.altKey && e.which == 76){ //show left nav 'L'
    document.getElementById("go-to-show-left-nav").click();
  }
  else if(e.altKey && e.which == 71){ //logout 'G'
    document.getElementById("go-to-logout").click();
  }
  else if(e.altKey && e.which == 87){ //saved lists'W'
    document.getElementById("go-to-saved-lists").click();
  }
};