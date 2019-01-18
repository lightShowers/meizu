define(['jquery', "jquery-cookie"],function($){
	function goodsDetail(){
		$.ajax({
			type:'get',
			url:'../data/headerTop.json',
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
					$(`<li><a href="">${arr[i].name}</a></li>`).appendTo($('.headercenter'));
				}
			},
			error:function(msg){
				alert(msg);
			}
		})

		$('.headercenter').on("mouseenter","li",function(){
				var dex = $(this).index();
				$('.headerlist').html('');
				$.ajax({
					type:'get',
					url:'../data/headerTop.json',
					success:function(arr){
						if(!arr[dex].data){
							$(".headerList").stop().animate({height: 0}, 0, "swing");
							$('.headercenter li a').removeClass('aCss');
						}else{
							$('.headercenter').css('color','#00b9f2');
							$('.headercenter li a').attr('class','aCss');
							$(".headerList").stop().animate({height: 166}, 200, "swing");
							for(var j = 0; j < arr[dex].data.length; j++){
								
								$(`<a>
									<dt><img src="${arr[dex].data[j].img}" alt=""></dt>
									<dd>${arr[dex].data[j].name}</dd>
									<dd>${arr[dex].data[j].price}</dd>
								</a>`).appendTo($('.headerlist'));
							}
						}
					},
					error:function(msg){
						alert(msg);
					}
				})
		})

		$('.headerNavBox').on("mouseleave",function(){
		 	$(".headerList").stop().animate({height: 0}, 200, "swing");
		 	setTimeout(function () { 
		 		$('.headercenter li a').removeClass('aCss');
		 	},200)
		})
		//选中搜索框
		$('#headerSearch').on('click',function(){
			$('.headerRightF ul').html('');
			$('.headerRightF ul').css('display','block')
			$.ajax({
				type:'get',
				url:'../data/dataPhoneindex.json',
				success:function(arr){
					for(var i = 0; i < arr.length; i++){
						$(`<li><a href="">${arr[i].name}
									<span>${arr[i].actives}</span>
								</a></li>`).appendTo($('.headerRightF ul'));
					}
				},
				error:function(msg){

				}
			})
			$('.headerRightF').stop().animate({height:410},200)
		})
		$('.headerRightF').on('mouseleave', function(){
			$('.headerRightF').stop().animate({height:30},200, function(){
				$('.headerRightF ul').css('display','none')
			})
			
		})



		//购物车
		$(function(){
			//放大镜
			$('.phoneContentPicim').on('mousemove',function(e){
				e = e || window.event;
				var x = $('.phonePicBox').offset().left - $('.phoneContentPicim').offset().left;
				var y = $('.phonePicBox').offset().top - $('.phoneContentPicim').offset().top;
				$('.phonePicBox').css({
					'display':"block",
					'left': e.pageX - $('.phoneContentPicim').offset().left,          
   					'top': e.pageY - $('.phoneContentPicim').offset().top,
   					'margin-top':-135,
   					'margin-left':-135,
				});
				$('.phonePicCopy').css({
					'display':"block",
				})
				$('.phonePicCopy img').css({
					'margin-top':-2 * y,
					'margin-left':-2 * x,
				})

			})
			$('.phoneContentPicim').on('mouseleave',function(){
				$('.phonePicCopy').css({
					'display':"none",
				})
			})
			
			sc_car();
			//所有商品总数
			function sc_car(){
				var cookieStr = $.cookie("goods");
				if(cookieStr){
					var arr = eval(cookieStr);
					var sum = 0;//计数
					for(var i = 0; i < arr.length; i++){
						sum += arr[i].num;
					}
					$('.meizu-header-buy-num').html(sum);
					$('.meizu-header-buy-list h2 p span').html(sum);
				}else{
					$('.meizu-header-buy-num').html(0);
					$('.meizu-header-buy-list h2 p span').html(0);
				}
			}
			//移入事件
			$('.meizu_buy_car').mouseenter(function(){
				var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);
				$('.meizu-header-buy-list').css('display', 'block');
				var Height = 85 * arr.length + 82;

				$('.meizu-header-buy-list').stop().animate({
					height: Height
				},200);
				submitGoods();
			})
			//移除事件
			$('.meizu-header-buy-list').mouseleave(function(){
				$('.meizu-header-buy-list').stop().animate({
					height: 0
				},200,function(){
					$('.meizu-header-buy-list').css('display', 'none');
				})
			})

			//要将存储在cookie中的商品添加到页面上
			function submitGoods(){
				$.ajax({
					type:'get',
					url:'../data/dataphonelist.json',
					success:function(arr){
						$('.meizu-header-buy-list ul').html('');
						var cookieStr = $.cookie("goods");
						var cookieArr = eval(cookieStr);
						var goodsArr = [];
						for(var i = 0; i < arr.length; i++){
							for(var j = 0; j < cookieArr.length; j++){
								if(arr[i].id == cookieArr[j].id){
									arr[i].num = cookieArr[j].num;
									goodsArr.push(arr[i]);
								}
							}
						}

						//创建节点加到页面上
						for(let i = 0; i < goodsArr.length; i++){
							$(`<dl class="clear">
								<dt><img src="${goodsArr[i].img}" alt=""></dt>
								
								<dd><a href="">
									<p>${goodsArr[i].name}</p>
									<em>${goodsArr[i].dec}</em>
								</a></dd>
								<li>
									<p>${goodsArr[i].price} <span>X ${goodsArr[i].num}</span></p>
									<a class="delGoods" id="${goodsArr[i].id}" href="#">删除</a>
								</li>
							</dl>`).appendTo($(".meizu-header-buy-list ul"));
						}
						
					},
					error:function(msg){
						alert(msg)
					}
				})
			}

			//删除商品
			$('.meizu-header-buy-list').on('click','.delGoods',function(){
				var cookieStr = $.cookie("goods");
				var cookieArr = eval(cookieStr);
				var cookiearr = [];
				for(var i = 0; i < cookieArr.length; i++){
					if(cookieArr[i].id != this.id){
						cookiearr.push(cookieArr[i]);
					}
				}
				$.cookie('goods',JSON.stringify(cookiearr));
				submitGoods();
				sc_car();
				$('.meizu-header-buy-list').css('display', 'block');
				var Height = 85 * cookiearr.length + 82;
				$('.meizu-header-buy-list').stop().animate({
					height: Height
				},200);
			})

		})
	}
	return {
		goodsDetail:goodsDetail
	}
})