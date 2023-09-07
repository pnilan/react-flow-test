import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

const initialNodes = [
  { id: '1', position: { x: 100, y: 100}, data: { label: 'Hello'}, type: 'input' },
  { id: '2', position: { x: 100, y: 200}, data: { label: 'World'} },
];

const initialEdges = [];

const App = () => {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
};

export default App;