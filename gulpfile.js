const gulp = require('gulp'),
      fs = require('fs'),
      $ = require('gulp-load-plugins')();

const Path = {
  'Scss': 'src/scss/',
  'Ejs': 'src/ejs/',
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

gulp.task('ejs', () => {
  const config = JSON.parse(fs.readFileSync(`${Path.Ejs}config.json`));
  const data   = config.data;
  const pages  = config.pages;
    for (const page of pages) {
        gulp.src(`${Path.Ejs}**.ejs`)
            .pipe($.ejs({
                data: data,
                page: page
            }))
            .pipe($.rename(`${page.filename}.html`))
            .pipe(gulp.dest(`${Path.Dist}${page.directory}`));
    }
});


// gulp.task('ejs', () => {
//   const config = JSON.parse(fs.readFileSync(`${Path.Ejs}config.json`));
//   const data   = config.data;
//   const pages  = config.pages;
//   for (const page of pages) {
//     gulp.src(`${Path.Ejs}**/**.ejs`)
//     .pipe($.ejs({
//       data: data,
//       page: page
//     }))
//     .pipe($.rename(`${page.filename}.html`))
//     .pipe(gulp.dest(`${Path.Dist}${page.directory}`));
//   }
// });

const tasks = [
  'scss',
  'ejs',
];

gulp.task('default', tasks, () => {
  gulp.watch([`${Path.Scss}**/*.scss`], ['scss']);
  gulp.watch([`${Path.Ejs}**/**.ejs`], ['ejs']);
});