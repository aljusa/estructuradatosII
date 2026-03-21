
import  { useState } from 'react';
import { 
   XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  AreaChart, Area, } from 'recharts';
import { Database, Search, Layers, GitBranch, Zap,  AlertTriangle, CheckCircle } from 'lucide-react';

// --- Interfaces & Types ---
/**
 * @typedef {Object} Section
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {React.ReactNode} icon
 */

// --- Components ---

/**
 * Card Component: Contenedor estandarizado para secciones de contenido
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

/**
 * DiagramRender Component: Motor de renderizado dinámico basado en la pestaña activa
 */
interface DiagramRenderProps {
  activeTab: string;
}

const DiagramRender = ({ activeTab }: DiagramRenderProps) => {
  // Datos para el gráfico de impacto global (Tab 5)
  const performanceData = [
    { name: 'Sin Optimizar', tiempo: 100, recursos: 90 },
    { name: 'Indexación', tiempo: 60, recursos: 70 },
    { name: 'Evitar SELECT *', tiempo: 45, recursos: 55 },
    { name: 'Uso de Joins', tiempo: 20, recursos: 30 },
  ];

  switch (activeTab) {
    case 'costo':
      return (
        <div className="h-64 flex flex-col items-center justify-center p-4">
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="text-red-500 mb-2" size={32} />
              <span className="text-sm font-bold text-red-700 uppercase">Operación Costosa</span>
              <div className="w-full h-4 bg-red-200 rounded-full mt-2 overflow-hidden">
                <div className="w-full h-full bg-red-500 animate-pulse"></div>
              </div>
            </div>
            <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="text-green-500 mb-2" size={32} />
              <span className="text-sm font-bold text-green-700 uppercase">Minimización</span>
              <div className="w-full h-4 bg-green-200 rounded-full mt-2 overflow-hidden">
                <div className="w-1/4 h-full bg-green-500"></div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 italic">Visualización del consumo de recursos relativo</p>
        </div>
      );

    case 'select':
      return (
        <div className="h-64 grid grid-cols-2 gap-4 items-center justify-center p-4">
          <div className="border border-slate-300 rounded p-2 bg-slate-50">
            <p className="text-[10px] font-mono mb-2 text-red-600">SELECT * FROM Usuarios</p>
            <div className="grid grid-cols-4 gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-4 bg-red-300 rounded"></div>
              ))}
            </div>
            <p className="text-[10px] mt-2 text-center text-slate-500">Carga innecesaria de metadatos</p>
          </div>
          <div className="border border-blue-300 rounded p-2 bg-blue-50">
            <p className="text-[10px] font-mono mb-2 text-blue-600">SELECT id, nombre FROM Usuarios</p>
            <div className="grid grid-cols-4 gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`h-4 rounded ${i % 4 < 2 ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
              ))}
            </div>
            <p className="text-[10px] mt-2 text-center text-slate-500">Solo datos requeridos</p>
          </div>
        </div>
      );

    case 'subconsultas':
      return (
        <div className="h-64 flex items-center justify-center">
          <svg viewBox="0 0 400 200" className="w-full h-full max-w-sm">
            {/* Ciclo Ineficiente */}
            <circle cx="100" cy="100" r="40" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4" />
            <path d="M100 60 L100 40 L120 50 Z" fill="#ef4444" />
            <text x="100" y="105" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="bold">Repetición</text>
            
            {/* Flujo Optimizado */}
            <rect x="250" y="80" width="100" height="40" rx="4" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" />
            <text x="300" y="105" textAnchor="middle" fontSize="10" fill="#3b82f6" fontWeight="bold">Evaluación Única</text>
            
            <path d="M150 100 Q200 100 240 100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
        </div>
      );

    case 'joins':
      return (
        <div className="h-64 flex flex-col items-center justify-center p-4">
           <div className="flex gap-4 w-full h-full items-center">
             <div className="flex-1 text-center">
                <div className="bg-orange-100 p-2 rounded border border-orange-300 mb-2">
                  <p className="text-[10px] font-bold">Subconsulta Correlacionada</p>
                  <p className="text-[8px] italic">Fila x Consulta</p>
                </div>
                <div className="flex flex-col gap-1">
                   {[...Array(4)].map((_,i) => <div key={i} className="h-2 bg-orange-400 rounded w-full animate-pulse"></div>)}
                </div>
             </div>
             <div className="text-slate-400 font-bold">VS</div>
             <div className="flex-1 text-center">
                <div className="bg-indigo-100 p-2 rounded border border-indigo-300 mb-2">
                  <p className="text-[10px] font-bold">JOIN Operación</p>
                  <p className="text-[8px] italic">Procesado en Set</p>
                </div>
                <div className="h-10 bg-indigo-500 rounded w-full flex items-center justify-center">
                   <GitBranch size={16} className="text-white" />
                </div>
             </div>
           </div>
        </div>
      );

    case 'impacto':
      return (
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorTiempo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" fontSize={10} tick={{fill: '#64748b'}} />
              <YAxis fontSize={10} tick={{fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Area type="monotone" dataKey="tiempo" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTiempo)" name="Tiempo de Ejecución" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );

    default:
      return null;
  }
};

/**
 * LessonLayout Component: Estructura base del diseño
 */
interface LessonLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
sections: Section[];
}
interface Section {
  id: string;
  title: string;
  diagramTitle: string;
  description: string;
  icon: React.ReactNode;
  insights: string[];
  expertTip: string;
}
const LessonLayout = ({ activeTab, setActiveTab, sections }: LessonLayoutProps) => {
  const currentSection = sections.find(s => s.id === activeTab);

  return (
    /* Uso estricto de CSS Grid para el Layout Principal */
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      
      {/* Header Area */}
      <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Database size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Evitar operaciones costosas</h1>
        
          </div>
        </div>
        
        {/* Sistema de Pestañas (Nav) */}
        <nav className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto no-scrollbar">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
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

      {/* Main Content Area - Usando Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 p-6 max-w-7xl mx-auto w-full items-start">
        
        {/* Left Column: Text Content */}
        <section className="grid gap-6">
       
          
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white">
              {currentSection.diagramTitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentSection.description}
            </p>
          </div>

          <Card className="p-6 bg-slate-50 dark:bg-slate-900/50 border-dashed border-2">
           
            <ul className="grid gap-3">
              {currentSection.insights.map((insight: string, idx: number) => (
                <li key={idx} className="flex gap-3 text-sm">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Right Column: Visual Render */}
        <aside className="grid gap-4 sticky top-6">
          <Card className="p-4 bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900/30">
        
            
            <div className="bg-slate-50 dark:bg-slate-950 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
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

  const sections = [
    {
      id: 'costo',
      title: 'Principios',
      diagramTitle: '1. Principio de minimización de costo',
      description: 'Una heurística importante en la optimización de consultas consiste en evitar operaciones que incrementen innecesariamente el consumo de recursos. Algunas construcciones en SQL, aunque válidas, pueden generar planes de ejecución más costosos si no se utilizan con cuidado.',
      icon: <Search size={14} />,
      insights: [
        "El optimizador busca el plan con menor costo estimado.",
        "El costo se mide en I/O, CPU y uso de memoria.",
        "Ciertas sintaxis obligan a escaneos completos de tabla (Full Table Scans)."
      ],
      expertTip: "Antes de escribir una consulta compleja, revisa siempre el Plan de Ejecución (EXPLAIN) para identificar cuellos de botella."
    },
    {
      id: 'select',
      title: 'Evitar *',
      diagramTitle: '2. Evitar el uso de SELECT *',
      description: 'El uso de SELECT * implica recuperar todas las columnas de una tabla, incluso aquellas que no son necesarias. Esto incrementa el volumen de datos transferidos y procesados, afectando negativamente el rendimiento.',
      icon: <Layers size={14} />,
      insights: [
        "Aumenta la carga en la red por transferencia de datos extra.",
        "Impide que el optimizador utilice índices de solo cobertura.",
        "Añade overhead innecesario en el motor de renderizado del cliente."
      ],
      expertTip: "Define explícitamente solo las columnas que necesitas. Esto hace que tu código sea más mantenible y rápido."
    },
    {
      id: 'subconsultas',
      title: 'Subconsultas',
      diagramTitle: '3. Reducir subconsultas innecesarias',
      description: 'Las subconsultas pueden ser útiles, pero su uso excesivo o innecesario puede generar evaluaciones repetidas y aumentar el costo de ejecución. En muchos casos, pueden reemplazarse por estructuras más eficientes.',
      icon: <GitBranch size={14} />,
      insights: [
        "Las subconsultas en el SELECT se ejecutan para cada fila del resultado.",
        "Suelen ser difíciles de optimizar por el motor de base de datos.",
        "Incrementan la complejidad cognitiva del código SQL."
      ],
      expertTip: "Considera usar Expresiones de Tabla Comunes (CTEs) o tablas temporales para cálculos intermedios repetitivos."
    },
    {
      id: 'joins',
      title: 'Joins vs Subq',
      diagramTitle: '4. Preferir joins sobre subconsultas correlacionadas',
      description: 'Las subconsultas correlacionadas se ejecutan una vez por cada fila de la consulta externa, lo que puede resultar muy costoso. Los joins permiten procesar los datos de forma más directa y optimizada mediante algoritmos como Hash Join o Merge Join.',
      icon: <Zap size={14} />,
      insights: [
        "Los JOINS permiten al optimizador elegir el mejor orden de acceso.",
        "Las subconsultas correlacionadas suelen tener complejidad O(N*M).",
        "Los JOINS aprovechan mejor los índices de claves foráneas."
      ],
      expertTip: "Si ves una subconsulta dentro de un WHERE que depende de la tabla externa, probablemente sea un candidato para un LEFT o INNER JOIN."
    },
    {
      id: 'impacto',
      title: 'Impacto Global',
      diagramTitle: '5. Impacto global en el rendimiento',
      description: 'Evitar estas operaciones costosas contribuye a generar consultas más eficientes, reduciendo el tiempo de ejecución y el uso de recursos. Estas prácticas, combinadas con otras heurísticas, permiten mejorar significativamente el desempeño del sistema.',
      icon: <CheckCircle size={14} />,
      insights: [
        "Reducción drástica en el tiempo de respuesta de la aplicación.",
        "Menor degradación del sistema bajo alta concurrencia.",
        "Ahorro directo en costos de infraestructura (Cloud/On-premise)."
      ],
      expertTip: "La optimización no es un evento único, sino un proceso continuo de monitoreo y ajuste."
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