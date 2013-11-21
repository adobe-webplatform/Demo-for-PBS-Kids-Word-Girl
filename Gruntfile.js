module.exports = function(grunt) {

    var pkg = grunt.file.readJSON("package.json");

    // Project configuration.
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: './src/',
                        src: [
                            '*',
                            '!config.rb',
                            'js/vendor/requirejs/require.js',
                            'js/vendor/*'
                            ],
                        dest: './site/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: './src',
                        src: ['assets/**'],
                        dest: './site/'
                    }
                ]
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: "main",
                    baseUrl: "./src/js/",
                    mainConfigFile: "./src/js/main.js",
                    out: "./site/js/main.js"
                }
            }
        },
        compass: {
            dist: {
                options: {
                    config: './src/config.rb',
                    sassDir: './src/sass',
                    cssDir: './site/css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-contrib-compass");

    grunt.registerTask("default", ["copy", "requirejs", "compass"]);
};