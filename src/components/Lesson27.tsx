
import React, { useState } from 'react';
import { 
  Database, 
  Filter, 
  Settings, 
  ArrowRight, 
  ArrowDown, 
  ArrowUpRight, 
  ArrowUpLeft,
  Users,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// --- TYPES & INTERFACES ---

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SectionData {
  id: string;
  title: string;
  description: React.ReactNode;
  render: React.ReactNode;
}

// --- COMPONENTS ---

/**
 * Componente Layout principal basado estrictamente en CSS Grid.
 */
const LessonLayout: React.FC<{
  title: string;
  tabs: TabItem[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}> = ({ title, tabs, activeTabId, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="grid gap-6 p-6 bg-slate-900 text-slate-100 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        <nav className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`grid grid-cols-[auto_1fr] items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors border ${
                  isActive 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-sm' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span className="text-left leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </header>
      <main className="grid p-4 md:p-8 place-items-start">
        {children}
      </main>
    </div>
  );
};

/**
 * Componente Card estructurado con Grid para encapsular contenido.
 */
const Card: React.FC<{
  title: string;
  description: React.ReactNode;
  render: React.ReactNode;
}> = ({ title, description, render }) => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr] gap-6 w-full max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in zoom-in-95 duration-300">
      <div className="grid gap-4 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <div className="text-slate-600 leading-relaxed text-base md:text-lg">
          {description}
        </div>
      </div>
      <div className="grid w-full min-h-[400px] bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-4 md:p-8 relative">
        {render}
      </div>
    </div>
  );
};

// --- DIAGRAM VIEWS ---

const DiagramPrincipio = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-8 place-items-center h-full w-full py-8">
    
    <div className="grid place-items-center gap-4 text-center">
      <div className="grid place-items-center bg-blue-100 text-blue-700 p-6 rounded-full border-4 border-blue-200 shadow-inner w-32 h-32">
        <Database size={48} />
      </div>
      <div className="grid gap-1">
        <span className="font-bold text-slate-700">100% Datos</span>
        <span className="text-sm text-slate-500">Tabla Original</span>
      </div>
    </div>

    <ArrowRight className="text-slate-300 hidden md:block" size={40} />
    <ArrowDown className="text-slate-300 md:hidden" size={40} />

    <div className="grid place-items-center gap-4 text-center">
      <div className="grid place-items-center bg-amber-100 text-amber-600 p-6 rounded-2xl border-4 border-amber-200 shadow-lg w-28 h-28 transform rotate-3">
        <Filter size={40} />
      </div>
      <div className="grid gap-1">
        <span className="font-bold text-slate-700">Filtro Temprano</span>
        <span className="text-sm text-slate-500">Cláusula WHERE</span>
      </div>
    </div>

    <ArrowRight className="text-slate-300 hidden md:block" size={40} />
    <ArrowDown className="text-slate-300 md:hidden" size={40} />

    <div className="grid place-items-center gap-4 text-center">
      <div className="grid place-items-center bg-emerald-100 text-emerald-700 p-6 rounded-xl border-4 border-emerald-200 shadow-md w-24 h-24">
        <Settings size={36} />
      </div>
      <div className="grid gap-1">
        <span className="font-bold text-slate-700">15% Datos</span>
        <span className="text-sm text-slate-500">Procesamiento Posterior</span>
      </div>
    </div>

  </div>
);

const DiagramAplicacion = () => (
  <div className="grid place-items-center h-full w-full">
    <div className="grid grid-cols-3 grid-rows-[auto_auto_auto_auto_auto] gap-x-4 gap-y-2 text-center text-sm md:text-base font-medium">
      
      {/* Nivel 1: JOIN */}
      <div className="grid col-start-2 row-start-1 place-items-center bg-purple-100 text-purple-800 border-2 border-purple-300 p-4 rounded-lg shadow-sm w-40">
        ⨝ JOIN
      </div>
      
      {/* Nivel 2: Flechas de Join */}
      <div className="grid col-start-1 row-start-2 place-items-end pr-8">
        <ArrowUpRight className="text-slate-400" size={32} />
      </div>
      <div className="grid col-start-3 row-start-2 place-items-start pl-8">
        <ArrowUpLeft className="text-slate-400" size={32} />
      </div>

      {/* Nivel 3: Filtro Izquierdo y Tabla Derecha */}
      <div className="grid col-start-1 row-start-3 place-items-center bg-amber-100 text-amber-700 border-2 border-amber-300 p-4 rounded-lg shadow-sm w-40">
        σ (WHERE)
        <span className="text-xs font-normal mt-1 block">Filtro aplicado antes</span>
      </div>
      
      <div className="grid col-start-3 row-start-3 place-items-center bg-slate-200 text-slate-700 border-2 border-slate-300 p-4 rounded-lg shadow-sm w-40">
        Tabla B
      </div>

      {/* Nivel 4: Flecha de Filtro */}
      <div className="grid col-start-1 row-start-4 place-items-center">
         <ArrowDown className="text-slate-400 transform rotate-180" size={32} />
      </div>

      {/* Nivel 5: Tabla Izquierda Original */}
      <div className="grid col-start-1 row-start-5 place-items-center bg-slate-200 text-slate-700 border-2 border-slate-300 p-4 rounded-lg shadow-sm w-40">
        Tabla A
      </div>

    </div>
  </div>
);

const DiagramEjemplo = () => {
  const data = [
    { id: 1, name: 'Ana', role: 'Dev', salary: 12000, pass: true },
    { id: 2, name: 'Luis', role: 'QA', salary: 8500, pass: false },
    { id: 3, name: 'Marta', role: 'Lead', salary: 15000, pass: true },
    { id: 4, name: 'Carlos', role: 'Design', salary: 9000, pass: false },
    { id: 5, name: 'Elena', role: 'Data', salary: 11000, pass: true },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 place-items-center h-full">
      {/* Tabla Original */}
      <div className="grid gap-3 w-full max-w-sm">
        <h3 className="font-semibold text-slate-700 text-center grid grid-cols-[auto_1fr] items-center gap-2 justify-center">
          <Users size={18} /> Tabla: Empleados
        </h3>
        <div className="grid grid-cols-[auto_1fr_auto] bg-slate-800 text-white rounded-t-lg p-3 text-sm font-bold">
          <div className="grid place-items-center">ID</div>
          <div className="grid px-2">Nombre</div>
          <div className="grid text-right">Salario</div>
        </div>
        <div className="grid gap-1 -mt-3">
          {data.map(row => (
            <div 
              key={row.id} 
              className={`grid grid-cols-[auto_1fr_auto] p-3 text-sm border-b border-slate-200 transition-colors ${
                row.pass ? 'bg-emerald-50 text-emerald-900 border-emerald-200 shadow-sm relative z-10 scale-105 rounded-md' : 'bg-white text-slate-400'
              }`}
            >
              <div className="grid place-items-center w-8 font-mono">{row.id}</div>
              <div className="grid px-2">{row.name}</div>
              <div className="grid text-right font-mono">${row.salary}</div>
              {row.pass && (
                <div className="absolute -right-3 -top-3 text-emerald-500 bg-white rounded-full">
                  <CheckCircle2 size={24} />
                </div>
              )}
              {!row.pass && (
                <div className="absolute -right-3 top-2 text-slate-300 bg-white rounded-full">
                  <XCircle size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Instrucción SQL */}
      <div className="grid place-items-center gap-4 bg-slate-900 p-6 rounded-xl text-emerald-400 font-mono text-sm md:text-base shadow-xl border border-slate-700 w-full max-w-xs text-center">
        <div>
          <span className="text-pink-400">SELECT</span> * <br/>
          <span className="text-pink-400">FROM</span> empleados <br/>
          <span className="text-amber-400">WHERE</span> salario {'>'} 10000;
        </div>
        <ArrowRight className="text-slate-500 hidden lg:block mt-4" size={32} />
        <ArrowDown className="text-slate-500 lg:hidden mt-2" size={32} />
      </div>

      {/* Tabla Resultante */}
      <div className="grid gap-3 w-full max-w-sm">
        <h3 className="font-semibold text-emerald-700 text-center grid grid-cols-[auto_1fr] items-center gap-2 justify-center">
          <Filter size={18} /> Resultado Filtrado
        </h3>
        <div className="grid grid-cols-[auto_1fr_auto] bg-emerald-700 text-white rounded-t-lg p-3 text-sm font-bold shadow-md">
          <div className="grid place-items-center">ID</div>
          <div className="grid px-2">Nombre</div>
          <div className="grid text-right">Salario</div>
        </div>
        <div className="grid gap-1 -mt-3">
          {data.filter(d => d.pass).map(row => (
            <div key={row.id} className="grid grid-cols-[auto_1fr_auto] p-3 text-sm bg-white border border-slate-200 rounded-b-md shadow-sm text-slate-700">
              <div className="grid place-items-center w-8 font-mono">{row.id}</div>
              <div className="grid px-2">{row.name}</div>
              <div className="grid text-right font-mono font-bold">${row.salary}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DiagramImpacto = () => {
  const chartData = [
    { etapa: '1. Escaneo Inicial', conReduccion: 1000, sinReduccion: 1000 },
    { etapa: '2. Operación JOIN', conReduccion: 150, sinReduccion: 1000 },
    { etapa: '3. Agrupación (GROUP BY)', conReduccion: 40, sinReduccion: 1500 },
    { etapa: '4. Ordenamiento (ORDER BY)', conReduccion: 40, sinReduccion: 500 },
  ];

  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 w-full h-full min-h-[400px]">
      <div className="grid text-center">
        <h3 className="text-lg font-bold text-slate-700">Volumen de Filas Procesadas por Etapa</h3>
        <p className="text-sm text-slate-500">Menos filas = Menor uso de CPU/Memoria y respuesta más rápida</p>
      </div>
      <div className="grid w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="etapa" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="sinReduccion" name="Sin Reducción Temprana" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="conReduccion" name="Con Reducción Temprana" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>('principio');

  const tabs: TabItem[] = [
    { id: 'principio', label: 'Principio de reducción', icon: <Database size={18} /> },
    { id: 'aplicacion', label: 'Aplicación en etapas', icon: <Filter size={18} /> },
    { id: 'ejemplo', label: 'Ejemplo de filtrado', icon: <Settings size={18} /> },
    { id: 'impacto', label: 'Impacto en rendimiento', icon: <Settings size={18} /> },
  ];

  const sections: Record<string, SectionData> = {
    principio: {
      id: 'principio',
      title: 'Principio de reducción temprana',
      description: (
        <p>
          Una de las heurísticas más importantes en la optimización de consultas es aplicar las operaciones que reducen el volumen de datos lo antes posible. En particular, las selecciones (filtros) deben ejecutarse en etapas iniciales para disminuir la cantidad de información que será procesada posteriormente.
        </p>
      ),
      render: <DiagramPrincipio />,
    },
    aplicacion: {
      id: 'aplicacion',
      title: 'Aplicación de selecciones en etapas tempranas',
      description: (
        <p>
          La operación de selección, expresada mediante la cláusula <code className="bg-slate-100 text-pink-600 px-1 py-0.5 rounded text-sm font-mono border border-slate-200">WHERE</code>, permite descartar filas que no cumplen una condición. Si esta operación se realiza al inicio (más abajo en el árbol lógico), se evita que operaciones costosas como joins trabajen con datos innecesarios.
        </p>
      ),
      render: <DiagramAplicacion />,
    },
    ejemplo: {
      id: 'ejemplo',
      title: 'Ejemplo de filtrado temprano',
      description: (
        <p>
          En el siguiente caso, el sistema aplica el filtro directamente sobre la tabla <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-sm font-mono border border-slate-200">empleados</code>, reteniendo solo las filas con salario mayor a 10000. Esto reduce inmediatamente el tamaño del conjunto de datos en memoria antes de devolver los resultados al cliente.
        </p>
      ),
      render: <DiagramEjemplo />,
    },
    impacto: {
      id: 'impacto',
      title: 'Impacto en el rendimiento',
      description: (
        <p>
          Reducir datos desde el inicio disminuye el costo de las operaciones posteriores, ya que se procesan exponencialmente menos registros. Esta heurística es vital en consultas complejas, donde múltiples operaciones se encadenan y la complejidad algorítmica multiplicaría los tiempos de ejecución.
        </p>
      ),
      render: <DiagramImpacto />,
    },
  };

  const currentSection = sections[activeTabId];

  return (
    <LessonLayout
      title="Reducción Temprana de Datos"
      tabs={tabs}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
    >
      <Card
        title={currentSection.title}
        description={currentSection.description}
        render={currentSection.render}
      />
    </LessonLayout>
  );
}