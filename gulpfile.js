var gulp = require('gulp');

var config_css = {
  src: './client/components/**/*.css',
  srcVariables: './client/styles/appstyle-config.js',
  destDir: './client/dist',
  destFileName: 'app.css'
};

gulp.task('css:build', function () {
  var sourcemaps = require('gulp-sourcemaps');

  return gulp
    .src(config_css.src)
    .pipe(require('gulp-plumber')())
    .pipe(sourcemaps.init())
    .pipe(require('gulp-concat')(config_css.destFileName))
    .pipe(
      require('gulp-postcss')([
        require('precss')({ /* options */ }),
        require('postcss-simple-vars')({
          variables: require(config_css.srcVariables)
        })
      ])
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config_css.destDir));
});

gulp.task('css:watch', ['css:build'], function() {
  gulp.watch(config_css.src, ['css:build'])
})
