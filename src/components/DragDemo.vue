<template>
  <div align="center" ref="disableZoomContainer" class="container">
    <div style="height: 1vh"></div>
    <el-row style="margin-top: 2%;">
      <el-col :span="3"></el-col>
      <el-col :span="9" align='left' style="font-size: 32px; font-weight: 900;">
        &nbsp;Ichemfoundry
      </el-col>
      <el-col :span="9">
        <div align='right' >
          <el-switch
            v-bind:title="'Take Control'"
            size="large"
            v-model="valueTakeControl"
            :active-action-icon="SwitchButton"
            :inactive-action-icon="CircleClose"
            style="margin-right: 10px;"
          />
          <el-button plain>
            <a :href=conf.apiUrl>API
            </a>
          </el-button>
          <el-button plain @click="chartDisp()">
            <i class="iconfont icon-bujufangshi icon-class" style="font-size:19px"></i>
          </el-button>
          <el-button plain @click="dialogHelpVisible = true" >
            <i class="iconfont icon-help icon-class" style="font-size:16px"></i>
          </el-button>
          <el-button plain @click="logout()" >
            <i class="iconfont icon-Logout icon-class" style="font-size:17px"></i>
          </el-button>
        </div>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>

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
        9. Before running instrument, please switch to "Take Control".<br><br>
        10. If you want to run a table progress, please open an exist progress
        in database or upload a new one. Local modification will not take effect
        while running progress.
      </div>
    </el-dialog>
    <el-dialog :modal-append-to-body="false"
      v-model="dialogTableVisible" style="width: 56%; position:relative">
      <div :style="{height:'50px',width:'92%',marginTop:coverTop,opacity:'0',
        backgroundColor:'#aaa',position:'absolute', zIndex:'999'}"/>
      <el-collapse v-model="activaNameCollapse" @change="handleChangeCollapse" align="left"
        :style="{position: 'absolute', marginTop:collapseTop,width: '98%', zIndex:'998'}">
        <el-collapse-item name="1">
          <template v-slot:title>
            <div style="font-size: 18px;">
              Load
            </div>
            <i class="iconfont icon-filter-records icon-class"
              style="font-size:20px; margin-left:93%; margin-top:-5px"></i>
          </template>
          <el-form :model="form" label-width="auto">
            <el-row>
              <el-col :span="10" >
                <el-form-item label="Name">
                  <el-input v-model="form.name" style="width: 90%"/>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="Type">
                  <el-select v-model="form.type" placeholder="select type">
                    <el-option label="" value="" />
                    <el-option label="General" value="General" />
                    <el-option label="Optimization" value="Optimization" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="&nbsp;">
                  <el-checkbox-group v-model="form.star">
                    <el-checkbox value="marked" name="type">
                      Marked
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12" align="center">
                <el-form-item label="From">
                  <el-col :span="10">
                    <el-date-picker
                      v-model="form.dateFrom1"
                      type="date"
                      placeholder="Pick a date"
                      style="width: 100%"
                      value-format="YYYY-MM-DD"
                    />
                  </el-col>
                  <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="10">
                    <el-time-picker
                      v-model="form.dateFrom2"
                      placeholder="Pick a time"
                      style="width: 100%"
                      value-format="HH:mm:ss"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12" align="center">
                <el-form-item label="To">
                  <el-col :span="10">
                    <el-date-picker
                      v-model="form.dateTo1"
                      type="date"
                      placeholder="Pick a date"
                      style="width: 100%"
                      value-format="YYYY-MM-DD"
                    />
                  </el-col>
                  <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="10">
                    <el-time-picker
                      v-model="form.dateTo2"
                      placeholder="Pick a time"
                      style="width: 100%"
                      value-format="HH:mm:ss"
                    />
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="4">
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>

      <el-table v-loading="userDataLoading"
        :style="{ height: tableHeight, marginTop: filterGap}"
        :data="userData.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
        highlight-current-row >
        <el-table-column property="id" :label="'ID'" width="64" />
        <el-table-column property="order_name" :label="'Name'" width="200" />
        <el-table-column property="status" :label="'Status'" width="120"/>
        <el-table-column property="type" :label="'Type'" width="150"/>
        <el-table-column property="name" :label="'Owner'" width="100"/>
        <el-table-column property="create_time" :label="'Create Time'" width="200"/>
        <el-table-column >
          <template v-slot="scope">
            <el-button @click="loadAll(scope.row)" circle style="scale: 0.9">
              <el-icon>
                <document />
              </el-icon>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column :label="'Mark'">
          <template v-slot="scope">
            <div class="star-div">
              <el-icon class="star-icon" @click="changeStar(scope.row)"
                @mouseenter="hoverStar(scope.row)"
                @focus="focusStar()"
                @mouseleave="leaveStar(scope.row)"
                @blur="blurStar()"
                :style="{opacity:chooseStar(scope.row)}">
                <star off/>
              </el-icon>
            </div>
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

    <div class="content" v-if="chart"
      style="border-radius: 20px; height: 89vh; width: 80%; margin-top: 2vh;">
        <div class="sub1"></div>
        <div class="sub3" id="sub3">
          <div style="overflow:auto;height: 26vh;">
            <el-row style="margin-top:3.5%;margin-left:2%;" id="module">
              <VueDraggable
                v-model="AAA"
                animation="150"
                ghostClass="ghost"
                :group="{ name: 'people', pull: 'clone', put: false }"
                @clone="onClone"
                :sort="false"
              >
              <el-col @click="handleClick(AAA[0])" :class="ClassUnchained"
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
                <el-col @click="handleClick(BBB[0])" :class="ClassRobot1"
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
                <el-col @click="handleClick(CCC[0])" :class="ClassCytation1"
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
                <el-col @click="handleClick(DDD[0])" :class="ClassThermo"
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
                <el-col @click="handleClick(EEE[0])" :class="ClassHamilton"
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
                <el-col @click="handleClick(FFF[0])" :class="ClassDiscover"
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
                <el-col @click="handleClick(GGG[0])" :class="ClassGC"
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
              <VueDraggable
                v-model="aaaData"
                animation="150"
                ghostClass="ghost"
                :group="{ name: 'people', pull: 'clone', put: false }"
                @clone="onClone"
                :sort="false"
              >
                <el-col @click="handleClick(aaaData[0])" :class="ClassAAA"
                @mouseenter="setPointer"
                @focus="handleFocus"
                @mouseleave="unsetPointer"
                @blur="handleBlur"
                >
                  <div class="title">AAA</div>
                  <el-image :src='a' class="el-img"
                    style="translate: 0px -5px;transform: scale(0.9) scaleX(1.15);"></el-image>
                </el-col>
              </VueDraggable>
            </el-row>
          </div>

          <el-tabs
            id="module-para"
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
              <el-form v-if="CmdUnchainedVal == 'INIT'" ref="form-unchained"
                :label-position="'right'" style="width: 70%; margin-top: 3%;">
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
              <div align="right" style="height: 5vh">
                <el-button @click="run('RESET', AAA[0])">
                  <el-icon> <refresh /></el-icon>
                </el-button>
                <el-button @click="run(CmdUnchainedVal, AAA[0])" :disabled="disabled"
                  style="margin-right:16%">
                  Run
                </el-button>
              </div>
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
              <div align="right" style="height: 5vh">
                <el-button @click="run('RESET', BBB[0])">
                  <el-icon> <refresh /></el-icon>
                </el-button>
                <el-button @click="run(CmdRobot1Val, BBB[0])" :disabled="disabled"
                  style="margin-right:16%">
                  Run
                </el-button>
              </div>
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
              <el-form v-if="CmdCytation1Val == 'INIT'" ref="form-cytation1"
                :label-position="'right'" style="width: 70%; margin-top: 3%;">
                <el-form-item label="RemotePath">
                  <el-input v-model="cytation1Para.RemotePath" style="width: 90%"/>&nbsp;
                  <el-icon v-bind:title="'Experimental file path in Cytation1 IPC'">
                    <warning />
                  </el-icon>
                </el-form-item>
              </el-form>
              <div align="right" style="height: 5vh">
                <el-button @click="run('RESET', CCC[0])">
                  <el-icon> <refresh /></el-icon>
                </el-button>
                <el-button @click="run(CmdCytation1Val, CCC[0])" :disabled="disabled"
                  style="margin-right:16%">
                  Run
                </el-button>
              </div>
            </el-tab-pane>

            <el-tab-pane label="4" name="fourth">
              <el-scrollbar height="48vh">
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
                    <el-input v-model="thermoPara.Injection[0][0]" style="width:30%"/>
                    <el-input v-model="thermoPara.Injection[0][1]"
                      style="margin-left:12px;width:30%">
                    </el-input>
                    <el-input v-model="thermoPara.Injection[0][2]"
                      style="margin-left:12px;width:30%">
                    </el-input>
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
                <div align="right" style="height: 5vh">
                  <el-button @click="run('RESET', DDD[0])">
                    <el-icon> <refresh /></el-icon>
                  </el-button>
                  <el-button @click="run(CmdThermoVal, DDD[0])" :disabled="disabled"
                    style="margin-right:16%">
                    Run
                  </el-button>
                </div>
              </el-scrollbar>
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
              <div align="right" style="height: 5vh">
                <el-button @click="run('RESET', EEE[0])">
                  <el-icon> <refresh /></el-icon>
                </el-button>
                <el-button @click="run(CmdHamiltonVal, EEE[0])" :disabled="disabled"
                  style="margin-right:16%">
                  Run
                </el-button>
              </div>
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
                <el-form v-if="CmdDiscoverVal == 'INIT'" ref="form-discover"
                  :label-position="'right'" style="width: 70%;">
                  <el-form-item label="Method">
                    <el-input v-model="discoverPara.Method"></el-input>
                  </el-form-item>
                  <el-form-item label="Power">
                    <el-input-number v-model="discoverPara.Power" :max="300" :min="0"/>&nbsp;
                    <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                  </el-form-item>
                  <el-form-item label="Temperature">
                    <el-input-number v-model="discoverPara.Temperature" :max="300" :min="0"/>&nbsp;
                    <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                  </el-form-item>
                  <el-form-item label="Time">
                    <el-input-number v-model="discoverPara.Time" :max="356400" :min="0"/>&nbsp;
                    <el-icon v-bind:title="'max : 356400'"><warning/></el-icon>
                  </el-form-item>
                  <el-form-item label="Pressure">
                    <el-input-number v-model="discoverPara.Pressure" :max="300" :min="0"/>&nbsp;
                    <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                  </el-form-item>
                  <el-form-item label="Stirring">
                    <el-input-number v-model="discoverPara.Stirring" :max="900" :min="0"/>&nbsp;
                    <el-icon v-bind:title="'max : 900'"><warning/></el-icon>
                  </el-form-item>
                  <el-form-item label="Power Interval">
                    <el-input-number v-model="discoverPara.Power_Interval"/>
                  </el-form-item>
                  <el-form-item label="Cooling Interval">
                    <el-input-number v-model="discoverPara.Cooling_Interval"/>
                  </el-form-item>
                  <el-form-item label="Max Temperature">
                    <el-input-number v-model="discoverPara.Maximum_Temperature" :max="300" :min="0"
                    />&nbsp;
                    <el-icon v-bind:title="'max : 300'"><warning/></el-icon>
                  </el-form-item>
                  <el-form-item label="Min Temperature">
                    <el-input-number v-model="discoverPara.Minimum_Temperature" :max="300" :min="0"
                    />
                  </el-form-item>
                  <el-form-item label="Number of Cycles">
                    <el-input-number v-model="discoverPara.Number_of_Cycles"/>
                  </el-form-item>
                </el-form>
                <div align="right" style="height: 5vh">
                <el-button @click="run('RESET', FFF[0])">
                  <el-icon> <refresh /></el-icon>
                </el-button>
                <el-button @click="run(CmdDiscoverVal, FFF[0])" :disabled="disabled"
                  style="margin-right:16%">
                  Run
                </el-button>
              </div>
              </el-scrollbar>
            </el-tab-pane>

            <el-tab-pane label="7" name="seventh">
              <el-scrollbar height="48vh">
                <el-form ref="cmd-gc" :label-position="'right'"
                  style="width: 70%; margin-top: 8%;">
                  <el-form-item label="CMD">
                    <el-select v-model="CmdGCVal" placeholder="Choose">
                      <el-option v-for="item in CmdGC" :key="item.value"
                        :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <el-form v-if="CmdGCVal == 'INIT'" ref="form-gc" :label-position="'right'"
                  style="width: 70%; margin-top: 3%;">
                  <el-form-item label="ProjectId">
                    <el-input v-model="gcPara.ProjectId"/>
                  </el-form-item>
                  <el-form-item label="AcquisitionMethodPath">
                    <el-input v-model="gcPara.SequenceInjections[0].AcquisitionMethodPath"/>
                  </el-form-item>
                  <el-form-item label="SampleLocation">
                    <el-input v-model="gcPara.SequenceInjections[0].SampleLocation"/>
                  </el-form-item>
                  <el-form-item label="InjectionVolume">
                    <el-input v-model="gcPara.SequenceInjections[0].InjectionVolume"/>
                  </el-form-item>
                  <el-form-item label="SampleType">
                    <el-input v-model="gcPara.SequenceInjections[0].SampleType"/>
                  </el-form-item>
                  <el-form-item label="SampleName">
                    <el-input v-model="gcPara.SequenceInjections[0].SampleName"/>
                  </el-form-item>
                  <el-form-item label="SampleAmount">
                    <el-input v-model="gcPara.SequenceInjections[0].SampleAmount"/>
                  </el-form-item>
                  <el-form-item label="SampleDescription">
                    <el-input v-model="gcPara.SequenceInjections[0].SampleDescription"/>
                  </el-form-item>
                  <el-form-item label="DataFilename">
                    <el-input v-model="gcPara.SequenceInjections[0].DataFilename"/>
                  </el-form-item>
                  <el-form-item label="SelectedInjection">
                    <el-input v-model="gcPara.SequenceInjections[0].SelectedInjection"/>
                  </el-form-item>
                </el-form>
                <div align="right" style="height: 5vh">
                <el-button @click="run('RESET', GGG[0])">
                  <el-icon> <refresh /></el-icon>
                </el-button>
                <el-button @click="run(CmdGCVal, GGG[0])" :disabled="disabled"
                  style="margin-right:16%">
                  Run
                </el-button>
              </div>
              </el-scrollbar>
            </el-tab-pane>

            <el-tab-pane label="8" name="eighth">
              <el-form ref="cmd-AAA" :label-position="'right'"
                style="width: 70%; margin-top: 8%;">
                <el-form-item label="CMD">
                  <el-select v-model="CmdAAAVal" placeholder="Choose">
                    <el-option v-for="item in CmdAAA" :key="item.value" :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <el-form v-if="CmdAAAVal == 'INIT'" ref="form-aaa" :label-position="'right'"
                style="width: 70%; margin-top: 3%;">
                <el-form-item label="RemotePath">
                  <el-input v-model="aaaPara" style="width: 90%"/>&nbsp;
                  <el-icon v-bind:title="'Experimental file path in AAA IPC'">
                    <warning />
                  </el-icon>
                </el-form-item>
              </el-form>
              <div align="right" style="height: 5vh">
                <el-button @click="run('RESET', aaaData[0])">
                  <el-icon> <refresh /></el-icon>
                </el-button>
                <el-button @click="run(CmdAAAVal, aaaData[0])" :disabled="disabled"
                  style="margin-right:16%">
                  Run
                </el-button>
              </div>
            </el-tab-pane>

          </el-tabs>
        </div>
        <div class="sub_gap" id="sub_gap"
          style="display: flex; align-items: center; justify-content: center;">
        </div>
        <div class="sub4" id="sub4">
          <div>
            <a @click="func()">
              <div class="prev">|</div>
            </a>
          </div>
          <el-row style="margin-top: 2%; margin-bottom: -4%;">
            <el-col :span="14">
              <div align="left">
                <el-button class="btn"
                  @click="disp = true; flow = false; code = false; resFormatter = false">
                  <i class="iconfont icon-table icon-class"></i>
                </el-button>
                <el-button class="btn"
                  @click="disp = false; flow = true; code = false; resFormatter = false">
                  <i class="iconfont icon-flow-chart icon-class"></i>
                </el-button>
                <el-button class="btn"
                  @click="disp = false; flow = false; code = true; resFormatter = false">
                  <i class="iconfont icon-code icon-class"></i>
                </el-button>
                <el-button class="btn"
                  @click="disp = false; flow = false; code = false; resFormatter = true">
                  <i class="iconfont icon-transfer icon-class"></i>
                </el-button>
              </div>
            </el-col>
            <el-col :span="10">
              <div align="right" v-if="disp">
                Loop:
                <el-input-number v-model="loopNum" @change="handleLoopChange" :min="0"
                  :disabled="disabled" style="margin-right: 2%"/>
                <el-button plain @click="submit()" :disabled="disabled">
                  <el-icon><Upload/></el-icon>
                </el-button>
                <el-button plain @click="getUserData()" :disabled="disabled">
                  <el-icon><folder-opened /></el-icon>
                </el-button>
                <el-button plain @click="exportExcel()">
                  <el-icon><download /></el-icon>
                </el-button>
              </div>
              <div align="right" v-if="code"><el-link type="primary">API</el-link></div>
            </el-col>
          </el-row>
          <div class="data-box" v-if="code" align="left">
            <el-scrollbar style="height: 74vh">
              <json-viewer :value="userList" :expand-depth=3 copyable
                style="margin-top: 1%; margin-left: 2%; width: 95%"/>
            </el-scrollbar>
          </div>
          <div>
            <iframe title="flow" class="data-box" v-if="flow" src="/#/anim" style="width: 100%">
            </iframe>
          </div>
          <div v-if="resFormatter" class="data-box"
            style="background-color: aliceblue;" align="left">
            <el-select
              style="margin-top: 1%; margin-left: 2%; width: 30%;"
              v-model="valueInstr"
              placeholder="Select insru type & upload result file"
              size="large"
              :change="handleSelectChange()"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-upload
              v-if="valueInstr!==''"
              style="margin-top: 1%; margin-left: 2%;"
              ref="uploadRef"
              class="upload-demo"
              action="/#"
              :on-change="handleSuccess"
              :before-upload="handleBeforeUpload"
              :auto-upload="false"
            >
              <template #trigger >
                <el-button type="primary" @click="handleFileClick">select file</el-button>
              </template>
              <el-button plain @click="submitUpload" style="margin-left:2%">
                data formatter
              </el-button>
            </el-upload>
            <el-scrollbar style="height: 60vh;">
              <json-viewer :value="resJsonFomatterData" :expand-depth=3 copyable
                style="margin-top: 1%; margin-left: 2%; width: 95%"/>
            </el-scrollbar>
          </div>
          <VueDraggable
            target="tbody"
            v-model="userList"
            :animation="150"
            group="people"
            ghostClass="ghost"
            v-if="disp"
          >
            <el-table :data="userList" class="data-box" :disabled="disabled"
              style="background-color: aliceblue;">
              <el-table-column :width="'49px'">
                <template v-slot="scope">
                  <el-radio :label="scope.$index" @change="handleSelectionChange(scope)"
                    v-model="selected" :disabled="disabled">
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column label="Name" prop="Instrument" :width="'95px'"/>
              <el-table-column label="CMD" prop="Command" :width="'70px'" />
              <el-table-column label="Para" prop="Parameter" :width="'135px'">
                <template v-slot="scope">
                  <el-input type="textarea" :rows="3" v-model="scope.row['Parameter']"
                    :disabled="disabled"/>
                </template>
              </el-table-column>
              <el-table-column prop="RemotePath" label="RemotePath" :width="'110px'">
                <template v-slot="scope">
                  <el-input type="textarea" :rows="2" v-model="scope.row['RemotePath']"
                    :disabled="disabled">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="LocalPath" label="LocalPath" :width="'100px'">
                <template v-slot="scope">
                  <el-input type="textarea" :rows="2" v-model="scope.row['LocalPath']"
                    :disabled="disabled">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="Time" label="Time(s)">
                <template v-slot="scope">
                  <el-input type="textarea" :rows="1" v-model="scope.row['Time']"
                    :disabled="disabled">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="Parallel" label="Parallel" :width="'75px'">
                <template v-slot="scope">
                  <el-switch v-model="scope.row['Parallel']" :disabled="disabled"></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="Release" label="Release">
                <template v-slot="scope">
                  <el-switch v-model="scope.row['Release']" :disabled="disabled"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="Opt" v-slot="{ row, $index }" :width="'50px'">
                <div style="height: 10vh; display: flex; align-items: center">
                  <el-button
                    @click="deleteItem(row, $index)"
                    icon="el-icon-delete"
                    circle
                    :disabled="disabled"
                  >
                    <el-icon style="margin-left: -5px"><Delete /></el-icon>
                  </el-button>
                </div>
              </el-table-column>
              <el-table-column label="Status" v-slot="{ row, $index }">
                <div style="height: 10vh; margin-left: 3%; display: flex; align-items: center">
                  <div :class="setTableStatus(row, $index)"></div>
                </div>
              </el-table-column>
            </el-table>
            <div >
              <div align="right" style="margin-top: 1%">
                <el-switch v-model="mode" @change="handleSwitchChange" style="margin-right: 1%"
                  :disabled="disabled" v-bind:title="'Mode: ' + ccData.mode"/>
                <el-button @click="EMERGENCY()">EMERGENCY</el-button>
                <el-button @click="BOOT()">{{ actionBtn }}</el-button>
              </div>
            </div>
          </VueDraggable>
        </div>
    </div>

    <div class="content" v-if="!chart"
      style="border-radius: 20px; height: 89vh; width: 80%; margin-top: 2vh;">
      <div
        id="maxname"
        :style="{
          width: '96%',
          height: '60%',
          marginTop: '1%',
          marginLeft: '2%',
          marginRight: '2%',
        }"
      >
        <div class="box_container">
          <div class="up_container">
            <div style="margin-left: 20px; margin-top: 20px">
              <el-badge :value="runningProjectNum" class="item">
                <el-button type="info"
                  round>Running Project List
                  <i class="el-icon-notebook-2"></i>
                </el-button>
              </el-badge>
            </div>
            <div style="position: absolute; margin-left: 2%; margin-top: 2%;">
            </div>
            <div :class="BoxGC" style="margin-bottom:0px" ref="refGC">
              <el-button
                circle
                class="el-icon-place loc_btn"
                @click="simLoc('GC')"
              ></el-button>
              GC
            </div>
            <div :class="BoxHamilton" id="Hamilton" ref="refHamilton">
              <el-button
                circle
                class="el-icon-place loc_btn"
                @click="simLoc('Hamilton')"
              ></el-button>
              Hamilton
            </div>
            <div :class="BoxCytation1" id="Cytation1" ref="refCytation1">
              <el-button
                circle
                class="el-icon-place loc_btn"
                @click="simLoc('Cytation1')"
              ></el-button>
              Cytation1
            </div>
            <div :class="BoxThermo" id="LC" ref="refLC">
              <el-button
                circle
                class="el-icon-place loc_btn"
                @click="simLoc('LC')"
              ></el-button>
              LC
            </div>
          </div>
          </div>

        <div class="rail">
          <div id="Robot1" :class="BoxRobot1">
            <!-- <a @click="isShowRemote(`http://${ip.Robot1}${port}`)"> -->
              Robot1
              <!-- <i class="el-icon-s-platform"></i>
            </a> -->
          </div>
        </div>

        <div class="box_container">
          <div :class="BoxUnchained" id="Unchained" ref="refUnchained">
            <el-button
              circle
              class="el-icon-place loc_btn"
              @click="simLoc('Unchained')"
            ></el-button>
            Unchained
          </div>
          <div :class="BoxDiscover" id="Discover" ref="refDiscover">
            <el-button
              circle
              class="el-icon-place loc_btn"
              @click="simLoc('Discover')"
            ></el-button>
            Discover
          </div>
          <div :class="BoxPT" id="PT" ref="refPT">
            <el-button
              circle
              class="el-icon-place loc_btn"
              @click="simLoc('PT')"
            ></el-button>
            PT
          </div>
          <div :class="BoxEC" id="EC" ref="refEC">
            <el-button
              circle
              class="el-icon-place loc_btn"
              @click="simLoc('EC')"
            ></el-button>
            EC
          </div>
          <div :class="BoxPurifier" id="Purifier" ref="refPurifier">
            <el-button
              circle
              class="el-icon-place loc_btn"
              @click="simLoc('Purifier')"
            ></el-button>
            Purifier
          </div>
          <div :class="BoxNMR" id="NMR" ref="refNMR">
            <el-button
              circle
              class="el-icon-place loc_btn"
              @click="simLoc('NMR')"
            ></el-button>
            NMR
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang='ts' setup>
import {
  SwitchButton, CircleClose,
} from '@element-plus/icons-vue';
import type { UploadInstance } from 'element-plus';
import {
  ElMessage, ElMessageBox,
} from 'element-plus';
import unchained from '@/assets/img/unchained.png';
import robot1 from '@/assets/img/robot1.png';
import cytation1 from '@/assets/img/cytation1.png';
import thermo from '@/assets/img/thermo.png';
import hamilton from '@/assets/img/hamilton.png';
import discover from '@/assets/img/discover.png';
import gc from '@/assets/img/gc.png';
import a from '@/assets/img/AAA.png';
import 'element-plus/theme-chalk/index.css';
import axios from 'axios';
import {
  getCurrentInstance, onMounted, ref, watch, reactive,
} from 'vue';
import { VueDraggable } from 'vue-draggable-plus';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';
// import _ from 'lodash';
import conf from './Utils/config';

const worker = new Worker(new URL('./Utils/worker.js', import.meta.url));

const valueTakeControl = ref(false);
const runningProjectNum = ref(0);

const disp = ref(true);
const flow = ref(false);
const code = ref(false);
const resFormatter = ref(false);

const chart = ref(true);

const valueInstr = ref('');
const options = [
  {
    value: 'Thermo',
    label: 'Thermo',
  },
  {
    value: 'GC',
    label: 'GC',
  },
  {
    value: 'Cytation1',
    label: 'Cytation1',
  },
];
// const fileList = ref<UploadUserFile[]>([]);

const dialogHelpVisible = ref(false);
const userDataLoading = ref(false);
const dialogTableVisible = ref(false);
const userData = ref<any>([]);
const total = ref(0);
const pagesize = ref(10);
const currentpage = ref(1);
const nowRow = ref(0);

const currentInstance = ref();
const activeName = ref('eighth');
const userList = ref<any>([]);

const filterGap = ref('20px');
const tableHeight = ref('550px');
const collapseTop = ref('-40px');
const coverTop = ref('-40px');

const form = reactive({
  name: '',
  type: '',
  dateFrom1: '',
  dateFrom2: '',
  dateTo1: '',
  dateTo2: '',
  delivery: false,
  star: [],
  resource: '',
  desc: '',
});

const memUserData = ref([]);

const owner = localStorage.getItem('username');

async function loadMemUserData() {
  await axios.post(`${conf.url}/get-projects`, { 'owner': owner }).then((res) => {
    memUserData.value = res.data.data;
  });
}

function dealCondition(_form: any) {
  userData.value = JSON.parse(JSON.stringify(memUserData.value));
  // name condition
  if (_form.name !== '' && userData.value.length !== 0) {
    for (let i = userData.value.length - 1; i >= 0; i -= 1) {
      if (userData.value[i].order_name.includes(_form.name) === false) {
        userData.value.splice(i, 1);
      }
    }
  }
  // star condition
  if (_form.star.length !== 0 && userData.value.length !== 0) {
    for (let i = userData.value.length - 1; i >= 0; i -= 1) {
      if (userData.value[i].mark !== 1) {
        userData.value.splice(i, 1);
      }
    }
  }
  // type condition
  if (_form.type !== '' && userData.value.length !== 0) {
    for (let i = userData.value.length - 1; i >= 0; i -= 1) {
      if (userData.value[i].type !== _form.type) {
        userData.value.splice(i, 1);
      }
    }
  }
  // datetime condition
  if (userData.value.length !== 0
    && ((_form.dateFrom1 !== '' && _form.dateFrom2 !== '')
      || (_form.dateTo1 !== '' && _form.dateTo2 !== ''))) {
    const f = Date.parse(`${_form.dateFrom1} ${_form.dateFrom2}`);
    const t = Date.parse(`${_form.dateTo1} ${_form.dateTo2}`);
    for (let i = userData.value.length - 1; i >= 0; i -= 1) {
      if (Date.parse(userData.value[i].create_time) < f
        || Date.parse(userData.value[i].create_time) > t) {
        userData.value.splice(i, 1);
      }
    }
  }
  total.value = userData.value.length;
}

const conditionSet = ref(false);

watch(form, (newVal) => {
  conditionSet.value = true;
  loadMemUserData();
  dealCondition(newVal);
});

const activaNameCollapse = ref([]);
function handleChangeCollapse() {
  if (activaNameCollapse.value.length === 0) {
    collapseTop.value = '-40px';
    filterGap.value = '20px';
    tableHeight.value = '550px';
    coverTop.value = '-40px';
  } else {
    collapseTop.value = '-200px';
    filterGap.value = '180px';
    tableHeight.value = '390px';
    coverTop.value = '-200px';
  }
}

const CmdAAA = [{
  value: 'START',
  label: 'START',
},
{
  value: 'INIT',
  label: 'INIT',
}];

const CmdAAAVal = ref(CmdAAA[0].value);
const aaaPara = ref('AAA');

const aaaData = ref([
  {
    Instrument: 'AAA',
    Command: CmdAAAVal,
    Parameter: JSON.stringify(aaaPara.value),
    RemotePath: '',
    LocalPath: '',
    Time: 20,
    Parallel: false,
    Release: false,
    Status: null,
  },
]);

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
  if (item.Instrument === 'AAA') {
    activeName.value = 'eighth';
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

async function getUserData() {
  dialogTableVisible.value = true;
  userDataLoading.value = true;
  await loadMemUserData();
  if (conditionSet.value === false) {
    userData.value = JSON.parse(JSON.stringify(memUserData.value));
    total.value = userData.value.length;
  }
  userDataLoading.value = false;
}

function currentChange(currentPage: number) {
  currentpage.value = currentPage;
}

function handleData(_val: any) {
  axios.post(`${conf.url}/get-cc-chart`, { id: _val.id }).then((res: any) => {
    userList.value = res.data.data;
    for (let index = 0; index < res.data.data.length; index += 1) {
      (userList.value[index] as any).Instrument = res.data.data[index].instrument;
      delete (userList.value[index] as any).instrument;
      (userList.value[index] as any).Command = res.data.data[index].command;
      delete (userList.value[index] as any).command;
      (userList.value[index] as any).Parameter = res.data.data[index].parameter;
      delete (userList.value[index] as any).parameter;
      (userList.value[index] as any).RemotePath = res.data.data[index].remote_path;
      delete (userList.value[index] as any).remote_path;
      (userList.value[index] as any).LocalPath = res.data.data[index].local_path;
      delete (userList.value[index] as any).local_path;
      (userList.value[index] as any).Time = res.data.data[index].time_allowed;
      delete (userList.value[index] as any).time_allowed;
      (userList.value[index] as any).Parallel = !!res.data.data[index].parallel;
      delete (userList.value[index] as any).parallel;
      (userList.value[index] as any).Release = !!res.data.data[index].release;
      delete (userList.value[index] as any).release;
      (userList.value[index] as any).Status = res.data.data[index].status;
      delete (userList.value[index] as any).status;
      delete (userList.value[index] as any).pointer;
      delete (userList.value[index] as any).locked;
      delete (userList.value[index] as any).id;
      delete (userList.value[index] as any).project_id;
      delete (userList.value[index] as any).local_id;
    }
  });
  // axios.post(`${url}/get-cc-chart`, { id: _val.id }).then((res: any) => {
  //   console.log('get ccdata: ', res.data);
  // });
}

function loadAll(_val: any) {
  worker.postMessage({ sig: 'project', data: _val.id });
  nowRow.value = _val;
  if (nowRow.value == null) {
    dialogTableVisible.value = false;
  } else {
    handleData(nowRow.value);
    dialogTableVisible.value = false;
  }
}

function chooseStar(_val:any) {
  if (_val.mark === 1) {
    return 1;
  }
  return 0;
}
const memoStar = ref(0);

async function changeStar(_val:any) {
  await userData.value.forEach((row) => {
    if (row.id === _val.id) {
      if (memoStar.value === 0) {
        worker.postMessage(
          {
            sig: 'mark',
            data: { id: row.id, mark: 1 },
          },
        );
      }
      if (memoStar.value === 1) {
        worker.postMessage(
          {
            sig: 'mark',
            data: { id: row.id, mark: 0 },
          },
        );
      }
      switch (memoStar.value) {
        case 0:
          memoStar.value = 1;
          break;
        case 1:
          memoStar.value = 0;
          break;
        default:
          break;
      }
    }
  });
  await loadMemUserData();
}

function hoverStar(_row: any) {
  let i = 0;
  userData.value.forEach((row) => {
    if (row.id === _row.id) {
      memoStar.value = row.mark;
      if (row.mark === null) {
        memoStar.value = 0;
      }
      userData.value[i].mark = 1;
    }
    i += 1;
  });
}

function focusStar() {
  currentInstance.value = getCurrentInstance();
}

function leaveStar(_row: any) {
  let i = 0;
  userData.value.forEach((row) => {
    if (row.id === _row.id) {
      userData.value[i].mark = memoStar.value;
    }
    i += 1;
  });
}

function blurStar() {
  currentInstance.value = getCurrentInstance();
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
    'owner': localStorage.getItem('username'),
    'parent_id': 0,
    'input': '',
  };
  axios
    .post(`${conf.url}/submit-project`, sendData)
    .then((res) => {
      if (res.status === 200) {
        worker.postMessage({ sig: 'project', data: res.data.last_id });
        axios.post(`${conf.url}/get-cc-chart`, { id: res.data.last_id }).then((re: any) => {
          console.log('get ccdata: ', re.data);
        });
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

// local_id selected
const selected = ref(-1);
const mode = ref(false);
const disabled = ref(false);

const ccData = {
  project_id: 0,
  local_id: 0,
  action: 'stop',
  mode: 'single',
  loop: 0,
};

function run(_cmd: string, _para: any) {
  const tmp = {
    'user': 'dell',
    'Instrument': _para.Instrument,
    'CMD': _cmd,
    'Para': _para.Parameter,
    'RemotePath': _para.RemotePath,
    'LocalPath': _para.LocalPath,
    'TimeAllowed': _para.Time,
    'Parallel': _para.Parallel,
    'Release': _para.Release,
  };
  if (valueTakeControl.value) {
    worker.postMessage({ sig: 'command', data: tmp });
  }
  // axios
  //   .post(`${url}/cmd`, tmp)
  //   .then((res) => {
  //     console.log(res);
  //   });
}

function EMERGENCY() {
  const tmp = {
    'user': 'dell',
    'Instrument': userList.value[selected.value].Instrument,
    'CMD': 'Emergency',
    'Para': '',
    'RemotePath': '',
    'LocalPath': '',
    'TimeAllowed': 0,
    'Parallel': false,
    'Release': false,
  };
  if (valueTakeControl.value) {
    worker.postMessage({ sig: 'command', data: tmp });
    ElMessageBox({
      title: 'Emergency',
      // message: '?',
      confirmButtonText: 'Resume',
      cancelButtonText: 'Break',
      showCancelButton: true,
      closeOnClickModal: false,
      type: 'warning',
    }).then(() => {
      tmp.CMD = 'Resume';
      worker.postMessage({ sig: 'command', data: tmp });
      ElMessage.success('Resume!');
    }).catch(() => {
      tmp.CMD = 'Break';
      worker.postMessage({ sig: 'command', data: tmp });
      ElMessage.info('Break!');
      ccData.action = 'stop';
      worker.postMessage({ sig: 'boot', data: ccData });
    });
  }
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

// single or continous mode
function handleSwitchChange() {
  ccData.mode = mode.value ? 'continous' : 'single';
}

const loopNum = ref(0);

function handleLoopChange() {
  ccData.loop = loopNum.value;
}

function handleSelectionChange(_row: any) {
  selected.value = _row.$index;
  worker.postMessage({ sig: 'local-id-changer', data: _row.$index });
}

const projId = ref(null);
const runningStatus = ref(false);
const actionBtn = ref('START');

function BOOT() {
  if (actionBtn.value === 'STOP') {
    ccData.action = 'stop';
  } else {
    ccData.action = 'start';
  }
  if (valueTakeControl.value) {
    worker.postMessage({ sig: 'boot', data: ccData }); // { ccData: ccData.value });
  }
}

const ClassAAA = ref('box');
const ClassUnchained = ref('box');
const ClassRobot1 = ref('box');
const ClassHamilton = ref('box');
const ClassCytation1 = ref('box');
const ClassDiscover = ref('box');
const ClassGC = ref('box');
const ClassThermo = ref('box');

const BoxGC = ref('box_idle');
const BoxHamilton = ref('box_idle');
const BoxCytation1 = ref('box_idle');
const BoxUnchained = ref('box_idle');
const BoxRobot1 = ref('robot1');
const BoxDiscover = ref('box_idle');
const BoxThermo = ref('box_idle');
const BoxPT = ref('box_idle');
const BoxEC = ref('box_idle');
const BoxPurifier = ref('box_idle');
const BoxNMR = ref('box_idle');

function changeClass(inst: string, sta: string) {
  if (sta === '') {
    switch (inst) {
      case 'Unchained': BoxUnchained.value = 'box_idle'; break;
      case 'Robot1': BoxRobot1.value = 'robot1'; break;
      case 'Hamilton': BoxHamilton.value = 'box_idle'; break;
      case 'Cytation1': BoxCytation1.value = 'box_idle'; break;
      case 'Discover': BoxDiscover.value = 'box_idle'; break;
      case 'GC': BoxGC.value = 'box_idle'; break;
      case 'Thermo': BoxThermo.value = 'box_idle'; break;
      case 'EC': BoxEC.value = 'box_idle'; break;
      case 'PT': BoxPT.value = 'box_idle'; break;
      case 'Purifier': BoxPurifier.value = 'box_idle'; break;
      case 'NMR': BoxNMR.value = 'box_idle'; break;
      default: break;
    }
  } else {
    switch (inst) {
      case 'AAA':
        ClassAAA.value = `box ${sta}`;
        break;
      case 'Unchained':
        ClassUnchained.value = `box ${sta}`;
        BoxUnchained.value = `box_${sta}`;
        break;
      case 'Robot1':
        ClassRobot1.value = `box ${sta}`;
        BoxRobot1.value = `robot1_${sta}`;
        break;
      case 'Hamilton':
        ClassHamilton.value = `box ${sta}`;
        break;
      case 'Cytation1':
        ClassCytation1.value = `box ${sta}`;
        BoxCytation1.value = `box_${sta}`;
        break;
      case 'Discover':
        ClassDiscover.value = `box ${sta}`;
        BoxDiscover.value = `box_${sta}`;
        break;
      case 'GC':
        ClassGC.value = `box ${sta}`;
        BoxGC.value = `box_${sta}`;
        break;
      case 'Thermo':
        ClassThermo.value = `box ${sta}`;
        BoxThermo.value = `box_${sta}`;
        break;
      default:
        break;
    }
  }
}

const refGC = ref();
const refHamilton = ref();
const refCytation1 = ref();
const refUnchained = ref();
const refDiscover = ref();
const refLC = ref();
const refPT = ref();
const refEC = ref();
const refPurifier = ref();
const refNMR = ref();

// deal with robot1 position display
function setRobot1Position(_pos: number) {
  if (refGC.value) {
    const map = {
      'Unchained': refUnchained.value.getBoundingClientRect().x,
      'Discover': refDiscover.value.getBoundingClientRect().x,
      'PT': refPT.value.getBoundingClientRect().x,
      'EC': refEC.value.getBoundingClientRect().x,
      'Purifier': refPurifier.value.getBoundingClientRect().x,
      'NMR': refNMR.value.getBoundingClientRect().x,
      'GC': refGC.value.getBoundingClientRect().x,
      'Hamilton': refHamilton.value.getBoundingClientRect().x,
      'Cytation1': refCytation1.value.getBoundingClientRect().x,
      'Thermo': refLC.value.getBoundingClientRect().x,
    };
    const motorMap = {
      'Unchained': -1792000,
      'Hamilton': -1518000,
      'Discover': -1442000,
      'GC': -1325000,
      'PT': -1122000,
      'EC': -792000,
      'Purifier': -422000,
      'Cytation1': -342000,
      'NMR': -80000,
      'Thermo': -80000,
    };
    let cur = 151;
    let mapArr: number[] = [];
    let motorArr: number[] = [];
    if (motorMap.Unchained <= _pos && _pos < motorMap.Hamilton) {
      mapArr = [map.Unchained, map.Hamilton];
      motorArr = [motorMap.Unchained, motorMap.Hamilton];
    }
    if (motorMap.Hamilton <= _pos && _pos < motorMap.Discover) {
      mapArr = [map.Hamilton, map.Discover];
      motorArr = [motorMap.Hamilton, motorMap.Discover];
    }
    if (motorMap.Discover <= _pos && _pos < motorMap.GC) {
      mapArr = [map.Discover, map.GC];
      motorArr = [motorMap.Discover, motorMap.GC];
    }
    if (motorMap.GC <= _pos && _pos < motorMap.PT) {
      mapArr = [map.GC, map.PT];
      motorArr = [motorMap.GC, motorMap.PT];
    }
    if (motorMap.PT <= _pos && _pos < motorMap.EC) {
      mapArr = [map.PT, map.EC];
      motorArr = [motorMap.PT, motorMap.EC];
    }
    if (motorMap.EC <= _pos && _pos < motorMap.Purifier) {
      mapArr = [map.EC, map.Purifier];
      motorArr = [motorMap.EC, motorMap.Purifier];
    }
    if (motorMap.Purifier <= _pos && _pos < motorMap.Cytation1) {
      mapArr = [map.Purifier, map.Cytation1];
      motorArr = [motorMap.Purifier, motorMap.Cytation1];
    }
    if (motorMap.Cytation1 <= _pos && _pos <= motorMap.NMR) {
      mapArr = [map.Cytation1, map.NMR];
      motorArr = [motorMap.Cytation1, motorMap.NMR];
    }
    const divide = (_pos - motorArr[0]) / (motorArr[1] - motorArr[0]);
    const b = mapArr[1] - mapArr[0];
    cur = divide * b + mapArr[0] - (window.innerWidth / 15) * (window.innerWidth / 2560);
    document.documentElement.style.setProperty('--position', `${cur}px`);
  }
}

function simLoc(inst: string) {
  console.log('clicked', inst);
}

const instrStatus = ref<any>({
  AAA: '',
  Unchained: '',
  Robot1: '',
  Hamilton: '',
  Cytation1: '',
  Discover: '',
  GC: '',
  Thermo: '',
});

function conbineStatus(inst: string, sta: string) {
  instrStatus.value[inst] = sta;
}

function setTableStatus(_row: any, _index: any) {
  if (_index === selected.value && instrStatus.value[_row.Instrument] === 'Running') {
    return 'loader-running';
  }
  if (_index === selected.value && instrStatus.value[_row.Instrument] === 'Error') {
    return 'loader-error';
  }
}

// initial nodes and edges
function constructor() {
  const nodes = [];
  const edges = [];
  for (let index = 0; index < userList.value.length; index += 1) {
    const element = userList.value[index];
    if ((element as any).Instrument !== 'Robot1' && index !== userList.value.length) {
      nodes.push({
        id: String(index),
        position: { x: 0, y: 0 },
        type: 'process',
        data: element,
        origin: index,
      });
      edges.push({
        id: `e${index}-${index + 1}`,
        source: String(index),
        target: String(index + 1),
        type: 'animation',
        animated: true,
      });
    }
    if ((element as any).Instrument === 'Robot1'
      && (userList.value[index + 1] as any).Instrument === 'Robot1') {
      edges.push({
        id: `e${index - 1}-${index + 2}`,
        source: String(index - 1),
        target: String(index + 2),
        type: 'animation',
        animated: true,
        data: element,
        origin: index,
      });
    }
    if ((element as any).Instrument === 'Robot1'
      && (userList.value[index - 1] as any).Instrument === 'Robot1') {
      edges.push({
        id: `e${index - 2}-${index + 1}`,
        source: String(index - 2),
        target: String(index + 1),
        type: 'animation',
        animated: true,
        data: element,
        origin: index,
      });
    }
  }
  localStorage.setItem('nodes', JSON.stringify(nodes));
  localStorage.setItem('edges', JSON.stringify(edges));
}

const router = useRouter();

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  router.push({ name: 'login' });
}

const uploadRef = ref<UploadInstance>();
const formData = new FormData();

function handleFileClick() {
  console.log('...', uploadRef.value);
}

function setInstrName() {
  if (formData.get('data') !== null) {
    formData.set('data', `{"instrument":"${valueInstr.value}"}`);
  } else {
    formData.append('data', `{"instrument":"${valueInstr.value}"}`);
  }
}

function dataURLToBlob(dataURL) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const resJsonFomatterData = ref({});
function handleSuccess(file, fileList) {
  if (fileList.length > 1) {
    fileList.splice(0, 1);
  }
  const reader = new FileReader();
  reader.readAsDataURL(file.raw);
  reader.onload = (e) => {
    const blob = dataURLToBlob(e.target.result);
    formData.append('file', blob, file.name);
    setInstrName();
  };
}

function handleBeforeUpload(file, fileList) {
  fileList.pop();
}

function submitUpload() {
  resJsonFomatterData.value = {};
  axios.post(`${conf.url}/res-formatter`, formData).then((res) => {
    resJsonFomatterData.value = res.data;
  });
}

function handleSelectChange() {
  setInstrName();
}

onMounted(() => {
  if (userList.value.length === 0) {
    document.documentElement.style.setProperty('--table-body', '100px');
  }
  currentInstance.value = getCurrentInstance();
  // post user info to worker
  worker.postMessage(
    {
      sig: 'info',
      data: {
        username: localStorage.getItem('username'),
        token: localStorage.getItem('token'),
      },
    },
  );
  // if userlist changed post message
  localStorage.setItem('nodes', JSON.stringify([]));
  localStorage.setItem('edges', JSON.stringify([]));
  let tmpUserList = userList.value;
  setInterval(() => {
    // tmpUserList = [];
    if (userList.value !== tmpUserList) {
      constructor();
    }
    tmpUserList = userList.value;
  }, 2000);
  worker.onmessage = (event) => {
    // module class
    if (event.data.sig === 'status' && event.data.data.sta && event.data.data.sta.length !== 0) {
      localStorage.setItem('status', JSON.stringify(event.data.data));
      event.data.data.sta.forEach((arr: Array<string>) => {
        conbineStatus(arr[0], arr[1]);
        if (arr[1] === 'Running' || arr[1] === 'Error' || arr[1] === 'Ready') {
          changeClass(arr[0], arr[1]);
        } else {
          changeClass(arr[0], '');
        }
        // to anim
        if (selected.value !== -1 && userList.value[selected.value].Instrument === arr[0]) {
          localStorage.setItem('localId', JSON.stringify({
            id: selected.value,
            instrument: userList.value[selected.value].Instrument,
            status: arr[1],
          }));
        }
        // last instrument finished, send ready
        if (selected.value === -1 && userList.value.length > 0) {
          localStorage.setItem('localId', JSON.stringify({
            id: userList.value.length,
            instrument: userList.value[userList.value.length - 1].Instrument,
            status: 'Ready',
          }));
        }
      });
    }
    // !!! get current project running status and loop
    runningStatus.value = false;
    if (event.data.sig === 'running-status') {
      if (event.data.data === null) {
        actionBtn.value = 'START';
        disabled.value = false;
      } else {
        actionBtn.value = 'STOP';
        disabled.value = true;
        loopNum.value = event.data.data.loop;
      }
    }
    // current local id
    if (event.data.sig === 'localId') {
      ccData.local_id = Number(event.data.data);
      selected.value = event.data.data - 1;
    }
    if (event.data.sig === 'project') {
      // load, first send a action of 'stop'
      ccData.action = 'stop';
      ccData.mode = mode.value ? 'continous' : 'single';
      ccData.project_id = event.data.data;
      worker.postMessage({ sig: 'boot', data: ccData });
      projId.value = event.data.data;
    }
    if (event.data.sig === 'position') {
      setRobot1Position(event.data.data);
    }
  };
});

const toggleVal = ref(false);

function func() {
  if (toggleVal.value) {
    toggleVal.value = false;
    document.getElementById('sub4').style.animation = 'shrink 0.5s';
    document.getElementById('sub4').style.animationFillMode = 'forwards';
    document.getElementById('sub3').style.display = '';
    document.documentElement.style.setProperty('--toggle-width', '3.5%');
    document.documentElement.style.setProperty('--toggle-left', '-4%');
  } else {
    document.getElementById('sub4').style.animation = 'expand 0.5s';
    document.getElementById('sub4').style.animationFillMode = 'forwards';
    document.getElementById('sub3').style.display = 'none';
    document.documentElement.style.setProperty('--toggle-width', '2.3%');
    document.documentElement.style.setProperty('--toggle-left', '-2.5%');
    toggleVal.value = true;
  }
}

function chartDisp() {
  chart.value = !chart.value;
}

</script>

<style>
@import url(../assets/font_nfoc9cg8dl/iconfont.css);
.el-collapse {
  border: none;
  margin: 0;
  padding: 0;
}
.el-collapse .el-collapse-item__header {
  border: none;
  padding-left: 10px;
}
.el-collapse .el-collapse-item__wrap {
  border: none;
  padding: 0;
}

.container {
  background-image: linear-gradient(to left bottom, #002976, #0059a3, #0089c8, #00bbe6, #66ecff);
  margin-top: -2%;
  margin-left:-1%;
  margin-bottom: -10%;
  height: 103.3vh;
  width: 101.3%;
}

@keyframes shrink {
  from {
    width: 75%;
    margin-left: 2%;
  }
  to {
    width: 49%;
    margin-left: 28%;
  }
}
@keyframes expand {
  from {
    width: 49%;
    margin-left: 28%;
  }
  to {
    width: 75%;
    margin-left: 2%;
  }
}

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
  margin-left: 1.5%;
  box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
}

.content .sub1 {
  width: 3%;
}

/* .content .sub2 {
  width: 80%;
} */

.content .sub3 {
  margin-left: -0.5%;
  width: 30%;
}
.content .sub_gap {
  width: 3%;
}

.content .sub4 {
  position: absolute;
  width: 49%;
  margin-left: 28%;
  /* background-color: white; */
  /* opacity: 1; */
}

.content .shrink{
  animation: expand 2s linear;
}

.hide-tabs-header .el-tabs__header {
  display: none;
}

.star-icon{
  margin-top: 8%;
  font-size: 20px;
  opacity: var(--star-opacity);
}

.star-icon:hover{
  cursor: pointer;
  --star-opacity: 1;
}

.filter-div{
  margin-bottom: 20px;
  margin-right: 10px;
}

.filter-div:hover{
  cursor: pointer;
}

:root {
  --scale: 1;
  --gap-bottom: 4%;
  --toggle-left: -4%;
  --toggle-width: 3.5%;
  --table-body: 100px;
  --star-opacity: 1;
}

.box {
  /* border: 1px solid; */
  width: 84px;
  height: 100px;
  margin-left: 0%;
  border: solid 1px #ccc;
  border-radius: 8px;
  margin-right: 20px;
  /* margin-bottom: 10px; */
  margin-top: 5px;
  box-shadow: 2px 2px 8px #888888;
  background-color: #b0cae2;
  scale: var(--scale);
  margin-bottom: var(--gap-bottom);
}

.box:hover{
  transform: scale(1.06);
  transition: 0.5s;
}
@keyframes blink-green {
  0% {
    background-color: #e7f3dd;
  }
  50% {
    background-color: #85d345;
  }
  100% {
    background-color: #e7f3dd;
  }
}

.Running{
  animation: blink-green 1.2s infinite;
}

.Error{
  background-color: #fa7959;
}

@keyframes animloader38-1 {
  0% {
    transform:translateX(-100%) scale(0);
  }
  50% {
      transform:translateX(0%) scale(1);
  }
  100% {
      transform:translateX(100%) scale(0);
  }
}

.loader-running {
  position: relative;
  width: 18px;
  height: 18px;
}

.loader-running::before, .loader-running::after {
  content:'';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 70%;
  border-radius: 50%;
  background-color: #85d345;
  transform:scale(0);
  animation:animloader38-1 0.8s infinite ease-in-out;
}

.loader-running::after {
  animation-delay:0.4s;
}

.loader-error {
  position: relative;
  width: 18px;
  height: 18px;
}

.loader-error::before, .loader-error::after {
  content:'';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 70%;
  border-radius: 50%;
  background-color: #fa7959;
  transform:scale(0);
  animation:animloader38-1 0.8s infinite ease-in-out;
}

.loader-error::after {
  animation-delay:0.4s;
}

.para-box{
  margin-top: 4%;
  margin-left: 1.2%;
  height: 52vh;
  width: 96%;
  /* border: 1px solid; */
  border: solid 1px #ccc;
  border-radius: 10px;
  background-color: aliceblue;
  box-shadow: 1px 1px 6px #888888;
}

.data-box{
  border: solid 1px #ccc; border-radius: 10px; margin-top: 5%;
  height: 74vh;
  box-shadow: 1px 1px 6px #888888;
}

.data-box .el-table__body {
  height: var(--table-body); /* height */
  overflow-y: auto;
}

.box .title{
  font-size: 14px; font-weight: 600;
}

.btn{
  border-radius: 8px;
  width: 10%;
  box-shadow: 1px 1px 5px #888888;
  margin-left:0%;
}

.btn-toggle{
  width: 2%;
  height:10%;
  border-radius: 60px;
  position: absolute; margin-top: 38vh;margin-left: var(--toggle-left);
}

.prev{
  /* margin-left: 73%;
  margin-top: 100%; */
  width: var(--toggle-width);
  height:15%;
  font-size: 38px;
  color:#657c99;
  border-radius: 35px;
  position: absolute;
  margin-top: 34vh;margin-left: var(--toggle-left);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.prev:hover{
  background: #ffffff;
  box-shadow:  0px 2px 5px #e3e7f1,
             -2px -2px 5px #e3e7f1;
  transition: 0.3s;
  cursor: pointer;
}
.prev:not(:hover){
  transition: 0.3s;
}
.prev:active{
  transform: scale(0.96);
}

.icon-class{
  margin-left: -1.2%;
  font-size:x-large;
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

/* layout */
:root {
  --position: 151px;
  /* --position: 151px; */
}

.loc_btn {
  background-color: transparent;
  border: 0px solid;
}

.robot1 {
  left: var(--position);
  border-radius: 15px 15px;
  background: rgb(212, 214, 216);
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 130px;
  font-size: 20px;
  margin: 20px;
  margin-top: -30px;
  margin-left: -150px;
  border: 15px solid rgb(74, 82, 88);
  position: absolute;
  transition: left 5s;
}

.robot1_Ready {
  /* animation: colorChange 1s infinite; */
  left: var(--position);
  border-radius: 15px 15px;
  background: rgb(85, 207, 115);
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 130px;
  font-size: 20px;
  margin: 20px;
  margin-top: -30px;
  margin-left: -150px;
  border: 15px solid rgb(74, 82, 88);
  position: absolute;
  transition: left 5s;
}

.robot1_Running {
  animation: colorChange 1s infinite;
  left: var(--position);
  border-radius: 15px 15px;
  background: rgb(85, 207, 115);
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 130px;
  font-size: 20px;
  margin: 20px;
  margin-top: -30px;
  margin-left: -150px;
  border: 15px solid rgb(74, 82, 88);
  position: absolute;
  transition: left 5s;
}

.robot1_Error {
  /* animation: colorChange 1s infinite; */
  left: var(--position);
  border-radius: 15px 15px;
  background: rgb(216, 58, 58);
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 130px;
  font-size: 20px;
  margin: 20px;
  margin-top: -30px;
  margin-left: -150px;
  border: 15px solid rgb(74, 82, 88);
  position: absolute;
  transition: left 5s;
}

.box {
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #cecece;
  width: 80px;
  height: 100px;
  margin: 10 auto;
}

.box_blk {
  border-radius: 15px 15px;
  background: #ffffff;
  width: 180px;
  height: 300px;
  text-align: center;
  line-height: 300px;
  margin: 0px;
  border: 0px solid rgb(255, 255, 255);
}

.up_container{
  height:305px;
  width: 100%;
  position:relative;
  /* margin-bottom: 0; */
  display: flex;
  justify-content: space-between;
  /* background-color: rgb(255, 255, 255); */
  /* flex-direction: row; */
  text-align: bottom;
  /* justify-content: flex-end; */
}

.box_Ready {
  border-radius: 15px 15px;
  background: rgb(85, 207, 115);
  width: 180px;
  height: 240px;
  text-align: center;
  line-height: 240px;
  font-size: 20px;
  margin: 20px;
  border: 15px solid rgb(74, 82, 88);
}

.box_idle {
  border-radius: 15px 15px;
  background: rgb(203, 204, 203);
  width: 180px;
  height: 240px;
  text-align: center;
  line-height: 240px;
  font-size: 20px;
  margin: 20px;
  border: 15px solid rgb(74, 82, 88);
}

@keyframes colorChange {
  0% {
    background-color: rgb(192, 209, 196);
  }

  50% {
    background-color: rgb(85, 207, 115);
  }

  100% {
    background-color: rgb(192, 209, 196);
  }
}

.box_Running {
  animation: colorChange 1s infinite;
  border-radius: 15px 15px;
  background: rgb(85, 207, 115);
  width: 180px;
  height: 240px;
  text-align: center;
  line-height: 240px;
  font-size: 20px;
  margin: 20px;
  border: 15px solid rgb(74, 82, 88);
}

.box_Error {
  border-radius: 15px 15px;
  background: rgb(236, 84, 64);
  width: 180px;
  height: 240px;
  text-align: center;
  line-height: 240px;
  font-size: 20px;
  margin: 20px;
  border: 15px solid rgb(74, 82, 88);
}

:root {
  --bg-color: #ffffff;
}

.box_container {
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin: 0px;
  padding: 0px;
  /* width: 1900px; */
  border: 0px solid #ffffff;
  text-align: center;
  position: relative;

  /* height: 50%; */
}

.rail {
  border: 15px solid rgb(74, 82, 88);
  border-radius: 10px 10px;
  background-color: #6db7f8;
  clear: both;
  text-align: center;
  height: 120px;
  line-height: 120px;
  position: relative;
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
