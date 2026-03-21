import React, { useState } from 'react';
import { Database, ArrowRight, ArrowDown, FileCode2, Cpu, ListTree, DatabaseZap, Search } from 'lucide-react';

// --- Tipos e Interfaces ---

type PhaseId = 'delimitacion' | 'analisis' | 'traduccion' | 'optimizacion' | 'ejecucion';

interface PhaseData {
  id: PhaseId;
  title: string;
  description: string;
  icon: React.ElementType;
}

// --- Datos de la Lección ---

const phases: PhaseData[] = [
  {
    id: 'delimitacion',
    title: 'Delimitación de las Fases',
    description: 'El procesamiento de una consulta en un SGBD se organiza en una secuencia de etapas bien definidas que transforman una instrucción SQL en resultados concretos. Cada fase cumple una función específica: validar, transformar, optimizar y ejecutar la consulta.',
    icon: ListTree
  },
  {
    id: 'analisis',
    title: 'Análisis (Parsing)',
    description: 'En esta fase, el SGBD verifica que la consulta SQL esté correctamente escrita según las reglas sintácticas del lenguaje y construye una representación estructurada (árbol sintáctico).',
    icon: FileCode2
  },
  {
    id: 'traduccion',
    title: 'Traducción a Álgebra Relacional',
    description: 'El sistema transforma el árbol sintáctico en una expresión equivalente en álgebra relacional, permitiendo manipular operaciones de manera formal y aplicar reglas de equivalencia.',
    icon: Cpu
  },
  {
    id: 'optimizacion',
    title: 'Optimización de la Consulta',
    description: 'El SGBD evalúa diferentes estrategias para ejecutar la consulta, genera múltiples planes de ejecución posibles, estima su costo y selecciona el plan más eficiente.',
    icon: Search
  },
  {
    id: 'ejecucion',
    title: 'Ejecución del Plan',
    description: 'El sistema ejecuta el plan seleccionado utilizando algoritmos específicos para acceder a los datos físicos y produce los resultados que serán devueltos al usuario.',
    icon: DatabaseZap
  }
];

// --- Componentes de Visualización (Diagram Render) ---

const DiagramDelimitacion: React.FC = () => (
  <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-2 md:gap-4 items-center justify-items-center w-full max-w-4xl mx-auto py-12">
    <div className="grid place-items-center bg-blue-100 border-2 border-blue-400 text-blue-800 p-4 rounded-lg w-full text-center font-semibold shadow-sm">
      <FileCode2 className="mb-2" size={24} />
      Análisis
    </div>
    <ArrowRight className="text-gray-400" />
    <div className="grid place-items-center bg-purple-100 border-2 border-purple-400 text-purple-800 p-4 rounded-lg w-full text-center font-semibold shadow-sm">
      <Cpu className="mb-2" size={24} />
      Traducción
    </div>
    <ArrowRight className="text-gray-400" />
    <div className="grid place-items-center bg-amber-100 border-2 border-amber-400 text-amber-800 p-4 rounded-lg w-full text-center font-semibold shadow-sm">
      <Search className="mb-2" size={24} />
      Optimización
    </div>
    <ArrowRight className="text-gray-400" />
    <div className="grid place-items-center bg-green-100 border-2 border-green-400 text-green-800 p-4 rounded-lg w-full text-center font-semibold shadow-sm">
      <DatabaseZap className="mb-2" size={24} />
      Ejecución
    </div>
  </div>
);

const DiagramAnalisis: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-4xl mx-auto py-8">
    <div className="grid bg-gray-800 p-6 rounded-lg text-green-400 font-mono text-sm shadow-inner">
      <span>SELECT nombre, edad</span>
      <span>FROM usuarios</span>
      <span>WHERE activo = 1;</span>
    </div>
    <div className="grid justify-items-center relative">
      {/* Representación de árbol usando SVG */}
      <svg width="300" height="200" viewBox="0 0 300 200" className="overflow-visible">
        {/* Líneas */}
        <path d="M 150 30 L 75 100" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 150 30 L 225 100" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 75 130 L 40 180" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 75 130 L 110 180" stroke="#94a3b8" strokeWidth="2" fill="none" />
        
        {/* Nodos */}
        <g transform="translate(150, 30)">
          <rect x="-40" y="-15" width="80" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">SELECT</text>
        </g>
        <g transform="translate(75, 100)">
          <rect x="-40" y="-15" width="80" height="30" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">WHERE</text>
        </g>
        <g transform="translate(225, 100)">
          <rect x="-40" y="-15" width="80" height="30" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">usuarios</text>
        </g>
        <g transform="translate(40, 180)">
          <rect x="-35" y="-15" width="70" height="30" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">activo</text>
        </g>
        <g transform="translate(110, 180)">
          <rect x="-25" y="-15" width="50" height="30" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="0" y="4" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">1</text>
        </g>
      </svg>
    </div>
  </div>
);

const DiagramTraduccion: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center w-full max-w-4xl mx-auto py-8">
    <div className="grid gap-2 bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Consulta SQL</div>
      <code className="text-sm font-mono text-gray-800">
        SELECT nombre<br/>
        FROM Empleados<br/>
        WHERE edad &gt; 30
      </code>
    </div>
    
    <div className="grid place-items-center">
      <ArrowRight className="text-purple-500 hidden md:block" size={32} />
      <ArrowDown className="text-purple-500 md:hidden" size={32} />
    </div>

    <div className="grid gap-2 bg-purple-50 border border-purple-200 p-6 rounded-lg shadow-sm">
      <div className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">Álgebra Relacional</div>
      <div className="text-lg font-serif text-purple-900 grid place-items-center py-2">
        <span>π<sub>nombre</sub>(σ<sub>edad &gt; 30</sub>(Empleados))</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-purple-700">
        <div className="grid grid-cols-[auto_1fr] gap-2"><span className="font-bold">π</span> Proyección</div>
        <div className="grid grid-cols-[auto_1fr] gap-2"><span className="font-bold">σ</span> Selección</div>
      </div>
    </div>
  </div>
);

const DiagramOptimizacion: React.FC = () => (
  <div className="grid place-items-center w-full py-8">
    <svg width="400" height="250" viewBox="0 0 400 250">
      {/* Conexiones */}
      <path d="M 200 40 L 100 120" stroke="#cbd5e1" strokeWidth="2" fill="none" />
      <path d="M 200 40 L 200 120" stroke="#22c55e" strokeWidth="3" fill="none" />
      <path d="M 200 40 L 300 120" stroke="#cbd5e1" strokeWidth="2" fill="none" />
      
      {/* Nodo Origen */}
      <g transform="translate(200, 30)">
        <rect x="-75" y="-20" width="150" height="40" rx="20" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="bold">Álgebra Relacional</text>
      </g>

      {/* Plan 1 */}
      <g transform="translate(100, 140)">
        <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
        <text x="0" y="-5" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">Plan A</text>
        <text x="0" y="15" textAnchor="middle" fill="#ef4444" fontSize="12">Costo: 850</text>
      </g>

      {/* Plan 2 (Óptimo) */}
      <g transform="translate(200, 140)">
        <rect x="-65" y="-35" width="130" height="70" rx="8" fill="#ecfdf5" stroke="#22c55e" strokeWidth="3" />
        <text x="0" y="-10" textAnchor="middle" fill="#166534" fontSize="14" fontWeight="bold">Plan B (Óptimo)</text>
        <text x="0" y="10" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">Costo: 120</text>
        <circle cx="50" cy="-20" r="10" fill="#22c55e" />
        <path d="M 46 -20 L 49 -17 L 55 -24" stroke="white" strokeWidth="2" fill="none" />
      </g>

      {/* Plan 3 */}
      <g transform="translate(300, 140)">
        <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
        <text x="0" y="-5" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">Plan C</text>
        <text x="0" y="15" textAnchor="middle" fill="#ef4444" fontSize="12">Costo: 1420</text>
      </g>
    </svg>
  </div>
);

const DiagramEjecucion: React.FC = () => (
  <div className="grid grid-rows-[auto_auto_auto_auto_auto] justify-items-center gap-4 py-8">
    <div className="grid place-items-center bg-green-100 border-2 border-green-500 text-green-800 px-6 py-3 rounded-full font-bold shadow-sm">
      Plan de Ejecución Seleccionado
    </div>
    
    <ArrowDown className="text-gray-400" size={24} />
    
    <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-gray-800 text-white p-6 rounded-xl shadow-lg w-64">
      <Database size={40} className="text-blue-400" />
      <div className="grid gap-1">
        <span className="font-bold text-sm">Motor de BD</span>
        <span className="text-xs text-gray-400">Acceso a disco/memoria</span>
      </div>
    </div>
    
    <ArrowDown className="text-gray-400" size={24} />
    
    <div className="grid w-64 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-600">
        Conjunto de Resultados
      </div>
      <div className="grid grid-cols-2 gap-px bg-gray-200">
        <div className="bg-white p-2 text-xs text-center text-gray-500">ID</div>
        <div className="bg-white p-2 text-xs text-center text-gray-500">Valor</div>
        <div className="bg-white p-2 text-xs text-center font-mono">1</div>
        <div className="bg-white p-2 text-xs text-center font-mono">Data A</div>
        <div className="bg-white p-2 text-xs text-center font-mono">2</div>
        <div className="bg-white p-2 text-xs text-center font-mono">Data B</div>
      </div>
    </div>
  </div>
);

// --- Componentes Estructurales ---

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
    {children}
  </div>
);

const LessonLayout: React.FC<{
  title: string;
  activePhase: PhaseId;
  onPhaseChange: (id: PhaseId) => void;
  children: React.ReactNode;
}> = ({ title, activePhase, onPhaseChange, children }) => {
  return (
    // Layout Principal usando CSS Grid exclusivamente
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Header */}
      <header className="grid bg-white border-b border-gray-200 px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="grid grid-cols-[auto_1fr] items-center gap-3 max-w-6xl mx-auto w-full">
          <div className="grid place-items-center bg-blue-600 text-white p-2 rounded-lg">
            <Database size={24} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
        </div>
      </header>

      {/* Navegación por Pestañas (Tabs) */}
      <nav className="grid bg-white border-b border-gray-200 px-4 overflow-x-auto">
        <div className="grid grid-flow-col justify-start md:justify-center gap-2 max-w-6xl mx-auto w-full py-2">
          {phases.map((phase) => {
            const Icon = phase.icon;
            const isActive = activePhase === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => onPhaseChange(phase.id)}
                className={`grid grid-cols-[auto_1fr] items-center gap-2 px-4 py-3 rounded-t-lg transition-colors border-b-2 ${
                  isActive 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' 
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
                aria-selected={isActive}
                role="tab"
              >
                <Icon size={18} />
                <span className="text-sm whitespace-nowrap">{phase.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Contenido Principal */}
      <main className="grid p-4 md:p-8 max-w-5xl mx-auto w-full items-start">
        {children}
      </main>
      
    </div>
  );
};

// --- Componente Principal ---

export default function App() {
  const [activePhase, setActivePhase] = useState<PhaseId>('delimitacion');
  const currentPhaseData = phases.find(p => p.id === activePhase)!;

  const renderDiagram = () => {
    switch (activePhase) {
      case 'delimitacion': return <DiagramDelimitacion />;
      case 'analisis': return <DiagramAnalisis />;
      case 'traduccion': return <DiagramTraduccion />;
      case 'optimizacion': return <DiagramOptimizacion />;
      case 'ejecucion': return <DiagramEjecucion />;
      default: return null;
    }
  };

  return (
    <LessonLayout 
      title="Procesamiento de Consultas SGBD" 
      activePhase={activePhase} 
      onPhaseChange={setActivePhase}
    >
      <Card>
        {/* Sección de Texto del Panel */}
        <div className="grid gap-4 p-6 md:p-8 border-b border-gray-100 bg-white">
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <currentPhaseData.icon className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-gray-800">
              {currentPhaseData.title}
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            {currentPhaseData.description}
          </p>
        </div>

        {/* Diagram Render */}
        <div className="grid p-6 bg-slate-50 min-h-[300px] place-items-center">
          {renderDiagram()}
        </div>
      </Card>
    </LessonLayout>
  );
}