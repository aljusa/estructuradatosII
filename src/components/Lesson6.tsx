import React, { useState, useEffect } from 'react';
import { 
  Database, 
  User, 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound, 
  Server,
  Search,
  PlusCircle,
  Edit,
  Trash2,
  FileCode2,
  Settings
} from 'lucide-react';

// --- Tipos e Interfaces ---
interface TabData {
  id: string;
  title: string;
}

interface SectionData {
  id: string;
  tabTitle: string;
  diagramTitle: string;
  diagramDescription: React.ReactNode;
  renderDiagram: () => React.ReactNode;
}

// --- Componentes Base ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const LessonLayout: React.FC<{
  title: string;
  tabs: TabData[];
  activeTabIndex: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode;
}> = ({ title, tabs, activeTabIndex, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header & Nav */}
      <header className="grid grid-rows-[auto_auto] bg-slate-900 text-white shadow-md">
        <div className="grid place-items-center p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        </div>
        <nav className="grid place-items-center bg-slate-800">
          <div className="grid grid-cols-3 w-full max-w-4xl">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(index)}
                className={`grid place-items-center py-4 px-2 text-sm md:text-base font-medium transition-colors border-b-4 ${
                  activeTabIndex === index
                    ? 'border-blue-500 bg-slate-700 text-blue-300'
                    : 'border-transparent text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid p-4 md:p-8 w-full max-w-5xl mx-auto h-full">
        {children}
      </main>
    </div>
  );
};

// --- Componentes de Diagramas (Render) ---

const GrantDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 w-full h-full p-6 bg-slate-50 rounded-xl">
      <div className="grid place-items-center">
        <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold tracking-wide border border-blue-200">
          Animación en tiempo real: Asignación de Privilegios
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 place-items-center relative">
        {/* Admin Node */}
        <div className="grid grid-rows-[auto_auto] place-items-center gap-2">
          <div className="grid place-items-center w-20 h-20 bg-slate-800 rounded-full text-white shadow-lg z-10">
            <ShieldCheck size={40} />
          </div>
          <span className="font-bold text-slate-700 text-center">Administrador<br/><span className="text-xs font-normal text-slate-500">(GRANT)</span></span>
        </div>

        {/* Animation Path */}
        <div className="grid w-full relative h-20 place-items-center">
          <div className="w-full h-2 bg-slate-300 rounded-full absolute top-1/2 -translate-y-1/2 overflow-hidden">
            <div className={`h-full bg-blue-500 transition-all duration-1000 ${step === 0 ? 'w-0' : step === 1 ? 'w-1/2' : 'w-full'}`}></div>
          </div>
          
          <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 grid place-items-center w-10 h-10 bg-yellow-400 rounded-full shadow border-2 border-white z-20 ${
            step === 0 ? 'left-0 opacity-0' : step === 1 ? 'left-1/2 -translate-x-1/2 opacity-100' : 'left-full -translate-x-full opacity-0'
          }`}>
            <KeyRound size={20} className="text-yellow-900" />
          </div>
        </div>

        {/* User Node */}
        <div className="grid grid-rows-[auto_auto] place-items-center gap-2">
          <div className={`grid place-items-center w-20 h-20 rounded-full shadow-lg z-10 transition-colors duration-500 ${step === 2 ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
            <User size={40} />
          </div>
          <span className="font-bold text-slate-700 text-center">usuario1<br/><span className="text-xs font-normal text-slate-500">(estudiantes)</span></span>
        </div>
      </div>
      
      {/* DB Status */}
      <div className="grid place-items-center mt-8">
         <div className="grid grid-cols-[auto_1fr] place-items-center gap-4 bg-white p-4 rounded-lg shadow border border-slate-200 w-full max-w-sm">
            <Database size={32} className={step === 2 ? 'text-green-500' : 'text-slate-400'} />
            <div className="grid grid-rows-2 w-full">
              <span className="font-bold text-slate-700">Estado de la Base de Datos</span>
              <span className={`text-sm ${step === 2 ? 'text-green-600 font-medium' : 'text-slate-500'}`}>
                {step === 2 ? '✓ Permiso SELECT registrado' : 'Esperando asignación...'}
              </span>
            </div>
         </div>
      </div>
    </div>
  );
};

const RevokeDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 w-full h-full p-6 bg-slate-50 rounded-xl">
      <div className="grid place-items-center">
        <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-semibold tracking-wide border border-red-200">
          Animación en tiempo real: Revocación de Privilegios
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 place-items-center relative">
        {/* Admin Node */}
        <div className="grid grid-rows-[auto_auto] place-items-center gap-2">
          <div className="grid place-items-center w-20 h-20 bg-slate-800 rounded-full text-white shadow-lg z-10">
            <ShieldAlert size={40} />
          </div>
          <span className="font-bold text-slate-700 text-center">Administrador<br/><span className="text-xs font-normal text-slate-500">(REVOKE)</span></span>
        </div>

        {/* Animation Path */}
        <div className="grid w-full relative h-20 place-items-center">
          <div className="w-full h-2 rounded-full absolute top-1/2 -translate-y-1/2 overflow-hidden bg-slate-300">
            <div className={`h-full transition-all duration-1000 ${step === 0 ? 'bg-green-500 w-full' : step === 1 ? 'bg-red-400 w-1/2 float-right' : 'bg-slate-300 w-0'}`}></div>
          </div>
          
          <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-1000 grid place-items-center w-10 h-10 bg-slate-700 rounded-full shadow border-2 border-white z-20 ${
            step === 0 ? 'left-full -translate-x-full opacity-100' : step === 1 ? 'left-1/2 -translate-x-1/2 opacity-100' : 'left-0 opacity-0'
          }`}>
            <Trash2 size={20} className="text-white" />
          </div>
        </div>

        {/* User Node */}
        <div className="grid grid-rows-[auto_auto] place-items-center gap-2">
          <div className={`grid place-items-center w-20 h-20 rounded-full shadow-lg z-10 transition-colors duration-500 ${step === 0 ? 'bg-green-500 text-white' : 'bg-red-100 text-red-500 border-2 border-red-500'}`}>
            <User size={40} />
          </div>
          <span className="font-bold text-slate-700 text-center">usuario1<br/><span className="text-xs font-normal text-slate-500">(estudiantes)</span></span>
        </div>
      </div>
      
      {/* DB Status */}
      <div className="grid place-items-center mt-8">
         <div className="grid grid-cols-[auto_1fr] place-items-center gap-4 bg-white p-4 rounded-lg shadow border border-slate-200 w-full max-w-sm">
            <Database size={32} className={step === 0 ? 'text-green-500' : 'text-red-500'} />
            <div className="grid grid-rows-2 w-full">
              <span className="font-bold text-slate-700">Estado de la Base de Datos</span>
              <span className={`text-sm ${step === 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}`}>
                {step === 0 ? '✓ Acceso INSERT activo' : '✗ Acceso INSERT denegado'}
              </span>
            </div>
         </div>
      </div>
    </div>
  );
};

const TypesDiagram: React.FC = () => {
  const privileges = [
    { name: 'SELECT', desc: 'Consultar datos', icon: <Search size={24} />, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-500' },
    { name: 'INSERT', desc: 'Agregar registros', icon: <PlusCircle size={24} />, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-500' },
    { name: 'UPDATE', desc: 'Modificar registros', icon: <Edit size={24} />, color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-500' },
    { name: 'DELETE', desc: 'Eliminar registros', icon: <Trash2 size={24} />, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-500' },
    { name: 'CREATE', desc: 'Crear objetos (DDL)', icon: <FileCode2 size={24} />, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-500' },
    { name: 'ALTER', desc: 'Modificar estructuras', icon: <Settings size={24} />, color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-500' },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] gap-8 w-full h-full p-6 bg-slate-50 rounded-xl">
      <div className="grid place-items-center">
        <div className="grid grid-cols-[auto_1fr] place-items-center gap-3 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-lg">
          <Server size={28} />
          <span className="text-lg font-bold">Arquitectura de Mínimo Privilegio</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {privileges.map((priv) => (
          <div key={priv.name} className={`grid grid-cols-[auto_1fr] place-items-center gap-4 bg-white p-4 rounded-lg shadow-sm border-l-4 ${priv.border} hover:shadow-md transition-shadow`}>
            <div className={`grid place-items-center w-12 h-12 rounded-full ${priv.bg} ${priv.color}`}>
              {priv.icon}
            </div>
            <div className="grid w-full">
              <span className="font-bold text-slate-800 tracking-wide">{priv.name}</span>
              <span className="text-sm text-slate-500">{priv.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Datos de la Lección ---

const lessonSections: SectionData[] = [
  {
    id: 'grant',
    tabTitle: '1. Concesión (GRANT)',
    diagramTitle: 'Otorgar Privilegios con GRANT',
    diagramDescription: (
      <div className="grid gap-4 text-slate-600 leading-relaxed">
        <p>
          Los Sistemas de Gestión de Bases de Datos permiten asignar permisos a los usuarios mediante la instrucción <strong className="text-blue-600 font-mono">GRANT</strong>.
          Esta instrucción define qué operaciones puede realizar un usuario sobre un objeto específico.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-100 p-4 rounded border border-slate-200 grid gap-2">
            <span className="font-bold text-slate-700 text-sm">Sintaxis General:</span>
            <pre className="text-sm bg-slate-800 text-slate-100 p-3 rounded font-mono overflow-x-auto">
GRANT privilegio{'\n'}ON objeto{'\n'}TO usuario;
            </pre>
          </div>
          <div className="bg-slate-100 p-4 rounded border border-slate-200 grid gap-2">
            <span className="font-bold text-slate-700 text-sm">Ejemplo Práctico:</span>
            <pre className="text-sm bg-slate-800 text-slate-100 p-3 rounded font-mono overflow-x-auto text-blue-300">
GRANT SELECT{'\n'}ON estudiantes{'\n'}TO usuario1;
            </pre>
          </div>
        </div>
        <p className="text-sm border-l-4 border-blue-500 pl-4 py-1 bg-blue-50/50">
          En el ejemplo, el <strong>usuario1</strong> ahora puede consultar (SELECT) información en la tabla <strong>estudiantes</strong>. Estos privilegios pueden aplicar a tablas, vistas, procedimientos o bases de datos completas.
        </p>
      </div>
    ),
    renderDiagram: () => <GrantDiagram />
  },
  {
    id: 'revoke',
    tabTitle: '2. Revocación (REVOKE)',
    diagramTitle: 'Retirar Privilegios con REVOKE',
    diagramDescription: (
      <div className="grid gap-4 text-slate-600 leading-relaxed">
        <p>
          La instrucción <strong className="text-red-600 font-mono">REVOKE</strong> permite retirar permisos que fueron previamente otorgados a un usuario. 
          Este mecanismo es crucial para ajustar los permisos cuando cambian las responsabilidades de los usuarios.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-100 p-4 rounded border border-slate-200 grid gap-2">
            <span className="font-bold text-slate-700 text-sm">Sintaxis General:</span>
            <pre className="text-sm bg-slate-800 text-slate-100 p-3 rounded font-mono overflow-x-auto">
REVOKE privilegio{'\n'}ON objeto{'\n'}FROM usuario;
            </pre>
          </div>
          <div className="bg-slate-100 p-4 rounded border border-slate-200 grid gap-2">
            <span className="font-bold text-slate-700 text-sm">Ejemplo Práctico:</span>
            <pre className="text-sm bg-slate-800 text-slate-100 p-3 rounded font-mono overflow-x-auto text-red-300">
REVOKE INSERT{'\n'}ON estudiantes{'\n'}FROM usuario1;
            </pre>
          </div>
        </div>
        <p className="text-sm border-l-4 border-red-500 pl-4 py-1 bg-red-50/50">
          Después de ejecutar esta instrucción, el usuario ya no podrá insertar nuevos registros en la tabla indicada, perdiendo acceso inmediatamente.
        </p>
      </div>
    ),
    renderDiagram: () => <RevokeDiagram />
  },
  {
    id: 'types',
    tabTitle: '3. Tipos de Privilegios',
    diagramTitle: 'Clasificación de Privilegios en SQL',
    diagramDescription: (
      <div className="grid gap-4 text-slate-600 leading-relaxed">
        <p>
          Los privilegios determinan de manera granular las operaciones exactas que un usuario puede ejecutar en la base de datos.
          Se dividen principalmente en operaciones de manipulación de datos (DML) y definición de datos (DDL).
        </p>
        <div className="grid grid-rows-[auto_auto] gap-2 bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <span className="font-bold text-blue-900 grid grid-cols-[auto_1fr] gap-2 place-items-center">
             <ShieldCheck size={18} /> El Principio de Mínimo Privilegio
          </span>
          <p className="text-sm text-blue-800">
            La correcta asignación de estos privilegios permite mantener una arquitectura segura, donde cada usuario posee <strong>únicamente</strong> los permisos estrictamente necesarios para realizar su trabajo.
          </p>
        </div>
      </div>
    ),
    renderDiagram: () => <TypesDiagram />
  }
];

// --- Aplicación Principal ---

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: TabData[] = lessonSections.map(section => ({
    id: section.id,
    title: section.tabTitle
  }));

  const currentSection = lessonSections[activeTab];

  return (
    <LessonLayout
      title="Gestión de Privilegios en Bases de Datos"
      tabs={tabs}
      activeTabIndex={activeTab}
      onTabChange={setActiveTab}
    >
      <Card className="grid grid-rows-[auto_auto_1fr] gap-8 h-full">
        {/* Diagram Title */}
        <div className="grid border-b border-slate-100 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            {currentSection.diagramTitle}
          </h2>
        </div>

        {/* Diagram Description */}
        <div className="grid">
          {currentSection.diagramDescription}
        </div>

        {/* Diagram Render */}
        <div className="grid place-items-center w-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl overflow-hidden bg-white">
          {currentSection.renderDiagram()}
        </div>
      </Card>
    </LessonLayout>
  );
}