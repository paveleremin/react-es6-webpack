'use strict';

var path = require('path');
var ghpages = require('gh-pages');

function Plugin(path, context){
    this.context = context;
    this.path = path;
}

Plugin.prototype.apply = function (compiler){
    compiler.plugin('done', (function (){
        var contentPath = path.join(this.context, this.path);
        ghpages.publish(contentPath, function (err) {
            throw new Error(err);
        });
    }).bind(this));
};

module.exports = Plugin;
