import { 
  Database,  User, Monitor, Cpu, HardDrive, 
   Zap, Shield, ArrowRight, ArrowLeftRight, 
  CheckCircle2, AlertTriangle, Server, ArrowDown, Share2, } from 'lucide-react';

// --- DATOS DEL CONTENIDO ---
const contentData = [
  {
    id: 1,
    title: "Introducción al sistema multiusuario",
    explanation: "Los sistemas de bases de datos modernos permiten que múltiples usuarios accedan a la información al mismo tiempo. Este enfoque responde a la necesidad de compartir datos en entornos donde varias personas o aplicaciones interactúan simultáneamente con el sistema.",
    visualText: "Esquema con varios usuarios conectados a una misma base de datos central, mostrando acceso simultáneo.",
  },
  {
    id: 2,
    title: "Definición de sistema multiusuario",
    explanation: "Un sistema multiusuario es aquel en el que varios usuarios pueden realizar operaciones concurrentes sobre una misma base de datos. Cada usuario puede ejecutar consultas o transacciones sin necesidad de esperar a que otros terminen.",
    visualText: "Líneas de ejecución paralelas que parten de distintos usuarios hacia una base de datos, representando operaciones simultáneas.",
  },
  {
    id: 3,
    title: "Acceso concurrente",
    explanation: "El acceso concurrente implica que múltiples usuarios pueden leer y modificar datos al mismo tiempo. Este acceso simultáneo es gestionado por el sistema para evitar interferencias indebidas entre las operaciones.",
    visualText: "Un diagrama donde varios flujos de datos entran y salen de la base de datos al mismo tiempo, indicando simultaneidad.",
  },
  {
    id: 4,
    title: "Ejecución simultánea de transacciones",
    explanation: "En un sistema multiusuario, varias transacciones pueden ejecutarse en paralelo. Estas transacciones pueden interactuar con los mismos datos, lo que requiere mecanismos de coordinación para preservar la integridad.",
    visualText: "Dos o más secuencias de operaciones ejecutándose en paralelo, con posibles puntos de intersección sobre los mismos datos.",
  },
  {
    id: 5,
    title: "Uso compartido de recursos",
    explanation: "Los usuarios comparten recursos del sistema como memoria, almacenamiento y capacidad de procesamiento. El sistema gestiona estos recursos para garantizar un rendimiento equilibrado.",
    visualText: "Un conjunto de recursos (CPU, memoria, disco) conectados a múltiples usuarios, mostrando cómo todos dependen de los mismos elementos.",
  },
  {
    id: 6,
    title: "Ventajas del sistema multiusuario",
    explanation: "El modelo multiusuario mejora la eficiencia del sistema al permitir el uso simultáneo de los recursos. Además, incrementa la productividad al facilitar el trabajo colaborativo y ofrece respuestas rápidas a múltiples solicitudes.",
    visualText: "Gráfico comparativo: sistema de un solo usuario (menos eficiente) frente a uno con múltiples usuarios activos al mismo tiempo.",
  },
  {
    id: 7,
    title: "Riesgos y desafíos",
    explanation: "El acceso simultáneo puede generar conflictos entre transacciones, especialmente cuando intentan modificar los mismos datos. Si no se controla adecuadamente, esto puede provocar inconsistencias en la base de datos.",
    visualText: "Dos transacciones intentando modificar el mismo dato, representadas con flechas que colisionan, indicando conflicto.",
  },
  {
    id: 8,
    title: "Importancia del control en entornos multiusuario",
    explanation: "Aunque el sistema multiusuario aumenta la eficiencia, también introduce la necesidad de mecanismos de control, como la gestión de concurrencia, para mantener la integridad y consistencia de los datos.",
    visualText: "Un módulo de control regula el acceso de múltiples usuarios a la base de datos, simbolizando orden y coordinación.",
  }
];

// --- COMPONENTES VISUALES (DIAGRAMAS) ---

const Diagram1 = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200">
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Base de datos central */}
      <div className="absolute z-10 flex flex-col items-center justify-center w-24 h-24 bg-blue-600 rounded-full shadow-lg text-white">
        <Database size={40} />
        <span className="text-xs font-bold mt-1">BD Central</span>
      </div>
      
      {/* Usuarios alrededor */}
      <div className="absolute top-2 left-2 flex flex-col items-center text-slate-600">
        <Monitor size={32} />
        <ArrowDown size={20} className="text-blue-400 rotate-[-45deg] mt-1" />
      </div>
      <div className="absolute top-2 right-2 flex flex-col items-center text-slate-600">
        <Monitor size={32} />
        <ArrowDown size={20} className="text-blue-400 rotate-[45deg] mt-1" />
      </div>
      <div className="absolute bottom-2 left-2 flex flex-col items-center text-slate-600">
        <ArrowDown size={20} className="text-blue-400 rotate-[-135deg] mb-1" />
        <User size={32} />
      </div>
      <div className="absolute bottom-2 right-2 flex flex-col items-center text-slate-600">
        <ArrowDown size={20} className="text-blue-400 rotate-[135deg] mb-1" />
        <User size={32} />
      </div>
    </div>
  </div>
);

const Diagram2 = () => (
  <div className="flex items-center justify-between p-8 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-4">
        <User className="text-slate-600" size={32} />
        <div className="flex-1 h-2 bg-blue-200 w-32 relative">
          <div className="absolute right-0 -top-1.5 text-blue-500"><ArrowRight size={20} /></div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Monitor className="text-slate-600" size={32} />
        <div className="flex-1 h-2 bg-indigo-200 w-32 relative">
           <div className="absolute right-0 -top-1.5 text-indigo-500"><ArrowRight size={20} /></div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <User className="text-slate-600" size={32} />
        <div className="flex-1 h-2 bg-cyan-200 w-32 relative">
           <div className="absolute right-0 -top-1.5 text-cyan-500"><ArrowRight size={20} /></div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center p-6 bg-blue-100 rounded-xl border-2 border-blue-300">
      <Database size={64} className="text-blue-600" />
    </div>
  </div>
);

const Diagram3 = () => (
  <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-slate-50 rounded-xl border border-slate-200 gap-8">
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center"><User className="text-slate-500" /></div>
      <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center"><Monitor className="text-slate-500" /></div>
      <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center"><User className="text-slate-500" /></div>
      <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-200 flex items-center justify-center"><Monitor className="text-slate-500" /></div>
    </div>
    
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center text-green-500 font-semibold"><ArrowRight size={24} className="mr-2"/> Escribir (In)</div>
      <div className="flex items-center text-blue-500 font-semibold"><ArrowLeftRight size={32} /></div>
      <div className="flex items-center text-orange-500 font-semibold"><ArrowRight size={24} className="rotate-180 mr-2"/> Leer (Out)</div>
    </div>

    <div className="relative">
      <Database size={80} className="text-slate-700" />
      <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">Activo</div>
    </div>
  </div>
);

const Diagram4 = () => (
  <div className="p-8 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center">
    <div className="w-full max-w-lg relative">
      {/* Transacción A */}
      <div className="flex items-center mb-8">
        <div className="w-24 font-semibold text-slate-600">Transacción 1</div>
        <div className="flex-1 h-4 bg-indigo-200 rounded-full relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-indigo-500 w-2/3"></div>
        </div>
      </div>
      
      {/* Punto de intersección (Dato compartido) */}
      <div className="absolute left-1/2 top-4 bottom-4 w-16 bg-yellow-100 border-2 border-yellow-400 rounded-lg flex flex-col items-center justify-center z-10 opacity-90 transform -translate-x-1/2 shadow-lg">
        <Database size={24} className="text-yellow-600 mb-1" />
        <span className="text-[10px] font-bold text-center leading-tight">Dato<br/>Compartido</span>
      </div>

      {/* Transacción B */}
      <div className="flex items-center">
        <div className="w-24 font-semibold text-slate-600">Transacción 2</div>
        <div className="flex-1 h-4 bg-emerald-200 rounded-full relative overflow-hidden flex justify-end">
          <div className="h-full bg-emerald-500 w-3/4 mr-8"></div>
        </div>
      </div>
    </div>
  </div>
);

const Diagram5 = () => (
  <div className="flex flex-col items-center p-8 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex w-full justify-between items-center max-w-xl">
      {/* Usuarios */}
      <div className="flex flex-col space-y-4">
        <div className="bg-white p-3 rounded-full shadow-sm"><User size={28} className="text-slate-600"/></div>
        <div className="bg-white p-3 rounded-full shadow-sm"><User size={28} className="text-slate-600"/></div>
        <div className="bg-white p-3 rounded-full shadow-sm"><User size={28} className="text-slate-600"/></div>
      </div>

      {/* Conexiones */}
      <div className="flex-1 flex justify-center items-center px-4">
        <Share2 size={48} className="text-slate-300" />
      </div>

      {/* Recursos */}
      <div className="flex flex-col space-y-4 bg-blue-50 p-6 rounded-xl border border-blue-100">
        <div className="text-sm font-bold text-blue-800 mb-2 text-center border-b border-blue-200 pb-2">Recursos del Sistema</div>
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
          <Cpu className="text-red-500" /> <span className="font-medium text-slate-700">CPU</span>
        </div>
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
          <Server className="text-green-500" /> <span className="font-medium text-slate-700">Memoria RAM</span>
        </div>
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
          <HardDrive className="text-purple-500" /> <span className="font-medium text-slate-700">Almacenamiento</span>
        </div>
      </div>
    </div>
  </div>
);

const Diagram6 = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
    {/* Monousuario */}
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-slate-200 opacity-70">
      <h4 className="font-bold text-slate-500 mb-4">Sistema Monousuario</h4>
      <div className="flex items-center space-x-4 mb-4">
        <User size={32} className="text-slate-400" />
        <ArrowRight className="text-slate-300" />
        <Database size={40} className="text-slate-400" />
      </div>
      <div className="w-full bg-slate-100 rounded-full h-4 mt-4">
        <div className="bg-slate-300 h-4 rounded-full" style={{ width: '25%' }}></div>
      </div>
      <span className="text-xs text-slate-500 mt-2">Eficiencia Baja (Recursos ociosos)</span>
    </div>

    {/* Multiusuario */}
    <div className="flex flex-col items-center p-6 bg-blue-50 rounded-xl shadow-md border border-blue-200">
      <h4 className="font-bold text-blue-700 mb-4 flex items-center"><CheckCircle2 size={18} className="mr-2 text-green-500" /> Sistema Multiusuario</h4>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex flex-col space-y-1">
          <User size={20} className="text-blue-600" />
          <User size={20} className="text-blue-600" />
          <User size={20} className="text-blue-600" />
        </div>
        <ArrowRight className="text-blue-500 font-bold" />
        <Database size={48} className="text-blue-600" />
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4 mt-4 relative">
        <div className="bg-gradient-to-r from-blue-400 to-green-500 h-4 rounded-full" style={{ width: '90%' }}></div>
      </div>
      <span className="text-xs text-blue-700 font-medium mt-2">Alta Eficiencia & Colaboración</span>
    </div>
  </div>
);

const Diagram7 = () => (
  <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl border border-red-200">
    <div className="flex items-center justify-center space-x-2 md:space-x-8 w-full max-w-lg">
      <div className="flex flex-col space-y-12">
        <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-red-100">
          <span className="font-bold text-slate-600 mr-2">T1</span><User className="text-slate-500"/>
        </div>
        <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-red-100">
          <span className="font-bold text-slate-600 mr-2">T2</span><User className="text-slate-500"/>
        </div>
      </div>
      
      <div className="relative flex-1 h-32 flex items-center justify-center">
        {/* Flechas diagonales colisionando */}
        <div className="absolute top-4 left-0 w-full h-full">
          <svg width="100%" height="100%" preserveAspectRatio="none">
             <line x1="0" y1="20" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowhead)"/>
             <line x1="0" y1="100" x2="50%" y2="50%" stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrowhead)"/>
          </svg>
        </div>
        {/* Ícono de colisión */}
        <div className="absolute z-10 bg-red-100 p-2 rounded-full shadow-lg border-2 border-red-500 animate-bounce">
          <Zap size={32} className="text-red-600" />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border-2 border-slate-300 shadow-md flex flex-col items-center">
        <Database size={40} className="text-slate-600 mb-2"/>
        <div className="text-xs font-bold text-center">Registro<br/>#1024</div>
      </div>
    </div>
    <div className="mt-6 flex items-center text-red-600 bg-red-100 px-4 py-2 rounded-lg text-sm font-medium">
      <AlertTriangle size={18} className="mr-2" />
      Riesgo de inconsistencia por modificación simultánea
    </div>
  </div>
);

const Diagram8 = () => (
  <div className="flex flex-col items-center p-8 bg-slate-50 rounded-xl border border-slate-200">
    <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 w-full">
      {/* Usuarios */}
      <div className="flex flex-col space-y-4">
         <div className="flex items-center"><User className="text-slate-500 mr-2" size={20}/> <span className="w-16 h-1 bg-slate-300"></span></div>
         <div className="flex items-center"><User className="text-slate-500 mr-2" size={20}/> <span className="w-16 h-1 bg-slate-300"></span></div>
         <div className="flex items-center"><User className="text-slate-500 mr-2" size={20}/> <span className="w-16 h-1 bg-slate-300"></span></div>
      </div>

      {/* Módulo de Control */}
      <div className="flex flex-col items-center bg-indigo-600 text-white p-6 rounded-xl shadow-xl border-4 border-indigo-300 relative">
        <Shield size={48} className="mb-2 text-indigo-100" />
        <h3 className="font-bold text-center leading-tight">Gestor de<br/>Concurrencia</h3>
        <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 flex items-center">
            <div className="w-4 h-4 bg-indigo-400 rounded-full animate-ping absolute"></div>
            <div className="w-4 h-4 bg-indigo-200 rounded-full relative z-10"></div>
        </div>
      </div>

      {/* Flecha final y BD */}
      <div className="flex items-center space-x-4">
        <ArrowRight size={32} className="text-indigo-400" />
        <div className="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-md flex flex-col items-center">
          <Database size={56} className="text-blue-600 mb-2"/>
          <span className="font-bold text-slate-700">Base de Datos<br/>(Integra y Segura)</span>
        </div>
      </div>
    </div>
  </div>
);

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  
  // Función para renderizar el diagrama correcto según el ID
  const renderDiagram = (id:number) => {
    switch(id) {
      case 1: return <Diagram1 />;
      case 2: return <Diagram2 />;
      case 3: return <Diagram3 />;
      case 4: return <Diagram4 />;
      case 5: return <Diagram5 />;
      case 6: return <Diagram6 />;
      case 7: return <Diagram7 />;
      case 8: return <Diagram8 />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Cabecera Principal */}
        <header className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-blue-600 rounded-full mb-4 shadow-lg">
            <Database size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Sistemas Multiusuario
          </h1>
        </header>

        {/* Iteración sobre los bloques de contenido */}
        {contentData.map((section, _) => (
          <section key={section.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 transition-all hover:shadow-2xl">
            <div className="md:flex">
              {/* Columna de Texto */}
              <div className="p-8 md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50">
              
                <h2 className="block mt-1 text-2xl leading-tight font-bold text-slate-900 mb-4">
                  {section.title}
                </h2>
                <p className="mt-2 text-slate-600 leading-relaxed text-lg mb-6">
                  {section.explanation}
                </p>
              
              </div>
              
              {/* Columna Visual */}
              <div className="md:w-1/2 border-t md:border-t-0 md:border-l border-slate-200 bg-slate-50 p-6 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {renderDiagram(section.id)}
                </div>
              </div>
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}