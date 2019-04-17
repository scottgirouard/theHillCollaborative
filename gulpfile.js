var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();
    browserify = require("browserify");

    var paths = {
        styles: {
            //By using styles/**/*.sass we're telling Gulp to check all folders for any sass file
            src: "src/scss/*.scss",

            dest: "public/styles"
        }
    };

    function style() {
        return gulp 
            .src(paths.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on("error", sass.logError)
            // Use postcss with autoprexifer and compress the compiled file using cssnano
            .pipe(postcss([autoprefixer(), cssnano()]))
            // now add/write the sourcemaps
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream());
    }

    // Task to reload the page

    function reload() {
        browserSync.reload({stream:true});
    }

    // Add browsersync initilization at the start of the watch task

    function watch() {
        browserSync.init({
            
            server: {
                baseDir: "./"
            }
        });
        gulp.watch(paths.styles.src, style);
        gulp.watch("src/*.html", reload);
    }

    exports.watch = watch

    exports. style = style;

    var build = gulp.parallel(style, watch)
    
    gulp.task('build', build);

    gulp.task('default', build);