const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

const Path = {
  'Scss': 'src/scss/',
  'Dist': 'dist/',
};

gulp.task('scss', () => {
    gulp.src(`${Path.Scss}**/*.scss`)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle:'expanded'
        }))
        .pipe($.autoprefixer({
            browsers: ['last 3 version'],
            cascade: false,
        }))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(`${Path.Dist}css/`))
});

const tasks = [
  'scss',
];

gulp.task('default', tasks, () => {
  gulp.watch([`${Path.Scss}**/*.scss`], ['scss']);
});