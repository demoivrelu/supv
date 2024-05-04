<script setup lan='ts'>
import {
  nextTick, ref, onMounted,
} from 'vue';
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import IconIcon from './IconIcon.vue';
import ProcessNode from './ProcessNode.vue';
import AnimationEdge from './AnimationEdge.vue';

import { initialEdges, initialNodes } from './initial-elements';
import { useRunProcess } from './useRunProcess';
import { useShuffle } from './useShuffle';
import { useLayout } from './useLayout';

const edgeID = ref('e1-2');
const nodeID = ref(0);
const anim = ref(null);
const proc = ref(null);

const nodes = ref(initialNodes);
const edges = ref(initialEdges);
const cancelOnError = ref(true);
const shuffle = useShuffle();
const { graph, layout, previousDirection } = useLayout();
const {
  run, stop, reset, isRunning, singleRunNode,
} = useRunProcess({ graph, cancelOnError });
const { fitView } = useVueFlow();
async function layoutGraph(direction) {
  await stop();
  reset(nodes.value);
  nodes.value = layout(nodes.value, edges.value, direction);
  nextTick(() => {
    fitView();
  });
}

async function shuffleGraph() {
  await stop();
  reset(nodes.value);
  edges.value = shuffle(nodes.value);
  nextTick(() => {
    layoutGraph(previousDirection.value);
  });
}

async function edgeRun(_val) {
  await anim.value.setNode(_val);
  anim.value.singleRun();
}

onMounted(() => {
  // console.log(AnimationEdge);
  setInterval(() => {
    proc.value.read();
    console.log(anim.value);
    console.log(edgeID);
  }, 2000);
});
</script>

<template>
  <div class="layout-flow">
    <el-row>
      run edge
      <el-button @click="edgeRun(edgeID)">edge</el-button>
      <el-input v-model="edgeID" style="width:200px"></el-input>
    </el-row>
    <el-row>
      run nodeID
      <el-button @click="singleRunNode(nodes[nodeID], false)">node</el-button>
      <el-input v-model="nodeID" style="width:200px"></el-input>
    </el-row>
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      @nodes-initialized="layoutGraph('LR')"
    >
      <template #node-process="props">
        <ProcessNode ref="proc"
          :data="props.data"
          :source-position="props.sourcePosition"
          :target-position="props.targetPosition"
        />
      </template>

      <template #edge-animation="edgeProps">
        <AnimationEdge ref="anim"
          :id="edgeProps.id"
          :source="edgeProps.source"
          :target="edgeProps.target"
          :source-x="edgeProps.sourceX"
          :source-y="edgeProps.sourceY"
          :targetX="edgeProps.targetX"
          :targetY="edgeProps.targetY"
          :source-position="edgeProps.sourcePosition"
          :target-position="edgeProps.targetPosition"
        />
      </template>

      <Background />

      <Panel class="process-panel" position="top-right">
        <div class="layout-panel">
          <button v-if="isRunning" class="stop-btn" title="stop" @click="stop">
            <IconIcon name="stop" />
            <span class="spinner" />
          </button>
          <button v-else title="start" @click="run(nodes)">
            <IconIcon name="play" />
          </button>

          <button title="set horizontal layout" @click="layoutGraph('LR')">
            <IconIcon name="horizontal" />
          </button>

          <button title="set vertical layout" @click="layoutGraph('TB')">
            <IconIcon name="vertical" />
          </button>

          <button title="shuffle graph" @click="shuffleGraph">
            <IconIcon name="shuffle" />
          </button>
        </div>
        <div class="checkbox-panel">
          <!-- <label for="inp">Cancel on error</label>
          <input v-model="cancelOnError" type="checkbox" id="inp" name="inp" /> -->
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<style>
.layout-flow {
  background-color: #d7d5ef;
  height: 100%;
  width: 100%;
}

.process-panel,
.layout-panel {
  display: flex;
  gap: 10px;
}

.process-panel {
  background-color: #2d3748;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.process-panel button {
  border: none;
  cursor: pointer;
  background-color: #4a5568;
  border-radius: 8px;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.process-panel button {
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-panel {
  display: flex;
  align-items: center;
  gap: 10px;
}

.process-panel button:hover,
.layout-panel button:hover {
  background-color: #2563eb;
  transition: background-color 0.2s;
}

.process-panel label {
  color: white;
  font-size: 12px;
}

.stop-btn svg {
  display: none;
}

.stop-btn:hover svg {
  display: block;
}

.stop-btn:hover .spinner {
  display: none;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #2563eb;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.33.6/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/core@1.33.6/dist/theme-default.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css";
@import "https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css";

html,
body,
#app {
  margin: 0;
  height: 100%;
}

#app {
  text-transform: uppercase;
  font-family: "JetBrains Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

</style>
