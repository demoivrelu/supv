import { ref } from 'vue';

const proxyUrl = '/srv/STAALL';
const proxyUrlCMD = '/srv/CMD';
const proxyUrlLocalId = '/srv/LOCAL-ID-FINDER';
const proxyUrlChanger = '/srv/LOCAL-ID-CHANGER';
const proxyUrlBOOT = '/srv/SRV';
const proxyUrlProjectStatus = '/srv/GET-PROJECT-STATUS';

const projId = ref(null);

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

async function getLocalId(_projectId) {
  let localId = 0;
  await fetch(proxyUrlLocalId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project_id: _projectId }),
  })
    .then((response) => response.json())
    .then((res) => {
      localId = res.data.local_id;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return localId;
}

function setLocalId(_projectId, _localId) {
  fetch(proxyUrlChanger, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project_id: _projectId, local_id: _localId }),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log('setLocalId: ', res);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

async function getRunningStatus(_projectId) {
  let status = null;
  await fetch(proxyUrlProjectStatus, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {},
  })
    .then((response) => response.json())
    .then((res) => {
      res.data.forEach((item) => {
        console.log('status: ', res.data, item.id, _projectId);
        if (item.id === _projectId) {
          status = item;
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return status;
}

onmessage = (event) => {
  if (event.data.sig === 'command') {
    fetch(proxyUrlCMD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.data.data),
    });
  }
  if (event.data.sig === 'project') {
    projId.value = event.data.data;
    postMessage({ sig: 'project', data: projId.value });
  }
  if (event.data.sig === 'local-id-changer' && projId.value) {
    setLocalId(projId.value, event.data.data + 1);
  }
  if (event.data.sig === 'boot') {
    console.log('boot:---- ', event.data.data);
    fetch(proxyUrlBOOT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.data.data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log('boot: ', res);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
};

// template local_id memory
const mem = ref(0);

setInterval(() => {
  if (projId.value) {
    getLocalId(projId.value).then((res) => {
      if (res !== mem.value) {
        postMessage({ sig: 'localId', data: res });
      }
      mem.value = res;
    });

    getRunningStatus(projId.value).then((res) => {
      console.log('%%%%running-status: ', res);
      postMessage({ sig: 'running-status', data: res });
    });
  }
}, 1000);

setInterval(() => {
  getSta('AAA').then((res) => {
    postMessage({ sig: 'status', data: res });
  });
}, 1000);
