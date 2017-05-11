$('.lgin').click(function(){
	 location.href="enter.html"
})
//失焦事件
$('input').focus(function(){
 	 $(this).next().find('span').html('');
 	 
 })
$('.yzm').focus(function(){
 	 $(this).next().next().find('span').html('');
 	 
 })
var  regStatus = {
	        email:false,
			uname: false,
			psw: false,
			pswr:false,
			yzmt:false
		};

//验证邮箱
 $('.usephong').blur(function(){
 	  var a="";
      var str = $('.usephong').val();
      var reg1= /^\w+([-_.]\w+)*@(\w+[-.])+\w{2,5}$/;
      var reg2=/^1[34578]\d{9}$/;
      var flag1=reg1.test(str),
      	  flag2=reg2.test(str);
      regStatus.email=true;
      if($(this).val()===''){
 	 	return;
      if(!flag1 && !flag2){
         a='请您输入正确的邮箱或手机';
          $('.usecon1').find('span').html(a);
          regStatus.email=false;
	      return;
      }
     
	   
 	 }
    });
 //验证用户名
 $('.usename').blur(function(){
 	  var str1 = $('.usename').val();
      var reg= /^[\u2E80-\u9FFF\w]+$/;
      var flag=reg.test(str1);
       regStatus.uname=true;
      if($(this).val()===''){
      	regStatus.uname=false;
 	 	return;
 	 }
      if(!flag){
         var a='用户名是由小写英文字母、数字、中文或下划线组成';
      }
      $('.usecon2').find('span').html(a);
	  return;
 })
  //验证密码
 $('.pswd').blur(function(){
 	  var str2 = $('.pswd').val();
      var reg3= /(\d.*\d)/;
      var reg4 = /([a-zA-Z].*[a-zA-Z])/;
      var reg5=/^.{8,16}$/;
      var flag1=reg3.test(str2),
          flag2=reg4.test(str2),
          flag3=reg5.test(str2);
          regStatus.psw=true;
      if($(this).val()===''){
 	 	return;
 	  }
      if(!(flag1&&flag2)){
         var a='密码必须包含2个字母和2个数字的组合';
         $('.pswdcon1').find('span').html(a);
          regStatus.psw=false;
	      return;
      }
      if((flag1&&flag2) && !flag3){
         var b='密码长度必须为8-16个字符';
          $('.pswdcon1').find('span').html(b);
          regStatus.psw=false;
	      return;
      }
      
 }) 
 //确认密码认证
  $('.pswdt').blur(function(){
  	   if($(this).val()===''){
 	 	return;
 	  }
 	  regStatus.pswr=true;
      if($(this).val()!=$('.pswd').val()){
      	var c='两次输入的密码不一致，请重新输入';
      	 $('.pswdcon2').find('span').html(c);
      	  regStatus.pswr=false;
	      return;
      }
  });
  //验证码验证
   $('.yzm').blur(function(){
   	   if($(this).val()===''){
 	 	return;
 	   }
 	    regStatus.yzmt=true;
   	   if($('.yzm').val()!=12){
          var d='验证码错误';
          $('.yzmt').find('span').html(d);
           regStatus.yzmt=false;
	      return;
   	   }
   })
//点击注册

$('button').click(function(){
	  
	  for(var i in regStatus){
				if(!regStatus[i]){
					alert('请完善信息');
					return;
				}
			}
	  $.ajax({
	  	    type:'post',
	   		url: "http://10.9.151.199/PC-Project-Admin/register.php",
	   		data: {
	   			account:$('.usename').val(),
	   			password: $('.pswd').val()
	   		},
	   		dataType:'jsonp',
	   		success:function(result){
                if(result.status){
                	location.href='index.html';
                } else{
                   alret('注册失败');
                }
			}
	   });
})

