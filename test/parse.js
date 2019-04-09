var expect = require('chai').expect;
var fs = require('fs');
var rl = require('../index');

describe('TSV parser', function() {

	var validate;
	before('setup validator', ()=>
		validate = (data, done) => {
			expect(data).to.be.an('array');
			expect(data).to.have.length(3);
			expect(data).to.be.deep.equal([
				{title: 'Paper 1', author: 'Joe Random'},
				{title: 'Paper 2', author: 'Jane Quark'},
				{title: 'Paper 3', author: 'Eric Electron'},
			]);
			done();
		}
	);

	it('should parse TSV content from a string', next => {
		var refs = [];
		rl.parse(fs.readFileSync(`${__dirname}/data/test.tsv`))
			.on('ref', ref => refs.push(ref))
			.on('error', next)
			.on('end', ()=> validate(refs, next))
	});

	it('should parse TSV content from a stream', next => {
		var refs = [];
		rl.parse(fs.createReadStream(`${__dirname}/data/test.tsv`))
			.on('ref', ref => refs.push(ref))
			.on('error', next)
			.on('end', ()=> validate(refs, next))
	});

});
