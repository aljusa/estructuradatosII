
import React, { useState } from 'react';
import { 
  Database, 
  Table, 
  ArrowRightLeft, 
  BarChart3, 
  Network, 
  Filter,
  Layers,
  Info
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

// --- Interfaces & Types ---

interface TabData {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  renderContent: () => React.ReactNode;
}

// --- Mock Data for Visualization ---

const impactData = [
  { name: 'Flujo Ineficiente', rows: 1000, fill: '#ef4444' },
  { name: 'Resultado Final', rows: 150, fill: '#3b82f6' },
  { name: 'Flujo Optimizado', rows: 200, fill: '#22c55e' },
  { name: 'Resultado Final ', rows: 150, fill: '#3b82f6' },
];

// --- Sub-components ---


const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- Diagrams ---

const PrincipleDiagram = () => (
  <div className="grid grid-cols-1 gap-8 p-4">
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
      <div className="p-4 border-2 border-dashed border-blue-200 rounded-lg flex flex-col items-center bg-blue-50">
        <Table className="text-blue-600 mb-2" />
        <span className="font-bold">Tabla A</span>
        <span className="text-xs text-slate-500">1,000 filas</span>
      </div>
      <div className="flex justify-center text-slate-400">⋈</div>
      <div className="p-4 border-2 border-dashed border-purple-200 rounded-lg flex flex-col items-center bg-purple-50">
        <Table className="text-purple-600 mb-2" />
        <span className="font-bold">Tabla B</span>
        <span className="text-xs text-slate-500">100 filas</span>
      </div>
      <div className="flex justify-center text-slate-400">⋈</div>
      <div className="p-4 border-2 border-dashed border-green-200 rounded-lg flex flex-col items-center bg-green-50">
        <Table className="text-green-600 mb-2" />
        <span className="font-bold">Tabla C</span>
        <span className="text-xs text-slate-500">50 filas</span>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-6 mt-4">
      <div className="p-3 bg-red-50 border border-red-100 rounded text-sm text-red-800">
        <span className="font-bold block mb-1">Orden Subóptimo: (A ⋈ B) ⋈ C</span>
        El join inicial (A ⋈ B) podría generar un set intermedio masivo.
      </div>
      <div className="p-3 bg-green-50 border border-green-100 rounded text-sm text-green-800">
        <span className="font-bold block mb-1">Orden Heurístico: (B ⋈ C) ⋈ A</span>
        Se priorizan las tablas pequeñas para reducir el volumen de datos pronto.
      </div>
    </div>
  </div>
);

const ExecutionTreeDiagram = ({ optimized = false }: { optimized?: boolean }) => {
  const color = optimized ? "stroke-green-500" : "stroke-blue-500";
  const bg = optimized ? "bg-green-100" : "bg-blue-100";
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg width="300" height="200" viewBox="0 0 300 200" className="drop-shadow-sm">
        {/* Lines */}
        <line x1="150" y1="40" x2="100" y2="80" className={color} strokeWidth="2" />
        <line x1="150" y1="40" x2="200" y2="80" className={color} strokeWidth="2" />
        <line x1="100" y1="80" x2="70" y2="120" className={color} strokeWidth="2" />
        <line x1="100" y1="80" x2="130" y2="120" className={color} strokeWidth="2" />
        
        {/* Nodes */}
        <circle cx="150" cy="40" r="20" fill="white" stroke="currentColor" className={color} />
        <text x="150" y="45" textAnchor="middle" className="text-xs font-bold" fill="#1e293b">⋈</text>
        
        <circle cx="100" cy="80" r="20" fill="white" stroke="currentColor" className={color} />
        <text x="100" y="85" textAnchor="middle" className="text-xs font-bold" fill="#1e293b">⋈</text>
        
        <rect x="185" y="80" width="30" height="30" rx="4" className={bg} />
        <text x="200" y="100" textAnchor="middle" className="text-xs font-bold" fill="#1e293b">{optimized ? "A" : "C"}</text>
        
        <rect x="55" y="120" width="30" height="30" rx="4" className={bg} />
        <text x="70" y="140" textAnchor="middle" className="text-xs font-bold" fill="#1e293b">{optimized ? "B" : "A"}</text>
        
        <rect x="115" y="120" width="30" height="30" rx="4" className={bg} />
        <text x="130" y="140" textAnchor="middle" className="text-xs font-bold" fill="#1e293b">{optimized ? "C" : "B"}</text>
      </svg>
      <span className="text-xs mt-2 font-mono text-slate-500">
        {optimized ? "(B ⋈ C) ⋈ A" : "(A ⋈ B) ⋈ C"}
      </span>
    </div>
  );
};

// --- Main Application Component ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: TabData[] = [
    {
      id: 'principio',
      label: '1. Principio',
      icon: <ArrowRightLeft className="w-4 h-4" />,
      title: 'Principio de reordenamiento de joins',
      description: 'Optimización de consultas mediante la reducción temprana de cardinalidad.',
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed">
              El orden en que se realizan las operaciones de <span className="font-semibold italic text-blue-600">join</span> influye directamente en el rendimiento de una consulta. 
            </p>
            <p className="text-slate-600 leading-relaxed">
              Una heurística clave consiste en reorganizar los joins para procesar primero aquellas combinaciones que generan menos filas, reduciendo así el tamaño de los resultados intermedios que viajan por el motor de ejecución.
            </p>
            <div className="bg-amber-50 p-4 border-l-4 border-amber-400 rounded-r-md">
              <h4 className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1">
                <Info className="w-4 h-4" /> REGLA DE ORO
              </h4>
              <p className="text-xs text-amber-700">Filtrar lo más pronto posible para minimizar la memoria utilizada en pasos subsiguientes.</p>
            </div>
          </div>
          <PrincipleDiagram />
        </div>
      )
    },
    {
      id: 'impacto',
      label: '2. Impacto',
      icon: <BarChart3 className="w-4 h-4" />,
      title: 'Impacto de los resultados intermedios',
      description: 'Comparativa del flujo de datos entre ejecuciones optimizadas e ineficientes.',
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed">
              Cada operación de join produce un resultado intermedio. Si este resultado es muy grande, incrementa el costo de procesamiento (CPU, I/O y memoria).
            </p>
            <ul className="grid grid-cols-1 gap-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400" /> 
                <strong>Flujo Ancho:</strong> El primer join produce miles de filas innecesarias.
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" /> 
                <strong>Flujo Estrecho:</strong> El primer join reduce drásticamente el volumen.
              </li>
            </ul>
          </div>
          <div className="h-[300px] bg-slate-50 rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={impactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={10} interval={0} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rows" radius={[4, 4, 0, 0]}>
                  {impactData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    },
    {
      id: 'ejemplo',
      label: '3. Ejemplo Conceptual',
      icon: <Network className="w-4 h-4" />,
      title: 'Ejemplo conceptual de reordenamiento',
      description: 'Comparativa de árboles de ejecución lógica para una consulta A JOIN B JOIN C.',
      renderContent: () => (
        <div className="grid grid-cols-1 gap-6">
          <p className="text-slate-600">
            Considerando una consulta con múltiples joins: <code className="bg-slate-100 px-2 py-1 rounded text-pink-600 font-bold italic">A JOIN B JOIN C</code>. 
            El SGBD evalúa cuál de estos árboles de ejecución es más ligero:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 border-slate-100 flex flex-col items-center">
              <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Plan A (Convencional)</h4>
              <ExecutionTreeDiagram />
              <p className="text-xs text-center text-slate-500 mt-2 px-4">
                Si A ⋈ B genera 1,000,000 de filas, este plan es catastrófico.
              </p>
            </Card>
            <Card className="p-4 border-green-100 bg-green-50/20 flex flex-col items-center">
              <h4 className="text-sm font-bold text-green-600 mb-2 uppercase tracking-wider">Plan B (Reordenado)</h4>
              <ExecutionTreeDiagram optimized />
              <p className="text-xs text-center text-slate-500 mt-2 px-4">
                Si B ⋈ C genera solo 100 filas, el join final con A será instantáneo.
              </p>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 'criterio',
      label: '4. Criterio',
      icon: <Filter className="w-4 h-4" />,
      title: 'Criterio para elegir el orden',
      description: 'Factores que utiliza el optimizador para tomar decisiones de reordenamiento.',
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 gap-4">
            {[
              { title: 'Cardinalidad', desc: 'Número total de filas de las tablas involucradas.', icon: <Layers className="text-blue-500" /> },
              { title: 'Selectividad', desc: 'Capacidad de un predicado para filtrar filas.', icon: <Filter className="text-orange-500" /> },
              { title: 'Índices', desc: 'Presencia de rutas de acceso rápidas para las uniones.', icon: <Database className="text-purple-500" /> }
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-[auto_1fr] gap-4 p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-900 rounded-xl p-6 text-white flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/50">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold">Heurística del Optimizador</h3>
            <p className="text-sm text-slate-400">
              El motor no siempre busca "el mejor plan absoluto", sino uno que sea "suficientemente bueno" en un tiempo de compilación razonable para minimizar resultados intermedios.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 grid grid-rows-[auto_1fr]">

      {/* Main Content Layout - CSS Grid */}
      <main className="grid grid-cols-1 max-w-6xl mx-auto w-full p-6 gap-6 self-start">
        
        {/* Navigation Tabs - CSS Grid */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-200 p-1 rounded-xl shadow-inner">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`
                grid grid-cols-[auto_1fr] items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === index 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-300 hover:text-slate-800'}
              `}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Lesson Body - CSS Grid */}
        <section className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          <div className="grid grid-cols-1 gap-2 border-l-4 border-blue-500 pl-4 py-1">
            <h2 className="text-2xl font-bold text-slate-800">{tabs[activeTab].title}</h2>
            <p className="text-slate-500 italic text-sm">{tabs[activeTab].description}</p>
          </div>

          <Card className="p-8">
            {/* The Diagram Render Component according to current tab */}
            {tabs[activeTab].renderContent()}
          </Card>

       
        </section>

      </main>
    </div>
  );
};

export default App;