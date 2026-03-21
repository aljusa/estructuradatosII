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

// --- Types & Interfaces ---

interface TabData {
  id: string;
  label: string;
  title: string;
  description: string;
  diagramType: 'flow' | 'path' | 'tree' | 'chart';
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  currentContent: TabData;
}

interface DiagramRenderProps {
  type: TabData['diagramType'];
}

// --- Data ---

const LESSON_DATA: TabData[] = [
  {
    id: 'tab-1',
    label: '1. Definición',
    title: 'Definición de heurísticas en optimización',
    description: 'Las heurísticas son reglas prácticas utilizadas por el SGBD para transformar una consulta en una forma más eficiente de ejecución. Estas reglas se aplican sin analizar exhaustivamente todas las alternativas posibles, lo que permite mejorar el rendimiento de manera rápida y con bajo costo computacional.',
    diagramType: 'flow',
  },
  {
    id: 'tab-2',
    label: '2. Carácter aproximado',
    title: 'Carácter aproximado de las heurísticas',
    description: 'A diferencia de los métodos basados en costo, las heurísticas no garantizan encontrar la solución óptima en todos los casos. Sin embargo, están diseñadas a partir de principios que suelen producir resultados muy eficientes en la mayoría de las situaciones reales.',
    diagramType: 'path',
  },
  {
    id: 'tab-3',
    label: '3. Transformación',
    title: 'Función en la transformación de consultas',
    description: 'Las heurísticas guían la reescritura de consultas, reorganizando operaciones como selecciones, proyecciones y joins para reducir el volumen de datos procesados en etapas posteriores. Estas transformaciones no cambian el resultado, pero sí la forma en que se obtiene.',
    diagramType: 'tree',
  },
  {
    id: 'tab-4',
    label: '4. Importancia',
    title: 'Importancia práctica',
    description: 'El uso de heurísticas permite que los SGBD respondan rápidamente incluso ante consultas complejas, evitando el costo de evaluar todas las estrategias posibles. Por ello, constituyen una herramienta fundamental en la optimización moderna de consultas.',
    diagramType: 'chart',
  },
];

const CHART_DATA = [
  { name: 'Consultas Simples', Exhaustivo: 45, Heurístico: 10 },
  { name: 'Consultas Medias', Exhaustivo: 250, Heurístico: 25 },
  { name: 'Consultas Complejas', Exhaustivo: 1200, Heurístico: 60 },
];

// --- Components ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden grid ${className}`}>
    {children}
  </div>
);

// Componente principal de representación de diagramas basado en el tipo
const DiagramRender: React.FC<DiagramRenderProps> = ({ type }) => {
  switch (type) {
    case 'flow':
      return (
        <div className="w-full h-80 bg-slate-50 grid place-items-center rounded-lg border border-slate-100 p-4">
          <svg viewBox="0 0 600 200" className="w-full h-full max-w-2xl">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
              </marker>
            </defs>
            {/* Nodos */}
            <rect x="20" y="70" width="140" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="90" y="100" textAnchor="middle" dominantBaseline="middle" fill="#1e3a8a" fontSize="14" fontWeight="bold">Consulta Original</text>
            
            <rect x="230" y="60" width="140" height="80" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            <text x="300" y="90" textAnchor="middle" dominantBaseline="middle" fill="#991b1b" fontSize="14" fontWeight="bold">Reglas</text>
            <text x="300" y="110" textAnchor="middle" dominantBaseline="middle" fill="#991b1b" fontSize="14" fontWeight="bold">Heurísticas</text>
            
            <rect x="440" y="70" width="140" height="60" rx="8" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
            <text x="510" y="100" textAnchor="middle" dominantBaseline="middle" fill="#14532d" fontSize="14" fontWeight="bold">Consulta Eficiente</text>

            {/* Conexiones */}
            <path d="M 160 100 L 220 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 370 100 L 430 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
          </svg>
        </div>
      );
      
    case 'path':
      return (
        <div className="w-full h-80 bg-slate-50 grid place-items-center rounded-lg border border-slate-100 p-4">
          <svg viewBox="0 0 600 300" className="w-full h-full max-w-2xl">
            {/* Leyenda */}
            <rect x="20" y="20" width="15" height="15" fill="#ef4444" />
            <text x="45" y="32" fontSize="12" fill="#333">Búsqueda Exhaustiva (Lenta)</text>
            <rect x="20" y="45" width="15" height="15" fill="#22c55e" />
            <text x="45" y="57" fontSize="12" fill="#333">Heurística (Rápida / Aproximada)</text>

            {/* Puntos de inicio y fin */}
            <circle cx="50" cy="150" r="10" fill="#3b82f6" />
            <text x="50" y="180" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e3a8a">Inicio</text>
            
            <circle cx="550" cy="150" r="12" fill="#eab308" />
            <text x="550" y="180" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#854d0e">Solución</text>

            {/* Camino Exhaustivo */}
            <path d="M 50 150 L 100 80 L 150 200 L 220 70 L 280 230 L 350 60 L 420 220 L 480 100 L 550 150" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,6" opacity="0.6"/>
            
            {/* Camino Heurístico */}
            <path d="M 50 150 Q 200 120 350 160 T 550 150" fill="none" stroke="#22c55e" strokeWidth="5" />
          </svg>
        </div>
      );

    case 'tree':
      return (
        <div className="w-full h-80 bg-slate-50 grid place-items-center rounded-lg border border-slate-100 p-4">
          <svg viewBox="0 0 600 300" className="w-full h-full max-w-2xl">
            {/* Títulos */}
            <text x="150" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">Antes (Sin optimizar)</text>
            <text x="450" y="30" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#16a34a">Después (Heurística)</text>

            {/* Árbol Izquierdo (Antes) */}
            <circle cx="150" cy="70" r="20" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
            <text x="150" y="75" textAnchor="middle" fontSize="12">π</text>
            
            <circle cx="150" cy="130" r="20" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
            <text x="150" y="135" textAnchor="middle" fontSize="12">σ</text>
            
            <circle cx="150" cy="190" r="20" fill="#f8fafc" stroke="#eab308" strokeWidth="2" />
            <text x="150" y="195" textAnchor="middle" fontSize="12">⨝</text>

            <rect x="80" y="250" width="40" height="30" rx="4" fill="#cbd5e1" />
            <text x="100" y="270" textAnchor="middle" fontSize="12">A</text>
            
            <rect x="180" y="250" width="40" height="30" rx="4" fill="#cbd5e1" />
            <text x="200" y="270" textAnchor="middle" fontSize="12">B</text>

            <line x1="150" y1="90" x2="150" y2="110" stroke="#94a3b8" strokeWidth="2" />
            <line x1="150" y1="150" x2="150" y2="170" stroke="#94a3b8" strokeWidth="2" />
            <line x1="140" y1="205" x2="110" y2="250" stroke="#94a3b8" strokeWidth="2" />
            <line x1="160" y1="205" x2="190" y2="250" stroke="#94a3b8" strokeWidth="2" />

            {/* Árbol Derecho (Después) - Push down selection */}
            <circle cx="450" cy="70" r="20" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
            <text x="450" y="75" textAnchor="middle" fontSize="12">π</text>
            
            <circle cx="450" cy="130" r="20" fill="#f8fafc" stroke="#eab308" strokeWidth="2" />
            <text x="450" y="135" textAnchor="middle" fontSize="12">⨝</text>
            
            <circle cx="400" cy="190" r="20" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
            <text x="400" y="195" textAnchor="middle" fontSize="12">σ</text>

            <rect x="380" y="250" width="40" height="30" rx="4" fill="#cbd5e1" />
            <text x="400" y="270" textAnchor="middle" fontSize="12">A</text>
            
            <rect x="480" y="250" width="40" height="30" rx="4" fill="#cbd5e1" />
            <text x="500" y="270" textAnchor="middle" fontSize="12">B</text>

            <line x1="450" y1="90" x2="450" y2="110" stroke="#94a3b8" strokeWidth="2" />
            <line x1="440" y1="145" x2="410" y2="175" stroke="#94a3b8" strokeWidth="2" />
            <line x1="460" y1="145" x2="490" y2="250" stroke="#94a3b8" strokeWidth="2" />
            <line x1="400" y1="210" x2="400" y2="250" stroke="#94a3b8" strokeWidth="2" />
          </svg>
        </div>
      );

    case 'chart':
      return (
        <div className="w-full h-80 bg-slate-50 rounded-lg border border-slate-100 p-4 grid">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={CHART_DATA}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} label={{ value: 'Tiempo (ms)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 12 }} />
              <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Legend wrapperStyle={{paddingTop: '20px'}} />
              <Bar dataKey="Exhaustivo" fill="#ef4444" radius={[4, 4, 0, 0]} name="Método Exhaustivo" />
              <Bar dataKey="Heurístico" fill="#22c55e" radius={[4, 4, 0, 0]} name="Método Heurístico" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
      
    default:
      return null;
  }
};

// Layout Principal utilizando estrictamente CSS Grid
const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTabId, onTabChange, currentContent }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-100 font-sans text-slate-800 p-4 md:p-8 gap-8">
      
      {/* Header Section (Title + Nav) */}
      <header className="grid gap-6 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-200 p-1.5 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              data-active={activeTabId === tab.id}
              className="block w-full text-center py-2.5 px-4 rounded-lg text-sm md:text-base font-semibold transition-all duration-200 ease-in-out text-slate-600 hover:bg-slate-300 data-[active=true]:bg-white data-[active=true]:text-blue-700 data-[active=true]:shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-200"
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="grid max-w-6xl mx-auto w-full items-start">
        <Card className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
          
          {/* Columna de Texto */}
          <section className="lg:col-span-5 grid gap-4 content-start">
            <h2 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4">
              {currentContent.title}
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {currentContent.description}
            </p>
          </section>

          {/* Columna de Diagrama */}
          <section className="lg:col-span-7 grid gap-4">
            <div className="grid bg-white border border-slate-200 rounded-xl p-2 shadow-inner">
               <DiagramRender type={currentContent.diagramType} />
            </div>
           
          </section>

        </Card>
      </main>

    </div>
  );
};

// Componente App Entry Point
export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(LESSON_DATA[0].id);

  const currentContent = LESSON_DATA.find(tab => tab.id === activeTabId) || LESSON_DATA[0];

  return (
    <LessonLayout
      title="Optimización de Consultas en SGBD"
      tabs={LESSON_DATA}
      activeTabId={activeTabId}
      onTabChange={setActiveTabId}
      currentContent={currentContent}
    />
  );
}