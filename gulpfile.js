var gulp = require('gulp'),
	$ = require('gulp-load-plugins')();


gulp.task('default', ['clean', 'lint'],  function () {

    return gulp.src('src/*.build.js')

    	.pipe($.es6ModuleTranspiler({
            formatter: 'bundle'
        }))


        .pipe($.es6Transpiler() )

    	.pipe($.flatten())

		.pipe( $.rename(function(path){ path.basename = 'domstate.' + path.basename.replace('.build', ''); }) )

        .pipe( gulp.dest('build/es5') )

        .pipe( $.uglify() )

        .pipe( $.rename(function(path){ path.basename+=".min"; }) )

        .pipe( gulp.dest('build/es5'));

});


gulp.task('lint', function(){
	return gulp.src('src/*.js')
    	.pipe( $.jshint() )
 		.pipe( $.jshint.reporter('default') )
    	.pipe( $.jshint.reporter('fail') );
});

gulp.task('clean', function(){
	return gulp.src('build', {read: false})
        .pipe($.clean());
});
