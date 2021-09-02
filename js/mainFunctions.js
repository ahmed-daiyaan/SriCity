// Slideslow
$(function(){
  
      $('#mySlideshow').mixSlide({

        animation:{
          speed:1,
          delay:2
        },
        transition: {
          name:"square",
        },
        controls: {
          // enable/disable
          active: false,
          // top, bottom, left, right, center
          // top-left, top-right
          // bottom-left, bottom-right
          position : 'bottom'
        },
        labels: {
          // enable/disable
          active: false,
          // top, bottom, left, right, center
          // top-left, top-right
          // bottom-left, bottom-right
          position : 'top-left'
        },
        thumbs: {
          // enable/disable
          active: false,
          // top, bottom, left, right, center
          // top-left, top-right
          // bottom-left, bottom-right
          position : 'bottom'
        },
        fullscreen: true,
  
      });
  
    });