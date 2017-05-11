$(function(){
	'use strict';
	 var up=$('.usephong');
	 var pswd=$('.pswd');
	 var alert1=$('.alert');
	 
	 function auto(elem){
               var ol=document.documentElement.clientWidth;
  	 	  	   var ot=document.documentElement.clientHeight;
  	 	  	   //console.log(ol,ot)
               var l=(ol-elem.width())/2;
               var t=(ot-elem.height())/2              
               elem.css('left',l);
               elem.css('top',t);
     }
	$('.butL').click(function(){
		if(up.val()===''){
			var a="用户名不能为空";
			$('.usecon').find('span').html(a);
			return;
	    }
		if(pswd.val()===''){
			var b="密码不能为空";
			$('.pswdcon').find('span').html(b);
			return;
		}
		
	   $.ajax({
	   		url: "http://10.9.151.199/PC-Project-Admin/login.php",
	   		data: {
	   			account: up.val(),
	   			password: pswd.val()
	   		},
	   		dataType:'jsonp',
	   		success:function(result){
				
                if(result.status){
                	var userinfo = {
								account: up.val(),
								login_status: 1
							};
							$.cookie('userinfo',JSON.stringify(userinfo),{expires: 365,path: '/'});
                	location.href='index.html';
                } else{
                   $('.fixed').show();
                   auto(alert1);
                }
			}
	   });
       $(".bom").click(function(){
            $('.fixed').hide();
       });
	   $(".closeT").click(function(){
            $('.fixed').hide();
       });


	})
      
	 $('input').focus(function(){
		 $('.usecon').find('span').html('');
		 $('.pswdcon').find('span').html('');
	    })
	 $('.butR').click(function(){
	 	 location.href="login.html";

	 })

});