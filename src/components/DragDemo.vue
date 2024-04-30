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
            <el-col @click="handleClick(AAA[0])" class="box"> AAA </el-col>
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
          <el-tab-pane label="1" name="first">{{ paraAAA }}</el-tab-pane>
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
            <el-table-column label="Para" prop="para" />
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
import { getCurrentInstance, onMounted, ref } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

const currentInstance = ref();
const activeName = ref('second');
const paraAAA = '1';
const paraBBB = '2';
const paraCCC = '3';
const paraDDD = '4';
const userList = ref([]);

const AAA = ref([
  {
    name: 'AAA',
    para: paraAAA,
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
  if (item.name === 'AAA') {
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
  width: 70px;
  height: 50px;
  margin: 1%;
  border-radius: 5px;
  margin: 5px;
}
</style>
