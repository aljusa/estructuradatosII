import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- TIPOS E INTERFACES ---

interface SectionData {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  diagramType: 'overview' | 'sequential' | 'index' | 'comparison';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  sections: SectionData[];
  activeSectionId: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

interface PanelProps {
  section: SectionData;
}

// --- DATOS DE LA LECCIÓN ---

const LESSON_DATA: SectionData[] = [
  {
    id: 'delimitacion',
    tabLabel: '1. Delimitación',
    title: 'Delimitación de los métodos de acceso',
    description: 'Los algoritmos de acceso a datos determinan cómo el SGBD localiza la información dentro de las tablas. La elección de un método de acceso influye directamente en el rendimiento de una consulta, ya que define cuántos datos deben examinarse y cuánto tiempo tomará encontrar los resultados.',
    diagramType: 'overview'
  },
  {
    id: 'secuencial',
    tabLabel: '2. Búsqueda Secuencial',
    title: 'Búsqueda Secuencial (Full Table Scan)',
    description: 'La búsqueda secuencial consiste en recorrer todas las filas de una tabla, evaluando cada una para verificar si cumple con la condición de la consulta. Es el método más simple y no requiere estructuras adicionales, pero resulta costoso en tablas grandes, ya que implica revisar todos los registros.',
    diagramType: 'sequential'
  },
  {
    id: 'indices',
    tabLabel: '3. Búsqueda por Índices',
    title: 'Búsqueda mediante Índices',
    description: 'Este método utiliza estructuras auxiliares, como los árboles B+, que permiten localizar rápidamente los registros sin necesidad de recorrer toda la tabla. El índice actúa como una guía que dirige directamente hacia las filas relevantes, reduciendo significativamente el número de accesos necesarios.',
    diagramType: 'index'
  },
  {
    id: 'comparacion',
    tabLabel: '4. Comparación',
    title: 'Comparación entre métodos de acceso',
    description: 'La búsqueda secuencial es adecuada cuando no existen índices o cuando se necesita acceder a una gran proporción de la tabla. En cambio, el uso de índices es más eficiente cuando se buscan pocos registros específicos. El SGBD decide automáticamente qué método utilizar según el contexto de la consulta.',
    diagramType: 'comparison'
  }
];

const COMPARISON_CHART_DATA = [
  { porcentaje: '1%', secuencial: 100, indice: 5 },
  { porcentaje: '5%', secuencial: 100, indice: 15 },
  { porcentaje: '10%', secuencial: 100, indice: 30 },
  { porcentaje: '20%', secuencial: 100, indice: 60 },
  { porcentaje: '30%', secuencial: 100, indice: 90 },
  { porcentaje: '40%', secuencial: 100, indice: 120 }, // El índice se vuelve más costoso por el I/O aleatorio
  { porcentaje: '100%', secuencial: 100, indice: 300 },
];

// --- COMPONENTES BASE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`grid bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, sections, activeSectionId, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 grid grid-rows-[auto_1fr] p-4 md:p-8 gap-6 font-sans text-slate-800">
      {/* HEADER COMPONENT (Title + Nav) */}
      <header className="grid gap-6">
        <div className="grid place-items-center bg-blue-900 text-white p-6 rounded-xl shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center">{title}</h1>
        </div>
        
        {/* TAB NAVIGATION (CSS Grid based) */}
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                onClick={() => onTabChange(section.id)}
                className={`grid place-items-center py-3 px-4 rounded-lg font-medium text-sm md:text-base transition-all duration-300 border-2
                  ${isActive 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-[1.02]' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
              >
                {section.tabLabel}
              </button>
            );
          })}
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="grid min-h-[500px]">
        {children}
      </main>
    </div>
  );
};

// --- COMPONENTES DE DIAGRAMAS ---

const DiagramOverview: React.FC = () => (
  <div className="grid grid-cols-1 gap-8 p-6 place-items-center w-full h-full bg-slate-50 rounded-lg">
    <svg viewBox="0 0 600 300" className="w-full max-w-2xl h-auto drop-shadow-md">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
        </marker>
        <marker id="arrow-fast" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
      </defs>
      
      {/* Base de Datos / Tabla */}
      <rect x="400" y="50" width="150" height="200" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
      {[60, 90, 120, 150, 180, 210, 240].map(y => (
        <line key={y} x1="410" y1={y} x2="540" y2={y} stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
      ))}
      <circle cx="475" cy="180" r="15" fill="#fef08a" stroke="#eab308" strokeWidth="2" /> {/* Target Data */}

      {/* Nodo de Consulta */}
      <rect x="50" y="125" width="120" height="50" rx="8" fill="#1e40af" />
      <text x="110" y="155" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">Consulta SQL</text>

      {/* Ruta 1: Escaneo Completo */}
      <path d="M 170 140 Q 280 60 400 90" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="8,4" markerEnd="url(#arrow)" />
      <rect x="230" y="60" width="120" height="30" rx="5" fill="#eff6ff" stroke="#3b82f6" />
      <text x="290" y="80" fill="#1e3a8a" fontSize="12" fontWeight="bold" textAnchor="middle">Escaneo Lento</text>

      {/* Ruta 2: Índice Directo */}
      <path d="M 170 160 Q 280 240 460 180" fill="none" stroke="#10b981" strokeWidth="5" markerEnd="url(#arrow-fast)" />
      <rect x="230" y="210" width="120" height="30" rx="5" fill="#ecfdf5" stroke="#10b981" />
      <text x="290" y="230" fill="#065f46" fontSize="12" fontWeight="bold" textAnchor="middle">Acceso Directo (Índice)</text>
    </svg>
  </div>
);

const DiagramSequential: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
    <div className="grid place-items-center">
      <div className="grid gap-2 w-full max-w-sm border-4 border-slate-300 bg-slate-100 p-4 rounded-xl">
        {[1, 2, 3, 4, 5, 6].map((row, index) => (
          <div key={row} className="grid grid-cols-[50px_1fr] items-center gap-4">
             {/* Indicador de proceso simulado usando grid */}
             <div className="grid place-items-center h-full">
                {index < 4 ? (
                  <div className="text-blue-500 font-bold text-2xl animate-pulse">→</div>
                ) : index === 4 ? (
                  <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                ) : null}
             </div>
             <div className={`grid h-12 rounded-md place-items-start px-4 content-center border-2 
               ${index < 4 ? 'bg-red-50 border-red-200' : index === 4 ? 'bg-emerald-100 border-emerald-400 font-bold' : 'bg-white border-slate-200'}`}>
               <span className={index === 4 ? 'text-emerald-800' : 'text-slate-500'}>
                 Fila {row} {index < 4 ? '(No coincide)' : index === 4 ? '(¡Encontrado!)' : ''}
               </span>
             </div>
          </div>
        ))}
      </div>
    </div>
    <div className="grid content-center gap-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
      <h4 className="font-bold text-lg text-slate-700">Mecánica del Full Table Scan</h4>
      <ul className="grid gap-3 list-none p-0 text-slate-600">
        <li className="grid grid-cols-[24px_1fr] gap-2"><span className="text-blue-500 font-bold">1.</span> Inicia en el primer bloque de datos.</li>
        <li className="grid grid-cols-[24px_1fr] gap-2"><span className="text-blue-500 font-bold">2.</span> Lee la fila y evalúa la condición (ej. WHERE id = 5).</li>
        <li className="grid grid-cols-[24px_1fr] gap-2"><span className="text-blue-500 font-bold">3.</span> Descarta si no coincide y pasa a la siguiente.</li>
        <li className="grid grid-cols-[24px_1fr] gap-2"><span className="text-blue-500 font-bold">4.</span> Continúa hasta el final del archivo (EOF), incluso si ya encontró un resultado.</li>
      </ul>
    </div>
  </div>
);

const DiagramIndex: React.FC = () => (
  <div className="grid place-items-center w-full bg-slate-50 rounded-lg p-4 overflow-x-auto">
    <svg viewBox="0 0 800 400" className="w-full max-w-3xl h-auto">
      {/* Líneas de conexión */}
      <path d="M 400 80 L 200 180" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <path d="M 400 80 L 600 180" stroke="#94a3b8" strokeWidth="2" fill="none" />
      
      <path d="M 200 220 L 100 320" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <path d="M 200 220 L 300 320" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <path d="M 600 220 L 500 320" stroke="#94a3b8" strokeWidth="2" fill="none" />
      <path d="M 600 220 L 700 320" stroke="#10b981" strokeWidth="4" fill="none" /> {/* Ruta resaltada */}

      {/* Nodo Raíz */}
      <rect x="340" y="40" width="120" height="40" rx="8" fill="#1e293b" />
      <text x="400" y="65" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">[ 50 ]</text>

      {/* Nodos Intermedios */}
      <rect x="140" y="180" width="120" height="40" rx="8" fill="#475569" />
      <text x="200" y="205" fill="white" fontSize="14" textAnchor="middle">[ 25 ]</text>
      
      <rect x="540" y="180" width="120" height="40" rx="8" fill="#475569" stroke="#10b981" strokeWidth="3" />
      <text x="600" y="205" fill="white" fontSize="14" textAnchor="middle">[ 75 ]</text>

      {/* Nodos Hoja (Datos reales o punteros) */}
      {[100, 300, 500].map(cx => (
        <g key={cx}>
          <rect x={cx - 40} y="320" width="80" height="40" rx="4" fill="#cbd5e1" stroke="#94a3b8" />
          <text x={cx} y="345" fill="#334155" fontSize="12" textAnchor="middle">Datos</text>
        </g>
      ))}
      
      {/* Nodo Hoja Resaltado */}
      <rect x="660" y="320" width="80" height="40" rx="4" fill="#a7f3d0" stroke="#10b981" strokeWidth="2" />
      <text x="700" y="345" fill="#065f46" fontSize="12" fontWeight="bold" textAnchor="middle">Reg. 80</text>
      
      {/* Indicadores de búsqueda */}
      <circle cx="340" cy="40" r="12" fill="#ef4444" className="animate-bounce" />
      <text x="340" y="45" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">?</text>
    </svg>
    <div className="grid mt-4 text-center text-sm text-slate-500">
      Representación esquemática de un Árbol B+. El SGBD evalúa rangos en cada nivel para descender directamente al dato objetivo (Ej. buscar ID 80).
    </div>
  </div>
);

const DiagramComparison: React.FC = () => (
  <div className="grid w-full h-80 md:h-[400px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={COMPARISON_CHART_DATA}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="porcentaje" 
          label={{ value: '% de la Tabla Recuperada', position: 'insideBottom', offset: -10 }} 
          stroke="#64748b"
        />
        <YAxis 
          label={{ value: 'Costo I/O (Tiempo)', angle: -90, position: 'insideLeft', offset: 10 }} 
          stroke="#64748b"
        />
        <Tooltip 
          contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Legend verticalAlign="top" height={36} />
        <Line 
          type="monotone" 
          dataKey="secuencial" 
          name="Búsqueda Secuencial (Full Scan)" 
          stroke="#ef4444" 
          strokeWidth={3} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6 }} 
        />
        <Line 
          type="monotone" 
          dataKey="indice" 
          name="Búsqueda por Índice (Index Scan)" 
          stroke="#10b981" 
          strokeWidth={3} 
          dot={{ r: 4 }} 
          activeDot={{ r: 6 }} 
        />
      </LineChart>
    </ResponsiveContainer>
    <div className="grid mt-4 text-center text-sm bg-blue-50 text-blue-800 p-3 rounded-md border border-blue-200">
      <strong>Nota Arquitectónica:</strong> Observa cómo el uso de índices es óptimo cuando se consulta un porcentaje pequeño de la tabla. A medida que el volumen de filas requeridas aumenta, la sobrecarga de saltar entre el índice y la tabla base (I/O aleatorio) hace que el escaneo secuencial (I/O continuo) sea más eficiente.
    </div>
  </div>
);

// --- COMPONENTE PANEL (Orquestador de contenido por sección) ---

const Panel: React.FC<PanelProps> = ({ section }) => {
  const renderDiagram = () => {
    switch (section.diagramType) {
      case 'overview':
        return <DiagramOverview />;
      case 'sequential':
        return <DiagramSequential />;
      case 'index':
        return <DiagramIndex />;
      case 'comparison':
        return <DiagramComparison />;
      default:
        return null;
    }
  };

  return (
    <Card className="grid grid-rows-[auto_auto_1fr] h-full animate-fade-in">
      {/* DIAGRAM TITLE */}
      <div className="grid px-6 pt-6 pb-2 border-b border-slate-100">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 border-l-4 border-blue-500 pl-4">
          {section.title}
        </h2>
      </div>

      {/* DIAGRAM DESCRIPTION */}
      <div className="grid px-6 py-4 bg-slate-50/50">
        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
          {section.description}
        </p>
      </div>

      {/* DIAGRAM RENDER */}
      <div className="grid place-items-center p-6 bg-white overflow-hidden">
        <div className="grid w-full max-w-4xl place-items-center">
          {renderDiagram()}
        </div>
      </div>
    </Card>
  );
};

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(LESSON_DATA[0].id);

  const activeSection = LESSON_DATA.find(sec => sec.id === activeTab) || LESSON_DATA[0];

  return (
    <LessonLayout 
      title="Algoritmos de Acceso a Datos en SGBD" 
      sections={LESSON_DATA}
      activeSectionId={activeTab}
      onTabChange={setActiveTab}
    >
      <Panel section={activeSection} />
    </LessonLayout>
  );
}