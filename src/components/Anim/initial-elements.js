import logo from '@/assets/img/arm.jpg';

const position = { x: 0, y: 0 };
const nodeType = 'process';
const edgeType = 'animation';

// const defaultNodeStyle = {
//   backgroundColor: '#dddddd',
//   backgroundImage: logo,
//   label: 'Node 1',
//   hidden: false,
// };

console.log(logo);

export const initialNodes = [
  {
    id: '0',
    position,
    type: nodeType,
    // style: defaultNodeStyle,
    // image: '../../assets/img/arm.jpg',
    // backgroundImage: logo,
  },
  {
    id: '1',
    position,
    type: nodeType,
    // style: defaultNodeStyle,
  },
  {
    id: '2',
    position,
    type: nodeType,
    // style: defaultNodeStyle,
  },
  {
    id: '3',
    position,
    type: nodeType,
    // style: defaultNodeStyle,
  },
  {
    id: '4',
    position,
    type: nodeType,
    // style: defaultNodeStyle,
  },
  {
    id: '5',
    position,
    type: nodeType,
    // style: defaultNodeStyle,
  },
];

export const initialEdges = [
  {
    id: 'e0-1', source: '0', target: '1', type: edgeType, animated: true,
  },
  {
    id: 'e1-2', source: '1', target: '2', type: edgeType, animated: true,
  },
  {
    id: 'e2-3', source: '2', target: '3', type: edgeType, animated: true,
  },
  {
    id: 'e3-4', source: '3', target: '4', type: edgeType, animated: true,
  },
  {
    id: 'e4-5', source: '4', target: '5', type: edgeType, animated: true,
  },

  // {
  //   id: 'e6-1', source: '6', target: '1', type: edgeType, animated: true,
  // },
];
