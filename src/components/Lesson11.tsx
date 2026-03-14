import React, { useState } from 'react';
import { Database, Layers, TableProperties, HardDrive, BookOpen } from 'lucide-react';

// ==========================================
// TIPOS E INTERFACES (TypeScript)
// ==========================================

interface SectionData {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  bulletPoints?: string[];
  diagramTitle: string;
  diagramType: 'intro' | 'levels' | 'logical' | 'physical';
}

interface LessonLayoutProps {
  title: string;
  sections: SectionData[];
  activeSectionId: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface DiagramProps {
  type: SectionData['diagramType'];
}

// ==========================================
// DATOS DE LA LECCIÓN
// ==========================================

const lessonData: SectionData[] = [
  {
    id: 'intro',
    title: 'Introducción',
    icon: BookOpen,
    description: 'La organización de los datos describe la forma en que la información se estructura y se gestiona dentro de un sistema de almacenamiento. En el contexto de las bases de datos, esta organización permite que los datos puedan almacenarse, localizarse y recuperarse de manera eficiente. Comprender cómo se organizan los datos ayuda a explicar tanto el funcionamiento del modelo relacional como el rendimiento del sistema gestor de bases de datos.',
    diagramTitle: 'Esquema Conceptual de Capas',
    diagramType: 'intro'
  },
  {
    id: 'levels',
    title: 'Dos Niveles',
    icon: Layers,
    description: 'La organización de los datos en bases de datos puede analizarse en dos niveles principales. Esta distinción permite separar el diseño conceptual de los datos de los detalles técnicos de almacenamiento.',
    bulletPoints: [
      'Organización lógica: describe cómo los datos son estructurados y comprendidos por los usuarios y por el modelo de datos.',
      'Organización física: describe cómo esos datos son almacenados realmente en el sistema de almacenamiento.'
    ],
    diagramTitle: 'Definición y Capas de Organización',
    diagramType: 'levels'
  },
  {
    id: 'logical',
    title: 'Nivel Lógico',
    icon: TableProperties,
    description: 'La organización lógica describe la estructura de los datos tal como es presentada al usuario y definida por el modelo relacional. Este nivel se centra en cómo se representan y relacionan los datos, sin considerar aún cómo se almacenan físicamente.',
    bulletPoints: [
      'Tablas: representan conjuntos de datos relacionados.',
      'Columnas: describen los atributos de los datos.',
      'Relaciones: permiten conectar información de distintas entidades (tablas).'
    ],
    diagramTitle: 'Estructura Relacional (Vista de Usuario)',
    diagramType: 'logical'
  },
  {
    id: 'physical',
    title: 'Nivel Físico',
    icon: HardDrive,
    description: 'La organización física describe cómo los datos son almacenados realmente en los dispositivos de almacenamiento, como discos o memoria. Este nivel es gestionado internamente por el sistema gestor de bases de datos y no suele ser visible directamente para el usuario.',
    bulletPoints: [
      'Bloques de almacenamiento: unidades de datos almacenadas en el disco.',
      'Páginas de datos: agrupan registros dentro del sistema gestor.',
      'Estructuras internas: utilizadas para gestionar el acceso eficiente (ej. índices).'
    ],
    diagramTitle: 'Almacenamiento en Disco (Vista del Sistema)',
    diagramType: 'physical'
  }
];

// ==========================================
// COMPONENTES DE PRESENTACIÓN (UI)
// ==========================================

// Componente Card genérico para envolver contenido usando Grid
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// ==========================================
// COMPONENTES DE DIAGRAMAS (SVG)
// ==========================================

const IntroDiagram: React.FC = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-h-80 object-contain">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
      </marker>
      <linearGradient id="gradLogical" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#1D4ED8" />
      </linearGradient>
      <linearGradient id="gradPhysical" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
    </defs>
    
    {/* Capa Lógica */}
    <path d="M 100 90 C 100 70, 300 70, 300 90 L 300 130 C 300 150, 100 150, 100 130 Z" fill="url(#gradLogical)" opacity="0.9"/>
    <ellipse cx="200" cy="90" rx="100" ry="20" fill="#60A5FA"/>
    <text x="200" y="125" textAnchor="middle" fill="white" className="font-bold text-lg" style={{ fontFamily: 'sans-serif' }}>Organización Lógica</text>
    
    {/* Conectores */}
    <line x1="150" y1="145" x2="150" y2="175" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
    <line x1="250" y1="145" x2="250" y2="175" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="5,5" />
    <text x="200" y="165" textAnchor="middle" fill="#64748B" className="text-xs font-semibold" style={{ fontFamily: 'sans-serif' }}>Mapeo interno</text>

    {/* Capa Física */}
    <path d="M 100 190 C 100 170, 300 170, 300 190 L 300 230 C 300 250, 100 250, 100 230 Z" fill="url(#gradPhysical)" opacity="0.9"/>
    <ellipse cx="200" cy="190" rx="100" ry="20" fill="#34D399"/>
    <text x="200" y="225" textAnchor="middle" fill="white" className="font-bold text-lg" style={{ fontFamily: 'sans-serif' }}>Organización Física</text>
  </svg>
);

const LevelsDiagram: React.FC = () => (
  <svg viewBox="0 0 500 350" className="w-full h-full max-h-80 object-contain">
    <rect x="50" y="20" width="400" height="300" rx="15" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
    <text x="250" y="50" textAnchor="middle" fill="#0F172A" className="font-bold text-xl" style={{ fontFamily: 'sans-serif' }}>Concepto: Organización de Datos</text>
    
    {/* Nivel Lógico Box */}
    <rect x="80" y="80" width="340" height="80" rx="8" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
    <text x="250" y="110" textAnchor="middle" fill="#1E3A8A" className="font-bold text-lg" style={{ fontFamily: 'sans-serif' }}>Nivel Lógico</text>
    <text x="250" y="130" textAnchor="middle" fill="#3B82F6" className="text-sm" style={{ fontFamily: 'sans-serif' }}>Estructuras comprensibles para usuarios (Tablas)</text>
    <text x="250" y="145" textAnchor="middle" fill="#3B82F6" className="text-sm" style={{ fontFamily: 'sans-serif' }}>Modelo Relacional</text>

    {/* Flechas */}
    <path d="M 250 160 L 250 190" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 230 190 L 230 160" stroke="#94A3B8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <text x="280" y="180" fill="#64748B" className="text-xs" style={{ fontFamily: 'sans-serif' }}>Abstracción</text>

    {/* Nivel Físico Box */}
    <rect x="80" y="200" width="340" height="80" rx="8" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" />
    <text x="250" y="230" textAnchor="middle" fill="#065F46" className="font-bold text-lg" style={{ fontFamily: 'sans-serif' }}>Nivel Físico</text>
    <text x="250" y="250" textAnchor="middle" fill="#10B981" className="text-sm" style={{ fontFamily: 'sans-serif' }}>Almacenamiento real en Hardware</text>
    <text x="250" y="265" textAnchor="middle" fill="#10B981" className="text-sm" style={{ fontFamily: 'sans-serif' }}>Bloques, Páginas, Índices en Disco</text>
  </svg>
);

const LogicalDiagram: React.FC = () => (
  <svg viewBox="0 0 500 350" className="w-full h-full max-h-80 object-contain">
    {/* Tabla 1: Clientes */}
    <g transform="translate(40, 40)">
      <rect x="0" y="0" width="140" height="30" fill="#3B82F6" rx="4" />
      <text x="70" y="20" textAnchor="middle" fill="white" className="font-bold text-sm" style={{ fontFamily: 'sans-serif' }}>Clientes</text>
      <rect x="0" y="30" width="140" height="80" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <text x="10" y="50" fill="#1E3A8A" className="text-xs font-mono">PK id_cliente</text>
      <text x="10" y="70" fill="#1E3A8A" className="text-xs font-mono">   nombre</text>
      <text x="10" y="90" fill="#1E3A8A" className="text-xs font-mono">   email</text>
    </g>

    {/* Tabla 2: Pedidos */}
    <g transform="translate(280, 40)">
      <rect x="0" y="0" width="160" height="30" fill="#8B5CF6" rx="4" />
      <text x="80" y="20" textAnchor="middle" fill="white" className="font-bold text-sm" style={{ fontFamily: 'sans-serif' }}>Pedidos</text>
      <rect x="0" y="30" width="160" height="80" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2" />
      <text x="10" y="50" fill="#4C1D95" className="text-xs font-mono">PK id_pedido</text>
      <text x="10" y="70" fill="#4C1D95" className="text-xs font-mono">FK id_cliente</text>
      <text x="10" y="90" fill="#4C1D95" className="text-xs font-mono">   fecha</text>
    </g>

    {/* Tabla 3: Productos */}
    <g transform="translate(160, 200)">
      <rect x="0" y="0" width="160" height="30" fill="#F59E0B" rx="4" />
      <text x="80" y="20" textAnchor="middle" fill="white" className="font-bold text-sm" style={{ fontFamily: 'sans-serif' }}>Productos</text>
      <rect x="0" y="30" width="160" height="80" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
      <text x="10" y="50" fill="#92400E" className="text-xs font-mono">PK id_producto</text>
      <text x="10" y="70" fill="#92400E" className="text-xs font-mono">   precio</text>
      <text x="10" y="90" fill="#92400E" className="text-xs font-mono">   stock</text>
    </g>

    {/* Relaciones (Líneas) */}
    <path d="M 180 80 L 280 80" stroke="#64748B" strokeWidth="2" fill="none" />
    <circle cx="180" cy="80" r="4" fill="#64748B" />
    <path d="M 270 75 L 280 80 L 270 85" fill="none" stroke="#64748B" strokeWidth="2" />

    <path d="M 360 110 L 360 160 L 240 160 L 240 200" stroke="#64748B" strokeWidth="2" fill="none" />
    <circle cx="240" cy="200" r="4" fill="#64748B" />
    <path d="M 355 120 L 360 110 L 365 120" fill="none" stroke="#64748B" strokeWidth="2" />
  </svg>
);

const PhysicalDiagram: React.FC = () => (
  <svg viewBox="0 0 500 350" className="w-full h-full max-h-80 object-contain">
    {/* Tabla Lógica Arriba */}
    <g transform="translate(150, 20)">
      <rect x="0" y="0" width="200" height="60" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="4" />
      <text x="100" y="25" textAnchor="middle" fill="#1E3A8A" className="font-bold text-sm" style={{ fontFamily: 'sans-serif' }}>Tabla (Vista Lógica)</text>
      <line x1="0" y1="35" x2="200" y2="35" stroke="#3B82F6" strokeWidth="1" />
      <text x="100" y="50" textAnchor="middle" fill="#60A5FA" className="text-xs" style={{ fontFamily: 'sans-serif' }}>Registros 1...N</text>
    </g>

    {/* Flechas de transformación */}
    <path d="M 200 80 L 120 140" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>
    <path d="M 250 80 L 250 140" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>
    <path d="M 300 80 L 380 140" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" markerEnd="url(#arrowhead)"/>

    {/* Disco Físico Base */}
    <ellipse cx="250" cy="250" rx="200" ry="70" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="4" />
    <ellipse cx="250" cy="250" rx="140" ry="45" fill="none" stroke="#CBD5E1" strokeWidth="2" />
    <ellipse cx="250" cy="250" rx="80" ry="25" fill="none" stroke="#CBD5E1" strokeWidth="2" />
    
    {/* Bloques/Páginas de datos */}
    <g transform="translate(80, 150)">
      <rect x="0" y="0" width="60" height="70" fill="#10B981" rx="4" opacity="0.9" />
      <text x="30" y="20" textAnchor="middle" fill="white" className="font-bold text-xs" style={{ fontFamily: 'sans-serif' }}>Página 1</text>
      <rect x="10" y="30" width="40" height="5" fill="#ECFDF5" />
      <rect x="10" y="40" width="40" height="5" fill="#ECFDF5" />
      <rect x="10" y="50" width="40" height="5" fill="#ECFDF5" />
    </g>
    
    <g transform="translate(220, 150)">
      <rect x="0" y="0" width="60" height="70" fill="#10B981" rx="4" opacity="0.9" />
      <text x="30" y="20" textAnchor="middle" fill="white" className="font-bold text-xs" style={{ fontFamily: 'sans-serif' }}>Página 2</text>
      <rect x="10" y="30" width="40" height="5" fill="#ECFDF5" />
      <rect x="10" y="40" width="40" height="5" fill="#ECFDF5" />
    </g>

    <g transform="translate(360, 150)">
      <rect x="0" y="0" width="60" height="70" fill="#10B981" rx="4" opacity="0.9" />
      <text x="30" y="20" textAnchor="middle" fill="white" className="font-bold text-xs" style={{ fontFamily: 'sans-serif' }}>Página N</text>
      <rect x="10" y="30" width="40" height="5" fill="#ECFDF5" />
      <rect x="10" y="40" width="40" height="5" fill="#ECFDF5" />
      <rect x="10" y="50" width="40" height="5" fill="#ECFDF5" />
    </g>

    <text x="250" y="300" textAnchor="middle" fill="#475569" className="font-bold text-sm" style={{ fontFamily: 'sans-serif' }}>Sectores y Pistas de Disco Físico</text>
  </svg>
);

const DiagramRender: React.FC<DiagramProps> = ({ type }) => {
  switch (type) {
    case 'intro': return <IntroDiagram />;
    case 'levels': return <LevelsDiagram />;
    case 'logical': return <LogicalDiagram />;
    case 'physical': return <PhysicalDiagram />;
    default: return null;
  }
};

// ==========================================
// COMPONENTE PRINCIPAL DE DISEÑO (LAYOUT)
// ==========================================

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, sections, activeSectionId, onTabChange, children }) => {
  return (
    // Layout Principal usando Grid (No Flexbox)
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* HEADER */}
      <header className="grid grid-cols-[auto_1fr] items-center gap-4 p-5 bg-indigo-900 text-white shadow-md z-10">
        <div className="grid place-items-center bg-indigo-800 p-2 rounded-lg">
          <Database size={28} className="text-indigo-200" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-wide">{title}</h1>
      </header>

      {/* NAVEGACIÓN (TABS) */}
      <nav className="grid grid-flow-col auto-cols-max gap-1 p-2 bg-white border-b border-slate-200 shadow-sm overflow-x-auto w-full justify-start md:justify-center">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onTabChange(section.id)}
              className={`grid grid-cols-[auto_1fr] items-center gap-2 px-5 py-3 rounded-t-lg transition-colors duration-200 border-b-4 
                ${isActive 
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-700 font-semibold' 
                  : 'border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                }`}
              aria-selected={isActive}
              role="tab"
            >
              <Icon size={18} />
              <span className="whitespace-nowrap">{section.title}</span>
            </button>
          );
        })}
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="grid p-4 md:p-8 w-full max-w-7xl mx-auto h-full items-start">
        {children}
      </main>
    </div>
  );
};

// ==========================================
// COMPONENTE RAÍZ DE LA APLICACIÓN
// ==========================================

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);

  const activeSection = lessonData.find(sec => sec.id === activeTabId) || lessonData[0];

  return (
    <LessonLayout
      title="Organización de Datos"
      sections={lessonData}
      activeSectionId={activeTabId}
      onTabChange={setActiveTabId}
    >
      {/* Contenedor del panel usando CSS Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8">
        
        {/* PANEL IZQUIERDO: TEXTO Y DESCRIPCIÓN */}
        <Card className="grid grid-rows-[auto_1fr] gap-4 p-6 md:p-8 h-full">
          <header className="grid gap-2 border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-bold text-slate-800 grid grid-cols-[auto_1fr] items-center gap-3">
              <span className="grid place-items-center bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                <activeSection.icon size={24} />
              </span>
              {activeSection.title}
            </h2>
          </header>
          
          <div className="grid gap-5 text-slate-600 leading-relaxed text-base md:text-lg">
            <p>{activeSection.description}</p>
            
            {activeSection.bulletPoints && (
              <ul className="grid gap-3 pl-2">
                {activeSection.bulletPoints.map((point, index) => {
                  // Separar negritas para la primera frase antes de los dos puntos (si existe)
                  const [boldPart, rest] = point.split(': ');
                  return (
                    <li key={index} className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      <span className="grid place-items-center mt-1.5 w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span>
                        {rest ? (
                          <>
                            <strong className="text-slate-800">{boldPart}:</strong> {rest}
                          </>
                        ) : (
                          point
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Card>

        {/* PANEL DERECHO: DIAGRAMA VISUAL */}
        <Card className="grid grid-rows-[auto_1fr] gap-0 h-full">
          <div className="grid p-4 bg-slate-50 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 text-center uppercase tracking-wider text-sm">
              {activeSection.diagramTitle}
            </h3>
          </div>
          <div className="grid place-items-center p-6 bg-white min-h-[300px]">
            <DiagramRender type={activeSection.diagramType} />
          </div>
        </Card>
        
      </div>
    </LessonLayout>
  );
}