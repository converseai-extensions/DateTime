/**
 * @file test/module-duration-test.js
 * @author graeme+admin@converse.ai
 * @description Compare two parsed date objects resulting in the
 * duration between.
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 */

const _           = require('lodash');
const expect      = require('chai').expect;
const test        = require('./lib/request-test').testDuration;

describe('Compare Date/Time', function () {

  /* * * * * * * * * * * * * * * * * *
  * Without Input
  * * * * * * * * * * * * * * * * * */

  it('without input', function(done) {
    test({}, function(err, res, done) {
      expect(res.body).to.have.property('status').to.equal(1);
      expect(res.body).to.have.property('error').to.have.property('httpStatus').to.equal(400);
      done();
    }, done);
  })


  /* * * * * * * * * * * * * * * * * *
  * Input
  * * * * * * * * * * * * * * * * * */

  it('2 years (2017-07-02T21:30:00+00:00 - 2015-07-02T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+00:00',
      reference: '2015-07-02T21:30:00+00:00'
    }, {
      isValid: true,
      years: 2,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT17544H',
      humanized: '2 years',
      in: { years: 2,
       months: 24,
       weeks: 104,
       days: 731,
       hours: 17544,
     }
   }, done);
  })

  it('2 years, 2 months (2017-07-02T21:30:00+00:00 - 2015-05-02T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+00:00',
      reference: '2015-05-02T21:30:00+00:00'
    }, {
      isValid: true,
      years: 2,
      months: 2,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT19008H',
      humanized: '2 years',
      in: { years: 2,
       months: 26,
       weeks: 113,
       days: 792,
       hours: 19008,
     }
   }, done);
  })

  it('2 years, 2 months, 2 days (2017-07-02T21:30:00+00:00 - 2015-04-30T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+00:00',
      reference: '2015-04-30T21:30:00+00:00'
    }, {
      isValid: true,
      years: 2,
      months: 2,
      days: 2,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT19056H',
      humanized: '2 years',
      in: { years: 2,
       months: 26,
       weeks: 113,
       days: 794,
       hours: 19056,
     }
   }, done);
  })

  it('2 years, 2 months, 2 days, 2 hours (2017-07-02T21:30:00+00:00 - 2015-04-30T19:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+00:00',
      reference: '2015-04-30T19:30:00+00:00'
    }, {
      isValid: true,
      years: 2,
      months: 2,
      days: 2,
      hours: 2,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT19058H',
      humanized: '2 years',
      in: { years: 2,
       months: 26,
       weeks: 113,
       days: 794,
       hours: 19058,
     }
   }, done);
  })

  it('2 years, 2 months, 2 days, 2 hours, 2 minutes (2017-07-02T21:30:00+00:00 - 2015-04-30T19:28:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+00:00',
      reference: '2015-04-30T19:28:00+00:00'
    }, {
      isValid: true,
      years: 2,
      months: 2,
      days: 2,
      hours: 2,
      minutes: 2,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT19058H2M',
      humanized: '2 years',
      in: { years: 2,
       months: 26,
       weeks: 113,
       days: 794,
       hours: 19058,
     }
   }, done);
  })

  it('2 years, 2 months, 2 days, 2 hours, 2 minutes, 2 seconds (2017-07-02T21:30:00+00:00 - 2015-04-30T19:27:58+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+00:00',
      reference: '2015-04-30T19:27:58+00:00'
    }, {
      isValid: true,
      years: 2,
      months: 2,
      days: 2,
      hours: 2,
      minutes: 2,
      seconds: 2,
      milliseconds: 0,
      iso: 'PT19058H2M2S',
      humanized: '2 years',
      in: { years: 2,
       months: 26,
       weeks: 113,
       days: 794,
       hours: 19058,
     }
   }, done);
  })


  it('2 years, 2 months, 2 days with same offsets (2017-07-02T21:30:00-07:00 - 2015-04-30T21:30:00-07:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-07:00',
      reference: '2015-04-30T21:30:00-07:00'
    }, {
      isValid: true,
      years: 2,
      months: 2,
      days: 2,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT19056H',
      humanized: '2 years',
      in: { years: 2,
       months: 26,
       weeks: 113,
       days: 794,
       hours: 19056,
     }
   }, done);
  })

  it('2 years, 2 months, 2 days with different offsets (2017-07-02T21:30:00-07:00 - 2015-04-30T21:30:00+07:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-07:00',
      reference: '2015-04-30T21:30:00+07:00'
    }, {
      isValid: true,
      years: 2,
      months: 2,
      days: 2,
      hours: 14,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT19070H',
      humanized: '2 years',
      in: { years: 2,
       months: 26,
       weeks: 113,
       days: 794,
       hours: 19070,
     }
   }, done);
  })

  it('Same date (2017-07-02T21:30:00+00:00 - 2017-07-02T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+00:00',
      reference: '2017-07-02T21:30:00+00:00'
    }, {
      isValid: true,
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'P0D',
      humanized: 'a few seconds',
      in: { years: 0,
       months: 0,
       weeks: 0,
       days: 0,
       hours: 0,
       minutes: 0,
       seconds: 0,
       milliseconds: 0,
     }
   }, done);
  })

  it('Same date same offsets (-07:00) (2017-07-02T21:30:00-07:00 - 2017-07-02T21:30:00-07:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-07:00',
      reference: '2017-07-02T21:30:00-07:00'
    }, {
      isValid: true,
      years: 0,
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'P0D',
      humanized: 'a few seconds',
      in: { years: 0,
       months: 0,
       weeks: 0,
       days: 0,
       hours: 0,
       minutes: 0,
       seconds: 0,
       milliseconds: 0,
     }
   }, done);
  })

  it('Same date different offsets (-07:00/+07:00) (2017-07-02T21:30:00-07:00 - 2017-07-02T21:30:00+07:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-07:00',
      reference: '2017-07-02T21:30:00+07:00'
    }, {
      isValid: true,
      years: 0,
      months: 0,
      days: 0,
      hours: 14,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT14H',
      humanized: '14 hours',
      in: { years: 0,
       months: 0,
       weeks: 0,
       days: 0,
       hours: 14,
       minutes: 840,
       seconds: 50400,
       milliseconds: 50400000,
     }
   }, done);
  })

  it('Same date different offsets (+07:00/-07:00) (2017-07-02T21:30:00+07:00 - 2017-07-02T21:30:00-07:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00+07:00',
      reference: '2017-07-02T21:30:00-07:00'
    }, {
      isValid: true,
      years: 0,
      months: 0,
      days: 0,
      hours: 14,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      iso: 'PT14H',
      humanized: '14 hours',
      in: { years: 0,
       months: 0,
       weeks: 0,
       days: 0,
       hours: 14,
       minutes: 840,
       seconds: 50400,
       milliseconds: 50400000,
     }
   }, done);
  })

  /* * * * * * * * * * * * * * * * * *
  * Ignoring days
  * * * * * * * * * * * * * * * * * */

  it('Monday to Friday Ignoring none (inclusive) (2017-07-03T21:30:00-00:00 - 2017-07-07T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-03T21:30:00-00:00',
      reference: '2017-07-07T21:30:00+00:00',
      inclusive: true
    }, {
      isValid: true,
      days: 5,
   }, done);
  })

  it('Sunday to Sunday Ignoring none (exclusive) (2017-07-02T21:30:00-00:00 - 2017-07-09T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-09T21:30:00+00:00'
    }, {
      isValid: true,
      days: 7,
   }, done);
  })

  it('3 weeks Ignoring none (inclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00',
      inclusive: true,
    }, {
      isValid: true,
      days: 22,
   }, done);
  })

  it('3 weeks Ignoring none (exclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00'
    }, {
      isValid: true,
      days: 21,
   }, done);
  })

  it('3 weeks Ignoring Saturday & Sunday (inclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00',
      ignoreDays: ['Saturday', 'Sunday'],
      inclusive: true
    }, {
      isValid: true,
      days: 15,
   }, done);
  })

  it('3 weeks Ignoring Saturday & Sunday (exclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00',
      ignoreDays: ['Saturday', 'Sunday'],
    }, {
      isValid: true,
      days: 15,
   }, done);
  })

  it('3 weeks Ignoring Sunday & Monday (inclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00',
      ignoreDays: ['Sunday', 'Monday'],
      inclusive: true
    }, {
      isValid: true,
      days: 15,
   }, done);
  })

  it('3 weeks Ignoring Sunday & Monday (exclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00',
      ignoreDays: ['Sunday', 'Monday']
    }, {
      isValid: true,
      days: 15,
   }, done);
  })

  it('3 weeks Ignoring Monday & Wednesday (inclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00',
      ignoreDays: ['Monday', 'Wednesday'],
      inclusive: true
    }, {
      isValid: true,
      days: 16,
   }, done);
  })

  it('3 weeks Ignoring Monday & Wednesday (exclusive) (2017-07-02T21:30:00-00:00 - 2017-07-23T21:30:00+00:00)', function(done) {
    test({
      input: '2017-07-02T21:30:00-00:00',
      reference: '2017-07-23T21:30:00+00:00',
      ignoreDays: ['Monday', 'Wednesday']
    }, {
      isValid: true,
      days: 15,
   }, done);
  })

  it('3 weeks Ignoring Monday & Wednesday (inclusive) (2017-06-30T21:30:00-00:00 - 2017-07-21T21:30:00+00:00)', function(done) {
    test({
      input: '2017-06-30T21:30:00-00:00',
      reference: '2017-07-21T21:30:00+00:00',
      ignoreDays: ['Monday', 'Wednesday'],
      inclusive: true
    }, {
      isValid: true,
      days: 16,
   }, done);
  })

  it('3 weeks Ignoring Monday & Wednesday (exclusive) (2017-06-30T21:30:00-00:00 - 2017-07-21T21:30:00+00:00)', function(done) {
    test({
      input: '2017-06-30T21:30:00-00:00',
      reference: '2017-07-21T21:30:00+00:00',
      ignoreDays: ['Monday', 'Wednesday']
    }, {
      isValid: true,
      days: 15,
   }, done);
  })

});
