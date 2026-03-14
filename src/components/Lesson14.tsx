import React, { useState } from 'react';
import { Database, ShieldAlert, CheckCircle2, XCircle, KeyRound, AlertTriangle } from 'lucide-react';

// --- TIPOS E INTERFACES ---

interface LessonContent {
  id: string;
  title: string;
  description: string;
  renderComponent: React.FC;
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: number;
  setActiveTab: (index: number) => void;
  tabs: string[];
}

interface CardProps {
  children: React.ReactNode;
}

// --- DATOS DE LA LECCIÓN ---

const LESSON_DATA: LessonContent[] = [
  {
    id: 'q1',
    title: 'Introducción al índice único',
    description: 'En muchas bases de datos es necesario garantizar que ciertos valores no se repitan entre los registros. Un ejemplo común es el correo electrónico de los usuarios, que suele ser único para cada persona. Para asegurar esta restricción, los sistemas gestores de bases de datos permiten crear índices únicos, los cuales verifican automáticamente que los valores de una columna no se dupliquen.',
    renderComponent: () => (
      <div className="grid grid-cols-1 gap-6 w-full max-w-2xl mx-auto">
        <div className="grid justify-items-center">
          <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-semibold border border-indigo-200 shadow-sm">
            <KeyRound size={18} />
            <span>Regla Activa: Índice Único</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 border border-slate-300 rounded-xl overflow-hidden shadow-sm text-sm bg-white">
          <div className="grid p-3 bg-slate-100 font-bold border-b border-r border-slate-300 text-slate-700">ID</div>
          <div className="grid p-3 bg-slate-100 font-bold border-b border-r border-slate-300 text-slate-700">Nombre</div>
          <div className="grid grid-cols-[1fr_auto] items-center p-3 bg-indigo-50 font-bold border-b border-slate-300 text-indigo-900">
            <span>Email</span>
            <span className="grid bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded-md uppercase tracking-wider">Único</span>
          </div>

          <div className="grid p-3 border-b border-r border-slate-200 text-slate-600">1</div>
          <div className="grid p-3 border-b border-r border-slate-200 font-medium text-slate-800">Ana Silva</div>
          <div className="grid p-3 border-b border-slate-200 bg-indigo-50/50 text-indigo-700 font-mono text-xs items-center">ana@ejemplo.com</div>

          <div className="grid p-3 border-b border-r border-slate-200 text-slate-600">2</div>
          <div className="grid p-3 border-b border-r border-slate-200 font-medium text-slate-800">Carlos Ruiz</div>
          <div className="grid p-3 border-b border-slate-200 bg-indigo-50/50 text-indigo-700 font-mono text-xs items-center">carlos.r@ejemplo.com</div>

          <div className="grid p-3 border-r border-slate-200 text-slate-600">3</div>
          <div className="grid p-3 border-r border-slate-200 font-medium text-slate-800">Elena Gómez</div>
          <div className="grid p-3 border-slate-200 bg-indigo-50/50 text-indigo-700 font-mono text-xs items-center">elena99@ejemplo.com</div>
        </div>
        <div className="grid text-center text-sm text-slate-500 mt-2">
          El sistema controla que no existan duplicados en la columna resaltada.
        </div>
      </div>
    ),
  },
  {
    id: 'q2',
    title: 'Definición de índice único',
    description: 'Un índice único (Unique Index) es un tipo de índice que garantiza que todos los valores de una columna o conjunto de columnas sean diferentes entre sí. Si se intenta insertar o actualizar un registro con un valor que ya existe en la columna indexada, el sistema gestor de bases de datos rechazará la operación.',
    renderComponent: () => (
      <div className="grid grid-cols-1 gap-8 w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-[auto_1fr] gap-4 p-5 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl shadow-sm">
          <Database className="text-blue-600 mt-1" size={24} />
          <div className="grid gap-1">
            <h4 className="font-bold text-blue-900 text-lg">Índice Único (Unique Index)</h4>
            <p className="text-blue-800 text-sm leading-relaxed">Estructura a nivel de base de datos que impone una restricción de unicidad, asegurando que ninguna fila tenga el mismo valor en la columna especificada.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid grid-rows-[auto_1fr] border border-emerald-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-emerald-50 p-3 border-b border-emerald-200 text-emerald-800 font-semibold">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Operación Exitosa</span>
            </div>
            <div className="grid p-4 bg-white gap-3 text-sm">
              <div className="grid font-mono text-xs bg-slate-100 p-2 rounded text-slate-700">INSERT: 'nuevo@email.com'</div>
              <div className="grid text-emerald-600 font-medium">✓ El valor no existe. Se inserta correctamente.</div>
            </div>
          </div>

          <div className="grid grid-rows-[auto_1fr] border border-red-200 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-red-50 p-3 border-b border-red-200 text-red-800 font-semibold">
              <XCircle size={18} className="text-red-600" />
              <span>Operación Rechazada</span>
            </div>
            <div className="grid p-4 bg-white gap-3 text-sm">
              <div className="grid font-mono text-xs bg-slate-100 p-2 rounded text-slate-700">INSERT: 'ana@ejemplo.com'</div>
              <div className="grid text-red-600 font-medium">✗ El valor ya existe. La base de datos aborta la transacción.</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'q3',
    title: 'Función de integridad de datos',
    description: 'Además de mejorar la velocidad de búsqueda, los índices únicos también cumplen una función de integridad de datos. Al impedir valores duplicados, ayudan a mantener la consistencia de la información dentro de la base de datos. Esto resulta especialmente importante en atributos que deben ser exclusivos, como números de identificación, nombres de usuario o direcciones de correo electrónico.',
    renderComponent: () => (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-inner w-full max-w-4xl mx-auto">
        
        {/* Intento de inserción */}
        <div className="grid gap-3 justify-items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nueva Transacción</span>
          <div className="grid bg-white border border-slate-300 rounded-lg p-4 shadow-md w-full relative">
            <div className="grid text-xs text-slate-500 mb-1">Petición entrante:</div>
            <div className="grid font-mono text-sm text-indigo-700 font-semibold">
              {'{'} <br/>
              &nbsp;&nbsp;id: 4,<br/>
              &nbsp;&nbsp;email: "ana@ejemplo.com"<br/>
              {'}'}
            </div>
          </div>
        </div>

        {/* Bloqueo */}
        <div className="grid gap-2 justify-items-center relative z-10">
          <div className="grid place-items-center bg-red-100 text-red-600 p-4 rounded-full border-4 border-white shadow-lg">
            <ShieldAlert size={40} />
          </div>
          <div className="grid bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm text-center">
            RESTRICCIÓN<br/>DE UNICIDAD
          </div>
        </div>

        {/* Base de datos */}
        <div className="grid gap-3 justify-items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estado Actual BD</span>
          <div className="grid bg-slate-800 text-slate-300 border border-slate-700 rounded-lg p-4 shadow-md w-full justify-items-center gap-3">
            <Database size={32} className="text-indigo-400" />
            <div className="grid grid-cols-1 gap-1 w-full text-xs font-mono">
              <div className="grid bg-slate-700/50 p-2 rounded">id: 1, email: "ana@ejemplo.com"</div>
              <div className="grid bg-slate-700/50 p-2 rounded">id: 2, email: "carlos@..."</div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center text-amber-400 bg-amber-400/10 px-2 py-1 rounded w-full mt-2">
              <AlertTriangle size={14} />
              <span className="text-[10px] font-bold">Conflicto de colisión</span>
            </div>
          </div>
        </div>

      </div>
    ),
  },
  {
    id: 'q4',
    title: 'Creación de un índice único en SQL',
    description: 'En SQL, un índice único se crea mediante la instrucción CREATE UNIQUE INDEX, que indica al sistema que los valores de la columna indexada deben ser exclusivos. Observa la sintaxis y los componentes de la consulta.',
    renderComponent: () => (
      <div className="grid grid-cols-1 gap-6 w-full max-w-3xl mx-auto">
        
        {/* Código SQL */}
        <div className="grid bg-[#0d1117] text-slate-300 p-6 rounded-xl font-mono text-sm shadow-lg overflow-hidden border border-slate-700 relative">
          <div className="absolute top-0 right-0 bg-slate-800 text-slate-400 text-[10px] px-2 py-1 rounded-bl-lg font-sans font-bold">SQL</div>
          <div className="grid grid-cols-[auto_1fr] gap-4">
            <div className="grid grid-rows-2 text-slate-600 text-right select-none gap-2">
              <span>1</span>
              <span>2</span>
            </div>
            <div className="grid grid-rows-2 gap-2">
              <div className="grid grid-cols-[auto_auto_1fr] justify-start gap-2">
                <span className="text-[#ff7b72] font-semibold">CREATE UNIQUE INDEX</span> 
                <span className="text-[#79c0ff] bg-blue-900/30 px-1 rounded border border-blue-500/30">idx_email</span>
              </div>
              <div className="grid grid-cols-[auto_auto_auto_auto_1fr] justify-start gap-1">
                <span className="text-[#ff7b72] font-semibold">ON</span> 
                <span className="text-[#d2a8ff] bg-purple-900/30 px-1 rounded border border-purple-500/30">usuarios</span>
                <span className="text-slate-400">(</span>
                <span className="text-[#a5d6ff] bg-sky-900/30 px-1 rounded border border-sky-500/30">email</span>
                <span className="text-slate-400">);</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explicación de sintaxis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid p-4 bg-blue-50 border-t-4 border-blue-400 rounded-b-lg shadow-sm gap-2">
            <span className="font-mono font-bold text-blue-700 text-sm">idx_email</span>
            <span className="text-xs text-blue-900">El nombre asignado al índice. Es una buena práctica usar prefijos como <code className="bg-blue-100 px-1 rounded">idx_</code>.</span>
          </div>
          
          <div className="grid p-4 bg-purple-50 border-t-4 border-purple-400 rounded-b-lg shadow-sm gap-2">
            <span className="font-mono font-bold text-purple-700 text-sm">usuarios</span>
            <span className="text-xs text-purple-900">La tabla destino sobre la cual se aplicará la restricción de integridad estructural.</span>
          </div>
          
          <div className="grid p-4 bg-sky-50 border-t-4 border-sky-400 rounded-b-lg shadow-sm gap-2">
            <span className="font-mono font-bold text-sky-700 text-sm">email</span>
            <span className="text-xs text-sky-900">La columna (o columnas) cuyos valores el motor de BD verificará que sean 100% exclusivos.</span>
          </div>
        </div>

      </div>
    ),
  }
];

// --- COMPONENTES ESTRUCTURALES ---

const Header: React.FC<{
  tabs: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <header className="grid grid-rows-[auto_auto] gap-4 bg-white border-b border-slate-200 px-6 pt-6 sticky top-0 z-20 shadow-sm">
      <div className="grid grid-cols-[auto_1fr] items-center gap-3">
        <div className="grid place-items-center bg-indigo-600 text-white p-2 rounded-lg">
          <Database size={24} />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Arquitectura de Datos: Índices Únicos
        </h1>
      </div>
      
      <nav className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`grid text-center py-3 px-4 text-sm font-semibold rounded-t-lg border-b-4 transition-all duration-200 cursor-pointer outline-none ${
              activeTab === index
                ? 'bg-indigo-50 text-indigo-700 border-indigo-600'
                : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
};

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="grid gap-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      {children}
    </div>
  );
};

const LessonLayout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, tabs }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="grid place-items-start p-6 max-w-6xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (APP) ---

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = LESSON_DATA.map(lesson => lesson.title.split('—')[0].trim()); // Extrae "Quark 1", etc.
  const currentLesson = LESSON_DATA[activeTab];

  return (
    <LessonLayout tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}>
      <Card>
        {/* Cabecera del Panel */}
        <div className="grid gap-2 border-b border-slate-100 pb-6">
        
          <h2 className="text-3xl font-bold text-slate-800">
            {currentLesson.title.split('—')[1]?.trim() || currentLesson.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mt-2 max-w-4xl">
            {currentLesson.description}
          </p>
        </div>

        {/* Área de Renderizado del Diagrama */}
        <div className="grid mt-4 bg-slate-50/50 p-6 rounded-xl border border-dashed border-slate-300 min-h-[300px] place-items-center">
          <currentLesson.renderComponent />
        </div>
      </Card>
    </LessonLayout>
  );
}