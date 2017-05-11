define(['jquery'],function($){
	'use strict';
	$(function(){
          $('.itemL').eq(1).click(function(){
          	  $('.city').show();
          	  $('.filter').show();
          })
          $('.close').click(function(){
          	  $('.city').hide();
          	  $('.filter').hide();
          })
          $('.img-item').mouseenter(function(){
              $('.but').show();
          })
          $('.img-item').mouseleave(function(){
              $('.but').hide();
          })
          $('.shop-right').mouseenter(function(){
              $('.butt').show();
          })
          $('.shop-right').mouseleave(function(){
              $('.butt').hide();
          })
          $('.remend-wrap').mouseenter(function(){
              $('.bot').show();
          })
          $('.remend-wrap').mouseleave(function(){
              $('.bot').hide();
          })
          //淡入淡出轮播
          var next=0; 
          var now=0;
          var timer=null;
          var imgs=$('.img');
          var circles=$('.circle-item');
          //右键点击
          $('.butR').click(function(){
              next++;
              next%=imgs.length;
              handle();
          })
          //左键点击
          $('.butL').click(function(){
              next--;
              if(next<0){
                 next=imgs.length-1;
              }
              handle();
          })
          //自动轮播
          autoPlay();
          //鼠标悬停
          $('.img-item').mouseenter(function(){
          	    clearInterval(timer);
          })
          $('.img-item').mouseleave(function(){
          	    autoPlay();
          })
          //鼠标经过小圆圈
          circles.mouseenter(function(){
          	  next=$(this).index();
          	  handle();
          })
          function handle(){
              imgs.eq(next).stop(true).show();
              imgs.eq(now).stop(true).hide();
              circles.eq(next).addClass('active').siblings().removeClass('active');
              var color=imgs.eq(next).attr('data-color');
              $('.carousel').css('background-color',color);
              now=next;  
          }
          function autoPlay(){
          	timer=setInterval(function(){
          		  next++;
	              next%=imgs.length;
	              handle();
          	},2000)
          	  
          }
          //选项卡
          var servers=$('.server');
          var navConOnes=$('.nav-conOne');
          servers.mouseenter(function(){
          	  navConOnes.eq($(this).index()).show().siblings().hide();
          })
          //滑动轮播
          //点击右按钮
          slide('.buttR','.shop-lb','.buttL');
          slide('.botR','.img-remend','.botL')
          function  slide(elem1,elem2,elem3){
              var index=1;
              $(elem1).click(function(){
                   index++;
                   $(elem2).stop(true).animate({
                     marginLeft:-1005
                   })
                   if(index%=2){
                      $(elem2).stop(true).animate({
                      marginLeft:0
                   })
                   }

              })
              $(elem3).click(function(){
                   index--;
                   $(elem2).stop(true).animate({
                     marginLeft:-1005
                   })
                   if(index%=2){
                      $(elem2).stop(true).animate({
                      marginLeft:0
                   })
                   }

              })
          }

       $(".liebFive").click(function(){
            $('html,body').animate({
              scrollTop:0
            })
                
           })
       $(".shop-lie.one").click(function(){
             location.href="gwc.html"
                
           })
       
	})
})