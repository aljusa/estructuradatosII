import React from 'react';
import { 
  Database, 
  ArrowRightLeft, 
  AlertTriangle, 
  Clock, 
  ShieldAlert, 
  GitMerge, 
  Lock, 
  ListOrdered, 
  Layers, 
  ShieldCheck, 
  User,
  XCircle,
  CheckCircle2,
  GitCommit
} from 'lucide-react';

// --- Componentes de Diagramas Visuales ---

const DiagramIntro = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg h-full border border-slate-200">
    <div className="relative flex items-center justify-center w-full max-w-sm">
      <Database size={64} className="text-slate-700 z-10 bg-white p-2 rounded-full shadow-md" />
      <div className="absolute inset-0 flex items-center justify-center">
        <ArrowRightLeft size={120} className="text-red-400 opacity-50 rotate-45 absolute" />
        <ArrowRightLeft size={120} className="text-blue-400 opacity-50 -rotate-45 absolute" />
      </div>
    </div>
    <p className="mt-6 text-sm text-slate-500 font-medium text-center">Múltiples transacciones cruzándose y generando posibles interferencias en una misma base de datos.</p>
  </div>
);

const DiagramDirtyRead = () => (
  <div className="flex flex-col p-4 bg-slate-50 rounded-lg h-full border border-slate-200 font-mono text-sm">
    <div className="flex justify-between items-center mb-4">
      <div className="bg-blue-100 p-2 rounded text-blue-800 text-center w-24">Tx 1<br/><span className="text-xs">Escribe</span></div>
      <ArrowRightLeft className="text-slate-400" />
      <div className="bg-orange-100 p-2 rounded text-orange-800 text-center w-24 border-2 border-orange-400 border-dashed relative">
        Dato Temp
        <AlertTriangle size={16} className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full" />
      </div>
      <ArrowRightLeft className="text-slate-400" />
      <div className="bg-green-100 p-2 rounded text-green-800 text-center w-24">Tx 2<br/><span className="text-xs">Lee Dato</span></div>
    </div>
    <div className="flex justify-start">
      <div className="text-red-600 flex items-center text-xs mt-2 bg-red-50 p-1 rounded">
        <XCircle size={14} className="mr-1" /> Tx 1 se cancela (Rollback). Tx 2 leyó un dato inválido.
      </div>
    </div>
  </div>
);

const DiagramNonRepeatable = () => (
  <div className="flex flex-col justify-center p-4 bg-slate-50 rounded-lg h-full border border-slate-200 text-sm">
    <div className="flex items-center space-x-4 mb-3">
      <div className="w-16 text-slate-500 text-right text-xs">t=1</div>
      <div className="bg-blue-100 p-2 rounded flex-1"><strong>Tx 1</strong> lee valor: <span className="font-mono bg-white px-1 rounded">100</span></div>
    </div>
    <div className="flex items-center space-x-4 mb-3">
      <div className="w-16 text-slate-500 text-right text-xs">t=2</div>
      <div className="bg-purple-100 p-2 rounded flex-1"><strong>Tx 2</strong> modifica valor a: <span className="font-mono bg-white px-1 rounded">200</span></div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="w-16 text-slate-500 text-right text-xs">t=3</div>
      <div className="bg-blue-100 p-2 rounded flex-1 border-2 border-red-300"><strong>Tx 1</strong> vuelve a leer: <span className="font-mono bg-white px-1 rounded text-red-600 font-bold">200</span> <span className="text-xs text-red-500 ml-2">(¡Cambió!)</span></div>
    </div>
  </div>
);

const DiagramLostUpdate = () => (
  <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg h-full border border-slate-200">
    <div className="relative w-full max-w-md flex flex-col items-center">
      <div className="flex w-full justify-between px-8 mb-4">
        <div className="bg-blue-100 p-2 rounded text-center w-28 shadow"><strong>Tx 1</strong><br/><span className="text-xs">Escribe 'A'</span></div>
        <div className="bg-green-100 p-2 rounded text-center w-28 shadow"><strong>Tx 2</strong><br/><span className="text-xs">Escribe 'B'</span></div>
      </div>
      <div className="relative bg-white border-2 border-slate-300 w-40 h-24 rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400 line-through text-2xl font-bold opacity-40">A</div>
        <div className="absolute inset-0 flex items-center justify-center bg-white text-green-600 text-3xl font-bold transform translate-y-2">B</div>
      </div>
      <p className="mt-4 text-xs text-slate-500">La escritura de Tx 2 sobrescribe y elimina la información de Tx 1.</p>
    </div>
  </div>
);

const DiagramGoal = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-slate-50 rounded-lg h-full border border-slate-200">
    <div className="flex flex-col items-center">
      <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Ejecución en Paralelo</h4>
      <div className="flex space-x-2 mb-2">
        <div className="h-2 w-12 bg-blue-400 rounded"></div>
        <div className="h-2 w-12 bg-green-400 rounded mt-2"></div>
      </div>
      <ArrowRightLeft className="text-slate-400 rotate-90 my-2" size={16} />
      <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded text-sm font-bold flex items-center"><CheckCircle2 size={16} className="mr-1"/> Resultado X</div>
    </div>
    <div className="text-2xl font-bold text-slate-300">=</div>
    <div className="flex flex-col items-center">
      <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Ejecución en Serie</h4>
      <div className="flex flex-col space-y-1 mb-2">
        <div className="h-2 w-12 bg-blue-400 rounded"></div>
        <div className="h-2 w-12 bg-green-400 rounded ml-4"></div>
      </div>
      <ArrowRightLeft className="text-slate-400 rotate-90 my-2" size={16} />
      <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded text-sm font-bold flex items-center"><CheckCircle2 size={16} className="mr-1"/> Resultado X</div>
    </div>
  </div>
);

const DiagramLocks = () => (
  <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg h-full border border-slate-200">
    <div className="flex items-center space-x-8">
      <div className="flex flex-col items-center">
        <User size={32} className="text-blue-500 mb-2" />
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Tx 1 (Activa)</div>
      </div>
      <div className="relative">
        <Database size={64} className="text-slate-600" />
        <div className="absolute -top-3 -right-3 bg-yellow-400 p-2 rounded-full shadow-lg border-2 border-white">
          <Lock size={20} className="text-slate-800" />
        </div>
      </div>
      <div className="flex flex-col items-center opacity-50">
        <User size={32} className="text-red-500 mb-2" />
        <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs flex items-center"><XCircle size={12} className="mr-1"/> Bloqueada</div>
      </div>
    </div>
  </div>
);

const DiagramOrdering = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg h-full border border-slate-200 w-full overflow-hidden">
    <div className="relative w-full max-w-md h-2 bg-slate-300 rounded-full mt-8 mb-4">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center">
           <div className="bg-blue-500 w-4 h-4 rounded-full border-4 border-white shadow"></div>
           <span className="text-xs font-bold text-slate-600 mt-1">Inicio</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center">
           <div className="bg-indigo-500 w-6 h-6 rounded-full border-4 border-white shadow flex items-center justify-center text-white text-[10px] font-bold">1</div>
           <span className="text-xs font-bold text-indigo-700 mt-1 bg-indigo-50 px-2 py-0.5 rounded">Tx A</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-2/4 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center">
           <div className="bg-teal-500 w-6 h-6 rounded-full border-4 border-white shadow flex items-center justify-center text-white text-[10px] font-bold">2</div>
           <span className="text-xs font-bold text-teal-700 mt-1 bg-teal-50 px-2 py-0.5 rounded">Tx B</span>
        </div>
      </div>
      <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center">
           <div className="bg-purple-500 w-6 h-6 rounded-full border-4 border-white shadow flex items-center justify-center text-white text-[10px] font-bold">3</div>
           <span className="text-xs font-bold text-purple-700 mt-1 bg-purple-50 px-2 py-0.5 rounded">Tx C</span>
        </div>
      </div>
    </div>
    <p className="text-xs text-slate-500 text-center mt-4">Línea de tiempo con un orden definido de ejecución para evitar conflictos.</p>
  </div>
);

const DiagramVersion = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-lg h-full border border-slate-200">
    <div className="flex items-center w-full max-w-sm justify-between">
      <Database size={48} className="text-slate-400" />
      <div className="flex-1 flex flex-col space-y-3 pl-6 relative">
        <div className="absolute left-0 top-1/2 bottom-0 w-px bg-slate-300 -translate-y-1/2"></div>
        
        <div className="flex items-center relative">
          <div className="absolute -left-6 w-6 h-px bg-slate-300"></div>
          <div className="bg-slate-200 text-slate-600 px-3 py-1 rounded text-sm font-mono flex items-center w-24"><GitCommit size={14} className="mr-2"/> v1.0</div>
          <ArrowRightLeft size={14} className="mx-2 text-slate-300" />
          <span className="text-xs text-slate-500">Lectura antigua</span>
        </div>
        
        <div className="flex items-center relative">
          <div className="absolute -left-6 w-6 h-px bg-slate-300"></div>
          <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded text-sm font-mono flex items-center w-24 border border-blue-300"><GitCommit size={14} className="mr-2"/> v2.0</div>
          <ArrowRightLeft size={14} className="mx-2 text-slate-300" />
          <span className="text-xs text-blue-600 font-medium">Tx actual lee</span>
        </div>
        
        <div className="flex items-center relative">
          <div className="absolute -left-6 w-6 h-px bg-slate-300"></div>
          <div className="bg-green-200 text-green-800 px-3 py-1 rounded text-sm font-mono flex items-center w-24 border border-green-300"><GitCommit size={14} className="mr-2"/> v3.0</div>
          <ArrowRightLeft size={14} className="mx-2 text-slate-300" />
          <span className="text-xs text-green-600 font-medium">Tx nueva escribe</span>
        </div>
      </div>
    </div>
  </div>
);

const DiagramImportance = () => (
  <div className="flex items-center justify-center p-6 bg-slate-50 rounded-lg h-full border border-slate-200">
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Users orbiting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-slate-400"><User size={24} /></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-slate-400"><User size={24} /></div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400"><User size={24} /></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400"><User size={24} /></div>
      
      {/* Central Shield protecting DB */}
      <div className="relative z-10 bg-white rounded-full p-4 shadow-xl border-4 border-indigo-100 flex items-center justify-center">
        <ShieldCheck size={56} className="text-indigo-600 absolute opacity-20 transform scale-150" />
        <Database size={48} className="text-indigo-800 z-20" />
      </div>
      
      {/* Mechanism ring */}
      <div className="absolute inset-4 border-2 border-dashed border-indigo-200 rounded-full animate-spin-slow"></div>
    </div>
  </div>
);


// --- Componente de Sección Reutilizable ---

type SectionProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  VisualComponent: React.ComponentType;
};

const Section: React.FC<SectionProps> = ({
  title,
  description,
  icon: Icon,
  VisualComponent,
  
}) => (
  <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col lg:flex-row mb-8 hover:shadow-md transition-shadow">
    <div className="p-8 lg:w-1/2 flex flex-col justify-center">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-100 p-2 rounded-lg mr-4">
          <Icon className="text-indigo-600" size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
       
          {title}
        </h2>
      </div>
      <p className="text-slate-600 leading-relaxed text-lg">
        {description}
      </p>
    </div>
    <div className="bg-slate-50 p-6 lg:w-1/2 border-t lg:border-t-0 lg:border-l border-slate-100 min-h-[250px] flex flex-col">

      <div className="flex-grow">
        <VisualComponent />
      </div>
    </div>
  </section>
);

// --- Aplicación Principal ---

export default function App() {
  const contentData = [
    {
      title: "Introducción al control de concurrencia",
      description: "En sistemas multiusuario, varias transacciones pueden ejecutarse al mismo tiempo. Sin un mecanismo de control, estas transacciones pueden interferir entre sí y generar resultados incorrectos. El control de concurrencia surge como una solución para coordinar estas ejecuciones simultáneas.",
      icon: Database,
      visual: DiagramIntro
    },
    {
      title: "Problema de lectura sucia",
      description: "La lectura sucia ocurre cuando una transacción lee datos que han sido modificados por otra transacción que aún no ha finalizado. Si esta última se cancela, los datos leídos nunca debieron considerarse válidos.",
      icon: ShieldAlert,
      visual: DiagramDirtyRead
    },
    {
      title: "Problema de lectura no repetible",
      description: "Este problema aparece cuando una transacción lee el mismo dato en dos momentos distintos y obtiene valores diferentes porque otra transacción lo modificó entre ambas lecturas.",
      icon: Clock,
      visual: DiagramNonRepeatable
    },
    {
      title: "Problema de pérdida de actualizaciones",
      description: "La pérdida de actualizaciones sucede cuando dos transacciones modifican el mismo dato y una de ellas sobrescribe los cambios realizados por la otra, eliminando información importante.",
      icon: GitMerge,
      visual: DiagramLostUpdate
    },
    {
      title: "Objetivo del control de concurrencia",
      description: "El objetivo principal es garantizar que, aunque las transacciones se ejecuten simultáneamente, el resultado final sea equivalente al de una ejecución secuencial. Esto asegura coherencia y confiabilidad en los datos.",
      icon: CheckCircle2,
      visual: DiagramGoal
    },
    {
      title: "Uso de bloqueos (locks)",
      description: "Los bloqueos restringen el acceso a los datos mientras una transacción los está utilizando. De esta manera, se evita que otras transacciones interfieran hasta que la operación actual finalice.",
      icon: Lock,
      visual: DiagramLocks
    },
    {
      title: "Protocolos de ordenamiento",
      description: "Estos mecanismos establecen un orden específico en la ejecución de las transacciones para evitar conflictos. Un ejemplo es asignar prioridades o tiempos de inicio para determinar qué transacción se ejecuta primero.",
      icon: ListOrdered,
      visual: DiagramOrdering
    },
    {
      title: "Control de versiones",
      description: "El control de versiones permite que múltiples transacciones trabajen sobre diferentes versiones de los mismos datos. Esto reduce conflictos al evitar accesos directos simultáneos a un único valor.",
      icon: Layers,
      visual: DiagramVersion
    },
    {
      title: "Importancia del control de concurrencia",
      description: "El control de concurrencia es esencial para mantener la integridad y consistencia de los datos en entornos donde múltiples usuarios interactúan al mismo tiempo. Sin estos mecanismos, el sistema sería propenso a errores y resultados inconsistentes.",
      icon: ShieldCheck,
      visual: DiagramImportance
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-indigo-200">
      {/* Header/Hero Section */}
      <header className="bg-indigo-900 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Fundamentos del Control de Concurrencia
          </h1>
       
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {contentData.map((block, index) => (
            <Section 
              key={index}
              title={block.title}
              description={block.description}
              icon={block.icon}
              VisualComponent={block.visual}
            />
          ))}
        </div>
      </main>

   
    </div>
  );
}