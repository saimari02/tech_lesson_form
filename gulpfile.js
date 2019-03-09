var gulp = require('gulp'); //gulp4
var plumber = require('gulp-plumber');
var cache = require('gulp-cached');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync").create();
// var php = require('gulp-connect-php');
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');
// var mozjpeg = require('imagemin-mozjpeg');
// var gifsicle = require('imagemin-gifsicle');
// var svgo = require('imagemin-svgo');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var del = require('del');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');

// Setting
BUILD_DIRECTORY = './build/';
RESOURCE_DIRECTORY = './src/';

// Pugをコンパイル
gulp.task('pug', function () {
    return gulp
        .src([RESOURCE_DIRECTORY + 'pug/**/!(_)*.pug' , '!' + RESOURCE_DIRECTORY + 'pug/wp-content/themes/**/*.pug'])
        .pipe(cache('pug'))
        .pipe(plumber())
        .pipe(pug({pretty: true, basedir: RESOURCE_DIRECTORY + 'pug/'}))
        .pipe(gulp.dest(BUILD_DIRECTORY))
        .on('error', console.error.bind(console))
});

// Sassをコンパイル
gulp.task('scss', function() {
    return gulp
        .src([RESOURCE_DIRECTORY + 'scss/**/*.scss', '!' + BUILD_DIRECTORY + 'scss/**/_*.scss'])
        .pipe(cache('scss'))
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(autoprefixer({grid: true, cascade: false, browsers: ['ie < 11','< 5%']}))
        .pipe(gulp.dest(BUILD_DIRECTORY))
        .on('error', console.error.bind(console))
});

// Browser-sync サーバーを立てる
gulp.task('serve', function(done) {
        browserSync.init({
            server: BUILD_DIRECTORY,// PHPサーバーの指定
            port: 9001, // ポート番号の指定
            open: 'external',// IPアドレスでアクセス
            notify: false, // 右上Browser-syncの非表示
            baseDir: BUILD_DIRECTORY,
            startPath: '/index.html',
            files: [BUILD_DIRECTORY + '**/*.css',
                    BUILD_DIRECTORY + '**/*.html',
                    BUILD_DIRECTORY + '**/*.js'],
        });
        done()
});

// 画像を圧縮
// gulp.task('imagemin', () => {
//     return gulp
//         .src([RESOURCE_DIRECTORY + 'assets/**/*.{jpg,jpeg,png,gif,ico,svg}'])
//         .pipe(changed(BUILD_DIRECTORY))
//         .pipe(imagemin([
//             pngquant({
//                 quality: '70-75',  // 画質
//                 speed: 1,  // 最低のスピード
//                 floyd: 0,  // ディザリングなし
//             }),
//             mozjpeg({
//                 quality: 85, // 画質
//                 progressive: true
//             }),
//             imagemin.svgo({
//                 plugins: [
//                     {removeViewBox: false},
//                     {cleanupIDs: false},
//                     {removeTitle: false},
//                     {removeDimensions: false},
//                     {removeUnknownsAndDefaults:{keepDataAttrs: true, keepRoleAttr: true}},
//                     {removeUselessStrokeAndFill: true},
//                 ]
//             }),
//             imagemin.gifsicle()
//         ]))
//         .pipe(gulp.dest(BUILD_DIRECTORY))
//         .on('error', console.error.bind(console))
// });

// アセットフォルダから書き出しディレクトリに画像をコピー
gulp.task('copy', function() {
    return gulp
        .src([RESOURCE_DIRECTORY + 'assets/**', '!' + RESOURCE_DIRECTORY + 'assets/**/*.+(jpg|jpeg|png|gif|svg|ico|js)'])
        .pipe(cache('copy'))
        .pipe(gulp.dest(BUILD_DIRECTORY))
        .on('error', console.error.bind(console))
});
// CSSを圧縮して「.min.css」として生成
gulp.task('cssmin', function() {
    return gulp
        .src([BUILD_DIRECTORY + '**/*.css', '!' + BUILD_DIRECTORY + '**/*.min.css'])
        .pipe(cache('cssmin'))
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(BUILD_DIRECTORY))
        .on('error', console.error.bind(console))
});

// 変更を監視してタスクを実行する
gulp.task('watch', (done) => {
    const browserReload = (done) => {
        browserSync.reload()
        done()
    }
    gulp
        .watch([RESOURCE_DIRECTORY + 'pug/**/*.pug'], gulp.parallel('pug', browserReload))
    gulp
        .watch([RESOURCE_DIRECTORY + 'scss/**/*.scss'], gulp.parallel('scss','cssmin', browserReload))
    gulp
        .watch([BUILD_DIRECTORY + '**/*.html', BUILD_DIRECTORY + '**/*.css', BUILD_DIRECTORY + '**/*.js'], browserReload)
})

// デフォルトのタスク
gulp.task('default', gulp.series(
    gulp.parallel('pug', 'scss', 'cssmin', 'copy'),
    'serve',
    'watch'
    )
)