import http from 'k6/http';
import { sleep, check } from 'k6';

export default function () {
  let response = http.get('https://test.k6.io/contacts.php');

  // Verificação 
  // Resposta
  check(response, {
    'O status é 200': (r) => r.status === 200,
  });

  // Tempo
  check(response, {
    'Tempo de resposta < 3 segundos': (r) => r.timings.duration < 3000, 
  });
  sleep(1);
}
