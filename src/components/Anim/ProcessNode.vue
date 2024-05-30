<script setup>
import { toRef, defineExpose } from 'vue';
// import { toRef, defineExpose, onMounted } from 'vue';
import { Handle, useHandleConnections } from '@vue-flow/core';
import unchained from '@/assets/img/unchained.png';
import robot1 from '@/assets/img/robot1.png';
import cytation1 from '@/assets/img/cytation1.png';
import thermo from '@/assets/img/thermo.png';
import hamilton from '@/assets/img/hamilton.png';
import discover from '@/assets/img/discover.png';
import gc from '@/assets/img/gc.png';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  sourcePosition: {
    type: String,
  },
  targetPosition: {
    type: String,
  },
});

const sourceConnections = useHandleConnections({
  type: 'target',
});

const targetConnections = useHandleConnections({
  type: 'source',
});

const isSender = toRef(() => sourceConnections.value.length <= 0);
const isReceiver = toRef(() => targetConnections.value.length <= 0);
const bgColor = toRef(() => {
  // if (isSender.value) {
  //   return '#2563eb';
  // }
  if (props.data.hasError) {
    return '#f87171';
  }
  if (props.data.isFinished) {
    return '#42B983';
  }
  if (props.data.isCancelled) {
    return '#fbbf24';
  }
  return '#4b5563';
});

const processLabel = toRef(() => {
  if (props.data.hasError) {
    return '❌';
  }
  if (props.data.isSkipped) {
    return '🚧';
  }
  if (props.data.isCancelled) {
    return '🚫';
  }
  // if (isSender.value) {
  //   // return '📦';
  //   return '';
  // }
  if (props.data.isFinished) {
    return '✅';
  }
  return '🖥️';
});

function read() {
  console.log('#####', props.data, isReceiver, isSender);
  console.log(processLabel.value);
}
function chooseInstr() {
  switch (props.data.Instrument) {
    case 'Unchained': return unchained;
    case 'Cytation': return cytation1;
    case 'Hamilton': return hamilton;
    case 'Thermo': return thermo;
    case 'GC': return gc;
    case 'Discover': return discover;
    case 'Robot1': return robot1;
    default: return '';
  }
}
defineExpose({
  read,
});
</script>

<template>
  <div
    class='process-node'
    :style="{
      backgroundColor: bgColor,
      boxShadow: data.isRunning ? '0 0 10px rgba(0, 0, 0, 0.5)' : '',
    }"
  >
  <!-- <div
  > -->
    <Handle v-if="!isSender" type="target" :position="targetPosition">
      <!-- <span
        v-if="
          !data.isRunning &&
          !data.isFinished &&
          !data.isCancelled &&
          !data.isSkipped &&
          !data.hasError
        "
        >📥
      </span> -->
    </Handle>
    <Handle v-if="!isReceiver" type="source" :position="sourcePosition" />

    <!-- <div v-if="!isSender && data.isRunning" class="spinner" /> -->
    <div v-if="data.isRunning" class="spinner" />
    <span v-else>
      <el-image :src='chooseInstr()' class="el-img"></el-image>

      <!-- {{ processLabel }} -->
    </span>
  </div>
</template>

<style scoped>
.process-node {
  padding: 10px;
  border-radius: 99px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.process-node .vue-flow__handle {
  border: none;
  height: unset;
  width: unset;
  background: transparent;
  font-size: 12px;
}
.el-img{
  transform: scale(1);
}
</style>
