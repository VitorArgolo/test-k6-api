import GetContacts from "./scenarios/api/get/contacts/contacts.js";
import GetNews from "./scenarios/api/get/news/news.js";
import GetSmoke from "./scenarios/api/generic/smoke.js";
import GetLoad from "./scenarios/api/generic/load.js";
import GetStress from "./scenarios/api/generic/stress.js";
// import * as scenarios from './scenarios/config.js';

import { group, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// k6 run --out influxdb = http://localhost:8086/k6 k6.js

export let options = {
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      exec: 'contacts',
      vus: 50,
      duration: '30s',
    },
    news: {
      executor: 'per-vu-iterations',
      exec: 'news',
      vus: 60,
      iterations: 10,
      startTime: '30s',
      maxDuration: '1m',
    },
    smoke: {
      executor: 'per-vu-iterations',
      exec: 'smoke',
      vus: 10,
      startTime: '1m',
      maxDuration: '1m10s',
    },
    load: {
      executor: 'per-vu-iterations',
      exec: 'load',
      vus: 50,
      startTime: '1m10s',
      maxDuration: '2m10s',
    },
    stress: {
      executor: 'per-vu-iterations',
      exec: 'stress',
      vus: 100,
      startTime: '2m10s',
      maxDuration: '3m10s',
    },
  },
};

export function contacts() {
  group('Endpoint Get Contacts - API k6', () => {
    GetContacts();
  });
}

export function news() {
  group('Endpoint Get News - API k6', () => {
    GetNews();
  });
}

export function smoke() {
  group('Endpoint Get News - API k6', () => {
    GetSmoke();
  });
}

export function load() {
  group('Endpoint Get News - API k6', () => {
    GetLoad();
  });
}

export function stress() {
  group('Endpoint Get News - API k6', () => {
    GetStress();
  });
}



export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}