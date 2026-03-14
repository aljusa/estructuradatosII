import React, { useState } from 'react';
import { Database, Search, List, ArrowRight, Table as TableIcon, Zap } from 'lucide-react';

// --- TYPES & INTERFACES ---

type DiagramType = 'intro' | 'syntax' | 'example' | 'effect';

interface SectionContent {
  id: string;
  tabTitle: string;
  title: string;
  description: string;
  diagramTitle: string;
  diagramDescription: string;
  diagramType: DiagramType;
}

// --- DATA ---

const lessonData: SectionContent[] = [
  {
    id: 'intro',
    tabTitle: '1. Introducción',
    title: 'Introducción a la creación de índices',
    description: 'En los sistemas gestores de bases de datos, los índices deben crearse explícitamente cuando se desea optimizar el acceso a determinadas columnas. Para ello, SQL proporciona instrucciones específicas que permiten definir estructuras de índice asociadas a una tabla y a una o varias columnas. La creación de índices forma parte de las tareas de diseño y optimización de una base de datos.',
    diagramTitle: 'Esquema Conceptual: Tabla e Índice',
    diagramDescription: 'Esquema conceptual donde aparece una tabla de base de datos y, a partir de una instrucción SQL, se genera una estructura adicional etiquetada como "Índice". Flechas conectan el índice con la columna seleccionada de la tabla.',
    diagramType: 'intro'
  },
  {
    id: 'syntax',
    tabTitle: '2. Sintaxis CREATE INDEX',
    title: 'Instrucción CREATE INDEX',
    description: 'La instrucción CREATE INDEX se utiliza en SQL para crear un índice sobre una o varias columnas de una tabla. Al ejecutar esta instrucción, el sistema gestor de bases de datos construye una estructura auxiliar que facilitará la localización de registros cuando se realicen consultas sobre esas columnas.',
    diagramTitle: 'Sintaxis General',
    diagramDescription: 'Caja de definición destacada que muestra la sintaxis general de CREATE INDEX, con etiquetas señalando cada parte: nombre del índice, tabla objetivo y columna indexada.',
    diagramType: 'syntax'
  },
  {
    id: 'example',
    tabTitle: '3. Ejemplo Básico',
    title: 'Ejemplo básico de creación de índice',
    description: 'Un ejemplo sencillo de creación de índice consiste en generar un índice sobre la columna "nombre" de la tabla "empleados".\n\nEn este caso:\n• idx_nombre es el nombre asignado al índice.\n• empleados es la tabla donde se crea el índice.\n• nombre es la columna cuya búsqueda se desea optimizar.',
    diagramTitle: 'Análisis de la Instrucción SQL',
    diagramDescription: 'Fragmento de código SQL donde cada parte de la instrucción aparece resaltada con colores distintos. Etiquetas explicativas detallan "nombre del índice", "tabla" y "columna indexada".',
    diagramType: 'example'
  },
  {
    id: 'effect',
    tabTitle: '4. Efecto en Búsqueda',
    title: 'Efecto del índice en la búsqueda de datos',
    description: 'Una vez creado el índice, el sistema gestor de bases de datos puede utilizarlo para localizar más rápidamente registros basados en la columna indexada. Por ejemplo, cuando una consulta busca empleados por su nombre, el índice permite acceder directamente a las filas correspondientes sin recorrer toda la tabla (Full Table Scan).',
    diagramTitle: 'Flujo de Ejecución con Índice',
    diagramDescription: 'Diagrama donde una consulta con condición sobre nombre primero consulta el índice idx_nombre, y desde allí se dirige directamente a las filas relevantes dentro de la tabla empleados, mostrando una ruta de acceso rápida y directa.',
    diagramType: 'effect'
  }
];

// --- COMPONENTS ---

/**
 * Card Component: Contenedor estandarizado para mantener consistencia visual.
 * Nota: Se utiliza CSS Grid para el layout interno si es necesario.
 */
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

/**
 * DiagramRender Component: Renderiza la visualización específica basada en el tipo.
 * Construido enteramente con CSS Grid.
 */
const DiagramRender: React.FC<{ type: DiagramType }> = ({ type }) => {
  switch (type) {
    case 'intro':
      return (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center place-items-center h-full w-full p-8 bg-slate-50 rounded-lg border border-slate-100">
          <div className="grid grid-rows-[auto_auto] gap-3 place-items-center bg-white p-6 rounded-lg shadow-sm border border-slate-200 w-full">
            <Database className="text-slate-600" size={48} strokeWidth={1.5} />
            <span className="font-semibold text-slate-700">Tabla Original</span>
            <div className="grid grid-rows-3 gap-1 w-full mt-2">
              <div className="h-2 bg-slate-200 rounded w-full"></div>
              <div className="h-2 bg-blue-400 rounded w-3/4"></div>
              <div className="h-2 bg-slate-200 rounded w-full"></div>
            </div>
          </div>
          
          <div className="grid grid-rows-[auto_auto] gap-2 place-items-center text-blue-600">
            <span className="text-xs font-mono font-bold bg-blue-100 px-3 py-1 rounded-full text-blue-700">CREATE INDEX</span>
            <ArrowRight size={32} />
          </div>

          <div className="grid grid-rows-[auto_auto] gap-3 place-items-center bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200 w-full">
            <List className="text-blue-600" size={48} strokeWidth={1.5} />
            <span className="font-semibold text-blue-800">Estructura de Índice</span>
            <div className="grid grid-rows-3 gap-1 w-full mt-2">
              <div className="h-2 bg-blue-300 rounded w-1/2"></div>
              <div className="h-2 bg-blue-300 rounded w-3/4"></div>
              <div className="h-2 bg-blue-300 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      );

    case 'syntax':
      return (
        <div className="grid place-items-center h-full w-full p-8 bg-slate-50 rounded-lg">
          <div className="grid gap-6 w-full max-w-xl">
            <div className="grid gap-2 bg-slate-900 p-6 rounded-xl font-mono text-lg shadow-lg">
              <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                <span className="text-pink-400 font-semibold">CREATE INDEX</span>
                <span className="text-green-400">nombre_indice</span>
              </div>
              <div className="grid grid-cols-[auto_auto_auto_1fr] gap-3 items-center pl-8">
                <span className="text-pink-400 font-semibold">ON</span>
                <span className="text-blue-400">nombre_tabla</span>
                <span className="text-slate-300">(<span className="text-yellow-400">columna</span>);</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="grid gap-1 place-items-center text-center">
                <div className="w-3 h-3 rounded-full bg-green-400 mb-1"></div>
                <span className="font-semibold text-slate-700">Nombre del Índice</span>
                <span className="text-xs text-slate-500">Identificador único</span>
              </div>
              <div className="grid gap-1 place-items-center text-center">
                <div className="w-3 h-3 rounded-full bg-blue-400 mb-1"></div>
                <span className="font-semibold text-slate-700">Tabla Objetivo</span>
                <span className="text-xs text-slate-500">Donde residen los datos</span>
              </div>
              <div className="grid gap-1 place-items-center text-center">
                <div className="w-3 h-3 rounded-full bg-yellow-400 mb-1"></div>
                <span className="font-semibold text-slate-700">Columna</span>
                <span className="text-xs text-slate-500">Criterio de ordenación</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'example':
      return (
        <div className="grid place-items-center h-full w-full p-8 bg-slate-50 rounded-lg">
          <div className="grid gap-8 w-full max-w-2xl">
            <div className="grid gap-2 bg-slate-900 p-6 rounded-xl font-mono text-xl shadow-lg relative">
              <div className="grid grid-cols-[auto_1fr] gap-3 items-center">
                <span className="text-pink-400 font-semibold">CREATE INDEX</span>
                <span className="text-green-400">idx_nombre</span>
              </div>
              <div className="grid grid-cols-[auto_auto_auto_1fr] gap-3 items-center pl-8">
                <span className="text-pink-400 font-semibold">ON</span>
                <span className="text-blue-400">empleados</span>
                <span className="text-slate-300">(<span className="text-yellow-400">nombre</span>);</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-mono text-green-600 bg-green-50 px-2 py-1 rounded">idx_nombre</span>
                <span className="text-slate-600 text-sm">Nombre asignado a la nueva estructura de índice.</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">empleados</span>
                <span className="text-slate-600 text-sm">Tabla en la base de datos que contiene los registros.</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-center gap-4 bg-white p-3 rounded-lg border border-slate-200">
                <span className="font-mono text-yellow-600 bg-yellow-50 px-2 py-1 rounded">nombre</span>
                <span className="text-slate-600 text-sm">Columna específica optimizada para búsquedas rápidas.</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'effect':
      return (
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center h-full w-full p-6 bg-slate-50 rounded-lg">
          <div className="grid grid-rows-[auto_1fr] gap-4 h-full">
            <div className="grid gap-2 bg-white p-4 rounded-lg shadow-sm border border-indigo-200 place-items-center">
              <Search className="text-indigo-500" />
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-1 rounded">SELECT * WHERE nombre = 'Ana'</span>
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-2 place-items-center bg-indigo-50 p-4 rounded-lg border border-indigo-200 relative">
              <List className="text-indigo-600" />
              <span className="font-semibold text-sm text-indigo-800">Índice: idx_nombre</span>
              <div className="w-full grid gap-1 text-xs font-mono mt-2">
                <div className="bg-white p-1 rounded text-center text-slate-400">...</div>
                <div className="bg-indigo-600 text-white p-1 rounded text-center font-bold shadow-sm">Ana → Puntero(Fila 42)</div>
                <div className="bg-white p-1 rounded text-center text-slate-400">...</div>
              </div>
            </div>
          </div>

          <div className="grid place-items-center text-indigo-500">
            <Zap className="fill-indigo-100" size={32} />
            <ArrowRight size={24} />
          </div>

          <div className="grid grid-rows-[auto_1fr] gap-2 place-items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200 h-full">
            <TableIcon className="text-slate-600" />
            <span className="font-semibold text-sm text-slate-700">Tabla: empleados</span>
            <div className="w-full grid grid-rows-5 gap-1 text-xs mt-2 relative">
              <div className="bg-slate-100 p-2 rounded">Fila 10: Juan</div>
              <div className="bg-slate-100 p-2 rounded">Fila 25: Carlos</div>
              <div className="bg-green-100 border border-green-300 p-2 rounded font-bold text-green-800 ring-2 ring-green-400 ring-offset-1">Fila 42: Ana (¡Acceso Directo!)</div>
              <div className="bg-slate-100 p-2 rounded">Fila 50: Luis</div>
              <div className="bg-slate-100 p-2 rounded">Fila 88: Maria</div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

/**
 * LessonLayout Component: Estructura principal de la lección usando CSS Grid.
 * Define las áreas para el Header, Navegación y Contenido (Texto + Diagrama).
 */
const LessonLayout: React.FC<{
  activeSection: SectionContent;
  allSections: SectionContent[];
  onTabChange: (id: string) => void;
}> = ({ activeSection, allSections, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-100 grid grid-rows-[auto_auto_1fr] font-sans text-slate-800">
      
      {/* Header Area */}
      <header className="bg-slate-900 text-white p-6 grid grid-cols-[auto_1fr] gap-4 items-center shadow-md z-10">
        <div className="bg-blue-500 p-2 rounded-lg">
          <Database size={24} className="text-white" />
        </div>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Creación Básica de Índices en SQL</h1>
    
        </div>
      </header>

      {/* Tabs Navigation Area (No Flexbox, only Grid) */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4 sticky top-0 z-0">
        <div className="max-w-7xl mx-auto grid grid-flow-col auto-cols-fr gap-2 border-b border-slate-200">
          {allSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onTabChange(section.id)}
              className={`
                pb-3 pt-2 px-4 text-sm font-semibold transition-all grid place-items-center text-center
                border-b-2 
                ${activeSection.id === section.id 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t-lg' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300 rounded-t-lg'}
              `}
            >
              {section.tabTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Panel: Text Content */}
        <div className="lg:col-span-5 grid gap-6 h-full">
          <Card className="p-8 grid grid-rows-[auto_1fr] gap-4 h-full">
            <h2 className="text-2xl font-bold text-slate-800 leading-tight">
              {activeSection.title}
            </h2>
            <div className="grid gap-4 content-start text-slate-600 leading-relaxed text-base whitespace-pre-line">
              {activeSection.description}
            </div>
          </Card>
        </div>

        {/* Right Panel: Diagram Render */}
        <div className="lg:col-span-7 grid h-full min-h-[500px]">
          <Card className="grid grid-rows-[auto_1fr_auto] h-full bg-white">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-semibold text-slate-800">
                {activeSection.diagramTitle}
              </h3>
            </div>
            
            <div className="p-6 grid place-items-center w-full h-full overflow-hidden">
              <DiagramRender type={activeSection.diagramType} />
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <p className="text-sm text-slate-500 italic text-center">
                {activeSection.diagramDescription}
              </p>
            </div>
          </Card>
        </div>

      </main>
    </div>
  );
};

// --- APP ENTRY POINT ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);

  const activeSection = lessonData.find(section => section.id === activeTabId) || lessonData[0];

  return (
    <LessonLayout 
      activeSection={activeSection} 
      allSections={lessonData} 
      onTabChange={setActiveTabId} 
    />
  );
}