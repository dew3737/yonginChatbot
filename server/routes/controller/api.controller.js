/**
 * User Controller
 * 사용자 정보 컨트롤러
 * */

const approot = require('app-root-path');
const configfile = require(`${approot}/.config/config.json`);
const runmode = configfile.runmode;
const config = configfile[runmode];
const axios = require('axios');

// catch routing handler function error
const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);

const autocomplete = doAsync(async (req, res, next) => {
  const payload = req.body;

  const teanaUrl = `http://${config.API_HOST}/api/yongin/autocomplete`;
  const result = await axios
    .post(teanaUrl, {
      keyword: payload.speech,
      label: payload.label,
      middle: payload.middle,
    })
    .then(function (response) {
      return response.data.result;
    })
    .catch(function (err) {
      throw next(err);
    });
  // console.log('자동완성 결과:::', result);
  res.send(result);
});

const dialogue = doAsync(async (req, res, next) => {
  const payload = req.body;
  const teanaUrl = `http://${config.DM_HOST}/chat`;

  // payload = JSON.parse(JSON.stringify(payload));

  console.log('payload :::', {
    domain_id: config.DOMAIN_ID,
    channel_id: payload.channel_id || '',
    user_id: payload.user_id || '',
    in_str: payload.in_str || '',
    in_type: payload.in_type || '',
    session_id: payload.session_id || '',
    token: config.DM_TOKEN,
    parameters: payload.parameters,
    message_id: payload.message_id || '',
    quality: payload.quality,
  });
  const result = await axios
    .post(teanaUrl, {
      domain_id: config.DOMAIN_ID,
      channel_id: payload.channel_id || '',
      user_id: payload.user_id || '',
      in_str: payload.in_str || '',
      in_type: payload.in_type || '',
      session_id: payload.session_id || '',
      token: config.DM_TOKEN,
      parameters: payload.parameters,
      message_id: payload.message_id || '',
      quality: payload.quality,
    })
    .then(function (response) {
      console.log('response:::', response.data.data.result.fulfillment.response_status);
      return response.data;
    })
    .catch(function (err) {
      throw next(err);
    });
  res.send(result);
});

const quality = doAsync(async (req, res, next) => {
  const result = await axios
    .post(`http://${config.DM_HOST}/quality`, {
      domain_id: config.DOMAIN_ID,
      token: config.DM_TOKEN,
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw next(err);
    });
  res.send(result);
});

const getIp = doAsync(async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(ip);
  // console.log(res);
  // const result = await axios
  //   .post(`http://${config.DM_HOST}/quality`, {
  //     domain_id: config.DOMAIN_ID,
  //     token: config.DM_TOKEN,
  //   })
  //   .then(response => {
  //     return response.data;
  //   })
  //   .catch(err => {
  //     throw next(err);
  //   });
  res.send(ip);
});

module.exports = {
  autocomplete,
  dialogue,
  quality,
  getIp,
};
