import React, { useState } from 'react';

// --- DEFINICIÓN DE TIPOS ---

interface LessonSection {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string;
}

interface DiagramRenderProps {
  activeId: string;
}

// --- DATOS DE LA LECCIÓN ---

const lessonData: LessonSection[] = [
  {
    id: 'intro',
    title: 'Introducción al propósito de los índices',
    description: 'Los índices se utilizan en las bases de datos para mejorar el rendimiento de las consultas. Su objetivo es reducir la cantidad de datos que el sistema debe examinar para encontrar la información solicitada. Al proporcionar rutas de acceso más eficientes hacia los registros, los índices permiten que las operaciones de lectura sean considerablemente más rápidas, especialmente cuando las tablas contienen grandes volúmenes de datos.'
  },
  {
    id: 'reduccion',
    title: 'Reducción del tiempo de búsqueda',
    description: 'Uno de los principales beneficios de los índices es la reducción del tiempo necesario para localizar datos. Sin un índice, el sistema debe revisar cada registro de la tabla. Con un índice, el sistema puede acceder directamente a las filas que contienen los valores buscados, disminuyendo significativamente el número de operaciones necesarias.'
  },
  {
    id: 'where',
    title: 'Optimización de consultas con WHERE',
    description: 'Los índices son especialmente útiles en consultas que utilizan condiciones de filtrado mediante la cláusula WHERE. Cuando una columna incluida en la condición está indexada, el sistema puede localizar rápidamente las filas que cumplen el criterio sin examinar toda la tabla.',
    codeSnippet: 'SELECT *\nFROM estudiantes\nWHERE id_estudiante = 105;'
  },
  {
    id: 'orderby',
    title: 'Mejora en operaciones de ordenamiento (ORDER BY)',
    description: 'Los índices también pueden acelerar operaciones de ordenamiento cuando las consultas utilizan la cláusula ORDER BY. Si la columna por la cual se ordenan los resultados tiene un índice, los datos pueden recuperarse ya organizados o con menor esfuerzo computacional para ordenarlos.'
  },
  {
    id: 'groupby',
    title: 'Optimización de agrupaciones (GROUP BY)',
    description: 'Las consultas que utilizan GROUP BY también pueden beneficiarse de los índices. Cuando las columnas utilizadas para agrupar están indexadas, el sistema puede identificar más rápidamente los registros que pertenecen a cada grupo, reduciendo el esfuerzo necesario para realizar la agregación de datos.'
  },
  {
    id: 'costos',
    title: 'Costos asociados al uso de índices',
    description: 'Aunque los índices mejoran el rendimiento de muchas consultas, también implican costos adicionales. Cada índice ocupa espacio de almacenamiento adicional y debe mantenerse actualizado cuando los datos cambian. Por ello, operaciones de inserción (INSERT), actualización (UPDATE) o eliminación (DELETE) pueden volverse ligeramente más lentas, ya que el sistema debe modificar también los índices asociados.'
  }
];

// --- COMPONENTES BASE ---

// Componente Card utilizando Grid
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

// --- COMPONENTES DE DIAGRAMAS (SVG Estáticos Conceptuales) ---

const DiagramIntro = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
      </marker>
    </defs>
    
    {/* Consulta */}
    <rect x="20" y="130" width="80" height="40" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
    <text x="60" y="155" textAnchor="middle" fontSize="14" fill="#1e3a8a" fontWeight="bold">Consulta</text>
    
    <path d="M 100 150 L 140 150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

    {/* Índice */}
    <path d="M 150 110 L 210 110 L 190 190 L 130 190 Z" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
    <text x="170" y="155" textAnchor="middle" fontSize="14" fill="#14532d" fontWeight="bold">Índice</text>
    <text x="170" y="170" textAnchor="middle" fontSize="10" fill="#14532d">(Ruta Rápida)</text>

    <path d="M 200 150 L 260 150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />

    {/* Tabla Grande */}
    <rect x="270" y="50" width="100" height="200" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <text x="320" y="40" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">Tabla Principal (Muchos datos)</text>
    
    {/* Filas de tabla simuladas */}
    {[...Array(10)].map((_, i) => (
      <line key={i} x1="280" y1={70 + i * 18} x2="360" y2={70 + i * 18} stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
    ))}

    {/* Fila objetivo resaltada */}
    <rect x="275" y="140" width="90" height="20" rx="2" fill="#bfdbfe" opacity="0.5" />
    <line x1="280" y1="150" x2="360" y2="150" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const DiagramReduccion = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
     <defs>
      <marker id="arrow-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
      </marker>
      <marker id="arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
      </marker>
    </defs>

    {/* Inicio */}
    <circle cx="50" cy="150" r="20" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
    <text x="50" y="155" textAnchor="middle" fontSize="12" fontWeight="bold">Inicio</text>

    {/* Ruta Larga (Sin índice) */}
    <path d="M 70 140 Q 150 40 250 80 T 350 140" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrow-red)" />
    <text x="200" y="70" textAnchor="middle" fontSize="12" fill="#b91c1c" fontWeight="bold">Escaneo Completo (Lento)</text>
    
    {/* Pasos en ruta larga */}
    {[80, 130, 180, 230, 280].map((x, i) => (
       <circle key={i} cx={x} cy={90 + (Math.sin(i)*15)} r="4" fill="#ef4444" />
    ))}

    {/* Ruta Corta (Con índice) */}
    <path d="M 70 160 Q 200 250 350 160" fill="none" stroke="#22c55e" strokeWidth="4" markerEnd="url(#arrow-green)" />
    <text x="200" y="240" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">Búsqueda por Índice (Rápido)</text>

    {/* Destino */}
    <rect x="340" y="130" width="40" height="40" rx="4" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
    <text x="360" y="155" textAnchor="middle" fontSize="12" fontWeight="bold">Dato</text>
  </svg>
);

const DiagramWhere = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
     <defs>
      <marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
      </marker>
    </defs>

    {/* Bloque SQL */}
    <rect x="20" y="40" width="220" height="80" rx="6" fill="#1e293b" />
    <text x="35" y="65" fontFamily="monospace" fontSize="14" fill="#e2e8f0">SELECT *</text>
    <text x="35" y="85" fontFamily="monospace" fontSize="14" fill="#e2e8f0">FROM estudiantes</text>
    <text x="35" y="105" fontFamily="monospace" fontSize="14" fill="#facc15" fontWeight="bold">WHERE id_estudiante = 105</text>
    
    {/* Flecha desde WHERE */}
    <path d="M 120 115 L 120 160 L 180 160" fill="none" stroke="#facc15" strokeWidth="3" markerEnd="url(#arrow-blue)" />

    {/* Índice B-Tree Simplificado */}
    <rect x="190" y="140" width="80" height="40" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
    <text x="230" y="160" textAnchor="middle" fontSize="12" fill="#14532d" fontWeight="bold">Índice: 105</text>
    <text x="230" y="172" textAnchor="middle" fontSize="9" fill="#14532d">Apunta a fila #42</text>

    <path d="M 270 160 L 310 160" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow-blue)" />

    {/* Tabla Resultante */}
    <rect x="320" y="100" width="70" height="150" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <rect x="325" y="150" width="60" height="20" rx="2" fill="#bfdbfe" /> {/* Fila encontrada */}
    <text x="355" y="164" textAnchor="middle" fontSize="10" fill="#1e3a8a" fontWeight="bold">Fila #42</text>
    
    {/* Filas vacías contexto */}
    <line x1="330" y1="120" x2="380" y2="120" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
    <line x1="330" y1="135" x2="380" y2="135" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
    <line x1="330" y1="185" x2="380" y2="185" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const DiagramOrderBy = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrow-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Índice Ordenado */}
    <rect x="50" y="40" width="100" height="220" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
    <text x="100" y="30" textAnchor="middle" fontSize="14" fill="#15803d" fontWeight="bold">Índice (Ordenado)</text>
    
    {['A - Ana', 'B - Beto', 'C - Carlos', 'D - Diana', 'E - Elena'].map((text, i) => (
      <g key={i}>
        <rect x="60" y="55 + i*40" width="80" height="30" rx="2" fill="#dcfce7" />
        <text x="100" y="75 + i*40" textAnchor="middle" fontSize="12" fill="#14532d">{text}</text>
        {/* Conexiones cruzadas hacia la tabla física desordenada */}
        <path d={`M 140 ${70 + i*40} Q 200 ${150} 260 ${70 + ((i * 3 + 2) % 5)*40}`} fill="none" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow-gray)" opacity="0.6"/>
      </g>
    ))}

    {/* Tabla Física */}
    <rect x="250" y="40" width="100" height="220" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <text x="300" y="30" textAnchor="middle" fontSize="14" fill="#475569" fontWeight="bold">Tabla Física</text>

    {['Dato #3', 'Dato #1', 'Dato #5', 'Dato #2', 'Dato #4'].map((text, i) => (
      <g key={i}>
        <rect x="260" y="55 + i*40" width="80" height="30" rx="2" fill="#e2e8f0" />
        <text x="300" y="75 + i*40" textAnchor="middle" fontSize="10" fill="#475569">{text}</text>
      </g>
    ))}
  </svg>
);

const DiagramGroupBy = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
    {/* Tabla sin agrupar */}
    <text x="100" y="40" textAnchor="middle" fontSize="14" fill="#475569" fontWeight="bold">Columna Indexada</text>
    
    {/* Grupo A */}
    <rect x="50" y="60" width="100" height="60" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
    <text x="100" y="80" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontWeight="bold">Ventas: Norte</text>
    <circle cx="70" cy="100" r="5" fill="#3b82f6"/>
    <circle cx="90" cy="100" r="5" fill="#3b82f6"/>
    <circle cx="110" cy="100" r="5" fill="#3b82f6"/>
    <circle cx="130" cy="100" r="5" fill="#3b82f6"/>

    {/* Grupo B */}
    <rect x="50" y="130" width="100" height="60" rx="4" fill="#fce7f3" stroke="#ec4899" strokeWidth="2" />
    <text x="100" y="150" textAnchor="middle" fontSize="12" fill="#831843" fontWeight="bold">Ventas: Sur</text>
    <circle cx="80" cy="170" r="5" fill="#ec4899"/>
    <circle cx="100" cy="170" r="5" fill="#ec4899"/>
    <circle cx="120" cy="170" r="5" fill="#ec4899"/>

    {/* Grupo C */}
    <rect x="50" y="200" width="100" height="60" rx="4" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
    <text x="100" y="220" textAnchor="middle" fontSize="12" fill="#713f12" fontWeight="bold">Ventas: Este</text>
    <circle cx="90" cy="240" r="5" fill="#eab308"/>
    <circle cx="110" cy="240" r="5" fill="#eab308"/>

    {/* Operación de Agrupación */}
    <path d="M 170 160 L 220 160" fill="none" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrow-gray)" />
    <text x="195" y="150" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">SUM()</text>

    {/* Resultados */}
    <text x="300" y="40" textAnchor="middle" fontSize="14" fill="#475569" fontWeight="bold">Resultado Agrupado</text>
    
    <rect x="250" y="75" width="100" height="30" rx="4" fill="#dbeafe" />
    <text x="300" y="95" textAnchor="middle" fontSize="12" fill="#1e3a8a" fontWeight="bold">Norte: 4</text>

    <rect x="250" y="145" width="100" height="30" rx="4" fill="#fce7f3" />
    <text x="300" y="165" textAnchor="middle" fontSize="12" fill="#831843" fontWeight="bold">Sur: 3</text>

    <rect x="250" y="215" width="100" height="30" rx="4" fill="#fef08a" />
    <text x="300" y="235" textAnchor="middle" fontSize="12" fill="#713f12" fontWeight="bold">Este: 2</text>
  </svg>
);

const DiagramCostos = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full max-w-md" xmlns="http://www.w3.org/2000/svg">
    {/* Base de la balanza */}
    <polygon points="200,80 170,260 230,260" fill="#94a3b8" />
    <circle cx="200" cy="80" r="8" fill="#475569" />

    {/* Brazo de la balanza (Inclinado ligeramente para indicar equilibrio de fuerzas opuestas) */}
    <line x1="80" y1="100" x2="320" y2="100" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
    
    {/* Cuerdas */}
    <line x1="80" y1="100" x2="60" y2="160" stroke="#94a3b8" strokeWidth="2" />
    <line x1="80" y1="100" x2="100" y2="160" stroke="#94a3b8" strokeWidth="2" />
    
    <line x1="320" y1="100" x2="300" y2="160" stroke="#94a3b8" strokeWidth="2" />
    <line x1="320" y1="100" x2="340" y2="160" stroke="#94a3b8" strokeWidth="2" />

    {/* Platillo Izquierdo (Beneficios) */}
    <path d="M 40 160 Q 80 180 120 160 Z" fill="#22c55e" opacity="0.8" />
    <rect x="55" y="120" width="50" height="35" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
    <text x="80" y="135" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="bold">Lecturas</text>
    <text x="80" y="148" textAnchor="middle" fontSize="10" fill="#15803d" fontWeight="bold">Rápidas</text>

    {/* Platillo Derecho (Costos) */}
    <path d="M 280 160 Q 320 180 360 160 Z" fill="#ef4444" opacity="0.8" />
    
    <rect x="290" y="90" width="60" height="25" rx="2" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
    <text x="320" y="105" textAnchor="middle" fontSize="9" fill="#b91c1c" fontWeight="bold">Almacenaje</text>

    <rect x="290" y="125" width="60" height="25" rx="2" fill="#fef2f2" stroke="#dc2626" strokeWidth="2"/>
    <text x="320" y="140" textAnchor="middle" fontSize="9" fill="#b91c1c" fontWeight="bold">Mantenimiento</text>

    {/* Títulos inferiores */}
    <text x="80" y="210" textAnchor="middle" fontSize="14" fill="#15803d" fontWeight="bold">Beneficios (SELECT)</text>
    <text x="320" y="210" textAnchor="middle" fontSize="14" fill="#b91c1c" fontWeight="bold">Costos (INSERT/UPDATE)</text>
  </svg>
);


// Componente Orquestador de Diagramas
const DiagramRender: React.FC<DiagramRenderProps> = ({ activeId }) => {
  return (
    <div className="w-full h-full grid place-items-center p-6 bg-slate-50">
      {activeId === 'intro' && <DiagramIntro />}
      {activeId === 'reduccion' && <DiagramReduccion />}
      {activeId === 'where' && <DiagramWhere />}
      {activeId === 'orderby' && <DiagramOrderBy />}
      {activeId === 'groupby' && <DiagramGroupBy />}
      {activeId === 'costos' && <DiagramCostos />}
    </div>
  );
};

// --- COMPONENTE DE DISEÑO PRINCIPAL (Strict Grid) ---

const LessonLayout: React.FC<{ activeTab: LessonSection }> = ({ activeTab }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 w-full max-w-7xl mx-auto items-start">
      
      {/* Panel Izquierdo: Textos */}
      <Card className="grid grid-rows-[auto_1fr] gap-4 h-full">
        <div className="p-6 border-b border-slate-100 bg-white grid gap-2">
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab.title}
          </h2>
          <div className="w-12 h-1 bg-blue-500 rounded"></div>
        </div>
        
        <div className="p-6 grid grid-rows-[auto_auto] gap-6 content-start">
          <p className="text-slate-600 leading-relaxed text-base">
            {activeTab.description}
          </p>
          
          {activeTab.codeSnippet && (
            <div className="bg-slate-900 rounded-lg p-4 grid gap-2 shadow-inner">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Ejemplo SQL</span>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                <code>{activeTab.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </Card>

      {/* Panel Derecho: Visualización */}
      <Card className="h-full min-h-[400px] grid grid-rows-[auto_1fr]">
     
        <DiagramRender activeId={activeTab.id} />
      </Card>
      
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(lessonData[0].id);
  const activeTab = lessonData.find(tab => tab.id === activeTabId) || lessonData[0];

  return (
    <div className="min-h-screen bg-slate-100 grid grid-rows-[auto_1fr] font-sans">
      
      {/* Header y Sistema de Pestañas */}
      <header className="bg-white shadow-sm border-b border-slate-200 z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-4 py-6">
          <div className="grid gap-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Propósito de los Índices en Bases de Datos
            </h1>
          </div>
          
          {/* Navegación por Tabs (Grid-based) */}
          <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
            {lessonData.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`
                    grid place-items-center text-center px-3 py-3 rounded-lg text-sm font-semibold transition-all duration-200 border-2
                    ${isActive 
                      ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' 
                      : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.title.split('(')[0].trim()} {/* Simplificamos el título en la pestaña */}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="p-4 sm:p-6 lg:p-8 grid place-items-start pt-8">
        <LessonLayout activeTab={activeTab} />
      </main>

    </div>
  );
}