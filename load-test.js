import http from 'k6/http';
import { check } from 'k6';

export const options = {
  discardResponseBodies: true,

  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 25,
      timeUnit: '1s',
      preAllocatedVUs: 200,

      stages: [
        { target: 25, duration: '5s' },
        { target: 90, duration: '1s' },
        { target: 90, duration: '2m' },
        { target: 0, duration: '5s' },
      ],
    },
  },
};


export default function () {
    const url = 'http://localhost:3000/api/pedidos';
    const payload = JSON.stringify({
        "clienteId": 0,
        "itens": [
            {
                "produtoId": 0,
                "quantidade": 2
            }
        ]
    });
    const param = {
        headers:{
            'accept': '*/*',
            'Content-Type': 'application/json',
        }
    }
    const res = http.post(url, payload, param);

    check(res, {
        'Status is 201': (r) => r.status === 201,
    })
}
