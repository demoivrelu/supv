import { useVueFlow } from '@vue-flow/core';
import { ref, watch } from 'vue';

let id = 0;

/**
 * @returns {string} - A unique id.
 */
function getId() {
  id += 1;
  return `dndnode_${id}`;
}

/**
 * @type {{draggedType: Ref<string|null>, isDragOver: Ref<boolean>, isDragging: Ref<boolean>}}
 */
const state = {
  /**
   * The type of the node being dragged.
   */
  draggedType: ref(null),
  isDragOver: ref(false),
  isDragging: ref(false),
};

export default function useDragAndDrop() {
  const { draggedType, isDragOver, isDragging } = state;

  const {
    addNodes, screenToFlowCoordinate, onNodesInitialized, updateNode,
  } = useVueFlow();

  watch(isDragging, (dragging) => {
    document.body.style.userSelect = dragging ? 'none' : '';
  });
  function onDragEnd() {
    isDragging.value = false;
    isDragOver.value = false;
    draggedType.value = null;
    document.removeEventListener('drop', onDragEnd);
  }
  /**
   * Handles the drag over event.
   *
   * @param {DragEvent} event
   */
  function onDragStart(event, type) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('application/vueflow', type);
      event.dataTransfer.setData('move', event.dataTransfer.effectAllowed); // firefox needs this = 'move';
      // event.dataTransfer.effectAllowed = 'move';
    }

    draggedType.value = type;
    isDragging.value = true;

    document.addEventListener('drop', onDragEnd);
  }

  function onDragOver(event) {
    event.preventDefault();

    if (draggedType.value) {
      isDragOver.value = true;

      if (event.dataTransfer) {
        // event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('move', event.dataTransfer.dropEffect);
      }
    }
  }

  function onDragLeave(_nodes) {
    console.log('get nodes .....', _nodes);
    isDragOver.value = false;
  }

  /**
   * Handles the drop event.
   *
   * @param {DragEvent} event
   */
  function onDrop(_nodes) {
    console.log('get nodes .....', _nodes);
    // const position = screenToFlowCoordinate({
    //   x: event.clientX,
    //   y: event.clientY,
    // });
    const position = { x: 0, y: 0 };
    const nodeId = getId();

    const newNode = {
      id: nodeId,
      // id: '7',
      // type: draggedType.value,
      type: 'default',
      position,
      targetPosition: 'left',
      sourcePosition: 'right',
      isSender: true,
      // label: `[${nodeId}]`,
    };

    /**
     * Align node position after drop, so it's centered to the mouse
     *
     */
    const { off } = onNodesInitialized(() => {
      updateNode(nodeId, (node) => ({
        position: {
          x: node.position.x - node.dimensions.width / 2,
          y: node.position.y - node.dimensions.height / 2,
        },
      }));

      off();
    });
    console.log('added: ', newNode);
    addNodes(newNode);
    _nodes.push(newNode);
  }

  function test(_nodes) {
    console.log(_nodes);
  }

  return {
    draggedType,
    isDragOver,
    isDragging,
    onDragStart,
    onDragLeave,
    onDragOver,
    onDrop,
    test,
  };
}
