"use strict"

const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');


gulp.task("watch", function(){
	gulp.watch("./dev/styles/**/*.scss", ["styles"])
});

gulp.task("styles", function(){
	return gulp.src("./dev/styles/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer())
		.pipe(concat("style.css"))
		.pipe(gulp.dest("./public/styles"))
});