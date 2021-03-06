module.exports = Stream;

var Parser = require("./Parser.js"),
    /**** THIS LOOKS PROBLEMATIC - no stream lib? ****/    
    // WritableStream = require("stream").Writable || require("../../readable-stream").Writable;
    WritableStream = {};

function Stream(cbs, options){
	var parser = this._parser = new Parser(cbs, options);

	WritableStream.call(this, {decodeStrings: false});

	this.once("finish", function(){
		parser.end();
	});
}

require("../../util").inherits(Stream, WritableStream);

WritableStream.prototype._write = function(chunk, encoding, cb){
	this._parser.write(chunk);
	cb();
};