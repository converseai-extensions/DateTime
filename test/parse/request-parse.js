const _           = require('lodash');
const request     = require('supertest');
const chai        = require('chai');
const expect      = chai.expect; chai.use(require('chai-match'));
const server      = require('../lib/express');
const moment      = require('moment');
const debug       = require('debug')('test:parse');
const APP_TOKEN   = require('../../app-token');

module.exports = function(input, expected, done) {
  return request(server)
    .post('/')
    .send({
      event: 'MODULE_EXEC',
      payload: {
        moduleId: 'parse',
        moduleParam: input
      }
    })
    .set('X_CONVERSE_APP_TOKEN', APP_TOKEN)
    .expect(200)
    .end(function(err, res) {
      debug(input);
      debug(res.body.value);
      expect(res.body).to.have.property('status').to.equal(0);
      expect(res.body).to.have.property('value');
      expect(res.body.value).to.have.property('years').to.match(/\d{4}/);
      expect(res.body.value).to.have.property('months').to.match(/\d/);
      expect(res.body.value).to.have.property('date').to.match(/\d/);
      expect(res.body.value).to.have.property('hours').to.match(/\d/);
      expect(res.body.value).to.have.property('minutes').to.match(/\d/);
      expect(res.body.value).to.have.property('seconds').to.match(/\d/);
      expect(res.body.value).to.have.property('milliseconds').to.match(/\d/);
      expect(res.body.value).to.have.property('offset').to.match(/[+-]\d{2}:\d{2}/);
      expect(res.body.value).to.have.property('iso').to.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/);
      expect(res.body.value).to.have.property('utc').to.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/);
      expect(res.body.value).to.have.property('unix').to.match(/\d{10}/);

      for (var key in expected) {
        if (expected.hasOwnProperty(key)) {
          if (_.isFunction(expected[key])) {
            expected[key](res.body.value);
          } else {
            expect(res.body.value[key]).to.equal(expected[key]);
          }
        }
      }

      done();
    });
}
