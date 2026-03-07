import React, { useState,  } from 'react';
import { Shield, Database, User, Lock, Key, CheckCircle, XCircle, Users, Activity, Settings, Server } from 'lucide-react';

// --- Tipos e Interfaces ---
interface Tab {
  id: string;
  label: string;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface LessonLayoutProps {
  title: string;
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
}

// --- Componentes Base ---

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const LessonLayout: React.FC<LessonLayoutProps> = ({ title, tabs, activeTab, onTabChange, children }) => {
  return (
    <div className="min-h-screen bg-slate-50 grid grid-rows-[auto_auto_1fr] font-sans text-slate-800">
      {/* Header con Title */}
      <header className="bg-slate-900 text-white p-6 grid place-items-center md:place-items-start shadow-md">
        <h1 className="text-2xl font-bold grid grid-cols-[auto_1fr] gap-3 items-center">
          <Shield className="w-8 h-8 text-blue-400" />
          {title}
        </h1>
      </header>

      {/* Nav con Tabs (Grid Layout) */}
      <nav className="bg-white border-b border-slate-200 px-6 grid">
        <div className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-4 text-sm font-medium border-b-2 transition-colors grid place-items-center ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="p-6 md:p-8 grid items-start">
        <div className="max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- Componentes de Diagramas ---

// Diagrama 1: Capas de Seguridad (Estático)
const SecurityLayersDiagram: React.FC = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-6 p-6 bg-slate-50 h-full w-full rounded-b-lg border-t border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center relative">
        {/* Conexiones visuales usando Grid (simulando líneas) */}
        <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-1 bg-slate-200 -z-10 translate-y-[-50%]"></div>
        
        {/* Entidad 1: Usuarios */}
        <div className="bg-white p-4 rounded shadow grid gap-2 justify-items-center border-2 border-slate-200 z-10 w-32">
          <Users className="w-10 h-10 text-slate-600" />
          <span className="text-sm font-semibold">Usuarios</span>
        </div>

        {/* Entidad 2: Capa de Seguridad */}
        <div className="bg-blue-100 p-4 rounded shadow grid gap-2 justify-items-center border-2 border-blue-400 z-10 w-40">
          <Shield className="w-12 h-12 text-blue-600" />
          <span className="text-sm font-bold text-blue-800 text-center">SGBD<br/>Seguridad</span>
        </div>

        {/* Entidad 3: Base de Datos */}
        <div className="bg-white p-4 rounded shadow grid gap-2 justify-items-center border-2 border-slate-200 z-10 w-32">
          <Database className="w-10 h-10 text-emerald-600" />
          <span className="text-sm font-semibold text-center">Datos Críticos</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="bg-red-50 text-red-700 p-3 rounded grid grid-cols-[auto_1fr] gap-2 items-start">
          <XCircle className="w-4 h-4" />
          <span>Previene accesos no autorizados, modificación, pérdida o divulgación.</span>
        </div>
        <div className="bg-emerald-50 text-emerald-700 p-3 rounded grid grid-cols-[auto_1fr] gap-2 items-start">
          <CheckCircle className="w-4 h-4" />
          <span>Protege datos financieros, registros y clientes.</span>
        </div>
      </div>
    </div>
  );
};

// Diagrama 2: Proceso de Autorización (Dinámico)
const AuthorizationDiagram: React.FC = () => {
  const [role, setRole] = useState<'Administrador' | 'Analista' | 'Operador'>('Analista');
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const simulateAccess = () => {
    if (step !== 0) return;
    setStep(1);
    setTimeout(() => setStep(2), 1000);
    setTimeout(() => setStep(3), 2200);
    setTimeout(() => setStep(0), 4500);
  };

  const getRoleIcon = () => {
    switch(role) {
      case 'Administrador': return <Settings className="w-8 h-8 text-purple-600" />;
      case 'Analista': return <Activity className="w-8 h-8 text-blue-600" />;
      case 'Operador': return <Server className="w-8 h-8 text-orange-600" />;
    }
  };

  const getResult = () => {
    if (step < 3) return null;
    switch(role) {
      case 'Administrador': return <span className="text-purple-600 font-bold">Crear / Gestionar Usuarios (PERMITIDO)</span>;
      case 'Analista': return <span className="text-blue-600 font-bold">Consultar Información (PERMITIDO)</span>;
      case 'Operador': return <span className="text-orange-600 font-bold">Insertar / Actualizar (PERMITIDO)</span>;
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] gap-4 p-6 bg-slate-50 h-full w-full rounded-b-lg border-t border-slate-100">
      {/* Controles */}
      <div className="grid grid-cols-[1fr_auto] gap-4 items-center bg-white p-3 rounded shadow-sm border border-slate-200">
        <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
          <span className="text-sm font-semibold">Seleccionar Rol:</span>
          <select 
            className="border border-slate-300 rounded p-1 text-sm outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            disabled={step !== 0}
          >
            <option value="Administrador">Administrador</option>
            <option value="Analista">Analista</option>
            <option value="Operador">Operador</option>
          </select>
        </div>
        <button 
          className={`px-4 py-2 rounded text-sm font-bold text-white transition-colors ${step === 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-400 cursor-not-allowed'}`}
          onClick={simulateAccess}
          disabled={step !== 0}
        >
          {step === 0 ? 'Simular Operación' : 'Simulando...'}
        </button>
      </div>

      {/* Visualización */}
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-2 items-center justify-items-center mt-4">
        
        {/* Paso 1: Usuario */}
        <div className={`grid gap-2 justify-items-center transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
          <div className="bg-white p-3 rounded-full shadow-md border border-slate-200">
            {getRoleIcon()}
          </div>
          <span className="text-xs font-bold">{role}</span>
          {step === 1 && <span className="text-[10px] text-blue-500 animate-pulse">Solicitando...</span>}
        </div>

        {/* Flecha 1 */}
        <div className="w-8 h-1 bg-slate-300 relative">
          <div className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-1000 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
        </div>

        {/* Paso 2: Motor de Autorización */}
        <div className={`grid gap-2 justify-items-center transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
          <div className="bg-slate-800 p-4 rounded shadow-md text-white">
            <Lock className={`w-8 h-8 ${step === 2 ? 'animate-bounce text-yellow-400' : 'text-slate-300'}`} />
          </div>
          <span className="text-xs font-bold text-center">Gestor de<br/>Autorización</span>
          {step === 2 && <span className="text-[10px] text-yellow-600 animate-pulse">Verificando...</span>}
        </div>

        {/* Flecha 2 */}
        <div className="w-8 h-1 bg-slate-300 relative">
          <div className={`absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
        </div>

        {/* Paso 3: Base de Datos */}
        <div className={`grid gap-2 justify-items-center transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
          <div className="bg-white p-4 rounded shadow-md border border-slate-200">
            <Database className={`w-10 h-10 ${step === 3 ? 'text-emerald-500' : 'text-slate-400'}`} />
          </div>
          <span className="text-xs font-bold text-center">Base de Datos</span>
          {step === 3 && <div className="text-[10px] text-center mt-1">{getResult()}</div>}
        </div>

      </div>
    </div>
  );
};

// Diagrama 3: Usuarios, Roles y Permisos (Estático)
const RolesDiagram: React.FC = () => {
  return (
    <div className="grid p-6 bg-slate-50 h-full w-full rounded-b-lg border-t border-slate-100 items-center overflow-x-auto">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 min-w-[500px]">
        
        {/* Columna Usuarios */}
        <div className="grid grid-rows-3 gap-4">
          <div className="bg-white border border-slate-300 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <User className="w-5 h-5 text-slate-500" /> <span className="text-sm font-medium">Ana (Usuario)</span>
          </div>
          <div className="bg-white border border-slate-300 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <User className="w-5 h-5 text-slate-500" /> <span className="text-sm font-medium">Luis (Usuario)</span>
          </div>
          <div className="bg-white border border-slate-300 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <User className="w-5 h-5 text-slate-500" /> <span className="text-sm font-medium">Carlos (Usuario)</span>
          </div>
        </div>

        {/* Conectores 1 */}
        <div className="grid grid-rows-3 gap-4 items-center justify-items-center text-slate-300">
          <span className="text-2xl">→</span>
          <span className="text-2xl">→</span>
          <span className="text-2xl">→</span>
        </div>

        {/* Columna Roles */}
        <div className="grid grid-rows-3 gap-4">
          <div className="bg-blue-100 border border-blue-300 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> <span className="text-sm font-bold text-blue-800">Administrador</span>
          </div>
          <div className="bg-blue-100 border border-blue-300 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> <span className="text-sm font-bold text-blue-800">Desarrollador</span>
          </div>
          <div className="bg-blue-100 border border-blue-300 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> <span className="text-sm font-bold text-blue-800">Analista</span>
          </div>
        </div>

        {/* Conectores 2 */}
        <div className="grid grid-rows-3 gap-4 items-center justify-items-center text-slate-300">
          <span className="text-2xl">→</span>
          <span className="text-2xl">→</span>
          <span className="text-2xl">→</span>
        </div>

        {/* Columna Permisos */}
        <div className="grid grid-rows-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <Key className="w-4 h-4 text-emerald-600" /> <span className="text-xs">Todo (CRUD, Config)</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <Key className="w-4 h-4 text-emerald-600" /> <span className="text-xs">Lectura / Escritura</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded shadow-sm grid grid-cols-[auto_1fr] items-center gap-2">
            <Key className="w-4 h-4 text-emerald-600" /> <span className="text-xs">Solo Lectura</span>
          </div>
        </div>

      </div>
    </div>
  );
};


// --- Componentes de Pestañas (Secciones) ---

const Section1: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">1. Importancia de la seguridad en bases de datos</h2>
      <p className="text-slate-600 leading-relaxed">
        Las bases de datos suelen almacenar información crítica para organizaciones, como datos financieros, registros académicos o información de clientes. Por esta razón, es fundamental implementar mecanismos de seguridad que protejan la información.
      </p>
      <div className="bg-slate-100 p-4 rounded-md border-l-4 border-blue-500 grid gap-2">
        <strong className="text-sm text-slate-800">La seguridad en bases de datos busca prevenir:</strong>
        <ul className="grid gap-2 text-sm text-slate-700 ml-2">
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><XCircle className="w-4 h-4 text-red-500"/> accesos no autorizados</li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><XCircle className="w-4 h-4 text-red-500"/> modificación indebida de información</li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><XCircle className="w-4 h-4 text-red-500"/> pérdida o destrucción de datos</li>
          <li className="grid grid-cols-[auto_1fr] gap-2 items-center"><XCircle className="w-4 h-4 text-red-500"/> divulgación de información confidencial</li>
        </ul>
      </div>
      <p className="text-slate-600 leading-relaxed">
        Los Sistemas de Gestión de Bases de Datos implementan diferentes mecanismos para controlar quién puede acceder a los datos y qué acciones puede realizar cada usuario.
      </p>
    </div>

    <Card className="grid grid-rows-[auto_auto_1fr]">
      <div className="p-4 border-b border-slate-100 bg-white">
        <h3 className="text-lg font-bold text-slate-800">Arquitectura de Seguridad Básica</h3>
      </div>
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-sm text-slate-600">
        Diagrama estático que muestra una base de datos protegida por capas de seguridad aislando el núcleo del sistema frente a los usuarios externos.
      </div>
      <SecurityLayersDiagram />
    </Card>
  </div>
);

const Section2: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">2. Concepto de autorización</h2>
      <p className="text-slate-600 leading-relaxed">
        La autorización es el proceso mediante el cual el sistema determina qué acciones puede realizar cada usuario dentro de la base de datos.
      </p>
      <p className="text-slate-600 leading-relaxed">
        Cada usuario puede tener distintos niveles de acceso según su rol dentro de la organización.
      </p>
      
      <div className="grid gap-3 mt-2">
        <h4 className="font-semibold text-slate-800">Por ejemplo:</h4>
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center bg-white p-3 rounded border border-slate-200 shadow-sm">
          <Settings className="text-purple-600 w-5 h-5" />
          <span className="text-sm">Un <strong>administrador</strong> puede crear tablas y gestionar usuarios.</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center bg-white p-3 rounded border border-slate-200 shadow-sm">
          <Activity className="text-blue-600 w-5 h-5" />
          <span className="text-sm">Un <strong>analista</strong> puede consultar información.</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-3 items-center bg-white p-3 rounded border border-slate-200 shadow-sm">
          <Server className="text-orange-600 w-5 h-5" />
          <span className="text-sm">Un <strong>operador</strong> puede insertar o actualizar registros.</span>
        </div>
      </div>
      
      <p className="text-slate-600 leading-relaxed mt-2 p-3 bg-blue-50 border border-blue-100 rounded text-sm font-medium">
        La autorización garantiza que los usuarios interactúen con la base de datos solo dentro de los límites permitidos.
      </p>
    </div>

    <Card className="grid grid-rows-[auto_auto_1fr]">
      <div className="p-4 border-b border-slate-100 bg-white">
        <h3 className="text-lg font-bold text-slate-800">Flujo de Autorización Dinámico</h3>
      </div>
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-sm text-slate-600">
        Diagrama dinámico que muestra un proceso de autenticación seguido de verificación de permisos antes de permitir una operación.
      </div>
      <AuthorizationDiagram />
    </Card>
  </div>
);

const Section3: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">3. Control de acceso mediante usuarios y roles</h2>
      <p className="text-slate-600 leading-relaxed">
        Los SGBD utilizan dos mecanismos principales para administrar permisos: <strong>usuarios</strong> y <strong>roles</strong>.
      </p>
      
      <div className="grid gap-4">
        <div className="bg-white border border-slate-200 rounded p-4 grid gap-2 shadow-sm">
          <h3 className="font-bold text-blue-800 text-lg flex items-center gap-2"><User className="w-5 h-5"/> Usuarios</h3>
          <p className="text-sm text-slate-600">Un usuario representa una cuenta que puede acceder al sistema.</p>
          <ul className="text-sm text-slate-700 ml-4 list-disc mt-2 grid gap-1">
            <li>credenciales de acceso</li>
            <li>permisos específicos</li>
            <li>acceso limitado a determinados objetos de la base de datos</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded p-4 grid gap-2 shadow-sm">
          <h3 className="font-bold text-emerald-800 text-lg flex items-center gap-2"><Users className="w-5 h-5"/> Roles</h3>
          <p className="text-sm text-slate-600">Un rol es un conjunto de privilegios agrupados que pueden asignarse a varios usuarios.</p>
          <div className="text-sm text-slate-700 mt-2">
            <strong>Ejemplos de roles comunes:</strong>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <span className="bg-slate-100 p-1 rounded text-center text-xs font-medium">administrador del sistema</span>
              <span className="bg-slate-100 p-1 rounded text-center text-xs font-medium">usuario de consulta</span>
              <span className="bg-slate-100 p-1 rounded text-center text-xs font-medium">desarrollador</span>
              <span className="bg-slate-100 p-1 rounded text-center text-xs font-medium">analista de datos</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-slate-600 leading-relaxed text-sm bg-slate-100 p-3 rounded italic">
        El uso de roles facilita la administración, ya que permite asignar permisos a múltiples usuarios de manera centralizada.
      </p>
    </div>

    <Card className="grid grid-rows-[auto_auto_1fr]">
      <div className="p-4 border-b border-slate-100 bg-white">
        <h3 className="text-lg font-bold text-slate-800">Asignación de Privilegios y Roles</h3>
      </div>
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 text-sm text-slate-600">
        Diagrama estático que muestra la relación entre usuarios conectados a roles, y cómo estos roles están asociados a privilegios específicos.
      </div>
      <RolesDiagram />
    </Card>
  </div>
);

// --- Componente Principal ---

export default function App() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs: Tab[] = [
    { id: 'tab1', label: '1. Importancia y Seguridad' },
    { id: 'tab2', label: '2. Concepto de Autorización' },
    { id: 'tab3', label: '3. Usuarios y Roles' },
  ];

  return (
    <LessonLayout
      title="Seguridad y Autorización en Bases de Datos"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {/* Contenido Renderizado Condicionalmente basado en la pestaña */}
      <div className="animate-in fade-in duration-500">
        {activeTab === 'tab1' && <Section1 />}
        {activeTab === 'tab2' && <Section2 />}
        {activeTab === 'tab3' && <Section3 />}
      </div>
    </LessonLayout>
  );
}