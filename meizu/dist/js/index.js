define(['jquery', "jquery-cookie"],function($){
	function index(){
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
							$(".headerNavBox").css("background-color" ,'rgba(255, 255, 255,0)').css('color','#fff');
							$('.headercenter li a').removeClass('aCss');
							$('.headerRightF').css('border-color','rgba(255, 255, 255,0)');
							$('.iconfontwi').css('color','#fff');
						}else{
							$(".headerNavBox").css("background-color",'#fff').css("color",'#00b9f2');
							$('.headercenter').css('color','#00b9f2');
							$('.headercenter li a').attr('class','aCss');
							$('.iconfontwi').css('color','#666');
							$('.headerRightF').css('border-color','rgba(153, 153, 153,1)');
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
		 		$('.iconfontwi').css('color','#fff');
		 		$('.headerRightF').css('border-color','rgba(255, 255, 255,0)');
		 		$(".headerNavBox").css("background-color",'').css('color','#fff');
		 	},200)
		})

		//banner 轮播图效果
		$.ajax({
			type:'get',
			url:'../data/headerBanner.json',
			success:function(arr){
				//插入
				for(var i = 0; i < arr.length; i++){
					$(`<li>
						<a href=""><img src="${arr[i].img}" alt=""></a>
						</li>`).appendTo($('.headerBanner'));
				}
				scrollPicture();				
			},
			error:function(msg){
				alert(msg);
			}
		})

		//轮播图滚动效果
		function scrollPicture(){
			//滚动
				var aSpan = $('.bannerSpan').find('span');
				var aLis = $('.headerBanner').find("li");
				//<1>设置iNow，代表当前点击的按钮的下标，iNow显示图片的下标
				var iNow = 0;
				var timer = null;
				aSpan.eq(0).attr("class", 'active');
				aSpan.click(function(){
					iNow = $(this).index();
					tab();
				})

				function tab(){
					aSpan.attr('class',"");
					aSpan.eq(iNow).attr('class','active');
					$('.headerBanner').stop().animate({left: -1920 * iNow}, 200, function(){
						if(iNow == aSpan.size()){
							iNow = 0;
							$('.headerBanner').css("left", 0);
						}	
					})
				}
				
				function timerInner(){
					iNow++;
					tab();

					if(iNow == aSpan.size()){
						aSpan.eq(0).attr("class", 'active');
					}
				}
				timer = setInterval(timerInner, 3000);
				$('.headerBanner').mouseenter(function(){
					clearInterval(timer);
				});
				$('.headerBanner').mouseleave(function(){
					timer = setInterval(timerInner, 3000);
				});
		}

		//魅族手机加载
		$.ajax({
			type:'get',
			url:'../data/dataPhoneindex.json',
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
					if(i < 2){
						$(`<li><a href="">
									<div>
										<h2>${arr[i].name}</h3>
										<em>${arr[i].dec}</em><br>
										<p>${arr[i].price}</p>
									</div>
									<dt><img src="${arr[i].img}" alt=""></dt>
									<dd>${arr[i].actives}</dd>
								</a></li>`).appendTo($('.meizuPhone'));
						switch(active){
							case '领劵':
								$('.meizuPhone li dd').eq(i).css('background','linear-gradient(to right bottom,blue,skyblue)')
								break;
							case "":
								$('.meizuPhone li dd').eq(i).css('display','none')
								break;
							default:
								$('.meizuPhone li dd').eq(i).css('background','linear-gradient(to right bottom, red, pink)')
						}
					}else{
						$(`<li><a href="">
									<dt><img src="${arr[i].img}" alt=""></dt>
									<div>
										<h2>${arr[i].name}</h3>
										<em>${arr[i].dec}</em><br>
										<p>${arr[i].price}</p>
									</div>
									<dd>${arr[i].actives}</dd>
								</a></li>`).appendTo($('.meizuPhone'));
						var active = arr[i].actives
						switch(active){
							case '领劵':
								$('.meizuPhone li dd').eq(i).css('background','linear-gradient(to right bottom,blue,skyblue)')
								break;
							case "":
								$('.meizuPhone li dd').eq(i).css('display','none')
								break;
							default:
								$('.meizuPhone li dd').eq(i).css('background','linear-gradient(to right bottom, red, pink)')
						}
					}
				}
			},
			error:function(msg){
				alert(msg)
			}
		})

		//魅族声学
		$.ajax({
			type:'get',
			url:'../data/dataVoiceindex.json',
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
						$(`<li><a href="">
								<dt><img src="${arr[i].img}" alt=""></dt>
								<div>
									<h2>${arr[i].name}</h3>
									<em>${arr[i].dec}</em><br>
									<p>${arr[i].price}</p><span>${arr[i].ago}</span>
								</div>
							</a>
						</li>`).appendTo($('#meizuVoice'));
						if(arr[i].dec == ""){
							$('#meizuVoice li div em').eq(i).css('display', 'none');
							$('#meizuVoice li div br').eq(i).css('display', 'none');
						}
					}
			},
			error:function(msg){
				alert(msg)
			}
		})

		//智能配件
		$.ajax({
			type:'get',
			url:'../data/dataAIindex.json',
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
						$(`<li><a href="">
								<dt><img src="${arr[i].img}" alt=""></dt>
								<div>
									<h2>${arr[i].name}</h3>
									<em>${arr[i].dec}</em><br>
									<p>${arr[i].price}</p><span>${arr[i].ago}</span>
								</div>
							</a>
						</li>`).appendTo($('#smartAccessories'));
						if(arr[i].dec == ""){
							$('#smartAccessories li div em').eq(i).css('display', 'none');
							$('#smartAccessories li div br').eq(i).css('display', 'none');
						}
					}
			},
			error:function(msg){
				alert(msg)
			}
		})
		//生活周边
		$.ajax({
			type:'get',
			url:'../data/datalifearound.json',
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
						$(`<li><a href="">
								<dt><img src="${arr[i].img}" alt=""></dt>
								<div>
									<h2>${arr[i].name}</h3>
									<em>${arr[i].dec}</em><br>
									<p>${arr[i].price}</p><span>${arr[i].ago}</span>
								</div>
							</a>
						</li>`).appendTo($('#lifeAround'));
						if(arr[i].dec == ""){
							$('#lifeAround li div em').eq(i).css('display', 'none');
							$('#lifeAround li div br').eq(i).css('display', 'none');
						}
					}
			},
			error:function(msg){
				alert(msg)
			}
		})

		//社区热评
		$.ajax({
			type:'get',
			url:'../data/datacommunity.json',
			success:function(arr){
				for(var i = 0; i < arr.length; i++){
						$(`<li><a href="">
								<dt>
									<img src="${arr[i].img}" alt="">
								</dt>
								<dd>
									<img src="${arr[i].imgH}" alt=""><em>${arr[i].name}</em>
								</dd>
								<p>${arr[i].dec}</p>
								<span>${arr[i].tip}</span>
							</a></li>`).appendTo($('.communityHot'));
					}
			},
			error:function(msg){
				alert(msg)
			}
		})

		//侧边栏跟随屏幕运动
		$(document).on('scroll',function(){
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				$('.sidebarBox').stop().animate({top:scrollTop + 400},100)
				//$('.sidebarBox').css('top',scrollTop + 400)
		})


	}
	return {
		index:index
	}
})