import React, { useState } from 'react';
import { 
  Database, 
  LayoutTemplate, 
  Filter, 
  Columns, 
  Combine, 
  Calculator, 
  Cpu,
  ArrowRight,
  ArrowDown,
  Link as LinkIcon
} from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

interface SectionData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  Visual: React.FC;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  sections: SectionData[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode;
}

// --- COMPONENTES VISUALES (DIAGRAMAS) ---

const OverviewDiagram: React.FC = () => (
  <div className="grid gap-8 justify-items-center w-full max-w-2xl mx-auto">
    <div className="grid place-items-center p-4 bg-slate-800 text-white rounded-xl shadow-lg border-2 border-slate-700 w-48 text-center font-bold">
      Tabla Origen
    </div>
    
    <div className="grid grid-cols-4 gap-4 w-full justify-items-center">
      <div className="grid place-items-center"><ArrowDown className="text-slate-400" size={32} /></div>
      <div className="grid place-items-center"><ArrowDown className="text-slate-400" size={32} /></div>
      <div className="grid place-items-center"><ArrowDown className="text-slate-400" size={32} /></div>
      <div className="grid place-items-center"><ArrowDown className="text-slate-400" size={32} /></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      <div className="grid grid-rows-[auto_1fr] gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center shadow-sm">
        <strong className="text-emerald-800 text-sm">Selección</strong>
        <span className="text-xs text-emerald-600">Filtrar filas (WHERE)</span>
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center shadow-sm">
        <strong className="text-blue-800 text-sm">Proyección</strong>
        <span className="text-xs text-blue-600">Elegir columnas (SELECT)</span>
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-center shadow-sm">
        <strong className="text-indigo-800 text-sm">Join</strong>
        <span className="text-xs text-indigo-600">Combinar tablas</span>
      </div>
      <div className="grid grid-rows-[auto_1fr] gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center shadow-sm">
        <strong className="text-amber-800 text-sm">Agregación</strong>
        <span className="text-xs text-amber-600">Calcular valores (SUM, AVG)</span>
      </div>
    </div>
  </div>
);

const SelectionDiagram: React.FC = () => (
  <div className="grid gap-4 justify-items-center w-full">
    <div className="grid grid-rows-5 gap-1 w-full max-w-sm bg-white p-2 rounded-lg shadow-inner border border-slate-200">
      <div className="grid grid-cols-3 gap-1 bg-slate-800 text-white font-bold p-2 text-center text-sm rounded-t-md">
        <div>ID</div><div>Nombre</div><div>Depto</div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-emerald-100 border-l-4 border-emerald-500 p-2 text-center text-sm font-medium text-emerald-900 transition-all">
        <div>1</div><div>Ana</div><div>IT</div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2 text-center text-sm text-slate-400 line-through opacity-50">
        <div>2</div><div>Luis</div><div>Ventas</div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-emerald-100 border-l-4 border-emerald-500 p-2 text-center text-sm font-medium text-emerald-900 transition-all">
        <div>3</div><div>Carlos</div><div>IT</div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-slate-50 p-2 text-center text-sm text-slate-400 line-through opacity-50 rounded-b-md">
        <div>4</div><div>Marta</div><div>RRHH</div>
      </div>
    </div>
    <div className="grid place-items-center bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-mono font-bold border border-emerald-200">
      WHERE Depto = 'IT'
    </div>
  </div>
);

const ProjectionDiagram: React.FC = () => (
  <div className="grid gap-4 justify-items-center w-full">
    <div className="grid grid-rows-4 gap-1 w-full max-w-sm bg-white p-2 rounded-lg shadow-inner border border-slate-200">
      <div className="grid grid-cols-3 gap-1 p-1">
        <div className="grid place-items-center bg-blue-600 text-white font-bold p-2 text-sm rounded-t-md shadow-sm">Nombre</div>
        <div className="grid place-items-center bg-slate-200 text-slate-400 font-bold p-2 text-sm rounded-t-md">Edad</div>
        <div className="grid place-items-center bg-blue-600 text-white font-bold p-2 text-sm rounded-t-md shadow-sm">Salario</div>
      </div>
      {[
        ['Ana', '28', '$4000'],
        ['Luis', '34', '$3500'],
        ['Carlos', '41', '$5000']
      ].map((row, i) => (
        <div key={i} className="grid grid-cols-3 gap-1 p-1">
          <div className="grid place-items-center bg-blue-50 text-blue-900 p-2 text-sm border border-blue-100">{row[0]}</div>
          <div className="grid place-items-center bg-slate-50 text-slate-300 p-2 text-sm opacity-50">{row[1]}</div>
          <div className="grid place-items-center bg-blue-50 text-blue-900 p-2 text-sm border border-blue-100">{row[2]}</div>
        </div>
      ))}
    </div>
    <div className="grid place-items-center bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-mono font-bold border border-blue-200">
      SELECT Nombre, Salario
    </div>
  </div>
);

const JoinDiagram: React.FC = () => (
  <div className="grid gap-6 justify-items-center w-full">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center w-full max-w-2xl">
      {/* Tabla A */}
      <div className="grid grid-rows-3 gap-1 bg-white p-2 rounded-lg shadow-sm border border-indigo-200">
        <div className="grid grid-cols-2 gap-1 bg-indigo-100 p-2 text-center text-xs font-bold text-indigo-900">
          <div>Emp_ID</div><div>Nombre</div>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-indigo-50 p-2 text-center text-xs border border-indigo-100">
          <div className="font-bold text-indigo-700">1</div><div>Ana</div>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-indigo-50 p-2 text-center text-xs border border-indigo-100">
          <div className="font-bold text-indigo-700">2</div><div>Luis</div>
        </div>
      </div>

      {/* Operador */}
      <div className="grid place-items-center p-2 bg-indigo-600 text-white rounded-full shadow-md">
        <LinkIcon size={20} />
      </div>

      {/* Tabla B */}
      <div className="grid grid-rows-3 gap-1 bg-white p-2 rounded-lg shadow-sm border border-indigo-200">
        <div className="grid grid-cols-2 gap-1 bg-indigo-100 p-2 text-center text-xs font-bold text-indigo-900">
          <div>Emp_ID</div><div>Depto</div>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-indigo-50 p-2 text-center text-xs border border-indigo-100">
          <div className="font-bold text-indigo-700">1</div><div>IT</div>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-indigo-50 p-2 text-center text-xs border border-indigo-100">
          <div className="font-bold text-indigo-700">2</div><div>Ventas</div>
        </div>
      </div>
    </div>

    <div className="grid place-items-center"><ArrowDown className="text-indigo-400" size={24} /></div>

    {/* Tabla Resultado */}
    <div className="grid grid-rows-3 gap-1 w-full max-w-md bg-white p-2 rounded-lg shadow-md border border-indigo-300">
      <div className="grid grid-cols-3 gap-1 bg-indigo-600 text-white p-2 text-center text-sm font-bold rounded-t-sm">
        <div>Emp_ID</div><div>Nombre</div><div>Depto</div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-indigo-50 p-2 text-center text-sm border-b border-indigo-100">
        <div className="font-bold text-indigo-700">1</div><div>Ana</div><div>IT</div>
      </div>
      <div className="grid grid-cols-3 gap-1 bg-indigo-50 p-2 text-center text-sm rounded-b-sm">
        <div className="font-bold text-indigo-700">2</div><div>Luis</div><div>Ventas</div>
      </div>
    </div>
  </div>
);

const AggregationDiagram: React.FC = () => (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-8 items-center w-full max-w-xl mx-auto">
    <div className="grid grid-rows-4 gap-1 bg-white p-2 rounded-lg shadow-sm border border-amber-200">
      <div className="grid grid-cols-2 gap-1 bg-amber-100 p-2 text-center text-xs font-bold text-amber-900">
        <div>Depto</div><div>Salario</div>
      </div>
      <div className="grid grid-cols-2 gap-1 bg-amber-50 p-2 text-center text-xs">
        <div>IT</div><div className="text-amber-700 font-mono">4000</div>
      </div>
      <div className="grid grid-cols-2 gap-1 bg-amber-50 p-2 text-center text-xs">
        <div>IT</div><div className="text-amber-700 font-mono">5000</div>
      </div>
      <div className="grid grid-cols-2 gap-1 bg-amber-50 p-2 text-center text-xs">
        <div>IT</div><div className="text-amber-700 font-mono">4500</div>
      </div>
    </div>

    <div className="grid gap-2 justify-items-center">
      <strong className="text-amber-600 font-mono text-sm">SUM(Salario)</strong>
      <ArrowRight className="text-amber-400" size={32} />
      <span className="text-xs text-amber-500">GROUP BY Depto</span>
    </div>

    <div className="grid grid-rows-2 gap-1 bg-white p-2 rounded-lg shadow-md border-2 border-amber-400 w-32 justify-self-center">
      <div className="grid place-items-center bg-amber-500 text-white p-2 text-xs font-bold rounded-t-sm">
        Total IT
      </div>
      <div className="grid place-items-center bg-amber-50 p-4 text-lg font-bold text-amber-900 font-mono rounded-b-sm">
        13500
      </div>
    </div>
  </div>
);

const ExecutionAlgorithmsDiagram: React.FC = () => (
  <div className="grid gap-6 justify-items-center w-full max-w-3xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      {/* Logical to Physical Mapping */}
      <div className="grid gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="text-center font-bold text-slate-700 border-b pb-2">Operación Lógica</h4>
        <div className="grid gap-3">
          <div className="grid place-items-center p-3 bg-purple-100 text-purple-900 font-bold rounded border border-purple-200">JOIN</div>
          <div className="grid place-items-center p-3 bg-emerald-100 text-emerald-900 font-bold rounded border border-emerald-200">SELECCIÓN</div>
        </div>
      </div>

      <div className="grid gap-4 bg-slate-800 p-6 rounded-xl shadow-lg text-white">
        <h4 className="text-center font-bold text-slate-300 border-b border-slate-600 pb-2">Algoritmos Físicos (SGBD)</h4>
        <div className="grid gap-4">
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <Cpu className="text-purple-400" size={24} />
            <div className="grid gap-1 text-sm">
              <span className="font-mono bg-slate-700 px-2 py-1 rounded">Hash Join</span>
              <span className="font-mono bg-slate-700 px-2 py-1 rounded">Merge Join</span>
              <span className="font-mono bg-slate-700 px-2 py-1 rounded">Nested Loop</span>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-3">
            <Database className="text-emerald-400" size={24} />
            <div className="grid gap-1 text-sm">
              <span className="font-mono bg-slate-700 px-2 py-1 rounded">Index Scan</span>
              <span className="font-mono bg-slate-700 px-2 py-1 rounded">Full Table Scan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- COMPONENTES ESTRUCTURALES ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ 
  title, 
  sections, 
  activeTab, 
  onTabChange, 
  children 
}) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="grid grid-cols-[1fr_auto] items-center p-4 bg-slate-900 text-white shadow-md z-10">
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
          <div className="grid place-items-center w-10 h-10 bg-blue-600 rounded-lg">
            <Database size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        </div>
      
      </header>

      {/* Tabs Navigation */}
      <nav className="grid grid-flow-col auto-cols-max overflow-x-auto bg-white border-b border-slate-200  top-0 z-0 hide-scrollbar">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeTab === index;
          return (
            <button
              key={section.id}
              onClick={() => onTabChange(index)}
              className={`grid grid-cols-[auto_1fr] gap-2 items-center px-6 py-4 text-sm font-medium transition-colors border-b-2 outline-none
                ${isActive 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                }`}
            >
              <Icon size={16} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
              <span className="whitespace-nowrap">{section.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="grid p-4 md:p-8 gap-6 place-items-start max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

// --- DATOS DE LA LECCIÓN ---

const lessonSections: SectionData[] = [
  {
    id: 'overview',
    title: 'Operaciones Fundamentales',
    description: 'Las consultas SQL se construyen a partir de un conjunto reducido de operaciones básicas que permiten manipular y recuperar datos. Estas operaciones constituyen el núcleo del procesamiento de consultas y son la base sobre la cual el SGBD aplica algoritmos para ejecutar eficientemente las instrucciones.',
    icon: LayoutTemplate,
    Visual: OverviewDiagram
  },
  {
    id: 'selection',
    title: 'Selección (Filtrado)',
    description: 'La operación de selección permite extraer únicamente las filas que cumplen una condición específica. En SQL se expresa mediante la cláusula WHERE. Conceptualmente, reduce el número de registros sin modificar la estructura de las columnas.',
    icon: Filter,
    Visual: SelectionDiagram
  },
  {
    id: 'projection',
    title: 'Proyección (Columnas)',
    description: 'La proyección consiste en elegir un subconjunto de columnas de una tabla. En SQL se realiza especificando los atributos en la cláusula SELECT. Esta operación reduce la dimensionalidad de los datos, conservando solo la información relevante.',
    icon: Columns,
    Visual: ProjectionDiagram
  },
  {
    id: 'join',
    title: 'Join (Combinación)',
    description: 'La operación de join permite combinar filas de dos o más tablas en función de una condición de relación entre ellas. Es fundamental para trabajar con bases de datos relacionales, donde la información suele estar distribuida en múltiples tablas.',
    icon: Combine,
    Visual: JoinDiagram
  },
  {
    id: 'aggregation',
    title: 'Agregación',
    description: 'La agregación permite resumir conjuntos de datos mediante funciones como SUM, COUNT o AVG. Estas operaciones transforman múltiples filas en un valor único o en un conjunto reducido de resultados, frecuentemente en combinación con agrupamientos.',
    icon: Calculator,
    Visual: AggregationDiagram
  },
  {
    id: 'algorithms',
    title: 'Algoritmos de Ejecución',
    description: 'Cada una de estas operaciones no se ejecuta de forma abstracta, sino mediante algoritmos concretos definidos por el SGBD. Por ejemplo, un join puede implementarse de distintas maneras, y una selección puede ejecutarse mediante escaneo completo o uso de índices. La elección del algoritmo impacta directamente en el rendimiento de la consulta.',
    icon: Cpu,
    Visual: ExecutionAlgorithmsDiagram
  }
];

// --- COMPONENTE PRINCIPAL (APP) ---

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const currentSection = lessonSections[activeTab];
  const DiagramRender = currentSection.Visual;

  return (
    <LessonLayout
      title="Operaciones Básicas en Consultas"
      sections={lessonSections}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.5fr] gap-6 w-full items-start">
        
        {/* Panel de Texto (Izquierda) */}
        <Card className="grid grid-rows-[auto_1fr] p-6 gap-4  top-24">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold text-slate-800">
              {currentSection.title}
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">
            {currentSection.description}
          </p>
        </Card>

        {/* Panel de Visualización (Derecha) */}
        <Card className="grid grid-rows-[auto_auto_1fr] bg-slate-50 min-h-[500px]">
       
          <div className="grid place-items-center p-8 w-full h-full">
            <DiagramRender />
          </div>
        </Card>

      </div>
    </LessonLayout>
  );
}