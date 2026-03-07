import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Server, 
  Video, 
  Thermometer, 
  Flame, 
  BatteryCharging,
  Users,
  Key,
  Database,
  Lock,
  HardDrive,
  Cloud,
  RotateCcw,
  CheckCircle2,
  FileSearch,
  BookOpen
} from 'lucide-react';

// --- TYPES & INTERFACES ---

type TabId = 'physical' | 'logical' | 'data';

interface SectionData {
  id: TabId;
  tabTitle: string;
  title: string;
  description: string[];
  listTitle: string;
  listItems: string[];
  conclusion: string;
  diagramTitle: string;
  diagramDescription: string;
}

// --- DATA ---

const LESSON_DATA: Record<TabId, SectionData> = {
  physical: {
    id: 'physical',
    tabTitle: '1. Seguridad Física',
    title: 'Seguridad Física',
    description: [
      'La seguridad física protege los dispositivos y la infraestructura donde se almacenan las bases de datos.',
      'Este tipo de seguridad busca prevenir daños causados por factores externos o accesos físicos no autorizados.'
    ],
    listTitle: 'Medidas más comunes:',
    listItems: [
      'Control de acceso a centros de datos',
      'Sistemas de videovigilancia',
      'Sistemas de energía de respaldo',
      'Protección contra incendios',
      'Control de temperatura y humedad'
    ],
    conclusion: 'Estas medidas garantizan que los servidores donde se almacenan las bases de datos permanezcan operativos y protegidos.',
    diagramTitle: 'Centro de Datos Seguro',
    diagramDescription: 'Diagrama estático que ilustra las diferentes capas de seguridad física implementadas en un centro de datos moderno para proteger la infraestructura.'
  },
  logical: {
    id: 'logical',
    tabTitle: '2. Seguridad Lógica',
    title: 'Seguridad Lógica',
    description: [
      'La seguridad lógica protege el acceso a la información a nivel de software.',
      'Este tipo de seguridad se implementa dentro del SGBD (Sistema Gestor de Bases de Datos).'
    ],
    listTitle: 'Mecanismos implementados:',
    listItems: [
      'Autenticación de usuarios',
      'Control de permisos',
      'Roles de acceso',
      'Auditoría de actividades'
    ],
    conclusion: 'Gracias a estas medidas, el sistema puede controlar quién accede a los datos y qué operaciones puede realizar.',
    diagramTitle: 'Flujo de Autenticación y Autorización',
    diagramDescription: 'Diagrama dinámico que muestra a los usuarios solicitando acceso y el sistema verificando sus credenciales y permisos antes de permitir operaciones en la base de datos.'
  },
  data: {
    id: 'data',
    tabTitle: '3. Seguridad de Datos',
    title: 'Seguridad de Datos',
    description: [
      'La seguridad de los datos se enfoca en proteger la información almacenada dentro de la base de datos.',
      'Esto incluye medidas destinadas a preservar la confidencialidad, integridad y disponibilidad de los datos (Triada CIA).'
    ],
    listTitle: 'Técnicas más utilizadas:',
    listItems: [
      'Cifrado de datos',
      'Copias de seguridad (Backups)',
      'Control de transacciones',
      'Mecanismos de recuperación ante fallos'
    ],
    conclusion: 'Estas estrategias garantizan que la información pueda recuperarse incluso ante errores o fallas críticas del sistema.',
    diagramTitle: 'Ciclo de Protección de Datos',
    diagramDescription: 'Diagrama dinámico que ilustra el ciclo de vida de la protección de la información: desde su almacenamiento seguro, pasando por el cifrado, el respaldo y la capacidad de recuperación.'
  }
};

// --- COMPONENTS ---

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const LessonLayout: React.FC<{
  title: string;
  tabs: TabId[];
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  children: React.ReactNode;
}> = ({ title, tabs, activeTab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 grid grid-rows-[auto_1fr] font-sans text-slate-800">
      {/* Header */}
      <header className="bg-slate-900 text-white grid grid-cols-1 place-content-center p-6 shadow-md">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-[auto_1fr] gap-4 items-center">
          <Shield className="w-8 h-8 text-blue-400" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-rows-[auto_1fr] gap-6">
        
        {/* Navigation Tabs (CSS Grid strictly used) */}
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-slate-200/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`
                grid place-items-center py-3 px-4 rounded-md text-sm md:text-base font-semibold transition-all duration-200
                ${activeTab === tab 
                  ? 'bg-white text-blue-700 shadow-sm border-b-2 border-blue-600' 
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}
              `}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {LESSON_DATA[tab].tabTitle}
            </button>
          ))}
        </nav>

        {/* Content Render */}
        {children}
      </main>
    </div>
  );
};

// --- DIAGRAM COMPONENTS ---

const PhysicalDiagram: React.FC = () => (
  <div className="w-full h-full min-h-[400px] grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-4 p-8 bg-slate-50 relative">
    {/* Conexiones simuladas con bordes de Grid */}
    
    <div className="grid place-items-center text-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-slate-200 z-10 transition-transform hover:scale-105">
      <Video className="w-10 h-10 text-slate-700" />
      <span className="text-sm font-medium">Videovigilancia</span>
    </div>
    
    <div className="grid place-items-end justify-center p-4">
       {/* Decorative dashed line vertical */}
       <div className="w-1 h-full border-l-2 border-dashed border-slate-300"></div>
    </div>

    <div className="grid place-items-center text-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-slate-200 z-10 transition-transform hover:scale-105">
      <Thermometer className="w-10 h-10 text-orange-500" />
      <span className="text-sm font-medium">Control Temp/Humedad</span>
    </div>

    <div className="grid place-items-center items-end p-4">
        {/* Decorative dashed line horizontal */}
        <div className="w-full h-1 border-t-2 border-dashed border-slate-300"></div>
    </div>

    <div className="grid place-items-center text-center p-6 bg-blue-50 rounded-xl shadow-md border-2 border-blue-200 z-20">
      <Server className="w-16 h-16 text-blue-600 mb-2" />
      <span className="font-bold text-blue-900">Centro de Datos</span>
      <span className="text-xs text-blue-700 mt-1">Infraestructura Crítica</span>
    </div>

    <div className="grid place-items-center items-start p-4">
        {/* Decorative dashed line horizontal */}
        <div className="w-full h-1 border-t-2 border-dashed border-slate-300"></div>
    </div>

    <div className="grid place-items-center text-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-slate-200 z-10 transition-transform hover:scale-105">
      <Flame className="w-10 h-10 text-red-500" />
      <span className="text-sm font-medium">Protección Incendios</span>
    </div>

    <div className="grid place-items-start justify-center p-4">
        {/* Decorative dashed line vertical */}
        <div className="w-1 h-full border-l-2 border-dashed border-slate-300"></div>
    </div>

    <div className="grid place-items-center text-center gap-2 p-4 bg-white rounded-lg shadow-sm border border-slate-200 z-10 transition-transform hover:scale-105">
      <BatteryCharging className="w-10 h-10 text-green-500" />
      <span className="text-sm font-medium">Energía de Respaldo</span>
    </div>
  </div>
);

const LogicalDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] grid grid-cols-3 items-center gap-4 p-8 bg-slate-50">
      
      {/* Users / Requester */}
      <div className="grid gap-6 place-items-center">
        <div className={`grid place-items-center gap-2 p-4 rounded-lg border-2 transition-all duration-500 ${step === 0 ? 'border-blue-500 bg-blue-50 scale-110' : 'border-slate-200 bg-white'}`}>
          <Users className="w-12 h-12 text-slate-700" />
          <span className="text-sm font-bold">Usuario / App</span>
          <span className="text-xs text-slate-500 text-center">Solicita acceso</span>
        </div>
      </div>

      {/* Authentication / Authorization SGBD */}
      <div className="grid place-items-center gap-4 relative">
        <div className={`w-full h-2 rounded-full absolute top-1/2 -z-10 transition-colors duration-500 ${step >= 1 ? 'bg-blue-400' : 'bg-slate-200'}`}></div>
        
        <div className={`grid grid-rows-[auto_auto] gap-2 place-items-center p-6 rounded-full border-4 transition-all duration-500 bg-white z-10
          ${step === 1 ? 'border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-110' : 
            step > 1 ? 'border-green-500' : 'border-slate-300'}`}
        >
          {step > 1 ? <CheckCircle2 className="w-12 h-12 text-green-500" /> : <Key className="w-12 h-12 text-slate-600" />}
        </div>
        
        <div className="grid gap-1 text-center bg-white p-3 rounded shadow-sm border border-slate-100 z-10">
          <span className="text-sm font-bold text-slate-800">SGBD Lógico</span>
          <span className="text-xs text-slate-600 flex items-center gap-1 justify-center"><FileSearch className="w-3 h-3"/> Auditoría</span>
          <span className="text-xs text-slate-600">Roles y Permisos</span>
        </div>
      </div>

      {/* Database */}
      <div className="grid gap-6 place-items-center relative">
         <div className={`w-full h-2 rounded-full absolute top-1/2 left-[-100%] -z-10 transition-colors duration-500 ${step >= 2 ? 'bg-green-400' : 'bg-slate-200'}`}></div>
         
        <div className={`grid place-items-center gap-2 p-4 rounded-lg border-2 transition-all duration-500 ${step === 2 || step === 3 ? 'border-green-500 bg-green-50 scale-110' : 'border-slate-200 bg-white'}`}>
          <Database className={`w-12 h-12 ${step >= 2 ? 'text-green-600' : 'text-slate-400'}`} />
          <span className="text-sm font-bold">Base de Datos</span>
          <span className="text-xs text-slate-500 text-center">Información protegida</span>
        </div>
      </div>

    </div>
  );
};

const DataDiagram: React.FC = () => {
    return (
        <div className="w-full h-full min-h-[400px] grid place-items-center p-8 bg-slate-50 relative">
            
            {/* Contenedor del ciclo en Grid 2x2 */}
            <div className="grid grid-cols-2 grid-rows-2 gap-x-24 gap-y-20 relative">
                
                {/* Elemento 1: Almacenamiento */}
                <div className="grid place-items-center text-center gap-3 relative group">
                    <div className="p-5 bg-white rounded-full shadow-md border-2 border-slate-200 group-hover:border-blue-400 transition-colors">
                        <HardDrive className="w-10 h-10 text-slate-700" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">1. Almacenamiento</p>
                        <p className="text-xs text-slate-500">Datos en disco</p>
                    </div>
                    {/* Flecha derecha */}
                    <div className="absolute top-8 -right-16 text-slate-300 animate-pulse">
                        <span className="text-2xl">➔</span>
                    </div>
                </div>

                {/* Elemento 2: Cifrado */}
                <div className="grid place-items-center text-center gap-3 relative group">
                    <div className="p-5 bg-white rounded-full shadow-md border-2 border-slate-200 group-hover:border-purple-400 transition-colors">
                        <Lock className="w-10 h-10 text-purple-600" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">2. Cifrado</p>
                        <p className="text-xs text-slate-500">Confidencialidad</p>
                    </div>
                    {/* Flecha abajo */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-300 animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <span className="text-2xl rotate-90 inline-block">➔</span>
                    </div>
                </div>

                {/* Elemento 4: Recuperación (Abajo izquierda) */}
                <div className="grid place-items-center text-center gap-3 relative group">
                    <div className="p-5 bg-white rounded-full shadow-md border-2 border-slate-200 group-hover:border-green-400 transition-colors">
                        <RotateCcw className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">4. Recuperación</p>
                        <p className="text-xs text-slate-500">Ante fallos (Disponibilidad)</p>
                    </div>
                     {/* Flecha arriba */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-slate-300 animate-pulse" style={{ animationDelay: '1.5s' }}>
                        <span className="text-2xl -rotate-90 inline-block">➔</span>
                    </div>
                </div>

                {/* Elemento 3: Respaldo (Abajo derecha) */}
                <div className="grid place-items-center text-center gap-3 relative group">
                    <div className="p-5 bg-white rounded-full shadow-md border-2 border-slate-200 group-hover:border-blue-400 transition-colors">
                        <Cloud className="w-10 h-10 text-blue-500" />
                    </div>
                    <div>
                        <p className="font-bold text-sm">3. Respaldo</p>
                        <p className="text-xs text-slate-500">Copias de seguridad</p>
                    </div>
                     {/* Flecha izquierda */}
                     <div className="absolute top-8 -left-16 text-slate-300 animate-pulse" style={{ animationDelay: '1s' }}>
                        <span className="text-2xl rotate-180 inline-block">➔</span>
                    </div>
                </div>

            </div>
            
            {/* Centro del ciclo */}
            <div className="absolute grid place-items-center text-center w-32 h-32 bg-slate-100 rounded-full border-4 border-dashed border-slate-300 opacity-50 z-0">
                <span className="font-bold text-slate-400 text-sm">Triada<br/>CIA</span>
            </div>
        </div>
    );
};

const DiagramRender: React.FC<{ type: TabId }> = ({ type }) => {
  switch (type) {
    case 'physical':
      return <PhysicalDiagram />;
    case 'logical':
      return <LogicalDiagram />;
    case 'data':
      return <DataDiagram />;
    default:
      return null;
  }
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('physical');
  const activeData = LESSON_DATA[activeTab];

  return (
    <LessonLayout
      title="Tipos de Seguridad en Bases de Datos"
      tabs={['physical', 'logical', 'data']}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Layout principal del contenido usando Grid.
        1 columna en móvil, 12 columnas en desktop.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Panel Izquierdo: Texto y Explicación (4 columnas) */}
        <section className="lg:col-span-4 grid gap-4 h-max">
          <Card className="p-6 grid gap-6">
            <header className="grid grid-cols-[auto_1fr] gap-3 items-center border-b border-slate-100 pb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-800">{activeData.title}</h2>
            </header>
            
            <div className="grid gap-3 text-slate-600 leading-relaxed text-sm md:text-base">
              {activeData.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 grid gap-3">
              <h3 className="font-semibold text-slate-800 text-sm">{activeData.listTitle}</h3>
              <ul className="grid gap-2">
                {activeData.listItems.map((item, index) => (
                  <li key={index} className="grid grid-cols-[auto_1fr] gap-2 text-sm text-slate-700 items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="text-sm font-medium text-slate-700 italic">
                {activeData.conclusion}
              </p>
            </div>
          </Card>
        </section>

        {/* Panel Derecho: Visualización de Diagrama (8 columnas) */}
        <section className="lg:col-span-8 grid grid-rows-[auto_auto_1fr] gap-4 h-full">
          <div className="grid gap-1 px-2">
            <h2 className="text-2xl font-bold text-slate-800">{activeData.diagramTitle}</h2>
            <p className="text-slate-500 text-sm md:text-base">{activeData.diagramDescription}</p>
          </div>
          
          <Card className="h-full min-h-[500px] grid">
             <DiagramRender type={activeTab} />
          </Card>
        </section>

      </div>
    </LessonLayout>
  );
}