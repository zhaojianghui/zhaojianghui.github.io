define(['jquery'],function($){
	  var conter=$('.containInput');
	  var con=$('.con-item');
      //console.log(conter,con)
	  conter.bind('input propertychange',function(){ 
	  	    var that=$(this);
            $.ajax({
	      	url:'http://suggestion.baidu.com/su',
	      	dataType:'jsonp',
	      	data:{
	      		wd: that.val()
	      	},
	      	jsonp:'cb',
	      	success:function(data){
	           //console.log(data)
	           var result=data.s;
	           var html='';
               if(that.val()!=0){
                   for(var i=0;i<result.length;i++){
               	    html+=`<p class="sear">${result[i]}</p>`;
                    that.parent().find('.con-item').html(html);
               }
               }else{
               	  that.parent().find('.con-item').html('');
	          } 
	           //鼠标点击p
	           $('.sear').click(function(){
	           	    var h=$(this).html();
	           	    conter.val(h);
	           	    con.html('');
	           	    location.href='http://www.baidu.com/s?wd='+conter.val();
	           	    conter.val('')
	           })

	      	}

	      })

	 })
               
               
     
	  	 
	     
});
