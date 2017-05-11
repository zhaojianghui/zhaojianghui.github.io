require(['../config'],function(){
	require(['jquery','gwc','template','jquery.cookie','searchword'],function($,gwc,template,cookie,search){
			
    $.getJSON('json/detail.json',function(dat){
           var html = template('good',{dat:dat});
           $('.detailF').html(html);
    })
     //获取数据
    $.getJSON('json/gwc.json',function(data){
          //console.log(data);
          var html=template('good', data);
          $('.taste-con').html(html);
         
          var first1=$('.taste-item:first');
          var first2=$('.gou:first')
           //点击更换商品种类
          var tasteItem=$('.taste-item');
          var price=$('.price');
           //添加class,初始状态
          first1.addClass('active');
          first2.addClass('active');
          price.html(data.color[first1.data('id')].sale_price);
          $('.dami').html(data.color[first1.data('id')].goods_name);
          $('.stock').html(data.color[first1.data('id')].stock);
           tasteItem.click(function(){
          var id=$(this).data('id');
            //console.log(index);
            $(this).addClass('active').siblings().removeClass('active');
            $(this).find('.gou').addClass('active');
            $(this).siblings().find('.gou').removeClass('active');
            price.html(data.color[id].sale_price);
            $('.dami').html(data.color[id].goods_name);
            $('.stock').html(data.color[id].stock);
           })
            //点击+-数量加减
            var amount=$('.num').val();
                amount=1;
            $('.add').click(function(){
                amount++;
                $('.num').val(amount);
                var stock=$(this).parents('.amount').find('.stock').html();
                if(amount>stock){
                   amount=stock;
                   $('.num').val(amount);
                }
            }) 
            $('.decrease').click(function(){
                amount--;
                $('.num').val(amount);
                var stock=$(this).parents('.amount').find('.stock').html();
                if(amount<1){
                   amount=1;
                   $('.num').val(amount);
                }
            }) 
            $('.gwc-add').click(function(){
                 $('.gwc-page').show();
                 var id=$('.taste-item.active').data('id');
                 var num=parseInt($('.num').val());
                 var cart=$.cookie('shop-cart')||'{}';
                     cart=JSON.parse(cart);
                     if(!cart[id]){
                      cart[id]={
                        id:id,
                        num:num
                      }
                     }else{
                        cart[id].num+=num;
                     }
                     $.cookie('shop-cart',JSON.stringify(cart),{expires:365,path:'/'});
                     //console.log(JSON.stringify(cart));
                
            })
            $('.settle').click(function(){
                 location.href='gwcPay.html';
            })
            $('.shop').click(function(){
                 $('.gwc-page').hide();
            })
            $('.close').click(function(){
                 $('.gwc-page').hide();
            })

      })
   
	})
})