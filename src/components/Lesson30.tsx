import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Table as TableIcon, 
  Zap, 
  Settings, 
  Code,
  TrendingUp,
  AlertCircle,
  Layers
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

// --- Types ---

type TabId = 'principio' | 'columnas' | 'ejemplo' | 'rendimiento' | 'estrategia';

interface Section {
  id: TabId;
  title: string;
  icon: React.ReactNode;
  description: string;
  diagramTitle: string;
}

// --- Components ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);
interface DiagramRenderProps {
  type: TabId;
}
const DiagramRender = ({ type }: DiagramRenderProps) => {
  switch (type) {
    case 'principio':
      return (
        <div className="h-full w-full grid grid-cols-2 gap-8 items-center p-4">
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <h4 className="text-sm font-bold text-slate-500 uppercase text-center">Búsqueda Secuencial</h4>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 grid grid-cols-1 gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-8 rounded flex items-center px-3 text-xs ${i === 6 ? 'bg-amber-100 border border-amber-300 animate-pulse' : 'bg-slate-50 text-slate-400'}`}>
                  Fila {i + 1} {i === 6 ? '← Encontrado!' : ''}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <h4 className="text-sm font-bold text-blue-500 uppercase text-center">Búsqueda por Índice (B-Tree)</h4>
            <div className="flex flex-col items-center justify-center h-full">
              <svg viewBox="0 0 200 120" className="w-full h-auto max-w-[250px]">
                <circle cx="100" cy="20" r="15" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                <path d="M90 35 L60 60 M110 35 L140 60" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="50" cy="70" r="15" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
                <circle cx="150" cy="70" r="15" fill="#3b82f6" fillOpacity="0.8" stroke="#3b82f6" strokeWidth="2" className="animate-bounce" />
                <text x="100" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">Raíz</text>
                <text x="150" y="105" textAnchor="middle" fontSize="8" fill="#3b82f6" fontWeight="bold">Acceso Directo</text>
              </svg>
            </div>
          </div>
        </div>
      );
    case 'columnas':
      return (
        <div className="h-full w-full grid grid-cols-1 gap-6 p-4">
          <div className="bg-slate-900 rounded-lg p-6 text-slate-300 font-mono text-sm leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20"><Database size={48} /></div>
            <p>SELECT * FROM usuarios</p>
            <p>WHERE <span className="bg-blue-500/30 text-blue-400 px-1 rounded border border-blue-500/50">email</span> = 'user@example.com'</p>
            <p>JOIN pedidos ON usuarios.<span className="bg-blue-500/30 text-blue-400 px-1 rounded border border-blue-500/50">id</span> = pedidos.user_id</p>
            <p>ORDER BY <span className="bg-blue-500/30 text-blue-400 px-1 rounded border border-blue-500/50">fecha_registro</span> DESC;</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Filtrado (WHERE)', 'Uniones (JOIN)', 'Orden (ORDER BY)'].map((label, i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 border border-blue-100 bg-blue-50 rounded-lg">
                <Search size={20} className="text-blue-600 mb-2" />
                <span className="text-xs font-semibold text-blue-800">{label}</span>
              </div>
            ))}
          </div>
        </div>
      );
    case 'ejemplo':
      return (
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase">Comando SQL</h5>
            <div className="bg-slate-800 rounded-lg p-4 text-emerald-400 font-mono text-sm border-l-4 border-emerald-500 shadow-inner">
              <span className="text-slate-500 italic">-- Crea el índice</span><br />
              CREATE INDEX <span className="text-blue-300">idx_salario</span><br />
              ON <span className="text-white">empleados</span>(<span className="text-amber-300">salario</span>);
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-bold text-slate-400 uppercase">Estructura Ordenada Resultante</h5>
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden text-xs">
              <div className="bg-slate-100 p-2 font-bold border-b border-slate-200 flex justify-between">
                <span>Salario (Key)</span>
                <span>RowID (Pointer)</span>
              </div>
              {[1200, 1500, 2100, 2800, 3500].map((val, i) => (
                <div key={i} className="p-2 border-b border-slate-100 flex justify-between hover:bg-blue-50 transition-colors">
                  <span className="font-mono text-blue-600">${val}</span>
                  <span className="font-mono text-slate-400">#0x{432 + i*12}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'rendimiento':
      const data = [
        { name: 'Full Scan', time: 450, fill: '#ef4444' },
        { name: 'Index Seek', time: 12, fill: '#10b981' },
      ];
      return (
        <div className="h-full w-full p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20, right: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white p-2 rounded shadow text-xs">
                        <p className="font-bold">{payload[0].payload.name}</p>
                        <p>{payload[0].value} ms</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="time" radius={[0, 4, 4, 0]} barSize={40}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 text-center text-xs font-semibold text-slate-500">
            Tiempo de respuesta (ms) - Menos es mejor
          </div>
        </div>
      );
    case 'estrategia':
      return (
        <div className="h-full w-full grid grid-cols-1 gap-4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h5 className="text-emerald-700 font-bold text-sm mb-2 flex items-center gap-2">
                <Zap size={16} /> Beneficios
              </h5>
              <ul className="text-xs text-emerald-800 space-y-2">
                <li>• Consultas ultra-rápidas</li>
                <li>• Menor carga de CPU</li>
                <li>• Optimización de JOINS</li>
              </ul>
            </div>
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl">
              <h5 className="text-rose-700 font-bold text-sm mb-2 flex items-center gap-2">
                <AlertCircle size={16} /> Costos
              </h5>
              <ul className="text-xs text-rose-800 space-y-2">
                <li>• Espacio en disco extra</li>
                <li>• Escritura (INSERT/UPDATE) más lenta</li>
                <li>• Necesidad de mantenimiento</li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-center">
              <Layers className="mx-auto text-blue-500 mb-2" size={32} />
              <p className="text-sm font-medium text-slate-600">
                La clave es el <span className="text-blue-600 font-bold">Equilibrio</span>:<br/>
                Indexa solo lo que realmente consultas.
              </p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};
interface LessonLayoutProps {
  activeTab: TabId;
  setActiveTab: React.Dispatch<React.SetStateAction<TabId>>;
  sections: Section[];
}


const LessonLayout = ({ activeTab, setActiveTab, sections }: LessonLayoutProps) => { const currentSection = useMemo(
  () => sections.find(s => s.id === activeTab)!,
  [activeTab, sections]
);

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 grid grid-rows-[auto_1fr]">
      {/* Header Section */}
      <header className="bg-white border-b border-slate-200 shadow-sm z-10 grid grid-cols-1">
        <div className="max-w-6xl mx-auto w-full px-6 py-4 grid grid-cols-[1fr_auto] items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Database size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Arquitectura de Bases de Datos</p>
            </div>
          </div>
          
          {/* Navigation - Tabs based on Requirements */}
          <nav className="hidden lg:grid grid-flow-col gap-1 bg-slate-100 p-1 rounded-lg">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                  activeTab === section.id 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Mobile Nav */}
        <nav className="lg:hidden grid grid-flow-col auto-cols-fr border-t border-slate-100 overflow-x-auto no-scrollbar">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex flex-col items-center justify-center py-3 text-[10px] font-bold gap-1 transition-all ${
                activeTab === section.id 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-slate-400'
              }`}
            >
              {section.icon}
              <span className="truncate w-16 text-center">{section.title}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Layout using CSS Grid */}
      <main className="max-w-6xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
        
        {/* Textual Content Column */}
        <section className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
          
            <h3 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
              {currentSection.title}
            </h3>
          </div>

          <Card className="p-6 md:p-8">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                {currentSection.description}
              </p>
            </div>
          </Card>
        </section>

        {/* Visual Diagram Column */}
        <aside className="grid grid-cols-1 gap-4 sticky top-6">
          <div className="flex items-center justify-between px-1">
          
          </div>
          
          <Card className="bg-slate-50 border-2 border-slate-100 flex flex-col h-[400px]">
            <div className="p-4 bg-white border-b border-slate-100">
              <h5 className="font-bold text-slate-800 text-sm">
                {currentSection.diagramTitle}
              </h5>
            </div>
            <div className="flex-1 min-h-0 relative">
              <DiagramRender type={activeTab} />
            </div>
          </Card>

          
        </aside>
      </main>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('principio');

  const sections: Section[] = [
    {
      id: 'principio',
      title: 'Principio del Índice',
      icon: <Layers size={18} />,
      description: 'El uso de índices es una heurística fundamental para acelerar el acceso a los datos. Un índice es una estructura auxiliar que permite localizar registros de manera eficiente sin necesidad de recorrer toda la tabla.\n\nSu aplicación adecuada reduce significativamente el tiempo de ejecución de las consultas al evitar el temido "Full Table Scan".',
      diagramTitle: 'Acceso Secuencial vs. Acceso por Índice'
    },
    {
      id: 'columnas',
      title: 'Columnas Clave',
      icon: <TableIcon size={18} />,
      description: 'Los índices son especialmente útiles en columnas que participan frecuentemente en condiciones de búsqueda (WHERE), en operaciones de unión (JOIN) y en ordenamientos (ORDER BY).\n\nEn estos casos, permiten evitar operaciones costosas como escaneos completos o ordenamientos intensivos en memoria.',
      diagramTitle: 'Puntos de Aplicación de Índices'
    },
    {
      id: 'ejemplo',
      title: 'Creación de Índices',
      icon: <Code size={18} />,
      description: 'La creación de un índice es sencilla mediante DDL (Data Definition Language). Por ejemplo, crear un índice en la columna "salario" permite al motor organizar estos valores de forma lógica fuera de la tabla principal.\n\nEsto facilita enormemente la búsqueda de rangos salariales específicos.',
      diagramTitle: 'Implementación SQL y Estructura'
    },
    {
      id: 'rendimiento',
      title: 'Rendimiento',
      icon: <TrendingUp size={18} />,
      description: 'El impacto es drástico: puede reducir el número de accesos a disco de miles a solo un puñado. Sin embargo, recuerda que el almacenamiento físico aumenta y las operaciones de inserción/actualización se vuelven un poco más lentas para mantener el índice al día.',
      diagramTitle: 'Comparativa de Tiempo de Ejecución'
    },
    {
      id: 'estrategia',
      title: 'Uso Estratégico',
      icon: <Settings size={18} />,
      description: 'No todas las columnas deben indexarse. El uso estratégico implica seleccionar aquellas columnas que aportan mayor beneficio según las consultas más frecuentes.\n\nUn diseño adecuado busca el equilibrio perfecto entre velocidad de lectura y agilidad de escritura.',
      diagramTitle: 'Balance Costo-Beneficio'
    }
  ];

  return (
    <LessonLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      sections={sections} 
    />
  );
}