interface Iteraee {
  (element: any, index: number, collection: any[] | any): any
}

class Underdash {
  /******************************************
   *
   * CORE COLLECTION METHODS
   ******************************************/
  /**
   * _.each()
   * iterate through a collection
   */
  each(collection: any[] | any, fn: Iteraee) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        fn(collection[i], i, collection);
      }
      return collection;
    }
  }
}

export const _ = new Underdash;