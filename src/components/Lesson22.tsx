import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// ==========================================
// TIPOS E INTERFACES
// ==========================================
interface TabData {
  id: string;
  title: string;
  description: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// ==========================================
// DATOS DE LA LECCIÓN
// ==========================================
const lessonData: TabData[] = [
  {
    id: 'importancia',
    title: '1. Importancia',
    description: 'Las operaciones de join son fundamentales en las bases de datos relacionales, ya que permiten combinar información distribuida en múltiples tablas. Debido a su complejidad y costo potencial, los SGBD utilizan distintos algoritmos para ejecutarlas de manera eficiente según el tamaño de los datos y las condiciones de la consulta.'
  },
  {
    id: 'nested-loop',
    title: '2. Nested Loop Join',
    description: 'Este algoritmo compara cada fila de una tabla (externa) con todas las filas de otra (interna). Es sencillo de implementar y no requiere estructuras adicionales, pero su costo crece rápidamente con el tamaño de las tablas, ya que implica múltiples comparaciones.'
  },
  {
    id: 'sort-merge',
    title: '3. Sort-Merge Join',
    description: 'En este enfoque, ambas tablas se ordenan previamente según el atributo de unión. Luego, se recorren de manera simultánea, emparejando las filas que coinciden. Es eficiente cuando los datos ya están ordenados o cuando el costo de ordenar se justifica por el volumen de datos.'
  },
  {
    id: 'hash-join',
    title: '4. Hash Join',
    description: 'El algoritmo de hash join construye una estructura hash a partir de una de las tablas (generalmente la más pequeña). Luego, utiliza esa estructura para buscar rápidamente coincidencias con las filas de la segunda tabla. Es especialmente eficiente cuando no hay índices disponibles.'
  },
  {
    id: 'comparacion',
    title: '5. Comparación',
    description: 'Cada algoritmo presenta ventajas según el contexto: el nested loop es simple pero costoso, el sort-merge es adecuado para datos ordenados, y el hash join destaca en escenarios sin índices y con grandes volúmenes. El optimizador del SGBD selecciona el más adecuado en función de las características de la consulta.'
  }
];

// ==========================================
// COMPONENTES DE DIAGRAMA (SVGs & Recharts)
// ==========================================

const ImportanciaDiagram = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px]">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
      </marker>
    </defs>
    {/* Tabla 1 */}
    <g transform="translate(40, 40)">
      <rect width="100" height="80" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <line x1="0" y1="25" x2="100" y2="25" stroke="#94a3b8" strokeWidth="2" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#94a3b8" strokeWidth="2" />
      <text x="50" y="17" fontSize="12" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla A</text>
    </g>
    
    {/* Tabla 2 */}
    <g transform="translate(260, 40)">
      <rect width="100" height="80" rx="4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <line x1="0" y1="25" x2="100" y2="25" stroke="#94a3b8" strokeWidth="2" />
      <line x1="0" y1="50" x2="100" y2="50" stroke="#94a3b8" strokeWidth="2" />
      <text x="50" y="17" fontSize="12" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla B</text>
    </g>

    {/* Operación de Unión (Join) */}
    <circle cx="200" cy="80" r="20" fill="#3b82f6" opacity="0.2" />
    <circle cx="215" cy="80" r="20" fill="#3b82f6" opacity="0.2" />
    <path d="M140 80 L180 80" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <path d="M260 80 L235 80" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
    <text x="207" y="120" fontSize="12" textAnchor="middle" fill="#1e293b" fontWeight="bold">JOIN</text>

    {/* Tabla Resultado */}
    <g transform="translate(120, 180)">
      <rect width="160" height="80" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
      <line x1="0" y1="25" x2="160" y2="25" stroke="#3b82f6" strokeWidth="2" />
      <line x1="0" y1="50" x2="160" y2="50" stroke="#3b82f6" strokeWidth="2" />
      <line x1="80" y1="0" x2="80" y2="80" stroke="#3b82f6" strokeWidth="2" />
      <text x="80" y="17" fontSize="12" textAnchor="middle" fill="#1e40af" fontWeight="bold">Resultado Combinado</text>
    </g>

    <path d="M207 130 L207 170" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />
  </svg>
);

const NestedLoopDiagram = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px]">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
      </marker>
    </defs>
    
    <text x="100" y="30" fontSize="14" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla Externa (N)</text>
    <text x="300" y="30" fontSize="14" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla Interna (M)</text>

    {/* Tabla Externa */}
    <g transform="translate(50, 50)">
      <rect width="100" height="40" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <rect width="100" height="40" y="50" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="40" y="100" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="50" y="25" fontSize="12" textAnchor="middle" fill="#991b1b">Fila 1</text>
    </g>

    {/* Tabla Interna */}
    <g transform="translate(250, 50)">
      <rect width="100" height="40" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="40" y="50" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="40" y="100" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="40" y="150" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    </g>

    {/* Flechas de bucle */}
    <path d="M150 70 L240 70" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" />
    <path d="M150 70 L240 120" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" />
    <path d="M150 70 L240 170" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" />
    <path d="M150 70 L240 220" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)" />
    
    <text x="200" y="270" fontSize="12" textAnchor="middle" fill="#64748b" fontStyle="italic">Costo: O(N * M) comparaciones</text>
  </svg>
);

const SortMergeDiagram = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px]">
     <defs>
      <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
      </marker>
    </defs>

    <text x="100" y="30" fontSize="14" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla A (Ordenada)</text>
    <text x="300" y="30" fontSize="14" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla B (Ordenada)</text>

    {/* Tabla A */}
    <g transform="translate(50, 50)">
      <rect width="100" height="30" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="30" y="40" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <rect width="100" height="30" y="80" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="30" y="120" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="50" y="20" fontSize="12" textAnchor="middle" fill="#475569">ID: 1</text>
      <text x="50" y="60" fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">ID: 3</text>
      <text x="50" y="100" fontSize="12" textAnchor="middle" fill="#475569">ID: 5</text>
      <text x="50" y="140" fontSize="12" textAnchor="middle" fill="#475569">ID: 8</text>
      
      {/* Puntero A */}
      <polygon points="-10,50 0,55 -10,60" fill="#166534" />
      <text x="-25" y="60" fontSize="10" fill="#166534">Ptr A</text>
    </g>

    {/* Tabla B */}
    <g transform="translate(250, 50)">
      <rect width="100" height="30" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="30" y="40" rx="4" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
      <rect width="100" height="30" y="80" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect width="100" height="30" y="120" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <text x="50" y="20" fontSize="12" textAnchor="middle" fill="#475569">ID: 2</text>
      <text x="50" y="60" fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">ID: 3</text>
      <text x="50" y="100" fontSize="12" textAnchor="middle" fill="#475569">ID: 4</text>
      <text x="50" y="140" fontSize="12" textAnchor="middle" fill="#475569">ID: 9</text>

       {/* Puntero B */}
       <polygon points="110,50 100,55 110,60" fill="#166534" />
       <text x="115" y="60" fontSize="10" fill="#166534">Ptr B</text>
    </g>

    {/* Match visual */}
    <path d="M150 105 L250 105" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow-green)" />
    <text x="200" y="95" fontSize="12" textAnchor="middle" fill="#166534" fontWeight="bold">¡Coincidencia!</text>
    
    <text x="200" y="250" fontSize="12" textAnchor="middle" fill="#64748b" fontStyle="italic">Recorrido simultáneo hacia abajo</text>
  </svg>
);

const HashJoinDiagram = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-h-[300px]">
    <defs>
      <marker id="arrow-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#9333ea" />
      </marker>
    </defs>

    {/* Tabla de Construcción (Build) */}
    <g transform="translate(20, 40)">
      <text x="40" y="-10" fontSize="12" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla Pequeña</text>
      <rect width="80" height="120" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="0" y1="40" x2="80" y2="40" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="0" y1="80" x2="80" y2="80" stroke="#cbd5e1" strokeWidth="2" />
      <path d="M80 60 L140 60" stroke="#9333ea" strokeWidth="2" strokeDasharray="3" markerEnd="url(#arrow-purple)" />
      <text x="115" y="50" fontSize="10" fill="#9333ea" textAnchor="middle">1. Build</text>
    </g>

    {/* Estructura Hash */}
    <g transform="translate(150, 40)">
      <text x="50" y="-10" fontSize="12" textAnchor="middle" fill="#9333ea" fontWeight="bold">Tabla Hash en Memoria</text>
      <rect width="100" height="180" rx="8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
      <rect width="80" height="30" x="10" y="20" rx="2" fill="#d8b4fe" />
      <text x="50" y="40" fontSize="10" textAnchor="middle" fill="#581c87">Bucket (Hash 0)</text>
      
      <rect width="80" height="30" x="10" y="70" rx="2" fill="#d8b4fe" />
      <text x="50" y="90" fontSize="10" textAnchor="middle" fill="#581c87">Bucket (Hash 1)</text>

      <rect width="80" height="30" x="10" y="120" rx="2" fill="#d8b4fe" />
      <text x="50" y="140" fontSize="10" textAnchor="middle" fill="#581c87">Bucket (Hash 2)</text>
    </g>

    {/* Tabla de Prueba (Probe) */}
    <g transform="translate(300, 40)">
      <text x="40" y="-10" fontSize="12" textAnchor="middle" fill="#334155" fontWeight="bold">Tabla Grande</text>
      <rect width="80" height="180" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="0" y1="40" x2="80" y2="40" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="0" y1="80" x2="80" y2="80" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="0" y1="120" x2="80" y2="120" stroke="#cbd5e1" strokeWidth="2" />
      
      {/* Probe action */}
      <rect x="0" y="40" width="80" height="40" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <path d="M0 60 L250 85" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-purple)" />
      <text x="-15" y="80" fontSize="10" fill="#334155" textAnchor="end">2. Probe</text>
    </g>
    
    <text x="200" y="270" fontSize="12" textAnchor="middle" fill="#64748b" fontStyle="italic">Costo: O(N + M) asumiendo buen particionamiento hash</text>
  </svg>
);

// Datos para la gráfica de comparación de complejidad teórica (Tiempo vs Volumen de Datos)
const performanceData = [
  { size: '10k Filas', NestedLoop: 100, SortMerge: 20, HashJoin: 15 },
  { size: '100k Filas', NestedLoop: 1000, SortMerge: 45, HashJoin: 30 },
  { size: '1M Filas', NestedLoop: 10000, SortMerge: 120, HashJoin: 60 },
  { size: '10M Filas', NestedLoop: 50000, SortMerge: 400, HashJoin: 120 },
];

const ComparisonDiagram = () => (
  <div className="grid w-full h-full min-h-[300px] place-items-center">
    <ResponsiveContainer width="95%" height="95%">
      <LineChart
        data={performanceData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="size" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} label={{ value: 'Costo de Ejecución Relativo', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} />
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Line type="monotone" dataKey="NestedLoop" name="Nested Loop" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="SortMerge" name="Sort-Merge" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
        <Line type="monotone" dataKey="HashJoin" name="Hash Join" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// ==========================================
// COMPONENTES DE INTERFAZ (UI)
// ==========================================

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Header: React.FC<{ activeTab: string; onTabChange: (id: string) => void }> = ({ activeTab, onTabChange }) => (
  <header className="grid grid-rows-[auto_auto] bg-slate-800 text-white shadow-lg z-10">
    <div className="grid grid-cols-[auto_1fr] gap-4 place-items-center justify-items-start p-6">
      <div className="grid w-10 h-10 bg-blue-500 rounded-lg place-items-center shadow-inner">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
      </div>
      <h1 className="text-2xl font-bold tracking-tight">Arquitectura de SGBD: Algoritmos de Join</h1>
    </div>
    
    <nav className="grid grid-cols-2 md:grid-cols-5 bg-slate-900 border-t border-slate-700">
      {lessonData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`grid place-items-center py-4 px-2 text-sm font-medium transition-colors border-b-4 
            ${activeTab === tab.id 
              ? 'border-blue-500 text-blue-400 bg-slate-800/50' 
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
        >
          {tab.title}
        </button>
      ))}
    </nav>
  </header>
);

const DiagramRender: React.FC<{ tabId: string }> = ({ tabId }) => {
  switch (tabId) {
    case 'importancia': return <ImportanciaDiagram />;
    case 'nested-loop': return <NestedLoopDiagram />;
    case 'sort-merge': return <SortMergeDiagram />;
    case 'hash-join': return <HashJoinDiagram />;
    case 'comparacion': return <ComparisonDiagram />;
    default: return null;
  }
};

const LessonLayout: React.FC<{ activeData: TabData }> = ({ activeData }) => (
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 w-full max-w-7xl mx-auto h-full">
    
    {/* Panel de Texto */}
    <Card className="grid grid-rows-[auto_1fr] p-8 gap-6">
      <div className="grid gap-2">
        <h3 className="text-3xl font-extrabold text-slate-800">{activeData.title.replace(/^[0-9.]+\s/, '')}</h3>
      </div>
      <div className="grid content-start border-t border-slate-100 pt-6">
        <p className="text-lg text-slate-600 leading-relaxed">
          {activeData.description}
        </p>
      </div>
    </Card>

    {/* Panel de Visualización */}
    <Card className="grid grid-rows-[auto_1fr] bg-slate-50">

      <div className="grid place-items-center p-6 w-full h-full min-h-[350px]">
        <DiagramRender tabId={activeData.id} />
      </div>
    </Card>

  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export default function App() {
  const [activeTab, setActiveTab] = useState<string>(lessonData[0].id);

  const activeData = lessonData.find(tab => tab.id === activeTab) || lessonData[0];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="grid p-4 md:p-8 place-items-start">
        <LessonLayout activeData={activeData} />
      </main>
    </div>
  );
}