"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-bake');

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
                // основной файл css
                "build/css/style.min.css": ["build/css/style.css"],
                // файлы css из плагинов для минификации и объеденения
                "build/css/library.min.css": ["js/library-css/timelify.css",
                                            "js/library-css/slicknav.css",
                                            "js/library-css/selectric.css"]
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
          src: ["build/*.html", "build/css/*.css", "build/js/*.js"]
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
        bake: {
            files: [ "app/**/**" ],
            tasks: "bake:build"
        },
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
      },
      
      concat: {
      options: {
          // "включает" использование баннера
          stripBanners: true, 
          banner: "/**/"
      },
          dist: {
              // файлы для склеивания
              src: ['js/library-js/jquery.timelify.js',
                    'js/library-js/jquery.slicknav.min.js', 
                    'js/library-js/jquery.selectric.js'], 
              // где будут находиться склеенные файлы
              dest: 'build/js/project.js'
          }
          
      },
      
      uglify: {
          my_target: {
              options: {
                  beautify: true
              },
              files: {
                  //минимфикация в той же папке, где и основной файл 
                  "build/js/project.min.js": ['build/js/project.js']
              }
          }
      },
      bake: {
          build: {
              options: {
                  content: "app/content.json",
                  section: "de"
              },
              
              files: { 
                  // указываются из каких шаблонов формируются готовые страницы
                  // из base.html в index-1.html
                  'index-1.html': 'app/base.html', 
                  'crm-2.html': 'app/base.html',
                  'platform-2.html': 'app/platform.html',
              }
          }
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
    "concat",
    "uglify",
    "bake",
//    "imagemin"
  ]);
};
