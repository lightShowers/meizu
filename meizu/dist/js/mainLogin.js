console.log('加载成功');

require.config({
	paths:{
		jquery:'jquery-1.10.1.min',
		'jquery-cookie':'jquery.cookie',
		parabola: "parabola",
		login:'login'
	},
	shim:{
		//设置一下，引入js文件的依赖关系
		'jquery-cookie':['jquery'],
		//声明一下，不是AMD规范的模块
		'parabola':{
			exports: "_"
		}
	}
})

require(['login'], function(login){
	login.login();
})