import React, { useState,  } from 'react';
import { 
  Database, 
  Filter, 
  Columns, 
  Combine, 
  CircleDashed, 
  Network 
} from 'lucide-react';

// --- TIPOS E INTERFACES ---

interface SectionData {
  id: string;
  title: string;
  icon: React.ElementType;
  description: React.ReactNode;
  diagram: React.FC;
}

// --- DATOS DE LA LECCIÓN ---

const LESSON_DATA: SectionData[] = [
  {
    id: 'concepto',
    title: '1. Concepto General',
    icon: Database,
    description: (
      <div className="grid gap-2 text-slate-700 text-base leading-relaxed">
        <p>El <strong>álgebra relacional</strong> es un lenguaje formal basado en operaciones matemáticas que permite manipular relaciones dentro de una base de datos.</p>
        <p>Estas operaciones toman una o más tablas como entrada y generan nuevas tablas como resultado. Este enfoque es la base teórica del lenguaje SQL.</p>
        <ul className="grid gap-1 pl-5 list-disc mt-2">
          <li>Seleccionar registros</li>
          <li>Elegir columnas específicas</li>
          <li>Combinar relaciones</li>
          <li>Comparar conjuntos de datos</li>
        </ul>
      </div>
    ),
    diagram: ConceptDiagram,
  },
  {
    id: 'seleccion',
    title: '2. Selección (σ)',
    icon: Filter,
    description: (
      <div className="grid gap-2 text-slate-700 text-base leading-relaxed">
        <p>La <strong>selección</strong> permite obtener únicamente las filas que cumplen una condición específica. Esta operación se enfoca en filtrar registros, sin modificar las columnas.</p>
        <p className="p-3 bg-slate-100 rounded-md border border-slate-200 mt-2 font-mono text-sm">
          Condición: carrera = 'Ingeniería'
        </p>
      </div>
    ),
    diagram: SelectionDiagram,
  },
  {
    id: 'proyeccion',
    title: '3. Proyección (π)',
    icon: Columns,
    description: (
      <div className="grid gap-2 text-slate-700 text-base leading-relaxed">
        <p>La <strong>proyección</strong> permite seleccionar solo ciertas columnas de una relación. A diferencia de la selección, aquí se modifican los atributos (columnas) mostrados, reduciendo su número y enfocándose en información relevante.</p>
        <p className="p-3 bg-slate-100 rounded-md border border-slate-200 mt-2 font-mono text-sm">
          Columnas seleccionadas: nombre, carrera
        </p>
      </div>
    ),
    diagram: ProjectionDiagram,
  },
  {
    id: 'union',
    title: '4. Unión (∪)',
    icon: Combine,
    description: (
      <div className="grid gap-2 text-slate-700 text-base leading-relaxed">
        <p>La <strong>unión</strong> combina registros de dos relaciones compatibles en una sola tabla.</p>
        <ul className="grid gap-1 pl-5 list-disc mt-2">
          <li>Ambas tablas deben tener el mismo número de columnas.</li>
          <li>Los tipos de datos deben ser compatibles.</li>
        </ul>
      </div>
    ),
    diagram: UnionDiagram,
  },
  {
    id: 'interseccion',
    title: '5. Intersección (∩) y Diferencia (-)',
    icon: CircleDashed,
    description: (
      <div className="grid gap-4 text-slate-700 text-base leading-relaxed">
        <div className="grid gap-1">
          <strong className="text-blue-700">Intersección:</strong>
          <p>Obtiene los registros que existen simultáneamente en ambas relaciones (A ∩ B).</p>
        </div>
        <div className="grid gap-1">
          <strong className="text-purple-700">Diferencia:</strong>
          <p>Obtiene los registros que están en la primera tabla pero no en la segunda (A − B).</p>
        </div>
      </div>
    ),
    diagram: IntersectionDifferenceDiagram,
  },
  {
    id: 'cartesiano',
    title: '6. Producto Cartesiano (×)',
    icon: Network,
    description: (
      <div className="grid gap-2 text-slate-700 text-base leading-relaxed">
        <p>El <strong>producto cartesiano</strong> combina cada fila de una tabla con todas las filas de otra tabla.</p>
        <p>Si la Tabla A tiene 3 registros y la Tabla B tiene 4, el resultado tendrá 3 × 4 = 12 registros. Es la base para las operaciones tipo JOIN.</p>
      </div>
    ),
    diagram: CartesianDiagram,
  }
];

// --- COMPONENTES DE DIAGRAMAS (Visualización de Datos) ---

function ConceptDiagram() {
  const [phase, setPhase] = useState(0);

  return (
    <div className="grid gap-8 justify-items-center w-full max-w-2xl">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 w-full">
        {/* Tabla Entrada */}
        <div className={`grid gap-1 p-4 border-2 rounded-lg transition-all duration-500 ${phase >= 0 ? 'border-blue-400 bg-blue-50' : 'border-slate-200'}`}>
          <div className="text-xs font-bold text-center mb-2 text-blue-800">Tabla Original (R)</div>
          <div className="grid grid-cols-2 gap-1">
            <div className="h-4 bg-blue-200 rounded"></div><div className="h-4 bg-blue-200 rounded"></div>
            <div className="h-4 bg-blue-200 rounded"></div><div className="h-4 bg-blue-200 rounded"></div>
          </div>
        </div>

        {/* Operación */}
        <div className="grid place-items-center relative">
          <div className={`grid place-items-center w-12 h-12 rounded-full border-2 transition-all duration-500 ${phase >= 1 ? 'border-emerald-500 bg-emerald-100 text-emerald-600 scale-110' : 'border-slate-200 text-slate-400 bg-white'}`}>
            <Database size={24} />
          </div>
          <div className={`absolute -top-12 text-xs font-bold transition-opacity duration-300 ${phase >= 1 ? 'opacity-100 text-emerald-600' : 'opacity-0'}`}>
            Operación (σ, π, ∪)
          </div>
        </div>

        {/* Tabla Salida */}
        <div className={`grid gap-1 p-4 border-2 rounded-lg transition-all duration-500 ${phase === 2 ? 'border-purple-400 bg-purple-50' : 'border-slate-200 bg-white opacity-50'}`}>
          <div className="text-xs font-bold text-center mb-2 text-purple-800">Nueva Tabla (R')</div>
          <div className="grid grid-cols-2 gap-1">
            <div className="h-4 bg-purple-200 rounded"></div><div className="h-4 bg-purple-200 rounded"></div>
            <div className="h-4 bg-purple-200 rounded"></div><div className="h-4 bg-purple-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Controles Interactivos */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-md mt-4">
        <button 
          onClick={() => setPhase(0)} 
          className={`p-2 text-sm font-bold rounded-md border transition-all duration-200 text-center ${phase === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          1. Entrada
        </button>
        <button 
          onClick={() => setPhase(1)} 
          className={`p-2 text-sm font-bold rounded-md border transition-all duration-200 text-center ${phase === 1 ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          2. Operación
        </button>
        <button 
          onClick={() => setPhase(2)} 
          className={`p-2 text-sm font-bold rounded-md border transition-all duration-200 text-center ${phase === 2 ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          3. Resultado
        </button>
      </div>
    </div>
  );
}

function SelectionDiagram() {
  const [active, setActive] = useState(false);

  return (
    <div className="grid gap-8 justify-items-center w-full max-w-md">
      <div className="grid gap-4 w-full bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="grid grid-cols-[3rem_1fr_1fr] bg-slate-800 text-white font-semibold text-sm">
          <div className="p-2 border-r border-slate-600">ID</div>
          <div className="p-2 border-r border-slate-600">Nombre</div>
          <div className="p-2">Carrera</div>
        </div>
        <div className="grid grid-rows-3 gap-0">
          <div className={`grid grid-cols-[3rem_1fr_1fr] text-sm transition-colors duration-500 ${active ? 'bg-emerald-100 font-medium' : 'bg-white'}`}>
            <div className="p-2 border-t border-slate-100">1</div>
            <div className="p-2 border-t border-slate-100">Ana</div>
            <div className="p-2 border-t border-slate-100 text-emerald-700">Ingeniería</div>
          </div>
          <div className={`grid grid-cols-[3rem_1fr_1fr] text-sm transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-100'}`}>
            <div className="p-2 border-t border-slate-100">2</div>
            <div className="p-2 border-t border-slate-100">Luis</div>
            <div className="p-2 border-t border-slate-100">Medicina</div>
          </div>
          <div className={`grid grid-cols-[3rem_1fr_1fr] text-sm transition-colors duration-500 ${active ? 'bg-emerald-100 font-medium' : 'bg-white'}`}>
            <div className="p-2 border-t border-slate-100">3</div>
            <div className="p-2 border-t border-slate-100">Carlos</div>
            <div className="p-2 border-t border-slate-100 text-emerald-700">Ingeniería</div>
          </div>
        </div>
        <div className="grid place-items-center p-3 bg-slate-50 border-t border-slate-200 text-xs font-mono text-slate-600 h-10">
          {active ? "σ carrera='Ingeniería'(Estudiantes)" : "Tabla Original (Estudiantes)"}
        </div>
      </div>

      {/* Controles Interactivos */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <button 
          onClick={() => setActive(false)} 
          className={`p-2 text-sm font-bold rounded-md border transition-all duration-200 text-center ${!active ? 'bg-slate-700 text-white border-slate-700 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          Ver Todos
        </button>
        <button 
          onClick={() => setActive(true)} 
          className={`p-2 text-sm font-bold rounded-md border transition-all duration-200 text-center ${active ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          Aplicar Filtro
        </button>
      </div>
    </div>
  );
}

function ProjectionDiagram() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8 w-full max-w-3xl">
      {/* Tabla Original */}
      <div className="grid border border-slate-300 rounded-md overflow-hidden bg-white shadow-sm">
        <div className="grid grid-cols-3 bg-slate-200 text-xs font-bold text-center">
          <div className="p-2 border-r border-slate-300 bg-slate-100 text-slate-400">ID</div>
          <div className="p-2 border-r border-slate-300 bg-blue-100 text-blue-800">Nombre</div>
          <div className="p-2 bg-blue-100 text-blue-800">Carrera</div>
        </div>
        <div className="grid grid-cols-3 text-xs text-center border-t border-slate-200">
          <div className="p-2 border-r border-slate-200 text-slate-400">1</div>
          <div className="p-2 border-r border-slate-200">Ana</div>
          <div className="p-2">Ingeniería</div>
        </div>
        <div className="grid grid-cols-3 text-xs text-center border-t border-slate-200">
          <div className="p-2 border-r border-slate-200 text-slate-400">2</div>
          <div className="p-2 border-r border-slate-200">Luis</div>
          <div className="p-2">Medicina</div>
        </div>
      </div>

      <div className="text-blue-500 font-bold text-xl">➔</div>

      {/* Tabla Proyectada */}
      <div className="grid border border-blue-300 rounded-md overflow-hidden bg-white shadow-md">
        <div className="grid grid-cols-2 bg-blue-600 text-white text-xs font-bold text-center">
          <div className="p-2 border-r border-blue-500">Nombre</div>
          <div className="p-2">Carrera</div>
        </div>
        <div className="grid grid-cols-2 text-xs text-center border-t border-blue-100 bg-blue-50">
          <div className="p-2 border-r border-blue-100">Ana</div>
          <div className="p-2">Ingeniería</div>
        </div>
        <div className="grid grid-cols-2 text-xs text-center border-t border-blue-100 bg-blue-50">
          <div className="p-2 border-r border-blue-100">Luis</div>
          <div className="p-2">Medicina</div>
        </div>
      </div>
    </div>
  );
}

function UnionDiagram() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 w-full max-w-3xl">
      {/* Tabla A */}
      <div className="grid border border-emerald-300 rounded overflow-hidden">
        <div className="bg-emerald-100 p-2 text-center text-xs font-bold text-emerald-800 border-b border-emerald-200">Tabla A</div>
        <div className="p-2 text-sm text-center border-b border-emerald-50">Ana</div>
        <div className="p-2 text-sm text-center">Luis</div>
      </div>

      <div className="text-slate-400 font-bold text-lg">∪</div>

      {/* Tabla B */}
      <div className="grid border border-teal-300 rounded overflow-hidden">
        <div className="bg-teal-100 p-2 text-center text-xs font-bold text-teal-800 border-b border-teal-200">Tabla B</div>
        <div className="p-2 text-sm text-center border-b border-teal-50">Marta</div>
        <div className="p-2 text-sm text-center text-slate-400 line-through">Luis</div>
      </div>

      <div className="text-slate-400 font-bold text-lg">=</div>

      {/* Resultado */}
      <div className="grid border-2 border-blue-400 rounded overflow-hidden shadow-sm">
        <div className="bg-blue-600 p-2 text-center text-xs font-bold text-white border-b border-blue-500">A ∪ B</div>
        <div className="p-2 text-sm text-center border-b border-blue-100 bg-blue-50 font-medium">Ana</div>
        <div className="p-2 text-sm text-center border-b border-blue-100 bg-blue-50 font-medium">Luis</div>
        <div className="p-2 text-sm text-center bg-blue-50 font-medium">Marta</div>
      </div>
    </div>
  );
}

function IntersectionDifferenceDiagram() {
  const [operation, setOperation] = useState<'none' | 'intersect' | 'diff'>('none');

  return (
    <div className="grid gap-6 justify-items-center w-full max-w-3xl">
      <div className="text-sm text-slate-500 mb-2 text-center w-3/4">
        Selecciona una operación para ver cómo interactúan los registros de la Tabla A y la Tabla B.
      </div>

      {/* Tablas A & B */}
      <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center w-full max-w-lg">
        {/* Tabla A */}
        <div className="grid border border-slate-300 rounded overflow-hidden shadow-sm">
          <div className="bg-slate-100 p-2 text-center text-sm font-bold border-b border-slate-200">Tabla A</div>
          <div className={`p-2 text-center text-sm border-b border-slate-100 transition-colors duration-300 ${operation === 'diff' ? 'bg-purple-100 font-bold text-purple-800' : 'bg-white'}`}>
            Ana
          </div>
          <div className={`p-2 text-center text-sm transition-colors duration-300 ${operation === 'intersect' ? 'bg-blue-100 font-bold text-blue-800' : operation === 'diff' ? 'bg-slate-50 text-slate-400 line-through' : 'bg-white'}`}>
            Luis
          </div>
        </div>

        {/* Símbolo de la operación */}
        <div className="grid place-items-center w-10 h-10 rounded-full bg-slate-100 text-xl font-bold text-slate-500">
          {operation === 'intersect' ? '∩' : operation === 'diff' ? '−' : '?'}
        </div>

        {/* Tabla B */}
        <div className="grid border border-slate-300 rounded overflow-hidden shadow-sm">
          <div className="bg-slate-100 p-2 text-center text-sm font-bold border-b border-slate-200">Tabla B</div>
          <div className={`p-2 text-center text-sm border-b border-slate-100 transition-colors duration-300 ${operation === 'intersect' ? 'bg-blue-100 font-bold text-blue-800' : 'bg-white'}`}>
            Luis
          </div>
          <div className="p-2 text-center text-sm bg-white">
            Marta
          </div>
        </div>
      </div>

      {/* Tabla de Resultado */}
      <div className={`grid border-2 rounded overflow-hidden transition-all duration-500 w-48 mt-2 ${operation === 'none' ? 'opacity-0 scale-95 border-transparent' : operation === 'intersect' ? 'opacity-100 scale-100 border-blue-400 shadow-md' : 'opacity-100 scale-100 border-purple-400 shadow-md'}`}>
        <div className={`p-2 text-center text-xs font-bold text-white ${operation === 'intersect' ? 'bg-blue-600' : 'bg-purple-600'}`}>
          Resultado ({operation === 'intersect' ? 'A ∩ B' : 'A − B'})
        </div>
        {operation === 'intersect' && (
          <div className="p-3 text-center bg-blue-50 font-bold text-blue-800">Luis</div>
        )}
        {operation === 'diff' && (
          <div className="p-3 text-center bg-purple-50 font-bold text-purple-800">Ana</div>
        )}
      </div>

      {/* Controles Interactivos */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
        <button 
          onClick={() => setOperation('intersect')} 
          className={`p-2 rounded-md border text-sm font-bold transition-all duration-200 ${operation === 'intersect' ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          Ver Intersección
        </button>
        <button 
          onClick={() => setOperation('diff')} 
          className={`p-2 rounded-md border text-sm font-bold transition-all duration-200 ${operation === 'diff' ? 'bg-purple-600 text-white border-purple-600 shadow-md' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          Ver Diferencia
        </button>
      </div>
    </div>
  );
}

function CartesianDiagram() {
  const [step, setStep] = useState(0);

  return (
    <div className="grid gap-6 justify-items-center w-full max-w-4xl">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_2fr] gap-4 items-start w-full">
        {/* Tabla A (Estudiantes) */}
        <div className="grid border border-slate-300 rounded overflow-hidden shadow-sm">
          <div className="bg-slate-100 p-2 text-center text-xs font-bold border-b border-slate-200">Tabla A (Estudiante)</div>
          <div className={`p-2 text-center text-sm border-b border-slate-100 transition-colors duration-300 ${step === 1 ? 'bg-orange-100 font-bold text-orange-800' : 'bg-white'}`}>
            Ana
          </div>
          <div className={`p-2 text-center text-sm transition-colors duration-300 ${step === 2 ? 'bg-sky-100 font-bold text-sky-800' : 'bg-white'}`}>
            Luis
          </div>
        </div>

        <div className="grid place-items-center h-full text-2xl font-bold text-slate-400">×</div>

        {/* Tabla B (Cursos) */}
        <div className="grid border border-slate-300 rounded overflow-hidden shadow-sm h-max">
          <div className="bg-slate-100 p-2 text-center text-xs font-bold border-b border-slate-200">Tabla B (Curso)</div>
          <div className={`p-2 text-center text-sm border-b border-slate-100 transition-colors duration-300 ${step > 0 ? 'bg-emerald-100 font-bold text-emerald-800' : 'bg-white'}`}>
            BD
          </div>
          <div className={`p-2 text-center text-sm transition-colors duration-300 ${step > 0 ? 'bg-emerald-100 font-bold text-emerald-800' : 'bg-white'}`}>
            Redes
          </div>
        </div>

        <div className="grid place-items-center h-full text-2xl font-bold text-slate-400">➔</div>

        {/* Tabla Resultado Combinada */}
        <div className="grid border-2 border-indigo-300 rounded overflow-hidden shadow-md bg-white">
          <div className="grid grid-cols-2 bg-indigo-600 text-white p-2 text-xs font-bold text-center">
            <div className="border-r border-indigo-500">Estudiante</div>
            <div>Curso</div>
          </div>
          
          {/* Combinaciones de Ana */}
          <div className={`grid grid-cols-2 text-sm text-center transition-all duration-500 overflow-hidden ${step >= 1 ? 'opacity-100 max-h-20 border-b border-indigo-100 bg-orange-50' : 'opacity-0 max-h-0'}`}>
            <div className="p-2 border-r border-indigo-100 text-orange-800 font-bold">Ana</div>
            <div className="p-2 text-emerald-800 font-bold">BD</div>
          </div>
          <div className={`grid grid-cols-2 text-sm text-center transition-all duration-500 overflow-hidden ${step >= 1 ? 'opacity-100 max-h-20 border-b border-indigo-100 bg-orange-50' : 'opacity-0 max-h-0'}`}>
            <div className="p-2 border-r border-indigo-100 text-orange-800 font-bold">Ana</div>
            <div className="p-2 text-emerald-800 font-bold">Redes</div>
          </div>

          {/* Combinaciones de Luis */}
          <div className={`grid grid-cols-2 text-sm text-center transition-all duration-500 overflow-hidden ${step >= 2 ? 'opacity-100 max-h-20 border-b border-indigo-100 bg-sky-50' : 'opacity-0 max-h-0'}`}>
            <div className="p-2 border-r border-indigo-100 text-sky-800 font-bold">Luis</div>
            <div className="p-2 text-emerald-800 font-bold">BD</div>
          </div>
          <div className={`grid grid-cols-2 text-sm text-center transition-all duration-500 overflow-hidden ${step >= 2 ? 'opacity-100 max-h-20 bg-sky-50' : 'opacity-0 max-h-0'}`}>
            <div className="p-2 border-r border-indigo-100 text-sky-800 font-bold">Luis</div>
            <div className="p-2 text-emerald-800 font-bold">Redes</div>
          </div>
          
          {/* Mensaje de espera (estado inicial) */}
          <div className={`p-4 text-center text-sm text-slate-400 italic transition-all duration-300 ${step === 0 ? 'block' : 'hidden'}`}>
            Haz clic en los pasos abajo para generar combinaciones...
          </div>
        </div>
      </div>
      
      {/* Controles Interactivos */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-xl mt-4">
        <button 
          onClick={() => setStep(0)} 
          className={`p-2 rounded-md border text-sm font-bold transition-all duration-200 ${step === 0 ? 'bg-slate-700 text-white shadow-md border-slate-700' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          Limpiar Tabla
        </button>
        <button 
          onClick={() => setStep(1)} 
          className={`p-2 rounded-md border text-sm font-bold transition-all duration-200 ${step === 1 ? 'bg-orange-500 text-white shadow-md border-orange-500' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          Paso 1: Combinar Ana
        </button>
        <button 
          onClick={() => setStep(2)} 
          className={`p-2 rounded-md border text-sm font-bold transition-all duration-200 ${step === 2 ? 'bg-sky-500 text-white shadow-md border-sky-500' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
        >
          Paso 2: Combinar Luis
        </button>
      </div>
    </div>
  );
}

// --- COMPONENTES DE ARQUITECTURA / LAYOUT ---

interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <article className="grid gap-8 p-8 bg-white rounded-2xl shadow-lg border border-slate-100 w-full max-w-5xl self-start justify-self-center mt-6 mb-12">
      {children}
    </article>
  );
}

interface LessonLayoutProps {
  data: SectionData[];
}

function LessonLayout({ data }: LessonLayoutProps) {
  const [activeTabId, setActiveTabId] = useState<string>(data[0].id);

  const activeSection = data.find((section) => section.id === activeTabId) || data[0];
  const ActiveDiagram = activeSection.diagram;
  const ActiveIcon = activeSection.icon;

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HEADER (Title & Nav) */}
      <header className="grid gap-6 p-6 bg-white shadow-sm border-b border-slate-200 z-10 sticky top-0">
        <div className="grid gap-1 justify-items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Álgebra Relacional</h1>
        </div>
        
        {/* TAB NAVIGATION (Grid-based layout) */}
        <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 w-full max-w-6xl justify-self-center">
          {data.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`grid grid-cols-[auto_1fr] items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all duration-200 border text-left
                  ${isActive 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span className="truncate">{tab.title.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="grid p-4 md:p-8 overflow-y-auto">
        <Card>
          {/* Section Header */}
          <header className="grid grid-cols-[auto_1fr] gap-4 items-center border-b border-slate-100 pb-6">
            <div className="grid place-items-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl">
              <ActiveIcon size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{activeSection.title}</h2>
          </header>

          {/* Section Description */}
          <section className="grid text-lg">
            {activeSection.description}
          </section>

          {/* Diagram Render Area */}
          <section className="grid gap-4 mt-4">
            <div className="grid place-items-center min-h-[350px] p-8 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 overflow-x-auto">
              <ActiveDiagram />
            </div>
          </section>
        </Card>
      </main>
    </div>
  );
}

// --- ENTRY POINT ---

export default function App() {
  return <LessonLayout data={LESSON_DATA} />;
}