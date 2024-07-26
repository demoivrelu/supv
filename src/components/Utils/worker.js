import { ref } from 'vue';
import conf from './config';

let token = '';
// const url = 'http://10.99.150.100:81/main-page';
// const url = 'http://192.168.1.33:81/main-page';
// const proxyUrl = '/srv/STAALL';
// const proxyUrlCMD = '/srv/CMD';
// const proxyUrlLocalId = '/srv/LOCAL-ID-FINDER';
// const proxyUrlChanger = '/srv/LOCAL-ID-CHANGER';
// const proxyUrlBOOT = '/srv/SRV';
// const proxyUrlProjectStatus = '/srv/GET-PROJECT-STATUS';

const projId = ref(null);

// async function getSta() {
//   let sta = '';
//   await fetch(proxyUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({}),
//   })
//     .then((response) => response.json())
//     .then((res) => {
//       sta = res;
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//     });
//   return sta;
// }
async function getSta() {
  let sta = '';
  await fetch(`${conf.url}/get-status-all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify({ 'Instrument': 'AAA' }),
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
  // await fetch(proxyUrlLocalId, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ project_id: _projectId }),
  // })
  //   .then((response) => response.json())
  //   .then((res) => {
  //     localId = res.data.local_id;
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  await fetch(`${conf.url}/local-id-finder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
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
  // fetch(proxyUrlChanger, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ project_id: _projectId, local_id: _localId }),
  // })
  //   .then((response) => response.json())
  //   .then((res) => {
  //     console.log('setLocalId: ', res);
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  fetch(`${conf.url}/local-id-changer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify({ project_id: _projectId, local_id: _localId }),
  })
    .then((response) => response.json())
    // .then((res) => {
    //   console.log('setLocalId: ', res);
    // })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

async function getRunningStatus(_projectId) {
  let status = null;
  // await fetch(proxyUrlProjectStatus, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   // body: JSON.stringify({}),
  // })
  //   .then((response) => response.json())
  //   .then((res) => {
  //     res.data.forEach((item) => {
  //       console.log('status: ', res.data, item.id, _projectId);
  //       if (item.id === _projectId) {
  //         status = item;
  //       }
  //     });
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching data:', error);
  //   });
  await fetch(`${conf.url}/get-project-status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      res.data.forEach((item) => {
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

async function getRobotPosition() {
  let position = '';
  await fetch(`${conf.url}/detail`, {
    method: 'POST',
    body: JSON.stringify({ Instrument: 'Robot1' }),
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      position = res.Position;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  return position;
}

// async function getResFormatter(_inst, _fileContent) {
//   let resContent = '';
//   await fetch(`${conf.url}/res-formatter`, {
//     method: 'POST',
//     body: JSON.stringify({ Instrument: _inst }),
//     headers: {
//       'Content-Type': 'application/json',
//       'token': token,
//     },
//   })
//     .then((response) => response.json())
//     .then((res) => {
//       console.log('getResFormatter: ', res);
//       // status = res.Status;
//       resContent = res;
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//     });
//   return resContent;
// }

onmessage = (event) => {
  // get user info
  if (event.data.sig === 'info') {
    token = event.data.data.token;
  }
  // change mark
  if (event.data.sig === 'mark') {
    // mark = event.data.data;
    console.log('mark: ', event.data.data);
    fetch(`${conf.url}/mark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(event.data.data),
    });
  }
  if (event.data.sig === 'command') {
    // fetch(proxyUrlCMD, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(event.data.data),
    // });
    // fetch('http://127.0.0.1:8001/WebService/CMD', {
    fetch(`${conf.url}/cmd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
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
    // fetch(proxyUrlBOOT, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(event.data.data),
    // })
    //   .then((response) => response.json())
    //   .then((res) => {
    //     console.log('boot: ', res);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //   });
    fetch(`${conf.url}/cc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token,
      },
      body: JSON.stringify(event.data.data),
    })
      .then((response) => response.json())
      // .then((res) => {
      //   const t = res.data;
      // })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  // if (event.data.sig === 'file-content') {
  //   console.log('... res content get', event.data.data);
  // }
};

// template local_id memory
const mem = ref(0);

setInterval(() => {
  if (projId.value) {
    getLocalId(projId.value).then((res) => {
      if (res !== mem.value || res === 0) {
        postMessage({ sig: 'localId', data: res });
      }
      mem.value = res;
    });

    getRunningStatus(projId.value).then((res) => {
      postMessage({ sig: 'running-status', data: res });
    });
  }
}, 1500);

setInterval(() => {
  getSta('AAA').then((res) => {
    postMessage({ sig: 'status', data: res });
    console.log(res);
  });
  // getRobotPosition().then((res) => {
  //   postMessage({ sig: 'position', data: res });
  // });
}, 1500);

setInterval(() => {
  getRobotPosition().then((res) => {
    postMessage({ sig: 'position', data: res });
  });
}, 1500);
