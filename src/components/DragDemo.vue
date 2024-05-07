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
          <el-button plain @click="exportExcel()" >
            <el-icon><Download /></el-icon>
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
            <el-table-column label="Name" prop="name" :width="'95px'"/>
            <el-table-column label="CMD" prop="cmd" :width="'70px'" />
            <el-table-column label="Para" prop="para" :width="'180px'">
              <template v-slot="scope">
                <el-input type="textarea" :rows="3" v-model="scope.row['para']"></el-input>
            </template>
            </el-table-column>
            <el-table-column prop="remotepath" label="RemotePath" :width="'110px'">
              <template v-slot="scope">
                <el-input type="textarea" :rows="2" v-model="scope.row['remotepath']">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="localpath" label="LocalPath" :width="'110px'">
              <template v-slot="scope">
                <el-input type="textarea" :rows="2" v-model="scope.row['localpath']"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="Time(s)">
              <template v-slot="scope">
                <el-input type="textarea" :rows="1" v-model="scope.row['time']"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="parallel" label="Parallel">
              <template v-slot="scope">
                <el-switch v-model="scope.row['parallel']"></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="release" label="Release">
              <template v-slot="scope">
                <el-switch v-model="scope.row['release']"></el-switch>
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
import unchained from '@/assets/img/unchained.png';
import robot1 from '@/assets/img/robot1.png';
import cytation1 from '@/assets/img/cytation1.png';
import 'element-plus/theme-chalk/index.css';
import {
  getCurrentInstance, onMounted, ref, reactive, watch,
} from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import * as XLSX from 'xlsx';

const dialogHelpVisible = ref(false);

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
const AAA = ref([
  {
    name: 'Unchained',
    cmd: CmdUnchainedVal,
    para: '',
    // para: unchainedParaCP,
    remotepath: '',
    localpath: '',
    time: 3600,
    parallel: false,
    release: false,
  },
]);
watch(unchainedPara.value, (newVal) => {
  AAA.value[0].para = JSON.stringify(newVal);
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
    name: 'Robot1',
    cmd: CmdRobot1Val,
    para: robot1Para,
    remotepath: '',
    localpath: '',
    time: 3600,
    parallel: false,
    release: false,
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
const remotePathCytation1 = ref('');
const CCC = ref([
  {
    name: 'Cytation1',
    cmd: CmdCytation1Val,
    para: '',
    remotepath: '',
    localpath: '',
    time: 3600,
    parallel: false,
    release: false,
  },
]);
watch(cytation1Para.value, (newVal) => {
  console.log(newVal);
  CCC.value[0].remotepath = newVal.RemotePath;
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

function handleClick(item: { name: string; para: string;}) {
  console.log(item, 'click');
  if (item.name === 'Unchained') {
    activeName.value = 'first';
  }
  if (item.name === 'Robot1') {
    activeName.value = 'second';
  }
  if (item.name === 'Cytation1') {
    activeName.value = 'third';
  }
  if (item.name === 'DDD') {
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
      Object.keys(table.value[0]).forEach((key) => {
        rowData.push(table.value[i][key]);
      });
      data.push(rowData);
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table.xlsx');
  }
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
  margin: 1%;
  border-radius: 8px;
  margin: 5px;
}
.el-img{
  transform: scale(0.8);
}
</style>
