import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Database, 
  Code2, 
  Settings, 
  Play, 
  Network, 
  Search, 
  GitMerge, 
  Zap,
  Server,
  Layers
} from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

interface TabContent {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  diagram: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  lessonTitle: string;
  tabs: TabContent[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 grid p-6 gap-4 ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ lessonTitle, tabs, activeTabId, onTabChange }) => {
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div className="min-h-screen bg-slate-50 grid grid-rows-[auto_1fr] font-sans text-slate-800">
      {/* HEADER (Title & Nav) */}
      <header className="bg-slate-900 text-white grid grid-rows-[auto_auto] gap-6 px-8 py-6 shadow-md">
        <div className="grid grid-cols-[auto_1fr] items-center gap-4">
          <Database className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl font-bold tracking-tight">{lessonTitle}</h1>
        </div>
        
        {/* TABS NAVIGATION (CSS Grid based, NO Flexbox) */}
        <nav className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto pb-2 border-b border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid grid-cols-[auto_1fr] items-center gap-2 px-4 py-3 rounded-t-lg transition-colors duration-200 cursor-pointer border-b-2 ${
                activeTabId === tab.id 
                  ? 'bg-slate-800 border-blue-400 text-blue-400' 
                  : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
              aria-selected={activeTabId === tab.id}
              role="tab"
            >
              {tab.icon}
              <span className="font-medium whitespace-nowrap">{tab.title}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="p-8 grid place-items-start">
        <div className="w-full max-w-5xl mx-auto grid gap-6">
          <Card>
            <div className="grid gap-6">
              <div className="grid gap-2 border-b border-slate-100 pb-4">
                <h2 className="text-3xl font-bold text-slate-900">{activeTab.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {activeTab.description}
                </p>
              </div>
              
              {/* DIAGRAM RENDER */}
              <div className="grid place-items-center bg-slate-50 rounded-lg border border-slate-200 p-8 min-h-[400px]">
                {activeTab.diagram}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

// --- DIAGRAMAS ESPECÍFICOS ---

const IntroDiagram = () => (
  <div className="grid grid-cols-[auto_auto_auto_auto_auto] items-center gap-4 w-full max-w-3xl">
    <div className="grid place-items-center gap-2 p-4 bg-blue-100 text-blue-800 rounded-lg border border-blue-200">
      <Code2 className="w-8 h-8" />
      <span className="font-semibold text-sm">Consulta SQL</span>
    </div>
    <div className="grid place-items-center text-slate-400">→</div>
    <div className="grid place-items-center gap-2 p-6 bg-indigo-100 text-indigo-800 rounded-lg border border-indigo-200 w-48 text-center shadow-inner">
      <Server className="w-10 h-10" />
      <span className="font-bold">SGBD</span>
      <span className="text-xs">Motor de Procesamiento</span>
    </div>
    <div className="grid place-items-center text-slate-400">→</div>
    <div className="grid place-items-center gap-2 p-4 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-200">
      <Database className="w-8 h-8" />
      <span className="font-semibold text-sm">Resultados</span>
    </div>
  </div>
);

const PhasesDiagram = () => (
  <div className="grid grid-cols-3 gap-8 w-full max-w-4xl relative">
    {/* Conectores visuales de fondo */}
    <div className="absolute top-1/2 left-1/6 right-1/6 h-1 bg-slate-200 -z-10 translate-y-[-50%]"></div>
    
    <div className="grid grid-rows-[auto_1fr] gap-3 p-5 bg-white border-2 border-slate-200 rounded-xl shadow-sm relative">
      <div className="grid place-items-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mx-auto mb-2">
        <Search className="w-6 h-6" />
      </div>
      <div className="text-center grid gap-1">
        <h3 className="font-bold text-slate-800">1. Análisis</h3>
        <p className="text-xs text-slate-500">Verificación de sintaxis y traducción a representación interna.</p>
      </div>
    </div>

    <div className="grid grid-rows-[auto_1fr] gap-3 p-5 bg-white border-2 border-indigo-200 rounded-xl shadow-md relative transform scale-105">
      <div className="grid place-items-center w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full mx-auto mb-2">
        <Settings className="w-6 h-6" />
      </div>
      <div className="text-center grid gap-1">
        <h3 className="font-bold text-indigo-900">2. Optimización</h3>
        <p className="text-xs text-indigo-700/70">Evaluación de planes y selección del más eficiente.</p>
      </div>
    </div>

    <div className="grid grid-rows-[auto_1fr] gap-3 p-5 bg-white border-2 border-slate-200 rounded-xl shadow-sm relative">
      <div className="grid place-items-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mx-auto mb-2">
        <Play className="w-6 h-6" />
      </div>
      <div className="text-center grid gap-1">
        <h3 className="font-bold text-slate-800">3. Ejecución</h3>
        <p className="text-xs text-slate-500">Aplicación de algoritmos sobre los datos físicos.</p>
      </div>
    </div>
  </div>
);

const TreeDiagram = () => (
  <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto">
    {/* Líneas conectoras */}
    <path d="M200 50 L200 120" stroke="#CBD5E1" strokeWidth="2" fill="none" />
    <path d="M200 150 L100 220" stroke="#CBD5E1" strokeWidth="2" fill="none" />
    <path d="M200 150 L300 220" stroke="#CBD5E1" strokeWidth="2" fill="none" />
    
    {/* Nodos */}
    <g transform="translate(200, 35)">
      <rect x="-60" y="-20" width="120" height="40" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" fill="#1E3A8A" fontSize="14" fontWeight="bold">PROJECTION</text>
    </g>
    
    <g transform="translate(200, 135)">
      <rect x="-50" y="-20" width="100" height="40" rx="6" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" fill="#312E81" fontSize="14" fontWeight="bold">JOIN</text>
    </g>
    
    <g transform="translate(100, 235)">
      <rect x="-40" y="-20" width="80" height="40" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="bold">Tabla A</text>
    </g>
    
    <g transform="translate(300, 235)">
      <rect x="-40" y="-20" width="80" height="40" rx="6" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" fill="#475569" fontSize="14" fontWeight="bold">Tabla B</text>
    </g>
  </svg>
);

const AccessDiagram = () => (
  <div className="grid grid-rows-2 gap-8 w-full max-w-2xl">
    {/* Escaneo Secuencial */}
    <div className="grid grid-cols-[150px_1fr] items-center gap-4 bg-white p-4 rounded-xl border border-rose-200">
      <div className="font-bold text-rose-800 text-sm text-right">Escaneo Secuencial</div>
      <div className="relative h-12 grid place-items-center">
        <div className="w-full h-2 bg-rose-100 rounded-full absolute"></div>
        <div className="absolute left-0 grid grid-cols-8 w-full gap-1 px-1">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-4 bg-rose-300 rounded-sm"></div>
          ))}
        </div>
        <div className="w-full h-full absolute grid place-items-center animate-pulse">
           <div className="h-1 w-full bg-rose-500/50"></div>
        </div>
      </div>
    </div>
    
    {/* Escaneo por Índice */}
    <div className="grid grid-cols-[150px_1fr] items-center gap-4 bg-white p-4 rounded-xl border border-emerald-200">
      <div className="font-bold text-emerald-800 text-sm text-right">Uso de Índices</div>
      <div className="relative h-12 grid place-items-center">
         <div className="w-full h-2 bg-slate-100 rounded-full absolute"></div>
         <div className="absolute left-0 grid grid-cols-8 w-full gap-1 px-1">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className={`h-4 rounded-sm ${i === 6 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
          ))}
        </div>
        {/* Flecha directa */}
        <svg className="absolute w-full h-full" preserveAspectRatio="none">
           <path d="M 10 24 Q 150 -10 320 18" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4"/>
           <polygon points="320,18 312,14 315,22" fill="#10B981" />
        </svg>
      </div>
    </div>
  </div>
);

const JoinsDiagram = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
    <div className="grid grid-rows-[auto_1fr] gap-4 p-5 bg-white border border-slate-200 rounded-lg text-center">
      <h4 className="font-bold text-slate-800 border-b pb-2">Nested Loop</h4>
      <div className="grid place-items-center h-32">
        <div className="grid gap-2">
          <div className="w-24 h-6 border-2 border-blue-400 rounded grid grid-cols-3 gap-1 p-1">
            <div className="bg-blue-200"></div><div className="bg-slate-100"></div><div className="bg-slate-100"></div>
          </div>
          <span className="text-slate-400 text-xs">x</span>
          <div className="w-24 h-16 border-2 border-indigo-400 rounded grid grid-rows-3 gap-1 p-1">
             <div className="bg-indigo-200"></div><div className="bg-slate-100"></div><div className="bg-slate-100"></div>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">Itera sobre cada fila de la primera tabla contra todas las de la segunda.</p>
    </div>

    <div className="grid grid-rows-[auto_1fr] gap-4 p-5 bg-white border border-slate-200 rounded-lg text-center">
      <h4 className="font-bold text-slate-800 border-b pb-2">Hash Join</h4>
      <div className="grid place-items-center h-32">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
           <div className="w-12 h-16 bg-blue-100 border-2 border-blue-400 rounded grid place-items-center text-xs font-mono">H(x)</div>
           <div className="text-slate-400">→</div>
           <div className="w-16 h-20 bg-slate-100 border-2 border-slate-400 rounded grid gap-1 p-1">
             <div className="bg-emerald-300 h-3 w-full"></div>
             <div className="bg-slate-200 h-3 w-full"></div>
             <div className="bg-slate-200 h-3 w-full"></div>
           </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">Crea una tabla hash en memoria para la tabla más pequeña para búsquedas O(1).</p>
    </div>

    <div className="grid grid-rows-[auto_1fr] gap-4 p-5 bg-white border border-slate-200 rounded-lg text-center">
      <h4 className="font-bold text-slate-800 border-b pb-2">Merge Join</h4>
      <div className="grid place-items-center h-32">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
           <div className="w-12 border-2 border-blue-400 rounded grid gap-1 p-1">
             <div className="text-[10px] text-center bg-blue-100">1</div>
             <div className="text-[10px] text-center bg-blue-100">2</div>
             <div className="text-[10px] text-center bg-blue-100">3</div>
           </div>
           <div className="grid place-items-center h-full text-slate-400"><GitMerge className="w-5 h-5"/></div>
           <div className="w-12 border-2 border-indigo-400 rounded grid gap-1 p-1">
             <div className="text-[10px] text-center bg-indigo-100">1</div>
             <div className="text-[10px] text-center bg-indigo-100">2</div>
             <div className="text-[10px] text-center bg-indigo-100">4</div>
           </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">Requiere datos pre-ordenados. Avanza simultáneamente por ambas tablas.</p>
    </div>
  </div>
);

const chartData = [
  { name: 'Plan Subóptimo (Escaneo Completo)', tiempo: 1250, fill: '#ef4444' },
  { name: 'Plan Optimizado (Índices + Hash Join)', tiempo: 85, fill: '#10b981' },
];

const OptimizationDiagram = () => (
  <div className="w-full h-80 max-w-3xl">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
        <XAxis type="number" unit=" ms" stroke="#64748B" />
        <YAxis dataKey="name" type="category" width={250} stroke="#475569" fontWeight="500" />
        <Tooltip 
          cursor={{fill: '#F1F5F9'}} 
          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
        />
        <Legend />
        <Bar dataKey="tiempo" name="Tiempo de Ejecución (ms)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// --- DATOS DE LA LECCIÓN ---

const lessonData: TabContent[] = [
  {
    id: 'intro',
    icon: <Database className="w-5 h-5" />,
    title: '1. Introducción al procesamiento',
    description: 'Cuando se ejecuta una consulta en SQL, el sistema gestor de bases de datos (SGBD) no se limita a interpretar literalmente la instrucción. En realidad, transforma la consulta en una serie de operaciones internas que pueden ejecutarse de manera eficiente sobre los datos almacenados.',
    diagram: <IntroDiagram />
  },
  {
    id: 'fases',
    icon: <Layers className="w-5 h-5" />,
    title: '2. Fases del procesamiento',
    description: 'El procesamiento se divide en tres fases principales: análisis (verificación y traducción), optimización (evaluación de planes de ejecución) y ejecución (aplicación de algoritmos seleccionados sobre los datos físicos).',
    diagram: <PhasesDiagram />
  },
  {
    id: 'representacion',
    icon: <Network className="w-5 h-5" />,
    title: '3. Representación interna',
    description: 'Una vez analizada, la consulta se transforma en un árbol de consulta. Cada nodo del árbol representa una operación relacional (selección, proyección, unión) y las hojas representan las tablas involucradas.',
    diagram: <TreeDiagram />
  },
  {
    id: 'acceso',
    icon: <Search className="w-5 h-5" />,
    title: '4. Algoritmos de acceso a datos',
    description: 'Para recuperar datos, el SGBD utiliza diferentes enfoques. El escaneo secuencial revisa todos los registros, mientras que el uso de índices permite accesos directos mucho más rápidos, reduciendo la carga de I/O.',
    diagram: <AccessDiagram />
  },
  {
    id: 'operaciones',
    icon: <GitMerge className="w-5 h-5" />,
    title: '5. Operaciones relacionales',
    description: 'Operaciones complejas como JOIN se implementan mediante algoritmos específicos (Nested Loop, Hash Join, Merge Join), cada uno con diferentes costos computacionales dependiendo de la distribución de los datos.',
    diagram: <JoinsDiagram />
  },
  {
    id: 'optimizacion',
    icon: <Zap className="w-5 h-5" />,
    title: '6. Importancia de la optimización',
    description: 'La elección del plan de ejecución adecuado es vital. Dos consultas lógicamente equivalentes pueden tener tiempos de ejecución drásticamente diferentes dependiendo de las decisiones tomadas por el optimizador del SGBD.',
    diagram: <OptimizationDiagram />
  }
];

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(lessonData[0].id);

  return (
    <LessonLayout
      lessonTitle="Algoritmos básicos para el procesamiento de consultas"
      tabs={lessonData}
      activeTabId={activeTab}
      onTabChange={setActiveTab}
    />
  );
}