<template>
  <div align="center">
    <div align='right' style="margin-right: 12.5%; margin-top: 1%;">
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
    <div class="content"
      style="border-radius: 20px; height: 88vh; width: 80%; margin-top: 2vh;">
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
            5. The data could be download as an excel file when "Download" button pressed.<br><br>
            6. The data could be imported from database when "Import" button pressed.<br><br>
            7. The data could be uploaded when "Upload" button pressed.<br><br>
            8. Parameter of each instrument displayed is default.<br><br>
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

        <el-row style="margin-top: 10%;">
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
            style="position: relative;"
            >
            <div class="title">Unchained</div>
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
            >
            <div class="title">Robot1</div>
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
            >
            <div class="title">Cytation1</div>
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
            <el-col @click="handleClick(DDD[0])" class="box"
            @mouseenter="setPointer"
            @focus="handleFocus"
            @mouseleave="unsetPointer"
            @blur="handleBlur"
            >
              <div class="title">Thermo</div>
              <el-image :src='thermo' class="el-img"
                style="translate: 0px -20px;transform: scale(0.65) scaleY(0.9);"></el-image>
            </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="EEE"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(EEE[0])" class="box"
            @mouseenter="setPointer"
            @focus="handleFocus"
            @mouseleave="unsetPointer"
            @blur="handleBlur"
            >
              <div class="title">Hamilton</div>
              <el-image :src='hamilton' class="el-img"
                style="translate: 0px 15px;transform: scale(0.94);"></el-image>
            </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="FFF"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(FFF[0])" class="box"
            @mouseenter="setPointer"
            @focus="handleFocus"
            @mouseleave="unsetPointer"
            @blur="handleBlur"
            >
              <div class="title">Discover</div>
              <el-image :src='discover' class="el-img"
                style="translate: 0px -5px;transform: scale(0.94);"></el-image>
            </el-col>
          </VueDraggable>
          <VueDraggable
            v-model="GGG"
            animation="150"
            ghostClass="ghost"
            :group="{ name: 'people', pull: 'clone', put: false }"
            @clone="onClone"
            :sort="false"
          >
            <el-col @click="handleClick(GGG[0])" class="box"
            @mouseenter="setPointer"
            @focus="handleFocus"
            @mouseleave="unsetPointer"
            @blur="handleBlur"
            >
              <div class="title">GC</div>
              <el-image :src='gc' class="el-img"
                style="translate: 0px -5px;transform: scale(0.9) scaleX(1.15);"></el-image>
            </el-col>
          </VueDraggable>
        </el-row>

        <el-tabs
          v-model="activeName"
          ref="tabs"
          class="hide-tabs-header para-box"
        >
          <el-tab-pane label="1" name="first" align="center">
            <el-form ref="cmd-unchaied" :label-position="'right'"
              style="width: 70%; margin-top: 8%;">
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
            <el-form ref="cmd-robot1" :label-position="'right'"
              style="width: 70%; margin-top: 8%;">
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
              style="width: 70%; margin-top: 8%;">
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
                <el-input v-model="cytation1Para.RemotePath" style="width: 90%"/>&nbsp;
                <el-icon v-bind:title="'Experimental file path in Cytation1 IPC'">
                  <warning />
                </el-icon>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="4" name="fourth">
            <el-form ref="cmd-thermo" :label-position="'right'"
              style="width: 70%; margin-top: 8%;">
              <el-form-item label="CMD">
                <el-select v-model="CmdThermoVal" placeholder="Choose">
                  <el-option v-for="item in CmdThermo" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form v-if="CmdThermoVal == 'INIT'" ref="form-thermo" :label-position="'right'"
              style="width: 70%; margin-top: 3%;">
              <el-form-item label="ProcessingMethod">
                <el-input v-model="thermoPara.ProcessingMethod"></el-input>
              </el-form-item>
              <el-form-item label="InstrumentMethod">
                <el-input v-model="thermoPara.InstrumentMethod"></el-input>
              </el-form-item>
              <el-form-item label="Injection" >
                <el-input v-model="thermoPara.Injection[0][0]" style="width: 30%"/>
                <el-input v-model="thermoPara.Injection[0][1]" style="margin-left:12px;width: 30%"/>
                <el-input v-model="thermoPara.Injection[0][2]" style="margin-left:12px;width: 30%"/>
              </el-form-item>
              <el-form-item label="SequenceName">
                <el-input v-model="thermoPara.SequenceName"></el-input>
              </el-form-item>
              <el-form-item label="TemplateName">
                <el-input v-model="thermoPara.TemplateName"></el-input>
              </el-form-item>
              <el-form-item label="ProjectName">
                <el-input v-model="thermoPara.ProjectName"></el-input>
              </el-form-item>
              <el-form-item label="Channels">
                <el-input v-model="thermoPara.Channels[0]"></el-input>
              </el-form-item>
              <el-form-item label="New">
                <el-switch v-model="thermoPara.New"></el-switch>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="5" name="fifth">
            <el-form ref="cmd-hamilton" :label-position="'right'"
              style="width: 70%; margin-top: 8%;">
              <el-form-item label="CMD">
                <el-select v-model="CmdHamiltonVal" placeholder="Choose">
                  <el-option v-for="item in CmdHamilton" :key="item.value" :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form v-if="CmdHamiltonVal == 'INIT'" ref="form-hamilton" :label-position="'right'"
              style="width: 70%; margin-top: 3%;">
              <el-form-item label="RemotePath">
                <el-input v-model="hamiltonPara.RemotePath" style="width: 90%"/>&nbsp;
                <el-icon v-bind:title="'Experimental file path in Hamilton IPC'">
                  <warning />
                </el-icon>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="6" name="sixth">
            <el-scrollbar height="48vh">
              <el-form ref="cmd-discover" :label-position="'right'"
                style="width: 70%; margin-top: 8%;">
                <el-form-item label="CMD">
                  <el-select v-model="CmdDiscoverVal" placeholder="Choose">
                    <el-option v-for="item in CmdDiscover" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-form v-if="CmdDiscoverVal == 'INIT'" ref="form-discover" :label-position="'right'"
                style="width: 70%;">
                <el-form-item label="Method">
                  <el-input v-model="discoverPara.Method"></el-input>
                </el-form-item>
                <el-form-item label="Power">
                  <el-input-number v-model="discoverPara.Power" max="300" min="0"/>&nbsp;
                  <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                </el-form-item>
                <el-form-item label="Temperature">
                  <el-input-number v-model="discoverPara.Temperature" max="300" min="0"/>&nbsp;
                  <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                </el-form-item>
                <el-form-item label="Time">
                  <el-input-number v-model="discoverPara.Time" max="356400" min="0"/>&nbsp;
                  <el-icon v-bind:title="'max : 356400'"><warning/></el-icon>
                </el-form-item>
                <el-form-item label="Pressure">
                  <el-input-number v-model="discoverPara.Pressure" max="300" min="0"/>&nbsp;
                  <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                </el-form-item>
                <el-form-item label="Stirring">
                  <el-input-number v-model="discoverPara.Stirring" max="900" min="0"/>&nbsp;
                  <el-icon v-bind:title="'max : 900'"><warning/></el-icon>
                </el-form-item>
                <el-form-item label="Power Interval">
                  <el-input-number v-model="discoverPara.Power_Interval"/>
                </el-form-item>
                <el-form-item label="Cooling Interval">
                  <el-input-number v-model="discoverPara.Cooling_Interval"/>
                </el-form-item>
                <el-form-item label="Max Temperature">
                  <el-input-number v-model="discoverPara.Maximum_Temperature" max="300" min="0"/>
                    &nbsp;
                  <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                </el-form-item>
                <el-form-item label="Min Temperature">
                  <el-input-number v-model="discoverPara.Minimum_Temperature" max="300" min="0"/>
                </el-form-item>
                <el-form-item label="Number of Cycles">
                  <el-input-number v-model="discoverPara.Number_of_Cycles"/>
                </el-form-item>
              </el-form>
            </el-scrollbar>
          </el-tab-pane>

          <el-tab-pane label="7" name="seventh">
            <el-scrollbar height="48vh">
              <el-form ref="cmd-gc" :label-position="'right'"
                style="width: 70%; margin-top: 8%;">
                <el-form-item label="CMD">
                  <el-select v-model="CmdGCVal" placeholder="Choose">
                    <el-option v-for="item in CmdGC" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-form v-if="CmdGCVal == 'INIT'" ref="form-gc" :label-position="'right'"
                style="width: 70%; margin-top: 3%;">
                <!-- <el-form-item label="Type">
                  <el-input v-model="gcPara.Type"></el-input>
                </el-form-item> -->
                <el-form-item label="ProjectId">
                  <el-input v-model="gcPara.ProjectId"></el-input>
                </el-form-item>
                <el-form-item label="AcquisitionMethodPath">
                  <el-input v-model="gcPara.SequenceInjections[0].AcquisitionMethodPath"></el-input>
                </el-form-item>
                <el-form-item label="SampleLocation">
                  <el-input v-model="gcPara.SequenceInjections[0].SampleLocation"></el-input>
                </el-form-item>
                <el-form-item label="InjectionVolume">
                  <el-input v-model="gcPara.SequenceInjections[0].InjectionVolume"></el-input>
                </el-form-item>
                <el-form-item label="SampleType">
                  <el-input v-model="gcPara.SequenceInjections[0].SampleType"></el-input>
                </el-form-item>
                <el-form-item label="SampleName">
                  <el-input v-model="gcPara.SequenceInjections[0].SampleName"></el-input>
                </el-form-item>
                <el-form-item label="SampleAmount">
                  <el-input v-model="gcPara.SequenceInjections[0].SampleAmount"></el-input>
                </el-form-item>
                <el-form-item label="SampleDescription">
                  <el-input v-model="gcPara.SequenceInjections[0].SampleDescription"></el-input>
                </el-form-item>
                <el-form-item label="DataFilename">
                  <el-input v-model="gcPara.SequenceInjections[0].DataFilename"></el-input>
                </el-form-item>
                <el-form-item label="SelectedInjection">
                  <el-input v-model="gcPara.SequenceInjections[0].SelectedInjection"></el-input>
                </el-form-item>
              </el-form>
            </el-scrollbar>
          </el-tab-pane>
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
          <el-table :data="userList" class="data-box">
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
import thermo from '@/assets/img/thermo.png';
import hamilton from '@/assets/img/hamilton.png';
import discover from '@/assets/img/discover.png';
import gc from '@/assets/img/gc.png';
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
const userData = ref([]);
const total = ref(0);
const pagesize = ref(10);
const currentpage = ref(1);
const nowRow = ref(0);

const currentInstance = ref();
const activeName = ref('second');
const userList = ref([]);

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
  ProjectName: '202303011625',
  ChooseDesignID: '558',
  LsrFilePath: '',
  UseLsrFile: false,
  LastLibraryID: '',
  SetPrompts: 'D://Optimization_ryx//prepare_prompts_1.xml',
  SetChemicalManager: 'D://Optimization_ryx//prepare_manager_1.xml',
  SetTipManagement: '',
  UseAI: false,
  NewDesign: false,
  ParaChanger: [],
});
const AAA = ref([
  {
    Instrument: 'Unchained',
    Command: CmdUnchainedVal,
    Parameter: JSON.stringify(unchainedPara.value),
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
  CCC.value[0].RemotePath = newVal.RemotePath;
});

const CmdThermo = [
  {
    value: 'INIT',
    label: 'INIT',
  },
  {
    value: 'START',
    label: 'START',
  },
  {
    value: 'SAMPLELOAD',
    label: 'SAMPLELOAD',
  },
  {
    value: 'SAMPLEUNLOAD',
    label: 'SAMPLEUNLOAD',
  }];
const CmdThermoVal = ref(CmdThermo[0].value);
const thermoPara = ref({
  ProcessingMethod: 'Data/sequence/RYX/RYX-2023-2-16-test',
  InstrumentMethod: 'Data/sequence/RYX/RYX-2023-2-16-test',
  Injection: [
    [
      'diol-ox',
      '0.25',
      'R:A1',
    ],
  ],
  SequenceName: 'Data/sequence/RYX/RYX-diol-oxidation',
  Instrument: 'ISQ-EC',
  TemplateName: 'Data/sequence/RYX/RYX-report-test-1',
  User: '',
  ProjectName: 'diol_oxidation',
  Channels: [
    'UV_VIS_1',
  ],
  New: false,
});
const DDD = ref([
  {
    Instrument: 'Thermo',
    Command: CmdThermoVal,
    Parameter: JSON.stringify(thermoPara.value),
    RemotePath: '',
    LocalPath: '',
    Time: 3600,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);
watch(thermoPara.value, (newVal) => {
  DDD.value[0].Parameter = JSON.stringify(newVal);
});

const CmdHamilton = [
  {
    value: 'INIT',
    label: 'INIT',
  },
  {
    value: 'START',
    label: 'START',
  }];
const CmdHamiltonVal = ref(CmdCytation1[0].value);
const hamiltonPara = ref({
  RemotePath: '',
});
const EEE = ref([
  {
    Instrument: 'Hamilton',
    Command: CmdHamiltonVal,
    Parameter: '',
    RemotePath: '',
    LocalPath: '',
    Time: 3600,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);
watch(hamiltonPara.value, (newVal) => {
  EEE.value[0].RemotePath = newVal.RemotePath;
});

const CmdDiscover = [
  {
    value: 'INIT',
    label: 'INIT',
  },
  {
    value: 'START',
    label: 'START',
  },
  {
    value: 'SAMPLELOAD',
    label: 'SAMPLELOAD',
  },
  {
    value: 'SAMPLEUNLOAD',
    label: 'SAMPLEUNLOAD',
  }];
const CmdDiscoverVal = ref(CmdCytation1[0].value);
const discoverPara = ref({
  Method: 'Dynamic',
  Power: 30,
  Temperature: 60,
  Time: 900,
  Pressure: 100,
  Stirring: 500,
  Power_Interval: 40,
  Cooling_Interval: 20,
  Maximum_Temperature: 60,
  Minimum_Temperature: 55,
  Number_of_Cycles: 2,
});
const FFF = ref([
  {
    Instrument: 'Discover',
    Command: CmdDiscoverVal,
    Parameter: JSON.stringify(discoverPara.value),
    RemotePath: '',
    LocalPath: '',
    Time: 3600,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);
watch(discoverPara.value, (newVal) => {
  FFF.value[0].Parameter = JSON.stringify(newVal);
});

const CmdGC = [
  {
    value: 'INIT',
    label: 'INIT',
  },
  {
    value: 'START',
    label: 'START',
  }];
const CmdGCVal = ref(CmdCytation1[0].value);
const gcPara = ref({
  UserCode: 'admin',
  UserPWD: '!QAZ2wsx',
  Ticket: '',
  Type: 1,
  InstrumentId: '16',
  ProjectId: '15',
  SequenceInjections: [{
    AcquisitionMethodPath: '/DEMO/Methods/AcqMethod_2min.amx',
    SampleLocation: '2',
    InjectionVolume: 1,
    SampleType: 0,
    SampleName: 'sample 2',
    SampleAmount: 1,
    SampleDescription: 'descri 2',
    DataFilename: 'datafilename2',
    SelectedInjection: 'Als',
  },
  ],
});
const GGG = ref([
  {
    Instrument: 'GC',
    Command: CmdGCVal,
    Parameter: JSON.stringify(gcPara.value),
    RemotePath: '',
    LocalPath: '',
    Time: 3600,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);
watch(gcPara.value, (newVal) => {
  GGG.value[0].Parameter = JSON.stringify(newVal);
});

function handleClick(item: { Instrument: string;}) {
  if (item.Instrument === 'Unchained') {
    activeName.value = 'first';
  }
  if (item.Instrument === 'Robot1') {
    activeName.value = 'second';
  }
  if (item.Instrument === 'Cytation1') {
    activeName.value = 'third';
  }
  if (item.Instrument === 'Thermo') {
    activeName.value = 'fourth';
  }
  if (item.Instrument === 'Hamilton') {
    activeName.value = 'fifth';
  }
  if (item.Instrument === 'Discover') {
    activeName.value = 'sixth';
  }
  if (item.Instrument === 'GC') {
    activeName.value = 'seventh';
  }
}

function deleteItem(row: JSON, index: number) {
  userList.value.splice(index, 1);
}

function onClone() {
  currentInstance.value = getCurrentInstance();
}

function exportExcel() {
  const table = userList;
  if (table.value.length !== 0) {
    const rowLength = table.value.length;
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
    dialogTableVisible.value = false;
  } else {
    handleData(nowRow.value);
    dialogTableVisible.value = false;
  }
}

function getTime() {
  const now = new Date();
  const y = `${now.getFullYear()}`;
  const d = `${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
  const s = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
  const formattedTime = `${y}-${d}-${s}`;
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
  };
  axios
    .post(`${url}/main-page/submit-project`, sendData)
    .then((res) => {
      if (res.status === 200) {
        ElMessage({
          message: 'Submit successful',
          type: 'success',
        });
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
  currentInstance.value = getCurrentInstance();
}

function unsetPointer() {
  document.body.style.cursor = 'default';
}

function handleBlur() {
  currentInstance.value = getCurrentInstance();
}

onMounted(() => {
  currentInstance.value = getCurrentInstance();
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
  margin-top: 2%;
  box-shadow: 5px 5px 20px #888888;
}

.content .sub1 {
  width: 3%;
}

/* .content .sub2 {
  width: 80%;
} */

.content .sub3 {
  width: 30%;
}
.content .sub_gap {
  width: 3%;
}

.content .sub4 {
  width: 61%;
}

.hide-tabs-header .el-tabs__header {
  display: none;
}

.box {
  /* border: 1px solid; */
  width: 84px;
  height: 100px;
  margin-left: 1%;
  border: solid 1px #ccc;
  border-radius: 8px;
  margin-right: 25px;
  margin-bottom: 10px;
  margin-top: 5px;
  box-shadow: 2px 2px 8px #888888;
}

.box:hover{
  transform: scale(1.06);
  transition: 0.5s;
}

.para-box{
  margin-top: 4%;
  height: 51vh;
  /* border: 1px solid; */
  border: solid 1px #ccc;
  border-radius: 10px;
  box-shadow: 1px 1px 6px #888888;
}

.data-box{
  border: solid 1px #ccc; border-radius: 10px; margin-top: 5%;
  height: 78vh;
  box-shadow: 1px 1px 6px #888888;
}

.box .title{
  font-size: 14px; font-weight: 600;
}

.el-button{
  border-radius: 8px;
  box-shadow: 1px 1px 5px #888888;
}
.el-form-item{
  margin-bottom: 13px;
}
.el-img{
  transform: scale(0.8);
}
.el-dialog {
  border-radius: 10px;
}
</style>
