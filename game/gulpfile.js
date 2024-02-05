"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const babel = require('gulp-babel');
const header = require("gulp-header");
// const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const uglify = require("gulp-uglify");
const fs = require('fs'); 
const mustache = require("mustache");
const spritesmith = require("gulp.spritesmith");
const mergeStream = require('merge-stream');

// const postcss = require("gulp-postcss");
// const autoprefixer = require("autoprefixer");
// const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

// Load package.json for banner
const pkg = require('./package.json');
const { resolve } = require('path');

// Set the banner content
const banner = ['/*!/n',
  ' * http://www.halfclub.com & www.boribori.co.kr\n',
  ' * Email : customer@tricycle.co.kr\n',
  ' * Customer TEL : 1588-1812(9시~18시)\n',
  ' * © TRICYCLE CO.,LTD.ALL Rights Reserved\n',
  ' */\n',
  '\n'
].join('');



// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./src/"
    },
    port: 7003
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}




// CSS task
function css() {
  console.log('css in');
  return gulp
    .src("./src/assets/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    // .pipe(autoprefixer({
    //   browsers: ['last 2 version', 'iOS >= 8.1', 'Android >= 4.0'],
    //   cascade: false
    // }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    // .pipe(rename({
    //   suffix: ".min"
    // }))
    // .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./src/assets/css/"))
    .pipe(browsersync.stream());
}

function js() {
  return gulp.src("./src/assets/js/*.js")
    .pipe(babel())
    // .pipe(rename({
    //   suffix: ".min"
    // }))
    // .pipe(uglify())
    .pipe(gulp.dest("./src/assets/js/dist/"))
    .pipe(browsersync.stream());
}


// Watch files
function watchFiles() {
	gulp.watch(["./src/assets/scss/*.scss","./src/assets/scss/page/*.scss"], css);
	gulp.watch("./src/assets/js/*.js", js);
  gulp.watch(["./src/*.html"], browserSyncReload);
}

// Define complex tasks
const build = gulp.series(gulp.parallel(css, js));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
// exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = build;
