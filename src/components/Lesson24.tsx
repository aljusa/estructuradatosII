import React, { useState } from 'react';
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

// --- Types & Interfaces ---

type DiagramType = 'transform' | 'complexity' | 'comparison' | 'pipeline' | 'performance';

interface SectionData {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  diagramTitle: string;
  diagramDescription: string;
  diagramType: DiagramType;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface DiagramRenderProps {
  type: DiagramType;
}

interface LessonLayoutProps {
  data: SectionData[];
}

// --- Data ---

const lessonData: SectionData[] = [
  {
    id: 'intro',
    tabLabel: '1. Introducción',
    title: 'Introducción a la optimización heurística',
    description: 'La optimización de consultas en un SGBD tiene como objetivo principal reducir el tiempo de ejecución y el consumo de recursos sin alterar el resultado final. Dado que evaluar todas las posibles formas de ejecutar una consulta puede ser computacionalmente costoso, se emplean heurísticas: reglas prácticas que guían la mejora del rendimiento de manera eficiente.',
    diagramTitle: 'Transformación de Consulta',
    diagramDescription: 'Una consulta inicial se transforma en una versión más eficiente mediante reglas simples, sin explorar todas las alternativas posibles.',
    diagramType: 'transform'
  },
  {
    id: 'nature',
    tabLabel: '2. Naturaleza',
    title: 'Naturaleza de las heurísticas en consultas',
    description: 'Las heurísticas son reglas basadas en la experiencia y en propiedades generales de las operaciones de bases de datos. No garantizan siempre la solución óptima, pero suelen producir planes de ejecución suficientemente eficientes en la mayoría de los casos, reduciendo el espacio de búsqueda del optimizador.',
    diagramTitle: 'Reducción del Espacio de Búsqueda',
    diagramDescription: 'Esquema comparativo entre la evaluación exhaustiva (múltiples alternativas) y la aplicación de reglas directas.',
    diagramType: 'complexity'
  },
  {
    id: 'difference',
    tabLabel: '3. Diferencias',
    title: 'Optimización Heurística vs. Basada en Costo',
    description: 'Existen dos enfoques principales de optimización: el heurístico y el basado en costo. El primero aplica reglas fijas para transformar la consulta, mientras que el segundo evalúa múltiples planes posibles y estima su costo antes de elegir el mejor. En la práctica, muchos SGBD combinan ambos enfoques.',
    diagramTitle: 'Convergencia de Enfoques',
    diagramDescription: 'Dos ramas principales de optimización que convergen en la generación de un plan de ejecución final.',
    diagramType: 'comparison'
  },
  {
    id: 'role',
    tabLabel: '4. Rol',
    title: 'Rol de las heurísticas en el proceso',
    description: 'Las heurísticas suelen aplicarse en etapas tempranas del proceso de optimización, simplificando la consulta antes de que se evalúen los costos. Esto permite reducir la complejidad del problema y mejorar la eficiencia global del optimizador.',
    diagramTitle: 'Pipeline de Optimización',
    diagramDescription: 'Flujo de procesamiento donde las reglas heurísticas simplifican la consulta antes de la evaluación de costos.',
    diagramType: 'pipeline'
  },
  {
    id: 'impact',
    tabLabel: '5. Impacto',
    title: 'Impacto en el rendimiento de consultas',
    description: 'El uso adecuado de heurísticas puede generar mejoras significativas en el rendimiento, especialmente en consultas complejas con múltiples operaciones. Comprender estas reglas permite diseñar consultas más eficientes y anticipar cómo el SGBD las transformará internamente.',
    diagramTitle: 'Comparativa de Tiempo de Ejecución',
    diagramDescription: 'Gráfico comparativo del tiempo estimado de ejecución antes y después de aplicar reglas heurísticas.',
    diagramType: 'performance'
  }
];

const performanceData = [
  { name: 'Sin Heurísticas', tiempo: 1500, color: '#94a3b8' },
  { name: 'Con Heurísticas', tiempo: 250, color: '#3b82f6' }
];

// --- Components ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl shadow-sm p-6 grid ${className}`}>
      {children}
    </div>
  );
};

const DiagramRender: React.FC<DiagramRenderProps> = ({ type }) => {
  switch (type) {
    case 'transform':
      return (
        <svg viewBox="0 0 500 200" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>
          <rect x="20" y="70" width="120" height="60" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          <text x="80" y="105" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="bold">Consulta Inicial</text>
          
          <line x1="140" y1="100" x2="200" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <rect x="200" y="70" width="100" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="250" y="95" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="bold">Reglas</text>
          <text x="250" y="115" textAnchor="middle" fill="#1d4ed8" fontSize="12">Heurísticas</text>
          
          <line x1="300" y1="100" x2="360" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          
          <rect x="360" y="70" width="120" height="60" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="420" y="105" textAnchor="middle" fill="#15803d" fontSize="14" fontWeight="bold">Consulta Óptima</text>
        </svg>
      );
    case 'complexity':
      return (
        <svg viewBox="0 0 500 250" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow-sm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#cbd5e1" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
          </defs>
          
          {/* Exhaustive Path (Complex) */}
          <path d="M 50 125 C 100 20, 150 20, 200 60 C 250 100, 300 20, 350 60 C 400 100, 420 80, 450 125" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-sm)" />
          <path d="M 50 125 C 120 220, 180 180, 250 200 C 320 220, 380 180, 450 125" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-sm)" />
          <circle cx="150" cy="50" r="4" fill="#cbd5e1" />
          <circle cx="280" cy="65" r="4" fill="#cbd5e1" />
          <circle cx="180" cy="190" r="4" fill="#cbd5e1" />
          <circle cx="330" cy="205" r="4" fill="#cbd5e1" />
          <text x="250" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12">Exploración Exhaustiva (Alto Costo)</text>

          {/* Heuristic Path (Direct) */}
          <line x1="50" y1="125" x2="440" y2="125" stroke="#3b82f6" strokeWidth="4" markerEnd="url(#arrow-blue)" />
          <text x="250" y="115" textAnchor="middle" fill="#1d4ed8" fontSize="14" fontWeight="bold">Camino Heurístico</text>
          
          <circle cx="50" cy="125" r="8" fill="#334155" />
          <text x="50" y="150" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Inicio</text>
          
          <circle cx="450" cy="125" r="8" fill="#22c55e" />
          <text x="450" y="150" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">Solución</text>
        </svg>
      );
    case 'comparison':
      return (
        <svg viewBox="0 0 500 250" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet">
           <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>
          
          {/* Start */}
          <rect x="20" y="100" width="80" height="50" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
          <text x="60" y="129" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">Consulta</text>

          {/* Branches */}
          <path d="M 100 125 C 130 125, 130 60, 160 60" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 100 125 C 130 125, 130 190, 160 190" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Heuristic Branch */}
          <rect x="160" y="35" width="140" height="50" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="230" y="55" textAnchor="middle" fill="#1d4ed8" fontSize="12" fontWeight="bold">Enfoque Heurístico</text>
          <text x="230" y="70" textAnchor="middle" fill="#1d4ed8" fontSize="10">(Reglas Fijas)</text>

          {/* Cost Branch */}
          <rect x="160" y="165" width="140" height="50" rx="8" fill="#fdf4ff" stroke="#d946ef" strokeWidth="2" />
          <text x="230" y="185" textAnchor="middle" fill="#a21caf" fontSize="12" fontWeight="bold">Enfoque por Costo</text>
          <text x="230" y="200" textAnchor="middle" fill="#a21caf" fontSize="10">(Estimación de Planes)</text>

          {/* Convergence */}
          <path d="M 300 60 C 330 60, 330 125, 360 125" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          <path d="M 300 190 C 330 190, 330 125, 360 125" fill="none" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* End */}
          <rect x="360" y="100" width="110" height="50" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="415" y="125" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">Plan de</text>
          <text x="415" y="140" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">Ejecución Final</text>
        </svg>
      );
    case 'pipeline':
      return (
        <svg viewBox="0 0 600 200" className="w-full h-full max-h-[300px]" preserveAspectRatio="xMidYMid meet">
           <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>
          
          {/* Node 1 */}
          <rect x="10" y="75" width="80" height="50" rx="25" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <text x="50" y="104" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">SQL</text>

          <line x1="90" y1="100" x2="130" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 2 (Heuristics Early Stage) */}
          <rect x="130" y="60" width="140" height="80" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <text x="200" y="85" textAnchor="middle" fill="#1d4ed8" fontSize="12" fontWeight="bold">Fase Temprana</text>
          <text x="200" y="105" textAnchor="middle" fill="#1d4ed8" fontSize="12">(Heurísticas)</text>
          <text x="200" y="125" textAnchor="middle" fill="#3b82f6" fontSize="10">Simplificación Árbol</text>

          <line x1="270" y1="100" x2="310" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 3 (Cost Evaluator) */}
          <rect x="310" y="60" width="140" height="80" rx="8" fill="#fdf4ff" stroke="#d946ef" strokeWidth="2" />
          <text x="380" y="85" textAnchor="middle" fill="#a21caf" fontSize="12" fontWeight="bold">Fase Profunda</text>
          <text x="380" y="105" textAnchor="middle" fill="#a21caf" fontSize="12">(Eval. Costos)</text>
          <text x="380" y="125" textAnchor="middle" fill="#d946ef" fontSize="10">Selección de Índices</text>

          <line x1="450" y1="100" x2="490" y2="100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 4 (Plan) */}
          <rect x="490" y="75" width="100" height="50" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
          <text x="540" y="104" textAnchor="middle" fill="#15803d" fontSize="12" fontWeight="bold">Plan Final</text>
        </svg>
      );
    case 'performance':
      return (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} unit="ms" />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="tiempo" radius={[6, 6, 0, 0]} maxBarSize={80}>
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    default:
      return null;
  }
};

const LessonLayout: React.FC<LessonLayoutProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSection = data[activeIndex];

  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Header & Navigation */}
      <header className="grid grid-rows-[auto_auto] gap-6 bg-slate-900 px-6 py-8 shadow-md">
        <div className="grid grid-cols-[auto_1fr] gap-4 place-items-start">
          <div className="grid place-items-center w-10 h-10 bg-blue-600 rounded-lg text-white font-bold text-xl">
            DB
          </div>
          <div className="grid gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Heurísticas para optimización de consultas</h1>
          </div>
        </div>
        
        {/* Tab Navigation (Strictly Grid based) */}
        <nav className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
          {data.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveIndex(index)}
              className={`grid place-items-center px-4 py-3 text-sm font-medium rounded-t-lg transition-colors border-b-4 
                ${activeIndex === index 
                  ? 'bg-slate-800 text-blue-400 border-blue-500' 
                  : 'bg-slate-800/50 text-slate-400 border-transparent hover:bg-slate-700 hover:text-slate-200'
                }`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full items-start">
        
        {/* Text Content Panel */}
        <Card className="grid-rows-[auto_auto_1fr] gap-6 animate-in fade-in duration-500">
          <div className="grid gap-2">
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">{activeSection.title}</h2>
          </div>
          <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
          <p className="text-slate-600 leading-relaxed text-lg">
            {activeSection.description}
          </p>
        </Card>

        {/* Diagram Render Panel */}
        <Card className="grid-rows-[auto_auto_1fr] gap-4 h-full min-h-[450px] animate-in slide-in-from-right-4 duration-500">
          <div className="grid gap-1 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-semibold text-slate-800">{activeSection.diagramTitle}</h3>
            <p className="text-sm text-slate-500">{activeSection.diagramDescription}</p>
          </div>
          
          <div className="grid place-items-center bg-slate-50 rounded-lg p-6 w-full h-full border border-slate-100">
             <DiagramRender type={activeSection.diagramType} />
          </div>
        </Card>

      </main>
    </div>
  );
};

// --- App Entry Point ---

export default function App() {
  return <LessonLayout data={lessonData} />;
}