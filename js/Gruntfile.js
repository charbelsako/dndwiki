module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: '../css/*.css',
        dest: '../css/main.min.css'
      }
    },
    cssmin: {
      target: {
        files: {
          '../css/main.min.css': ['<%= concat.dist.dest %>']
        }
      }
    },
    cwebp: {
      dynamic: {
        options: {
          q: 50
        },
        files: [
          {
            expand: true,
            cwd: '../img/landing_page/',
            src: ['*.{png,jpg,gif}'],
            dest: './../img/dist/'
          }
        ]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-cwebp')

  grunt.registerTask('concatCss', 'concat')
  grunt.registerTask('minCss', 'cssmin')
  grunt.registerTask('minImgs', 'cwebp')

  grunt.registerTask('default', ['concatCss', 'minCss', 'minImgs'])
}
