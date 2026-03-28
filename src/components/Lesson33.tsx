import { useState }  from 'react';
import { 
  Database, 
  FileText, 
  Edit3, 
  ArrowRight, 
  ArrowDown, 
  ArrowUp, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Scale,
  RefreshCcw,
  Network
} from 'lucide-react';

const Header = () => (
  <header className="bg-slate-900 text-white py-16 px-6 sm:px-2 text-center rounded-b-[3rem] shadow-xl mb-1">
    <div className="flex flex-col items-center">
      <div className="bg-indigo-500/20 p-4 rounded-full mb-6 ring-1 ring-indigo-400/50">
        <Database size={48} className="text-indigo-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
        Fundamentos de las Transacciones
      </h1>
          </div>
  </header>
);

type SectionProps = {
  title: string;
  explanation: string;
  visual: React.ReactNode;
  reverse?: boolean;
};

const Section: React.FC<SectionProps> = ({
  title,
  explanation,
  visual,
  reverse = false,
}) => (
  <section className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-center max-w-6xl mx-auto my-16 px-6`}>
    {/* Text Content */}
    <div className="w-full lg:w-1/2 space-y-4">
    
      <h2 className="text-3xl font-bold text-slate-800 leading-tight">
        {title}
      </h2>
      <p className="text-lg text-slate-600 leading-relaxed text-justify">
        {explanation}
      </p>
    </div>
    
    {/* Visual Content */}
    <div className="w-full lg:w-1/2 flex justify-center items-center p-6 bg-slate-50 border border-slate-100 rounded-3xl shadow-inner min-h-[300px]">
      {visual}
    </div>
  </section>
);

// Visual Components for each block
const VisualBlock1 = () => (
  <div className="relative border-4 border-indigo-200 bg-indigo-50 rounded-2xl p-8 w-full max-w-sm shadow-sm transition-transform hover:scale-105">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1.5 rounded-full font-bold shadow-md text-sm tracking-widest uppercase">
      Transacción
    </div>
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FileText size={20} /></div>
        <span className="font-semibold text-slate-700">Operación de Lectura</span>
      </div>
      <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <div className="bg-amber-100 p-2 rounded-lg text-amber-600"><Edit3 size={20} /></div>
        <span className="font-semibold text-slate-700">Operación de Escritura</span>
      </div>
    </div>
    <div className="mt-6 text-center text-indigo-500 font-medium text-sm flex items-center justify-center gap-2">
      <Network size={16} /> Agrupadas como unidad lógica
    </div>
  </div>
);

const VisualBlock2 = () => (
  <div className="relative border-2 border-dashed border-purple-400 bg-purple-50/50 rounded-2xl p-8 w-full max-w-md">
    <div className="absolute bottom-4 right-6 text-purple-700 font-black text-lg bg-purple-100 px-3 py-1 rounded-lg">
      ¡TODO O NADA!
    </div>
    <div className="flex justify-between items-center mb-6">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-purple-600 border border-purple-100">1</div>
        <span className="text-xs font-semibold text-purple-800 mt-2">Op. 1</span>
      </div>
      <ArrowRight className="text-purple-300 w-6 h-6" />
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-purple-600 border border-purple-100">2</div>
        <span className="text-xs font-semibold text-purple-800 mt-2">Op. 2</span>
      </div>
      <ArrowRight className="text-purple-300 w-6 h-6" />
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center font-bold text-purple-600 border border-purple-100">3</div>
        <span className="text-xs font-semibold text-purple-800 mt-2">Op. 3</span>
      </div>
    </div>
  </div>
);

const VisualBlock3 = () => (
  <div className="flex flex-col items-center w-full max-w-md">
    <Scale size={48} className="text-slate-300 mb-8" />
    <div className="flex justify-between items-center w-full gap-4">
      <div className="flex-1 bg-green-50 border border-green-200 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
        <CheckCircle2 size={40} className="text-green-500 mb-3" />
        <span className="font-bold text-green-700">100%<br/>Completo</span>
      </div>
      <div className="text-2xl font-black text-slate-300 bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-sm border border-slate-100">
        O
      </div>
      <div className="flex-1 bg-red-50 border border-red-200 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
        <XCircle size={40} className="text-red-500 mb-3" />
        <span className="font-bold text-red-700">0%<br/>(Cancelado)</span>
      </div>
    </div>
  </div>
);

const VisualBlock4 = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg">
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm w-full">
      <div className="text-center font-bold text-slate-500 mb-4 uppercase text-sm tracking-wider">Estado Antes</div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
          <CheckCircle2 size={18} /> <span className="text-sm font-medium">Regla A cumplida</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
          <CheckCircle2 size={18} /> <span className="text-sm font-medium">Restricción Válida</span>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col items-center">
      <div className="bg-indigo-100 p-3 rounded-full mb-2">
        <RefreshCcw className="text-indigo-500" />
      </div>
      <span className="text-xs font-bold text-indigo-400">Transacción</span>
    </div>

    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm w-full">
      <div className="text-center font-bold text-slate-500 mb-4 uppercase text-sm tracking-wider">Estado Después</div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
          <CheckCircle2 size={18} /> <span className="text-sm font-medium">Regla A cumplida</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
          <CheckCircle2 size={18} /> <span className="text-sm font-medium">Restricción Válida</span>
        </div>
      </div>
    </div>
  </div>
);

const VisualBlock5 = () => (
  <div className="flex flex-col items-center gap-6 w-full max-w-md">
    <div className="flex gap-8 justify-center w-full">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-2 w-28">
        <Database className="text-blue-500" />
        <span className="text-sm font-bold text-slate-600">Tabla A</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-2 w-28">
        <Database className="text-teal-500" />
        <span className="text-sm font-bold text-slate-600">Tabla B</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center gap-2 w-28">
        <Database className="text-purple-500" />
        <span className="text-sm font-bold text-slate-600">Tabla C</span>
      </div>
    </div>
    <div className="relative w-full h-16 flex justify-center">
       <svg className="absolute w-full h-full" preserveAspectRatio="none">
         <path d="M 60 0 Q 150 50 200 60" fill="transparent" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
         <path d="M 200 0 L 200 60" fill="transparent" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
         <path d="M 340 0 Q 250 50 200 60" fill="transparent" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
       </svg>
    </div>
    <div className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-3 z-10">
      <Network size={20} className="text-indigo-400" />
      Coherencia del Sistema
    </div>
  </div>
);

const VisualBlock6 = () => (
  <div className="relative border-2 border-emerald-400 bg-emerald-50 rounded-2xl p-8 w-full max-w-lg shadow-sm">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md text-sm">
      Ejemplo: Transferencia Bancaria
    </div>
    
    <div className="flex justify-between items-center mt-4">
      {/* Account A */}
      <div className="bg-white p-5 rounded-2xl shadow border border-slate-100 w-32 text-center">
        <div className="font-black text-slate-700 mb-1">Cuenta A</div>
        <div className="text-xs text-slate-400 mb-3">Origen</div>
        <div className="bg-red-50 text-red-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1">
          <ArrowDown size={16} /> $500
        </div>
      </div>
      
      {/* Flow */}
      <div className="flex flex-col items-center px-4">
        <div className="h-0.5 w-16 bg-emerald-300 relative">
          <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-emerald-300 rotate-45"></div>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 uppercase mt-2">Juntas o nada</span>
      </div>

      {/* Account B */}
      <div className="bg-white p-5 rounded-2xl shadow border border-slate-100 w-32 text-center">
        <div className="font-black text-slate-700 mb-1">Cuenta B</div>
        <div className="text-xs text-slate-400 mb-3">Destino</div>
        <div className="bg-green-50 text-green-600 font-bold py-2 rounded-lg flex items-center justify-center gap-1">
          <ArrowUp size={16} /> $500
        </div>
      </div>
    </div>
  </div>
);

const VisualBlock7 = () => (
  <div className="relative w-full max-w-md h-56 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl overflow-hidden shadow-xl flex items-center justify-center">
    {/* Abstract Background Shield */}
    <ShieldCheck className="absolute text-white/5 w-64 h-64 -right-10 -bottom-10" />
    
    {/* Core Content */}
    <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white flex items-center gap-5 shadow-2xl">
      <div className="bg-white/20 p-4 rounded-xl">
        <Database className="text-blue-100 w-10 h-10" />
      </div>
      <div>
        <div className="font-bold text-xl text-white mb-1">Datos Protegidos</div>
        <div className="text-sm text-blue-200 flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-400" />
          Libres de estados incorrectos
        </div>
      </div>
    </div>
  </div>
);

const App = () => {

    const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      title: "1. Introducción al concepto de transacción",
      explanation:
        "Las transacciones son la unidad básica de trabajo en los sistemas de bases de datos. Permiten agrupar varias operaciones en una sola acción lógica que se ejecuta de manera controlada. Su función principal es asegurar que los cambios en los datos se realicen de forma organizada y confiable, evitando estados intermedios incorrectos.",
      visual: <VisualBlock1 />,
    },
    {
      title: "2. Definición de transacción",
      explanation:
       "Una transacción es un conjunto de operaciones que se ejecutan como una única unidad indivisible. Esto significa que todas las operaciones deben completarse exitosamente para que los cambios se apliquen; de lo contrario, ninguna de ellas debe tener efecto. Su propósito es llevar la base de datos de un estado consistente a otro también consistente.",
      visual: <VisualBlock2 />,
      reverse: true,
    },
    {
      title: "3. Atomicidad",
      explanation:
       "La atomicidad es una propiedad fundamental de las transacciones. Establece que una transacción se ejecuta completamente o no se ejecuta en absoluto. Si ocurre un fallo en alguna de las operaciones, el sistema revierte todos los cambios realizados hasta ese momento.",
      visual: <VisualBlock3 />,
    },
    {
      title: "4. Consistencia",
      explanation:
       "La consistencia garantiza que, al finalizar una transacción, la base de datos cumple todas sus reglas y restricciones. Esto implica que los datos mantienen su validez antes y después de la ejecución de la transacción.",
      visual: <VisualBlock4 />,
      reverse: true,
    },
    {
      title: "5. Multiplicidad de operaciones",
      explanation:
        "Una transacción puede involucrar múltiples operaciones que afectan distintos datos o tablas. Estas operaciones están relacionadas entre sí y deben ejecutarse en conjunto para mantener la coherencia del sistema.",
      visual: <VisualBlock5 />,
    },
    {
      title: "6. Ejemplo conceptual de transacción",
      explanation:
      "Un caso típico es una transferencia bancaria. Esta operación incluye dos acciones: restar dinero de una cuenta y sumarlo a otra. Ambas deben ejecutarse juntas; si una falla, la otra no debe completarse para evitar inconsistencias.",
      visual: <VisualBlock6 />,
      reverse: true,
    },
    {
      title: "7. Importancia de las transacciones",
      explanation:
       "Las transacciones permiten manejar operaciones complejas de forma segura, especialmente en entornos donde pueden ocurrir fallos del sistema o errores. Gracias a ellas, se protege la integridad de los datos y se evita que la base de datos quede en estados incorrectos.",
      visual: <VisualBlock7 />,
    },
  ];
   return (
    <div className="min-h-screen bg-white font-sans pb-2">
      <Header />

      {/* NAV */}
      <nav className="sticky top-0 bg-white border-b border-slate-200 p-4 flex flex-wrap gap-2 justify-center z-10">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSection(index)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              activeSection === index
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </nav>

      <main className="mt-6">
        {/* SOLO UNA SECCIÓN */}
        <Section
          title={sections[activeSection].title}
          explanation={sections[activeSection].explanation}
          visual={sections[activeSection].visual}
          reverse={sections[activeSection].reverse}
        />
      </main>

    </div>
  );
};

export default App;