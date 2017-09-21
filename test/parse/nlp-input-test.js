/**
 * @file test/nlp-input-test.js
 * @author graeme@converse.ai
 * @description Parse a date from any format.
 *
 * Generated by the converse-cli tool for use with the ConverseAI
 * Plugins SDK. https://developers.converse.ai/
 */

const moment  = require('moment');
const chai    = require('chai');
const expect  = chai.expect; chai.use(require('chai-match'));
const test    = require('./request-parse');

describe('Parse NLP', function () {

  var now = function() {
    var m = moment.utc();
    return Object.assign(m.toObject(), {
      months: m.toObject().months + 1,
      iso: m.format('YYYY-MM-DDTHH:mm:ssZ'),
      utc: m.format('YYYY-MM-DDTHH:mm:ssZ'),
      unix: m.unix(),
      offset: m.format('Z')
    });
  }

  it('next Tuesday @ 9pm (UTC)', function(done) {
    test({
      input: 'next Tuesday @ 9pm',
      offset: undefined,
      custom_offset: undefined,
      timezone_offset: undefined,
    }, {
      hours: 21,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      offset: '+00:00',
      iso: ({iso}) => {
        expect(moment.parseZone(iso).format('dddd')).to.equal('Tuesday');
      },
      isValid: true
    }, done);
  })

  it('next Tuesday @ 9pm & static offset (-07:00)', function(done) {
    test({
      input: 'next Tuesday @ 9pm',
      offset: '-07:00',
      custom_offset: undefined,
      timezone_offset: undefined,
    }, {
      hours: 21,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      offset: '-07:00',
      iso: ({iso}) => {
        expect(moment.parseZone(iso).format('dddd')).to.equal('Tuesday');
      },
      isValid: true
    }, done);
  })

  it('next Tuesday @ 9pm & custom offset (-07:00)', function(done) {
    test({
      input: 'next Tuesday @ 9pm',
      offset: 'CUSTOM',
      custom_offset: '-07:00',
      timezone_offset: undefined,
    }, {
      hours: 21,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      offset: '-07:00',
      iso: ({iso}) => {
        expect(moment.parseZone(iso).format('dddd')).to.equal('Tuesday');
      },
      isValid: true
    }, done);
  })

  it('next Tuesday @ 9pm & timezone offset (America/Los_Angeles)', function(done) {
    test({
      input: 'next Tuesday @ 9pm',
      offset: 'ZONE',
      custom_offset: undefined,
      timezone_offset: 'America/Los_Angeles',
    }, {
      hours: 21,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      offset: '-07:00',
      iso: ({iso}) => {
        expect(moment.parseZone(iso).format('dddd')).to.equal('Tuesday');
      },
      isValid: true
    }, done);
  })


  it('in a few hours (UTC)', function(done) {
    var n = now();
    test({
      input: 'in a few hours',
      offset: undefined,
      custom_offset: undefined,
      timezone_offset: undefined,
    }, {
      iso: ({iso}) => {
        var value = moment.parseZone(iso).subtract(3, 'hours');
        var expected = moment.utc(now().utc);
        expect(value.format()).to.equal(expected.format());
      },
      offset: '+00:00',
      isValid: true
    }, done);
  })

  // TODO: FIX RELATIVE NLP PARSING WITH OFFSETS
  it('a couple of mins ago', function(done) {
    var n = now();
    test({
      input: 'a couple of mins ago',
      offset: undefined,
      custom_offset: undefined,
      timezone_offset: undefined,
    }, {
      offset: '+00:00',
      iso: ({iso}) => {
        var value = moment.parseZone(iso).add(2, 'minutes');
        var expected = moment.utc(now().utc);
        expect(value.format()).to.equal(expected.format());
      },
      isValid: true
    }, done);
  })

  it('a couple of mins ago & custom offset (-07:00)', function(done) {
    var n = now();
    test({
      input: 'a couple of mins ago',
      offset: 'CUSTOM',
      custom_offset: '-07:00',
      timezone_offset: undefined,
    }, {
      offset: '-07:00',
      iso: ({iso}) => {
        var value = moment.parseZone(iso).add(2, 'minutes');
        var expected = moment.utc(now().utc).utcOffset('-07:00');
        expect(value.format()).to.equal(expected.format());
      },
      isValid: true
    }, done);
  })

  it('in 20 secs & timezone offset (America/Los_Angeles)', function(done) {
    test({
      input: 'in 20 secs',
      offset: 'ZONE',
      custom_offset: undefined,
      timezone_offset: 'America/Los_Angeles',
    }, {
      offset: '-07:00',
      iso: ({iso}) => {
        var value = moment.parseZone(iso).subtract(20, 'seconds');
        var expected = moment.utc(now().utc).utcOffset('-07:00')
        expect(value.format()).to.equal(expected.format());
      },
      isValid: true
    }, done);
  })

  it('now & timezone offset (America/Los_Angeles)', function(done) {
    test({
      input: 'now',
      offset: 'ZONE',
      custom_offset: undefined,
      timezone_offset: 'America/Los_Angeles',
    }, {
      offset: '-07:00',
      iso: ({iso}) => {
        var value = moment.parseZone(iso);
        var expected = moment.utc(now().utc).utcOffset('-07:00')
        expect(value.format()).to.equal(expected.format());
      },
      isValid: true
    }, done);
  })

  it('today & timezone offset (America/Los_Angeles)', function(done) {
    test({
      input: 'today',
      offset: 'ZONE',
      custom_offset: undefined,
      timezone_offset: 'America/Los_Angeles',
    }, {
      offset: '-07:00',
      iso: ({iso}) => {
        var value = moment.parseZone(iso);
        var expected = moment.utc(now().utc).utcOffset('-07:00').startOf('day');
        expect(value.format()).to.equal(expected.format());
      },
      isValid: true
    }, done);
  })

});
