import React, { useState } from 'react';
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

interface SectionData {
  id: string;
  tabTitle: string;
  diagramTitle: string;
  diagramDesc: string;
  content: string;
  code?: string;
}

interface LessonData {
  headerTitle: string;
  lessonTitle: string;
  sections: SectionData[];
}

// --- DATA ---

const lessonData: LessonData = {
  headerTitle: "",
  lessonTitle: "Proyección Temprana",
  sections: [
    {
      id: "principio",
      tabTitle: "1. Principio",
      diagramTitle: "Selección de Atributos",
      diagramDesc: "Representación de una tabla donde se aíslan únicamente las columnas requeridas, descartando las innecesarias antes de continuar el procesamiento.",
      content: "Otra heurística fundamental en la optimización de consultas consiste en seleccionar únicamente las columnas necesarias desde las primeras etapas del procesamiento. Esta operación, conocida como proyección, reduce la cantidad de datos que deben ser transportados y manipulados por el sistema."
    },
    {
      id: "aplicacion",
      tabTitle: "2. Aplicación",
      diagramTitle: "Flujo de Proyección Temprana",
      diagramDesc: "Una tabla amplia pasa por un proceso de 'selección de columnas' (proyección) convirtiéndose en una estructura mucho más compacta para las siguientes operaciones.",
      content: "Al especificar únicamente los atributos requeridos en la cláusula SELECT, el SGBD puede evitar procesar información irrelevante. Esto es especialmente importante en tablas con muchas columnas o con datos de gran tamaño (por ejemplo, textos o archivos)."
    },
    {
      id: "ejemplo",
      tabTitle: "3. Ejemplo",
      diagramTitle: "Proyección en SQL: Tabla Empleados",
      diagramDesc: "Visualización de la tabla 'empleados' donde únicamente la columna 'nombre' se encuentra activa y recuperada.",
      content: "En este caso, solo se recupera la columna nombre, ignorando el resto de los atributos de la tabla. Esto reduce el volumen de datos desde el inicio del procesamiento.",
      code: "SELECT nombre \nFROM empleados;"
    },
    {
      id: "impacto",
      tabTitle: "4. Impacto",
      diagramTitle: "Impacto en el Rendimiento",
      diagramDesc: "Gráfico comparativo del uso de recursos relativos (Memoria y Tiempo) al ejecutar una consulta con y sin proyección temprana.",
      content: "Evitar columnas innecesarias disminuye el uso de memoria, reduce la cantidad de datos transferidos y acelera las operaciones posteriores. Esta heurística, combinada con la reducción temprana de filas, contribuye significativamente a mejorar la eficiencia global de la consulta."
    }
  ]
};

// --- COMPONENTS ---

// 1. Card Component (Grid-based wrapper)
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-md border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

// 2. TabButton Component
const TabButton: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode }> = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`grid place-items-center py-3 px-2 md:px-4 text-sm font-bold transition-all duration-300 border-b-4 ${
      isActive
        ? 'bg-white text-indigo-700 border-indigo-600 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'
        : 'bg-slate-200 text-slate-500 border-transparent hover:bg-slate-300'
    } rounded-t-lg`}
  >
    {children}
  </button>
);

// 3. DiagramRender Component
const DiagramRender: React.FC<{ activeId: string }> = ({ activeId }) => {
  // Grid-based UI for Tab 3 (Ejemplo)
  const renderTableExample = () => (
    <div className="grid place-items-center h-full w-full">
      <div className="grid grid-cols-4 gap-[2px] bg-slate-300 border-2 border-slate-300 rounded-md overflow-hidden w-full max-w-lg shadow-lg">
        {/* Headers */}
        <div className="grid bg-slate-100 p-3 place-items-center font-bold text-xs text-slate-400">ID</div>
        <div className="grid bg-indigo-500 p-3 place-items-center font-bold text-xs text-white">nombre</div>
        <div className="grid bg-slate-100 p-3 place-items-center font-bold text-xs text-slate-400">apellido</div>
        <div className="grid bg-slate-100 p-3 place-items-center font-bold text-xs text-slate-400">salario</div>
        
        {/* Row 1 */}
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">1</div>
        <div className="grid bg-indigo-50 p-3 place-items-center text-sm text-indigo-900 font-bold">Ana</div>
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">García</div>
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">$3000</div>
        
        {/* Row 2 */}
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">2</div>
        <div className="grid bg-indigo-50 p-3 place-items-center text-sm text-indigo-900 font-bold">Luis</div>
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">Pérez</div>
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">$2800</div>

        {/* Row 3 */}
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">3</div>
        <div className="grid bg-indigo-50 p-3 place-items-center text-sm text-indigo-900 font-bold">Marta</div>
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">López</div>
        <div className="grid bg-white p-3 place-items-center text-sm text-slate-400 opacity-40">$3500</div>
      </div>
    </div>
  );

  // Recharts UI for Tab 4 (Impacto)
  const renderChart = () => {
    const data = [
      { name: 'Sin Proyección', memoria: 100, tiempo: 100 },
      { name: 'Con Proyección', memoria: 25, tiempo: 40 },
    ];
    
    return (
      <div className="grid w-full h-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} label={{ value: 'Consumo Relativo (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#64748b' } }} />
            <Tooltip cursor={{ fill: '#f1f5f9' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
            <Bar dataKey="memoria" fill="#ef4444" name="Uso de Memoria (RAM)" radius={[4, 4, 0, 0]} barSize={50} />
            <Bar dataKey="tiempo" fill="#3b82f6" name="Tiempo de Transferencia" radius={[4, 4, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  switch (activeId) {
    case 'principio':
      return (
        <div className="grid place-items-center w-full h-full">
          <svg viewBox="0 0 400 200" className="w-full max-w-md drop-shadow-md">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="none" />
              </pattern>
            </defs>
            {/* Base Table Graphic */}
            <rect x="50" y="40" width="60" height="120" fill="#4f46e5" rx="4" />
            <text x="80" y="105" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Col 1</text>
            
            <rect x="115" y="40" width="60" height="120" fill="#94a3b8" rx="4" opacity="0.3" strokeDasharray="4" stroke="#64748b" strokeWidth="2" />
            <line x1="125" y1="50" x2="165" y2="150" stroke="#ef4444" strokeWidth="2" opacity="0.5"/>
            <line x1="165" y1="50" x2="125" y2="150" stroke="#ef4444" strokeWidth="2" opacity="0.5"/>
            
            <rect x="180" y="40" width="60" height="120" fill="#94a3b8" rx="4" opacity="0.3" strokeDasharray="4" stroke="#64748b" strokeWidth="2" />
            <line x1="190" y1="50" x2="230" y2="150" stroke="#ef4444" strokeWidth="2" opacity="0.5"/>
            <line x1="230" y1="50" x2="190" y2="150" stroke="#ef4444" strokeWidth="2" opacity="0.5"/>

            <rect x="245" y="40" width="60" height="120" fill="#4f46e5" rx="4" />
            <text x="275" y="105" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">Col 4</text>

            <rect x="310" y="40" width="60" height="120" fill="#94a3b8" rx="4" opacity="0.3" strokeDasharray="4" stroke="#64748b" strokeWidth="2" />
            <line x1="320" y1="50" x2="360" y2="150" stroke="#ef4444" strokeWidth="2" opacity="0.5"/>
            <line x1="360" y1="50" x2="320" y2="150" stroke="#ef4444" strokeWidth="2" opacity="0.5"/>
          </svg>
        </div>
      );
    case 'aplicacion':
      return (
        <div className="grid place-items-center w-full h-full">
           <svg viewBox="0 0 500 200" className="w-full max-w-lg drop-shadow-lg">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
            {/* Wide Table Block */}
            <rect x="10" y="50" width="140" height="100" fill="#e2e8f0" rx="8" stroke="#cbd5e1" strokeWidth="2"/>
            <text x="80" y="105" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">Tabla Original</text>
            <text x="80" y="125" textAnchor="middle" fontSize="10" fill="#64748b">(15 Columnas)</text>
            
            {/* Arrow 1 */}
            <path d="M 160 100 L 205 100" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow)"/>
            
            {/* Funnel / Projection Operation */}
            <polygon points="220,30 310,30 280,75 280,170 250,170 250,75" fill="#4f46e5" />
            <text x="265" y="190" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4f46e5">Proyección</text>
            
            {/* Arrow 2 */}
            <path d="M 325 100 L 370 100" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow)"/>
            
            {/* Narrow Table Block */}
            <rect x="385" y="60" width="50" height="80" fill="#22c55e" rx="6" stroke="#16a34a" strokeWidth="2"/>
            <text x="410" y="105" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff" transform="rotate(-90 410 105)">Resultado</text>
            <text x="470" y="105" textAnchor="middle" fontSize="10" fill="#64748b" transform="rotate(-90 470 105)">(2 Columnas)</text>
          </svg>
        </div>
      );
    case 'ejemplo':
      return renderTableExample();
    case 'impacto':
      return renderChart();
    default:
      return null;
  }
};

// 4. Main Layout Component
const LessonLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(lessonData.sections[0].id);
  const activeSection = lessonData.sections.find(s => s.id === activeTab) || lessonData.sections[0];

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen w-full bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* Header */}
      <header className="grid grid-cols-[auto_1fr] items-center gap-4 p-4 lg:px-8 bg-slate-900 text-white shadow-md z-10">
        <div className="grid">
          <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">{lessonData.headerTitle}</span>
          <h1 className="text-xl font-bold">{lessonData.lessonTitle}</h1>
        </div>
       
      </header>

      {/* Main Grid Content */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 p-4 lg:p-8 overflow-y-auto lg:overflow-hidden">
        
        {/* Left Column: Tabs & Text Content */}
        <div className="grid grid-rows-[auto_1fr] gap-0 h-full">
          
          {/* Tabs Navigation (Grid based) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {lessonData.sections.map((section) => (
              <TabButton 
                key={section.id} 
                isActive={activeTab === section.id} 
                onClick={() => setActiveTab(section.id)}
              >
                {section.tabTitle}
              </TabButton>
            ))}
          </div>

          {/* Text Content Area */}
          <Card className="grid grid-rows-[auto_1fr] gap-4 rounded-tl-none border-t-0 shadow-lg h-full overflow-y-auto bg-white">
            <h2 className="text-2xl font-extrabold text-slate-800 border-b pb-2 border-slate-100">
              {activeSection.tabTitle.substring(3)} {/* Remove numbers from title */}
            </h2>
            <div className="grid content-start gap-4 text-slate-600 leading-relaxed text-lg">
              <p>{activeSection.content}</p>
              
              {/* Optional Code Block */}
              {activeSection.code && (
                <div className="grid bg-slate-800 rounded-lg p-4 mt-2 shadow-inner border border-slate-700">
                  <span className="text-xs text-slate-400 mb-2 font-bold uppercase">Consulta SQL</span>
                  <pre className="text-emerald-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                    <code>{activeSection.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Diagram Visualization */}
        <Card className="grid grid-rows-[auto_auto_1fr] gap-4 bg-slate-50 border-2 border-slate-200 border-dashed h-full min-h-[400px]">
          <div className="grid gap-1">
            <h3 className="text-xl font-bold text-slate-800">{activeSection.diagramTitle}</h3>
          </div>
          
          <p className="text-sm text-slate-500 bg-white p-3 rounded-md border border-slate-100 shadow-sm">
            {activeSection.diagramDesc}
          </p>
          
          <div className="grid place-items-center bg-white rounded-lg border border-slate-100 shadow-inner p-4 overflow-hidden">
            <DiagramRender activeId={activeSection.id} />
          </div>
        </Card>

      </main>
    </div>
  );
};

export default LessonLayout;