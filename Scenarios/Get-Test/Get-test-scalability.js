import { sleep, check } from 'k6';
import http from 'k6/http';
import { Trend, Rate, Counter } from 'k6/metrics';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },
  ],
};

export let GetPetstoreDuration = new Trend('get_duration_load');
export let GetPetstoreRate = new Rate('get_rate_load');
export let GetPetstoreSuccessRate = new Rate('get_success_rate_load');
export let GetPetstoreReqs = new Rate('get_reqs_load');


export default function () {
  const response = http.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
  GetPetstoreDuration.add(response.timings.duration);
  GetPetstoreReqs.add(1);
  GetPetstoreRate.add(response.status == 0 || response.status > 399);
  GetPetstoreSuccessRate.add(response.status < 399);
   // Verificação de Tempo de Resposta
   check(response, {
    'Tempo de resposta < 2s': (r) => r.timings.duration < 2000,
  }) || fail('Tempo de resposta excedeu 2 segundos');

  // Verificação de Taxa de Erros
  check(response, {
    'Taxa de erros de servidor < 5%': (r) => r.status !== 500,
  }) || fail('Taxa de erros excedeu 5%');
  

  // Verificação de Taxa de Sucesso
  check(response, {
    'Taxa de sucesso > 90%': (r) => r.status === 200,
  }) || fail('Taxa de sucesso abaixo de 90%');
  sleep(1);
}
export function handleSummary(data) {
  return {
      "getSumary/scalabilitySumary.html": htmlReport(data),
  };
}