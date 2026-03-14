import React, { useState } from 'react';

// --- DEFINICIONES DE TIPOS ---

interface LessonItem {
  id: string;
  title: string;
  description: string;
  diagramTitle: string;
  diagramDescription: string;
}

interface LessonLayoutProps {
  headerTitle: string;
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface DiagramRenderProps {
  activeIndex: number;
}

// --- DATOS DE LA LECCIÓN ---

const lessonData: LessonItem[] = [
  {
    id: 'q1',
    title: 'Introducción a los métodos de acceso',
    description: 'Los métodos de acceso a los datos describen las estrategias que utiliza un sistema gestor de bases de datos para localizar y recuperar información almacenada. Estos métodos determinan cuántos registros deben examinarse y qué procedimiento sigue el sistema para encontrar los datos solicitados. La elección del método influye directamente en el rendimiento de las consultas, especialmente cuando las tablas contienen grandes volúmenes de información.',
    diagramTitle: 'Estrategias de Acceso a Datos',
    diagramDescription: 'Un esquema conceptual donde una consulta se dirige hacia una base de datos a través de tres rutas distintas posibles.'
  },
  {
    id: 'q2',
    title: 'Acceso secuencial',
    description: 'El acceso secuencial es un método en el que el sistema revisa los registros uno por uno en el orden en que están almacenados hasta encontrar el dato solicitado. Este enfoque es sencillo y no requiere estructuras adicionales, pero puede resultar ineficiente cuando la tabla es muy grande, ya que el sistema puede necesitar examinar muchos registros antes de localizar el resultado.',
    diagramTitle: 'Búsqueda Secuencial',
    diagramDescription: 'Recorrido uno a uno de los registros hasta encontrar el valor deseado (resaltado).'
  },
  {
    id: 'q3',
    title: 'Acceso directo o indexado',
    description: 'El acceso directo o indexado utiliza índices para localizar rápidamente la posición de un registro dentro de una tabla. En lugar de recorrer todos los registros, el sistema consulta primero el índice, que actúa como una estructura de referencia que indica dónde se encuentra el dato solicitado. Este método es significativamente más eficiente en consultas frecuentes.',
    diagramTitle: 'Búsqueda mediante Índice',
    diagramDescription: 'La consulta revisa un índice estructurado para saltar directamente a la posición exacta del registro.'
  },
  {
    id: 'q4',
    title: 'Acceso mediante hashing',
    description: 'El acceso mediante hashing utiliza una función matemática llamada función hash para calcular directamente la ubicación donde debería almacenarse o encontrarse un registro. Esta función toma una clave como entrada y genera un valor que indica la posición en la estructura de almacenamiento. Permite acceder a los datos casi de forma inmediata.',
    diagramTitle: 'Función Hash',
    diagramDescription: 'Una clave pasa por un proceso matemático que devuelve la ubicación exacta de memoria.'
  }
];

// --- COMPONENTES DE DIAGRAMA (SVG) ---

const IntroDiagram: React.FC = () => (
  <svg viewBox="0 0 800 400" className="w-full h-full max-h-80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
      </marker>
    </defs>
    
    {/* Consulta */}
    <rect x="50" y="160" width="140" height="80" rx="10" fill="#3B82F6" />
    <text x="120" y="205" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Consulta</text>

    {/* Caminos y flechas */}
    <path d="M 190 200 C 250 200, 250 80, 320 80" fill="none" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    <path d="M 190 200 L 320 200" fill="none" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    <path d="M 190 200 C 250 200, 250 320, 320 320" fill="none" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)"/>

    {/* Nodos de Métodos */}
    <rect x="330" y="50" width="200" height="60" rx="8" fill="#10B981" />
    <text x="430" y="85" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">Acceso Secuencial</text>

    <rect x="330" y="170" width="200" height="60" rx="8" fill="#F59E0B" />
    <text x="430" y="205" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">Acceso Indexado</text>

    <rect x="330" y="290" width="200" height="60" rx="8" fill="#8B5CF6" />
    <text x="430" y="325" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">Acceso por Hashing</text>

    {/* Flechas hacia DB */}
    <path d="M 530 80 C 600 80, 600 200, 640 200" fill="none" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    <path d="M 530 200 L 640 200" fill="none" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    <path d="M 530 320 C 600 320, 600 200, 640 200" fill="none" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)"/>

    {/* Base de Datos */}
    <path d="M 650 160 C 650 140, 750 140, 750 160 L 750 240 C 750 260, 650 260, 650 240 Z" fill="#475569" />
    <ellipse cx="700" cy="160" rx="50" ry="15" fill="#64748B" />
    <text x="700" y="210" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Base de</text>
    <text x="700" y="230" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">Datos</text>
  </svg>
);

const SequentialDiagram: React.FC = () => (
  <svg viewBox="0 0 800 250" className="w-full h-full max-h-64" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#EF4444" />
      </marker>
    </defs>
    
    {[1, 2, 3, 4, 5, 6].map((num, i) => (
      <g key={num} transform={`translate(${80 + i * 110}, 100)`}>
        <rect x="0" y="0" width="80" height="80" rx="8" fill={num === 4 ? "#10B981" : "#E2E8F0"} stroke={num === 4 ? "#059669" : "#CBD5E1"} strokeWidth="3" />
        <text x="40" y="45" fill={num === 4 ? "white" : "#475569"} fontSize="24" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
          {num}
        </text>
        {num === 4 && (
          <text x="40" y="-15" fill="#10B981" fontSize="14" fontWeight="bold" textAnchor="middle">¡Encontrado!</text>
        )}
      </g>
    ))}

    {/* Camino de búsqueda */}
    <path d="M 120 70 C 120 50, 190 50, 190 85" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
    <path d="M 230 70 C 230 50, 300 50, 300 85" fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
    <path d="M 340 70 C 340 50, 410 50, 410 85" fill="none" stroke="#EF4444" strokeWidth="3" markerEnd="url(#arrowhead)"/>
    
    <text x="80" y="15" fill="#EF4444" fontSize="16" fontWeight="bold">Motor de búsqueda iterando...</text>
  </svg>
);

const IndexedDiagram: React.FC = () => (
  <svg viewBox="0 0 800 350" className="w-full h-full max-h-80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
      </marker>
    </defs>

    {/* Consulta */}
    <rect x="50" y="150" width="120" height="60" rx="8" fill="#3B82F6" />
    <text x="110" y="185" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">Buscar ID: 89</text>

    {/* Índice */}
    <rect x="250" y="50" width="160" height="260" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
    <rect x="250" y="50" width="160" height="40" rx="8" fill="#F59E0B" />
    <text x="330" y="75" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">ÍNDICE</text>
    
    <g transform="translate(250, 90)">
      <rect x="0" y="0" width="160" height="30" fill="#E2E8F0" />
      <text x="80" y="20" fill="#475569" fontSize="14" textAnchor="middle">ID: 12 → Pos 1</text>
      
      <rect x="0" y="30" width="160" height="30" fill="#F1F5F9" />
      <text x="80" y="50" fill="#475569" fontSize="14" textAnchor="middle">ID: 45 → Pos 2</text>
      
      <rect x="0" y="60" width="160" height="30" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <text x="80" y="80" fill="#B45309" fontSize="14" fontWeight="bold" textAnchor="middle">ID: 89 → Pos 5</text>
      
      <rect x="0" y="90" width="160" height="30" fill="#E2E8F0" />
      <text x="80" y="110" fill="#475569" fontSize="14" textAnchor="middle">ID: 102 → Pos 3</text>
    </g>

    {/* Base de Datos (Tabla) */}
    <rect x="550" y="50" width="200" height="260" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
    <rect x="550" y="50" width="200" height="40" rx="8" fill="#475569" />
    <text x="650" y="75" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">TABLA PRINCIPAL</text>

    <g transform="translate(550, 90)">
      <rect x="0" y="0" width="200" height="30" fill="#F1F5F9" />
      <text x="100" y="20" fill="#94A3B8" fontSize="14" textAnchor="middle">[1] Datos...</text>
      <rect x="0" y="30" width="200" height="30" fill="#F1F5F9" />
      <text x="100" y="50" fill="#94A3B8" fontSize="14" textAnchor="middle">[2] Datos...</text>
      <rect x="0" y="60" width="200" height="30" fill="#F1F5F9" />
      <text x="100" y="80" fill="#94A3B8" fontSize="14" textAnchor="middle">[3] Datos...</text>
      <rect x="0" y="90" width="200" height="30" fill="#F1F5F9" />
      <text x="100" y="110" fill="#94A3B8" fontSize="14" textAnchor="middle">[4] Datos...</text>
      
      <rect x="0" y="120" width="200" height="30" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" />
      <text x="100" y="140" fill="#047857" fontSize="14" fontWeight="bold" textAnchor="middle">[5] Registro ID: 89</text>
    </g>

    {/* Flechas */}
    <path d="M 170 180 L 235 180" fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrowhead-blue)"/>
    <path d="M 410 165 C 480 165, 480 225, 535 225" fill="none" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#arrowhead-blue)"/>
  </svg>
);

const HashDiagram: React.FC = () => (
  <svg viewBox="0 0 800 300" className="w-full h-full max-h-80" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#8B5CF6" />
      </marker>
    </defs>

    {/* Clave de búsqueda */}
    <rect x="50" y="120" width="140" height="60" rx="8" fill="#3B82F6" />
    <text x="120" y="150" fill="white" fontSize="14" textAnchor="middle">Clave:</text>
    <text x="120" y="170" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">"Usuario_A"</text>

    {/* Función Hash */}
    <rect x="280" y="100" width="180" height="100" rx="15" fill="#8B5CF6" />
    <text x="370" y="145" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle">Función Hash</text>
    <text x="370" y="175" fill="#DDD6FE" fontSize="16" fontStyle="italic" textAnchor="middle">f(x) = x mod N</text>

    {/* Estructura de almacenamiento (Array) */}
    <g transform="translate(560, 40)">
      <rect x="0" y="0" width="180" height="40" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <text x="90" y="25" fill="#94A3B8" fontSize="14" textAnchor="middle">0: [ Vacío ]</text>

      <rect x="0" y="40" width="180" height="40" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <text x="90" y="65" fill="#94A3B8" fontSize="14" textAnchor="middle">1: [ Vacío ]</text>

      <rect x="0" y="80" width="180" height="40" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <text x="90" y="105" fill="#94A3B8" fontSize="14" textAnchor="middle">2: [ Vacío ]</text>

      <rect x="0" y="120" width="180" height="40" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="3" />
      <text x="90" y="145" fill="#5B21B6" fontSize="16" fontWeight="bold" textAnchor="middle">3: "Usuario_A"</text>

      <rect x="0" y="160" width="180" height="40" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <text x="90" y="185" fill="#94A3B8" fontSize="14" textAnchor="middle">4: [ Vacío ]</text>
    </g>

    {/* Flechas */}
    <path d="M 190 150 L 265 150" fill="none" stroke="#3B82F6" strokeWidth="3" markerEnd="url(#arrowhead-purple)"/>
    <path d="M 460 150 L 545 150" fill="none" stroke="#8B5CF6" strokeWidth="3" markerEnd="url(#arrowhead-purple)"/>
    
    <text x="500" y="140" fill="#8B5CF6" fontSize="16" fontWeight="bold" textAnchor="middle">Pos = 3</text>
  </svg>
);


// --- COMPONENTES PRINCIPALES DE INTERFAZ ---

const DiagramRender: React.FC<DiagramRenderProps> = ({ activeIndex }) => {
  // Renderiza el componente visual basado en el índice de la pestaña activa
  switch (activeIndex) {
    case 0: return <IntroDiagram />;
    case 1: return <SequentialDiagram />;
    case 2: return <IndexedDiagram />;
    case 3: return <HashDiagram />;
    default: return <IntroDiagram />;
  }
};

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  // Utilizando CSS Grid para organizar internamente el card si es necesario
  return (
    <div className={`grid bg-white rounded-xl shadow-md border border-slate-200 p-6 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

const LessonLayout: React.FC<LessonLayoutProps> = ({ headerTitle, tabs, activeTab, onTabChange, children }) => {
  return (
    // Layout Principal: CSS Grid en toda la estructura
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Header y Navegación (Tabs) */}
      <header className="grid grid-rows-[auto_auto] gap-6 px-8 pt-8 bg-slate-900 shadow-lg border-b-4 border-blue-600">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          {headerTitle}
        </h1>
        
        {/* Sistema de Pestañas usando CSS Grid para distribución fluida */}
        <nav className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto pb-0">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => onTabChange(idx)}
              className={`grid place-items-center px-6 py-3 rounded-t-lg font-semibold transition-colors duration-200 border-b-0
                ${activeTab === idx 
                  ? 'bg-slate-50 text-blue-700 border border-slate-200 border-b-transparent relative top-[1px] z-10' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Contenedor Principal */}
      <main className="grid p-8 place-items-start">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          {children}
        </div>
      </main>

    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentData = lessonData[activeTab];

  return (
    <LessonLayout
      headerTitle="Métodos de Acceso a los Datos"
      tabs={lessonData.map(item => item.title)}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Panel Izquierdo: Contenido Teórico */}
      <div className="grid lg:col-span-4 content-start">
        <Card className="grid grid-rows-[auto_auto_1fr] gap-4 min-h-[400px]">
          <h2 className="text-2xl font-bold text-slate-800 leading-tight">
            {currentData.title}
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            {currentData.description}
          </p>
        </Card>
      </div>

      {/* Panel Derecho: Diagrama y Visualización */}
      <div className="grid lg:col-span-8 content-start h-full">
        <Card className="grid grid-rows-[auto_auto_1fr] gap-4 min-h-[500px]">
          <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-2">
            {currentData.diagramTitle}
          </h3>
          <p className="text-slate-500 text-sm">
            {currentData.diagramDescription}
          </p>
          
          <div className="grid place-items-center bg-slate-50 rounded-lg p-6 border border-slate-200 w-full h-full min-h-[300px]">
             {/* Componente dinámico que renderiza el SVG correspondiente */}
             <DiagramRender activeIndex={activeTab} />
          </div>
        </Card>
      </div>
      
    </LessonLayout>
  );
}