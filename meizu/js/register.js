define(['jquery', "jquery-cookie"],function($){
	function register(){
		var flag = true;
		//用户名验证
		
		$('#username').blur(function(){
			var nameValue = $('#username').val().replace(/\s/g,"");
			$('#username').val(nameValue);
			$('#userWarning').css({
				display :'block',
				color:'red',
				borderColor:'red'
			});
			if(nameValue.length <= 6 || nameValue.length >= 18){
				$('#userWarning').html('请输入6~18位的用户名');
				$('#username').val('');
				flag = false;
			}else if(/^\d/.test(nameValue)){
				$('#userWarning').html('不能以数字开头');
				flag = false;
			}else if(/\W/.test(nameValue)){
				$('#userWarning').html('请使用字母、数字、下划线');
				flag = false;
			}else{
				$('#userWarning').html('√  恭喜，该用户名可注册');
				flag = true;
				$('#userWarning').css({
				display :'block',
				color:'green',
				borderColor:'green'
			});
			}
		})

		//验证密码
		$('#password').keyup(function(){
			$('#passWarning').css({
				display :'block',
				color:'red',
				borderColor:'red'
			});
			var passValue = $('#password').val();
			if(passValue.length < 6 || passValue.length >= 16){
				$('#passWarning').html('请输入6~16位密码');
				flag = false;
			}else if(/^\d+$/.test(passValue) || /^[A-Z]+$/.test(passValue) || /^[a-z]+$/.test(passValue)){
				$('#passWarning').html('密码强度低，请从新输入密码');
				flag = false;
			}else if(/\d/.test(passValue) && /[A-Z]/.test(passValue) && /[a-z]/.test(passValue)){
				$('#passWarning').html('密码强度高，可以注册');
				flag = true;
				$('#passWarning').css({
				display :'block',
				color:'green',
				borderColor:'green'
			});
			}else{
				$('#passWarning').html('密码强度中，可以注册');
				flag = true;
				$('#passWarning').css({
				display :'block',
				color:'green',
				borderColor:'green'
			});
			}
		})

		//重复验证密码
		$('#passwordOk').blur(function(){
			if($('#password').val() == $('#passwordOk').val()){
				$('#okWarning').css({
					display :'block',
					color:'green',
					borderColor:'green'
				});
				flag = true;
				$('#okWarning').html('密码正确，可以注册。');
			}else{
				$('#passWarning').css('display','none');
				$('#password').val('');
				$('#passwordOk').val('');
				$('#okWarning').css({
					display :'block',
					color:'red',
					borderColor:'red'
				});
				$('#okWarning').html('密码错误，请从新输入密码');
				flag = false;
			}
		})

		//验证手机号
		$('#iPhone').blur(function(){
			if(!/^[1]\d{10}$/.test($('#iPhone').val())){
				$('#iPhone').val('');
				$('#phoneWarning').css({
					display :'block',
					color:'red',
					borderColor:'red'
				});
				$('#phoneWarning').html('请输入正确手机号');
				flag = false;
			}else{
				$('#phoneWarning').css({
					display :'block',
					color:'green',
					borderColor:'green'
				});
				flag = true;
				$('#phoneWarning').html('正确');
			}
		})

		//生成验证码
		function createCode(n){
			var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			var code = [];
			for(var i = 0; i < n; i++){
				var index = parseInt(Math.random() * arr.length);

				code.push(arr[index]); 
			}
			var str = code.join('');
			$('.verification span').html(str);
		}
		$(function(){
			createCode(4);
			$('.verification a').click(function(){
				createCode(4);
			})
		})

		//验证验证码
		$('#verification').blur(function(){
			if($('.verification span').html().toUpperCase() == $('#verification').val().toUpperCase()){
				flag = true;
			}else{
				alert('请从新输入验证码');
				createCode(4);
				$('#verification').val('');
				flag = false;
			}
		})

		//zhuce
		$('#register').click(function(){
			if(flag && $('#username').val() != '' && $('#password').val() != '' && $('#passwordOK').val() != '' && $('#verification').val() != '' && $('#iPhone').val() != ''){
				alert('允许注册');
			}else{
				location.reload();
			}
		})
	}
	return {
		register:register
	}
})