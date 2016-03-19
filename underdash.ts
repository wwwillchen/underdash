interface Iteraee {
  (element: any, index: number, collection: any[] | any): any
}

interface Reducer {
  (accumulator:any, element: any, index: number, collection: any[] | any): any
}

class Underdash {
  /******************************************
   *
   * CORE COLLECTION METHODS
   ******************************************/
  
  /**
   * _.each
   * iterate through a collection
   */
  each(collection: any[] | Object, fn: Iteraee): any {
    if (Array.isArray(collection)) {
      return _.arrayForEach(collection, fn);
    } else if (_.isObject(collection)) {
      return _.objectForEach(collection, fn);
    }
  }
  
  private arrayForEach(array: any[], fn) {
    for (let i = 0; i < array.length; i++) {
      fn(array[i], i, array);
    }
    return array;
  }
  
  private objectForEach(object: Object, fn) {
    for (let key in object) {
      fn(object[key], key, object);
    }
    return object
  }
  
  map(collection: any[] | Object, fn: Iteraee): any {
    const result = [];
    _.each(collection, function(value, key, collection){
      if (!_.isNil(fn(value, key, collection))) {
        result.push(fn(value, key, collection));  
      }
    })
    return result;
  }
  
  reduce(collection: any[], fn: Reducer, acc?: any): any {
    if (!acc) {
      acc = collection[0];
      collection = collection.slice(1)
    }
    _.each(collection, function(value, key, collection){
      acc = fn(acc, value, key, collection)
    })
    return acc;
  }
  
  filter(collection: any[] | Object, fn: Iteraee): any {
    return _.map(collection, function(value, key, collection){
      if (fn(value, key, collection)) {
        return value;
      }
    })
  }
  
  reject(collection: any[] | Object, fn: Iteraee): any {
    return _.filter(collection, function (value, key, collection) {
      if (!fn(value, key, collection)) {
        return value;
      }
    });
  }
  
  every(collection: any[], fn: Iteraee): any {
    return _.reduce(collection, function(acc, value, key, collection) {
      return acc && Boolean(fn(value, key, collection));
    }, true)
  }
  
  some(collection: any[], fn: Iteraee): any {
    return _.reduce(collection, function(acc, value, key, collection) {
      return acc || Boolean(fn(value, key, collection));
    }, true)
  }
  
  // Clones one level
  clone(input) {
    if (_.isObject(input)) {
      let clone = {};
      _.each(input, function(value, key){
        clone[key] = value;
      });
      return clone;
    }
    if (Array.isArray(input)) {
      let clone = [];
      _.each(input, function(value, key){
        clone[key] = value;
      });
      return clone;
    }
    return input;
  }
  
  // Recursively clones
  cloneDeep(input) {
    if (Array.isArray(input)) {
      let clone = [];
      _.each(input, (value, key) => {
        clone[key] = this.cloneDeep(value);
      });
      return clone;
    } 
    if (_.isObject(input)) {
      let clone = {};
      _.each(input, (value, key) => {
        clone[key] = this.cloneDeep(value);
      });
      return clone;
    }
    return input;
  }
  
  isEqual(input1, input2) {
    if (Array.isArray(input1) && Array.isArray(input2)) {
      return _.isArrayEqual(input1, input2);
    }
    if (_.isObject(input1) && _.isObject(input2)) {
      return _.isObjectEqual(input1, input2);
    }
    if (typeof input1 === typeof input2) {
      return (input1 === input2);
    }
  }
  
  private isArrayEqual(array1, array2){
    if (array1.length !== array2.length) { return false; }
    return _.every(array1, (value, index) => {
      return _.isEqual(value, array2[index]);
    });
  }
  
  private isObjectEqual(obj1, obj2){
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    let equalFlag = true;
    _.each(obj1, (value, key) => {
      if (!_.isEqual(value, obj2[key])){
        equalFlag = false
      };
    });
    return equalFlag;
  }
  
  /******************************************
   *
   * OBJECT METHODS
   ******************************************/
  
  // Only enumerable properties
  assign(destination, ...sources: Object[]) {
    _.each(sources, function(source: Object){
      _.each(source, function(value, key) {
        destination[key] = value;
      })
    })
    return destination;
  }
  
  // Recursively does assign
  merge(destination, ...sources: Object[]) {
    let flattenObject = (object) => {
      let result = {};
      _.each(object, (unflattenedValue, key)=>{
        if (!_.isObject(unflattenedValue)) {
          return result[key] = unflattenedValue;
        } else {
          _.each(flattenObject(unflattenedValue), (value, key) => {
            return result[key] = value;
          })
        }
      })
      return result;
    }
    
    let flattenedSources = _.map(sources, (source) => {
      return flattenObject(source);
    });
    
    _.assign(destination, ...flattenedSources);
    return destination;
  }
  
  /******************************************
   *
   * ARRAY METHODS
   ******************************************/
   
  /**
   * Flattens one level deep
   */
  flatten(array: any[]): any {
    let result = [];
    _.each(array, function(value){
      if (Array.isArray(value)) {
        result = result.concat(value);
      } else {
        return result.push(value);
      }
    });
    return result;
  }
  
  /**
   * Recursively flattens until there's no more nested array
   */
  flattenDeep(array: any[]): any {
    let result = [];
    _.each(array, (value) => {
      if (Array.isArray(value)) {
        result = result.concat(_.flattenDeep(value));
      } else {
        result.push(value);
      }
    });
    return result;
  }
  
   
  /******************************************
   *
   * OTHER CORE METHODS
   ******************************************/

    range(start: number, end: number, step: number = 1) {
      let result = [];
      while (start < end) {
        result.push(start);
        start += step;
      }
      return result;
    } 
    
   
   debounce(fn, duration) {
     return function (...args) {
       let context = this;
       let timeout;
       if (timeout) {
         clearTimeout(timeout);
       }
       timeout = setTimeout(function(){
         fn.apply(context, args)
       }, duration);
     }
   }
   
   throttle(fn, duration) {
     return function () {
       let isWaiting = false;
       return function (...args) {
        let context = this;
        if (isWaiting) {
          setTimeout(function(){
            isWaiting = false;
          }, duration)
        } else {
          fn.apply(context, args); 
        }
      }
     }
   }
   
  /******************************************
   *
   * HELPER METHODS
   ******************************************/
   /**
    * _.isFunction
    * only returns true if type is function
    * lodash checks the toString() to avoid cross-browser issues
    */
  isFunction(input: any) {
    return (typeof input === "function")
  }
  
  /**
   * _.isNil
   * returns true if null or undefined
   */
  isNil(input: any) {
    /**
     * Possible to redefine undefined in old browsers (pre-ES5)
     */
    return (input == null)
  }
  
  isObject(input: any) {
    return (input.toString() === "[object Object]")
  }
  
}

export const _ = new Underdash;