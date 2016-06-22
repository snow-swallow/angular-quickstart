var gulp = require('gulp'),
  bowerFiles = require('main-bower-files'), // We can use wiredep as option B =)
  jshint = require('gulp-jshint'), // gulp-jshint depends on jshint, so should install jshint first
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  stripDebug = require('gulp-strip-debug'),
  inject = require('gulp-inject'),
  templateCache = require('gulp-angular-templatecache');
//TBC: gulp-rev, gulp-rev-replace, packages, rename, htmlmin, imagemin

var paths = {
  js: ['./js/app.js', 'js/**/*.js'],
  css: ['./style/**/*.css'],
  templates: './js/templates.js',
  buildjs: ['./build/**/*.js'],
  buildcss: ['./build/**/*.css']
};

var Environment = { PROD: 'prod', DEV: 'dev' };

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['./build', paths.templates]);
});

gulp.task('jshint', function() {
  gulp.src(paths.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('template', function () {
  return gulp.src('./view/**/*.html')
      .pipe(templateCache({module: 'myApp'}))
      .pipe(gulp.dest('./js'))
});

gulp.task('devIndex', function () {
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  return gulp.src('./index.html')
      .pipe(
        inject(
          gulp.src(paths.js, {read: false}),
          {relative: true}
        )
      )
      .pipe(
        inject(
          gulp.src(paths.css, {read: false}),
          {relative: true}
        )
      )
      .pipe(
        inject(
          gulp.src(bowerFiles(), {read: false}),
          {name: 'bower', relative: true}
        )
      )
      .pipe(gulp.dest('./'));
});

gulp.task('deployIndex', ['deployJS', 'deployCSS'], function () {
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  return gulp.src('./index.html')
      .pipe(
          inject(
              gulp.src(paths.buildjs, {read: false}),
              {relative: true}
          )
      )
      .pipe(
          inject(
              gulp.src(paths.buildcss, {read: false}),
              {relative: true}
          )
      )
      .pipe(
          inject(
            gulp.src(bowerFiles(), {read: false}),
            {name: 'bower', relative: true}
          )
      )
      .pipe(gulp.dest('./'));
});

gulp.task('deployJS', function() {
  if (deployEnvironment == Environment.DEV) { // DEV
    return gulp.src(paths.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./build'));
  } else { // PROD
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build'));
  }
});

gulp.task('deployCSS', function() {
  return gulp.src(paths.css)
      .pipe(cssmin())
      .pipe(concat('all.css'))
      // .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./build'));
});

// gulp.task('deployBower', function() {
//   gulp.src(bowerFiles())
//       .pipe(concat('bower.all.js'))
//       .pipe(gulp.dest('./build'))
// });

gulp.task('deploy', ['template'], function () {
  gulp.run('deployIndex');
});

gulp.task('develop', function () {
  gulp.run('devIndex');
});

var deployEnvironment = Environment.DEV;
// set target environment
gulp.task('default', ['clean', 'jshint'], function() {
  gulp.run('develop');
});
