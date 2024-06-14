import axios from 'axios';

const statusData = { type: 'success', status: '200', msg: '' };

export const requestAutoCompleteList = async text => {
  let data = { status: statusData, data: {} };

  try {
    const setParam = {
      speech: text,
      label: 'yongin_',
      middle: true,
    };

    const res = await axios.post('/chat/autocomplete', setParam);

    // console.log(`consoleMessage::: api::::` + JSON.stringify(res));

    data = { ...data, data: res.data };
  } catch (err) {
    data = { ...data, status: { ...statusData, status: '400', msg: e.message } };
  }
  return data;
};

export const requestDMPost = async setParam => {
  let getData = { status: statusData, data: {} };

  try {
    const resp = await axios.post('/chat/dialogue', setParam);
    getData = { ...getData, data: resp.data };
  } catch (e) {
    const statusSet = { ...statusData, status: '400', type: 'error', msg: e.message };
    getData = { ...getData, status: statusSet };
  }
  return getData;
};

export const requestQuality = async () => {
  let getData = { status: statusData, data: {} };
  try {
    const resp = await axios.post('/chat/quality');
    getData = { ...getData, data: resp.data };
  } catch (e) {
    const statusSet = { ...statusData, status: '400', type: 'error', msg: e.message };
    getData = { ...getData, status: statusSet };
  }

  return getData;
};
