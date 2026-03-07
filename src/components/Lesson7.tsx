import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Activity, 
  HardDrive, 
  ShieldCheck, 
  User, 
  CheckCircle, 
  Lock, 
  DatabaseBackup,
  Cpu,
  FileSearch
} from 'lucide-react';

// --- DEFINICIÓN DE TIPOS ---

type SectionId = 'procesador' | 'almacenamiento' | 'transacciones' | 'seguridad';

interface SectionData {
  id: SectionId;
  tabLabel: string;
  icon: React.ElementType;
  diagramTitle: string;
  diagramDescription: string;
  content: {
    intro: string;
    listTitle: string;
    listItems: string[];
    outro: string;
  };
}

// --- DATOS DE LA LECCIÓN ---

const lessonData: SectionData[] = [
  {
    id: 'procesador',
    tabLabel: 'Procesador de Consultas',
    icon: Cpu,
    diagramTitle: 'Flujo de Ejecución de Consultas',
    diagramDescription: 'Diagrama dinámico que ilustra cómo el sistema transforma una consulta SQL de alto nivel en operaciones internas ejecutables.',
    content: {
      intro: 'El procesador de consultas es el componente encargado de interpretar y ejecutar las instrucciones SQL enviadas por los usuarios. Cuando un usuario envía una consulta, el sistema realiza varios pasos:',
      listTitle: 'El procesador incluye tres elementos principales que realizan las siguientes acciones:',
      listItems: [
        'Analiza la sintaxis de la consulta (Analizador sintáctico).',
        'Verifica la estructura de las tablas en el catálogo.',
        'Optimiza la forma de ejecutar la consulta (Optimizador de consultas).',
        'Ejecuta la operación solicitada (Ejecutor de consultas).'
      ],
      outro: 'Este componente permite transformar las consultas de alto nivel en operaciones internas del sistema.'
    }
  },
  {
    id: 'almacenamiento',
    tabLabel: 'Gestor de Almacenamiento',
    icon: HardDrive,
    diagramTitle: 'Arquitectura de Almacenamiento',
    diagramDescription: 'Diagrama estático que detalla la relación arquitectónica entre la memoria principal, los buffers y el almacenamiento físico en disco.',
    content: {
      intro: 'El gestor de almacenamiento administra la forma en que los datos se guardan físicamente en los dispositivos de almacenamiento.',
      listTitle: 'Entre sus funciones principales se encuentran:',
      listItems: [
        'Administrar archivos de datos.',
        'Gestionar índices.',
        'Manejar buffers de memoria.',
        'Controlar el acceso a disco.'
      ],
      outro: 'Este componente permite que los datos se almacenen y recuperen de manera eficiente.'
    }
  },
  {
    id: 'transacciones',
    tabLabel: 'Gestor de Transacciones',
    icon: Activity,
    diagramTitle: 'Ciclo de Vida y Propiedades ACID',
    diagramDescription: 'Diagrama dinámico que representa el ciclo de una transacción validando continuamente el cumplimiento de las propiedades ACID.',
    content: {
      intro: 'El gestor de transacciones garantiza que las operaciones sobre la base de datos se ejecuten de forma segura y consistente.',
      listTitle: 'Las transacciones deben cumplir las propiedades ACID:',
      listItems: [
        'Atomicidad: Todo o nada.',
        'Consistencia: Mantener reglas de integridad.',
        'Aislamiento: Transacciones independientes.',
        'Durabilidad: Cambios persistentes ante fallos.'
      ],
      outro: 'Estas propiedades aseguran que las operaciones se completen correctamente incluso en caso de fallos del sistema.'
    }
  },
  {
    id: 'seguridad',
    tabLabel: 'Gestor de Seguridad',
    icon: ShieldCheck,
    diagramTitle: 'Flujo de Validación de Accesos',
    diagramDescription: 'Diagrama interactivo. Haz clic en "Solicitar Acceso" para simular el flujo de validación de permisos en el sistema.',
    content: {
      intro: 'El gestor de seguridad controla el acceso al sistema y verifica que los usuarios tengan los permisos necesarios para realizar operaciones.',
      listTitle: 'Entre sus funciones principales se encuentran:',
      listItems: [
        'Autenticación de usuarios.',
        'Verificación de privilegios.',
        'Control de accesos.',
        'Registro de auditorías.'
      ],
      outro: 'Este componente protege la base de datos contra accesos indebidos y garantiza el uso adecuado de la información.'
    }
  }
];

// --- COMPONENTES DE PRESENTACIÓN Y LAYOUT ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- COMPONENTES DE DIAGRAMAS (RENDERS) ---

const QueryProcessorDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Usuario', 'Analizador', 'Optimizador', 'Ejecutor', 'Datos'];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="grid grid-cols-[repeat(5,minmax(0,1fr))] gap-2 place-items-center p-8 bg-slate-50 rounded-lg border border-slate-200 min-h-[250px]">
      {steps.map((step, index) => (
        <div key={step} className="grid grid-rows-[auto_auto] gap-3 place-items-center relative w-full">
          <div 
            className={`grid place-items-center w-16 h-16 rounded-full border-4 transition-all duration-500 shadow-sm
              ${activeStep === index 
                ? 'border-blue-500 bg-blue-100 scale-110 text-blue-700' 
                : 'border-slate-300 bg-white text-slate-400 scale-100'}`}
          >
            {index === 0 && <User size={24} />}
            {index === 1 && <FileSearch size={24} />}
            {index === 2 && <Activity size={24} />}
            {index === 3 && <Cpu size={24} />}
            {index === 4 && <Database size={24} />}
          </div>
          <span className={`text-sm font-semibold transition-colors duration-300 text-center ${activeStep === index ? 'text-blue-700' : 'text-slate-500'}`}>
            {step}
          </span>
          
          {index < steps.length - 1 && (
            <div className="absolute right-[-50%] top-8 w-full grid place-items-center -translate-y-1/2 z-0 pointer-events-none">
               <div className={`h-1 w-full transition-all duration-300 ${activeStep === index ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const StorageManagerDiagram: React.FC = () => {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] gap-6 p-6 bg-slate-50 rounded-lg border border-slate-200 min-h-[300px]">
      
      <div className="grid grid-cols-2 gap-4 place-items-center w-full max-w-2xl mx-auto">
        <div className="grid place-items-center p-4 bg-indigo-100 border-2 border-indigo-300 rounded-lg w-full shadow-sm text-indigo-800 font-semibold">
          Memoria Principal
        </div>
        <div className="grid place-items-center p-4 bg-teal-100 border-2 border-teal-300 rounded-lg w-full shadow-sm text-teal-800 font-semibold">
          Caché / Buffers
        </div>
      </div>

      <div className="grid place-items-center">
        <div className="grid grid-flow-col gap-1 items-center">
          <div className="w-1 h-12 bg-slate-400"></div>
          <div className="w-1 h-12 bg-slate-400"></div>
        </div>
        <div className="grid place-items-center p-4 bg-slate-800 text-white rounded-lg shadow-md font-bold w-64 border-b-4 border-slate-600">
          Gestor de Almacenamiento
        </div>
        <div className="grid grid-flow-col gap-1 items-center">
          <div className="w-1 h-12 bg-slate-400"></div>
          <div className="w-1 h-12 bg-slate-400"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 place-items-center w-full max-w-2xl mx-auto">
        <div className="grid grid-rows-[auto_auto] place-items-center gap-2 p-4 bg-slate-200 border-2 border-slate-300 rounded-lg w-full shadow-sm">
          <DatabaseBackup className="text-slate-600" size={32} />
          <span className="font-semibold text-slate-700">Archivos de Datos</span>
        </div>
        <div className="grid grid-rows-[auto_auto] place-items-center gap-2 p-4 bg-slate-200 border-2 border-slate-300 rounded-lg w-full shadow-sm">
           <FileSearch className="text-slate-600" size={32} />
          <span className="font-semibold text-slate-700">Índices</span>
        </div>
      </div>

    </div>
  );
};

const TransactionManagerDiagram: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const acidProps = [
    { name: 'Atomicidad', desc: 'Todo o Nada' },
    { name: 'Consistencia', desc: 'Integridad Válida' },
    { name: 'Aislamiento', desc: 'Independencia' },
    { name: 'Durabilidad', desc: 'Persistencia' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % acidProps.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [acidProps.length]);

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-8 p-8 bg-slate-50 rounded-lg border border-slate-200 items-center min-h-[300px]">
      
      <div className="grid grid-rows-[auto_auto] gap-4 place-items-center p-6 bg-white rounded-xl shadow border border-slate-200">
        <div className="text-lg font-bold text-slate-700">Inicio Transacción</div>
        <div className="grid place-items-center w-12 h-12 bg-green-100 rounded-full text-green-600">
          <Activity size={24} />
        </div>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 place-items-center p-6 bg-blue-50 rounded-full border-4 border-dashed border-blue-200 w-64 h-64 relative">
        <div className="absolute top-0 left-0 w-full h-full grid place-items-center pointer-events-none opacity-10">
           <Activity size={120} />
        </div>
        {acidProps.map((prop, idx) => (
          <div 
            key={prop.name} 
            className={`grid place-items-center text-center p-2 rounded-lg transition-all duration-300 z-10 w-full h-full
              ${activeIndex === idx ? 'bg-blue-600 text-white shadow-lg scale-110' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            <span className="font-bold text-sm">{prop.name}</span>
            <span className={`text-xs ${activeIndex === idx ? 'text-blue-100' : 'text-slate-400'}`}>{prop.desc}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-rows-[auto_auto] gap-4 place-items-center p-6 bg-white rounded-xl shadow border border-slate-200">
        <div className="text-lg font-bold text-slate-700">Commit / Rollback</div>
        <div className="grid place-items-center w-12 h-12 bg-slate-100 rounded-full text-slate-600">
          <Database size={24} />
        </div>
      </div>

    </div>
  );
};

const SecurityManagerDiagram: React.FC = () => {
  const [processState, setProcessState] = useState<'idle' | 'auth' | 'privs' | 'success'>('idle');

  const handleRequestAccess = () => {
    setProcessState('auth');
    setTimeout(() => setProcessState('privs'), 1200);
    setTimeout(() => setProcessState('success'), 2400);
    setTimeout(() => setProcessState('idle'), 4500);
  };

  const steps = [
    { id: 'auth', label: 'Autenticación', icon: User },
    { id: 'privs', label: 'Verificación de Privilegios', icon: Lock },
    { id: 'success', label: 'Acceso Concedido / Auditoría', icon: CheckCircle }
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 p-6 bg-slate-50 rounded-lg border border-slate-200 min-h-[300px]">
      
      <div className="grid place-items-center">
        <button 
          onClick={handleRequestAccess}
          disabled={processState !== 'idle'}
          className={`px-6 py-3 rounded-lg font-bold text-white shadow-md transition-all 
            ${processState === 'idle' 
              ? 'bg-blue-600 hover:bg-blue-700 active:scale-95' 
              : 'bg-slate-400 cursor-not-allowed'}`}
        >
          {processState === 'idle' ? 'Simular Solicitud de Acceso' : 'Procesando Solicitud...'}
        </button>
      </div>

      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-4 place-items-center w-full max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = processState === step.id;
          const isPast = 
            (processState === 'privs' && step.id === 'auth') || 
            (processState === 'success' && (step.id === 'auth' || step.id === 'privs'));
          
          let bgColor = 'bg-white border-slate-200 text-slate-400';
          if (isActive) bgColor = 'bg-yellow-100 border-yellow-400 text-yellow-700 shadow-md scale-105';
          if (isPast || processState === 'success') bgColor = 'bg-green-100 border-green-500 text-green-700 shadow-md';

          return (
            <div key={step.id} className="grid grid-cols-[auto_1fr] gap-4 items-center relative w-full">
              <div className={`grid place-items-center p-4 rounded-xl border-2 transition-all duration-300 z-10 w-full h-full min-h-[100px] ${bgColor}`}>
                <Icon size={32} className="mb-2" />
                <span className="text-sm font-bold text-center leading-tight">{step.label}</span>
                {isActive && <div className="mt-2 text-xs animate-pulse">Procesando...</div>}
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 w-8 grid place-items-center z-0">
                  <div className={`h-1 w-full transition-all duration-300 ${isPast ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DiagramRender: React.FC<{ activeSectionId: SectionId }> = ({ activeSectionId }) => {
  switch (activeSectionId) {
    case 'procesador':
      return <QueryProcessorDiagram />;
    case 'almacenamiento':
      return <StorageManagerDiagram />;
    case 'transacciones':
      return <TransactionManagerDiagram />;
    case 'seguridad':
      return <SecurityManagerDiagram />;
    default:
      return null;
  }
};

// --- COMPONENTE PRINCIPAL (APP / LAYOUT) ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<SectionId>('procesador');

  const activeSection = lessonData.find(sec => sec.id === activeTabId)!;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr] bg-slate-100 font-sans overflow-hidden">
      
      {/* HEADER & NAV: Usando CSS Grid */}
      <header className="grid grid-rows-[auto_auto] bg-slate-900 text-slate-50 shadow-md z-10">
        <div className="grid grid-cols-[auto_1fr] items-center gap-3 p-5 border-b border-slate-800">
          <Database className="text-blue-400" size={28} />
          <h1 className="text-2xl font-extrabold tracking-tight">Arquitectura de un SGBD</h1>
        </div>
        
        <nav className="grid grid-cols-[repeat(4,minmax(0,1fr))] bg-slate-800">
          {lessonData.map((section) => {
            const Icon = section.icon;
            const isActive = activeTabId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTabId(section.id)}
                className={`grid grid-cols-[auto_auto] place-content-center gap-2 py-4 px-2 text-sm font-semibold transition-all duration-200 outline-none
                  ${isActive 
                    ? 'bg-slate-100 text-blue-700 border-t-4 border-blue-600 shadow-inner' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200 border-t-4 border-transparent'}`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{section.tabLabel}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* MAIN CONTENT AREA: Usando CSS Grid */}
      <main className="grid p-4 md:p-8 overflow-y-auto content-start">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 max-w-7xl mx-auto w-full">
          
          {/* PANEL DE TEXTO */}
          <Card className="grid grid-rows-[auto_1fr] h-max">
            <div className="grid p-6 bg-blue-50 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 grid grid-cols-[auto_1fr] gap-3 items-center">
                <activeSection.icon className="text-blue-600" />
                {activeSection.tabLabel}
              </h2>
            </div>
            <div className="grid gap-4 p-6 text-slate-700 leading-relaxed text-base">
              <p>{activeSection.content.intro}</p>
              
              <div className="grid gap-2 mt-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="font-semibold text-slate-900">{activeSection.content.listTitle}</p>
                <ul className="grid gap-3 mt-2 ml-2">
                  {activeSection.content.listItems.map((item, idx) => (
                    <li key={idx} className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      <div className="grid place-items-center w-5 h-5 mt-1 rounded-full bg-blue-200 text-blue-700 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-2 font-medium text-slate-600 bg-blue-50/50 p-3 rounded border-l-4 border-blue-400">
                {activeSection.content.outro}
              </p>
            </div>
          </Card>

          {/* PANEL DE DIAGRAMA */}
          <Card className="grid grid-rows-[auto_auto_1fr] h-full min-h-[500px]">
             <div className="grid p-6 border-b border-slate-200">
               <h3 className="text-lg font-bold text-slate-800">
                 {activeSection.diagramTitle}
               </h3>
               <p className="text-sm text-slate-500 mt-1">
                 {activeSection.diagramDescription}
               </p>
             </div>
             
             <div className="grid place-items-center p-6 bg-white h-full">
                <div className="w-full">
                  <DiagramRender activeSectionId={activeTabId} />
                </div>
             </div>
          </Card>

        </div>
      </main>
      
    </div>
  );
}