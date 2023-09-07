import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactFlow, { Background, useNodesState, useEdgesState, addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

const initialNodes = [
  { id: '1', position: { x: 100, y: 100}, data: { label: 'Hello'}, type: 'input' },
  { id: '2', position: { x: 100, y: 200}, data: { label: 'World'} },
];

const initialEdges = [];

const App = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeLabel, setNodeLabel] = useState('');

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const addNode = (e) => {
    e.preventDefault();

    let xPosition = 100;
    let yPosition = 100;

    if (nodes.length) {
      xPosition = nodes[nodes.length - 1].position.x;
      yPosition = nodes[nodes.length - 1].position.y + 100;
    }


    let newNode = {
      id: Math.floor(Math.random() * 9999999).toString(),
      position: { x: xPosition, y: yPosition },
      data: { label: nodeLabel }
    };
    setNodes([...nodes, newNode]);
    setNodeLabel('');
  };

  const onLabelChange = (e) => {
    setNodeLabel(e.target.value);
  };

  return (
    <>
      <div style={{ width: '100vw', height: '100vh', display: 'flex'}}>
        <div style={{ minWidth: '20rem', width: '20%', height: '100%', backgroundColor: '#D5D8DC', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <form onSubmit={e => addNode(e)} style={{margin: '16px', width: '288px', height: '6rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }} >
            <label style={{color: '#273746', fontFamily: 'arial', 'font-size': '16px'}}>Node Label:</label>
            <input type='text' value={nodeLabel} onChange={e => onLabelChange(e)} style={{ width: '288px', height: '28px', border: 'none', borderRadius: '5px'}}></input>
            <button type='submit' onClick={addNode} style={{ backgroundColor: '#273746', color: 'white', height: '32px', width: '292px', borderRadius: '5px', border: 'none'}} >Add Node</button>
          </form>
        </div>
        <div style={{ width: '80%', height: '100%'}}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Background variant='dots' gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

export default App;