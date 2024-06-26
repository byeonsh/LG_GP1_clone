// import npm

const { series, parallel, watch, src, dest, lastRun } = require('gulp');
const clean = require('gulp-clean');
const fs = require('fs');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
// const htmlbeautify = require('gulp-html-beautify');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
// const exp = require('constants');
const rtlcss = require('gulp-rtlcss');
const replace = require('gulp-replace');
const filter = require('gulp-filter');

// variable
// const dist = '/Applications/mampstack-8.1.10-0/apache2/htdocs';
const dist = 'dist';
const rtlDist = dist;

function handleError(err) {
  console.log(err);
  this.emit('end');
}

function cleanTask(cb) {
  if (fs.existsSync('dist')) {
    src('dist', { read: false }).pipe(clean());
  }
  cb();
}

function copyTask(cb) {
  src(['src/**/*.*', '!src/**/*.@(pug|scss|js)'], { since: lastRun(copyTask) }).pipe(dest(dist));
  cb();
}

function cssTask(cb) {
  const beforeRTLFilter = filter(['*.css']);
  const rtlAnnotation = /\;\s\/\*rtl:.+\*\//g;

  src('src/**/!(_)*.scss', { since: lastRun(cssTask), sourcemaps: true })
    .pipe(sourcemaps.init())
    // .pipe(sass({ outputStyle: "compressed", sourceMap: true }).on('error', sass.logError))
    .pipe(sass({ sourceMap: true }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(dist))
    // "RTL" : Start
    .pipe(beforeRTLFilter)
    // .pipe( // check "lastRun" and "target file"
    //     rename(param => {
    //         console.log(param);
    //     })
    // )
    .pipe(rtlcss())
    .pipe(rename({ suffix: '-rtl' }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest(rtlDist));
  cb();
}

function jsTask(cb) {
  src('src/**/*.js', { since: lastRun(jsTask), sourcemaps: true })
    .pipe(sourcemaps.init())
    // .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(sourcemaps.write('./'))
    .on('error', handleError)
    .pipe(dest(dist));
  cb();
}

function htmlTask(cb) {
  const targetLinkRef = /(main|dev|([^min]+[0-9]*))\.css/g; // 230523 RTL 수정
  src(['src/**/!(_)*.pug', '!src/**/MLEmail/*.pug'], { since: lastRun(htmlTask) })
    .pipe(pug({ doctype: 'html', pretty: true }))
    .on('error', handleError)
    // .pipe(htmlbeautify({indentSize: 2}))
    .pipe(dest(dist))
    // "RTL" : Start
    .pipe(replace(`dir="ltr"`, `dir="rtl"`))
    .pipe(
      replace(targetLinkRef, function handleReplace(match) {
        const changeWord = match.replace('.css', '-rtl.css');
        return changeWord;
      })
    )
    .pipe(rename({ suffix: '-rtl' }))
    .pipe(dest(rtlDist));
  cb();
}

function manualHtmlRtlTask(cb) {
  src('src/**/MLEmail/*.pug', { since: lastRun(manualHtmlRtlTask) })
    .pipe(pug({ doctype: 'html', pretty: true }))
    .on('error', handleError)
    .pipe(dest(rtlDist));
  cb();
}

function watchTask(cb) {
  // eslint-disable-next-line no-shadow
  watch(
    'src/**/*.*',
    { delay: 500, queue: false, events: 'all', followSymlinks: true, usePolling: true },
    function (cb) {
      // body omitted
      htmlTask(cb);
      manualHtmlRtlTask(cb);
      cssTask(cb);
      jsTask(cb);
      copyTask(cb);
      cb();
    }
  );
}

const buildTask = parallel(htmlTask, manualHtmlRtlTask, cssTask, jsTask, copyTask);

exports.clean = cleanTask;
exports.watch = watchTask;
exports.build = buildTask;
exports.default = series(buildTask, watchTask);
exports.test = cssTask;
