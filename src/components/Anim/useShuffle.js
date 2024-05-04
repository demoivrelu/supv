function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    console.log(j);
    // const newArray = array.slice();
    // newArray[i] = array[j];
    // newArray[j] = array[i];
    // array = newArray;
    // [array[i], array[j]] = [array[j], array[i]];
  }
}

// generate a list of all possible edges, excluding duplicates and self-references
function generatePossibleEdges(nodes) {
  const possibleEdges = [];

  for (const sourceNode of nodes) {
    for (const targetNode of nodes) {
      if (sourceNode.id !== targetNode.id) {
        const edgeId = `e${sourceNode.id}-${targetNode.id}`;
        possibleEdges.push({
          id: edgeId,
          source: sourceNode.id,
          target: targetNode.id,
          type: 'animation',
          animated: true,
        });
      }
    }
  }
  // nodes.map((sourceNode) => nodes.map((targetNode) => {
  //   if (sourceNode.id !== targetNode.id) {
  //     const edgeId = `e${sourceNode.id}-${targetNode.id}`;
  //     possibleEdges.push({
  //       id: edgeId,
  //       source: sourceNode.id,
  //       target: targetNode.id,
  //       type: 'animation',
  //       animated: true,
  //     });
  //   }
  //   return true;
  // }));

  return possibleEdges;
}

export function useShuffle() {
  return (nodes) => {
    const possibleEdges = generatePossibleEdges(nodes);
    shuffleArray(possibleEdges);

    const usedNodes = new Set();
    const newEdges = [];

    // ensure every node is used, maintaining a single starting node and no duplicate connections
    for (const edge of possibleEdges) {
      if (!usedNodes.has(edge.target) && (usedNodes.size === 0 || usedNodes.has(edge.source))) {
        newEdges.push(edge);
        usedNodes.add(edge.source);
        usedNodes.add(edge.target);
      }
    }

    // possibleEdges.map((edge) => {
    //   if (!usedNodes.has(edge.target) && (usedNodes.size === 0 || usedNodes.has(edge.source))) {
    //     newEdges.push(edge);
    //     usedNodes.add(edge.source);
    //     usedNodes.add(edge.target);
    //   }
    //   return true;
    // });

    return newEdges;
  };
}
