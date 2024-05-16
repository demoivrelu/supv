const proxyUrl = '/srv/STAALL';
const proxyUrlCMD = '/srv/CMD';

async function getSta() {
  let sta = '';
  await fetch(proxyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  })
    .then((response) => response.json())
    .then((res) => {
      sta = res;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return sta;
}

onmessage = (event) => {
  fetch(proxyUrlCMD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event.data),
  });
};

setInterval(() => {
  getSta('AAA').then((res) => {
    postMessage(res);
  });
}, 1000);
