import React from 'react';
import { 
  Database, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Server,
  Save,
  Activity,
  Layers
} from 'lucide-react';

// --- Componentes Visuales (Diagramas) ---

const DiagramIntro = () => (
  <div className="flex items-center justify-center space-x-2 sm:space-x-6 py-6 w-full">
    {['A', 'C', 'I', 'D'].map((letter, index) => (
      <React.Fragment key={letter}>
        <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 text-white font-bold text-2xl rounded-lg shadow-lg border-2 border-blue-200">
          {letter}
        </div>
        {index < 3 && <div className="h-1 w-4 sm:w-8 bg-blue-300 rounded-full"></div>}
      </React.Fragment>
    ))}
  </div>
);

const DiagramAtomicity = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6">
    <div className="flex flex-col items-center bg-green-50 p-4 rounded-xl border border-green-200 w-40 shadow-sm">
      <div className="w-12 h-6 bg-green-500 rounded-full relative mb-3">
        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
      </div>
      <CheckCircle2 className="text-green-600 mb-1" size={24} />
      <span className="text-sm font-semibold text-green-800">Completo (100%)</span>
    </div>
    <div className="text-slate-400 font-bold text-xl">O</div>
    <div className="flex flex-col items-center bg-red-50 p-4 rounded-xl border border-red-200 w-40 shadow-sm">
      <div className="w-12 h-6 bg-slate-300 rounded-full relative mb-3">
        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow"></div>
      </div>
      <XCircle className="text-red-500 mb-1" size={24} />
      <span className="text-sm font-semibold text-red-800">Cancelado (0%)</span>
    </div>
  </div>
);

const DiagramConsistency = () => (
  <div className="flex items-center justify-center space-x-4 py-6">
    <div className="flex flex-col items-center">
      <div className="bg-indigo-50 p-4 rounded-full border border-indigo-200 shadow-sm mb-2 relative">
        <Database className="text-indigo-600" size={32} />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
          <CheckCircle2 className="text-green-500" size={20} />
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-600">Estado Inicial</span>
    </div>
    
    <div className="flex flex-col items-center">
      <ArrowRight className="text-slate-400 mb-1" size={24} />
      <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">Transacción</span>
    </div>

    <div className="flex flex-col items-center">
      <div className="bg-indigo-50 p-4 rounded-full border border-indigo-200 shadow-sm mb-2 relative">
        <Database className="text-indigo-600" size={32} />
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
          <CheckCircle2 className="text-green-500" size={20} />
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-600">Estado Final</span>
    </div>
  </div>
);

const DiagramIsolation = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-6 w-full max-w-xs mx-auto">
    {[1, 2, 3].map((tx) => (
      <div key={tx} className="w-full flex items-center justify-between bg-white border-2 border-slate-200 rounded-lg p-3 shadow-sm relative">
        <span className="text-xs font-bold text-slate-500 w-12">TX {tx}</span>
        <div className="flex-1 h-2 bg-blue-100 rounded-full mx-3 overflow-hidden">
          <div className="h-full bg-blue-500 w-2/3 rounded-full"></div>
        </div>
        <Activity size={16} className="text-blue-500" />
        {tx < 3 && (
          <div className="absolute -bottom-4 left-0 w-full border-b-2 border-dashed border-slate-300"></div>
        )}
      </div>
    ))}
  </div>
);

const DiagramDurability = () => (
  <div className="flex items-center justify-center py-6">
    <div className="relative flex items-center justify-center w-32 h-32 bg-slate-100 rounded-2xl border-2 border-slate-300 shadow-inner">
      <Server size={48} className="text-slate-700" />
      
      {/* Rayo (Fallo) */}
      <div className="absolute -top-4 -right-2 bg-red-100 p-2 rounded-full border border-red-200 shadow-sm animate-pulse">
        <Zap size={24} className="text-red-500" />
      </div>
      
      {/* Respaldo (Durabilidad) */}
      <div className="absolute -bottom-3 -left-3 bg-green-100 p-2 rounded-lg border border-green-200 shadow-md flex items-center space-x-1">
        <Save size={16} className="text-green-700" />
        <span className="text-[10px] font-bold text-green-800">Guardado</span>
      </div>
    </div>
  </div>
);

const DiagramImportance = () => (
  <div className="flex items-center justify-center py-6">
    <div className="relative">
      <ShieldCheck size={120} className="text-blue-600" strokeWidth={1.5} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <div className="flex space-x-2 mb-1">
          <span className="text-white font-bold text-lg">A</span>
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <div className="flex space-x-3">
          <span className="text-white font-bold text-lg">I</span>
          <span className="text-white font-bold text-lg">D</span>
        </div>
      </div>
    </div>
  </div>
);

const DiagramRole = () => (
  <div className="flex flex-col items-center justify-center py-6 w-full max-w-sm mx-auto">
    <div className="w-full bg-slate-800 text-white text-center py-3 rounded-t-xl font-bold shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-900">
      <Database size={20} />
      Base de Datos Segura
    </div>
    <div className="flex justify-around w-full px-4 pt-2 pb-0 bg-slate-50">
      {['A', 'C', 'I', 'D'].map((prop) => (
        <div key={prop} className="flex flex-col items-center">
          <div className="w-8 sm:w-12 h-24 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-sm shadow-inner flex items-center justify-center border-x border-slate-400">
            <span className="text-slate-700 font-bold text-xl">{prop}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="w-full bg-slate-300 h-6 rounded-b-xl border-t border-slate-400 shadow-md"></div>
  </div>
);


// --- Contenedores Estructurales ---
type SectionCardProps = {
  title: string;
  explanation: string;
  Diagram: React.ComponentType;
};
const SectionCard: React.FC<SectionCardProps> = ({
  title,
  explanation,
  Diagram,
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
    <div className="p-6 border-b border-slate-50 bg-slate-50/50">
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
        {explanation}
      </p>
    </div>
    <div className="bg-slate-50/30 p-4 border-t border-slate-100/50 flex flex-col items-center">
      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 w-full text-center">Representación Visual</p>
      <Diagram />
    </div>
  </div>
);


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200">
      
      {/* Header / Intro */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="text-blue-600" size={28} />
            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Fundamentos <span className="text-blue-600">ACID</span></h1>
          </div>
          <div className="hidden sm:flex space-x-1 text-sm font-medium text-slate-500">
            <span>Educación</span>
            <span>&bull;</span>
            <span>Sistemas de Bases de Datos</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        
        {/* Bloque 1: Introducción */}
        <section className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
            Introducción a las propiedades ACID
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            Para que una transacción sea confiable en un sistema de bases de datos, debe cumplir un conjunto de propiedades fundamentales conocidas como ACID. Estas propiedades establecen criterios que garantizan que las operaciones se ejecuten de manera segura, consistente y resistente a fallos.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 inline-block w-full max-w-2xl">
            <DiagramIntro />
            <p className="mt-4 text-sm text-slate-500 font-medium">Las cuatro propiedades trabajando en conjunto</p>
          </div>
        </section>

        {/* Bloques 2 al 5: Las 4 Propiedades (Grid) */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <Layers className="text-blue-500" size={28} />
            <h2 className="text-2xl font-bold text-slate-800">Desglose de Propiedades</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SectionCard 
              title="1. Atomicidad (Atomicity)" 
              explanation="La atomicidad establece que una transacción debe ejecutarse completamente o no ejecutarse en absoluto. Si alguna operación falla, todo el proceso se revierte, evitando resultados parciales."
              Diagram={DiagramAtomicity}
            />
            <SectionCard 
              title="2. Consistencia (Consistency)" 
              explanation="La consistencia asegura que la base de datos siempre pase de un estado válido a otro también válido. Esto implica que todas las reglas, restricciones e integridad de los datos se mantienen antes y después de la transacción."
              Diagram={DiagramConsistency}
            />
            <SectionCard 
              title="3. Aislamiento (Isolation)" 
              explanation="El aislamiento garantiza que las transacciones que se ejecutan simultáneamente no interfieran entre sí. Cada transacción debe comportarse como si fuera la única en ejecución, evitando efectos no deseados."
              Diagram={DiagramIsolation}
            />
            <SectionCard 
              title="4. Durabilidad (Durability)" 
              explanation="La durabilidad asegura que, una vez que una transacción ha sido confirmada, sus efectos permanecen en la base de datos incluso si ocurre un fallo del sistema, como un apagón o error crítico."
              Diagram={DiagramDurability}
            />
          </div>
        </section>

        {/* Bloques 6 y 7: Conclusiones */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bloque 6 */}
          <div className="bg-blue-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
              <ShieldCheck size={240} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Importancia de las propiedades ACID</h2>
              <p className="text-blue-100 leading-relaxed mb-8">
                Las propiedades ACID garantizan la integridad de los datos, la fiabilidad del sistema y la seguridad en operaciones críticas. Gracias a ellas, los sistemas pueden manejar información sensible con confianza.
              </p>
              <div className="bg-blue-700/50 rounded-2xl p-6 border border-blue-500/30 backdrop-blur-sm">
                <DiagramImportance />
                <p className="mt-4 text-center text-xs text-blue-200 font-medium uppercase tracking-wider">Protección Integral</p>
              </div>
            </div>
          </div>

          {/* Bloque 7 */}
          <div className="bg-slate-800 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
             <div className="absolute bottom-0 right-0 -mb-10 -mr-10 opacity-10">
              <Database size={240} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-100">Rol de ACID en sistemas de BD</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                Las propiedades ACID constituyen la base del manejo seguro de transacciones. Permiten que los sistemas operen correctamente incluso en entornos complejos y con múltiples usuarios, asegurando que los datos sean siempre correctos y confiables.
              </p>
              <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600/50 backdrop-blur-sm">
                <DiagramRole />
                <p className="mt-6 text-center text-xs text-slate-400 font-medium uppercase tracking-wider">Estabilidad Estructural</p>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}