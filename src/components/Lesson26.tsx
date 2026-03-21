import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Settings, 
  GitBranch, 
  Zap, 
  ArrowRight, 
  Search, 
  FastForward, 
  
  CheckCircle2,
  
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Legend
} from 'recharts';

// --- Interfaces & Types ---

interface SectionData {
  id: string;
  title: string;
  navLabel: string;
  icon: React.ReactNode;
  description: string;
  content: string[];
  diagramTitle: string;
  diagramDescription: string;
}

// --- Mock Data for the Importance Chart ---
const performanceData = [
  { name: 'Enfoque Exhaustivo', tiempo: 100, calidad: 100, color: '#ef4444' },
  { name: 'Enfoque Heurístico', tiempo: 15, calidad: 92, color: '#22c55e' },
];

// --- Components ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

const DiagramRender: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  switch (sectionId) {
    case 'definicion':
      return (
        <div className="h-full w-full grid grid-cols-5 items-center gap-4 p-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <div className="col-span-1 flex flex-col items-center gap-2">
            <div className="p-4 bg-blue-100 rounded-full text-blue-600"><Search size={32} /></div>
            <span className="text-xs font-bold text-slate-500 uppercase">Consulta SQL</span>
          </div>
          <div className="col-span-1 flex justify-center"><ArrowRight className="text-slate-300" /></div>
          <div className="col-span-1 bg-white p-4 rounded-lg shadow-md border border-slate-200 flex flex-col gap-3">
            <div className="h-2 w-full bg-blue-500 rounded animate-pulse" />
            <div className="h-2 w-3/4 bg-slate-200 rounded" />
            <div className="h-2 w-full bg-blue-400 rounded animate-pulse" />
            <div className="text-[10px] text-center font-mono font-bold text-blue-700">MOTOR HEURÍSTICO</div>
          </div>
          <div className="col-span-1 flex justify-center"><ArrowRight className="text-slate-300" /></div>
          <div className="col-span-1 flex flex-col items-center gap-2">
            <div className="p-4 bg-green-100 rounded-full text-green-600"><Zap size={32} /></div>
            <span className="text-xs font-bold text-slate-500 uppercase">Plan Optimizado</span>
          </div>
        </div>
      );

    case 'caracter':
      return (
        <div className="h-full w-full grid grid-rows-2 gap-4 p-4">
          <div className="grid grid-cols-12 items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div className="col-span-3 text-sm font-bold text-red-600">Búsqueda Exhaustiva</div>
            <div className="col-span-7 h-2 bg-slate-100 rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full w-full bg-red-400 opacity-20" />
              <div className="absolute top-0 left-0 h-full w-full border-b border-red-500 border-dashed" />
            </div>
            <div className="col-span-2 text-[10px] text-center text-slate-400 italic">Analiza todo (Lento)</div>
          </div>
          <div className="grid grid-cols-12 items-center bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div className="col-span-3 text-sm font-bold text-green-600">Búsqueda Heurística</div>
            <div className="col-span-7 h-2 bg-slate-100 rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full w-4/5 bg-green-500 rounded-full" />
            </div>
            <div className="col-span-2 text-[10px] text-center text-slate-400 italic">"Suficientemente bueno"</div>
          </div>
        </div>
      );

    case 'transformacion':
      return (
        <div className="h-full w-full grid grid-cols-2 gap-8 p-6">
          <div className="flex flex-col items-center border-r border-slate-200 pr-4">
            <span className="text-[10px] font-bold text-slate-400 mb-4 uppercase italic">Árbol Original</span>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-8 bg-slate-100 border rounded flex items-center justify-center text-xs font-mono">PROY</div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="w-16 h-8 bg-slate-100 border rounded flex items-center justify-center text-xs font-mono">JOIN</div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="w-16 h-8 bg-blue-100 border-blue-300 border rounded flex items-center justify-center text-xs font-mono font-bold">SEL</div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-blue-500 mb-4 uppercase italic">Árbol Transformado</span>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-8 bg-slate-100 border rounded flex items-center justify-center text-xs font-mono">PROY</div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="w-16 h-8 bg-blue-100 border-blue-300 border rounded flex items-center justify-center text-xs font-mono font-bold">SEL</div>
              <div className="w-px h-4 bg-slate-300" />
              <div className="w-16 h-8 bg-slate-100 border rounded flex items-center justify-center text-xs font-mono">JOIN</div>
            </div>
          </div>
          <div className="col-span-2 text-center text-[10px] text-slate-500 mt-2 bg-blue-50 p-2 rounded">
            Las heurísticas "empujan" las selecciones hacia abajo para procesar menos datos.
          </div>
        </div>
      );

    case 'importancia':
      return (
        <div className="h-full w-full p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="tiempo" name="Tiempo de Optimización (%)" fill="#8884d8" radius={[0, 4, 4, 0]}>
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
              <Bar dataKey="calidad" name="Calidad del Plan (%)" fill="#94a3b8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );

    default:
      return null;
  }
};

const LessonLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('definicion');

  const sections: SectionData[] = [
    {
      id: 'definicion',
      navLabel: 'Definición',
      icon: <BookOpen size={18} />,
      title: '1. Definición de heurísticas en optimización de consultas',
      description: 'Reglas prácticas aplicadas por el SGBD para mejorar el rendimiento de forma rápida.',
      content: [
        "Las heurísticas son reglas prácticas utilizadas por el SGBD para transformar una consulta en una forma más eficiente de ejecución.",
        "Estas reglas se aplican sin analizar exhaustivamente todas las alternativas posibles.",
        "Permiten mejorar el rendimiento de manera rápida y con bajo costo computacional."
      ],
      diagramTitle: "Flujo de Optimización Heurística",
      diagramDescription: "Una consulta original es procesada por un conjunto de reglas lógicas para producir una versión simplificada sin el coste de evaluar cada combinación física."
    },
    {
      id: 'caracter',
      navLabel: 'Carácter',
      icon: <CheckCircle2 size={18} />,
      title: '2. Carácter aproximado de las heurísticas',
      description: 'No garantizan el óptimo absoluto, pero sí una solución altamente eficiente.',
      content: [
        "A diferencia de los métodos basados en costo, las heurísticas no garantizan encontrar la solución óptima en todos los casos.",
        "Sin embargo, están diseñadas a partir de principios que suelen producir resultados muy eficientes en la mayoría de las situaciones reales.",
        "El enfoque es encontrar una solución 'suficientemente buena' en un tiempo despreciable."
      ],
      diagramTitle: "Comparativa de Caminos",
      diagramDescription: "El enfoque heurístico prioriza la velocidad de decisión, llegando a una solución válida mucho antes que el método exhaustivo."
    },
    {
      id: 'transformacion',
      navLabel: 'Transformación',
      icon: <GitBranch size={18} />,
      title: '3. Función en la transformación de consultas',
      description: 'Reorganización lógica de operaciones para minimizar el volumen de datos.',
      content: [
        "Las heurísticas guían la reescritura de consultas, reorganizando operaciones como selecciones, proyecciones y joins.",
        "El objetivo es reducir el volumen de datos procesados en etapas posteriores.",
        "Estas transformaciones no cambian el resultado (semántica), pero sí la forma y velocidad en que se obtiene."
      ],
      diagramTitle: "Optimización del Árbol de Consulta",
      diagramDescription: "Reordenamiento de nodos (ej. push-down selection) para filtrar registros lo más temprano posible en la ejecución."
    },
    {
      id: 'importancia',
      navLabel: 'Importancia',
      icon: <FastForward size={18} />,
      title: '4. Importancia práctica',
      description: 'Herramienta fundamental para la respuesta rápida en SGBD modernos.',
      content: [
        "Permite que los SGBD respondan rápidamente incluso ante consultas complejas.",
        "Evita el costo prohibitivo de evaluar todas las estrategias posibles en tiempo real.",
        "Constituyen una herramienta fundamental en la optimización moderna de consultas, a menudo combinándose con modelos de coste."
      ],
      diagramTitle: "Métrica de Eficiencia: Tiempo vs. Calidad",
      diagramDescription: "Gráfico comparativo que ilustra cómo el uso de heurísticas reduce drásticamente el tiempo de optimización sacrificando mínimamente la calidad del plan."
    }
  ];

  const activeSection = useMemo(() => 
    sections.find(s => s.id === activeTab) || sections[0]
  , [activeTab]);

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Header Area */}
      <header className="grid grid-cols-[1fr_auto] items-center px-8 py-4 bg-white border-b border-slate-200 z-10 shadow-sm">
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
              ¿Qué son las heurísticas?
            </h1>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="grid grid-flow-col gap-1 bg-slate-100 p-1 rounded-xl">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`
                grid grid-cols-[auto_1fr] items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-semibold
                ${activeTab === section.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'}
              `}
            >
              {section.icon}
              {section.navLabel}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area - Layout Principal con CSS Grid */}
      <main className="grid grid-cols-12 gap-6 p-8 overflow-y-auto">
        
        {/* Left Column: Text Content */}
        <section className="col-span-12 lg:col-span-5 grid grid-rows-[auto_1fr] gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-slate-800 leading-tight">
              {activeSection.title}
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed italic">
              "{activeSection.description}"
            </p>
          </div>

          <div className="grid gap-4">
            {activeSection.content.map((paragraph, idx) => (
              <Card key={idx} className="p-5 border-l-4 border-l-blue-500 bg-white hover:shadow-md transition-shadow">
                <p className="text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              </Card>
            ))}
            
        
          </div>
        </section>

        {/* Right Column: Visual Component */}
        <section className="col-span-12 lg:col-span-7 grid grid-rows-[auto_1fr] gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold text-slate-700">{activeSection.diagramTitle}</h3>
          </div>
          
          <Card className="grid grid-rows-[1fr_auto] h-[500px] bg-slate-50">
            <div className="p-6">
              <DiagramRender sectionId={activeSection.id} />
            </div>
            
        
          </Card>

  
        </section>

      </main>

    </div>
  );
};

export default function App() {
  return <LessonLayout />;
}