const { WEB_API_HOME_PATH } = require('./links').webApiLinks;

const fetch= require('node-fetch');
const DEFAULT_OPTIONS = met => ({method: met, credentials: 'include', headers: {'Content-Type': 'application/json'}});

const produceInit = (body, met) => ({...DEFAULT_OPTIONS(met), body: JSON.stringify(body), json: true});

const request = (url, init) => fetch(WEB_API_HOME_PATH ? WEB_API_HOME_PATH + url : url, init)
    .then(resp => resp.json())
    .then(resp => {
        if (resp.err) {
            throw new Error(resp.err);
        }
        return resp;
    });

const getRequest = url => request(url, DEFAULT_OPTIONS('GET'));
const makeRequest = (url, body, met) => request(url, produceInit(body, met));

export const requests = {request,getRequest,makeRequest,DEFAULT_OPTIONS};
