import {_} from "./underdash";
import chai = require('chai');
var expect = chai.expect;

console.log("_", _)
describe("Underdash", function(){
  
  it("exists", function(){
    expect(typeof _).to.equal("object");
  });
  
  describe("each()", function(){
    it("works for arrays", function(){
      const array = []
      let double = (x) => array.push(x * 2)
      _.each([1,2,3], double)
      expect(array).to.eql([2,4,6])    
    })
  });
  
  describe("map()", function(){
    
  });
  
  describe("reduce()", function(){
    
  })

  describe("filter()", function(){
    
  })

  describe("reject()", function(){
    
  })
  
  
})