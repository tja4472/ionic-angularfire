var ngTemplate = require('../dist/plugins/ng-template').ngTemplate;
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

// https://github.com/rollup/rollup/wiki/JavaScript-API

module.exports = {
  /**
   * entry: The bundle's starting point. This file will
   * be included, along with the minimum necessary code
   * from its dependencies
   */
  entry: './.tmp/app/main.dev.js',

  /**
   * sourceMap: If true, a separate sourcemap file will
   * be created.
   */
  sourceMap: true,

  /**
   * format: The format of the generated bundle
   */
  format: 'iife',

  /**
   * dest: the output filename for the bundle in the buildDir
   */
  dest: 'main.js',
 
 
 useStrict: false,
  /**
   * plugins: Array of plugin objects, or a single plugin object.
   * See https://github.com/rollup/rollup/wiki/Plugins for more info.
   */
  plugins: [
    ngTemplate(),
commonjs(
    {    
/*
        include: [
        'node_modules/rxjs/**',
        'node_modules/angularfire2/**',
        'node_modules/firebase/**'
        ],
*/        
        namedExports: {
        'node_modules/angularfire2/node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
        'node_modules/angularfire2/node_modules/firebase/firebase-browser.js': ['initializeApp', 'auth', 'database'],
        'node_modules/firebase/firebase.js': ['initializeApp', 'auth', 'database'],
        }
    }),
    nodeResolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    })
  ]

};
