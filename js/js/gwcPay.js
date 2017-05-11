require(['../../config'],function(){
	require(['jquery','template','jquery.cookie'],function($,template,cookie){
		  var cart={
		  	cart:{},
		  	data:{},
		  	id:null,
		  	amount:null,
		  	allshop:$('.allshop'),
		  	init:function(){
				this.getdata();
                this.addAmount();
                this.decreat();
                this.selectbox();
                this.allSelect();
                this.delete();
                this.deleteAll();
                this.clickplay();
		  	},
		  	clickplay:function(){
		  		$('.phone').mouseenter(function(){
		  			 $('.phone-zero').show();
		  		})
		  		$('.phone').mouseleave(function(){
		  			 $('.phone-zero').hide();
		  		})
		  		$('.itemL.enter').click(function(){
		  			 location.href="enter.html";
		  		})
		  		$('.deng').click(function(){
		  			 location.href="enter.html";
		  		})
		  		$('.itemL.login').click(function(){
		  			 location.href="login.html";
		  		})
		  	},
		  	readCookie:function(){
                 this.cart=$.cookie('shop-cart')||'{}';
                 this.cart=JSON.parse(this.cart);
		  	},
		  	setCookie:function(){
                 $.cookie('shop-cart',JSON.stringify(this.cart),{expires:365,path:'/'});
		  	},
		  	getdata:function(){
		  		var _this=this;
				//读取cookie
				this.readCookie();
				//console.log(this.cart);
		  		$.getJSON('../../json/gwc.json',function(data){
                    //console.log(data);
                    _this.data=data;
                    var result = {
						cart:_this.cart,
						data: data
					};
					var list = template('cart-list',result);
					$('.allshop').html( list );

			    }) 
			 },
			 addAmount:function(){
			 	var _this=this;
                $('.allshop').on('click','.add',function(){
                	amount=$(this).prev().val();
                	id=$(this).parent().data('id'); 
                	var price=$(this).parent().find('.price').html();
                    var stock=_this.data.color[id].stock; 
                	amount++;
                	var totalP= (price*amount).toFixed(2);
                	$(this).parent().find('.total-price').html('¥'+totalP);
                    //console.log(stock);
                	if(amount>stock){
                		amount=stock;
                		$(this).prev().val(amount);
                		$(this).parent().find('.total-price').html('¥'+(price*stock).toFixed(2));
                	}
                	$(this).prev().val(amount);
                	_this.cart[id].num=amount;
                	_this.setCookie();
                	_this.hand();

                })
			 },
			  decreat:function(){
			 	var _this=this;
                $('.allshop').on('click','.decreat',function(){
                	amount=$(this).next().val();
                	id=$(this).parent().data('id');
                	var price=$(this).parent().find('.price').html(); 
                	var stock=_this.data.color[id].stock;
                	amount--;
                	var totalP= (price*amount).toFixed(2);
                	$(this).next().val(amount);
                     $(this).parent().find('.total-price').html('¥'+totalP);
                    //console.log(stock);
                	if(amount<1){
                		amount=1;
                		$(this).parent().find('.total-price').html('¥'+price);
                		$(this).next().val(amount);
                	}
                	_this.cart[id].num=amount;
                	_this.setCookie();
                	_this.hand();

                })
			 },
			 selectbox:function(){
                  var _this=this;
                 $('.allshop').on('change','input[type=checkbox]',function(){
                 	  _this.hand();
                 	
			 })
		     },
		     hand:function(){
		     	    var check=this.allshop.find('input[type=checkbox]:checked');
                 	var allCheckBox = this.allshop.find('input[type=checkbox]');
                    var number=check.length;
                    var andAll=0;
                    check.each(function(){
                        var totalpr=$(this).parent().find('.total-price').html();
	                    var length=totalpr.length;
	                    var tp=parseFloat(totalpr.slice(1,length));
	                    andAll+=tp;    
                    })
                    //console.log(andAll);

                    //判断是否可以结算
					if(number > 0){
						$('.gopay-all').addClass('can-pay');
						$('.top-gopay').addClass('can-pay');
					}else{
						$('.gopay-all').removeClass('can-pay');
						$('.top-gopay').removeClass('can-pay');
					}
                    $('.indent-num').html(number);
                    $('.indent-price').html('¥'+andAll.toFixed(2));
                    $('.allmoney').html('¥'+andAll.toFixed(2));
                    $('.allmy').html('¥'+andAll.toFixed(2));
                    //判断是否需要选中全选按钮
					if(check.length === allCheckBox.length){
						$('input.selectAll').prop('checked',true);
					}else{
						$('input.selectAll').prop('checked',false);
					}

		     },
		     allSelect:function(){
                  $('input.selectAll').click(function(){
                    var allCheckBox = $(this).parents('.indentOne').find('.allshop').find('input[type=checkbox]');
					var status = $(this).prop('checked');
					//所有商品状态
					allCheckBox.prop('checked',status);
					allCheckBox.change();
					//全选按钮状态
					$('input.selectAll').prop('checked',status);

	                })
		     },
		     delete:function(){
		     	  var _this=this;
		     	  this.allshop.on('click','.delete',function(){
		     	  	 //从页面上删除
		     	  	 $(this).parents('.shop-amount').remove();
		     	  	 //从cookie删除
		     	  	 var id = $(this).parents('.shop-amount').data('id');
					 delete _this.cart[id];
					 _this.setCookie();
					 _this.hand();

		     	  })
		     },
		     deleteAll:function(){
		     	 var _this=this;
		     	  $('.alldeleteT').click(function(){
		     	  	 var check=_this.allshop.find('input[type=checkbox]:checked');
		     	  	 //从页面上删除
		     	  	 check.parent().remove();
		     	  	 //从cookie删除
		     	  	 check.each(function(){
			     	  	 var id = $(this).parent().data('id');
			     	  	  //console.log(id);
						  delete _this.cart[id];
						 _this.setCookie();
		     	  	 })
		     	  	 _this.hand();
		     	  })
		     }
		 }
			 cart.init();
      
	})
})