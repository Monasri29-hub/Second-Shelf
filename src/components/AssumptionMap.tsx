import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Filter, 
  Layers, 
  AlertTriangle, 
  HelpCircle, 
  FileSearch, 
  Sparkles, 
  ShieldAlert, 
  ChevronRight,
  Info,
  X,
  RefreshCw
} from 'lucide-react';
import { MapNode, MapEdge, SecondSelfAnalysis } from '../types/analysis';

interface AssumptionMapProps {
  analysis: SecondSelfAnalysis;
  onRedTeamNode: (node: MapNode) => void;
}

export const AssumptionMap: React.FC<AssumptionMapProps> = ({ analysis, onRedTeamNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'assumption' | 'risk' | 'evidence' | 'question'>('all');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'canvas' | 'tree'>('canvas');
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute node layouts dynamically if coordinates are not fixed
  const { positionedNodes, edges } = useMemo(() => {
    const rawNodes = analysis.mapNodes || [];
    const rawEdges = analysis.mapEdges || [];

    // Filter nodes by active category
    const filteredNodes = rawNodes.filter(n => {
      if (activeFilter === 'all') return true;
      if (n.type === 'central') return true;
      return n.type === activeFilter;
    });

    const centralNode = filteredNodes.find(n => n.type === 'central') || filteredNodes[0];
    const peripheralNodes = filteredNodes.filter(n => n.id !== centralNode?.id);

    // Arrange peripheral nodes in a balanced radial orbit around (450, 300)
    const centerX = 460;
    const centerY = 320;
    const radiusX = 360;
    const radiusY = 220;

    const count = peripheralNodes.length;
    const positioned = filteredNodes.map((node, index) => {
      if (node.id === centralNode?.id) {
        return { ...node, x: centerX, y: centerY };
      }

      const pIndex = peripheralNodes.findIndex(p => p.id === node.id);
      // Group similar node types in arcs or distribute evenly with slight phase
      const angle = (pIndex / Math.max(1, count)) * 2 * Math.PI - Math.PI / 2;
      const x = Math.round(centerX + Math.cos(angle) * radiusX);
      const y = Math.round(centerY + Math.sin(angle) * radiusY);

      return {
        ...node,
        x,
        y
      };
    });

    // Filter edges to only those connecting currently visible nodes
    const nodeIds = new Set(positioned.map(n => n.id));
    const filteredEdges = rawEdges.filter(e => nodeIds.has(e.source) && nodeIds.has(e.target));

    return { positionedNodes: positioned, edges: filteredEdges };
  }, [analysis, activeFilter]);

  const selectedNode = useMemo(() => {
    return positionedNodes.find(n => n.id === selectedNodeId) || null;
  }, [positionedNodes, selectedNodeId]);

  // Connected edges for highlighting
  const connectedEdgeIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const ids = new Set<string>();
    edges.forEach(e => {
      if (e.source === selectedNodeId || e.target === selectedNodeId) {
        ids.add(e.id);
      }
    });
    return ids;
  }, [edges, selectedNodeId]);

  // Pan interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNodeId(null);
  };

  // Color mappings
  const getNodeColorClasses = (type: string, isSelected: boolean) => {
    if (type === 'central') {
      return {
        bg: 'bg-[#1C201E]',
        border: isSelected ? 'ring-3 ring-amber-400' : 'border-[#1C201E]',
        text: 'text-[#FAF8F5]',
        badge: 'bg-amber-400/20 text-amber-300 border border-amber-400/30',
        stroke: '#1C201E'
      };
    }
    if (type === 'assumption') {
      return {
        bg: isSelected ? 'bg-[#EDE9FE]' : 'bg-[#FAF5FF]',
        border: isSelected ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]/30' : 'border-[#DDD6FE]',
        text: 'text-[#581C87]',
        badge: 'bg-[#F3E8FF] text-[#6B21A8] border border-[#DDD6FE]',
        stroke: '#8B5CF6'
      };
    }
    if (type === 'risk') {
      return {
        bg: isSelected ? 'bg-[#FFEDD5]' : 'bg-[#FFF7ED]',
        border: isSelected ? 'border-[#EA580C] ring-2 ring-[#EA580C]/30' : 'border-[#FED7AA]',
        text: 'text-[#9A3412]',
        badge: 'bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74]',
        stroke: '#EA580C'
      };
    }
    if (type === 'evidence') {
      return {
        bg: isSelected ? 'bg-[#DCFCE7]' : 'bg-[#F0FDF4]',
        border: isSelected ? 'border-[#16A34A] ring-2 ring-[#16A34A]/30' : 'border-[#BBF7D0]',
        text: 'text-[#14532D]',
        badge: 'bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC]',
        stroke: '#22C55E'
      };
    }
    if (type === 'question') {
      return {
        bg: isSelected ? 'bg-[#DBEAFE]' : 'bg-[#EFF6FF]',
        border: isSelected ? 'border-[#2563EB] ring-2 ring-[#2563EB]/30' : 'border-[#BFDBFE]',
        text: 'text-[#1E3A8A]',
        badge: 'bg-[#DBEAFE] text-[#1D4ED8] border border-[#93C5FD]',
        stroke: '#3B82F6'
      };
    }
    return {
      bg: 'bg-white',
      border: 'border-stone-300',
      text: 'text-stone-800',
      badge: 'bg-stone-100 text-stone-700',
      stroke: '#78716C'
    };
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#DFD8CC] shadow-xs overflow-hidden flex flex-col">
      {/* Top Controls Bar */}
      <div className="p-4 bg-[#FAF8F5] border-b border-[#E6E1D8] flex flex-wrap items-center justify-between gap-3">
        {/* Title and subtitle */}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#1C201E] tracking-tight">Interactive Assumption Map</h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#EAE5DC] text-[#48524C]">
              {positionedNodes.length} Nodes • {edges.length} Connections
            </span>
          </div>
          <p className="text-xs text-[#636C66] mt-0.5">
            Click any node to inspect hidden assumptions, explore evidence gaps, or launch a red-team drill.
          </p>
        </div>

        {/* View Mode Toggle & Canvas Navigation */}
        <div className="flex items-center gap-2">
          {/* Filter Pills */}
          <div className="hidden lg:flex items-center gap-1 bg-[#EFEAE1] p-1 rounded-xl text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                activeFilter === 'all' ? 'bg-white text-[#1C201E] shadow-xs' : 'text-[#636C66] hover:text-[#1C201E]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('assumption')}
              className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                activeFilter === 'assumption' ? 'bg-[#EDE9FE] text-[#6B21A8] shadow-xs' : 'text-[#636C66] hover:text-[#6B21A8]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
              Assumptions
            </button>
            <button
              onClick={() => setActiveFilter('risk')}
              className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                activeFilter === 'risk' ? 'bg-[#FFEDD5] text-[#C2410C] shadow-xs' : 'text-[#636C66] hover:text-[#C2410C]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
              Risks
            </button>
            <button
              onClick={() => setActiveFilter('evidence')}
              className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                activeFilter === 'evidence' ? 'bg-[#DCFCE7] text-[#15803D] shadow-xs' : 'text-[#636C66] hover:text-[#15803D]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>
              Evidence
            </button>
            <button
              onClick={() => setActiveFilter('question')}
              className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition-all ${
                activeFilter === 'question' ? 'bg-[#DBEAFE] text-[#1D4ED8] shadow-xs' : 'text-[#636C66] hover:text-[#1D4ED8]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
              Questions
            </button>
          </div>

          {/* Canvas Zoom Tools */}
          <div className="flex items-center gap-1 bg-[#EFEAE1] p-1 rounded-xl text-xs">
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.15, 1.8))}
              className="p-1.5 rounded-lg text-[#525B56] hover:text-[#1C201E] hover:bg-white transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.55))}
              className="p-1.5 rounded-lg text-[#525B56] hover:text-[#1C201E] hover:bg-white transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetView}
              className="p-1.5 rounded-lg text-[#525B56] hover:text-[#1C201E] hover:bg-white transition-all"
              title="Reset View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-[520px] sm:h-[580px] bg-[#FAF8F5] overflow-hidden select-none">
        {/* Canvas Background Grid */}
        <div className="absolute inset-0 bg-canvas-grid pointer-events-none opacity-60" />

        {/* Legend */}
        <div className="absolute bottom-3 left-3 z-20 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#E6E1D8] text-[11px] shadow-xs">
          <span className="font-semibold text-[#1C201E]">Legend:</span>
          <span className="flex items-center gap-1 text-[#6B21A8]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#8B5CF6]"></span> Assumption
          </span>
          <span className="flex items-center gap-1 text-[#C2410C]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#EA580C]"></span> Risk Scenario
          </span>
          <span className="flex items-center gap-1 text-[#15803D]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#22C55E]"></span> Evidence Gap
          </span>
          <span className="flex items-center gap-1 text-[#1D4ED8]">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#3B82F6]"></span> Open Question
          </span>
        </div>

        {/* Interactive SVG Canvas */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`w-full h-full cursor-grab active:cursor-grabbing relative ${isDragging ? 'cursor-grabbing' : ''}`}
        >
          <div
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '460px 300px',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out',
            }}
            className="w-[920px] h-[640px] absolute left-1/2 top-1/2 -ml-[460px] -mt-[320px]"
          >
            {/* SVG Connecting Edges */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none overflow-visible">
              <defs>
                <marker
                  id="arrow-default"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#B0A89B" />
                </marker>
                <marker
                  id="arrow-highlight"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#1C201E" />
                </marker>
              </defs>

              {edges.map(edge => {
                const sourceNode = positionedNodes.find(n => n.id === edge.source);
                const targetNode = positionedNodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnected = connectedEdgeIds.has(edge.id);
                const strokeColor = isConnected ? '#1C201E' : '#C8C0B2';
                const strokeWidth = isConnected ? 2.5 : 1.5;

                // Bezier curve calculation
                const sx = sourceNode.x ?? 450;
                const sy = sourceNode.y ?? 300;
                const tx = targetNode.x ?? 450;
                const ty = targetNode.y ?? 300;

                const midX = (sx + tx) / 2;
                const midY = (sy + ty) / 2;
                const dx = tx - sx;
                const dy = ty - sy;
                // Subtle curve curvature perpendicular to direction
                const curvature = 20;
                const cx = midX - dy * 0.1;
                const cy = midY + dx * 0.1;

                const pathData = `M ${sx} ${sy} Q ${cx} ${cy} ${tx} ${ty}`;

                return (
                  <g key={edge.id} className="transition-all duration-200">
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isConnected ? 'none' : '4 3'}
                      markerEnd={isConnected ? 'url(#arrow-highlight)' : 'url(#arrow-default)'}
                      className={isConnected ? 'opacity-100' : 'opacity-60'}
                    />
                    {edge.label && (
                      <text
                        x={cx}
                        y={cy - 4}
                        textAnchor="middle"
                        className="text-[9px] font-mono fill-[#756E63] font-medium pointer-events-none select-none"
                        style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9)' }}
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Nodes */}
            {positionedNodes.map(node => {
              const isSelected = selectedNodeId === node.id;
              const isCentral = node.type === 'central';
              const styleClasses = getNodeColorClasses(node.type, isSelected);

              return (
                <div
                  key={node.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id === selectedNodeId ? null : node.id);
                  }}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute z-10 transition-transform duration-200 cursor-pointer ${
                    isSelected ? 'scale-105 z-30' : 'hover:scale-103'
                  }`}
                >
                  {isCentral ? (
                    /* Central Hub Node */
                    <div className="w-56 p-4 rounded-2xl bg-[#1C201E] text-white border-2 border-[#1C201E] shadow-lg flex flex-col items-center text-center relative group">
                      <div className="w-3 h-3 rounded-full bg-amber-400 absolute -top-1.5 animate-ping opacity-75" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute -top-1" />
                      <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-amber-300 mb-1">
                        Core Proposition
                      </span>
                      <h4 className="font-bold text-xs leading-snug line-clamp-3 text-stone-100">
                        {node.label}
                      </h4>
                      <div className="mt-2 text-[10px] text-stone-400 font-mono">
                        Click to inspect thesis
                      </div>
                    </div>
                  ) : (
                    /* Peripheral Orbit Node */
                    <div
                      className={`w-48 p-3 rounded-xl border ${styleClasses.border} ${styleClasses.bg} shadow-sm hover:shadow-md transition-all flex flex-col`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-[9px] font-mono font-semibold uppercase px-1.5 py-0.5 rounded ${styleClasses.badge}`}>
                          {node.type}
                        </span>
                        {node.severityOrFragility && (
                          <span className="text-[9px] font-semibold text-[#6B7280]">
                            {node.severityOrFragility}
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-bold ${styleClasses.text} leading-snug line-clamp-2`}>
                        {node.label}
                      </h4>
                      <p className="mt-1 text-[10px] text-[#525B56] line-clamp-2 leading-relaxed">
                        {node.summary}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Inspector Drawer */}
        {selectedNode && (
          <div className="absolute right-4 top-4 bottom-4 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl border border-[#D5CEC2] shadow-xl p-5 z-40 overflow-y-auto animate-in slide-in-from-right-4 duration-200">
            <div className="flex items-center justify-between border-b border-[#F0EBE2] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD6C9] text-[#1C201E]">
                  {selectedNode.type} Node
                </span>
                {selectedNode.severityOrFragility && (
                  <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {selectedNode.severityOrFragility}
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-base font-bold text-[#1C201E] leading-snug">
              {selectedNode.label}
            </h4>

            <p className="mt-2 text-xs text-[#525B56] leading-relaxed">
              {selectedNode.summary}
            </p>

            {/* Context details if it matches an item in the analysis */}
            {selectedNode.type === 'assumption' && (
              <div className="mt-4 p-3 bg-[#FAF5FF] border border-[#DDD6FE] rounded-xl text-xs space-y-2">
                <div className="font-semibold text-[#581C87]">Fragility Rationale:</div>
                <div className="text-[11px] text-[#6B21A8]">
                  {analysis.hiddenAssumptions.find(a => a.id === selectedNode.id || selectedNode.label.includes(a.assumption.slice(0, 15)))?.rationale || 'Unvalidated premise relying on ideal conditions.'}
                </div>
                <div className="pt-2 border-t border-[#DDD6FE]">
                  <div className="font-semibold text-[#581C87]">48h Invalidation Test:</div>
                  <div className="text-[11px] text-[#6B21A8] mt-0.5">
                    {analysis.hiddenAssumptions.find(a => a.id === selectedNode.id || selectedNode.label.includes(a.assumption.slice(0, 15)))?.invalidationTest || 'Run a quick survey or fake-door test to falsify.'}
                  </div>
                </div>
              </div>
            )}

            {selectedNode.type === 'risk' && (
              <div className="mt-4 p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl text-xs space-y-2">
                <div className="font-semibold text-[#9A3412]">Pre-Mortem Failure Narrative:</div>
                <div className="text-[11px] text-[#C2410C]">
                  {analysis.risksAndFailureScenarios.find(r => r.id === selectedNode.id || selectedNode.label.includes(r.scenario.slice(0, 15)))?.preMortemStory || 'Catastrophic misalignment resulting in abandonment.'}
                </div>
                <div className="pt-2 border-t border-[#FED7AA]">
                  <div className="font-semibold text-[#9A3412]">Early Warning Signal:</div>
                  <div className="text-[11px] text-[#C2410C] mt-0.5">
                    {analysis.risksAndFailureScenarios.find(r => r.id === selectedNode.id || selectedNode.label.includes(r.scenario.slice(0, 15)))?.earlyWarningSignal || 'Early adoption plateauing after initial splash.'}
                  </div>
                </div>
              </div>
            )}

            {/* Action: Red-team this specific node */}
            {selectedNode.type !== 'central' && (
              <div className="mt-6 pt-4 border-t border-[#F0EBE2]">
                <button
                  onClick={() => onRedTeamNode(selectedNode)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#1C201E] hover:bg-[#323935] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:translate-y-[-1px]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Drill Down: Red-Team This Point</span>
                </button>
                <p className="text-[10px] text-center text-[#86908A] mt-1.5">
                  Launches targeted AI stress-test for this specific node
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
