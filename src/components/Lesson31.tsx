import  { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  Database, Search, Layers, GitBranch, Zap, 
  AlertTriangle, CheckCircle, Info 
} from 'lucide-react';

// --- Interfaces & Types ---

interface Section {
  id: string;
  title: string;
  diagramTitle: string;
  description: string;
  icon: React.ReactNode;
  insights: string[];
  expertTip: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface DiagramRenderProps {
  activeTab: string;
}

interface LessonLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sections: Section[];
}

// --- Components ---

/**
 * Card Component: Contenedor estandarizado con Grid interno.
 */
const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden grid ${className}`}>
    {children}
  </div>
);

/**
 * DiagramRender: Motor de renderizado dinámico basado en la pestaña activa.
 */
const DiagramRender = ({ activeTab }: DiagramRenderProps) => {
  const performanceData = [
    { name: 'Sin Optimizar', tiempo: 100, recursos: 90 },
    { name: 'Indexación', tiempo: 60, recursos: 70 },
    { name: 'Evitar SELECT *', tiempo: 45, recursos: 55 },
    { name: 'Uso de Joins', tiempo: 20, recursos: 30 },
  ];

  switch (activeTab) {
    case 'costo':
      return (
        <div className="h-64 grid place-content-center p-4">
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="grid place-items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="text-red-500 mb-2" size={32} />
              <span className="text-[10px] font-bold text-red-700 dark:text-red-400 uppercase text-center">Operación Costosa</span>
              <div className="w-full h-3 bg-red-200 dark:bg-red-800 rounded-full mt-2 overflow-hidden">
                <div className="w-full h-full bg-red-500 animate-pulse"></div>
              </div>
            </div>
            <div className="grid place-items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <CheckCircle className="text-green-500 mb-2" size={32} />
              <span className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase text-center">Optimizado</span>
              <div className="w-full h-3 bg-green-200 dark:bg-green-800 rounded-full mt-2 overflow-hidden">
                <div className="w-1/4 h-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-[10px] text-slate-500 italic text-center">Consumo relativo de CPU e I/O</p>
        </div>
      );

    case 'select':
      return (
        <div className="h-64 grid grid-cols-2 gap-4 items-center p-4">
          <div className="border border-slate-300 dark:border-slate-600 rounded p-2 bg-slate-50 dark:bg-slate-900">
            <p className="text-[10px] font-mono mb-2 text-red-600 dark:text-red-400">SELECT *</p>
            <div className="grid grid-cols-4 gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-3 bg-red-300 dark:bg-red-700 rounded"></div>
              ))}
            </div>
          </div>
          <div className="border border-blue-300 dark:border-blue-800 rounded p-2 bg-blue-50 dark:bg-blue-900/30">
            <p className="text-[10px] font-mono mb-2 text-blue-600 dark:text-blue-400">SELECT id, name</p>
            <div className="grid grid-cols-4 gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`h-3 rounded ${i % 4 < 2 ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'subconsultas':
      return (
        <div className="h-64 grid place-items-center">
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-sm">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orientation="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill="#94a3b8" />
              </marker>
            </defs>
            <circle cx="100" cy="100" r="40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="bold">Repetición O(N)</text>
            <rect x="250" y="80" width="110" height="40" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
            <text x="305" y="105" textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="bold">Set Processing</text>
            <path d="M150 100 Q200 100 240 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" fill="none" />
          </svg>
        </div>
      );

    case 'joins':
      return (
        <div className="h-64 grid grid-cols-[1fr_auto_1fr] gap-4 items-center p-4">
          <div className="grid gap-2 text-center">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded border border-orange-300 dark:border-orange-800">
              <p className="text-[10px] font-bold text-orange-800 dark:text-orange-400">Correlated Subq</p>
              <p className="text-[8px] italic">Fila x Consulta</p>
            </div>
            <div className="grid gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-2 bg-orange-400 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="text-slate-400 font-bold text-xs px-2">VS</div>
          <div className="grid gap-2 text-center">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded border border-indigo-300 dark:border-indigo-800">
              <p className="text-[10px] font-bold text-indigo-800 dark:text-indigo-400">Hash / Merge JOIN</p>
              <p className="text-[8px] italic">Batch Processing</p>
            </div>
            <div className="h-10 bg-indigo-500 rounded grid place-items-center">
              <GitBranch size={16} className="text-white" />
            </div>
          </div>
        </div>
      );

    case 'impacto':
      return (
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTiempo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" fontSize={9} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
              <YAxis fontSize={9} tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{backgroundColor: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none', fontSize: '12px'}}
              />
              <Area type="monotone" dataKey="tiempo" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorTiempo)" name="Latencia" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );

    default:
      return null;
  }
};

/**
 * LessonLayout: Estructura base utilizando CSS Grid para el layout principal.
 */
const LessonLayout = ({ activeTab, setActiveTab, sections }: LessonLayoutProps) => {
  const currentSection = sections.find(s => s.id === activeTab);
  if (!currentSection) return null;

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Header Area - CSS Grid */}
      <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-6 z-10 sticky top-0">
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Heurísticas de Optimización</h1>
          
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="grid grid-flow-col auto-cols-auto gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`grid grid-cols-[auto_1fr] items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                activeTab === section.id 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {section.icon}
              {section.title}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area - Layout de 2 columnas en Desktop con Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 p-6 max-w-7xl mx-auto w-full content-start">
        
        {/* Left Column: Contenido Educativo */}
        <section className="grid gap-6 content-start">
          <div className="grid gap-4">
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white">
              {currentSection.diagramTitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-5 border-dashed border-2 bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-900/50">
              <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
                <Info size={16} /> Conceptos Clave
              </h3>
              <ul className="grid gap-3">
                {currentSection.insights.map((insight, idx) => (
                  <li key={idx} className="grid grid-cols-[auto_1fr] gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5 bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-400 mb-2 flex items-center gap-2">
                <Zap size={16} /> Tip de Experto
              </h3>
              <p className="text-sm text-amber-800 dark:text-amber-200 italic leading-snug">
                "{currentSection.expertTip}"
              </p>
            </Card>
          </div>
        </section>

        {/* Right Column: Visualización Interactiva */}
        <aside className="grid content-start sticky top-24">
          <Card className="p-4 bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/30 shadow-lg">
            <div className="grid grid-cols-[1fr_auto] items-center mb-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-950 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
              <DiagramRender activeTab={activeTab} />
            </div>
     
          </Card>
        </aside>

      </main>
    </div>
  );
};

/**
 * Main App Component
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('costo');

  const sections: Section[] = [
    {
      id: 'costo',
      title: 'Principios',
      diagramTitle: '1. Minimización de Costos',
      description: 'La optimización de consultas SQL se basa en heurísticas que buscan reducir el consumo de recursos (I/O, CPU y Memoria). Ciertas sintaxis obligan al motor a realizar tareas pesadas que pueden evitarse.',
      icon: <Search size={14} />,
      insights: [
        "El costo se calcula basándose en el número de páginas de disco leídas.",
        "El optimizador utiliza estadísticas de tabla para decidir el mejor camino.",
        "Un mal diseño de consulta puede ignorar los índices existentes."
      ],
      expertTip: "Usa siempre 'EXPLAIN ANALYZE' para comparar el costo estimado contra el tiempo de ejecución real."
    },
    {
      id: 'select',
      title: 'Evitar *',
      diagramTitle: '2. El Peligro de SELECT *',
      description: 'Recuperar todas las columnas aumenta drásticamente el tráfico de red y el uso de memoria en el servidor y cliente. Además, impide el uso de índices de cobertura.',
      icon: <Layers size={14} />,
      insights: [
        "Transfiere metadatos y tipos de datos (como BLOBs) innecesarios.",
        "Aumenta la probabilidad de fallos si el esquema de la tabla cambia.",
        "Reduce la eficiencia de la caché de resultados del motor."
      ],
      expertTip: "Sé explícito. Solo pide los campos que tu interfaz o lógica de negocio realmente va a consumir."
    },
    {
      id: 'subconsultas',
      title: 'Subconsultas',
      diagramTitle: '3. Optimización de Subconsultas',
      description: 'Las subconsultas, especialmente en la cláusula SELECT o WHERE, pueden actuar como bucles anidados ocultos, evaluándose repetidamente para cada registro procesado.',
      icon: <GitBranch size={14} />,
      insights: [
        "Las subconsultas 'escalares' son evaluadas por cada fila del conjunto externo.",
        "Dificultan que el optimizador realice 'predicado pushdown'.",
        "A menudo pueden refactorizarse como CTEs para mejor legibilidad."
      ],
      expertTip: "Si una subconsulta devuelve múltiples filas para filtrar, utiliza IN o EXISTS preferiblemente."
    },
    {
      id: 'joins',
      title: 'Joins vs Subq',
      diagramTitle: '4. El Poder de los JOINS',
      description: 'Los motores de bases de datos están altamente optimizados para realizar uniones. Los algoritmos como Hash Join permiten procesar grandes volúmenes de datos mucho más rápido que las subconsultas correlacionadas.',
      icon: <Zap size={14} />,
      insights: [
        "Los JOINS permiten el procesamiento en paralelo de conjuntos de datos.",
        "Permiten el uso eficiente de índices en claves primarias y foráneas.",
        "Facilitan al motor la reordenación de tablas para minimizar el set intermedio."
      ],
      expertTip: "Prefiere INNER JOIN sobre subconsultas correlacionadas en un 90% de los casos de filtrado por relación."
    },
    {
      id: 'impacto',
      title: 'Impacto Global',
      diagramTitle: '5. Resultados del Rendimiento',
      description: 'Aplicar estas reglas no es opcional en sistemas de alta concurrencia. Una consulta bien optimizada puede ser órdenes de magnitud más rápida y barata de ejecutar.',
      icon: <CheckCircle size={14} />,
      insights: [
        "Mejora la escalabilidad permitiendo más usuarios con el mismo hardware.",
        "Reduce los bloqueos (locks) en tablas, evitando el 'deadlock'.",
        "Disminuye significativamente la factura en servicios de Cloud DB."
      ],
      expertTip: "La optimización prematura es la raíz de todos los males, pero la optimización de SQL es una base de arquitectura necesaria."
    }
  ];

  return (
    <LessonLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      sections={sections} 
    />
  );
}