"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./src/"
    },
    port: 1007
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// CSS 원본 (다우<->다츠)
function cssCopy() {
  console.log('cssCopy');
  return gulp
  .src("./src/resources/css/new_ui_common.css")
  .pipe(rename('new_ui_common.scss'))
  .pipe(gulp.dest('./src/resources/scss/'));
}


// CSS task
function cssCompile() {
  console.log('css in');
  return gulp
    .src("./src/resources/scss/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(gulp.dest("./src/resources/css/",{overwrite:true}))
    .pipe(browsersync.stream());
}


// Watch files
function watchFiles() {
	gulp.watch(["./src/resources/scss/*.scss"], cssCompile);
  gulp.watch(["./src/*.html"], browserSyncReload);
}

// Define complex tasks
const build = gulp.series(gulp.parallel(cssCopy,cssCompile));
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.build = build;
exports.watch = watch;
exports.default = build;
