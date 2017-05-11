define(['jquery','template'],function($,template){
	$(function(){
	//放大镜效果
	'use strict';
	 var  filter=$('.cart-filter');
	 var  cartIarge=$('.cart-large');
	 var  imgCart=$('.img-cart');
	 var  flow=$('.flow');
	 var  imgIarge=$('.img-large');
	 var  cartSmall=$('.cart-small');
	 var  imgSmall=$('.img-small');
	 //console.log(filter,imgCart);
	 cartIarge.mouseenter(function(e){
	 	  filter.show();
	 	  flow.show();
          var ol=$(this).offset().left;
          var ot=$(this).offset().top;
           cartIarge.mousemove(function(e){
          	 var l=e.pageX-ol-75;
          	 var t=e.pageY-ot-75;
          	 l=l<0?0:(l>250?250:l);
          	 t=t<0?0:(t>250?250:t);
          	 //改变滤镜位置
          	 filter.css({ left:l,top:t });
          	 //改变大图位置
          	 imgIarge.css({ left:-l,top:-t });
          })
          cartIarge.mouseleave(function(){
          	 filter.hide();
	 	     flow.hide();
          })

	 })
	 imgSmall.mouseenter(function(){
	 	 var index=$(this).index();
	 	 imgCart.eq(index).addClass('active').siblings().removeClass('active');
	 	 imgIarge.eq(index).addClass('active').siblings().removeClass('active');
	 })
     $('.scan').click(function(){
     	  $('.scan-ewm').show();
     })
     $('.scan').mouseleave(function(){
     	  $('.scan-ewm').hide();
     })
})
})
