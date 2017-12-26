'use strict'

let
	project =      require('./package.json'),
	gulp =         require('gulp'),
	rename =       require('gulp-rename'),
	watch =        require('gulp-watch'),
	plumber =      require('gulp-plumber'),
	uglifyJS =     require('uglify-es'),
	composer =     require('gulp-uglify/composer'),
	csso =         require('gulp-csso')

let minifyJS = composer(uglifyJS, console)

let paths = {
	files: {
		js:   'source/runet.js',
		css:  'source/runet.css'
	},
	dist:   'dist/'
}

gulp.task('minify-css', () => gulp.src(paths.files.css)
	.pipe(plumber())
	.pipe(watch(paths.files.css))
	.pipe(csso())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.dist))
)

gulp.task('minify-js:ES6', () => gulp.src(paths.files.js)
	.pipe(plumber())
	.pipe(watch(paths.files.js))
	.pipe(minifyJS({}))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(paths.dist))
)

gulp.task('build', ['minify-css', 'minify-js:ES6'])
