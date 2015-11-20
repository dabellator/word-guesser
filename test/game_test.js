var chai = require('chai');
var expect = chai.expect;
var game = require(__dirname + '/../lib/game');

describe('The game module', function() {

	it('should send back the proper feedback to an incorrect guess', function() {
	    var answer = 'cat';
	    var guess = 'dog';
	    var response = game(answer, guess);

	    expect(response).to.exist;
 	    expect(response.gameOver).to.eql(false);
 	    expect(response.arr).to.eql(['d0','o0','g0']);
	});	

	it('should send back the proper feedback to another incorrect guess', function() {
	    var answer = 'cat';
	    var guess = 'tap';
	    var response = game(answer, guess);

	    expect(response).to.exist;
 	    expect(response.gameOver).to.eql(false);
 	    expect(response.arr).to.eql(['t1','a2','p0']);
	});

	it('should send back the proper feedback to a winning guess', function() {
	    var answer = 'cat';
	    var guess = 'cat';
	    var response = game(answer, guess);

	    expect(response).to.exist;
 	    expect(response.gameOver).to.eql(true);
 	    expect(response.arr).to.eql(['c2','a2','t2']);
	});

	it('should still send back the proper feedback to a guess and answer which both have multiple repeated letters', function() {
	    var answer = 'bookkeeper';
	    var guess = 'bbookkeepr';
	    var response = game(answer, guess);

	    expect(response).to.exist;
 	    expect(response.gameOver).to.eql(false);
 	    expect(response.arr).to.eql(['b2','b0','o2', 'o1', 'k2', 'k1', 'e2', 'e1', 'p1', 'r2']);
	});
});