import React, { useState } from 'react';
import { 
  Database, 
  Cpu, 
  HardDrive, 
  ArrowRight, 
  ArrowDown, 
  Layers, 
  SplitSquareHorizontal, 
  Combine 
} from 'lucide-react';

// --- TYPES & INTERFACES ---

interface SectionData {
  id: string;
  tabLabel: string;
  diagramTitle: string;
  description: string;
}

// --- DATA DEFINITION ---

const lessonData: SectionData[] = [
  {
    id: 'funcion',
    tabLabel: '1. Función en consultas',
    diagramTitle: 'Transformación de Datos: ORDER BY',
    description: 'El ordenamiento es una operación clave en el procesamiento de consultas, especialmente cuando se utiliza la cláusula ORDER BY. Su objetivo es reorganizar los datos según uno o más atributos, lo que puede implicar un costo significativo dependiendo del volumen de información y de los recursos disponibles.',
  },
  {
    id: 'quicksort',
    tabLabel: '2. En Memoria (Quicksort)',
    diagramTitle: 'Estrategia de División y Conquista',
    description: 'Cuando los datos caben completamente en memoria principal, el SGBD puede utilizar algoritmos eficientes como Quicksort. Este algoritmo sigue una estrategia de división y conquista: selecciona un elemento pivote y reorganiza los datos en torno a él. Es muy rápido en la práctica para conjuntos de tamaño moderado.',
  },
  {
    id: 'external',
    tabLabel: '3. Externo (External Sort)',
    diagramTitle: 'Procesamiento por Bloques y Fusión',
    description: 'Cuando los datos son demasiado grandes para caber en memoria, se utiliza el ordenamiento externo. Este método divide los datos en bloques más pequeños que sí caben en memoria, los ordena individualmente y luego los combina en múltiples fases hasta obtener el conjunto final ordenado.',
  },
  {
    id: 'comparacion',
    tabLabel: '4. Comparación y Contexto',
    diagramTitle: 'Selección del Método de Ordenamiento',
    description: 'El uso de Quicksort es adecuado cuando los datos pueden manejarse completamente en memoria, ofreciendo alta velocidad. En contraste, el ordenamiento externo es esencial para grandes volúmenes de datos, aunque implica más operaciones de lectura y escritura en disco. El SGBD selecciona automáticamente el método según el tamaño de los datos y la memoria disponible.',
  }
];

// --- COMPONENTS ---

/**
 * Card Component: Envoltorio para mantener una estética consistente.
 * Utiliza CSS Grid internamente si es necesario para el padding/layout base.
 */
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

/**
 * DiagramRender Component: Renders visual representations based on the active section.
 * Utilizes CSS Grid exclusively for layout.
 */
const DiagramRender: React.FC<{ activeId: string }> = ({ activeId }) => {
  switch (activeId) {
    case 'funcion':
      return (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center justify-items-center p-8 bg-slate-50 rounded-lg">
          {/* Tabla Desordenada */}
          <div className="grid grid-rows-[auto_1fr] gap-2 w-full max-w-[200px]">
            <div className="bg-slate-200 text-slate-700 font-semibold text-center p-2 rounded-t-md">Datos Originales</div>
            <div className="grid grid-cols-2 gap-px bg-slate-300 border border-slate-300">
              {['ID', 'Valor', '3', 'Zeta', '1', 'Alfa', '4', 'Omega', '2', 'Beta'].map((item, idx) => (
                <div key={idx} className={`bg-white p-2 text-center text-sm ${idx < 2 ? 'font-bold bg-slate-100' : 'text-slate-600'}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-rows-2 gap-2 justify-items-center text-blue-600">
            <span className="font-mono text-sm font-semibold bg-blue-100 px-3 py-1 rounded-full">ORDER BY ID ASC</span>
            <ArrowRight className="w-8 h-8" />
          </div>

          {/* Tabla Ordenada */}
          <div className="grid grid-rows-[auto_1fr] gap-2 w-full max-w-[200px]">
            <div className="bg-blue-600 text-white font-semibold text-center p-2 rounded-t-md">Datos Ordenados</div>
            <div className="grid grid-cols-2 gap-px bg-slate-300 border border-slate-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]">
              {['ID', 'Valor', '1', 'Alfa', '2', 'Beta', '3', 'Zeta', '4', 'Omega'].map((item, idx) => (
                <div key={idx} className={`bg-white p-2 text-center text-sm ${idx < 2 ? 'font-bold bg-slate-100' : 'text-slate-800 font-medium'}`}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'quicksort':
      return (
        <div className="grid grid-rows-[auto_auto_auto] gap-8 justify-items-center p-8 bg-slate-50 rounded-lg">
          {/* Array Original */}
          <div className="grid grid-rows-[auto_1fr] gap-2 justify-items-center">
            <span className="text-sm font-semibold text-slate-500">Conjunto en Memoria</span>
            <div className="grid grid-cols-6 gap-2">
              {[8, 3, 5, 1, 9, 2].map((num, i) => (
                <div key={i} className={`w-12 h-12 grid items-center justify-items-center rounded-md font-bold text-lg shadow-sm border
                  ${num === 5 ? 'bg-amber-100 border-amber-400 text-amber-700 ring-2 ring-amber-400' : 'bg-white border-slate-200 text-slate-700'}`}>
                  {num}
                </div>
              ))}
            </div>
            <span className="text-xs text-amber-600 font-medium mt-1">Pivote seleccionado (5)</span>
          </div>

          <ArrowDown className="text-slate-400 w-6 h-6" />

          {/* Partición */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-6 w-full max-w-2xl">
            <div className="grid grid-rows-[auto_1fr] gap-2 justify-items-center bg-blue-50 p-4 rounded-lg border border-blue-100">
              <span className="text-xs font-semibold text-blue-600 text-center">&lt; Pivote</span>
              <div className="grid grid-cols-3 gap-2">
                {[3, 1, 2].map((num, i) => (
                  <div key={i} className="w-10 h-10 grid items-center justify-items-center rounded-md bg-white border border-blue-200 text-blue-700 font-bold shadow-sm">{num}</div>
                ))}
              </div>
            </div>

            <div className="grid items-center justify-items-center">
               <div className="w-12 h-12 grid items-center justify-items-center rounded-md bg-amber-500 text-white font-bold shadow-md">5</div>
            </div>

            <div className="grid grid-rows-[auto_1fr] gap-2 justify-items-center bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <span className="text-xs font-semibold text-emerald-600 text-center">&gt; Pivote</span>
              <div className="grid grid-cols-2 gap-2">
                {[8, 9].map((num, i) => (
                  <div key={i} className="w-10 h-10 grid items-center justify-items-center rounded-md bg-white border border-emerald-200 text-emerald-700 font-bold shadow-sm">{num}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'external':
      return (
        <div className="grid grid-rows-[auto_auto_auto] gap-6 items-center p-8 bg-slate-50 rounded-lg">
          {/* Fase 1: Disco a Bloques */}
          <div className="grid grid-cols-[150px_auto_1fr] gap-6 items-center">
            <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
              <HardDrive className="w-10 h-10 text-slate-600" />
              <span className="text-xs text-center font-semibold text-slate-700">Datos Masivos<br/>(Disco)</span>
            </div>
            <SplitSquareHorizontal className="w-6 h-6 text-blue-400" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="grid grid-rows-[auto_auto] gap-2 justify-items-center p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <Layers className="w-6 h-6 text-blue-600" />
                  <span className="text-[10px] font-bold text-blue-700">Bloque {i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fase 2: Ordenamiento en RAM */}
          <div className="grid grid-cols-[150px_auto_1fr] gap-6 items-center">
            <div className="grid justify-items-end w-full pr-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Memoria RAM</span>
            </div>
            <div className="w-6 h-6"></div> {/* Spacer */}
            <div className="grid grid-cols-3 gap-4">
               {[1, 2, 3].map(i => (
                <div key={i} className="grid grid-rows-[auto_auto] gap-2 justify-items-center p-3 bg-amber-50 border border-amber-200 rounded-md shadow-inner">
                  <Cpu className="w-6 h-6 text-amber-600" />
                  <span className="text-[10px] font-bold text-amber-700">Sort B{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fase 3: Fusión a Disco */}
          <div className="grid grid-cols-[150px_auto_1fr] gap-6 items-center">
             <div className="grid grid-rows-[auto_auto] gap-2 justify-items-center p-4 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm">
              <Database className="w-10 h-10 text-emerald-600" />
              <span className="text-xs text-center font-semibold text-emerald-700">Conjunto<br/>Ordenado</span>
            </div>
            <Combine className="w-6 h-6 text-emerald-400 rotate-180" />
            <div className="grid grid-cols-1 w-full bg-emerald-100 h-8 rounded-md border border-emerald-300 relative overflow-hidden">
               <div className="absolute inset-0 grid grid-cols-3">
                  <div className="border-r border-emerald-200/50"></div>
                  <div className="border-r border-emerald-200/50"></div>
                  <div></div>
               </div>
               <span className="absolute inset-0 grid items-center justify-items-center text-xs font-bold text-emerald-800 z-10">
                 Fusión Progresiva (Merge)
               </span>
            </div>
          </div>
        </div>
      );

    case 'comparacion':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {/* Quicksort Card */}
          <div className="grid grid-rows-[auto_1fr] gap-4 bg-white border-2 border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-blue-50 pb-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Quicksort</h3>
                <p className="text-sm font-medium text-blue-600">Ordenamiento en Memoria</p>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-3 text-sm text-slate-600">
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span>Ideal para conjuntos de <strong>tamaño moderado</strong>.</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span>Datos residen <strong>completamente en RAM</strong>.</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span><strong>Alta velocidad</strong> de ejecución sin latencia I/O.</span>
              </div>
            </div>
          </div>

          {/* External Sort Card */}
          <div className="grid grid-rows-[auto_1fr] gap-4 bg-white border-2 border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
             <div className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-emerald-50 pb-4">
              <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                <HardDrive className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">External Sort</h3>
                <p className="text-sm font-medium text-emerald-600">Ordenamiento Externo</p>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-3 text-sm text-slate-600">
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>Requerido para <strong>grandes volúmenes</strong> de datos.</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>Datos divididos en bloques que <strong>superan la RAM</strong>.</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span>Implica costo por operaciones de <strong>lectura/escritura en disco</strong>.</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

/**
 * LessonLayout Component: Layout principal basado estrictamente en CSS Grid.
 */
const LessonLayout: React.FC<{
  title: string;
  tabs: SectionData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  currentSection: SectionData;
}> = ({ title, tabs, activeTabId, onTabChange, currentSection }) => {
  return (
    // Layout principal: CSS Grid de 2 filas (Cabecera + Contenido)
    <div className="min-h-screen bg-slate-100 grid grid-rows-[auto_1fr] font-sans text-slate-900">
      
      {/* Header & Nav Area: Grid de 2 filas (Título + Pestañas) */}
      <header className="grid grid-rows-[auto_auto] bg-white border-b border-slate-200 shadow-sm z-10">
        
        {/* Header Title */}
        <div className="px-6 py-4 grid grid-cols-[auto_1fr] items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Database className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            {title}
          </h1>
        </div>

        {/* Navigation Tabs (CSS Grid para distribución equitativa) */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-slate-100 px-2 bg-slate-50">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  grid items-center justify-items-center py-3 px-4 text-sm font-semibold transition-colors duration-200 border-b-2 outline-none
                  ${isActive 
                    ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'}
                `}
                aria-selected={isActive}
                role="tab"
              >
                {tab.tabLabel}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content Area: CSS Grid centralizado */}
      <main className="grid p-4 md:p-8 items-start justify-items-center overflow-y-auto">
        <div className="w-full max-w-5xl grid grid-rows-[auto_1fr] gap-6">
          
          <Card className="grid grid-rows-[auto_auto_1fr] gap-6 p-6 md:p-8">
            
            {/* Diagram Title */}
            <header className="grid gap-2 border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-bold text-slate-800">
                {currentSection.diagramTitle}
              </h2>
            </header>

            {/* Diagram Description */}
            <div className="grid">
              <p className="text-base text-slate-600 leading-relaxed">
                {currentSection.description}
              </p>
            </div>

            {/* Diagram Render Wrapper */}
            <div className="grid w-full mt-4 border border-slate-100 rounded-xl overflow-hidden shadow-inner">
              <DiagramRender activeId={currentSection.id} />
            </div>

          </Card>
        </div>
      </main>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);

  const currentSection = lessonData.find(section => section.id === activeTabId) || lessonData[0];

  return (
    <LessonLayout
      title="Algoritmos de Ordenamiento en Bases de Datos"
      tabs={lessonData}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      currentSection={currentSection}
    />
  );
}