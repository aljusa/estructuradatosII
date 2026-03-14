import React, { useState } from 'react';
import { Database, BookOpen, Search, FileText, Zap } from 'lucide-react';

// --- TYPES ---
interface TabData {
  id: string;
  icon: React.ReactNode;
  tabTitle: string;
  diagramTitle: string;
  description: string;
  VisualComponent: React.FC;
}

// --- VISUAL COMPONENTS (DIAGRAM RENDERS) ---

const ArrowMarker = () => (
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
    </marker>
    <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
    </marker>
    <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
    </marker>
  </defs>
);

const IntroDiagram: React.FC = () => (
  <div className="w-full h-full min-h-[300px] grid place-items-center bg-slate-50 rounded-lg border border-slate-200 p-4">
    <svg viewBox="0 0 500 300" className="w-full h-full max-w-md">
      <ArrowMarker />
      
      {/* Index Structure */}
      <rect x="50" y="80" width="100" height="140" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="100" y="70" textAnchor="middle" className="text-sm font-bold fill-slate-700">Índice</text>
      <line x1="50" y1="105" x2="150" y2="105" stroke="#bfdbfe" strokeWidth="1" />
      <line x1="50" y1="130" x2="150" y2="130" stroke="#bfdbfe" strokeWidth="1" />
      <line x1="50" y1="155" x2="150" y2="155" stroke="#bfdbfe" strokeWidth="1" />
      <line x1="50" y1="180" x2="150" y2="180" stroke="#bfdbfe" strokeWidth="1" />
      <text x="100" y="100" textAnchor="middle" className="text-xs fill-slate-600">A-D</text>
      <text x="100" y="125" textAnchor="middle" className="text-xs fill-slate-600">E-H</text>
      
      {/* Main Table */}
      <rect x="300" y="40" width="150" height="220" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
      <text x="375" y="30" textAnchor="middle" className="text-sm font-bold fill-slate-700">Tabla de Datos</text>
      {[...Array(8)].map((_, i) => (
        <line key={i} x1="300" y1={65 + i * 25} x2="450" y2={65 + i * 25} stroke="#e2e8f0" strokeWidth="1" />
      ))}

      {/* Connection Arrows */}
      <path d="M 150 95 C 220 95, 230 60, 300 60" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <path d="M 150 120 C 220 120, 230 160, 300 160" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <path d="M 150 145 C 220 145, 230 235, 300 235" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
    </svg>
  </div>
);

const FormalDefDiagram: React.FC = () => (
  <div className="w-full h-full min-h-[300px] grid place-items-center bg-slate-50 rounded-lg border border-slate-200 p-4">
    <svg viewBox="0 0 500 300" className="w-full h-full max-w-md">
      <ArrowMarker />
      
      {/* Index (Sorted) */}
      <rect x="40" y="60" width="140" height="180" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
      <text x="110" y="50" textAnchor="middle" className="text-sm font-bold fill-slate-700">Índice (Ordenado)</text>
      <rect x="50" y="70" width="120" height="25" rx="2" fill="#bbf7d0" />
      <text x="110" y="87" textAnchor="middle" className="text-xs font-mono fill-slate-800">ID: 101 | PTR: A</text>
      
      <rect x="50" y="105" width="120" height="25" rx="2" fill="#bbf7d0" />
      <text x="110" y="122" textAnchor="middle" className="text-xs font-mono fill-slate-800">ID: 102 | PTR: C</text>

      <rect x="50" y="140" width="120" height="25" rx="2" fill="#bbf7d0" />
      <text x="110" y="157" textAnchor="middle" className="text-xs font-mono fill-slate-800">ID: 103 | PTR: B</text>

      {/* Main Table (Unsorted) */}
      <rect x="320" y="60" width="140" height="180" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
      <text x="390" y="50" textAnchor="middle" className="text-sm font-bold fill-slate-700">Datos (Desordenados)</text>
      
      <rect x="330" y="70" width="120" height="35" rx="2" fill="#e2e8f0" />
      <text x="390" y="92" textAnchor="middle" className="text-xs font-mono fill-slate-600">Row A (ID: 101)</text>

      <rect x="330" y="115" width="120" height="35" rx="2" fill="#e2e8f0" />
      <text x="390" y="137" textAnchor="middle" className="text-xs font-mono fill-slate-600">Row B (ID: 103)</text>

      <rect x="330" y="160" width="120" height="35" rx="2" fill="#e2e8f0" />
      <text x="390" y="182" textAnchor="middle" className="text-xs font-mono fill-slate-600">Row C (ID: 102)</text>

      {/* Pointers */}
      <path d="M 170 82 L 320 82" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-green)" />
      <path d="M 170 117 C 240 117, 250 177, 320 177" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-green)" />
      <path d="M 170 152 C 240 152, 250 132, 320 132" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead-green)" />
    </svg>
  </div>
);

const AnalogyDiagram: React.FC = () => (
  <div className="w-full h-full min-h-[300px] grid place-items-center bg-slate-50 rounded-lg border border-slate-200 p-4">
    <div className="grid grid-cols-2 gap-8 w-full max-w-2xl h-full">
      {/* Book Analogy */}
      <div className="grid grid-rows-[auto_1fr] place-items-center gap-4 border-r border-slate-300 pr-8">
        <span className="font-bold text-slate-700">Índice de un Libro</span>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <ArrowMarker />
          <path d="M 30 160 L 30 40 Q 90 40 100 50 Q 110 40 170 40 L 170 160 Q 110 160 100 170 Q 90 160 30 160 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3"/>
          <path d="M 100 50 L 100 170" fill="none" stroke="#cbd5e1" strokeWidth="3"/>
          {/* Index lines */}
          <line x1="45" y1="70" x2="85" y2="70" stroke="#94a3b8" strokeWidth="2" />
          <line x1="45" y1="90" x2="70" y2="90" stroke="#94a3b8" strokeWidth="2" />
          <circle cx="85" cy="70" r="2" fill="#3b82f6" />
          {/* Content lines */}
          <line x1="115" y1="70" x2="155" y2="70" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="115" y1="90" x2="155" y2="90" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="115" y1="110" x2="140" y2="110" stroke="#e2e8f0" strokeWidth="2" />
          {/* Pointer */}
          <path d="M 85 70 C 100 50, 110 50, 140 65" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3" markerEnd="url(#arrowhead)"/>
        </svg>
      </div>
      
      {/* Database Analogy */}
      <div className="grid grid-rows-[auto_1fr] place-items-center gap-4">
        <span className="font-bold text-slate-700">Índice de Base de Datos</span>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect x="20" y="50" width="60" height="100" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <rect x="120" y="30" width="60" height="140" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          <circle cx="70" cy="80" r="3" fill="#3b82f6" />
          <rect x="125" y="110" width="50" height="20" rx="2" fill="#bfdbfe" />
          <path d="M 70 80 C 100 80, 100 120, 120 120" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        </svg>
      </div>
    </div>
  </div>
);

const FullScanDiagram: React.FC = () => (
  <div className="w-full h-full min-h-[300px] grid place-items-center bg-slate-50 rounded-lg border border-slate-200 p-4">
    <svg viewBox="0 0 500 300" className="w-full h-full max-w-md">
      <ArrowMarker />
      <text x="250" y="30" textAnchor="middle" className="text-sm font-bold fill-red-600">Búsqueda exhaustiva fila por fila</text>
      
      <rect x="150" y="60" width="200" height="200" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x="160" y="70 + i * 30" width="180" height="20" rx="2" fill={i === 4 ? '#fef08a' : '#f1f5f9'} />
          <text x="250" y={84 + i * 30} textAnchor="middle" className="text-xs fill-slate-500 font-mono">Registro {i + 1}</text>
          
          {/* Scanning arrows simulation */}
          {i <= 4 && (
            <path 
              d={`M 100 ${80 + i * 30} L 150 ${80 + i * 30}`} 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="2" 
              markerEnd="url(#arrowhead-red)" 
            />
          )}
          {i < 4 && (
            <path 
              d={`M 350 ${80 + i * 30} L 400 ${80 + i * 30}`} 
              fill="none" 
              stroke="#ef4444" 
              strokeWidth="2" 
              strokeDasharray="2"
            />
          )}
        </g>
      ))}
      <text x="410" y="84" className="text-xs fill-red-500">¿Es este? No.</text>
      <text x="410" y="114" className="text-xs fill-red-500">¿Es este? No.</text>
      <text x="410" y="144" className="text-xs fill-red-500">¿Es este? No.</text>
      <text x="410" y="174" className="text-xs fill-red-500">¿Es este? No.</text>
      <text x="410" y="204" className="text-xs font-bold fill-green-600">¡Encontrado!</text>
    </svg>
  </div>
);

const IndexScanDiagram: React.FC = () => (
  <div className="w-full h-full min-h-[300px] grid place-items-center bg-slate-50 rounded-lg border border-slate-200 p-4">
    <svg viewBox="0 0 500 300" className="w-full h-full max-w-md">
      <ArrowMarker />
      <text x="250" y="30" textAnchor="middle" className="text-sm font-bold fill-green-600">Acceso directo mediante Índice</text>
      
      {/* Index */}
      <rect x="50" y="60" width="120" height="150" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
      <text x="110" y="80" textAnchor="middle" className="text-xs font-bold fill-slate-700">Índice B-Tree</text>
      <rect x="60" y="100" width="100" height="20" rx="2" fill="#bbf7d0" />
      <text x="110" y="114" textAnchor="middle" className="text-xs fill-slate-800">Criterio Búsqueda</text>

      {/* Database Table */}
      <rect x="300" y="60" width="150" height="200" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="310" y="70 + i * 30" width="130" height="20" rx="2" fill={i === 4 ? '#fef08a' : '#f1f5f9'} />
      ))}
      <text x="375" y="204" textAnchor="middle" className="text-xs font-bold fill-slate-800">Registro Objetivo</text>

      {/* Query Engine Input */}
      <path d="M 10 110 L 45 110" fill="none" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead-green)" />
      <text x="10" y="100" className="text-xs font-bold fill-green-600">Consulta</text>

      {/* Direct Jump */}
      <path d="M 165 110 C 220 110, 240 200, 295 200" fill="none" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowhead-green)" />
      
      <text x="230" y="145" textAnchor="middle" className="text-xs font-bold fill-green-600 bg-white px-1">Salto Directo</text>
    </svg>
  </div>
);

// --- DATA STRUCTURE ---
const tabsData: TabData[] = [
  {
    id: "intro",
    icon: <Database className="w-5 h-5" />,
    tabTitle: "Introducción",
    diagramTitle: "Concepto General de Índice",
    description: "En las bases de datos, recuperar información de manera eficiente es fundamental cuando las tablas contienen grandes volúmenes de datos. Un índice es un mecanismo que permite localizar registros específicos más rápidamente sin tener que revisar cada fila de una tabla. Su función principal es optimizar el acceso a los datos, reduciendo el tiempo necesario para ejecutar consultas.",
    VisualComponent: IntroDiagram
  },
  {
    id: "formal",
    icon: <FileText className="w-5 h-5" />,
    tabTitle: "Definición Formal",
    diagramTitle: "Estructura de Datos Auxiliar",
    description: "Un índice es una estructura de datos utilizada por el sistema gestor de bases de datos (DBMS) para acelerar la búsqueda y recuperación de registros en una tabla. Los índices almacenan valores de una o varias columnas junto con referencias a las filas correspondientes, permitiendo localizar los datos con mayor rapidez.",
    VisualComponent: FormalDefDiagram
  },
  {
    id: "analogy",
    icon: <BookOpen className="w-5 h-5" />,
    tabTitle: "Analogía del Libro",
    diagramTitle: "Comparación Libro vs Base de Datos",
    description: "El funcionamiento de un índice en bases de datos es comparable al índice de un libro. Cuando se busca un tema en un libro, no es necesario leer todas las páginas; basta con consultar el índice, que indica en qué páginas aparece el contenido deseado. De forma similar, un índice en una base de datos permite localizar rápidamente los registros relevantes sin recorrer toda la tabla.",
    VisualComponent: AnalogyDiagram
  },
  {
    id: "fullscan",
    icon: <Search className="w-5 h-5" />,
    tabTitle: "Full Table Scan",
    diagramTitle: "Búsqueda sin Índice",
    description: "Cuando una tabla no tiene índices, el sistema gestor de bases de datos debe revisar cada fila de la tabla para encontrar los registros que cumplen la condición de una consulta. Este proceso se denomina Full Table Scan (escaneo completo de tabla) y puede resultar muy costoso en términos de tiempo cuando el volumen de datos es grande.",
    VisualComponent: FullScanDiagram
  },
  {
    id: "indexscan",
    icon: <Zap className="w-5 h-5" />,
    tabTitle: "Búsqueda con Índice",
    diagramTitle: "Acceso Optimizado",
    description: "Cuando una tabla dispone de un índice, el sistema puede consultar primero esta estructura auxiliar para localizar directamente las filas relevantes. En lugar de examinar toda la tabla, el índice actúa como un mapa de acceso rápido, reduciendo significativamente el número de operaciones necesarias para encontrar los datos solicitados.",
    VisualComponent: IndexScanDiagram
  }
];

// --- LAYOUT COMPONENTS ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

interface LessonLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  visual: React.ReactNode;
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ header, content, visual }) => (
  // Main layout wrapper strictly using CSS Grid
  <div className="grid grid-rows-[auto_1fr] h-screen w-full bg-slate-100 font-sans text-slate-800 overflow-hidden">
    {/* Header Area */}
    <header className="bg-white border-b border-slate-200 shadow-sm z-10">
      {header}
    </header>
    
    {/* Main Content Area */}
    <main className="grid overflow-y-auto w-full p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-7xl w-full mx-auto h-max">
        {/* Left Column: Content */}
        <section className="grid content-start gap-6">
          {content}
        </section>
        
        {/* Right Column: Visual Render */}
        <section className="grid content-start">
          {visual}
        </section>
      </div>
    </main>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const activeData = tabsData[activeTabIndex];
  const ActiveVisual = activeData.VisualComponent;

  const headerContent = (
    <div className="grid grid-rows-[auto_auto] gap-6 p-4 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <div className="grid place-items-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg">
          <Database className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 m-0">
          Índices en Bases de Datos
        </h1>
      </div>
      
      {/* Tabs Navigation (Grid strictly) */}
      <nav className="grid grid-flow-col auto-cols-fr gap-2 bg-slate-100 p-1.5 rounded-lg overflow-x-auto">
        {tabsData.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabIndex(index)}
            className={`
              grid grid-flow-col auto-cols-max items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200
              ${activeTabIndex === index 
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent'
              }
            `}
            role="tab"
            aria-selected={activeTabIndex === index}
          >
            {tab.icon}
            <span className="whitespace-nowrap">{tab.tabTitle}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  const textContent = (
    <Card className="grid grid-rows-[auto_1fr] h-full p-6 lg:p-8">
      <div className="grid gap-2 border-b border-slate-100 pb-4 mb-4">
        <h2 className="text-3xl font-bold text-slate-800">
          {activeData.tabTitle}
        </h2>
      </div>
      <div className="grid text-lg leading-relaxed text-slate-600">
        <p>{activeData.description}</p>
      </div>
    </Card>
  );

  const visualContent = (
    <Card className="grid grid-rows-[auto_1fr] h-full">
      <div className="grid grid-flow-col auto-cols-max items-center gap-3 border-b border-slate-100 bg-slate-50/50 p-4 lg:px-6">
        <div className="grid place-items-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
          <Zap className="w-4 h-4" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 m-0">
          {activeData.diagramTitle}
        </h3>
      </div>
      <div className="grid place-items-center p-6 bg-white min-h-[400px]">
        <ActiveVisual />
      </div>
    </Card>
  );

  return (
    <LessonLayout 
      header={headerContent}
      content={textContent}
      visual={visualContent}
    />
  );
}