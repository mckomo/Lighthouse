(function() {

  'use strict';

  describe('Size filter', function(){

    beforeEach(module('lighthouse'));

    it("format size to bytes", inject(function(sizeFilter) {
      var result = sizeFilter(128);

      expect(result).toBe('128.00 B');
    }));

    it("format size to Kilobytes", inject(function(sizeFilter) {
      var result = sizeFilter(128 * 1000 + 100);

      expect(result).toBe('128.10 kB');
    }));

  });

})();
