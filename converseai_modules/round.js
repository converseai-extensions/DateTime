/**
 * @file round.js
 * @author graeme@converse.ai
 * @description Return start or end of unit in time of a Date/Time
 * object.
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 */

'use strict';

const Status          = require('@converseai/plugins-sdk').Status;
const ModuleResponse  = require('@converseai/plugins-sdk').Payloads.ModuleResponse;
const Utils           = require('../lib/utils.js');

module.exports = function round (app, body) {
 /**
  * Registration parameters are assigned to body.payload.registrationData
  * and Module parameters are assigned to body.payload.moduleParam.
  * @example
  * var regOne = body.payload.registrationData.regOne;
  * var modOne = body.payload.moduleParam.modOne;
  */

  /** @type {String} input Input to be parsed into date. Human readable string,
  * 'ISO-8601', 'RFC 2822', Unix Timestamp, or the output of another
  * Parse Date module. */
  var input = body.payload.moduleParam.input;

  /** @type {String} startOrEnd Round to the start or end of the time
  * unit specified.  */
  var startOrEnd = body.payload.moduleParam.start_or_end && body.payload.moduleParam.start_or_end.toLowerCase();

  /** @type {String} unit The unit of time to round up or down to.  */
  var unit = body.payload.moduleParam.unit && body.payload.moduleParam.unit.toLowerCase();

  /** @type {Number} locale Define the day that at the begining of the week. */
  var isoWeekday = body.payload.moduleParam.weekday;

  if (input != undefined && startOrEnd != undefined && unit != undefined) {
    /** @type {ModuleResponse} response The Converse AI response to respond with. */
    var response = new ModuleResponse();

    var date = Utils.local(input);

    switch (unit) {
      case 'week':
        unit = 'day';
        var isoToday = date.isoWeekday();
        if (startOrEnd === 'start') {
          date.isoWeekday(isoWeekday);
          if (isoWeekday > isoToday) {
            date.subtract(1, 'weeks');
          }
        }
        if (startOrEnd === 'end') {
          isoWeekday -= 1; isoWeekday = (isoWeekday < 1) ? 7 : isoWeekday;
          date.isoWeekday(isoWeekday);
          if (isoWeekday < isoToday && startOrEnd === 'end') {
            date.add(1, 'weeks');
          }
        }
      case 'year':
      case 'month':
      case 'quarter':
      case 'day':
      case 'hour':
      case 'minute':
        date[(startOrEnd + 'Of')](unit);
        break;
      default:

    }

    /*
    * Set an object on the response. This object will be returned to and stored
    * on the current conversation state. It is important to ensure the JSON
    * definition of this module has `hasReturn` set to true. E.g. if this module
    * is fired from a state called `myState` then the object can be accessed with
    * handlebars like:
    * {{states.myState.trevor10608_momentjs.round}}
    */
    response.setValue(Utils.encode(date));

    /*
    * This will return a success status and response to the conversation.
    * It is important to always call this method when the module has finished
    * computing regardless of whether you wish to send a response or not. If not,
    * the conversation will hang indefinitely.
    */
    app.send(Status.SUCCESS, response);
  } else {
    app.fail({ httpStatus: 400, code: 'REQUIRED_PARAMS_UNDEFINED', description: 'Required parameters are undefined.' });
  }
};
