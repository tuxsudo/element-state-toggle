var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();




gulp.task('default', ['clean', 'lint'],  function () {

    return gulp.src('es6/init.js')
    	.pipe($.es6ModuleTranspiler({
            formatter: 'bundle'
        }))
        .pipe( $.babel() )
    	.pipe($.flatten())
		.pipe( $.rename(function(path){ path.basename = path.basename.replace('init', 'element-state-toggle'); }) )
        .pipe( gulp.dest('build') )
        .pipe( $.uglify() )
        .pipe( $.rename(function(path){ path.basename+=".min"; }) )
        .pipe( gulp.dest('build'));

});



gulp.task('commonjs', ['clean', 'lint'],  function () {

    return gulp.src('es6/*.js')
    	.pipe( $.babel() )
		.pipe( $.rename(function(path) { path.basename = 'element-state-toggle.' + path.basename; }) )
        .pipe( gulp.dest('build/commonjs') );

});


gulp.task('lint', function(){
	return gulp.src('es6/*.js')
    	.pipe( $.jshint() )
 		.pipe( $.jshint.reporter('default') )
    	.pipe( $.jshint.reporter('fail') );
});

gulp.task('clean', function(){
	return gulp.src('build', {read: false})
        .pipe($.clean());
});
