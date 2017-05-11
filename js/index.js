require(['../config'],function(){
	require(['jquery','womai','template','searchword','jquery.cookie'],function($,wm,template,searchword,cookie){
		$.getJSON('json/goods.json',function(data){
			  var html = template('good',{data:data});
			  //console.log(html)
			  $('.floor-allOne').html(html);
			 //无缝轮播
          (function(){
            var index=0;
            $('.btR').click(function(){
                index++;
                var imggs=$(this).siblings().find('img');
                var bImg=$(this).parent().find('.b-img');
                var circleP=$(this).parent().find('.circle-p');
                imgWrap(imggs,bImg,circleP); 

            })
            $('.btL').click(function(){
                index--;
                var imggs=$(this).siblings().find('img');
                var bImg=$(this).parent().find('.b-img');
                var circleP=$(this).parent().find('.circle-p');
                imgWrap(imggs,bImg,circleP);           
            })
            //autopy
            for(var i=0;i<11;i++){
              autoPy('.img-f'+i,'.b-img.l'+i,'.circle-p.l'+i);
            }
            
             function  autoPy(elem1,elem2,elem3){
                var timer1=setInterval(function(){
                    index++;
                    var imggs=$(elem1);
                    var bImg=$(elem2);
                    var circleP=$(elem3);
                    imgWrap(imggs,bImg,circleP);     
               },2500)
            
             }
               
               //选项卡
            $('.tain').mouseenter(function(){
                $(this).parent().siblings().find('.b-wrap').eq($(this).index()).show().siblings().hide();
                $(this).addClass('active').siblings().removeClass('active')
            })
            $('.b-item').mouseenter(function(){
                  $(this).find('.bt').show();
            })
            $('.b-item').mouseleave(function(){
                  $(this).find('.bt').hide();
            })
            $('.circle-p').mouseenter(function(){
                index=$(this).index();
                var imggs=$(this).siblings().find('img');
                var bImg=$(this).parent().find('.b-img');
                var circleP=$(this).parent().find('.circle-p');
                imgWrap(imggs,bImg,circleP);           
            })
            function imgWrap(elem1,elem2,elem3){
              if(index>=elem1.length){
                  $(elem2).css('marginLeft',0);          
                   index=1;
                } 
                if(index<0){
                   $(elem2).css('marginLeft',-482*(elem1.length-1));
                   index=elem1.length-2;  
                }
                 $(elem2).stop(true).animate({
                  marginLeft:-482*index
                })
                var i=index==elem1.length-1?0:index;
                elem3.stop(true);
                elem3.eq(i).addClass('active').siblings().removeClass('active');
                //console.log(i);
            }

          })();
              //楼层
        var allFloor = $('.floorAll');
        var allFNav = $('.lc');
        var allF=$('.loucen');
        var floorNav = $('.floor-all');
        var searchOne=$('.nav.one')
         //console.log(allFloor,allFNav,floorNav);
        var ch = document.documentElement.clientHeight; 
        $(window).scroll(function(){
          var scrollT = $('body').scrollTop();
          //console.log(scrollT);
          if(scrollT > 1087){
            searchOne.fadeIn(500);
            allF.fadeIn(700);
          }else{
            searchOne.fadeOut(500);
            allF.fadeOut(700);
          }
          allFloor.each(function(i){
            var h = $(this).outerHeight();
            var t = $(this).offset().top;
            //判断是否为显示的楼层
            if( (t < ch/2 + scrollT)&&(t + h > scrollT + ch/2)
            ){
              allFNav.eq(i).addClass('active')
                   .siblings().removeClass('active');
              return;
            }
          });
        });

        allFNav.click(function(){
          var index = $(this).index();
          //console.log(index)
          var t = allFloor.eq(index).offset().top - 50;
          $('html,body').animate({
            scrollTop: t
          });
        });
       
		})
     
    $.getJSON('json/letter.json',function(list){
          //console.log(list);
           var html = template('good',{list:list});
           $('.letterAll').html(html);
    })
    $.getJSON('json/detail.json',function(dat){
          //console.log(dat);
           var html = template('good',{dat:dat});
           $('.detailF').html(html);
    })
     
    var userinfo = $.cookie('userinfo');
    
    if(userinfo){
  
      userinfo = JSON.parse(userinfo);
     
      if(userinfo.login_status){
        $('.itemL.user').html( userinfo.account + '，<a href="javascript:;" class="logout">退出</a>' );
      }
    }
   //console.log($('itemL.user'))
    $('.logout').click(function(){
      var info = {
        account: userinfo.account,
        login_status: 0
      };
      $.cookie('userinfo',JSON.stringify(info),{expires: 365,path: '/'});
      location.href = "enter.html";
      });
      $('.itemL.enter').click(function(){
           location.href='enter.html';
      })
      $('.itemL.login').click(function(){
           location.href='login.html';
      })
      
	})
})