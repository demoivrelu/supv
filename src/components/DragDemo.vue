<template>
  <div>
    <div class="content">
      <div class="sub1"></div>
      <div class="sub3">
        <el-row>
          <VueDraggable
            v-model="AAA"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(AAA[0])" class="box"> Unchained </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="BBB"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(BBB[0])" class="box"> BBB </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="CCC"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(CCC[0])" class="box"> CCC </el-col>
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
        <!-- <VueDraggable v-model='list1' animation='150' ghostClass='ghost'
          :group="{ name: 'people', pull: 'clone', put: false }" @clone='onClone' :sort='false'>
          <div style='border:1px solid; width: 80px; height: 30px; margin: 1%; border-radius: 5px;'
            v-for='item in list1' :key='item.para' @click="handleClick(item)">
            {{ item.name }}
          </div>
        </VueDraggable> -->
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
            <el-row style="margin-top: 3%;">
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
            </el-row>
            <el-form v-if="CmdUnchainedVal == 'INIT'" ref="form-unchained" :label-position="'right'"
              style="width: 80%; margin-top: 3%;">
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
          <el-tab-pane label="2" name="second">{{ paraBBB }}</el-tab-pane>
          <el-tab-pane label="3" name="third">{{ paraCCC }}</el-tab-pane>
          <el-tab-pane label="4" name="fourth">{{ paraDDD }}</el-tab-pane>
        </el-tabs>
      </div>
      <div class="sub_gap"></div>
      <div class="sub4">
        <VueDraggable
          target="tbody"
          v-model="userList"
          :animation="150"
          group="people"
          ghostClass="ghost"
        >
          <el-table :data="userList">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="CMD" prop="cmd" />
            <el-table-column label="Para" prop="para" :width="'200px'">
              <template v-slot="scope">
                <el-input type="textarea" :rows="3" v-model="scope.row['para']"></el-input>
            </template>
            </el-table-column>
            <el-table-column prop="RemotePath" label="RemotePath">
              <template v-slot="scope">
                <el-input type="textarea" :rows="2" v-model="scope.row['RemotePath']">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="LocalPath" label="LocalPath">
              <template v-slot="scope">
                <el-input type="textarea" :rows="2" v-model="scope.row['LocalPath']"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="Time" label="Time(s)">
              <template v-slot="scope">
                <el-input type="textarea" :rows="1" v-model="scope.row['Time']"></el-input>
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
              ></el-button>
            </el-table-column>
          </el-table>
          {{ userList }}
        </VueDraggable>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import 'element-plus/theme-chalk/index.css';
import {
  getCurrentInstance, onMounted, ref, reactive,
} from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

// const form = {
//   name: '',
//   region: '',
//   date1: '',
//   date2: '',
//   delivery: false,
//   type: [],
//   resource: '',
//   desc: '',
// };

const CmdUnchained = [{
  value: 'START',
  label: 'START',
},
{
  value: 'INIT',
  label: 'INIT',
}];
const CmdUnchainedVal = ref(CmdUnchained[1].value);
// const unchainedPart = {
//   title: 'Unchained',
//   titles: [
//     'ProjectName',
//     'ChooseDesignID',
//     'LsrFilePath',
//     'UseLsrFile',
//     'LastLibraryID',
//     'SetPrompts',
//     'SetChemicalManager',
//     'SetTipManagement',
//     'UseAI',
//     'NewDesign',
//     'ParaChanger',
//   ],
// };

// const ProjectName = ref('');
// const ChooseDesignID = ref('');
// const LsrFilePath = ref('');
// const UseLsrFile = ref(false);
// const LastLibraryID = ref('');
// const SetPrompts = ref('');
// const SetChemicalManager = ref('');
// const SetTipManagement = ref('');
// const UseAI = ref(false);
// const NewDesign = ref(false);
// const ParaChanger = ref('');

const unchainedPara = reactive({
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

// function con() {
//   console.log(unchainedPara);
// }

const currentInstance = ref();
const activeName = ref('second');
// const paraAAA = '1';
const paraBBB = '2';
const paraCCC = '3';
const paraDDD = '4';
const userList = ref([]);

const AAA = ref([
  {
    name: 'Unchained',
    cmd: CmdUnchainedVal,
    para: JSON.stringify(unchainedPara),
    remotepath: '',
    localpath: '',
    time: 3600,
    parallel: false,
    release: false,
  },
]);

const BBB = ref([
  {
    name: 'BBB',
    para: paraBBB,
  },
]);

const CCC = ref([
  {
    name: 'CCC',
    para: paraCCC,
  },
]);

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
  if (item.name === 'BBB') {
    activeName.value = 'second';
  }
  if (item.name === 'CCC') {
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
  width: 15%;
}

.content .sub2 {
  width: 70%;
}

.content .sub3 {
  width: 30%;
}
.content .sub_gap {
  width: 5%;
}

.content .sub4 {
  width: 35%;
}

.hide-tabs-header .el-tabs__header {
  display: none;
}

.box {
  border: 1px solid;
  width: 80px;
  height: 50px;
  margin: 1%;
  border-radius: 5px;
  margin: 5px;
}
</style>
