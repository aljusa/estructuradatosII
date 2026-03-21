import React, { useState } from 'react';
import { 
  Database, 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  Lock, 
  Activity
} from 'lucide-react';
import { 
  BarChart as RechartsBar, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

// --- Types ---
interface Section {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
  diagramTitle: string;
  diagramDescription: string;
}

// --- Mock Data for Recharts ---
const impactData = [
  { name: 'Consulta No Optimizada', rows: 1000, cost: 85 },
  { name: 'Consulta Optimizada', rows: 15, cost: 5 },
];

// --- Sub-components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const SQLCode = ({ code }: { code: string }) => (
  <pre className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-sm overflow-x-auto border border-slate-700">
    <code>{code}</code>
  </pre>
);

// --- Diagram Components ---

const RewriteDiagram = () => (
  <div className="flex items-center justify-around w-full h-48 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-6 border border-dashed border-slate-300">
    <div className="flex flex-col items-center gap-2">
      <div className="p-4 bg-white dark:bg-slate-800 border-2 border-slate-400 rounded-md shadow-sm">
        <Database className="w-8 h-8 text-slate-500" />
        <span className="text-xs font-bold block mt-1">SQL Original</span>
      </div>
      <span className="text-[10px] text-slate-400">Ruta indirecta / Costosa</span>
    </div>
    
    <div className="flex flex-col items-center">
      <Zap className="w-10 h-10 text-amber-500 animate-pulse" />
      <div className="h-0.5 w-24 bg-gradient-to-r from-slate-400 to-emerald-500 relative">
        <ArrowRight className="absolute -right-2 -top-2 text-emerald-500" />
      </div>
      <span className="text-[10px] font-bold text-amber-600 mt-2 uppercase tracking-tighter">Motor de Optimización</span>
    </div>

    <div className="flex flex-col items-center gap-2">
      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-500 rounded-md shadow-md">
        <Zap className="w-8 h-8 text-emerald-600" />
        <span className="text-xs font-bold block mt-1 text-emerald-700">SQL Eficiente</span>
      </div>
      <span className="text-[10px] text-emerald-500 font-medium">Ruta directa a índices</span>
    </div>
  </div>
);

const FunctionBlockDiagram = () => (
  <div className="relative w-full h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200">
    <div className="grid grid-cols-3 gap-8 items-center w-full max-w-lg">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center border-2 border-blue-500">
          <Database className="text-blue-600" />
        </div>
        <span className="mt-2 text-xs font-semibold">Columna Indexada</span>
      </div>
      
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center border-2 border-rose-500 z-10">
          <span className="text-xs font-bold text-rose-700">YEAR()</span>
        </div>
        <Lock className="absolute -top-2 -right-2 text-rose-600 w-6 h-6 fill-rose-100" />
        <div className="absolute top-1/2 left-full w-12 h-0.5 bg-rose-300 -z-0"></div>
        <div className="absolute top-1/2 right-full w-12 h-0.5 bg-blue-300 -z-0"></div>
      </div>

      <div className="flex flex-col items-center opacity-40">
        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-400 border-dashed">
          <Search className="text-slate-500" />
        </div>
        <span className="mt-2 text-xs font-semibold">Acceso Rápido Bloqueado</span>
      </div>
    </div>
    <div className="absolute bottom-4 left-0 right-0 text-center">
      <span className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 italic">
        "El índice no puede procesar el valor transformado por la función"
      </span>
    </div>
  </div>
);

const ExecutionComparison = ({ type }: { type: 'slow' | 'fast' }) => (
  <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-lg p-6 border border-slate-200">
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {type === 'slow' ? <AlertTriangle className="text-rose-500" /> : <CheckCircle2 className="text-emerald-500" />}
        <span className="font-bold text-sm uppercase tracking-wide">
          {type === 'slow' ? 'Full Table Scan (Escaneo Completo)' : 'Index Range Scan (Escaneo de Rango)'}
        </span>
      </div>
      
      <div className="grid grid-cols-10 gap-1 h-12">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className={`h-full rounded-sm border ${
              type === 'slow' 
                ? 'bg-rose-400 border-rose-600 animate-pulse' 
                : (i > 15 && i < 22 ? 'bg-emerald-400 border-emerald-600' : 'bg-slate-200 dark:bg-slate-700 border-transparent opacity-30')
            }`}
          />
        ))}
      </div>
      
      <p className="text-xs text-slate-500 italic">
        {type === 'slow' 
          ? "Cada fila es leída y transformada antes de comparar. Costo O(N)." 
          : "El motor salta directamente al rango de memoria del índice. Costo O(log N)."}
      </p>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('principio');

  const sections: Section[] = [
    {
      id: 'principio',
      title: '1. Reescritura',
      diagramTitle: 'Flujo de Optimización Semántica',
      diagramDescription: 'Representación de cómo una consulta SQL atraviesa el optimizador para encontrar una forma equivalente pero estructuralmente más eficiente.',
      description: 'La transformación de expresiones consiste en reescribir una consulta en una forma equivalente pero más eficiente.',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Aunque el resultado final de los datos no cambia, la nueva versión de la expresión puede facilitar que el motor de base de datos utilice estructuras de acceso rápido como índices.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <h4 className="text-xs font-bold text-blue-700 uppercase mb-1">Resultado</h4>
              <p className="text-sm">Idéntico al original.</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-700 uppercase mb-1">Rendimiento</h4>
              <p className="text-sm">Significativamente superior.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'problema',
      title: '2. El Problema',
      diagramTitle: 'Barrera de Funciones en Columnas',
      diagramDescription: 'Visualización de cómo una función aplicada a una columna actúa como un "muro" que impide que el buscador llegue al índice precalculado.',
      description: 'Aplicar funciones sobre columnas en la cláusula WHERE inhabilita el uso de índices.',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            Cuando el SGBD encuentra una función en la columna buscada, debe calcular el resultado de esa función para <strong>todas</strong> las filas de la tabla antes de poder compararlas.
          </p>
          <div className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded text-sm text-rose-800">
            <strong>Consecuencia:</strong> Obliga a realizar un escaneo completo (Full Table Scan), incluso si hay un índice creado.
          </div>
        </div>
      )
    },
    {
      id: 'ineficiente',
      title: '3. Ineficiente',
      diagramTitle: 'Análisis de Ejecución Secuencial',
      diagramDescription: 'Simulación de un escaneo de tabla completa donde cada registro es evaluado individualmente.',
      description: 'Ejemplo de consulta que no aprovecha los recursos del sistema.',
      content: (
        <div className="space-y-4">
          <SQLCode code={`SELECT * \nFROM empleados \nWHERE YEAR(fecha_ingreso) = 2020;`} />
          <p className="text-sm text-slate-500">
            Aquí, <code className="bg-slate-100 px-1">YEAR()</code> se ejecuta N veces. Si la tabla tiene 1 millón de empleados, se hacen 1 millón de cálculos antes de filtrar.
          </p>
        </div>
      )
    },
    {
      id: 'optimizado',
      title: '4. Optimizado',
      diagramTitle: 'Acceso por Rango de Índice',
      diagramDescription: 'Visualización de un acceso directo al segmento de datos relevante utilizando los punteros del índice.',
      description: 'Transformación a una condición SARGable (Search Argumentable).',
      content: (
        <div className="space-y-4">
          <SQLCode code={`SELECT * \nFROM empleados \nWHERE fecha_ingreso \nBETWEEN '2020-01-01' AND '2020-12-31';`} />
          <p className="text-sm text-slate-500">
            Al dejar la columna <code className="bg-slate-100 px-1">fecha_ingreso</code> limpia, el motor busca directamente el rango en el índice B-Tree, ignorando el resto de la tabla.
          </p>
        </div>
      )
    },
    {
      id: 'impacto',
      title: '5. Impacto',
      diagramTitle: 'Comparativa de Filas Procesadas',
      diagramDescription: 'Análisis cuantitativo de la reducción de carga de trabajo entre una consulta no optimizada vs optimizada.',
      description: 'Resultados tangibles de la optimización de expresiones.',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-300">
            La diferencia en el número de filas evaluadas puede ser de varios órdenes de magnitud, lo que reduce el uso de CPU, I/O de disco y tiempo de respuesta.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Menor latencia de respuesta para el usuario final.</span>
            </li>
            <li className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <span>Reducción de bloqueos en la base de datos.</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const currentSection = sections.find(s => s.id === activeTab) || sections[0];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 md:p-8 font-sans text-slate-900 dark:text-slate-100">
      {/* --- Main Layout Grid --- */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] grid-rows-[auto_1fr] gap-6">
        
        {/* Header - Area: Top Full Width */}
        <header className="md:col-span-2 bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Transformación de expresiones</h1>
            </div>
          </div>
      
        </header>

        {/* Sidebar / Tabs - Area: Left */}
        <aside className="space-y-4">
          <div className="flex flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 text-left border ${
                  activeTab === section.id
                    ? 'bg-white dark:bg-slate-800 border-emerald-500 shadow-md translate-x-2'
                    : 'bg-transparent border-transparent hover:bg-slate-200 dark:hover:bg-slate-900 text-slate-500'
                }`}
              >
                <span className={`font-bold ${activeTab === section.id ? 'text-slate-900 dark:text-white' : ''}`}>
                  {section.title}
                </span>
                {activeTab === section.id && <ArrowRight className="w-4 h-4 text-emerald-500" />}
              </button>
            ))}
          </div>
          

        </aside>

        {/* Content Area - Area: Right */}
        <main className="space-y-6">
          {/* Text Content Section */}
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{currentSection.title}</h2>
              <div className="h-1 w-20 bg-emerald-500 rounded-full"></div>
            </div>
            {currentSection.content}
          </Card>

          {/* Diagram Render Section */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-emerald-500" />
                {currentSection.diagramTitle}
              </h3>
              <p className="text-sm text-slate-500 mb-4">{currentSection.diagramDescription}</p>
            </div>
            
            <Card className="p-6 bg-white dark:bg-slate-800 min-h-[300px] flex items-center justify-center">
              <div className="w-full">
                {activeTab === 'principio' && <RewriteDiagram />}
                {activeTab === 'problema' && <FunctionBlockDiagram />}
                {activeTab === 'ineficiente' && <ExecutionComparison type="slow" />}
                {activeTab === 'optimizado' && <ExecutionComparison type="fast" />}
                {activeTab === 'impacto' && (
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBar data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis hide />
                        <Tooltip 
                          cursor={{fill: 'transparent'}}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="rows" radius={[8, 8, 0, 0]} barSize={60}>
                          {impactData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#f43f5e' : '#10b981'} />
                          ))}
                        </Bar>
                      </RechartsBar>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-8 mt-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-500">
                        <span className="w-3 h-3 bg-rose-500 rounded-full"></span> Escaneo de Tabla
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                        <span className="w-3 h-3 bg-emerald-500 rounded-full"></span> Acceso por Índice
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </main>


      </div>
    </div>
  );
}