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
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-cssmin')

  grunt.registerTask('default', ['concat', 'cssmin'])
}
