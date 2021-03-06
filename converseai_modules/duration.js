/**
 * @file duration.js
 * @author graeme@converse.ai
 * @description Compare two parsed date objects resulting in the
 * duration between.
 *
 * Generated by the converse-cli tool for use with the Converse AI
 * Plugins SDK. https://developers.converse.ai/
 */

'use strict';

const Status          = require('@converseai/plugins-sdk').Status;
const ModuleResponse  = require('@converseai/plugins-sdk').Payloads.ModuleResponse;
const moment          = require('moment');
const Utils           = require('../lib/utils.js');

module.exports = function duration (app, body) {
 /**
  * Registration parameters are assigned to body.payload.registrationData
  * and Module parameters are assigned to body.payload.moduleParam.
  * @example
  * var regOne = body.payload.registrationData.regOne;
  * var modOne = body.payload.moduleParam.modOne;
  */

  /** @type {String} input   */
  var input = body.payload.moduleParam.input;

  /** @type {String} reference   */
  var reference = body.payload.moduleParam.reference;

  var days = body.payload.moduleParam.ignoreDays;
  var inclusive = body.payload.moduleParam.inclusive;

  function contains(a, o) {
    return a.map((e) => { return e.toLowerCase(); }).indexOf(o.toLowerCase()) > -1
  }


  if (input != undefined && reference != undefined) {
    /** @type {ModuleResponse} response The Converse AI response to respond with. */
    var response = new ModuleResponse();

    var date1 = Utils.local(input);
    var date2 = Utils.local(reference);

    var ignoreDays = [];
    if (days) {
      if (contains(days, 'sunday'))     { ignoreDays.push(0); }
      if (contains(days, 'monday'))     { ignoreDays.push(1); }
      if (contains(days, 'tuesday'))    { ignoreDays.push(2); }
      if (contains(days, 'wednesday'))  { ignoreDays.push(3); }
      if (contains(days, 'thursday'))   { ignoreDays.push(4); }
      if (contains(days, 'friday'))     { ignoreDays.push(5); }
      if (contains(days, 'saturday'))   { ignoreDays.push(6); }
    }

    var duration;
    if (date1.isAfter(date2)) {
      duration = Utils.diff(date1, date2, ignoreDays, inclusive);
    } else {
      duration = Utils.diff(date2, date1, ignoreDays, inclusive);
    }
    /*
    * Set an object on the response. This object will be returned to and stored
    * on the current conversation state. It is important to ensure the JSON
    * definition of this module has `hasReturn` set to true. E.g. if this module
    * is fired from a state called `myState` then the object can be accessed with
    * handlebars like:
    * {{states.myState.trevor10608_momentjs.duration}}
    */
    response.setValue(Utils.encode(duration));

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
