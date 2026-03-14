import React, { useState } from 'react';

// --- DEFINICIÓN DE TIPOS ---

interface Quark {
  id: string;
  title: string;
  explanation: string;
  diagramTitle: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface DiagramProps {
  activeTab: number;
}

// --- DATOS DE LA LECCIÓN (QUARKS) ---

const lessonData: Quark[] = [
  {
    id: 'q1',
    title: 'Introducción al índice',
    explanation: 'En las bases de datos, no todos los índices determinan cómo se almacenan físicamente los datos. Los índices no clusterizados funcionan como estructuras auxiliares separadas que contienen referencias a los registros de la tabla. En lugar de organizar los datos directamente, este tipo de índice actúa como un mapa de acceso que permite localizar rápidamente la posición de las filas dentro de la tabla.',
    diagramTitle: 'Estructura Auxiliar Independiente'
  },
  {
    id: 'q2',
    title: 'Definición formal',
    explanation: 'Un índice no clusterizado (Non-Clustered Index) es una estructura de índice que se almacena separadamente de los datos de la tabla y contiene valores de una columna junto con referencias a las filas donde se encuentran los registros reales. Cuando se realiza una consulta, el sistema consulta primero el índice y luego utiliza esas referencias para acceder a los datos.',
    diagramTitle: 'Flujo de Acceso a Datos'
  },
  {
    id: 'q3',
    title: 'Múltiples índices',
    explanation: 'A diferencia del índice clusterizado, una tabla puede tener varios índices no clusterizados. Esto permite optimizar diferentes tipos de consultas, ya que cada índice puede estar construido sobre columnas distintas según las necesidades de búsqueda más frecuentes.',
    diagramTitle: 'Múltiples Índices por Tabla'
  },
  {
    id: 'q4',
    title: 'Independencia física',
    explanation: 'Los índices no clusterizados no modifican el orden físico de los registros en la tabla. Los datos permanecen almacenados según la organización original de la tabla o según el índice clusterizado existente. El índice no clusterizado simplemente mantiene punteros o referencias que indican dónde se encuentran los registros dentro de la estructura de almacenamiento.',
    diagramTitle: 'Independencia del Orden Físico'
  }
];

// --- COMPONENTES UI CORE ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  // Uso de CSS Grid interno para la tarjeta
  <div className={`bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden grid ${className}`}>
    {children}
  </div>
);

// --- COMPONENTES DE DIAGRAMAS (SVG BASADOS EN GRID VISUAL) ---
// Se utilizan SVGs responsivos para garantizar que las flechas y relaciones apunten correctamente independientemente del tamaño de la pantalla.

const DiagramIntro = () => (
  <svg viewBox="0 0 500 300" className="w-full h-auto drop-shadow-sm font-sans">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
      </marker>
    </defs>
    
    {/* Tabla de Índice */}
    <g transform="translate(20, 50)">
      <rect x="0" y="0" width="160" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="0" y="0" width="160" height="30" rx="6" fill="#3b82f6" />
      <text x="80" y="20" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">Índice No Clusterizado</text>
      
      <line x1="0" y1="60" x2="160" y2="60" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="0" y1="90" x2="160" y2="90" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="0" y1="120" x2="160" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      
      <text x="10" y="50" fontSize="12" fill="#334155">Ana</text>
      <text x="10" y="80" fontSize="12" fill="#334155">Beto</text>
      <text x="10" y="110" fontSize="12" fill="#334155">Carlos</text>
      <text x="10" y="140" fontSize="12" fill="#334155">Diana</text>

      {/* Punteros visuales origen */}
      <circle cx="140" cy="46" r="4" fill="#3b82f6" />
      <circle cx="140" cy="76" r="4" fill="#3b82f6" />
      <circle cx="140" cy="106" r="4" fill="#3b82f6" />
      <circle cx="140" cy="136" r="4" fill="#3b82f6" />
    </g>

    {/* Tabla Física */}
    <g transform="translate(300, 50)">
      <rect x="0" y="0" width="180" height="150" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <rect x="0" y="0" width="180" height="30" rx="6" fill="#10b981" />
      <text x="90" y="20" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">Datos de Tabla</text>
      
      <line x1="0" y1="60" x2="180" y2="60" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="0" y1="90" x2="180" y2="90" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="0" y1="120" x2="180" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      
      <text x="10" y="50" fontSize="12" fill="#334155">1 | Ana | Ventas</text>
      <text x="10" y="80" fontSize="12" fill="#334155">2 | Beto | IT</text>
      <text x="10" y="110" fontSize="12" fill="#334155">3 | Carlos | RH</text>
      <text x="10" y="140" fontSize="12" fill="#334155">4 | Diana | Ventas</text>
    </g>

    {/* Conexiones */}
    <path d="M 160 96 C 230 96, 230 96, 300 96" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 160 126 C 230 126, 230 126, 300 126" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 160 156 C 230 156, 230 156, 300 156" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 160 186 C 230 186, 230 186, 300 186" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
  </svg>
);

const DiagramDefinition = () => (
  <svg viewBox="0 0 500 300" className="w-full h-auto drop-shadow-sm font-sans">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
      </marker>
    </defs>
    
    <rect x="50" y="10" width="400" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
    <text x="250" y="35" fill="#1e3a8a" fontSize="16" fontWeight="bold" textAnchor="middle">ÍNDICE NO CLUSTERIZADO</text>
    
    <g transform="translate(50, 80)">
      <rect x="0" y="0" width="140" height="180" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      <rect x="0" y="0" width="140" height="25" fill="#f1f5f9" />
      <text x="70" y="18" fill="#475569" fontSize="12" fontWeight="bold" textAnchor="middle">Valores Indexados</text>
      
      <text x="10" y="45" fontSize="12" fill="#000">1001 (Ref: 0x4A)</text>
      <text x="10" y="75" fontSize="12" fill="#000">1002 (Ref: 0x1B)</text>
      <text x="10" y="105" fontSize="12" fill="#000">1003 (Ref: 0x9C)</text>
      <text x="10" y="135" fontSize="12" fill="#000">1004 (Ref: 0x2F)</text>
      <text x="10" y="165" fontSize="12" fill="#000">1005 (Ref: 0x8D)</text>
    </g>

    <g transform="translate(310, 80)">
      <rect x="0" y="0" width="140" height="180" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      <rect x="0" y="0" width="140" height="25" fill="#f1f5f9" />
      <text x="70" y="18" fill="#475569" fontSize="12" fontWeight="bold" textAnchor="middle">Páginas de Datos</text>
      
      <rect x="10" y="35" width="120" height="20" fill="#dcfce7" />
      <text x="70" y="50" fontSize="10" textAnchor="middle" fill="#065f46">Fila [0x1B]</text>
      
      <rect x="10" y="65" width="120" height="20" fill="#dcfce7" />
      <text x="70" y="80" fontSize="10" textAnchor="middle" fill="#065f46">Fila [0x2F]</text>

      <rect x="10" y="95" width="120" height="20" fill="#dcfce7" />
      <text x="70" y="110" fontSize="10" textAnchor="middle" fill="#065f46">Fila [0x4A]</text>

      <rect x="10" y="125" width="120" height="20" fill="#dcfce7" />
      <text x="70" y="140" fontSize="10" textAnchor="middle" fill="#065f46">Fila [0x8D]</text>

      <rect x="10" y="155" width="120" height="20" fill="#dcfce7" />
      <text x="70" y="170" fontSize="10" textAnchor="middle" fill="#065f46">Fila [0x9C]</text>
    </g>

    {/* Flechas cruzadas demostrando referencias */}
    <path d="M 190 120 C 250 120, 250 170, 305 170" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 190 150 C 250 150, 250 50, 305 50" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 190 180 C 250 180, 250 200, 305 200" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 190 210 C 250 210, 250 110, 305 110" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 190 240 C 250 240, 250 140, 305 140" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
  </svg>
);

const DiagramMultiple = () => (
  <svg viewBox="0 0 500 300" className="w-full h-auto drop-shadow-sm font-sans">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
      </marker>
    </defs>

    {/* Tabla Central */}
    <g transform="translate(175, 100)">
      <rect x="0" y="0" width="150" height="100" rx="8" fill="#10b981" />
      <rect x="4" y="4" width="142" height="92" rx="6" fill="#ecfdf5" />
      <text x="75" y="30" fill="#047857" fontSize="14" fontWeight="bold" textAnchor="middle">Tabla: Usuarios</text>
      <text x="75" y="55" fill="#065f46" fontSize="11" textAnchor="middle">ID | Nombre | Email | Fecha</text>
      <rect x="20" y="65" width="110" height="4" fill="#a7f3d0" />
      <rect x="20" y="75" width="110" height="4" fill="#a7f3d0" />
      <rect x="20" y="85" width="110" height="4" fill="#a7f3d0" />
    </g>

    {/* Índice 1 */}
    <g transform="translate(20, 20)">
      <rect x="0" y="0" width="120" height="60" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="60" y="25" fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">Índice 1</text>
      <text x="60" y="45" fill="#3b82f6" fontSize="10" textAnchor="middle">(Columna: Nombre)</text>
    </g>
    <path d="M 80 80 L 165 110" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

    {/* Índice 2 */}
    <g transform="translate(360, 20)">
      <rect x="0" y="0" width="120" height="60" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="60" y="25" fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">Índice 2</text>
      <text x="60" y="45" fill="#3b82f6" fontSize="10" textAnchor="middle">(Columna: Email)</text>
    </g>
    <path d="M 420 80 L 335 110" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

    {/* Índice 3 */}
    <g transform="translate(190, 230)">
      <rect x="0" y="0" width="120" height="60" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
      <text x="60" y="25" fill="#1d4ed8" fontSize="12" fontWeight="bold" textAnchor="middle">Índice 3</text>
      <text x="60" y="45" fill="#3b82f6" fontSize="10" textAnchor="middle">(Columna: Fecha)</text>
    </g>
    <path d="M 250 230 L 250 205" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />

  </svg>
);

const DiagramIndependence = () => (
  <svg viewBox="0 0 500 300" className="w-full h-auto drop-shadow-sm font-sans">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" />
      </marker>
    </defs>
    
    {/* Índice Ordenado lógicamente */}
    <g transform="translate(40, 40)">
      <rect x="0" y="0" width="160" height="200" rx="6" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="2" />
      <rect x="0" y="0" width="160" height="30" rx="6" fill="#8b5cf6" />
      <text x="80" y="20" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Índice (Orden Lógico)</text>
      
      {/* Items ordenados alfabéticamente */}
      <rect x="10" y="40" width="140" height="25" fill="#ddd6fe" rx="4" />
      <text x="80" y="56" fontSize="11" fill="#4c1d95" textAnchor="middle" fontWeight="bold">Ana</text>
      
      <rect x="10" y="75" width="140" height="25" fill="#ddd6fe" rx="4" />
      <text x="80" y="91" fontSize="11" fill="#4c1d95" textAnchor="middle" fontWeight="bold">Beto</text>

      <rect x="10" y="110" width="140" height="25" fill="#ddd6fe" rx="4" />
      <text x="80" y="126" fontSize="11" fill="#4c1d95" textAnchor="middle" fontWeight="bold">Carlos</text>

      <rect x="10" y="145" width="140" height="25" fill="#ddd6fe" rx="4" />
      <text x="80" y="161" fontSize="11" fill="#4c1d95" textAnchor="middle" fontWeight="bold">Diana</text>
    </g>

    {/* Tabla con Orden Físico arbitrario */}
    <g transform="translate(300, 40)">
      <rect x="0" y="0" width="160" height="200" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
      <rect x="0" y="0" width="160" height="30" rx="6" fill="#475569" />
      <text x="80" y="20" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">Datos (Orden Físico)</text>
      
      {/* Items desordenados */}
      <rect x="10" y="40" width="140" height="25" fill="#e2e8f0" rx="4" />
      <text x="80" y="56" fontSize="11" fill="#0f172a" textAnchor="middle">Carlos (Pos 1)</text>
      
      <rect x="10" y="75" width="140" height="25" fill="#e2e8f0" rx="4" />
      <text x="80" y="91" fontSize="11" fill="#0f172a" textAnchor="middle">Ana (Pos 2)</text>

      <rect x="10" y="110" width="140" height="25" fill="#e2e8f0" rx="4" />
      <text x="80" y="126" fontSize="11" fill="#0f172a" textAnchor="middle">Diana (Pos 3)</text>

      <rect x="10" y="145" width="140" height="25" fill="#e2e8f0" rx="4" />
      <text x="80" y="161" fontSize="11" fill="#0f172a" textAnchor="middle">Beto (Pos 4)</text>
    </g>

    {/* Líneas cruzando demostrando que no depende del orden físico */}
    <path d="M 200 52 C 250 52, 250 87, 295 87" stroke="#c4b5fd" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 200 87 C 250 87, 250 157, 295 157" stroke="#c4b5fd" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 200 122 C 250 122, 250 52, 295 52" stroke="#c4b5fd" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
    <path d="M 200 157 C 250 157, 250 122, 295 122" stroke="#c4b5fd" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
  </svg>
);

const DiagramRender: React.FC<DiagramProps> = ({ activeTab }) => {
  // Renderiza el componente de diagrama correspondiente según la pestaña activa
  // Se utiliza CSS Grid internamente para asegurar centrado sin Flexbox
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 w-full h-full min-h-[300px] grid place-items-center">
      {activeTab === 0 && <DiagramIntro />}
      {activeTab === 1 && <DiagramDefinition />}
      {activeTab === 2 && <DiagramMultiple />}
      {activeTab === 3 && <DiagramIndependence />}
    </div>
  );
};

// --- LAYOUT PRINCIPAL (Basado enteramente en CSS Grid, 0% Flexbox) ---

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTab, onTabChange, children }) => {
  return (
    // Layout Raíz: Grid de 2 filas (Cabecera auto-ajustable + Contenido expandible)
    <div className="min-h-screen bg-slate-100 grid grid-rows-[auto_1fr] font-sans">
      
      {/* HEADER: Grid interno de 2 filas (Título + Navegación) */}
      <header className="bg-white shadow-sm border-b border-slate-200 px-6 py-8 grid grid-rows-[auto_auto] gap-6">
        <div className="grid grid-cols-1">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {title}
          </h1>
        
        </div>
        
        {/* NAVEGACIÓN (TABS): Grid de columnas adaptables */}
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-200 pb-px">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className={`
                px-4 py-3 text-sm font-semibold text-center transition-colors border-b-2
                ${activeTab === index 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300'
                }
              `}
              aria-selected={activeTab === index}
              role="tab"
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* ÁREA DE CONTENIDO */}
      <main className="p-6 md:p-8 grid grid-cols-1">
        <div className="max-w-6xl w-full mx-auto grid grid-cols-1">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- COMPONENTE APP (Punto de entrada) ---

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const currentQuark = lessonData[activeTab];

  return (
    <LessonLayout
      title="Índice No Clusterizado en Bases de Datos"
      tabs={lessonData.map(q => q.title)}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Contenido Dinámico de la Pestaña Activa */}
      <Card className="grid grid-rows-1">
        {/* Layout del Panel: Grid de 1 columna en móviles, 2 en pantallas medianas+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          
          {/* Columna Izquierda: Texto y Explicación */}
          <div className="grid grid-rows-[auto_auto_1fr] gap-4">
            <div>
             
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                {currentQuark.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
              <p className="pl-5 text-slate-700 text-lg leading-relaxed">
                {currentQuark.explanation}
              </p>
            </div>
            
          
          </div>

          {/* Columna Derecha: Diagrama */}
          <div className="grid grid-rows-[auto_1fr] gap-4">
            <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
              {currentQuark.diagramTitle}
            </h3>
            <DiagramRender activeTab={activeTab} />
          </div>

        </div>
      </Card>
    </LessonLayout>
  );
}