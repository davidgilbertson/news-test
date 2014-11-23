var chai = require('chai')
  , path = require('path')
;
chai.should();

describe('Utilities', function() {
  var utils = require(path.join('..', 'server', 'utils'));

  describe('#formatDate()', function() {
    it('should convert time to string', function() {
      var dateAsTime = 1416702420061; //23 Nov 2014
      var formattedDate = utils.formatDate(dateAsTime);
      formattedDate.should.equal('23/11/2014');
    });
  });

  describe('#toProperCase()', function() {
    it('should convert time to string', function() {
      var lowerCaseString = 'the quick brown fox...';
      var properCaseString = utils.toProperCase(lowerCaseString);
      properCaseString.should.equal('The Quick Brown Fox...');
    });
  });
});