import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Clock, 
   
  ListOrdered,
  Server,
  
  ArrowRight
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface SectionData {
  id: string;
  tabTitle: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  diagramTitle: string;
  diagramDescription: string;
}

// --- DATA ---

const lessonData: SectionData[] = [
  {
    id: 'relacion',
    tabTitle: 'Organización y Rendimiento',
    icon: <Database className="w-5 h-5" />,
    title: 'Relación entre organización de datos y rendimiento',
    description: 'La organización de los datos influye directamente en el rendimiento de un sistema de bases de datos. Cuando los datos están estructurados de manera eficiente, el sistema puede localizar y recuperar la información utilizando menos operaciones. En cambio, una organización deficiente obliga al sistema a revisar más registros o realizar más procesos internos, lo que incrementa el tiempo de respuesta de las consultas.',
    diagramTitle: 'Esfuerzo Computacional: Desorganizado vs Optimizado',
    diagramDescription: 'Comparación de estructuras de almacenamiento. A la izquierda, datos desorganizados requieren múltiples saltos para encontrar el objetivo. A la derecha, el acceso directo en una estructura optimizada.'
  },
  {
    id: 'tiempo',
    tabTitle: 'Tiempo de Respuesta',
    icon: <Clock className="w-5 h-5" />,
    title: 'Reducción del tiempo de respuesta en consultas',
    description: 'Una organización eficiente de los datos permite reducir significativamente el tiempo de respuesta de las consultas. Cuando el sistema puede identificar rápidamente la ubicación de los registros relevantes, las operaciones de búsqueda se ejecutan con mayor rapidez, lo que mejora la experiencia del usuario y la eficiencia del sistema.',
    diagramTitle: 'Ejecución de Consultas: Secuencial vs Directa',
    diagramDescription: 'Dos consultas en ejecución. La ruta superior muestra un escaneo completo (muchos pasos) que retrasa el resultado. La ruta inferior muestra un acceso indexado rápido.'
  },
  {
    id: 'lectura',
    tabTitle: 'Operaciones de Lectura',
    icon: <Search className="w-5 h-5" />,
    title: 'Optimización de operaciones de lectura',
    description: 'La mayoría de las operaciones en una base de datos corresponden a lectura de información. Una buena organización de datos facilita estas operaciones al permitir que el sistema acceda directamente a los bloques o páginas que contienen la información requerida. Esto reduce el número de accesos al almacenamiento y mejora el rendimiento general del sistema.',
    diagramTitle: 'Acceso a Bloques en Disco',
    diagramDescription: 'Esquema de almacenamiento físico. La consulta apunta directamente a los bloques de datos necesarios (resaltados), ignorando el resto del disco para ahorrar operaciones I/O.'
  },
  {
    id: 'volumen',
    tabTitle: 'Grandes Volúmenes',
    icon: <Server className="w-5 h-5" />,
    title: 'Gestión eficiente de grandes volúmenes de datos',
    description: 'En sistemas que manejan grandes volúmenes de información, la organización de los datos se vuelve aún más crítica. Estructuras adecuadas permiten que el sistema gestione millones de registros sin degradar significativamente el rendimiento. Sin mecanismos de organización eficientes, el crecimiento del volumen de datos puede provocar un aumento considerable en los tiempos de procesamiento.',
    diagramTitle: 'Escalabilidad del Rendimiento',
    diagramDescription: 'Comparación entre una base de datos pequeña y una masiva. Gracias a las estructuras de árbol balanceadas (B-Trees), la profundidad de búsqueda aumenta de forma logarítmica, manteniendo tiempos de acceso controlados.'
  },
  {
    id: 'indices',
    tabTitle: 'Papel de los Índices',
    icon: <ListOrdered className="w-5 h-5" />,
    title: 'Papel de los índices en el rendimiento',
    description: 'Los índices son uno de los mecanismos más importantes para mejorar el rendimiento en el acceso a los datos. Actúan como estructuras auxiliares que permiten localizar registros rápidamente sin recorrer toda la tabla. Gracias a los índices, el sistema puede ejecutar consultas de manera más eficiente, especialmente cuando se realizan búsquedas frecuentes sobre determinadas columnas.',
    diagramTitle: 'Mecanismo de Indexación',
    diagramDescription: 'El motor de búsqueda consulta primero el índice (lista ordenada a la izquierda) para obtener los punteros exactos, y luego extrae directamente los registros de la tabla principal (derecha).'
  }
];

// --- COMPONENTS ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const DiagramRender: React.FC<{ activeId: string }> = ({ activeId }) => {
  // Uso de CSS Grid y SVG para visualizaciones técnicas puras sin flexbox.
  const renderVisual = () => {
    switch (activeId) {
      case 'relacion':
        return (
          <div className="grid grid-cols-2 gap-8 w-full h-full p-4 items-center justify-items-center">
            {/* Desorganizado */}
            <div className="grid grid-rows-[auto_1fr] gap-4 w-full h-full">
              <span className="text-center font-semibold text-rose-600">Almacenamiento Desorganizado</span>
              <div className="grid bg-rose-50 rounded-lg p-6 relative w-full h-full min-h-[200px]">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                  <path d="M20,20 L80,50 L40,120 L150,40 L160,160 L90,180" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
                  <circle cx="20" cy="20" r="8" fill="#fda4af" />
                  <circle cx="80" cy="50" r="8" fill="#fda4af" />
                  <circle cx="40" cy="120" r="8" fill="#fda4af" />
                  <circle cx="150" cy="40" r="8" fill="#fda4af" />
                  <circle cx="160" cy="160" r="8" fill="#fda4af" />
                  <circle cx="90" cy="180" r="12" fill="#e11d48" /> {/* Target */}
                </svg>
              </div>
            </div>
            {/* Optimizado */}
            <div className="grid grid-rows-[auto_1fr] gap-4 w-full h-full">
              <span className="text-center font-semibold text-emerald-600">Almacenamiento Optimizado</span>
              <div className="grid bg-emerald-50 rounded-lg p-6 relative w-full h-full min-h-[200px]">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                  <path d="M20,20 L160,160" fill="none" stroke="#10b981" strokeWidth="3" />
                  <circle cx="20" cy="20" r="8" fill="#6ee7b7" />
                  <circle cx="160" cy="160" r="12" fill="#059669" /> {/* Target */}
                  
                  {/* Grid background representation */}
                  <rect x="140" y="140" width="40" height="40" rx="4" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4 2"/>
                </svg>
              </div>
            </div>
          </div>
        );
      
      case 'tiempo':
        return (
          <div className="grid grid-rows-2 gap-8 w-full h-full p-8 items-center">
            <div className="grid grid-cols-[150px_1fr] gap-4 items-center">
              <span className="font-medium text-slate-600 text-sm">Escaneo de Tabla (Lento)</span>
              <div className="grid items-center relative h-12 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="absolute left-0 top-0 bottom-0 w-[85%] bg-rose-200 opacity-50"></div>
                <div className="grid grid-cols-10 gap-1 px-2 z-10">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="h-6 bg-slate-300 rounded-sm"></div>
                  ))}
                  <div className="h-6 bg-rose-500 rounded-sm animate-pulse"></div>
                </div>
                <span className="absolute right-4 text-rose-700 font-bold text-xs z-20">900ms</span>
              </div>
            </div>

            <div className="grid grid-cols-[150px_1fr] gap-4 items-center">
              <span className="font-medium text-slate-600 text-sm">Búsqueda por Índice (Rápido)</span>
              <div className="grid items-center relative h-12 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-emerald-200 opacity-50"></div>
                <div className="grid grid-cols-10 gap-1 px-2 z-10 w-[10%]">
                  <div className="h-6 bg-emerald-500 rounded-sm w-[40px] absolute left-2"></div>
                </div>
                <span className="absolute right-4 text-emerald-700 font-bold text-xs z-20">15ms</span>
              </div>
            </div>
          </div>
        );

      case 'lectura':
        return (
          <div className="grid grid-cols-[200px_1fr] gap-8 w-full h-full p-8 items-center">
            <div className="grid grid-rows-[auto_auto] gap-4 justify-items-center">
              <div className="bg-blue-100 text-blue-800 p-4 rounded-lg border border-blue-200 shadow-sm text-center">
                <Search className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <span className="font-bold text-sm">Consulta SQL</span>
                <p className="text-xs mt-1 text-blue-600">SELECT * FROM logs WHERE id IN (12, 45)</p>
              </div>
              <ArrowRight className="text-slate-400 w-8 h-8 rotate-90 md:rotate-0" />
            </div>

            <div className="grid grid-cols-6 grid-rows-6 gap-2 bg-slate-100 p-6 rounded-xl border border-slate-300 relative">
              <span className="absolute -top-3 left-4 bg-slate-100 px-2 text-xs font-bold text-slate-500 rounded">Almacenamiento en Disco (Bloques)</span>
              {[...Array(36)].map((_, i) => {
                const isTarget = i === 12 || i === 25;
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded shadow-sm border ${
                      isTarget 
                        ? 'bg-emerald-400 border-emerald-600 animate-pulse' 
                        : 'bg-white border-slate-200'
                    }`}
                  ></div>
                );
              })}
              {/* Conexión directa (simulada con SVG sobre el grid) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                <path d="M-50,80 Q50,80 80,110" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4" />
                <path d="M-50,80 Q100,20 220,180" fill="none" stroke="#059669" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        );

      case 'volumen':
        return (
          <div className="grid grid-cols-2 gap-8 w-full h-full p-8 items-end">
            <div className="grid grid-rows-[1fr_auto_auto] gap-4 justify-items-center h-full">
              <div className="w-32 bg-slate-200 rounded-t-xl relative border-x border-t border-slate-300 grid items-end overflow-hidden" style={{ height: '100px' }}>
                <div className="bg-blue-400 w-full h-full opacity-50"></div>
                <div className="absolute inset-0 grid grid-rows-3 gap-1 p-2">
                   <div className="bg-white/60 rounded h-full w-1/2 mx-auto"></div>
                   <div className="grid grid-cols-2 gap-1 h-full"><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div></div>
                   <div className="grid grid-cols-4 gap-1 h-full"><div className="bg-white/80 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div></div>
                </div>
              </div>
              <span className="font-bold text-slate-700">10,000 Registros</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">Profundidad B-Tree: 3 niveles</span>
            </div>

            <div className="grid grid-rows-[1fr_auto_auto] gap-4 justify-items-center h-full">
              <div className="w-48 bg-slate-200 rounded-t-xl relative border-x border-t border-slate-300 grid items-end overflow-hidden" style={{ height: '250px' }}>
                <div className="bg-indigo-500 w-full h-full opacity-50"></div>
                <div className="absolute inset-0 grid grid-rows-4 gap-2 p-4">
                   <div className="bg-white/60 rounded h-full w-1/4 mx-auto"></div>
                   <div className="grid grid-cols-2 gap-2 h-full w-1/2 mx-auto"><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div></div>
                   <div className="grid grid-cols-4 gap-1 h-full w-3/4 mx-auto"><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div></div>
                   <div className="grid grid-cols-8 gap-0.5 h-full"><div className="bg-white/80 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div><div className="bg-white/60 rounded"></div></div>
                </div>
              </div>
              <span className="font-bold text-slate-700">10,000,000 Registros</span>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">Profundidad B-Tree: 4 niveles</span>
            </div>
          </div>
        );

      case 'indices':
        return (
          <div className="grid grid-cols-[minmax(150px,1fr)_auto_minmax(250px,2fr)] gap-6 w-full h-full p-6 items-center">
            
            {/* Index Table */}
            <div className="grid grid-rows-[auto_1fr] gap-2">
              <div className="bg-amber-100 text-amber-800 text-xs font-bold p-2 text-center rounded border border-amber-200">Estructura del Índice</div>
              <div className="grid grid-rows-5 gap-1 bg-white border border-slate-200 rounded p-2 shadow-sm">
                <div className="grid grid-cols-2 text-xs font-mono bg-slate-50 p-1 border-b"><span className="text-slate-500">Clave</span><span>Puntero</span></div>
                <div className="grid grid-cols-2 text-xs font-mono p-1"><span>A</span><span>0x04</span></div>
                <div className="grid grid-cols-2 text-xs font-mono p-1 bg-amber-50 border border-amber-200 rounded relative z-10"><span>B</span><span>0x08</span></div>
                <div className="grid grid-cols-2 text-xs font-mono p-1"><span>C</span><span>0x01</span></div>
                <div className="grid grid-cols-2 text-xs font-mono p-1"><span>D</span><span>0x05</span></div>
              </div>
            </div>

            {/* Arrows */}
            <div className="grid items-center h-full relative w-8">
              <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ zIndex: 20 }}>
                <path d="M0,120 C 40,120 40,180 80,180" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)"/>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#d97706" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Main Table */}
            <div className="grid grid-rows-[auto_1fr] gap-2">
              <div className="bg-slate-700 text-white text-xs font-bold p-2 text-center rounded">Tabla Principal de Datos (Desordenada)</div>
              <div className="grid grid-rows-6 gap-1 bg-white border border-slate-200 rounded p-2 shadow-sm">
                <div className="grid grid-cols-[40px_1fr] text-xs font-mono bg-slate-50 p-1 border-b"><span className="text-slate-400">Ref</span><span>Datos Completos</span></div>
                <div className="grid grid-cols-[40px_1fr] text-xs font-mono p-1 text-slate-400"><span>0x01</span><span>{'{id: 3, val: "C"}'}</span></div>
                <div className="grid grid-cols-[40px_1fr] text-xs font-mono p-1 text-slate-400"><span>0x02</span><span>{'{id: 5, val: "E"}'}</span></div>
                <div className="grid grid-cols-[40px_1fr] text-xs font-mono p-1 text-slate-400"><span>0x03</span><span>{'{id: 6, val: "F"}'}</span></div>
                <div className="grid grid-cols-[40px_1fr] text-xs font-mono p-1 text-slate-400"><span>0x04</span><span>{'{id: 1, val: "A"}'}</span></div>
                <div className="grid grid-cols-[40px_1fr] text-xs font-mono p-1 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 font-bold"><span>0x08</span><span>{'{id: 2, val: "B"}'}</span></div>
              </div>
            </div>

          </div>
        );

      default:
        return <div>Seleccione una sección</div>;
    }
  };

  return (
    <div className="grid w-full h-full bg-slate-50 rounded-lg border border-slate-200 overflow-hidden relative min-h-[400px]">
      {renderVisual()}
    </div>
  );
};

// --- MAIN LAYOUT & APP COMPONENT ---

const LessonLayout: React.FC<{
  data: SectionData[];
  activeTab: string;
  onTabChange: (id: string) => void;
}> = ({ data, activeTab, onTabChange }) => {
  
  const activeSection = data.find(d => d.id === activeTab) || data[0];

  return (
    // CONTENEDOR PRINCIPAL: Solo CSS Grid (grid-rows-[auto_1fr])
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* HEADER: Solo CSS Grid */}
      <header className="grid grid-rows-[auto_auto] gap-6 p-6 bg-white shadow-sm z-10 border-b border-slate-200">
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center max-w-7xl mx-auto w-full">
          <div className="grid bg-blue-600 p-2 rounded-lg text-white">
            <Database className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Importancia de la Organización de Datos en el Rendimiento del Sistema
          </h1>
        </div>

        {/* NAVEGACIÓN (TABS): Solo CSS Grid */}
        <nav className="grid max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {data.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`grid grid-cols-[auto_1fr] gap-2 items-center p-3 text-sm font-medium rounded-t-lg border-b-4 transition-colors text-left ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700 bg-blue-50/50'
                    : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                {tab.icon}
                <span className="truncate">{tab.tabTitle}</span>
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* ÁREA DE CONTENIDO: Solo CSS Grid */}
      <main className="grid p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto w-full items-start">
          
          {/* PANEL DE TEXTO (Izquierda) */}
          <div className="grid lg:col-span-4 gap-6">
            <Card>
              <div className="grid">
                <div className="grid p-4 grid-cols-[auto_1fr] gap-3 items-center border-b border-slate-100 pb-4">
                  <div className="grid bg-blue-100 text-blue-600 p-2 rounded-md">
                    {activeSection.icon}
                  </div>
                  <h2 className="text-xl p-2 font-bold text-slate-800 leading-tight">
                    {activeSection.title}
                  </h2>
                </div>
                <div className="grid">
                
                  <p className="text-slate-600 pl-4 leading-relaxed text-base">
                    {activeSection.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* PANEL DE DIAGRAMA (Derecha) */}
          <div className="grid lg:col-span-8 gap-6 h-full">
            <Card className="grid-rows-[auto_auto_1fr] h-full">
              <div className="grid grid-cols-[1fr_auto] gap-4 items-start mb-2">
                <h2 className="text-lg  pl-4 font-bold text-slate-800">
                  {activeSection.diagramTitle}
                </h2>
            
              </div>
              
              <p className="text-smtext-slate-500 mb-6 border-l-2 border-blue-400 pl-3 py-1">
                {activeSection.diagramDescription}
              </p>
              
              {/* DIAGRAM RENDER COMPONENT */}
              <DiagramRender activeId={activeSection.id} />
            </Card>
          </div>

        </div>
      </main>

    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(lessonData[0].id);

  return (
    <LessonLayout 
      data={lessonData} 
      activeTab={activeTab} 
      onTabChange={setActiveTab} 
    />
  );
}