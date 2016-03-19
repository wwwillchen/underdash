import {_} from './underdash';
import chai = require('chai');
var expect = chai.expect;

describe('Underdash', function() {

  it('exists', function() { 
    expect(typeof _).to.equal('object'); 
  });

  describe('each()', function() {
    it('works for arrays', function() {
      const array = [];
      let double = (x) => array.push(x * 2);
      _.each([1, 2, 3], double);
      expect(array).to.eql([2, 4, 6]);
    });
    it("works for objects", function() {
      const result = {};
      let double = (value, key) => result[key] = value * 2;
      _.each({a: 1, b: 2, c: 3}, double);
      expect(result).to.eql({a: 2, b: 4, c: 6})
    });
  });

  describe('map()', function() {
    it("array", function(){
      const double = x => x * 2
      expect(_.map([1, 2, 3], double)).to.eql([2,4,6])
    });
  });

  describe('reduce()', function() {
    it("array", function(){
      const sum = (acc, value) => acc += value
      expect(_.reduce([1,2,3], sum)).to.eql(6)
    });
  });

  describe('filter()', function() {
    it("array", function(){
      const odd = n => (n % 2 === 1)
      expect(_.filter([1,2,3], odd)).to.eql([1, 3])
    });
  });

  describe('reject()', function() {
    it("array", function(){
      const odd = n => (n % 2 === 1)
      expect(_.reject([1,2,3], odd)).to.eql([2])
    });
  });

  describe('every()', function() {
    it("array", function(){
      const odd = n => (n % 2 === 1)
      expect(_.every([3,5,7], odd)).to.equal(true)
      expect(_.every([3,5,7, 2], odd)).to.equal(false)
    });
  });

  describe('some()', function() {
    it("returns true if at least one truthy value from iteraee", function(){
      const odd = n => (n % 2 === 1)
      expect(_.some([3,5,7], odd)).to.equal(true)
      expect(_.some([3,5,7, 2], odd)).to.equal(true)
      expect(_.some([2, 4, 6], odd)).to.equal(false)
    });
  });
 
  describe('clone()', function() {
    it("array", function(){
      const input = [1,2,3];
      const clonedInput = _.clone(input);
      expect(_.isEqual(input, clonedInput)).to.equal(true)
    });
    it("object", function(){
      const input = {a: 1, b: 2, c: 3};
      const clonedInput = _.clone(input);
      expect(_.isEqual(input, clonedInput)).to.equal(true)
    });
  });
 
  describe('cloneDeep()', function() {
    it("simple array", function(){
      const input = [1,2,3];
      const clonedInput = _.cloneDeep(input);
      expect(_.isEqual(input, clonedInput)).to.equal(true)
    });
    
    it("simple object", function(){
      const input = {a: 1, b: 2, c: 3};
      const clonedInput = _.cloneDeep(input);
      expect(_.isEqual(input, clonedInput)).to.equal(true)
    });
    
    it("nested array", function(){
      const input = [1,2,[3, 4, [5]]];
      const clonedInput = _.cloneDeep(input);
      expect(_.isEqual(input, clonedInput)).to.equal(true);
    });
    it("nested object", function(){
      const input = {a: 1, b: {a: 2, c: 3}};
      const clonedInput = _.cloneDeep(input);
      expect(_.isEqual(input, clonedInput)).to.equal(true)
      input.b.a = 1;
      expect(_.isEqual(input, clonedInput)).to.equal(false)
    });
    it("nested array + object", function(){
      const input = {a: 1, b: {a: 2, c: [3, 4, [5, {a: 1}]]}};
      const clonedInput = _.cloneDeep(input);
      expect(_.isEqual(input, clonedInput)).to.equal(true)
      input.b.a = 1;
      expect(_.isEqual(input, clonedInput)).to.equal(false)
    });
  });
  
  describe('isEqual()', function() {
    it("simple array", function(){
      expect(_.isEqual([1,2,3], [1,2,3])).to.equal(true);
      expect(_.isEqual([1,2,3], [1,2])).to.equal(false);
    });
    
    it("simple object", function(){
      expect(_.isEqual({a: 1, b: 2, c: 3}, {a: 1, b: 2, c: 3})).to.equal(true);
      expect(_.isEqual({a: 1}, {a: 2, c: 4})).to.equal(false);
    });
    
    it("nested array", function(){
      expect(_.isEqual([1,2,[3, 4, [5]]], [1,2,[3, 4, [5]]])).to.equal(true);
      expect(_.isEqual([1,2,[3, 4, [5]]], [1,2,[3, 4, [5, 7]]])).to.equal(false);
    });
    it("nested object", function(){
      expect(_.isEqual({a: 1, b: {a: 2, c: 3}}, {a: 1, b: {a: 2, c: 3}}))
        .to.equal(true);
      expect(_.isEqual({a: 1, b: {a: 2, c: 3}}, {a: 1, b: {a: 2}}))
        .to.equal(false);
    });
    it("nested array + object", function(){
      expect(_.isEqual({a: 1, b: {a: 2, c: [3, 4, [5, {a: 1}]]}}, {a: 1, b: {a: 2, c: [3, 4, [5, {a: 1}]]}}))
        .to.equal(true);
    });
  });
  
  describe('assign()', function() {
    it("assigns all enumerable (incl. inherited) props", function(){
      expect(_.assign({a: 1, b: 2}, {b: 3, c: 4, d: 5}, {d: 6}))
        .to.eql({a: 1, b: 3, c: 4, d: 6})
    });
  });
  describe('merge()', function() {
    it("recursively assign()", function(){
      expect(_.merge({a: 1, b: 2}, {b: 3, nested: {c: 4, d: 5 }}, {d: 6}))
        .to.eql({a: 1, b: 3, c: 4, d: 6})
    });
  });
  
  describe('flattenDeep()', function() {
    it("recursively flattens", function(){
      expect(_.flattenDeep([1,[2],[3,[4]]])).to.eql([1,2,3,4])
    });
  });
  
  describe("range()", function() {
    it("creates array", function(){
      expect(_.range(1, 11, 2)).to.eql([1, 3, 5, 7, 9])
    });
  });
  describe("isFunction()", function(){
    it("true for function", function() {
      expect(_.isFunction(function(){})).to.equal(true)  
    });
    it("false for all other types", function() {
      expect(_.isFunction(1)).to.equal(false)  
      expect(_.isFunction({})).to.equal(false)  
      expect(_.isFunction([])).to.equal(false)  
    });    
  });

  describe("isNil()", function(){
    it("true for null or undefined", function() {
      expect(_.isNil(null)).to.equal(true)  
      expect(_.isNil(undefined)).to.equal(true)  
    });
    it("false for all other types", function() {
      expect(_.isNil(1)).to.equal(false)  
      expect(_.isNil({})).to.equal(false)  
      expect(_.isNil([])).to.equal(false)  
      expect(_.isNil(false)).to.equal(false)  
    });    
  });


})