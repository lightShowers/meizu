define(['parabola','jquery', "jquery-cookie"],function(parabola,$){
	function phone(){
		console.log('yes');
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

		//引入商品
		$.ajax({
			type:'get',
			url:'../data/dataphonelist.json',
			success:function(arr){
				for(let i = 0; i < arr.length; i++){
					if(arr[i].img5){
						$(`<li>
								<dt>
									<img class = 'active' src="${arr[i].img}" alt="">
									<img src="${arr[i].img2}" alt="">
									<img src="${arr[i].img3}" alt="">
									<img src="${arr[i].img4}" alt="">
									<img src="${arr[i].img5}" alt="">
								</dt>
								<h4>
									<span><img class = 'active' src="${arr[i].color1}" alt=""></span>
									<span><img src="${arr[i].color2}" alt=""></span>
									<span><img src="${arr[i].color3}" alt=""></span>
									<span><img src="${arr[i].color4}" alt=""></span>
									<span><img src="${arr[i].color5}" alt=""></span>
								</h4>
								<div>
									<h3>${arr[i].name}</h3>
									<em>${arr[i].dec2}</em>
									<p>${arr[i].price}</p>
									<button id='${arr[i].id}' class="buy-btn">购买</button>
								</div>
								<dd>${arr[i].actives}</dd>
							</li>`).appendTo($('.meizuPhone'));
					}else if(!arr[i].img5 && arr[i].img4){
						$(`<li>
								<dt>
									<img class = 'active' src="${arr[i].img}" alt="">
									<img src="${arr[i].img2}" alt="">
									<img src="${arr[i].img3}" alt="">
									<img src="${arr[i].img4}" alt="">
								</dt>
								<h4>
									<span><img class = 'active' src="${arr[i].color1}" alt=""></span>
									<span><img src="${arr[i].color2}" alt=""></span>
									<span><img src="${arr[i].color3}" alt=""></span>
									<span><img src="${arr[i].color4}" alt=""></span>
								</h4>
								<div>
									<h3>${arr[i].name}</h3>
									<em>${arr[i].dec2}</em>
									<p>${arr[i].price}</p>
									<button id='${arr[i].id}' class="buy-btn">购买</button>
								</div>
								<dd>${arr[i].actives}</dd>
							</li>`).appendTo($('.meizuPhone'));
					}else{
						$(`<li>
								<dt>
									<img class = 'active' src="${arr[i].img}" alt="">
									<img src="${arr[i].img2}" alt="">
									<img src="${arr[i].img3}" alt="">
								</dt>
								<h4>
									<span><img class = 'active' src="${arr[i].color1}" alt=""></span>
									<span><img src="${arr[i].color2}" alt=""></span>
									<span><img src="${arr[i].color3}" alt=""></span>
								</h4>
								<div>
									<h3>${arr[i].name}</h3>
									<em>${arr[i].dec2}</em>
									<p>${arr[i].price}</p>
									<button class="buy-btn" id='${arr[i].id}'>购买</button>
								</div>
								<dd>${arr[i].actives}</dd>
							</li>`).appendTo($('.meizuPhone'));
					}

					switch(arr[i].actives){
							case '领劵':
								$('.meizuPhone li dd').eq(i).css('background','linear-gradient(to right bottom,blue,skyblue)')
								break;
							case "":
								$('.meizuPhone li dd').eq(i).css('display','none')
								break;
							default:
								$('.meizuPhone li dd').eq(i).css('background','linear-gradient(to right bottom, red, pink)')
					}
					$('.meizuPhone li').eq(i).find('h4').on('click','span',function(){
						var  index = $(this).index();
						choiceClick(i,index);
					})	
				}


				for(var i = 0; i < 9; i++){
					var childs = $('.meizuPhone h4').eq(i).find('span');
					if(childs.length == 3){
						$('.meizuPhone h4').eq(i).css('width', 134);
					}else if(childs.length == 4){
						$('.meizuPhone h4').eq(i).css('width', 178);
					}else{
						$('.meizuPhone h4').eq(i).css('width', 222);
					}
				}
			},
			error:function(msg){
				alert(msg)
			}
		})

		//onload
		$(function(){
			$('.bannerBox').css('height', 680 * $(window).width() / 2560);
			$('.bannerBox').css('width', $(window).width());
			$('.bannerBox').css('background-size', '100% 100%');

			sc_car();//页面刷新完成时显示数量
			//给购车添加点击事件
			$('.meizuPhone').on('click','.buy-btn',function(){

				ballMove(this);
				var id = this.id;
				//alert(id);
				//1、是否是第一次添加该商品
				var first = $.cookie('goods') == null ? true : false;
				if(first){
					//第一次添加
					var arr = [{id:id,num:1}];
					$.cookie('goods',JSON.stringify(arr),{
						expires: 7
					})
				}else{
					var cookieStr = $.cookie('goods');
					var arr = eval(cookieStr);
					var isSame = false;
					for(var i = 0; i < arr.length; i++){
						if(id == arr[i].id){
							isSame = true;
							arr[i].num++;
							break;
						}
					}
					if(!isSame){
						var obj = {id: id, num: 1};
						arr.push(obj);
					}

					$.cookie('goods', JSON.stringify(arr),{
						expires:7
					})
				}
				sc_car();

			})

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

		function choiceClick(i,index){
			
			$('.meizuPhone li').eq(i).find('dt img').removeClass('active');
			$('.meizuPhone li').eq(i).find('h4 img').attr('class','');
			$('.meizuPhone li').eq(i).find('dt img').eq(index).attr('class','active');
			$('.meizuPhone li').eq(i).find('h4 img').eq(index).attr('class','active')

		}
		//小球进行抛物线运动
		function ballMove(node){
			$("#ball").css({
					display: "block",
					left: $(node).offset().left,
					top: $(node).offset().top
			});

			var offsetX = $(".meizu_buy_car").offset().left - $("#ball").offset().left;
			var offsetY = $(".meizu_buy_car").offset().top - $("#ball").offset().top;

			var bool = new Parabola({
					el: "#ball",
					targetEl: null,
					offset: [offsetX, offsetY],
					curvature: 0.0005,
					duration: 400,
					callback: function(){
						$("#ball").hide();
					}
				})

			bool.start();
		}
	}
	return {
		phone:phone
	}
})