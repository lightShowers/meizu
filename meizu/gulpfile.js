//CommonJs规范
const gulp = require('gulp');

//html页面拷贝
gulp.task('copy-html', function(){
	return gulp.src('*.html').pipe(gulp.dest('dist')).pipe(connect.reload());
})

//图片的拷贝
gulp.task('images', function(){
	return gulp.src('img/**').pipe(gulp.dest('dist/images')).pipe(connect.reload());
})

//数据拷贝
gulp.task('data', function(){
	return gulp.src('data/*.json').pipe(gulp.dest('dist/data')).pipe(connect.reload());
})

//执行多个任务
gulp.task('bulid', ['copy-html', 'images', 'data'], function(){
	console.log('加载完成');
})

//加载scss文件
const sass = require('gulp-scss');
//const uglify = require('gulp-uglify');//压缩js
const minifyCSS = require('gulp-minify')//压缩css
const rename = require('gulp-rename');//cong命名
gulp.task('scss', function(){
	return gulp.src('scss/index.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('index.min.css'))
	.pipe(gulp.dest('dist/css/min'))
	.pipe(connect.reload());
})
gulp.task('reset', function(){
	return gulp.src('scss/reset.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('reset.min.css'))
	.pipe(gulp.dest('dist/css/min'))
	.pipe(connect.reload());
})
gulp.task('login', function(){
	return gulp.src('scss/login.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('login.min.css'))
	.pipe(gulp.dest('dist/css/min'))
	.pipe(connect.reload());
})
gulp.task('register', function(){
	return gulp.src('scss/register.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('register.min.css'))
	.pipe(gulp.dest('dist/css/min'))
	.pipe(connect.reload());
})
gulp.task('phone', function(){
	return gulp.src('scss/phone.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('phone.min.css'))
	.pipe(gulp.dest('dist/css/min'))
	.pipe(connect.reload());
})
gulp.task('goodsDetail', function(){
	return gulp.src('scss/goodsDetail.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
	.pipe(minifyCSS())
	.pipe(rename('goodsDetail.min.css'))
	.pipe(gulp.dest('dist/css/min'))
	.pipe(connect.reload());
})



//移动js文件
gulp.task('scripts',function(){
	return gulp.src('js/*.js')
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
})

//添加事件监听
gulp.task('watch',function(){
	gulp.watch('*.html',['copy-html']);
	gulp.watch('img/**',['images']);
	gulp.watch('data/*.json',['data']);
	gulp.watch('scss/index.scss', ['scss']);
	gulp.watch('scss/reset.scss', ['reset']);
	gulp.watch('scss/login.scss', ['login']);
	gulp.watch('scss/register.scss', ['register']);
	gulp.watch('scss/phone.scss', ['phone']);
	gulp.watch('scss/goodsDetail.scss', ['goodsDetail']);
	gulp.watch('js/*.js', ['scripts']);
})

//启动服务实时刷新
const connect = require('gulp-connect');
gulp.task('server', function(){
	connect.server({
		root:'dist',
		port:8888,
		livereload:true
	})
})

//设置默认任务
gulp.task('default',['watch', 'server']);