const _               = require('lodash');
const moment          = require('moment');
const parser          = require('moment-parseformat');
const Sugar           = require('sugar-date').Date;
const ISO_8601        = 'YYYY-MM-DDTHH:mm:ssZ';
const periodicVals    = require('contained-periodic-values');
/**
* Returns a momentjs object parsed from input at local time.
* @param {String}   input the user input to parse into date.
* @param {String}   offset the offset of the date to be parsed into.
* @return {Object}  momentjs object.
*/
function local(input, parsedType = 'iso') {
  input = normalise(input);
  if (input) {
    var ret;
    if (_.isObject(input) && input.isDuration) {
      ret = moment.duration(input.iso);
    } else {
      if (_.isObject(input) && input[parsedType] !== undefined) {
        input = input[parsedType];
      }
      var f = format(input);
      if (f === 'X' && !isNaN(parseInt(input))) {
        ret = moment.unix(parseInt(input)).utc();
      } else {
        // ret = moment.parseZone(input, [moment.ISO_8601, moment.RFC_2822], true);
        ret = moment.parseZone(input, moment.ISO_8601, true);
      }
    }
    if (ret !== undefined && ret.isValid()) {
      return ret;
    }
  }
  return moment.invalid();
}

/**
* Returns a momentjs duration object.
* @param {String}   input the user input to parse into date.
* @return {Object}  momentjs duration object.
*/
function duration(input) {
  if (input) {
    var ret;
    if (_.isObject(input) && input.isDuration) {
      input = input.iso;
    }
    ret = moment.duration(input);
    if (ret !== undefined && ret.isValid()) {
      return ret;
    }
  }
  return moment.invalid();
}

/**
* Returns a momentjs duration object from a diff and ignoring days.
* @param {String} input the user input to parse into date.
* @return {Object} momentjs duration object.
*/
function diff(date1, date2, ignoreDays, inclusive) {
  if (date1 && date2) {
    const DAYS_IN_WEEK = 7;
    if (inclusive) {
      date1.add(1, 'days');
    }
    var milliseconds = date1.diff(date2);
    var duration = moment.duration(milliseconds);
    var subtractDays = 0;
    for (var i = 0; i < ignoreDays.length; i++) {
      subtractDays += periodicVals(date2.day(), duration.asDays() + date2.day(), ignoreDays[i], DAYS_IN_WEEK);
    }
    duration.subtract(subtractDays, 'days');
    if (duration.isValid()) {
      return duration;
    }
  }
  return moment.invalid();
}

/**
* Returns a utc momentjs object parsed from input with suggested offset.
* @param {String}   input the user input to parse into date.
* @param {String}   offset the offset of the date to be parsed into.
* @return {Object}  momentjs object.
*/
function utc(input, offset, locale) {
  moment.locale((locale !== undefined && locale !== null && locale !== '') ? locale : 'en');
  input = normalise(input);
  var ret = moment.utc();
  if (input) {
    if (_.isObject(input) && input.utc !== undefined) {
      input = input.utc;
    }
    if (_.isString(input)) {
      var f = format(input);
      if (f === 'X' && !isNaN(parseInt(input))) {
        ret = moment.unix(parseInt(input)).utc();
      } else if (_.includes(f, 'Z') && !/[+-]00:00/.test(input)) {
        ret = moment.parseZone(input, ['LT', 'LTS', 'L', 'l', 'LL', 'll', 'LLL', 'lll', 'LLLL', 'llll', f], true);
      } else {
        f = format(input, locale);
        ret = moment.utc(input, ['LT', 'LTS', 'L', 'l', 'LL', 'll', 'LLL', 'lll', 'LLLL', 'llll', f], true);
      }
      if (!ret.isValid()) {
        Sugar.setOption('newDateInternal', function() {
          var d = moment.utc();
          if (offset) {
            d.utcOffset(offset, false);
          }
          d = moment(d).utc().add(d.utcOffset(), 'm').toDate();
          return d;
        });

        // console.log('input', input);
        // The following line is replaced by the next because of a bug that is
        // not yet released on npm:
        //    version: 2.0.4
        //    commit: 4f8632e7d5c2b5cfde5c22d16f1589852f0d2fee
        //    url: https://github.com/andrewplummer/Sugar/commit/4f8632e7d5c2b5cfde5c22d16f1589852f0d2fee
        // var nlpParsed = Sugar.create(input, { fromUTC: true });
        var nlpParsed = Sugar.create(input, { fromUTC: (input.trim() !== 'now') });
        if (Sugar.isValid(nlpParsed)) {
          // console.log('nlp', nlpParsed);
          input = nlpParsed;
          f = format(input);
          ret = moment.utc(input, f, true);
          // console.log('ret', ret);
        }
      }
      // console.log('input', input);
      // console.log('format', f);

    }

    if (!ret.isValid()) {
      ret = moment.invalid()
    }
  } else {
    ret = moment.utc();
  }

  if (offset && ret.isValid()) {
    ret.utcOffset(offset, true);
  }
  // console.log('ret', ret);
  // console.log('offset', ret.utcOffset());
  return ret;
}

/**
* Normalise input for parsing.
* @param {String}   input the user input to parse into date.
* @return {String}  normalised input.
*/
function normalise(input) {
  if (_.isNumber(input)) {
    input = `${ input }`;
  } else if (_.isString(input)) {
    input = input
      .replace(/@/g, 'at')
      .replace(/(a ){0,1}couple( of){0,1}/g, '2')
      .replace(/(a ){0,1}few/g, '3')
      .replace(/in a bit/g, 'in 30 minutes')
      .replace(/\bmins\b/g, 'minutes')
      .replace(/\bsecs\b/g, 'seconds')
  }
  return input;
}

/**
* Returns a date format estimated from the input.
* @param {String}   input the user input to parse into date.
* @return {String}  the suggested format of the input string.
*/
function format(input, locale) {
  var preferredOrder = {
    '/': 'MDY',
    '.': 'DMY',
    '-': 'YMD'
  };
  if (locale !== undefined && locale !== null && locale !== '') {
    preferredOrder = moment.localeData().longDateFormat('L').replace(/([MDY])[MDY]+/g, '$1').replace(/[^MDY]/g, '');
  }
  return parser(input, {
    preferredOrder: preferredOrder
  });
}

/**
* Returns true if input is a non empty string.
* @param {String}   input the input to test.
* @return {boolean}  true if string is non-empty.
*/
function isString(input) {
  return _.isString(input) && input.trim() !== '';
}


class AbstractDate {
  constructor(isValid) {
    this.isValid = false;
  }
}

class DateTime extends AbstractDate {
  constructor(d) {
    super()
    if (d && d.isValid()) {
      var utc = d.clone().utc();
      var local = d.clone();
      return _.assign(this, local.toObject(), {
        isValid: true,
        isDate: true,
        //Making months 1-based instead of 0-based. Need to do the same when coming to setting dates.
        months: local.toObject().months + 1,
        iso: local.format(ISO_8601),
        utc: utc.format(ISO_8601),
        unix: utc.unix(),
        offset: local.format('Z')
      });
    }
  }
}

class Duration extends AbstractDate {
  constructor(d) {
    super();
    if (d && d.isValid()) {
      return _.assign(this, {
        isValid: true,
        isDuration: true,
        years: d.years(),
        months: d.months(),
        days: d.days(),
        hours: d.hours(),
        minutes: d.minutes(),
        seconds: d.seconds(),
        milliseconds: d.milliseconds(),
        iso: d.toISOString(),
        humanized: d.humanize(),
        in: {
          years: Math.floor(d.asYears()),
          months: Math.floor(d.asMonths()),
          weeks: Math.floor(d.asWeeks()),
          days: Math.floor(d.asDays()),
          hours: Math.floor(d.asHours()),
          minutes: Math.floor(d.asMinutes()),
          seconds: Math.floor(d.asSeconds()),
          milliseconds: Math.floor(d.asMilliseconds()),
        }
      })
    }
  }
}

function encode(d) {
  if (moment.isDuration(d)) {
    return new Duration(d);
  } else {
    return new DateTime(d);
  }
}

module.exports = {
  ISO_8601: ISO_8601,
  utc: utc,
  local: local,
  duration: duration,
  diff: diff,
  format: format,
  isString: isString,
  encode: encode,
  now: moment.utc
}
