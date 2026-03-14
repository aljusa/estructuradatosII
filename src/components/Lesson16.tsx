import React, { useState } from 'react';
import { Database, Check, X, HardDrive, FileText, LayoutGrid } from 'lucide-react';

// --- TIPOS E INTERFACES ---
interface Quark {
  id: string;
  title: string;
  explanation: string;
  diagramId: number;
}

interface LessonLayoutProps {
  title: string;
  quarks: Quark[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// --- DATOS DE LA LECCIÓN ---
const lessonData: Quark[] = [
  {
    id: 'q1',
    title: 'Introducción al índice clusterizado',
    explanation: 'En algunos sistemas gestores de bases de datos, los índices no solo sirven como estructuras auxiliares de búsqueda, sino que también determinan el orden físico en que se almacenan los datos en la tabla. Este tipo de estructura se denomina índice clusterizado. A diferencia de otros índices que solo apuntan a los registros, el índice clusterizado organiza directamente los datos de la tabla siguiendo el mismo orden del índice.',
    diagramId: 1,
  },
  {
    id: 'q2',
    title: 'Definición de índice clusterizado',
    explanation: 'Un índice clusterizado (Clustered Index) es un tipo de índice en el que el orden físico de los registros en la tabla coincide con el orden del índice. Esto significa que los datos se almacenan directamente siguiendo la estructura del índice, lo que permite recuperar registros de forma eficiente cuando se realizan búsquedas o recorridos ordenados.',
    diagramId: 2,
  },
  {
    id: 'q3',
    title: 'Restricción: un solo índice clusterizado por tabla',
    explanation: 'Una característica importante del índice clusterizado es que solo puede existir uno por tabla. Esto ocurre porque el índice define el orden físico de almacenamiento de los datos, y una tabla no puede estar físicamente ordenada de múltiples maneras al mismo tiempo.',
    diagramId: 3,
  },
  {
    id: 'q4',
    title: 'Almacenamiento de datos según el índice',
    explanation: 'En un índice clusterizado, los registros de la tabla se almacenan siguiendo el orden definido por la columna indexada. Esto facilita operaciones como búsquedas por rango, ordenamientos y recorridos secuenciales, ya que los datos ya están organizados físicamente de acuerdo con el índice.',
    diagramId: 4,
  }
];

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- COMPONENTES DE DIAGRAMAS ---

const Diagram1 = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-6 items-center w-full max-w-4xl mx-auto p-4">
    {/* Índice */}
    <div className="grid grid-rows-[auto_1fr] gap-2">
      <div className="bg-blue-600 text-white p-2 text-center font-bold rounded-t-md">Índice Clusterizado</div>
      <div className="grid grid-cols-1 gap-1 border-x border-b border-blue-200 p-2 bg-blue-50 rounded-b-md">
        {[1, 2, 3, 4].map(id => (
          <div key={`idx-${id}`} className="bg-white border border-blue-300 p-2 text-center font-mono shadow-sm">
            ID: {id}
          </div>
        ))}
      </div>
    </div>
    
    {/* Conectores (Solo visibles en desktop) */}
    <div className="hidden md:grid grid-rows-4 gap-1 py-10">
      {[1, 2, 3, 4].map(i => (
        <div key={`arrow-${i}`} className="text-gray-400 font-bold justify-self-center self-center h-10 line-height-[40px] text-2xl">
          →
        </div>
      ))}
    </div>

    {/* Tabla Física */}
    <div className="grid grid-rows-[auto_1fr] gap-2">
      <div className="bg-green-600 text-white p-2 text-center font-bold rounded-t-md">Tabla Física (Datos)</div>
      <div className="grid grid-cols-1 gap-1 border-x border-b border-green-200 p-2 bg-green-50 rounded-b-md">
        {[
          { id: 1, name: 'Ana', role: 'Admin' },
          { id: 2, name: 'Luis', role: 'User' },
          { id: 3, name: 'Marta', role: 'Editor' },
          { id: 4, name: 'Pedro', role: 'User' },
        ].map(row => (
          <div key={`row-${row.id}`} className="grid grid-cols-[auto_1fr_1fr] gap-2 bg-white border border-green-300 p-2 shadow-sm items-center">
            <span className="font-mono bg-green-100 px-2 py-1 rounded text-green-800 font-bold">{row.id}</span>
            <span>{row.name}</span>
            <span className="text-gray-500 text-sm">{row.role}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Diagram2 = () => (
  <div className="grid grid-cols-1 gap-8 w-full max-w-3xl mx-auto">
    <div className="grid grid-cols-[auto_1fr] gap-4 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md items-center shadow-sm">
      <Database className="text-amber-500 w-8 h-8" />
      <div>
        <h3 className="font-bold text-amber-900 text-lg">Definición Visual</h3>
        <p className="text-amber-800">El índice y los datos <strong>son la misma estructura</strong>. El árbol del índice contiene las filas de datos reales en sus nodos hoja.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 bg-white border rounded-md shadow-inner overflow-hidden">
      <div className="grid grid-cols-[80px_1fr_1fr] bg-slate-800 text-white font-bold text-sm">
        <div className="p-3 border-r border-slate-600 text-center bg-blue-600">Índice (ID)</div>
        <div className="p-3 border-r border-slate-600">Nombre</div>
        <div className="p-3">Departamento</div>
      </div>
      {[
        { id: 101, name: 'Carlos', dept: 'Ventas' },
        { id: 102, name: 'Elena', dept: 'IT' },
        { id: 103, name: 'Jorge', dept: 'RRHH' },
        { id: 104, name: 'Sofía', dept: 'Ventas' },
      ].map((row, i) => (
        <div key={row.id} className={`grid grid-cols-[80px_1fr_1fr] border-b last:border-0 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="p-3 border-r border-slate-200 text-center font-mono font-bold text-blue-700 bg-blue-50/50">{row.id}</div>
          <div className="p-3 border-r border-slate-200">{row.name}</div>
          <div className="p-3 text-gray-600">{row.dept}</div>
        </div>
      ))}
    </div>
  </div>
);

const Diagram3 = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start w-full max-w-5xl mx-auto">
    {/* Intento 1: Correcto */}
    <div className="grid grid-rows-[auto_1fr] gap-4">
      <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-3 rounded-md text-center grid grid-cols-[auto_1fr] gap-2 items-center">
        <Check className="w-5 h-5 text-emerald-600" />
        <span className="font-bold">Ordenado por ID</span>
      </div>
      <div className="grid grid-cols-1 border border-emerald-200 rounded overflow-hidden">
        {[1, 2, 3, 4].map((id, _) => (
          <div key={id} className="grid grid-cols-[auto_1fr] p-2 bg-emerald-50 border-b border-emerald-100 last:border-0">
             <span className="font-bold text-emerald-700 w-8">{id}</span>
             <span className="text-gray-600">Fila {id}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Divisor */}
    <div className="hidden md:grid items-center h-full pt-10 px-4">
      <div className="w-px h-full bg-gray-300 justify-self-center"></div>
      <div className="bg-white border text-xs font-bold px-2 py-1 rounded-full text-gray-500 absolute -translate-x-1/2 left-1/2 mt-12">VS</div>
    </div>

    {/* Intento 2: Incorrecto */}
    <div className="grid grid-rows-[auto_1fr] gap-4 opacity-75">
      <div className="bg-rose-100 border border-rose-300 text-rose-800 p-3 rounded-md text-center grid grid-cols-[auto_1fr] gap-2 items-center">
        <X className="w-5 h-5 text-rose-600" />
        <span className="font-bold">Ordenado por Fecha (Simultáneo)</span>
      </div>
      <div className="grid grid-cols-1 border border-rose-200 rounded overflow-hidden relative">
        <div className="absolute inset-0 bg-rose-500/10 z-10 grid items-center justify-center">
           <span className="bg-rose-600 text-white font-bold px-4 py-2 rounded shadow-lg transform -rotate-12">Imposible</span>
        </div>
        {[
          { id: 4, date: 'Ene 1' },
          { id: 2, date: 'Feb 5' },
          { id: 1, date: 'Mar 10' },
          { id: 3, date: 'Abr 20' },
        ].map((row, _) => (
          <div key={row.id} className="grid grid-cols-[auto_1fr_auto] gap-2 p-2 bg-rose-50 border-b border-rose-100 last:border-0 items-center filter blur-[1px]">
             <span className="font-bold text-rose-700 w-8">{row.id}</span>
             <span className="text-gray-600">Fila {row.id}</span>
             <span className="text-xs font-mono bg-white px-1 border rounded">{row.date}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Diagram4 = () => (
  <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
    <div className="bg-slate-800 text-white p-3 rounded-t-lg grid grid-cols-[auto_1fr] gap-3 items-center">
      <HardDrive className="w-6 h-6 text-blue-400" />
      <span className="font-bold">Disco / Sistema de Almacenamiento (Páginas de 8KB)</span>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-100 border border-slate-300 rounded-b-lg -mt-6">
      {/* Página 1 */}
      <div className="grid grid-rows-[auto_1fr] gap-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Página 1 (IDs 1-3)</div>
        <div className="bg-white border-2 border-slate-300 rounded shadow-sm p-2 grid gap-1">
          {[1, 2, 3].map(id => (
            <div key={id} className="grid grid-cols-[auto_1fr] items-center bg-blue-50 border border-blue-200 p-1.5 rounded text-sm">
              <FileText className="w-4 h-4 text-blue-500 mr-2" />
              <span>Registro {id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Página 2 */}
      <div className="grid grid-rows-[auto_1fr] gap-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Página 2 (IDs 4-6)</div>
        <div className="bg-white border-2 border-slate-300 rounded shadow-sm p-2 grid gap-1">
          {[4, 5, 6].map(id => (
            <div key={id} className="grid grid-cols-[auto_1fr] items-center bg-blue-50 border border-blue-200 p-1.5 rounded text-sm">
              <FileText className="w-4 h-4 text-blue-500 mr-2" />
              <span>Registro {id}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Página 3 */}
      <div className="grid grid-rows-[auto_1fr] gap-2">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Página 3 (IDs 7-9)</div>
        <div className="bg-white border-2 border-slate-300 rounded shadow-sm p-2 grid gap-1">
          {[7, 8, 9].map(id => (
            <div key={id} className="grid grid-cols-[auto_1fr] items-center bg-blue-50 border border-blue-200 p-1.5 rounded text-sm">
              <FileText className="w-4 h-4 text-blue-500 mr-2" />
              <span>Registro {id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- COMPONENTE DE DISEÑO PRINCIPAL (LessonLayout) ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, quarks, activeTab, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="grid grid-cols-[auto_1fr] items-center p-4 bg-slate-900 text-white shadow-md z-10 relative">
        <div className="grid grid-cols-[auto_auto] items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-md">
            <LayoutGrid className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        </div>
      </header>

      {/* Navigation (Tabs) */}
      <nav className="grid grid-flow-col auto-cols-max gap-1 p-2 px-4 bg-slate-200 border-b border-slate-300 overflow-x-auto">
        {quarks.map((quark, index) => (
          <button
            key={quark.id}
            onClick={() => onTabChange(index)}
            className={`grid items-center px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 
              ${activeTab === index 
                ? 'bg-white text-blue-700 border-blue-600 shadow-sm rounded-t-md' 
                : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-300 rounded-t-md'
              }`}
            type="button"
          >
            {quark.title.split(' ').slice(0, 3).join(' ')}...
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="grid p-4 md:p-8 align-start justify-items-center w-full">
        <div className="grid w-full max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- COMPONENTE APP PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const activeQuark = lessonData[activeTab];

  const renderDiagram = (id: number) => {
    switch (id) {
      case 1: return <Diagram1 />;
      case 2: return <Diagram2 />;
      case 3: return <Diagram3 />;
      case 4: return <Diagram4 />;
      default: return null;
    }
  };

  return (
    <LessonLayout 
      title="Índice Clusterizado en Bases de Datos"
      quarks={lessonData}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <Card className="grid grid-rows-[auto_auto_1fr] gap-6 p-6 md:p-8 animate-in fade-in duration-500">
        
        {/* Header del Panel */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start border-b border-slate-100 pb-4">
          <div className="grid gap-2">
            
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
              {activeQuark.title}
            </h2>
          </div>
        </div>

        {/* Descripción */}
        <div className="grid bg-slate-50 p-4 rounded-md border border-slate-200">
          <p className="text-slate-700 leading-relaxed text-lg">
            {activeQuark.explanation}
          </p>
        </div>

        {/* Contenedor del Diagrama */}
        <div className="grid mt-4">
          <div className="grid grid-rows-[auto_1fr] border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
           
            <div className="grid p-6 items-center justify-items-center bg-dots-pattern">
              {renderDiagram(activeQuark.diagramId)}
            </div>
          </div>
        </div>
        
      </Card>
    </LessonLayout>
  );
}