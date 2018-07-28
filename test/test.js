/* eslint-env mocha */

require('dotenv').config()
var apiKey = process.env.API_KEY

var nock = require('nock')
var axios = require('axios')
var expect = require('chai').expect
nock('https://api.themoviedb.org')
  .get('/3/search/movie?api_key=' + apiKey + '&query=logan')
  .reply(200, {status: 'OK'})

// -----------------------------------------------------------------------------
// Run the tests
// -----------------------------------------------------------------------------

describe('API', function () {
  describe('grab movie API info test', function () {
    it('returns OK', function (done) {
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=logan')
        .then(function (response) {
          expect(response.data.status).to.equal('OK')
          done()
        })
        .catch(done)
    })
  })
})
