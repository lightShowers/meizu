define(['jquery', "jquery-cookie"],function($){
	function login(){
		$(function(){
			$('#Login').on('click',function(){
				if($('#username').val() == '' || $('#password').val() == ''){
					alert('内容不能为空');
				}else{
					$.ajax({
						type:'post',
						url:'C:/PHPnow/htdocs/login/login.php',
						data:`username=${$('#username').val()}&password=${$('#password').val()}`,
						success:function(data){
							alert(data);
							setTimeout(function(){
								location.assign('index.html');
							},1000)
						},
						error:function(msg){
							alert(msg)
						}
					})
				}
			})
		})
	}
	return {
		login:login
	}
})