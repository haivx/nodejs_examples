const mocha = require('mocha')
const chai = require('chai')
chai.should()
const math = require('../pt2')

describe("Test file pt2 ", () => {
	it('if a is not number throw error', () => {
		(function () {
			math.pt2('bad param', 10, 2)
		}).should.throw('a is not number')
	})

	it('if b is not number throw error', () => {
		(function () {
			math.pt2(1, 'ijojo', 2)
		}).should.throw('b is not number')
	})

	it('if c is not number throw error', () => {
		(function () {
			math.pt2(1, 2, 'abc')
		}).should.throw('c is not number')
	})

	it('if delta < 0 throw error', () => {
		(function () {
			math.pt2(1, 1, 1)

		}).should.throw('delta nho hon 0')
	})


});
