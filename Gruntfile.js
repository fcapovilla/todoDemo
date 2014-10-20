module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jasmine: {
      pivotal: {
        src: 'public/js/app.js',
        options: {
          specs: 'specs/spec/*.js',
          helpers: 'specs/lib/sinon-*.js',
          template: 'specs/SpecRunner.tmpl',
          vendor: [
            'public/js/jquery-*.js',
            'public/js/lodash.min.js',
            'public/js/backbone-min.js',
            'public/js/backbone.marionette.min.js'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['jasmine']);
};
