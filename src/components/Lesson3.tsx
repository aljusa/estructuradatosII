import React, { useState,  } from 'react';
import { 
  Database, BookOpen, TableProperties, Columns, 
  Key, Users, Settings, Play, CheckCircle2, 
  ArrowRight, FileText, Activity
} from 'lucide-react';

// --- Types & Interfaces ---

interface TabData {
  id: string;
  title: string;
  shortTitle: string;
  description: React.ReactNode;
  DiagramRender: React.FC;
}

interface LessonLayoutProps {
  title: string;
  tabs: TabData[];
  activeTabId: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

// --- Reusable Components ---

const Card: React.FC<CardProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`grid auto-rows-max bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center p-4 border-b border-slate-100 bg-slate-50/50">
          {icon && <div className="text-blue-600 grid place-items-center">{icon}</div>}
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="grid p-6 gap-4 text-slate-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTabId, onTabChange, children }) => {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="grid auto-rows-max bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        {/* Title Area */}
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center px-8 py-5 border-b border-slate-100">
          <div className="grid place-items-center w-10 h-10 bg-blue-100 text-blue-700 rounded-lg">
            <Database size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        </div>
        
        {/* Navigation Tabs (CSS Grid strictly) */}
        <nav className="grid grid-flow-col auto-cols-max gap-1 px-8 pt-4 items-end bg-slate-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`grid place-items-center px-6 py-3 rounded-t-lg font-medium transition-colors border-t border-x ${
                activeTabId === tab.id
                  ? 'bg-white border-slate-200 text-blue-600 shadow-[0_1px_0_white] translate-y-[1px]'
                  : 'bg-slate-100 border-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-700'
              }`}
            >
              {tab.shortTitle}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="grid p-8 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 max-w-7xl mx-auto w-full items-start">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- Diagram Components ---

// Diagrama 1: Estático
const StaticCatalogDiagram: React.FC = () => {
  return (
    <Card title="Diagrama: Arquitectura del Catálogo" icon={<BookOpen size={20} />} className="h-full">
      <div className="grid place-items-center p-8 bg-slate-50 rounded-lg border border-slate-100 min-h-[400px]">
        <div className="grid grid-cols-[1fr_auto_1fr] gap-6 items-center w-full max-w-2xl">
          
          {/* SGBD */}
          <div className="grid auto-rows-max gap-3 justify-items-center p-6 bg-white border-2 border-blue-200 rounded-xl shadow-md z-10">
            <Database size={48} className="text-blue-500" />
            <span className="font-bold text-slate-700 text-center text-lg">SGBD<br/><span className="text-sm font-normal text-slate-500">(Motor de Base de Datos)</span></span>
          </div>

          {/* Arrow */}
          <div className="grid place-items-center text-blue-400">
            <ArrowRight size={40} className="stroke-[1.5]" />
          </div>

          {/* Catalog */}
          <div className="grid auto-rows-max gap-4 p-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl shadow-md">
            <div className="grid grid-cols-[auto_1fr] gap-3 items-center border-b border-indigo-200 pb-3">
              <BookOpen size={28} className="text-indigo-600" />
              <span className="font-bold text-indigo-800 text-lg">Catálogo del Sistema</span>
            </div>
            
            <div className="grid auto-rows-max gap-2 text-sm">
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-white p-2 rounded border border-indigo-100">
                <TableProperties size={16} className="text-indigo-500" />
                <span>Tablas existentes</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-white p-2 rounded border border-indigo-100">
                <Columns size={16} className="text-indigo-500" />
                <span>Columnas y Tipos</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-white p-2 rounded border border-indigo-100">
                <Key size={16} className="text-indigo-500" />
                <span>Restricciones (Claves)</span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-2 items-center bg-white p-2 rounded border border-indigo-100">
                <Users size={16} className="text-indigo-500" />
                <span>Usuarios y Accesos</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Card>
  );
};

// Diagrama 2: Interactivo
const InteractiveCatalogDiagram: React.FC = () => {
  const [selectedMeta, setSelectedMeta] = useState<'tables' | 'columns' | 'constraints' | 'users'>('tables');

  const metadataInfo = {
    tables: {
      title: 'Metadatos de Tablas',
      icon: <TableProperties size={24} className="text-blue-500" />,
      table: 'sys_tables',
      data: [
        { id: 1, name: 'empleados', schema: 'public', rows: 150 },
        { id: 2, name: 'departamentos', schema: 'public', rows: 12 },
        { id: 3, name: 'salarios', schema: 'rrhh', rows: 450 }
      ]
    },
    columns: {
      title: 'Metadatos de Columnas',
      icon: <Columns size={24} className="text-emerald-500" />,
      table: 'sys_columns',
      data: [
        { col: 'id_empleado', type: 'INTEGER', length: 4, nullable: 'No' },
        { col: 'nombre', type: 'VARCHAR', length: 100, nullable: 'No' },
        { col: 'fecha_ingreso', type: 'DATE', length: 8, nullable: 'Sí' }
      ]
    },
    constraints: {
      title: 'Restricciones y Claves',
      icon: <Key size={24} className="text-amber-500" />,
      table: 'sys_constraints',
      data: [
        { name: 'pk_empleado', type: 'PRIMARY KEY', table: 'empleados' },
        { name: 'fk_depto', type: 'FOREIGN KEY', table: 'empleados' },
        { name: 'chk_salario', type: 'CHECK', table: 'salarios' }
      ]
    },
    users: {
      title: 'Usuarios y Permisos',
      icon: <Users size={24} className="text-purple-500" />,
      table: 'sys_users',
      data: [
        { user: 'admin', role: 'DBA', status: 'Activo' },
        { user: 'app_backend', role: 'ReadWrite', status: 'Activo' },
        { user: 'analista', role: 'ReadOnly', status: 'Inactivo' }
      ]
    }
  };

  const currentData = metadataInfo[selectedMeta];

  return (
    <Card title="Diagrama: Explorador del Catálogo" icon={<Activity size={20} />} className="h-full">
      <div className="grid grid-cols-[180px_1fr] gap-6 min-h-[400px]">
        
        {/* Sidebar Controls */}
        <div className="grid auto-rows-max gap-2 pr-4 border-r border-slate-200">
          <button 
            onClick={() => setSelectedMeta('tables')}
            className={`grid grid-cols-[auto_1fr] gap-3 items-center p-3 rounded-lg text-left transition-colors ${selectedMeta === 'tables' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-slate-50 text-slate-600 border border-transparent'}`}
          >
            <TableProperties size={18} /> <span className="text-sm font-medium">Tablas</span>
          </button>
          <button 
            onClick={() => setSelectedMeta('columns')}
            className={`grid grid-cols-[auto_1fr] gap-3 items-center p-3 rounded-lg text-left transition-colors ${selectedMeta === 'columns' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'hover:bg-slate-50 text-slate-600 border border-transparent'}`}
          >
            <Columns size={18} /> <span className="text-sm font-medium">Columnas</span>
          </button>
          <button 
            onClick={() => setSelectedMeta('constraints')}
            className={`grid grid-cols-[auto_1fr] gap-3 items-center p-3 rounded-lg text-left transition-colors ${selectedMeta === 'constraints' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'hover:bg-slate-50 text-slate-600 border border-transparent'}`}
          >
            <Key size={18} /> <span className="text-sm font-medium">Restricciones</span>
          </button>
          <button 
            onClick={() => setSelectedMeta('users')}
            className={`grid grid-cols-[auto_1fr] gap-3 items-center p-3 rounded-lg text-left transition-colors ${selectedMeta === 'users' ? 'bg-purple-50 text-purple-700 border border-purple-200' : 'hover:bg-slate-50 text-slate-600 border border-transparent'}`}
          >
            <Users size={18} /> <span className="text-sm font-medium">Usuarios</span>
          </button>
        </div>

        {/* Content View */}
        <div className="grid grid-rows-[auto_1fr] gap-4 bg-slate-50 rounded-lg border border-slate-200 p-6 overflow-hidden">
          <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center border-b border-slate-200 pb-4">
            {currentData.icon}
            <div className="grid auto-rows-max">
              <h4 className="font-bold text-slate-800">{currentData.title}</h4>
              <span className="text-xs text-slate-500 font-mono">SELECT * FROM {currentData.table};</span>
            </div>
          </div>
          
          <div className="grid auto-rows-max gap-1 overflow-x-auto">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-200/50 text-slate-600 text-xs uppercase">
                  <tr>
                    {Object.keys(currentData.data[0]).map(key => (
                      <th key={key} className="px-4 py-2 font-semibold">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentData.data.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      {Object.values(row).map((val, i) => (
                        <td key={i} className="px-4 py-3 text-slate-700">{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>

      </div>
    </Card>
  );
};

// Diagrama 3: Dinámico
const DynamicUpdateDiagram: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const runSimulation = () => {
    if (step !== 0) return;
    setStep(1); // Execute Query
    setTimeout(() => setStep(2), 1500); // Updating Catalog
    setTimeout(() => setStep(3), 3500); // Done
    setTimeout(() => setStep(0), 6500); // Reset after a while
  };

  return (
    <Card title="Diagrama: Actualización Dinámica" icon={<Settings size={20} />} className="h-full">
      <div className="grid grid-rows-[auto_1fr] gap-6 min-h-[400px]">
        
        {/* Controls and Query */}
        <div className="grid grid-cols-[1fr_auto] gap-4 items-center bg-slate-800 text-slate-300 p-4 rounded-lg font-mono text-sm shadow-inner">
          <div className="grid auto-rows-max gap-1">
            <span className="text-pink-400">CREATE TABLE</span> <span className="text-green-300">clientes</span> (
            <div className="grid auto-rows-max pl-4 text-slate-400">
              <span>id <span className="text-blue-300">INT</span> PRIMARY KEY,</span>
              <span>nombre <span className="text-blue-300">VARCHAR(100)</span></span>
            </div>
            );
          </div>
          <button 
            onClick={runSimulation}
            disabled={step !== 0}
            className="grid grid-cols-[auto_auto] gap-2 items-center bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white px-4 py-2 rounded-md font-sans font-medium transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            {step === 0 ? <><Play size={16} /> Ejecutar</> : <><Activity size={16} className="animate-spin" /> Procesando</>}
          </button>
        </div>

        {/* Dynamic Visualization area */}
        <div className="grid grid-cols-2 gap-8 items-center pt-4 relative">
          
          {/* User / Execution context */}
          <div className={`grid auto-rows-max gap-3 p-5 rounded-xl border-2 transition-all duration-500 justify-items-center ${step >= 1 ? 'bg-blue-50 border-blue-300' : 'bg-white border-slate-200 text-slate-400'}`}>
             <FileText size={32} className={step >= 1 ? 'text-blue-500' : 'text-slate-300'} />
             <span className="font-semibold text-center">Motor SGBD<br/><span className="text-xs font-normal">Crea estructura física</span></span>
             
             {step >= 1 && (
               <div className="grid grid-cols-[auto_1fr] gap-2 items-center text-xs text-blue-700 bg-blue-100 px-3 py-1 rounded-full mt-2 animate-pulse">
                 <CheckCircle2 size={14} /> Tabla 'clientes' creada
               </div>
             )}
          </div>

          {/* Catalog context */}
          <div className={`grid auto-rows-max gap-3 p-5 rounded-xl border-2 transition-all duration-500 justify-items-center relative ${step >= 2 ? 'bg-indigo-50 border-indigo-400' : 'bg-white border-slate-200 text-slate-400'}`}>
             <BookOpen size={32} className={step >= 2 ? 'text-indigo-600' : 'text-slate-300'} />
             <span className="font-semibold text-center">Catálogo del Sistema<br/><span className="text-xs font-normal">Actualización automática</span></span>
             
             <div className="grid auto-rows-max gap-2 mt-2 w-full">
               <div className={`grid grid-cols-[auto_1fr] gap-2 items-center text-xs px-2 py-1 rounded border transition-all duration-300 ${step >= 2 ? 'bg-green-100 border-green-200 text-green-800' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <TableProperties size={12} /> +1 Fila (sys_tables)
               </div>
               <div className={`grid grid-cols-[auto_1fr] gap-2 items-center text-xs px-2 py-1 rounded border transition-all duration-300 delay-300 ${step >= 2 ? 'bg-green-100 border-green-200 text-green-800' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <Columns size={12} /> +2 Filas (sys_columns)
               </div>
               <div className={`grid grid-cols-[auto_1fr] gap-2 items-center text-xs px-2 py-1 rounded border transition-all duration-300 delay-500 ${step >= 2 ? 'bg-green-100 border-green-200 text-green-800' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                  <Key size={12} /> +1 Fila (sys_constraints)
               </div>
             </div>

             {/* Connection Line & Animation */}
             {step === 2 && (
               <div className="absolute top-1/2 -left-8 w-8 h-0.5 bg-indigo-400 -translate-y-1/2 animate-pulse">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-indigo-400 rotate-45 transform origin-center"></div>
               </div>
             )}
          </div>

          {/* Success Overlay */}
          {step === 3 && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm grid place-items-center rounded-xl z-10">
              <div className="grid auto-rows-max justify-items-center gap-3 bg-white p-6 rounded-2xl shadow-lg border border-emerald-100">
                <CheckCircle2 size={48} className="text-emerald-500" />
                <span className="font-bold text-emerald-800 text-lg">Catálogo Sincronizado</span>
                <span className="text-sm text-slate-500 text-center">La estructura está lista para ser consultada.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </Card>
  );
};


// --- Main Application ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('concepto');

  const tabsData: TabData[] = [
    {
      id: 'concepto',
      shortTitle: 'Concepto',
      title: '1. Concepto del catálogo del sistema',
      description: (
        <>
          <p>
            El <strong>catálogo del sistema</strong> es una colección de tablas internas que almacena información sobre la estructura de una base de datos. Estas tablas contienen <em>metadatos</em>, es decir, información que describe otros datos.
          </p>
          <p>
            Cuando un Sistema de Gestión de Bases de Datos (SGBD) necesita ejecutar una consulta, primero consulta el catálogo para comprender cómo está organizada la base de datos.
          </p>
          <div className="grid auto-rows-max gap-2 mt-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800">El catálogo permite al sistema conocer:</h4>
            <ul className="grid auto-rows-max gap-2 text-blue-900/80 pl-2">
              <li className="grid grid-cols-[auto_1fr] gap-2 items-start"><Database size={16} className="mt-1 opacity-70"/> qué tablas existen en la base de datos</li>
              <li className="grid grid-cols-[auto_1fr] gap-2 items-start"><Columns size={16} className="mt-1 opacity-70"/> qué columnas tiene cada tabla y sus tipos</li>
              <li className="grid grid-cols-[auto_1fr] gap-2 items-start"><Key size={16} className="mt-1 opacity-70"/> qué restricciones y claves existen</li>
              <li className="grid grid-cols-[auto_1fr] gap-2 items-start"><Users size={16} className="mt-1 opacity-70"/> qué usuarios tienen acceso a los datos</li>
            </ul>
          </div>
          <p className="mt-2 text-sm text-slate-500 italic">
            Gracias a esta información, el sistema puede interpretar correctamente las consultas SQL y administrar los datos de manera eficiente.
          </p>
        </>
      ),
      DiagramRender: StaticCatalogDiagram,
    },
    {
      id: 'informacion',
      shortTitle: 'Información Almacenada',
      title: '2. Información almacenada en el catálogo',
      description: (
        <>
          <p>
            El catálogo del sistema almacena diversos tipos de información estructural sobre la base de datos. Esta información permite que el SGBD conozca la organización completa del sistema.
          </p>
          <div className="grid gap-4 mt-2">
            <div className="grid auto-rows-max gap-1">
              <h4 className="font-semibold text-slate-800 grid grid-cols-[auto_1fr] gap-2 items-center"><TableProperties size={18} className="text-blue-500"/> Tablas del sistema</h4>
              <p className="text-sm pl-6">Nombre de las tablas y el esquema al que pertenecen.</p>
            </div>
            <div className="grid auto-rows-max gap-1">
              <h4 className="font-semibold text-slate-800 grid grid-cols-[auto_1fr] gap-2 items-center"><Columns size={18} className="text-emerald-500"/> Columnas</h4>
              <p className="text-sm pl-6">Nombre de cada columna, tipo de dato y longitud.</p>
            </div>
            <div className="grid auto-rows-max gap-1">
              <h4 className="font-semibold text-slate-800 grid grid-cols-[auto_1fr] gap-2 items-center"><Key size={18} className="text-amber-500"/> Restricciones</h4>
              <p className="text-sm pl-6">Claves primarias, claves foráneas y reglas de integridad.</p>
            </div>
            <div className="grid auto-rows-max gap-1">
              <h4 className="font-semibold text-slate-800 grid grid-cols-[auto_1fr] gap-2 items-center"><Settings size={18} className="text-indigo-500"/> Objetos adicionales</h4>
              <p className="text-sm pl-6">Índices, vistas y procedimientos almacenados.</p>
            </div>
            <div className="grid auto-rows-max gap-1">
              <h4 className="font-semibold text-slate-800 grid grid-cols-[auto_1fr] gap-2 items-center"><Users size={18} className="text-purple-500"/> Usuarios y permisos</h4>
              <p className="text-sm pl-6">Cuentas de usuario y los privilegios asignados.</p>
            </div>
          </div>
        </>
      ),
      DiagramRender: InteractiveCatalogDiagram,
    },
    {
      id: 'importancia',
      shortTitle: 'Importancia y Administración',
      title: '3. Importancia del catálogo en la administración',
      description: (
        <>
          <p>
            El catálogo del sistema es esencial para el funcionamiento interno de un SGBD, ya que centraliza la información estructural de la base de datos.
          </p>
          <div className="grid auto-rows-max gap-4 mt-4">
            <div className="grid grid-cols-[auto_1fr] gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
              <Settings className="text-slate-600 mt-0.5" size={20} />
              <div className="grid auto-rows-max">
                <span className="font-semibold text-slate-800">Administración del sistema</span>
                <span className="text-sm">Permite conocer la estructura completa de la base de datos.</span>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
              <Activity className="text-emerald-600 mt-0.5" size={20} />
              <div className="grid auto-rows-max">
                <span className="font-semibold text-slate-800">Optimización de consultas</span>
                <span className="text-sm">El sistema utiliza estadísticas del catálogo para elegir el mejor plan de ejecución.</span>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
              <Users className="text-blue-600 mt-0.5" size={20} />
              <div className="grid auto-rows-max">
                <span className="font-semibold text-slate-800">Control de seguridad</span>
                <span className="text-sm">Almacena información detallada sobre usuarios y permisos otorgados.</span>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3 bg-white p-3 border border-slate-200 rounded-lg shadow-sm">
              <CheckCircle2 className="text-indigo-600 mt-0.5" size={20} />
              <div className="grid auto-rows-max">
                <span className="font-semibold text-slate-800">Mantenimiento de integridad</span>
                <span className="text-sm">Registra restricciones que deben cumplirse rigurosamente al manipular datos.</span>
              </div>
            </div>
          </div>
          <p className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 text-amber-900 rounded-r-lg text-sm">
            <strong>Dato clave:</strong> En la práctica, cuando se crea una tabla, se agrega una vista o se asignan permisos a un usuario, el sistema actualiza automáticamente el catálogo de forma transparente.
          </p>
        </>
      ),
      DiagramRender: DynamicUpdateDiagram,
    }
  ];

  const currentTabData = tabsData.find(tab => tab.id === activeTab) || tabsData[0];
  const CurrentDiagram = currentTabData.DiagramRender;

  return (
    <LessonLayout 
      title="Sistema de Gestión de Bases de Datos (SGBD) y El Catálogo del Sistema" 
      tabs={tabsData} 
      activeTabId={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Panel Izquierdo: Descripción */}
      <div className="grid auto-rows-max h-full">
        <Card title={currentTabData.title} icon={<FileText size={20} />} className="h-full border-blue-100 shadow-md">
          {currentTabData.description}
        </Card>
      </div>

      {/* Panel Derecho: Diagrama */}
      <div className="grid h-full min-h-[500px]">
        <CurrentDiagram />
      </div>
    </LessonLayout>
  );
};

export default App;