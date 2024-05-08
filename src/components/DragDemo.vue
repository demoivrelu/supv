<template>
  <div>
    <div class="content">
      <div class="sub1"></div>
      <div class="sub3">
        <el-dialog custom-class="help-dialog" :top="'80px'" :title="'Help'" align="left"
          v-model="dialogHelpVisible">
          <div>
            1. Configue each instrument with the corresponding command and parameter. <br><br>
            2. Drag the instrument module to the progress table.<br><br>
            3. The table will be displayed at right side.<br><br>
            4. Sequence of the progress you build could be dragged at your will in the table.<br>
            <br>
            5. The data could be export as an excel file when "Download" button pressed.<br><br>
          </div>
        </el-dialog>
          <el-dialog :modal-append-to-body="false"
            :title="'load'" v-model="dialogTableVisible">
            <el-table v-loading="userDataLoading" style="height:550px"
              :data="userData.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
              highlight-current-row >
              <el-table-column property="id" :label="'ID'" width="64" />
              <el-table-column property="order_name" :label="'Name'" width="200" />
              <el-table-column property="status" :label="'Status'" width="120"/>
              <el-table-column property="type" :label="'Type'" width="150"/>
              <el-table-column property="name" :label="'Owner'" width="100"/>
              <el-table-column property="create_time" :label="'Create Time'" width="200"/>
              <el-table-column width="80">
                <template v-slot="scope">
                  <el-button @click="loadAll(scope.row)">
                    <el-icon>
                      <document />
                    </el-icon>
                    <!-- <i class="el-icon-document"></i> -->
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <template v-slot:footer>
              <div>
                <el-pagination class="custom-pagination" style="float:center;"
                  background layout="prev, pager, next"
                  :total="total" @current-change="currentChange">
                </el-pagination>
              </div>
              <div style="margin-top: 20px;">
              </div>
            </template>
          </el-dialog>

        <el-row style="margin-top: 8%;">
          <VueDraggable
            v-model="AAA"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
          <el-col @click="handleClick(AAA[0])" class="box"
            @mouseenter="setPointer"
            @focus="handleFocus"
            @mouseleave="unsetPointer"
            @blur="handleBlur"
            > Unchained
            <el-image :src='unchained' class="el-img"></el-image>
          </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="BBB"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(BBB[0])" class="box"
            @mouseenter="setPointer"
            @focus="handleFocus"
            @mouseleave="unsetPointer"
            @blur="handleBlur"
            > Robot1
            <el-image :src='robot1' class="el-img"
              style="translate: 0px -15px;transform: scale(0.65) scaleY(0.9);"></el-image>
          </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="CCC"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(CCC[0])" class="box"
            @mouseenter="setPointer"
            @focus="handleFocus"
            @mouseleave="unsetPointer"
            @blur="handleBlur"
            > Cytation1
              <el-image :src='cytation1' class="el-img"
              style="translate: 0px -5px;transform: scale(0.65) scaleY(0.9);"></el-image>
            </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="DDD"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(DDD[0])" class="box"> DDD </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="EEE"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(EEE[0])" class="box"> EEE </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="FFF"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(FFF[0])" class="box"> FFF </el-col>
          </VueDraggable>
        </el-row>

        <el-tabs
          v-model="activeName"
          ref="tabs"
          class="hide-tabs-header"
          style="
            margin-top: 10%;
            height: 50vh;
            border: 1px solid;
            border-radius: 10px;
          "
        >
          <el-tab-pane label="1" name="first" align="center">
            <el-form ref="cmd-unchaied" :label-position="'right'"
              style="width: 70%; margin-top: 3%;">
              <el-form-item label="CMD">
                <el-select v-model="CmdUnchainedVal" placeholder="Choose">
                  <el-option v-for="item in CmdUnchained" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!-- <el-row style="margin-top: 3%;">
              <el-col :span="10">
                CMD
              </el-col>
              <el-col :span="11">
                <el-select v-model="CmdUnchainedVal" placeholder="Choose">
                  <el-option v-for="item in CmdUnchained" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row> -->
            <el-form v-if="CmdUnchainedVal == 'INIT'" ref="form-unchained" :label-position="'right'"
              style="width: 70%; margin-top: 3%;">
              <el-form-item label="ProjectName">
                <el-input v-model="unchainedPara.ProjectName"></el-input>
              </el-form-item>
              <el-form-item label="ChooseDesignID">
                <el-input v-model="unchainedPara.ChooseDesignID"></el-input>
              </el-form-item>
              <!-- <el-form-item label="UseLsrFile">
                <el-switch
                  v-model="unchainedPara.UseLsrFile">
                </el-switch>
              </el-form-item>
              <el-form-item label="LsrFilePath">
                <el-input v-model="unchainedPara.LsrFilePath"></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="LastLibraryID">
                <el-input v-model="unchainedPara.LastLibraryID"></el-input>
              </el-form-item> -->
              <el-form-item label="SetPrompts">
                <el-input v-model="unchainedPara.SetPrompts"></el-input>
              </el-form-item>
              <el-form-item label="SetChemicalManager">
                <el-input v-model="unchainedPara.SetChemicalManager"></el-input>
              </el-form-item>
              <el-form-item label="SetTipManagement">
                <el-input v-model="unchainedPara.SetTipManagement"></el-input>
              </el-form-item>
              <!-- <el-form-item label="UseAI">
                <el-switch
                  v-model="unchainedPara.UseAI">
                </el-switch>
              </el-form-item>
              <el-form-item label="NewDesign">
                <el-switch
                  v-model="unchainedPara.NewDesign">
                </el-switch>
              </el-form-item> -->
              <!-- <el-form-item label="ParaChanger">
                <el-input v-model="unchainedPara.ParaChanger"></el-input>
              </el-form-item> -->
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="2" name="second" align="center">
            <el-form ref="cmd-robot1" :label-position="'right'" style="width: 70%; margin-top: 3%;">
              <el-form-item label="CMD">
                <el-select v-model="CmdRobot1Val" placeholder="Choose">
                  <el-option v-for="item in CmdRobot1" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form ref="form-robot1" :label-position="'right'"
              style="width: 70%; margin-top: 3%;">
              <el-form-item label="Destination">
                <el-select v-model="DestinationVal" placeholder="Choose">
                  <el-option v-for="item in Destination" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Action">
                <el-select v-model="ActionVal" placeholder="Choose">
                  <el-option v-for="item in Action" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Plate">
                <el-select v-model="PlatesVal" placeholder="Choose">
                  <el-option v-for="item in Plates" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="3" name="third" align="center">
            <el-form ref="cmd-cytation1" :label-position="'right'"
              style="width: 70%; margin-top: 3%;">
              <el-form-item label="CMD">
                <el-select v-model="CmdCytation1Val" placeholder="Choose">
                  <el-option v-for="item in CmdCytation1" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form v-if="CmdCytation1Val == 'INIT'" ref="form-cytation1" :label-position="'right'"
              style="width: 70%; margin-top: 3%;">
              <el-form-item label="RemotePath">
                <el-input v-model="cytation1Para.RemotePath"></el-input>
              </el-form-item>
            </el-form>
            <!-- <el-row v-if="CmdCytation1Val == 'INIT'">
              <div class="grid-content detail-top">
                <el-col :span="8">
                  <h3 class="detail-method">
                    RemotePath :
                  </h3>
                </el-col>
                <el-col :span="14">
                  <el-input class="input-common" v-model.trim="cytation1Para['RemotePath']">
                  </el-input>
                </el-col>
            </div>
            </el-row> -->
          </el-tab-pane>
          <el-tab-pane label="4" name="fourth">{{ paraDDD }}</el-tab-pane>
        </el-tabs>
      </div>
      <div class="sub_gap"></div>
      <div class="sub4">
        <div align='right'>
          <el-button plain @click="submit()">
            <el-icon><Upload/></el-icon>
          </el-button>
          <el-button plain @click="getUserData()">
            <el-icon><folder-opened /></el-icon>
          </el-button>
          <el-button plain @click="exportExcel()" >
            <el-icon><download /></el-icon>
          </el-button>
          <el-button plain @click="dialogHelpVisible = true" >Help</el-button>
        </div>
        <VueDraggable
          target="tbody"
          v-model="userList"
          :animation="150"
          group="people"
          ghostClass="ghost"
        >
          <el-table :data="userList"
            style="border: solid 1px; border-radius: 10px; margin-top: 2%;"
          >
            <el-table-column label="Name" prop="Instrument" :width="'95px'"/>
            <el-table-column label="CMD" prop="Command" :width="'70px'" />
            <el-table-column label="Para" prop="Parameter" :width="'180px'">
              <template v-slot="scope">
                <el-input type="textarea" :rows="3" v-model="scope.row['Parameter']"></el-input>
            </template>
            </el-table-column>
            <el-table-column prop="RemotePath" label="RemotePath" :width="'110px'">
              <template v-slot="scope">
                <el-input type="textarea" :rows="2" v-model="scope.row['RemotePath']">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="LocalPath" label="LocalPath" :width="'110px'">
              <template v-slot="scope">
                <el-input type="textarea" :rows="2" v-model="scope.row['LocalPath']"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="Time(s)">
              <template v-slot="scope">
                <el-input type="textarea" :rows="1" v-model="scope.row['time']"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="Parallel" label="Parallel">
              <template v-slot="scope">
                <el-switch v-model="scope.row['Parallel']"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="Release" label="Release">
              <template v-slot="scope">
                <el-switch v-model="scope.row['Release']"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="Opt" v-slot="{ row, $index }">
              <el-button
                @click="deleteItem(row, $index)"
                icon="el-icon-delete"
                circle
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-table-column>
          </el-table>
          <!-- {{ userList }} -->
        </VueDraggable>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ElMessage } from 'element-plus';
import unchained from '@/assets/img/unchained.png';
import robot1 from '@/assets/img/robot1.png';
import cytation1 from '@/assets/img/cytation1.png';
import 'element-plus/theme-chalk/index.css';
import axios from 'axios';
import {
  getCurrentInstance, onMounted, ref, watch,
} from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import * as XLSX from 'xlsx';

const url = 'http://192.168.1.33:81';

const dialogHelpVisible = ref(false);

const userDataLoading = ref(false);
const dialogTableVisible = ref(false);
const userData = ref([
]);
const total = ref(0);
const pagesize = ref(10);
const currentpage = ref(1);
const nowRow = ref(0);

const CmdUnchained = [{
  value: 'START',
  label: 'START',
},
{
  value: 'INIT',
  label: 'INIT',
}];
const CmdUnchainedVal = ref(CmdUnchained[1].value);
const unchainedPara = ref({
  ProjectName: '',
  ChooseDesignID: '',
  LsrFilePath: '',
  UseLsrFile: false,
  LastLibraryID: '',
  SetPrompts: '',
  SetChemicalManager: '',
  SetTipManagement: '',
  UseAI: false,
  NewDesign: false,
  ParaChanger: '',
});
// step['Instrument'], step['Command'], step['Parameter'],
// step['RemotePath'], step['LocalPath'], step['Time'],\
// step['Parallel'], step['Release'], step['Status'], pointer
const AAA = ref([
  {
    Instrument: 'Unchained',
    Command: CmdUnchainedVal,
    Parameter: '',
    // para: unchainedParaCP,
    RemotePath: '',
    LocalPath: '',
    Time: 3600,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);
watch(unchainedPara.value, (newVal) => {
  AAA.value[0].Parameter = JSON.stringify(newVal);
});

const CmdRobot1 = [{
  value: 'START',
  label: 'START',
}];
const CmdRobot1Val = 'START';
const DestinationVal = ref('Thermo');
const Destination = [
  {
    value: 'Unchained',
    label: 'Unchained',
  },
  {
    value: 'Thermo',
    label: 'Thermo',
  },
  {
    value: 'GC',
    label: 'GC',
  },
  {
    value: 'Hamilton',
    label: 'Hamilton',
  },
  {
    value: 'Cytation1',
    label: 'Cytation1',
  },
  {
    value: 'Discover',
    label: 'Discover',
  },
  {
    value: 'PT',
    label: 'PT',
  },
  {
    value: 'EC',
    label: 'EC',
  }];
const ActionVal = ref('');
const Action = [
  {
    value: '',
    label: '',
  },
  {
    value: 'grab',
    label: 'grab',
  },
  {
    value: 'place',
    label: 'place',
  }];
const PlatesVal = ref('16A');
const Plates = [
  {
    value: '96A',
    label: '96A',
  },
  {
    value: '16A',
    label: '16A',
  }];
const robot1Para = ref(DestinationVal.value);
const BBB = ref([
  {
    Instrument: 'Robot1',
    Command: CmdRobot1Val,
    Parameter: robot1Para,
    RemotePath: '',
    LocalPath: '',
    Time: 3600,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);
watch([DestinationVal, ActionVal, PlatesVal], (newVals) => {
  console.log(newVals);
  robot1Para.value = newVals[1] === '' ? `${newVals[0]}` : `${newVals[0]}/${newVals[1]}_${newVals[2]}`;
});

const CmdCytation1 = [
  {
    value: 'INIT',
    label: 'INIT',
  },
  {
    value: 'START',
    label: 'START',
  }];
const CmdCytation1Val = ref(CmdCytation1[0].value);
const cytation1Para = ref({
  RemotePath: '',
});
// const remotePathCytation1 = ref('');
const CCC = ref([
  {
    Instrument: 'Cytation1',
    Command: CmdCytation1Val,
    Parameter: '',
    RemotePath: '',
    LocalPath: '',
    Time: 3600,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);
watch(cytation1Para.value, (newVal) => {
  console.log(newVal);
  CCC.value[0].RemotePath = newVal.RemotePath;
});

const currentInstance = ref();
const activeName = ref('second');
// const paraAAA = '1';
// const paraBBB = '2';
// const paraCCC = '3';
const paraDDD = '4';
const userList = ref([]);

const DDD = ref([
  {
    name: 'DDD',
    para: paraDDD,
  },
]);
const EEE = ref([
  {
    name: 'EEE',
    para: 5,
  },
]);
const FFF = ref([
  {
    name: 'FFF',
    para: 6,
  },
]);

function handleClick(item: { Instrument: string;}) {
  console.log(item, 'click');
  if (item.Instrument === 'Unchained') {
    activeName.value = 'first';
  }
  if (item.Instrument === 'Robot1') {
    activeName.value = 'second';
  }
  if (item.Instrument === 'Cytation1') {
    activeName.value = 'third';
  }
  if (item.Instrument === 'DDD') {
    activeName.value = 'fourth';
  }
}
function deleteItem(row: JSON, index: number) {
  userList.value.splice(index, 1);
}
function onClone() {
  console.log('clone');
}
function exportExcel() {
  const table = userList;
  if (table.value.length !== 0) {
    const rowLength = table.value.length;
    console.log(Object.keys(table.value[0]));
    const data = [];
    data.push([
      'Instrument',
      'Command',
      'Parameter',
      'RemotePath',
      'LocalPath',
      'Time',
      'Parallel',
      'Release',
      'Status']);
    for (let i = 0; i < rowLength; i += 1) {
      const rowData: string[] = [];
      // sort by key
      let j = 0;
      Object.keys(table.value[0]).forEach((key) => {
        console.log('.....', key, table.value[i][key]);
        switch (key) {
          case 'Instrument': j = 0; break;
          case 'Command': j = 1; break;
          case 'Parameter': j = 2; break;
          case 'RemotePath': j = 3; break;
          case 'LocalPath': j = 4; break;
          case 'Time': j = 5; break;
          case 'Parallel': j = 6; break;
          case 'Release': j = 7; break;
          case 'Status': j = 8; break;
          default: break;
        }
        rowData[j] = String(table.value[i][key]);
        // rowData.push(table.value[i][key]);
      });
      data.push(rowData);
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table.xlsx');
  }
}

function getUserData() {
  dialogTableVisible.value = true;
  userDataLoading.value = true;
  axios.post(`${url}/main-page/get-projects`, { 'owner': 'abc' }).then((res) => {
    userData.value = res.data.data;
    total.value = userData.value.length;
    userDataLoading.value = false;
  });
}

function currentChange(currentPage: number) {
  currentpage.value = currentPage;
}
function handleData(_val: object) {
  axios.post(`${url}/main-page/get-cc-chart`, { id: _val.id }).then((res) => {
    userList.value = res.data.data;
    for (let index = 0; index < res.data.data.length; index += 1) {
      userList.value[index].Instrument = res.data.data[index].instrument;
      delete userList.value[index].instrument;
      userList.value[index].Command = res.data.data[index].command;
      delete userList.value[index].command;
      userList.value[index].Parameter = res.data.data[index].parameter;
      delete userList.value[index].parameter;
      userList.value[index].RemotePath = res.data.data[index].remote_path;
      delete userList.value[index].remote_path;
      userList.value[index].LocalPath = res.data.data[index].local_path;
      delete userList.value[index].local_path;
      userList.value[index].Time = res.data.data[index].time_allowed;
      delete userList.value[index].time_allowed;
      userList.value[index].Parallel = !!res.data.data[index].parallel;
      delete userList.value[index].parallel;
      userList.value[index].Release = !!res.data.data[index].release;
      delete userList.value[index].release;
      userList.value[index].Status = res.data.data[index].status;
      delete userList.value[index].status;
      delete userList.value[index].pointer;
      delete userList.value[index].locked;
      delete userList.value[index].id;
      delete userList.value[index].project_id;
      delete userList.value[index].local_id;
    }
  });
}

function loadAll(_val: number) {
  nowRow.value = _val;
  if (nowRow.value == null) {
    // $message({
    //   message: "No Item Selected",
    //   type: "warning",
    // });
  } else {
    handleData(nowRow.value);
    // this.currentID = nowRow.value.id;
    dialogTableVisible.value = false;
  }
}

function getTime() {
  const now = new Date();
  const y = `${now.getFullYear()}`;
  const d = `${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  const s = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
  const formattedTime = `${y}-${d}-${s}`;
  console.log(formattedTime);
  return formattedTime;
}

function submit() {
  if (userList.value.length === 0) {
    return;
  }
  const current = `${getTime()}`;
  const sendData = {
    'data': userList.value,
    'name': current,
    'type': 'General',
    'owner': 'abc',
    'parent_id': 0,
    'input': '',
    // 'owner': 'admin',
  };
  console.log('/////////', sendData);
  axios
    .post(`${url}/main-page/submit-project`, sendData)
    .then((res) => {
      if (res.status === 200) {
        ElMessage({
          message: 'Submit successful',
          type: 'success',
        });
        console.log('....', res.data.last_id);
      } else {
        ElMessage({
          message: 'Submit failed',
          type: 'error',
        });
      }
    });
}

function setPointer() {
  document.body.style.cursor = 'move';
}
function handleFocus() {
  console.log('focus');
}
function unsetPointer() {
  document.body.style.cursor = 'default';
}
function handleBlur() {
  console.log('blur');
}
onMounted(() => {
  currentInstance.value = getCurrentInstance();
  console.log(currentInstance.value.refs.tabs, 'instance');
});
</script>

<style>
.el-table .el-table__row,
.el-table .el-table__header {
  border-bottom: 1px solid #d3dce6;
}

.el-table .el-table__body tr td {
  padding: 10px 0;
  border-bottom: 1px solid #d3dce6;
}

.content {
  display: flex;
  margin-top: 5%;
}

.content .sub1 {
  width: 10%;
}

.content .sub2 {
  width: 80%;
}

.content .sub3 {
  width: 30%;
}
.content .sub_gap {
  width: 3%;
}

.content .sub4 {
  width: 47%;
}

.hide-tabs-header .el-tabs__header {
  display: none;
}

.box {
  border: 1px solid;
  width: 80px;
  height: 90px;
  margin-left: 1%;
  border-radius: 8px;
  margin-right: 15px;
  margin-bottom: 10px;
}
.el-img{
  transform: scale(0.8);
}
</style>
