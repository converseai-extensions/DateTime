const _           = require('lodash');
const request     = require('supertest');
const chai        = require('chai');
const expect      = chai.expect; chai.use(require('chai-match'));
const server      = require('../lib/express');
const moment      = require('moment');
const debug       = require('debug')('test:parse');
const APP_TOKEN   = require('../../app-token');


function loop(obj, expected) {
  for (var key in expected) {
    if (expected.hasOwnProperty(key)) {
      if (_.isFunction(expected[key])) {
        expected[key](obj);
      } else if (_.isObject(expected[key])) {
        loop(obj[key], expected[key]);
      } else {
        expect(obj[key]).to.equal(expected[key]);
      }
    }
  }
}

function testDate(input, expected, done, moduleId = 'parse') {
  return request(server)
    .post('/')
    .send({
      event: 'MODULE_EXEC',
      payload: {
        moduleId: moduleId,
        moduleParam: input
      }
    })
    .set('X_CONVERSE_APP_TOKEN', APP_TOKEN)
    .expect(200)
    .end(function(err, res) {
      if (_.isFunction(expected)) {
        expected(err, res, done);
      } else {
        debug(input);
        debug(res.body.value);
        expect(res.body).to.have.property('status').to.equal(0);
        expect(res.body).to.have.property('value');
        expect(res.body.value).to.have.property('years').to.match(/\d{4}/);
        expect(res.body.value).to.have.property('months').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('date').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('hours').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('minutes').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('seconds').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('milliseconds').to.match(/\d{1,3}/);
        expect(res.body.value).to.have.property('offset').to.match(/[+-]\d{2}:\d{2}/);
        expect(res.body.value).to.have.property('iso').to.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/);
        expect(res.body.value).to.have.property('utc').to.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})\:(\d{2})\:(\d{2})[+-](\d{2})\:(\d{2})/);
        expect(res.body.value).to.have.property('unix').to.match(/\d{10}/);
        expect(res.body.value).to.have.property('isDate').to.equal(true);
        expect(res.body.value).to.have.property('isValid').to.equal(true);

        loop(res.body.value, expected);

        done();
      }
    });
}

function testDuration(input, expected, done, moduleId = 'duration') {
  return request(server)
    .post('/')
    .send({
      event: 'MODULE_EXEC',
      payload: {
        moduleId: moduleId,
        moduleParam: input
      }
    })
    .set('X_CONVERSE_APP_TOKEN', APP_TOKEN)
    .expect(200)
    .end(function(err, res) {
      if (_.isFunction(expected)) {
        expected(err, res, done);
      } else {
        expect(res.body).to.have.property('status').to.equal(0);
        expect(res.body).to.have.property('value');
        expect(res.body.value).to.have.property('years').to.match(/\d+/);
        expect(res.body.value).to.have.property('months').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('days').to.match(/\d{1,3}/);
        expect(res.body.value).to.have.property('hours').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('minutes').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('seconds').to.match(/\d{1,2}/);
        expect(res.body.value).to.have.property('milliseconds').to.match(/\d{1,3}/);
        expect(res.body.value).to.have.property('iso');
        expect(res.body.value).to.have.property('humanized');
        expect(res.body.value).to.have.property('isDuration').to.equal(true);
        expect(res.body.value).to.have.property('isValid').to.equal(true);
        expect(res.body.value).to.have.property('in');
        expect(res.body.value.in).to.have.property('years').to.match(/\d+/);
        expect(res.body.value.in).to.have.property('months').to.match(/\d+/);
        expect(res.body.value.in).to.have.property('weeks').to.match(/\d+/);
        expect(res.body.value.in).to.have.property('days').to.match(/\d+/);
        expect(res.body.value.in).to.have.property('hours').to.match(/\d+/);
        expect(res.body.value.in).to.have.property('minutes').to.match(/\d+/);
        expect(res.body.value.in).to.have.property('seconds').to.match(/\d+/);
        expect(res.body.value.in).to.have.property('milliseconds').to.match(/\d+/);
        loop(res.body.value, expected)
        done();
      }
    });
}

function testExit(input, exit, done) {
  return request(server)
    .post('/')
    .send({
      event: 'MODULE_EXEC',
      payload: {
        moduleId: 'check',
        moduleParam: input
      }
    })
    .set('X_CONVERSE_APP_TOKEN', APP_TOKEN)
    .expect(200)
    .end(function(err, res) {
      if (_.isFunction(exit)) {
        exit(err, res, done);
      } else {
        expect(res.body).to.have.property('status').to.equal(0);
        expect(res.body).to.have.property('exit').to.equal(exit);
        done();
      }
    });
}

module.exports = {
  testDate: testDate,
  testDuration: testDuration,
  testExit: testExit
}
