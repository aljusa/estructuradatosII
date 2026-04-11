import React from 'react';
import { 
  Database, 
  Code2, 
  ListOrdered, 
  TerminalSquare, 
  Sparkles, 
  Workflow,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

// --- Componentes Reutilizables ---
type CodeBlockProp ={
    code:string;
    language: string;
}

const CodeBlock: React.FC<CodeBlockProp> = ({ code, language }) => (
  <div className="bg-slate-900 rounded-lg p-4 my-4 overflow-x-auto">
    <div className="flex items-center gap-2 mb-2">
      <span className="flex w-3 h-3 bg-red-500 rounded-full"></span>
      <span className="flex w-3 h-3 bg-yellow-500 rounded-full"></span>
      <span className="flex w-3 h-3 bg-green-500 rounded-full"></span>
      <span className="ml-2 text-xs text-slate-400 font-mono uppercase">{language}</span>
    </div>
    <pre className="text-emerald-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  </div>
);

type SectionProps = {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    visual: React.ReactNode;
    visualTitle: string;
}

const Section:React.FC<SectionProps> = ({ title, icon: Icon, children, visual, visualTitle }) => (
  <section className="mb-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="text-slate-600 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
    <div className="bg-slate-50 border-t border-slate-100 p-6 md:p-8">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6 flex items-center gap-2">
        <Sparkles size={16} className="text-amber-500" />
        {visualTitle}
      </h3>
      <div className="flex justify-center">
        {visual}
      </div>
    </div>
  </section>
);

// --- Componentes Visuales Específicos ---

const DecisionTree = () => (
  <div className="flex flex-col items-center font-sans w-full max-w-2xl">
    <div className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold text-lg z-10">
      Condición: Salario
    </div>
    <div className="w-px h-8 bg-slate-300"></div>
    <div className="w-full relative flex justify-between px-4 sm:px-12">
      {/* Línea horizontal conectora */}
      <div className="absolute top-0 left-[10%] right-[10%] sm:left-[20%] sm:right-[20%] h-px bg-slate-300"></div>
      
      {/* Ramas */}
      <div className="flex flex-col items-center relative pt-4">
        <div className="w-px h-4 bg-slate-300 absolute top-0"></div>
        <div className="bg-white border-2 border-green-200 text-slate-700 px-4 py-2 rounded-lg text-center shadow-sm w-28">
          <span className="text-xs text-slate-500 block mb-1">&gt; 5000</span>
          <span className="font-bold text-green-600">'Alto'</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center relative pt-4">
        <div className="w-px h-4 bg-slate-300 absolute top-0"></div>
        <div className="bg-white border-2 border-amber-200 text-slate-700 px-4 py-2 rounded-lg text-center shadow-sm w-28">
          <span className="text-xs text-slate-500 block mb-1">3000 - 5000</span>
          <span className="font-bold text-amber-600">'Medio'</span>
        </div>
      </div>
      
      <div className="flex flex-col items-center relative pt-4">
        <div className="w-px h-4 bg-slate-300 absolute top-0"></div>
        <div className="bg-white border-2 border-red-200 text-slate-700 px-4 py-2 rounded-lg text-center shadow-sm w-28">
          <span className="text-xs text-slate-500 block mb-1">&lt; 3000 o ELSE</span>
          <span className="font-bold text-red-600">'Bajo'</span>
        </div>
      </div>
    </div>
  </div>
);

const SalaryTable = () => (
  <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-100 text-slate-600 text-sm">
          <th className="p-4 font-semibold border-b border-slate-200">Nombre</th>
          <th className="p-4 font-semibold border-b border-slate-200">Salario</th>
          <th className="p-4 font-semibold border-b border-slate-200 bg-blue-50 text-blue-700 flex items-center gap-2">
            Nivel Salario <Sparkles size={14} />
          </th>
        </tr>
      </thead>
      <tbody className="text-sm">
        <tr className="border-b border-slate-100 hover:bg-slate-50">
          <td className="p-4 text-slate-700">Ana García</td>
          <td className="p-4 font-mono text-slate-600">6,500</td>
          <td className="p-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium text-xs">Alto</span></td>
        </tr>
        <tr className="border-b border-slate-100 hover:bg-slate-50">
          <td className="p-4 text-slate-700">Carlos Ruiz</td>
          <td className="p-4 font-mono text-slate-600">4,200</td>
          <td className="p-4"><span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium text-xs">Medio</span></td>
        </tr>
        <tr className="hover:bg-slate-50">
          <td className="p-4 text-slate-700">Luis Peña</td>
          <td className="p-4 font-mono text-slate-600">2,800</td>
          <td className="p-4"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium text-xs">Bajo</span></td>
        </tr>
      </tbody>
    </table>
  </div>
);

const BinaryClassificationTable = () => (
  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full max-w-3xl justify-center">
    {/* Datos Originales */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
      <h4 className="text-xs font-bold text-slate-400 mb-3 text-center uppercase">Tabla: Personas</h4>
      <div className="space-y-2">
        <div className="flex gap-4 text-sm"><span className="w-20 font-medium text-slate-700">Elena</span><span className="w-12 font-mono text-slate-500">25</span></div>
        <div className="flex gap-4 text-sm"><span className="w-20 font-medium text-slate-700">Mateo</span><span className="w-12 font-mono text-slate-500">14</span></div>
        <div className="flex gap-4 text-sm"><span className="w-20 font-medium text-slate-700">Sofía</span><span className="w-12 font-mono text-slate-500">18</span></div>
      </div>
    </div>
    
    <ArrowRight className="text-blue-400 hidden sm:block" size={32} />
    <ArrowDown className="text-blue-400 sm:hidden" size={32} />
    
    {/* Datos Transformados */}
    <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-4 ring-2 ring-blue-50">
      <h4 className="text-xs font-bold text-blue-500 mb-3 text-center uppercase">Resultado (Python Cursor)</h4>
      <div className="space-y-2">
        <div className="flex gap-4 items-center text-sm">
          <span className="w-20 font-medium text-slate-700">Elena</span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold w-16 text-center">Adulto</span>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <span className="w-20 font-medium text-slate-700">Mateo</span>
          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-semibold w-16 text-center">Menor</span>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <span className="w-20 font-medium text-slate-700">Sofía</span>
          <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold w-16 text-center">Adulto</span>
        </div>
      </div>
    </div>
  </div>
);

const OrderedListVisual = () => (
  <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <div className="mb-4 flex justify-between items-end border-b border-slate-100 pb-2">
      <span className="font-semibold text-slate-600">Empleado</span>
      <span className="font-semibold text-slate-600">Prioridad / Salario</span>
    </div>
    <ul className="space-y-3">
      <li className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-100">
        <span className="font-medium text-slate-800">Directora General</span>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-mono text-sm">$8,000</span>
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">Grupo 1</span>
        </div>
      </li>
      <li className="flex justify-between items-center bg-green-50 p-3 rounded-lg border border-green-100">
        <span className="font-medium text-slate-800">Líder Técnico</span>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-mono text-sm">$5,500</span>
          <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">Grupo 1</span>
        </div>
      </li>
      <li className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 opacity-80">
        <span className="font-medium text-slate-700">Analista</span>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-mono text-sm">$4,000</span>
          <span className="bg-slate-400 text-white text-xs font-bold px-2 py-1 rounded">Grupo 2</span>
        </div>
      </li>
      <li className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 opacity-80">
        <span className="font-medium text-slate-700">Asistente</span>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 font-mono text-sm">$2,500</span>
          <span className="bg-slate-400 text-white text-xs font-bold px-2 py-1 rounded">Grupo 2</span>
        </div>
      </li>
    </ul>
  </div>
);

const TransformVisual = () => (
  <div className="flex flex-col lg:flex-row items-center gap-6 w-full max-w-4xl justify-center">
    <div className="text-center">
      <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 font-mono text-sm text-slate-500 w-48 shadow-inner">
        [ 1, 2, 1, 3, 2, ... ]<br/>
        [ 'M', 'F', 'X', 'M' ]<br/>
        [ 95, 42, 78, 60 ]
      </div>
      <p className="mt-2 text-xs font-semibold text-slate-500">Datos en bruto</p>
    </div>
    
    <div className="flex flex-col items-center">
      <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg z-10">
        <Workflow size={24} />
      </div>
      <div className="h-10 lg:w-16 lg:h-px bg-blue-300 lg:absolute lg:-z-10"></div>
    </div>
    
    <div className="text-center">
       <div className="bg-white border-2 border-blue-400 rounded-lg p-4 font-sans text-sm text-slate-800 w-64 shadow-md font-medium">
        [ 'Activo', 'Inactivo', 'Activo' ]<br/>
        [ 'Hombre', 'Mujer', 'Otro' ]<br/>
        [ 'Aprobado', 'Reprobado', 'Aprobado' ]
      </div>
      <p className="mt-2 text-xs font-semibold text-blue-600">Etiquetas Descriptivas</p>
    </div>
  </div>
);

const ConclusionVisual = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-2 w-full max-w-3xl bg-white p-6 rounded-xl border border-slate-200">
    <div className="flex flex-col items-center text-center w-32">
      <Database className="text-slate-400 mb-2" size={32}/>
      <span className="text-xs font-bold text-slate-500">Datos<br/>Base</span>
    </div>
    
    <ArrowRight className="text-slate-300 hidden sm:block" />
    <ArrowDown className="text-slate-300 sm:hidden" />
    
    <div className="flex flex-col items-center bg-blue-50 border-2 border-blue-200 px-6 py-4 rounded-xl shadow-sm relative">
      <span className="absolute -top-3 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">Motor SQLite</span>
      <Code2 className="text-blue-500 mb-2" size={32}/>
      <span className="text-sm font-bold text-blue-800">Lógica CASE</span>
      <span className="text-xs text-blue-600 mt-1">(Transformación SQL)</span>
    </div>

    <ArrowRight className="text-blue-300 hidden sm:block" />
    <ArrowDown className="text-blue-300 sm:hidden" />
    
    <div className="flex flex-col items-center text-center w-32">
      <TerminalSquare className="text-green-500 mb-2" size={32}/>
      <span className="text-xs font-bold text-green-700">Resultados<br/>Enriquecidos (Python)</span>
    </div>
  </div>
);

// --- Componente Principal ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera del Curso */}
        <header className="mb-12 text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Uso de CASE en SQLite3
          </h1>
        </header>

        {/* Sección 1 */}
        <Section 
          title="Introducción a la lógica condicional en SQL" 
          icon={Database}
          visualTitle="Diagrama de Decisión"
          visual={<DecisionTree />}
        >
          <p>
            La sentencia <strong>CASE</strong> permite incorporar lógica condicional dentro de una consulta SQL, funcionando de manera similar a una estructura <code>if-elif-else</code> en Python. Su uso es fundamental para clasificar, transformar o etiquetar datos directamente en la consulta, optimizando el rendimiento al delegar estas operaciones al motor de la base de datos.
          </p>
        </Section>

        {/* Sección 2 */}
        <Section 
          title="Sintaxis básica de CASE" 
          icon={Code2}
          visualTitle="Tabla de Clasificación Salarial"
          visual={<SalaryTable />}
        >
          <p>
            La estructura <code>CASE</code> evalúa condiciones en orden y devuelve el resultado correspondiente a la primera condición verdadera. Si ninguna condición se cumple, se devuelve el valor definido en <code>ELSE</code>.
          </p>
          <CodeBlock 
            language="sql" 
            code={`SELECT nombre, salario,
CASE
    WHEN salario > 5000 THEN 'Alto'
    WHEN salario BETWEEN 3000 AND 5000 THEN 'Medio'
    ELSE 'Bajo'
END as nivel_salario
FROM empleados;`} 
          />
          <p className="text-sm text-slate-500 italic">
            En este ejemplo, cada empleado es clasificado según su salario en tres niveles.
          </p>
        </Section>

        {/* Sección 3 */}
        <Section 
          title="Uso de CASE desde Python con sqlite3" 
          icon={TerminalSquare}
          visualTitle="Transformación de Columnas"
          visual={<BinaryClassificationTable />}
        >
          <p>
            Las consultas que incluyen <code>CASE</code> pueden ejecutarse directamente desde Python usando el módulo <code>sqlite3</code>, como cualquier otra consulta SQL. Esto te permite obtener los datos ya procesados y listos para usar en tus estructuras de datos en Python.
          </p>
          <CodeBlock 
            language="python" 
            code={`import sqlite3

# ... conexión a la base de datos ...
query = """
SELECT nombre,
CASE
    WHEN edad >= 18 THEN 'Adulto'
    ELSE 'Menor'
END as categoria
FROM personas
"""

cursor.execute(query)
resultados = cursor.fetchall()`} 
          />
          <p className="text-sm text-slate-500 italic">
            Aquí, cada persona es clasificada según su edad en “Adulto” o “Menor”.
          </p>
        </Section>

        {/* Sección 4 */}
        <Section 
          title="Uso de CASE en ORDER BY" 
          icon={ListOrdered}
          visualTitle="Ordenamiento Lógico Condicional"
          visual={<OrderedListVisual />}
        >
          <p>
            La sentencia <code>CASE</code> también puede utilizarse para personalizar el orden de los resultados, más allá de un simple orden ascendente o descendente. Esto es especialmente útil para priorizar ciertos registros que cumplen condiciones de negocio específicas.
          </p>
          <CodeBlock 
            language="sql" 
            code={`SELECT nombre, salario
FROM empleados
ORDER BY
CASE
    WHEN salario > 5000 THEN 1
    ELSE 2
END;`} 
          />
          <p className="text-sm text-slate-500 italic">
            Esto permite priorizar registros (por ejemplo, salarios altos) asegurando que aparezcan primero.
          </p>
        </Section>

        {/* Sección 5 */}
        <Section 
          title="Aplicaciones comunes de CASE" 
          icon={Sparkles}
          visualTitle="De Datos en Bruto a Información"
          visual={<TransformVisual />}
        >
          <p>El uso de CASE es sumamente versátil en consultas SQL. Sus aplicaciones más habituales incluyen:</p>
          <ul className="list-disc list-inside space-y-2 mt-2 text-slate-600 ml-4">
            <li><strong>Clasificación de datos</strong> en diferentes categorías comerciales.</li>
            <li><strong>Etiquetado dinámico</strong> de resultados sobre la marcha.</li>
            <li><strong>Transformación de valores</strong> técnicos para facilitar su interpretación por usuarios finales.</li>
            <li><strong>Personalización de criterios</strong> de ordenamiento complejos.</li>
          </ul>
        </Section>

        {/* Sección 6 */}
        <Section 
          title="Enriquecimiento de consultas" 
          icon={Workflow}
          visualTitle="Flujo de Procesamiento en Base de Datos"
          visual={<ConclusionVisual />}
        >
          <p>
            La sentencia <code>CASE</code> permite integrar decisiones directamente en SQL, evitando procesamiento adicional y redundante en Python. Su uso mejora notablemente la <strong>claridad, expresividad y utilidad</strong> de las consultas, convirtiéndose en una herramienta esencial en tareas de análisis, limpieza y presentación de datos.
          </p>
        </Section>

      </div>
    </div>
  );
}