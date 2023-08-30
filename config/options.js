class Options {
    static get scenarios() {
      return {
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
          startTime: '30s',
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
        endurance: {
          executor: 'constant-vus',
          exec: 'endurance',
          vus: 10,
          duration: '8h',
        },
      };
    }
  }
  
  export default Options;
  