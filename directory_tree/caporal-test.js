/**
 * Test caporal
 */
const path = require('path');
const fs = require('fs');
const prog = require('caporal');
const displaytree = require('./new')
prog
  .version('1.0.0')
  .description('Display tree structure from a source path')
  .command('displayTree', 'Display tree directory')
  .argument('<sourcePath>', 'Search query')
  .action(function (args) {
    //const sourcePath = '/home/xuanhai/Desktop/nodejs_examples/directory_tree/CSS-framework';
    displaytree(args.sourcePath)
  })

prog.parse(process.argv);