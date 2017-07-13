/**
 * Created by xuanhai on 06/07/2017.
 */
const mocha = require('mocha')
const  chai = require('chai')
chai.should()
const  testing = require('../ex1')

describe("Kiem tra so chia het cho 5", () =>{
  it('if a is not number throw error', () => {
    (function () {
      testing.devideFive("sfdf")
    }).should.throw('a is not a number')
  })
})
