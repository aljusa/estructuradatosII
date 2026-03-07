import React, { useState } from 'react';
import { Database, Key, CheckCircle, XCircle, AlertTriangle, Info, BookOpen, GraduationCap } from 'lucide-react';

// ==========================================
// TIPOS E INTERFACES (TypeScript)
// ==========================================

type DiagramType = 'concept' | 'structure' | 'keys' | 'integrity';

interface DiagramData {
  title: string;
  description: string;
  type: DiagramType;
}

interface ContentData {
  title: string;
  body: React.ReactNode;
}

interface LessonSection {
  id: string;
  tabTitle: string;
  content: ContentData;
  diagram: DiagramData;
}

// ==========================================
// DATOS DE LA LECCIÓN
// ==========================================

const LESSON_DATA: LessonSection[] = [
  {
    id: 'concepto',
    tabTitle: '1. Concepto',
    content: {
      title: 'Concepto del modelo relacional',
      body: (
        <div className="grid gap-4 text-slate-700 leading-relaxed">
          <p>
            El modelo relacional es una forma de organizar datos en una base de datos mediante tablas relacionadas entre sí. Fue propuesto por <strong>Edgar F. Codd</strong> y se fundamenta en la idea de que toda la información puede representarse como relaciones matemáticas.
          </p>
          <p>
            En este modelo, cada tabla representa una <em>entidad</em> del mundo real, como estudiantes, cursos o profesores. Estas entidades se organizan mediante estructuras simples que facilitan el almacenamiento, consulta y manipulación de datos.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 grid gap-2">
            <h4 className="font-bold text-blue-900 grid grid-cols-[auto_1fr] items-center gap-2">
              <BookOpen size={18} />
              Características principales:
            </h4>
            <ul className="list-disc list-inside grid gap-1 text-blue-800 ml-2">
              <li>Los datos se organizan en tablas (relaciones).</li>
              <li>Cada tabla contiene filas y columnas.</li>
              <li>Las relaciones entre tablas se establecen mediante claves.</li>
              <li>La información se consulta mediante lenguajes como SQL.</li>
            </ul>
          </div>
          <p>
            Este modelo es ampliamente utilizado porque permite consistencia, flexibilidad y escalabilidad en los sistemas de información.
          </p>
        </div>
      )
    },
    diagram: {
      title: 'Esquema de Tablas Relacionadas',
      description: 'Diagrama estático que muestra entidades (Estudiantes, Cursos e Inscripciones) y cómo se conectan.',
      type: 'concept'
    }
  },
  {
    id: 'estructura',
    tabTitle: '2. Estructura',
    content: {
      title: 'Estructura de una relación (tabla)',
      body: (
        <div className="grid gap-4 text-slate-700 leading-relaxed">
          <p>
            En el modelo relacional, la unidad fundamental de organización es la relación, conocida comúnmente como <strong>tabla</strong>.
          </p>
          <p>Cada tabla está compuesta por tres elementos principales:</p>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <div className="bg-slate-50 p-4 border border-slate-200 rounded grid gap-2">
              <h5 className="font-bold text-slate-800">Relación (Tabla)</h5>
              <p className="text-sm">Es la estructura completa que contiene los datos organizados.</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded grid gap-2">
              <h5 className="font-bold text-slate-800">Tupla (Fila)</h5>
              <p className="text-sm">Representa un registro específico dentro de la tabla.</p>
            </div>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded grid gap-2">
              <h5 className="font-bold text-slate-800">Atributo (Columna)</h5>
              <p className="text-sm">Representa una propiedad o característica de la entidad.</p>
            </div>
          </div>

          <p className="mt-2"><strong>Elementos clave:</strong></p>
          <ul className="list-disc list-inside grid gap-1 ml-2">
            <li>Cada fila representa una entidad diferente (ej. un estudiante distinto).</li>
            <li>Cada columna representa un atributo de la entidad.</li>
            <li>Todos los registros siguen estrictamente la misma estructura.</li>
          </ul>
        </div>
      )
    },
    diagram: {
      title: 'Anatomía de una Tabla',
      description: 'Análisis visual de los componentes de una relación.',
      type: 'structure'
    }
  },
  {
    id: 'claves',
    tabTitle: '3. Claves',
    content: {
      title: 'Claves en el modelo relacional',
      body: (
        <div className="grid gap-4 text-slate-700 leading-relaxed">
          <p>
            Las claves son elementos fundamentales para identificar registros y relacionar tablas dentro de una base de datos.
          </p>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="border-l-4 border-amber-500 pl-4 grid gap-2">
              <h4 className="font-bold text-amber-700 text-lg flex items-center gap-2">
                <Key size={20} />
                Clave Primaria (Primary Key)
              </h4>
              <p>Es un atributo que identifica de manera <strong>única</strong> cada registro en una tabla.</p>
              <ul className="list-disc list-inside text-sm text-slate-600 ml-2 grid gap-1">
                <li>No puede repetirse.</li>
                <li>No puede ser nula.</li>
              </ul>
            </div>

            <div className="border-l-4 border-emerald-500 pl-4 grid gap-2">
              <h4 className="font-bold text-emerald-700 text-lg flex items-center gap-2">
                <Key size={20} className="transform rotate-90" />
                Clave Foránea (Foreign Key)
              </h4>
              <p>Permite conectar dos tablas diferentes. Es un atributo que hace referencia a la clave primaria de otra tabla.</p>
              <ul className="list-disc list-inside text-sm text-slate-600 ml-2 grid gap-1">
                <li>Crea el vínculo entre información relacionada.</li>
                <li>Puede contener valores repetidos (relación uno a muchos).</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    diagram: {
      title: 'Relación mediante Claves',
      description: 'Conexión entre una Clave Foránea y una Clave Primaria.',
      type: 'keys'
    }
  },
  {
    id: 'integridad',
    tabTitle: '4. Integridad',
    content: {
      title: 'Integridad de los datos',
      body: (
        <div className="grid gap-4 text-slate-700 leading-relaxed">
          <p>
            La integridad de los datos se refiere a las reglas que garantizan que la información almacenada sea consistente y válida. Existen dos reglas principales:
          </p>
          
          <div className="grid gap-4 mt-2">
            <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm grid gap-2">
              <h4 className="font-bold text-slate-800 border-b pb-2">1. Integridad de Entidad</h4>
              <p className="text-sm">Garantiza que cada registro tenga una clave primaria válida.</p>
              <ul className="list-disc list-inside text-sm text-slate-600 ml-2 mt-1">
                <li>La clave primaria no puede ser nula.</li>
                <li>Cada identificador debe ser único.</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm grid gap-2">
              <h4 className="font-bold text-slate-800 border-b pb-2">2. Integridad Referencial</h4>
              <p className="text-sm">Asegura que las relaciones entre tablas sean válidas.</p>
              <ul className="list-disc list-inside text-sm text-slate-600 ml-2 mt-1">
                <li>Una clave foránea debe coincidir con una clave primaria existente.</li>
                <li>No se pueden crear relaciones con registros inexistentes.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    diagram: {
      title: 'Simulador de Integridad Referencial',
      description: 'Intenta insertar una inscripción con un ID de estudiante que no existe para ver cómo el sistema lo rechaza.',
      type: 'integrity'
    }
  }
];

// ==========================================
// COMPONENTES BASE (UI)
// ==========================================

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

// ==========================================
// COMPONENTES DE DIAGRAMAS
// ==========================================

const ConceptDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] grid-rows-[auto_auto_auto] gap-4 items-center justify-items-center w-full bg-slate-50 p-6 rounded-lg border border-slate-200">
      
      {/* Tabla Estudiantes */}
      <div className="grid gap-0 border border-blue-300 rounded overflow-hidden shadow-sm bg-white w-full max-w-[200px] col-start-1 row-start-1">
        <div className="bg-blue-600 text-white font-bold p-2 text-center text-sm">Estudiantes</div>
        <div className="grid grid-cols-[auto_1fr] border-b border-slate-100 p-2 text-xs">
          <span className="font-mono font-bold text-amber-600 mr-2">PK</span>
          <span>id_estudiante</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] border-b border-slate-100 p-2 text-xs">
          <span className="w-5 mr-2"></span>
          <span>nombre</span>
        </div>
      </div>

      {/* Flecha conectora 1 */}
      <div className="hidden md:grid col-start-2 row-start-1 items-center">
        <svg width="60" height="24" viewBox="0 0 60 24" className="text-slate-400">
          <path d="M0,12 L50,12" stroke="currentColor" strokeWidth="2" fill="none" />
          <polygon points="50,6 60,12 50,18" fill="currentColor" />
        </svg>
      </div>

      {/* Tabla Inscripciones (Centro/Intersección) */}
      <div className="grid gap-0 border border-emerald-300 rounded overflow-hidden shadow-sm bg-white w-full max-w-[200px] col-start-1 md:col-start-3 row-start-2">
        <div className="bg-emerald-600 text-white font-bold p-2 text-center text-sm">Inscripciones</div>
        <div className="grid grid-cols-[auto_1fr] border-b border-slate-100 p-2 text-xs">
          <span className="font-mono font-bold text-amber-600 mr-2">PK</span>
          <span>id_inscripcion</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] border-b border-slate-100 p-2 text-xs bg-amber-50">
          <span className="font-mono font-bold text-emerald-600 mr-2">FK</span>
          <span>id_estudiante</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] border-b border-slate-100 p-2 text-xs bg-amber-50">
          <span className="font-mono font-bold text-emerald-600 mr-2">FK</span>
          <span>id_curso</span>
        </div>
      </div>

      {/* Flecha conectora 2 (Vertical para móvil, Horizontal para Desktop) */}
      <div className="grid md:hidden col-start-1 row-start-2 items-center justify-center my-2">
        <svg width="24" height="40" viewBox="0 0 24 40" className="text-slate-400">
          <path d="M12,0 L12,30" stroke="currentColor" strokeWidth="2" fill="none" />
          <polygon points="6,30 12,40 18,30" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden md:grid col-start-2 row-start-3 items-center">
        <svg width="60" height="24" viewBox="0 0 60 24" className="text-slate-400">
          <path d="M60,12 L10,12" stroke="currentColor" strokeWidth="2" fill="none" />
          <polygon points="10,6 0,12 10,18" fill="currentColor" />
        </svg>
      </div>

      {/* Tabla Cursos */}
      <div className="grid gap-0 border border-purple-300 rounded overflow-hidden shadow-sm bg-white w-full max-w-[200px] col-start-1 row-start-3">
        <div className="bg-purple-600 text-white font-bold p-2 text-center text-sm">Cursos</div>
        <div className="grid grid-cols-[auto_1fr] border-b border-slate-100 p-2 text-xs">
          <span className="font-mono font-bold text-amber-600 mr-2">PK</span>
          <span>id_curso</span>
        </div>
        <div className="grid grid-cols-[auto_1fr] border-b border-slate-100 p-2 text-xs">
          <span className="w-5 mr-2"></span>
          <span>nombre_curso</span>
        </div>
      </div>

    </div>
  );
};

const StructureDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-6 bg-slate-50 p-6 rounded-lg border border-slate-200 relative">
      <div className="grid justify-items-center mb-4">
        <div className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-bold border border-indigo-200">
          Relación (Toda la Tabla)
        </div>
        <div className="h-4 border-l-2 border-dashed border-indigo-300"></div>
      </div>

      <div className="grid grid-cols-1 overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white shadow-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="p-3 border border-slate-700 relative">
                id_estudiante
                {/* Etiqueta Atributo */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 grid justify-items-center">
                  <div className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded border border-emerald-200 whitespace-nowrap">
                    Atributo (Columna)
                  </div>
                  <div className="h-4 border-l-2 border-emerald-400"></div>
                </div>
              </th>
              <th className="p-3 border border-slate-700">nombre</th>
              <th className="p-3 border border-slate-700">carrera</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border border-slate-200 relative bg-amber-50 outline outline-2 outline-amber-400">
              <td className="p-3 border border-slate-200 font-mono">101</td>
              <td className="p-3 border border-slate-200">Ana López</td>
              <td className="p-3 border border-slate-200">
                Ingeniería
                {/* Etiqueta Tupla */}
                <div className="absolute -right-32 top-1/2 transform -translate-y-1/2 hidden lg:grid grid-cols-[auto_auto] items-center gap-2">
                  <div className="w-4 border-t-2 border-amber-400"></div>
                  <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded border border-amber-200 whitespace-nowrap">
                    Tupla (Fila / Registro)
                  </div>
                </div>
              </td>
            </tr>
            <tr className="border border-slate-200">
              <td className="p-3 border border-slate-200 font-mono">102</td>
              <td className="p-3 border border-slate-200">Carlos Díaz</td>
              <td className="p-3 border border-slate-200">Arquitectura</td>
            </tr>
          </tbody>
        </table>
        {/* Tupla indicator for mobile */}
        <div className="grid lg:hidden mt-4 justify-items-center gap-1">
           <div className="h-4 border-l-2 border-amber-400"></div>
           <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded border border-amber-200">
              Tupla (La fila resaltada en amarillo)
           </div>
        </div>
      </div>
    </div>
  );
};

const KeysDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 bg-slate-50 p-6 rounded-lg border border-slate-200 items-center">
      
      {/* Tabla 1 */}
      <div className="grid gap-0 bg-white shadow-sm border border-slate-200 rounded">
        <div className="bg-blue-800 text-white p-2 text-center font-bold text-sm">Estudiantes</div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 border-b border-slate-200">
                <span className="grid grid-cols-[auto_1fr] items-center gap-1 text-amber-600">
                  <Key size={14} /> id_estudiante <span className="text-[10px] bg-amber-100 px-1 rounded ml-1">(PK)</span>
                </span>
              </th>
              <th className="p-2 border-b border-slate-200">nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-amber-50">
              <td className="p-2 border-b border-slate-200 font-mono font-bold text-amber-700">101</td>
              <td className="p-2 border-b border-slate-200">Ana</td>
            </tr>
            <tr>
              <td className="p-2 border-b border-slate-200 font-mono text-slate-500">102</td>
              <td className="p-2 border-b border-slate-200 text-slate-500">Carlos</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Flecha de conexión */}
      <div className="grid justify-items-center">
        <svg width="40" height="24" viewBox="0 0 40 24" className="text-emerald-500 hidden md:block">
          <path d="M40,12 L10,12" stroke="currentColor" strokeWidth="2" strokeDasharray="4" fill="none" />
          <polygon points="10,6 0,12 10,18" fill="currentColor" />
        </svg>
        <div className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-1 rounded mt-1 whitespace-nowrap">
          Hace referencia a
        </div>
        <svg width="24" height="40" viewBox="0 0 24 40" className="text-emerald-500 md:hidden mt-2">
           <path d="M12,40 L12,10" stroke="currentColor" strokeWidth="2" strokeDasharray="4" fill="none" />
           <polygon points="6,10 12,0 18,10" fill="currentColor" />
        </svg>
      </div>

      {/* Tabla 2 */}
      <div className="grid gap-0 bg-white shadow-sm border border-slate-200 rounded">
        <div className="bg-emerald-800 text-white p-2 text-center font-bold text-sm">Inscripciones</div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 border-b border-slate-200">id_inscripcion</th>
              <th className="p-2 border-b border-slate-200">
                <span className="grid grid-cols-[auto_1fr] items-center gap-1 text-emerald-600">
                  <Key size={14} className="transform rotate-90" /> id_estudiante <span className="text-[10px] bg-emerald-100 px-1 rounded ml-1">(FK)</span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b border-slate-200 font-mono text-slate-500">1</td>
              <td className="p-2 border-b border-slate-200 font-mono font-bold text-emerald-700 bg-emerald-50">101</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

const IntegrityDiagram: React.FC = () => {
  const [enrollments, setEnrollments] = useState<{id: number, studentId: number, course: string}[]>([
    { id: 1, studentId: 101, course: 'Bases de Datos' }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const validStudents = [101, 102];

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(inputValue);
    
    if (isNaN(id)) {
      setStatus('idle');
      return;
    }

    if (validStudents.includes(id)) {
      setEnrollments([...enrollments, { id: enrollments.length + 1, studentId: id, course: 'Programación' }]);
      setStatus('success');
      setInputValue('');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] gap-6 bg-slate-50 p-6 rounded-lg border border-slate-200">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tabla Estudiantes (Solo lectura) */}
        <div className="grid gap-2">
          <h4 className="font-bold text-sm text-slate-600">Tabla: Estudiantes (Existentes)</h4>
          <table className="w-full text-sm text-left bg-white border border-slate-200 rounded shadow-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 border-b border-slate-200 text-blue-600">id_estudiante (PK)</th>
                <th className="p-2 border-b border-slate-200">nombre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b border-slate-200 font-mono">101</td>
                <td className="p-2 border-b border-slate-200">Ana</td>
              </tr>
              <tr>
                <td className="p-2 border-b border-slate-200 font-mono">102</td>
                <td className="p-2 border-b border-slate-200">Carlos</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Formulario Inserción */}
        <div className="grid grid-rows-[auto_1fr] gap-2">
          <h4 className="font-bold text-sm text-slate-600">Nueva Inscripción</h4>
          <form onSubmit={handleInsert} className="bg-white p-4 border border-slate-200 rounded shadow-sm grid gap-4 grid-rows-[auto_auto_auto]">
            <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
              <div className="grid gap-1">
                <label className="text-xs font-bold text-slate-500">id_estudiante (FK)</label>
                <input 
                  type="number" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ej. 101, 102, 999..."
                  className="border border-slate-300 rounded p-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors">
                Insertar
              </button>
            </div>

            {/* Mensajes de Estado */}
            <div className="h-16 grid items-center">
              {status === 'error' && (
                <div className="grid grid-cols-[auto_1fr] gap-2 bg-red-50 text-red-700 p-2 rounded border border-red-200 text-sm items-center">
                  <XCircle size={18} />
                  <span><strong>Error:</strong> Violación de Integridad Referencial. El estudiante no existe.</span>
                </div>
              )}
              {status === 'success' && (
                <div className="grid grid-cols-[auto_1fr] gap-2 bg-emerald-50 text-emerald-700 p-2 rounded border border-emerald-200 text-sm items-center">
                  <CheckCircle size={18} />
                  <span><strong>Éxito:</strong> Inscripción registrada correctamente.</span>
                </div>
              )}
              {status === 'idle' && (
                <div className="grid grid-cols-[auto_1fr] gap-2 bg-blue-50 text-blue-700 p-2 rounded border border-blue-200 text-sm items-center">
                  <Info size={18} />
                  <span>Prueba ingresando el ID <strong>102</strong> (válido) o <strong>999</strong> (inválido).</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Tabla Inscripciones Resultante */}
      <div className="grid gap-2">
         <h4 className="font-bold text-sm text-slate-600">Tabla: Inscripciones</h4>
         <table className="w-full text-sm text-left bg-white border border-slate-200 rounded shadow-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-2 border-b border-slate-200">id_inscripcion</th>
                <th className="p-2 border-b border-slate-200 text-emerald-600">id_estudiante (FK)</th>
                <th className="p-2 border-b border-slate-200">curso</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((env) => (
                <tr key={env.id} className="animate-[pulse_0.5s_ease-in-out]">
                  <td className="p-2 border-b border-slate-200 font-mono text-slate-500">{env.id}</td>
                  <td className="p-2 border-b border-slate-200 font-mono font-bold text-slate-800">{env.studentId}</td>
                  <td className="p-2 border-b border-slate-200 text-slate-600">{env.course}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

    </div>
  );
};

// ==========================================
// RENDERIZADOR DE DIAGRAMAS
// ==========================================

const DiagramRender: React.FC<{ data: DiagramData }> = ({ data }) => {
  const renderDiagramContent = () => {
    switch (data.type) {
      case 'concept': return <ConceptDiagram />;
      case 'structure': return <StructureDiagram />;
      case 'keys': return <KeysDiagram />;
      case 'integrity': return <IntegrityDiagram />;
      default: return null;
    }
  };

  return (
    <div className="grid grid-rows-[auto_auto_1fr] gap-4 h-full">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2 border-b border-slate-100 pb-2">
        <Database className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-slate-800">{data.title}</h3>
      </div>
      <p className="text-slate-600 text-sm mb-2">{data.description}</p>
      <div className="grid items-start justify-items-stretch overflow-hidden">
        {renderDiagramContent()}
      </div>
    </div>
  );
};

// ==========================================
// LAYOUT PRINCIPAL (Basado exclusivamente en CSS Grid)
// ==========================================

const LessonLayout: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(LESSON_DATA[0].id);

  const activeSection = LESSON_DATA.find(section => section.id === activeTabId) || LESSON_DATA[0];

  return (
    <div className="grid grid-rows-[auto_auto_1fr] min-h-screen bg-slate-100 text-slate-900 font-sans">
      
      {/* Header */}
      <header className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-4 bg-slate-900 text-white p-4 shadow-md z-10">
        <div className="grid grid-cols-[auto_1fr] items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">DataEdu</h1>
        </div>
        <nav className="grid justify-items-start md:justify-items-end">
          <span className="text-slate-300 font-medium text-sm border border-slate-700 px-3 py-1 rounded-full bg-slate-800">
            Módulo: Fundamentos de Bases de Datos
          </span>
        </nav>
      </header>

      {/* Sistema de Pestañas (Tabs) Superior */}
      <nav className="grid grid-cols-2 md:grid-cols-4 bg-white border-b border-slate-200 shadow-sm">
        {LESSON_DATA.map((section) => {
          const isActive = section.id === activeTabId;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTabId(section.id)}
              className={`
                grid items-center justify-items-center p-4 text-sm font-bold border-b-4 transition-all duration-200
                ${isActive 
                  ? 'border-blue-600 text-blue-700 bg-blue-50/50' 
                  : 'border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
              `}
            >
              {section.tabTitle}
            </button>
          );
        })}
      </nav>

      {/* Área de Contenido Principal */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-8 max-w-[1400px] w-full justify-self-center items-start">
        
        {/* Panel Izquierdo: Contenido Teórico */}
        <Card className="grid grid-rows-[auto_1fr] gap-6 animate-[fadeIn_0.3s_ease-out]">
          <h2 className="text-3xl font-extrabold text-slate-800 border-b-2 border-blue-100 pb-4 inline-block">
            {activeSection.content.title}
          </h2>
          <div className="text-base">
            {activeSection.content.body}
          </div>
        </Card>

        {/* Panel Derecho: Renderizador del Diagrama */}
        <Card className="grid grid-rows-1 h-full animate-[fadeIn_0.4s_ease-out]">
          <DiagramRender data={activeSection.diagram} />
        </Card>

      </main>
      
      {/* Estilos Globales para animaciones simples (No se requiere archivo CSS externo) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

// ==========================================
// PUNTO DE ENTRADA
// ==========================================

export default function App() {
  return <LessonLayout />;
}