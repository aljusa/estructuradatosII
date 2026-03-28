import { 
  Database, 
  ArrowRight, 
  FileText, 
  Settings, 
  CheckCircle2, 
  Undo2,
  PlayCircle,
  HelpCircle,
  Cpu
} from 'lucide-react';

// Componentes Visuales para cada bloque
const Diagram1 = () => (
  <div className="flex flex-col items-center justify-center h-full p-4">
    <div className="border-2 border-indigo-500 rounded-xl p-6 bg-indigo-50 w-full max-w-xs shadow-sm relative">
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        Transacción
      </div>
      <div className="flex justify-around items-center mt-2">
        <div className="bg-white border-2 border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-sm">
          <FileText size={16} className="text-blue-500" /> Read
        </div>
        <div className="bg-white border-2 border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-sm">
          <FileText size={16} className="text-amber-500" /> Write
        </div>
      </div>
    </div>
  </div>
);

const Diagram2 = () => (
  <div className="flex items-center justify-center gap-6 h-full p-4">
    <div className="flex flex-col items-center">
      <div className="bg-slate-100 p-4 rounded-full border-2 border-slate-300">
        <Database size={32} className="text-slate-600" />
      </div>
      <span className="text-xs font-semibold text-slate-500 mt-2">Base de Datos</span>
    </div>
    <div className="flex flex-col items-center relative">
      <div className="flex items-center">
        <div className="h-1 w-12 bg-blue-500"></div>
        <ArrowRight size={24} className="text-blue-500 -ml-2" />
      </div>
      <span className="text-xs font-bold text-blue-600 absolute -top-5">Extracción</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 shadow-sm">
        <FileText size={32} className="text-blue-600" />
      </div>
      <span className="text-xs font-semibold text-blue-600 mt-2">Transacción (Read)</span>
    </div>
  </div>
);

const Diagram3 = () => (
  <div className="flex items-center justify-center gap-6 h-full p-4">
    <div className="flex flex-col items-center">
      <div className="bg-amber-50 p-4 rounded-xl border-2 border-amber-200 shadow-sm">
        <FileText size={32} className="text-amber-600" />
      </div>
      <span className="text-xs font-semibold text-amber-600 mt-2">Transacción (Write)</span>
    </div>
    <div className="flex flex-col items-center relative">
      <div className="flex items-center">
        <div className="h-1 w-12 bg-amber-500"></div>
        <ArrowRight size={24} className="text-amber-500 -ml-2" />
      </div>
      <span className="text-xs font-bold text-amber-600 absolute -top-5">Nuevo Valor</span>
    </div>
    <div className="flex flex-col items-center">
      <div className="bg-slate-100 p-4 rounded-full border-2 border-slate-300">
        <Database size={32} className="text-slate-600" />
      </div>
      <span className="text-xs font-semibold text-slate-500 mt-2">Base de Datos</span>
    </div>
  </div>
);

const Diagram4 = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 h-full p-4">
    <div className="bg-blue-100 border-2 border-blue-300 text-blue-800 px-4 py-2 rounded-lg font-bold shadow-sm flex items-center gap-2">
      <FileText size={18} /> Read
    </div>
    <ArrowRight className="text-slate-400 rotate-90 md:rotate-0" size={24} />
    <div className="bg-purple-100 border-2 border-purple-300 text-purple-800 px-4 py-2 rounded-lg font-bold shadow-sm flex items-center gap-2">
      <Cpu size={18} /> Procesamiento
    </div>
    <ArrowRight className="text-slate-400 rotate-90 md:rotate-0" size={24} />
    <div className="bg-amber-100 border-2 border-amber-300 text-amber-800 px-4 py-2 rounded-lg font-bold shadow-sm flex items-center gap-2">
      <FileText size={18} /> Write
    </div>
  </div>
);

const Diagram5 = () => (
  <div className="flex flex-col items-center justify-center gap-4 h-full p-4">
    <div className="flex items-center gap-3">
      <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full border-2 border-emerald-300 flex items-center gap-1 shadow-sm font-bold text-sm">
        <PlayCircle size={18} /> Inicio
      </div>
      <ArrowRight className="text-slate-400" size={20} />
      <div className="bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg border-2 border-indigo-300 shadow-sm font-bold text-sm text-center">
        Operaciones<br/><span className="text-xs font-normal">(Read/Write)</span>
      </div>
      <ArrowRight className="text-slate-400" size={20} />
      <div className="bg-rose-100 text-rose-700 px-4 py-3 rounded-tr-xl rounded-bl-xl border-2 border-rose-300 shadow-sm font-bold text-sm flex items-center gap-1">
        <HelpCircle size={18} /> Decisión
      </div>
    </div>
  </div>
);

const Diagram6 = () => (
  <div className="flex flex-col items-center justify-center h-full p-4">
    <div className="relative">
      <Database size={64} className="text-slate-700" strokeWidth={1.5} />
      <div className="absolute -bottom-2 -right-2 bg-white rounded-full">
        <CheckCircle2 size={36} className="text-emerald-500 fill-emerald-100" />
      </div>
    </div>
    <div className="mt-4 font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm border border-emerald-200">
      Cambios Consolidados
    </div>
  </div>
);

const Diagram7 = () => (
  <div className="flex items-center justify-center gap-4 h-full p-4">
    <div className="flex flex-col items-center opacity-40">
      <Database size={48} className="text-slate-500" />
      <span className="text-xs font-medium mt-1">Estado de Error</span>
    </div>
    <div className="flex flex-col items-center">
      <Undo2 size={32} className="text-rose-500 mb-1" />
      <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-full border border-rose-200">Reversión</span>
    </div>
    <div className="flex flex-col items-center">
      <Database size={48} className="text-emerald-600" />
      <span className="text-xs font-bold text-emerald-700 mt-1">Estado Inicial</span>
    </div>
  </div>
);

const Diagram8 = () => (
  <div className="flex items-center justify-center h-full p-4">
    <div className="relative flex items-center justify-center">
      <Database size={80} className="text-indigo-600" strokeWidth={1} />
      <div className="absolute -left-4 top-2 bg-white rounded-full p-1 shadow-md border border-slate-100">
        <Settings size={28} className="text-blue-500 animate-[spin_4s_linear_infinite]" />
        <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-blue-600">Read</span>
      </div>
      <div className="absolute -right-4 bottom-2 bg-white rounded-full p-1 shadow-md border border-slate-100">
        <Settings size={28} className="text-amber-500 animate-[spin_4s_linear_infinite_reverse]" />
        <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-amber-600">Write</span>
      </div>
    </div>
  </div>
);

const contentBlocks = [
  {
    id: 1,
    title: "Introducción a las operaciones de transacciones",
    explanation: "Las transacciones en una base de datos están formadas por operaciones básicas que permiten interactuar con los datos. Estas operaciones son fundamentales para consultar y modificar la información de manera controlada dentro de una transacción.",
    visualText: "Un esquema donde una transacción contiene varias operaciones internas etiquetadas como “Read” y “Write”, mostrando su papel dentro del proceso.",
    Diagram: Diagram1
  },
  {
    id: 2,
    title: "Operación Read (Lectura)",
    explanation: "La operación Read permite obtener el valor de un dato almacenado en la base de datos. No modifica la información, solo la consulta para su uso dentro de la transacción.",
    example: "Leer el saldo de una cuenta bancaria antes de realizar una operación.",
    visualText: "Una flecha que va desde la base de datos hacia la transacción, representando la extracción de información.",
    Diagram: Diagram2
  },
  {
    id: 3,
    title: "Operación Write (Escritura)",
    explanation: "La operación Write permite modificar o actualizar el valor de un dato en la base de datos. Esta operación refleja cambios producidos por la lógica de la transacción.",
    example: "Actualizar el saldo de una cuenta después de un depósito.",
    visualText: "Una flecha que va desde la transacción hacia la base de datos, indicando que se envía un nuevo valor.",
    Diagram: Diagram3
  },
  {
    id: 4,
    title: "Relación entre lectura y escritura",
    explanation: "Las operaciones de lectura y escritura suelen trabajar en conjunto. Primero se leen los datos necesarios, luego se procesan, y finalmente se escriben los resultados actualizados en la base de datos.",
    visualText: "Un flujo secuencial: “Read → Procesamiento → Write”, mostrando la transformación de los datos.",
    Diagram: Diagram4
  },
  {
    id: 5,
    title: "Estructura básica de una transacción",
    explanation: "Una transacción sigue una estructura definida: comienza con su inicio, continúa con una secuencia de operaciones de lectura y escritura, y finaliza con una decisión que determina si los cambios se guardan o se descartan.",
    visualText: "Un diagrama de flujo con tres etapas: inicio, operaciones (read/write) y finalización.",
    Diagram: Diagram5
  },
  {
    id: 6,
    title: "Commit",
    explanation: "El commit es la operación que confirma la transacción. Cuando se ejecuta, todos los cambios realizados se guardan de manera permanente en la base de datos.",
    visualText: "Un proceso que termina con un símbolo de confirmación (✔), indicando que los cambios se consolidan.",
    Diagram: Diagram6
  },
  {
    id: 7,
    title: "Rollback",
    explanation: "El rollback permite deshacer todos los cambios realizados durante la transacción en caso de error. Esto restaura la base de datos a su estado previo.",
    visualText: "Una flecha que regresa al estado inicial, simbolizando la reversión de los cambios.",
    Diagram: Diagram7
  },
  {
    id: 8,
    title: "Importancia de las operaciones básicas",
    explanation: "Las operaciones de lectura y escritura son esenciales en cualquier transacción, ya que permiten manipular los datos de forma controlada. Su correcta gestión es clave para garantizar el buen funcionamiento y la integridad del sistema.",
    visualText: "Una base de datos con engranajes etiquetados como “Read” y “Write”, mostrando que son mecanismos fundamentales del sistema.",
    Diagram: Diagram8
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-indigo-900 text-white py-12 px-6 mb-10 shadow-lg">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
Operaciones de Transacciones (Read, Write)          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6">
        <div className="space-y-8">
          {contentBlocks.map((block, index) => (
            <section 
              key={block.id} 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md"
            >
              {/* Contenido de Texto */}
              <div className="p-8 md:w-3/5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex-shrink-0 bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                    {block.title}
                  </h2>
                </div>
                
                <p className="text-slate-600 leading-relaxed mb-4 text-base">
                  {block.explanation}
                </p>

                {block.example && (
                  <div className="mt-2 bg-slate-50 border-l-4 border-indigo-400 p-4 rounded-r-lg">
                    <p className="text-sm text-slate-700 italic">
                      <strong className="font-semibold not-italic text-indigo-900">Ejemplo:</strong> {block.example}
                    </p>
                  </div>
                )}
              </div>

              {/* Contenedor Visual */}
              <div className="bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 md:w-2/5 min-h-[250px] relative flex items-center justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
                <block.Diagram />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}