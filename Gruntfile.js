"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    sass: {
      style: {
        files: {
          "build/css/style.css": "sass/style.scss"
        }
      }
    },
      
    csso: {
        style: {
            options: {
                report: "gzip"
            },
            files: {
                "build/css/style.min.css": ["build/css/style.css"]
            }
        }
    },

    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers: [
              "last 1 version",
              "last 2 Chrome versions",
              "last 2 Firefox versions",
              "last 2 Opera versions",
              "last 2 Edge versions"
            ]})
          ]
        },
        src: "build/css/*.css"
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: ["build/*.html", "build/css/*.css"]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
        html: {
            files: ["*.html"],
            tasks: ["copy:html"]
        },
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"],
        options: {
          spawn: false
        }
      }
    },
      
    copy: {
        build: {
            files: [{
                expand: true,
                src: [
                    "fonts/**/*.{woff, woff2}",
                    "img/**",
                    "js/**",
                    "*.html"
                ],
                dest: "build"
            }]
        },
        html: {
            files: [{
                expand: true,
                src: ["*.html"],
                dest: "build"
            }]
        }
    },
      
      clean: {
          build: ["build"],
      }
      
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask('default', ['copy']);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "postcss",
    "csso",
//    "imagemin"
  ]);
};
