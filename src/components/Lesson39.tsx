import React from 'react';
import { 
  Database, 
  ArrowRight, 
  Settings, 
  TableProperties, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Activity,
  Code,
  FileDigit,
  RefreshCw,
  GitBranch,
  Network
} from 'lucide-react';
type CodeBlockProps = {
    language: string;
    code: React.ReactNode;
}
const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden my-4 shadow-md">
    <div className="flex items-center px-4 py-2 bg-slate-800 text-slate-400 text-xs uppercase font-semibold">
      <Code size={14} className="mr-2" />
      {language}
    </div>
    <div className="p-4 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed">
      <pre><code>{code}</code></pre>
    </div>
  </div>
);
type SectionProps = {
    title: string;
    children: React.ReactNode;
    icon: React.ElementType;
}
const Section:React.FC<SectionProps> = ({ title, children, icon: Icon }) => (
  <section className="mb-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
        <Icon size={24} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    </div>
    <div className="text-slate-600 leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

// --- Visual Components based on suggestions ---

const DiagramIntro = () => (
  <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
    <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200 w-40 text-center">
      <Database className="text-blue-500 mb-2" size={32} />
      <span className="font-semibold text-sm text-slate-700">Evento SQL</span>
      <span className="text-xs text-slate-500">(ej. INSERT)</span>
    </div>
    
    <div className="flex flex-col items-center text-blue-400">
      <span className="text-xs font-semibold mb-1">Activa automáticamente</span>
      <ArrowRight size={32} className="animate-pulse" />
    </div>

    <div className="flex flex-col items-center bg-blue-600 text-white p-4 rounded-lg shadow-md w-48 text-center ring-4 ring-blue-100">
      <Settings className="mb-2 animate-spin-slow" size={32} />
      <span className="font-semibold text-sm">Trigger (Disparador)</span>
      <span className="text-xs text-blue-200 mt-1">Ejecuta lógica adicional</span>
    </div>
  </div>
);

const DiagramTables = () => (
  <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col sm:flex-row justify-center items-stretch gap-8 relative">
      {/* Tabla Usuarios */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 border-b pb-2 mb-3">
          <TableProperties className="text-indigo-500" size={20} />
          <h4 className="font-semibold text-slate-700">Tabla: usuarios</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-indigo-50 border border-indigo-100 rounded text-indigo-700 flex justify-between">
            <span>+ Nuevo registro</span>
            <span className="text-xs font-bold uppercase">Insert</span>
          </div>
        </div>
      </div>

      {/* Flecha conectora */}
      <div className="hidden sm:flex flex-col items-center justify-center z-10">
        <div className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full mb-1">
          AFTER INSERT
        </div>
        <ArrowRight className="text-indigo-400" size={24} />
      </div>

      {/* Tabla Log */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <div className="flex items-center gap-2 border-b pb-2 mb-3">
          <TableProperties className="text-blue-500" size={20} />
          <h4 className="font-semibold text-slate-700">Tabla: log</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="p-2 bg-slate-50 border border-slate-100 rounded text-slate-600 italic">
            ...registros anteriores...
          </div>
          <div className="p-2 bg-blue-50 border border-blue-200 rounded text-blue-700 flex justify-between animate-fade-in">
            <span>'Nuevo usuario agregado'</span>
            <span className="text-xs font-bold uppercase">Auto-Insert</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DiagramTimeline = () => (
  <div className="mt-8 p-8 bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
    <div className="min-w-[500px] relative">
      {/* Línea base */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-300 -translate-y-1/2 rounded"></div>
      
      <div className="flex justify-between relative z-10">
        {/* BEFORE */}
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <span className="block font-bold text-emerald-600">BEFORE</span>
            <span className="text-xs text-slate-500">Trigger anticipado</span>
          </div>
          <div className="w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-md"></div>
        </div>

        {/* EVENTO PRINCIPAL */}
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <span className="block font-bold text-slate-800">EVENTO</span>
            <span className="text-xs text-slate-500">INSERT / UPDATE / DELETE</span>
          </div>
          <div className="w-8 h-8 bg-slate-800 rounded-lg border-4 border-white shadow-md flex items-center justify-center text-white">
            <Activity size={16} />
          </div>
        </div>

        {/* AFTER */}
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <span className="block font-bold text-blue-600">AFTER</span>
            <span className="text-xs text-slate-500">Trigger reactivo</span>
          </div>
          <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-md"></div>
        </div>
      </div>
    </div>
  </div>
);

const DiagramOldNew = () => (
  <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-6">
    {/* OLD */}
    <div className="bg-white p-5 rounded-xl border-2 border-slate-200 shadow-sm w-full sm:w-64 relative">
      <div className="absolute -top-3 left-4 bg-slate-200 text-slate-700 text-xs font-black px-3 py-1 rounded-full tracking-wider">
        OLD (Previo)
      </div>
      <div className="mt-2 space-y-2 font-mono text-sm">
        <div className="flex justify-between border-b pb-1">
          <span className="text-slate-400">id:</span>
          <span className="text-slate-700">105</span>
        </div>
        <div className="flex justify-between border-b pb-1 bg-red-50 px-1 rounded">
          <span className="text-slate-400">nombre:</span>
          <span className="text-red-600 line-through">Juan</span>
        </div>
      </div>
    </div>

    {/* Transición */}
    <div className="flex flex-col items-center text-blue-500">
      <RefreshCw size={24} className="mb-1" />
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">UPDATE</span>
    </div>

    {/* NEW */}
    <div className="bg-white p-5 rounded-xl border-2 border-blue-200 shadow-sm w-full sm:w-64 relative">
      <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-full tracking-wider shadow-sm">
        NEW (Actualizado)
      </div>
      <div className="mt-2 space-y-2 font-mono text-sm">
        <div className="flex justify-between border-b pb-1">
          <span className="text-slate-400">id:</span>
          <span className="text-slate-700">105</span>
        </div>
        <div className="flex justify-between border-b pb-1 bg-emerald-50 px-1 rounded">
          <span className="text-slate-400">nombre:</span>
          <span className="text-emerald-600 font-bold">Carlos</span>
        </div>
      </div>
    </div>
  </div>
);

const DiagramPractices = () => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Buena Práctica */}
    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
      <div className="flex items-center gap-2 mb-4 text-emerald-700">
        <CheckCircle2 size={20} />
        <h4 className="font-bold">Mantenible y Simple</h4>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-white p-3 rounded shadow-sm text-sm border border-emerald-100 flex items-center justify-between">
          <span>Evento en Tabla A</span>
          <ArrowRight size={16} className="text-slate-300" />
        </div>
        <div className="bg-emerald-600 text-white p-3 rounded shadow-sm text-sm text-center font-medium">
          Trigger: Acción Única (ej. Log)
        </div>
      </div>
    </div>

    {/* Mala Práctica */}
    <div className="bg-red-50 p-6 rounded-xl border border-red-200">
      <div className="flex items-center gap-2 mb-4 text-red-700">
        <XCircle size={20} />
        <h4 className="font-bold">Complejidad Excesiva</h4>
      </div>
      <div className="flex flex-col gap-2">
        <div className="bg-white p-2 rounded shadow-sm text-xs border border-red-100 flex items-center justify-between">
          <span>Evento A</span>
          <ArrowRight size={14} className="text-slate-300" />
        </div>
        <div className="bg-slate-700 text-white p-2 rounded shadow-sm text-xs text-center flex items-center justify-center gap-2">
          Trigger Complejo
          <GitBranch size={14} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
           <div className="bg-white p-2 rounded shadow-sm text-xs border border-red-100 text-center text-red-500 border-dashed">
             Actualiza Tabla B
           </div>
           <div className="bg-white p-2 rounded shadow-sm text-xs border border-red-100 text-center text-red-500 border-dashed">
             Elimina Tabla C
           </div>
        </div>
        <div className="text-center text-red-400 text-xs mt-1 italic">Efecto cascada difícil de debugear</div>
      </div>
    </div>
  </div>
);

const DiagramSystem = () => (
  <div className="mt-8 p-8 bg-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
    
    <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
      <div className="w-24 h-24 bg-blue-600 rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-blue-500/50 mb-8 border-4 border-slate-800 relative z-20">
        <Database size={40} className="text-white -rotate-45" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        {/* Red de nodos */}
        <div className="absolute top-4 left-10 flex items-center gap-2 text-emerald-400">
          <Activity size={18} />
          <span className="text-xs font-mono">APP INSERT</span>
        </div>
        <svg className="absolute top-10 left-32 w-24 h-24" viewBox="0 0 100 100">
          <line x1="10" y1="10" x2="90" y2="90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
        </svg>

        <div className="absolute bottom-4 right-10 flex items-center gap-2 text-blue-300">
          <span className="text-xs font-mono">AUTO SYNC</span>
          <Network size={18} />
        </div>
        <svg className="absolute bottom-10 right-32 w-24 h-24" viewBox="0 0 100 100">
          <line x1="90" y1="90" x2="10" y2="10" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
        </svg>
      </div>

      <div className="text-center bg-slate-800/80 backdrop-blur px-6 py-3 rounded-full border border-slate-700 text-slate-300 text-sm">
        Consistencia Garantizada • Independiente del código externo
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
    

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Uso de TRIGGERS 
          </h1>
      
        </div>

        {/* Sección 1 */}
        <Section title="Introducción a los triggers en bases de datos" icon={Activity}>
          <p>
            Los triggers (disparadores) son mecanismos que permiten ejecutar automáticamente instrucciones SQL cuando ocurre un evento específico en una tabla, como insertar, actualizar o eliminar datos. Su principal función es automatizar tareas dentro de la base de datos, reduciendo la necesidad de lógica adicional en el código de la aplicación.
          </p>
          <div className="mt-6">
          
            <DiagramIntro />
          </div>
        </Section>

        {/* Sección 2 */}
        <Section title="Creación de un trigger en SQLite" icon={Code}>
          <p>
            Un trigger se define mediante la instrucción <code>CREATE TRIGGER</code>, especificando el momento de ejecución, el evento y la acción a realizar. A continuación, un ejemplo integrando SQLite con Python:
          </p>
          
          <CodeBlock language="python" code={`import sqlite3

conn = sqlite3.connect("ejemplo.db")
cursor = conn.cursor()

trigger_query = """
CREATE TRIGGER registro_insert
AFTER INSERT ON usuarios
BEGIN
    INSERT INTO log (mensaje)
    VALUES ('Nuevo usuario agregado');
END;
"""

cursor.execute(trigger_query)
conn.commit()`} />
          
          <p className="bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-100">
            En este caso, cada vez que se inserta un nuevo usuario, se registra automáticamente un mensaje en la tabla log.
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Esquema de Ejecución</h3>
            <DiagramTables />
          </div>
        </Section>

        {/* Sección 3 */}
        <Section title="Tipos de eventos que activan triggers" icon={Clock}>
          <p>
            Los triggers pueden ejecutarse en distintos momentos respecto al evento que los activa:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2 mb-4 text-slate-700">
            <li><strong>BEFORE INSERT:</strong> antes de insertar un registro.</li>
            <li><strong>AFTER INSERT:</strong> después de insertar un registro.</li>
            <li><strong>BEFORE UPDATE:</strong> antes de modificar un registro.</li>
            <li><strong>AFTER DELETE:</strong> después de eliminar un registro.</li>
          </ul>
          <p>
            La elección del momento depende de si se desea intervenir antes de que ocurra el cambio o reaccionar después de que se haya realizado.
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Línea Temporal de Eventos</h3>
            <DiagramTimeline />
          </div>
        </Section>

        {/* Sección 4 */}
        <Section title="Uso de valores OLD y NEW en triggers" icon={FileDigit}>
          <p>
            Dentro de un trigger, es posible acceder a los valores anteriores y nuevos de un registro mediante las palabras clave <code>OLD</code> y <code>NEW</code>. Esto es especialmente útil en operaciones de actualización.
          </p>

          <CodeBlock language="sql" code={`CREATE TRIGGER actualizar_log
AFTER UPDATE ON usuarios
BEGIN
    INSERT INTO log (mensaje)
    VALUES ('Usuario actualizado de ' || OLD.nombre || ' a ' || NEW.nombre);
END;`} />
          
          <p>
            Aquí se registra el cambio de nombre de un usuario, mostrando tanto el valor anterior como el nuevo.
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Transformación de Registros</h3>
            <DiagramOldNew />
          </div>
        </Section>

        {/* Sección 5 */}
        <Section title="Buenas prácticas en el uso de triggers" icon={CheckCircle2}>
          <p>
            El uso adecuado de triggers contribuye a mantener una base de datos clara y eficiente. Recomendamos seguir estas pautas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              Mantener los triggers simples y enfocados en una sola tarea.
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              Evitar lógica compleja que dificulte la comprensión y el mantenimiento.
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              Documentar claramente el propósito de cada trigger.
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              Usarlos cuando la automatización a nivel de DB sea más adecuada que en código.
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Contraste de Arquitectura</h3>
            <DiagramPractices />
          </div>
        </Section>

        {/* Sección 6 (Cierre) */}
        <Section title="Automatización eficiente con triggers" icon={Network}>
          <p>
            Los triggers permiten encapsular comportamientos automáticos dentro de la base de datos, garantizando consistencia y reduciendo la dependencia del código externo. Su uso adecuado mejora la integridad de los datos y simplifica el diseño de aplicaciones en Python con SQLite.
          </p>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Visión del Sistema</h3>
            <DiagramSystem />
          </div>
        </Section>

      </main>
      
   
    </div>
  );
};

export default App;