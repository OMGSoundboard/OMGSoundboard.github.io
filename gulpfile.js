/*!
 * Themeix Gulp Package (https://themeix.com/)
 * Copyright 2016-2019 themeix team
 * Licensed under MIT
 * Available Main Task Command : production, gulp, zip
 */

(function() {
    'use strict';
/*
=============================
	Configure Options & Files 
=============================
*/
    var File_Name = 'jekyll-applin.zip';
    var CSS_Files = [
        './assets/css/bootstrap.min.css',
        './assets/css/fontawesome-all.min.css',
        './assets/css/owl.carousel.min.css',
        './assets/css/aos.css',
		'./assets/css/atom-one-light.css',
		'./assets/css/custom-animation.css',
		'./assets/css/slimmenu.min.css',
		'./assets/css/swiper.min.css'
		
    ];
    var JS_Files = [
        './assets/js/jquery.min.js',
        './assets/js/bootstrap.min.js',  
		'./assets/js/jquery.easing.min.js',
		'./assets/js/slimmenu.min.js',
		'./assets/js/aos.min.js',
		'./assets/js/highlight.pack.js',
		'./assets/js/owl.carousel.min.js',
		'./assets/js/owl.carousel.thumbs.min.js',
		'./assets/js/swiper.min.js',		
		'./assets/js/app.js'	
    ];
	
	
/*
=============================
	Include Gulp & Plugins
=============================
*/
	var gulp 			= require('gulp'),

		sass 			= require('gulp-sass'),
		cleanCSS 		= require('gulp-clean-css'),
		autoprefixer 	= require('gulp-autoprefixer'),
		concat 			= require('gulp-concat'),		
		rename 			= require('gulp-rename'),
		uglify 			= require('gulp-uglify'),
		terser 			= require('gulp-terser'),
		jshint 			= require('gulp-jshint'),
		plumber			= require('gulp-plumber'),
		c 				= require('ansi-colors'),
		replace 		= require('gulp-replace'),
		size 			= require('gulp-size'),
		zip 			= require('gulp-zip'),
		del 			= require('del'),
		gulpCopy 		= require('gulp-copy'),
		runSequence 	= require('run-sequence'),
		inject 			= require('gulp-inject')
//		fs 				= require('fs');
		
		sass.compiler = require('node-sass');
			
  
 
    gulp.task('clean-production', function() {
        return del('dist/**/**', {
            force: true
        });
    });
    gulp.task('copy_css_files', function(done) {
        return gulp.src(CSS_Files)
            .pipe(gulp.dest('./dist/production/assets/css'))
            .pipe(size())

        done();
    });
    gulp.task('copy_js_files', function(done) {
        return gulp.src(JS_Files)
            .pipe(gulp.dest('./dist/production/assets/js'))
            .pipe(size())

        done();
    });
	
    gulp.task('copy_all_files', function(done) {
        return gulp.src([
                './**/*',
                '!.editorconfig',
                '!.jshintignore',
                '!.jshintrc',
                '!bower.json',
                '!gulpfile.js',
                '!package.json',
                '!package-lock.json',
                '!Gemfile.lock',
                '!.gitattributes',
                '!gitignore',
                '!README.md',
                '!.gitignore',
                '!./node_modules/**',
                '!./bower_components/**',
                '!./dist/**',
                '!./_site/**',
                '!./git/**'
            ])
            .pipe(gulp.dest('./dist/production'))
            .pipe(size())
        done();
    });


 
	
    gulp.task('production-zip', function(done) {
        gulp.src([
                './dist/production/**/*',
            ])
            .pipe(zip('production-' + File_Name))
            .pipe(gulp.dest('./dist/'))
            .pipe(size())
        done();
    });

    gulp.task('sass', function(done) {
        return gulp.src('./assets/scss/*.scss')
            .pipe(plumber({
               // errorHandler: onError
            }))
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest('./assets/css'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./assets/css'))
            .pipe(size())
        done();
    });


    gulp.task('vendor_css', function(done) {
        return gulp.src(CSS_Files)
            .pipe(concat('vendors.css'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cleanCSS())
            .pipe(gulp.dest('./assets/css'))
            .pipe(size())
        done();
    });

    gulp.task('js', function(done) {
        return gulp.src(JS_Files)

            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(concat('build.js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(terser())
            .pipe(gulp.dest('./assets/js'))
            .pipe(size())
        done();
    });


    gulp.task('app_css', function(done) {
        return gulp.src(['./assets/css/vendors.min.css', './assets/css/style.min.css'])
            .pipe(concat('app.css'))
            .pipe(cleanCSS())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest('./assets/css'))
            .pipe(size())
        done();
    });
    gulp.task('zip', function(done) {
        gulp.src([
                './**/*',
                '.editorconfig',
                '.jshintignore',
                '.jshintrc',
                '!.gitattributes',
                '!./_site/**',		
                '!README.md',
                '!.gitignore',
                '!.Gemfile.lock',
                '!Gemfile.lock',
                '!./node_modules/**',
                '!./bower_components/**',
                '!./dist/**',
                '!./git/**'
            ])
			.pipe(zip('dev-' + File_Name))
            .pipe(gulp.dest('dist'))
            .pipe(size())
        done();
    });

    gulp.task('watch', function() {
        gulp.watch('assets/scss/**/*.scss', gulp.series('build_css'));
        gulp.watch(['./assets/js/app.js'], gulp.series('js'));
    });

    gulp.task(
        'build_css',
        gulp.series('sass', 'vendor_css', 'app_css')
    );

    gulp.task(
        'build',
        gulp.series('build_css', 'js')
    );

    gulp.task(
        'production',
        gulp.series('clean-production', 'copy_all_files', 'copy_css_files', 'copy_js_files', 'production-zip', 'zip')
    );

 

    gulp.task(
        'default',
        gulp.series('build', 'watch')
    );

})();