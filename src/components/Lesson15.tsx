import React, { useState } from 'react';
import { Database, Search, Code, BookOpen, ArrowRight, ArrowDown } from 'lucide-react';

// --- Tipos e Interfaces ---
type TabId = 'intro' | 'definicion' | 'utilidad' | 'sintaxis';

interface QuarkData {
  id: TabId;
  title: string;
  explanation: string;
  icon: React.ElementType;
}

// --- Datos de la Lección ---
const lessonData: Record<TabId, QuarkData> = {
  intro: {
    id: 'intro',
    title: 'Introducción al índice compuesto',
    explanation: 'En muchas consultas de bases de datos, las condiciones de búsqueda no se basan en una sola columna, sino en varios atributos al mismo tiempo. Para optimizar este tipo de consultas, los sistemas gestores de bases de datos permiten crear índices compuestos, que combinan varias columnas dentro de una misma estructura de índice. Esto permite que el sistema localice registros más eficientemente cuando se utilizan múltiples criterios de búsqueda.',
    icon: Database
  },
  definicion: {
    id: 'definicion',
    title: 'Definición de índice compuesto',
    explanation: 'Un índice compuesto es un índice que se construye utilizando dos o más columnas de una misma tabla. En lugar de indexar un solo atributo, el sistema organiza los valores combinados de varias columnas para facilitar el acceso a los registros cuando las consultas utilizan esas columnas conjuntamente.',
    icon: BookOpen
  },
  utilidad: {
    id: 'utilidad',
    title: 'Utilidad en consultas con múltiples condiciones',
    explanation: 'Los índices compuestos son especialmente útiles cuando las consultas incluyen varias columnas en la cláusula WHERE. Al tener un índice que combina esas columnas, el sistema puede localizar más rápidamente los registros que cumplen todas las condiciones, evitando recorrer la tabla completa. Este tipo de índice mejora el rendimiento en consultas que filtran datos utilizando combinaciones de atributos.',
    icon: Search
  },
  sintaxis: {
    id: 'sintaxis',
    title: 'Creación de un índice compuesto en SQL',
    explanation: 'En SQL, un índice compuesto se crea especificando varias columnas dentro de la instrucción CREATE INDEX.\n\nEste índice resulta especialmente útil cuando las consultas buscan empleados utilizando ambos campos conjuntamente.',
    icon: Code
  }
};

const tabs: { id: TabId; label: string }[] = [
  { id: 'intro', label: '1. Introducción' },
  { id: 'definicion', label: '2. Definición' },
  { id: 'utilidad', label: '3. Utilidad' },
  { id: 'sintaxis', label: '4. Sintaxis SQL' }
];

// --- Componentes Reutilizables ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

// --- Componentes de Visualización (Diagram Renders) ---

const DiagramIntro = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 place-items-center w-full h-full p-8 bg-slate-50 rounded-lg">
    {/* Tabla Original */}
    <div className="grid grid-rows-[auto_1fr] gap-2 w-full max-w-xs">
      <div className="text-center font-semibold text-slate-700 bg-slate-200 py-2 rounded-t-md">Tabla: Usuarios</div>
      <div className="grid grid-cols-3 bg-white border border-slate-300 rounded-b-md overflow-hidden text-sm">
        <div className="grid bg-slate-100 font-bold p-2 border-b border-slate-300">ID</div>
        <div className="grid bg-blue-100 text-blue-800 font-bold p-2 border-b border-slate-300 border-l">Nombre</div>
        <div className="grid bg-blue-100 text-blue-800 font-bold p-2 border-b border-slate-300 border-l">Apellido</div>
        
        <div className="grid p-2 border-b border-slate-200">1</div>
        <div className="grid p-2 border-b border-slate-200 border-l bg-blue-50">Ana</div>
        <div className="grid p-2 border-b border-slate-200 border-l bg-blue-50">García</div>
        
        <div className="grid p-2">2</div>
        <div className="grid p-2 border-l bg-blue-50">Luis</div>
        <div className="grid p-2 border-l bg-blue-50">Pérez</div>
      </div>
    </div>

    {/* Conector */}
    <div className="grid place-items-center text-blue-500">
      <ArrowRight className="hidden md:block w-8 h-8" />
      <ArrowDown className="block md:hidden w-8 h-8" />
      <span className="text-xs font-bold uppercase tracking-wider mt-2">Combina</span>
    </div>

    {/* Índice Compuesto */}
    <div className="grid grid-rows-[auto_1fr] gap-2 w-full max-w-xs">
      <div className="text-center font-bold text-white bg-blue-600 py-2 rounded-t-md shadow-md">Índice Compuesto</div>
      <div className="grid grid-cols-[1fr_auto] bg-white border-2 border-blue-400 rounded-b-md overflow-hidden text-sm shadow-sm">
        <div className="grid bg-blue-50 font-bold p-2 border-b border-blue-200">(Nombre, Apellido)</div>
        <div className="grid bg-slate-100 font-bold p-2 border-b border-blue-200 border-l text-center">Ref</div>
        
        <div className="grid p-2 border-b border-blue-100">("Ana", "García")</div>
        <div className="grid p-2 border-b border-blue-100 border-l text-center text-slate-500">→ Fila 1</div>
        
        <div className="grid p-2">("Luis", "Pérez")</div>
        <div className="grid p-2 border-l text-center text-slate-500">→ Fila 2</div>
      </div>
    </div>
  </div>
);

const DiagramDefinition = () => (
  <div className="grid grid-rows-[auto_1fr] gap-6 w-full h-full p-6 bg-slate-50 rounded-lg">
    <div className="grid place-items-center bg-blue-100 border border-blue-300 text-blue-900 p-4 rounded-lg text-center shadow-inner">
      <span className="font-bold text-lg mb-1">ÍNDICE COMPUESTO</span>
      <span className="text-sm">Estructura organizada que almacena valores concatenados de 2 o más columnas.</span>
    </div>
    
    <div className="grid grid-cols-1 gap-2 mt-4 max-w-lg mx-auto w-full">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
         <div className="grid bg-white border-2 border-indigo-400 p-3 rounded shadow-sm text-center font-mono text-sm">
            ("Carlos", "López")
         </div>
         <div className="grid text-indigo-400">
            <ArrowRight className="w-6 h-6" />
         </div>
         <div className="grid bg-slate-200 p-3 rounded text-center text-sm border border-slate-300">
            Registro en Disco #402
         </div>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
         <div className="grid bg-white border-2 border-indigo-400 p-3 rounded shadow-sm text-center font-mono text-sm">
            ("María", "Gómez")
         </div>
         <div className="grid text-indigo-400">
            <ArrowRight className="w-6 h-6" />
         </div>
         <div className="grid bg-slate-200 p-3 rounded text-center text-sm border border-slate-300">
            Registro en Disco #115
         </div>
      </div>
    </div>
  </div>
);

const DiagramUtility = () => (
  <div className="grid grid-rows-[auto_auto_auto] gap-6 place-items-center w-full h-full p-6 bg-slate-50 rounded-lg">
    {/* Query */}
    <div className="grid bg-slate-800 text-green-400 p-4 rounded-lg shadow-md font-mono text-sm w-full max-w-md">
      <span className="text-pink-400">SELECT</span> * <span className="text-pink-400">FROM</span> empleados<br/>
      <span className="text-pink-400">WHERE</span> <span className="text-yellow-300">nombre</span> = 'Juan'<br/>
      <span className="text-pink-400">AND</span> <span className="text-yellow-300">apellido</span> = 'Ruiz';
    </div>

    <ArrowDown className="text-slate-400 w-6 h-6" />

    {/* Búsqueda en Índice */}
    <div className="grid grid-cols-[auto_1fr] gap-4 bg-white border-2 border-blue-500 p-4 rounded-lg shadow-lg w-full max-w-md items-center">
      <Search className="text-blue-500 w-8 h-8" />
      <div className="grid gap-1">
        <span className="font-bold text-slate-800">Búsqueda directa en Índice:</span>
        <span className="font-mono text-sm bg-blue-50 text-blue-800 p-1 rounded inline-block text-center border border-blue-200">
          idx("Juan", "Ruiz")
        </span>
        <span className="text-xs text-slate-500">Localiza la referencia instantáneamente (O(log n))</span>
      </div>
    </div>

    <ArrowDown className="text-slate-400 w-6 h-6" />

    {/* Resultado Rápido */}
    <div className="grid bg-green-100 border border-green-400 text-green-800 p-3 rounded-lg text-center w-full max-w-md font-medium shadow-sm">
      ✓ Registro recuperado sin escanear toda la tabla (Full Table Scan evitado)
    </div>
  </div>
);

const DiagramSyntax = () => (
  <div className="grid place-items-center w-full h-full p-6 bg-slate-50 rounded-lg">
    <div className="grid gap-6 w-full max-w-xl">
      <div className="grid bg-slate-900 rounded-xl overflow-hidden shadow-xl border border-slate-700">
        <div className="grid grid-cols-[auto_1fr] gap-2 bg-slate-800 p-3 border-b border-slate-700 items-center">
          <div className="grid grid-cols-3 gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-slate-400 font-mono text-center pr-8">query.sql</span>
        </div>
        <div className="grid p-6 font-mono text-sm md:text-base leading-relaxed text-slate-300">
          <div>
            <span className="text-pink-400 font-bold">CREATE INDEX</span> idx_nombre_apellido
          </div>
          <div>
            <span className="text-pink-400 font-bold">ON</span> empleados(
            <span className="bg-yellow-500/20 text-yellow-300 px-1 rounded mx-1 relative group">
              nombre
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Columna 1</span>
            </span>, 
            <span className="bg-yellow-500/20 text-yellow-300 px-1 rounded mx-1 relative group">
              apellido
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Columna 2</span>
            </span>);
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center text-sm">
        <div className="grid bg-white p-3 rounded border border-slate-200 shadow-sm">
          <span className="font-bold text-slate-800">idx_nombre_apellido</span>
          <span className="text-slate-500 text-xs">Nombre del índice</span>
        </div>
        <div className="grid bg-white p-3 rounded border border-slate-200 shadow-sm">
          <span className="font-bold text-slate-800">empleados</span>
          <span className="text-slate-500 text-xs">Tabla destino</span>
        </div>
        <div className="grid bg-white p-3 rounded border border-slate-200 shadow-sm">
          <span className="font-bold text-slate-800">nombre, apellido</span>
          <span className="text-slate-500 text-xs">Atributos combinados</span>
        </div>
      </div>
    </div>
  </div>
);

// --- Layout Principal ---

interface LessonLayoutProps {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
  data: QuarkData;
}

const LessonLayout: React.FC<LessonLayoutProps> = ({ activeTab, setActiveTab, data }) => {
  const Icon = data.icon;

  const renderDiagram = () => {
    switch (activeTab) {
      case 'intro': return <DiagramIntro />;
      case 'definicion': return <DiagramDefinition />;
      case 'utilidad': return <DiagramUtility />;
      case 'sintaxis': return <DiagramSyntax />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 text-slate-900 font-sans">
      
      {/* Header */}
      <header className="grid grid-cols-[auto_1fr] gap-4 items-center bg-white px-8 py-5 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="grid place-items-center bg-blue-600 p-2 rounded-lg">
          <Database className="text-white w-6 h-6" />
        </div>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold text-slate-800 leading-none">Índice Compuesto en Bases de Datos</h1>
          <p className="text-sm text-slate-500 font-medium">Conceptos, Definiciones y Sintaxis SQL</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="grid grid-rows-[auto_1fr] gap-6 p-6 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* Navigation Tabs (Strict Grid Layout) */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-200/50 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`grid place-items-center py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-start">
          
          {/* Text Panel */}
          <aside className="grid lg:col-span-4 gap-4 h-full">
            <Card className="grid-rows-[auto_auto_1fr] gap-4 h-full">
              <div className="grid grid-cols-[auto_1fr] gap-3 items-center border-b border-slate-100 pb-4">
                <div className="grid place-items-center bg-blue-50 p-3 rounded-full text-blue-600">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="grid gap-1">
                  <h2 className="text-lg font-bold text-slate-800 leading-tight">{data.title}</h2>
                </div>
              </div>
              
              <div className="grid content-start">
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {data.explanation}
                </p>
              </div>
            </Card>
          </aside>

          {/* Diagram Panel */}
          <figure className="grid lg:col-span-8 h-full min-h-[400px]">
            <Card className="grid-rows-[auto_1fr] gap-4 h-full p-2 md:p-6">
            
              <div className="grid place-items-center border-2 border-dashed border-slate-200 rounded-xl overflow-hidden relative bg-white">
                {renderDiagram()}
              </div>
            </Card>
          </figure>

        </section>
      </main>
    </div>
  );
};

// --- App Root ---
export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('intro');

  return (
    <LessonLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      data={lessonData[activeTab]} 
    />
  );
}