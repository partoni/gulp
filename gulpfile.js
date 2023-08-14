const {src, dest, watch,parallel}= require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create()

function style() {
    return src('src/assets/css/*.css')
    .pipe(concat('mainCss.min.css'))
    .pipe(dest('src/css'))
}

function scripts() {
    return src(['src/js/*','!mainJs.min.js'])
    .pipe(concat('mainJs.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
}

function watching(){
    watch(['src/assets/css/*.css'],style)
    watch(['src/js/*','!mainJs.min.js'],scripts)
    watch(['src/**/*.html']).on('change',browserSync.reload)
}
function browsersync() {
    browserSync.init( {
        server: {
            baseDir: "src/"
        }
    })
}
exports.style = style
exports.browsersync = browsersync
exports.default = parallel(style,scripts,watching,browsersync)