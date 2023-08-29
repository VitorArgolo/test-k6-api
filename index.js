import GetContacts from "./scenarios/contacts.js";
import GetNews from "./scenarios/news.js";
import GetSmoke from "./scenarios/smoke.js";
import GetLoad from "./scenarios/load.js";
import GetStress from "./scenarios/stress.js";
import GetSpike from "./scenarios/spike.js";
import GetScalability from "./scenarios/scalability.js";
import GetVolume from "./scenarios/volume.js";
import GetEndurence from "./scenarios/endurence.js";
import { group, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// k6 run --out influxdb = http://localhost:8086/k6 index.js

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
      iterations: 100,
      startTime: '30s,',
      maxDuration: '1m',
    },
    smoke: {
      executor: 'constant-vus',
      exec: 'smoke',
      vus: 10,
      duration: '10s',
    },
    load: {
      executor: 'constant-vus',
      exec: 'load',
      vus: 50,
      duration: '1m',
    },
    stress: {
      executor: 'constant-vus',
      exec: 'stress',
      vus: 100,
      duration: '1m',
    },
    spike: {
      executor: 'constant-vus',
      exec: 'spike',
      stages: [
        { duration: '1m', target: 10 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 10 },
      ],
    },
    scalability: {
      executor: 'constant-vus',
      exec: 'scalability',
      stages: [
        { duration: '1m', target: 100 },
        { duration: '2m', target: 100 },
      ],
    },
    volume: {
      executor: 'per-vu-iterations',
      exec: 'volume',
      stages: [
        { duration: '1m', target: 50 },
        { duration: '3m', target: 50 },
        { duration: '1m', target: 0 },
      ],
    },
    endurence: {
      executor: 'constant-vus',
      exec: 'endurence',
      vus: 10,
      duration: '8h',
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

export function spike() {
  group('Endpoint Get News - API k6', () => {
    GetSpike();
  });
}

export function scalability(){
  group('Endpoint Get News - API k6', () => {
    GetScalability();
  });
}

export function volume() {
  group('Endpoint Get News - API k6', () => {
    GetVolume();
  });
}

export function endurence() {
  group('Endpoint Get News - API k6', () => {
    GetEndurence();
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}