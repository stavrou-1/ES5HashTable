var Hash = function(string, max) {
    if (!string || !max) {
      return null;
    }
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
      hash += string.charCodeAt(i);
    }
    return hash % max;
  };
  //
  console.log(Hash('Armadillo', 24))
  
  var HashTable = function(maxLimit) {
    var storage = [];
    
    this.print = function() {
      console.log(storage);
    };
    
    this.add = function(key, value) {
      var index = Hash(key, maxLimit);
      if (storage[index] === undefined) {
        storage[index] = [ [key, value] ];
      } else {
        var inserted = false;
        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            // this replaces the key value pair.
            storage[index][i][1] = value;
            inserted = true; 
          }
        }
        if (!inserted) {
          storage[index].push([key, value]);
        }
      }
    };
    
    this.remove = function(key) {
      var index = Hash(key, maxLimit);
      if (storage[index].length === 1 && storage[index][0][0] === key) {
        delete storage[index];
      } else {
        for (var i = 0; i < storage[index].length; i++) {
          delete storage[index][i];
        }
      }
    };
    
    this.find = function(key) {
      var index = Hash(key, maxLimit);
      if (storage[index] === undefined) {
        return undefined;
      } else {
        for (var i = 0; i < storage[index].length; i++) {
          if (storage[index][i][0] === key) {
            return storage[index][i][1]; // just return our value;
          }
        }
      }
    };
    
  }
  
  var ha = new HashTable(24);
  ha.add('mn','twins');
  ha.add('la','dodgers');
  console.log(ha.find('mn'))
  
  
  // bdd
  mocha.setup('bdd');
  
  var assert = chai.assert;
  var expect = chai.expect;
  var should = chai.should;
  
  describe('test', () => {
    it('should poop', () => {
      expect(true).to.equal(true);
    })
    it('should return the remainder', () => {
      expect(Hash('poop',2)).to.equal(0);
    })
    it('should return another Hashing test case', () => {
      expect(Hash('Armadillo'));
    })
    it('should test basic edge case', () => {
      expect(Hash(undefined,2)).to.equal(null);
    });
    it('should check 2nd edge case', () => {
      expect(Hash('Armadillo',24)).to.equal(5);
    });
  })
  describe('should test our hash table', () => {
    var instance;
    beforeEach(function() {
      instance = new HashTable(24);
      instance.add('baltimore','ravens');
    });
    it('should return the correct key', () => {
      expect(instance.find('baltimore')).to.equal('ravens');
    });
    it('should check for instance', () => {
      expect(instance instanceof HashTable).to.equal(true);
    })
    it('should check instance methods', () => {
      let props = [];
      for (var prop in instance) {
        props.push(prop);
      }
      expect(props[0]).to.equal('print');
      expect(props[1]).to.equal('add');
      expect(props[2]).to.equal('remove');
      expect(props[3]).to.equal('find');
    })
  })
  
  mocha.run();