/**
 * @file parse.js
 * @author graeme@converse.ai
 * @description Parse a date from any format.
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 */

'use strict';

const Status          = require('@converseai/plugins-sdk').Status;
const ModuleResponse  = require('@converseai/plugins-sdk').Payloads.ModuleResponse;
const Utils           = require('../lib/utils.js');


module.exports = function parse (app, body) {
 /**
  * Registration parameters assigned to body.payload.registrationData
  * and Module parameters assigned to body.payload.moduleParam.
  * @example
  * var regOne = body.payload.registrationData.regOne;
  * var modOne = body.payload.moduleParam.modOne;
  */

  /** @type {String} input Input to be parsed into a date.  */
  var input = body.payload.moduleParam.input;

  /** @type {String} locale If avalibale supply the locale to help distinguish
  * between date formats in different areas of the world. E.g.
  * American MM/DD/YYYY or European DD/MM/YYYY.  */
  var locale = body.payload.moduleParam.locale;

  /** @type {String} offset Supply the expected offset of the input
  * date for more accuracy.  */
  var offset = body.payload.moduleParam.offset;

  /** @type {String} customOffset Define a custom offset in the format of
  * ±HH:mm. E.g. Plus eight and a half hours: +08:30 */
  var customOffset = body.payload.moduleParam.custom_offset;

  /** @type {String} timezoneOffset Pick a timezone to calculate the offset.
  * Daylight savings will be included in offset calculation. */
  var timezoneOffset = body.payload.moduleParam.timezone_offset;

  /** @type {String} locationOffset Specify a location from a latitude and
  * longitude string separted by a comma (,). Daylight savings will be
  * included in offset calculation. E.g. 47.650499,-122.350070 would be
  * America/Los_Angeles. */
  var locationOffset = body.payload.moduleParam.location_offset;

  if (input !== undefined && input !== null) {
    /** @type {ModuleResponse} response The Converse AI response to respond with. */
    var response = new ModuleResponse();

    var utcOffset = Utils.normaliseOffset(input, offset, customOffset, timezoneOffset, locationOffset) || offset;
    var date = Utils.utc(input, utcOffset, locale);

    /*
    * Set an object on the response. This object will be returned to and stored
    * on the current conversation state. It is important to ensure the JSON
    * definition of this module has `hasReturn` set to true. E.g. if this module
    * is fired from a state called `myState` then the object can be accessed with
    * handlebars like:
    * {{states.myState.momentjs.parse}}
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
    app.fail({httpStatus: 400, code: 'REQUIRED_PARAMS_UNDEFINED', description: 'Required parameters are undefined.'});
  }
};
