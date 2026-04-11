import React from 'react';
import { 
  Database, 
  Table2, 
  ArrowRight, 
  ArrowDownToLine, 
  Layers, 
  SplitSquareHorizontal, 
  CheckCircle2, 
  LayoutDashboard,
  Code
} from 'lucide-react';

// --- Visual Components for each section ---

const IntroVisual = () => (
  <div className="flex flex-col items-center bg-slate-50 p-6 rounded-xl border border-slate-200">
    <div className="flex items-center gap-4 mb-4 text-slate-600">
      <div className="flex flex-col items-center">
        <Table2 size={32} className="mb-2 text-blue-500" />
        <span className="text-sm font-semibold">Tabla Original</span>
      </div>
      <ArrowRight size={24} className="text-slate-400" />
      <div className="flex flex-col items-center">
        <Layers size={32} className="mb-2 text-indigo-500" />
        <span className="text-sm font-semibold">Funciones de Ventana</span>
      </div>
    </div>
    
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm text-sm">
      <thead className="bg-slate-100 text-slate-600">
        <tr>
          <th className="py-2 px-4 text-left">ID</th>
          <th className="py-2 px-4 text-left">Nombre</th>
          <th className="py-2 px-4 text-left bg-indigo-50 text-indigo-700 border-l-2 border-indigo-200">Columna Calculada</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t border-slate-100">
          <td className="py-2 px-4">1</td>
          <td className="py-2 px-4">Ana</td>
          <td className="py-2 px-4 bg-indigo-50 font-mono text-indigo-600 border-l-2 border-indigo-200">f(x) dependiente de 1..n</td>
        </tr>
        <tr className="border-t border-slate-100">
          <td className="py-2 px-4">2</td>
          <td className="py-2 px-4">Juan</td>
          <td className="py-2 px-4 bg-indigo-50 font-mono text-indigo-600 border-l-2 border-indigo-200">f(y) dependiente de 1..n</td>
        </tr>
      </tbody>
    </table>
    <p className="mt-4 text-xs text-slate-500 text-center max-w-md">
      Las filas originales (Ana, Juan) se mantienen intactas, pero se les añade contexto adicional calculado sobre el total del conjunto.
    </p>
  </div>
);

const RowNumberVisual = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-800 text-white">
        <tr>
          <th className="py-2 px-4 text-left rounded-tl-md">Nombre</th>
          <th className="py-2 px-4 text-left">Salario (DESC) <ArrowDownToLine size={14} className="inline"/></th>
          <th className="py-2 px-4 text-center bg-blue-600 rounded-tr-md">Ranking (ROW_NUMBER)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-100 bg-blue-50">
          <td className="py-2 px-4">Elena</td>
          <td className="py-2 px-4 font-mono">$6,000</td>
          <td className="py-2 px-4 text-center font-bold text-blue-700">1</td>
        </tr>
        <tr className="border-b border-slate-100">
          <td className="py-2 px-4">Carlos</td>
          <td className="py-2 px-4 font-mono">$5,000</td>
          <td className="py-2 px-4 text-center font-bold text-blue-700">2</td>
        </tr>
        <tr className="border-b border-slate-100">
          <td className="py-2 px-4">Ana</td>
          <td className="py-2 px-4 font-mono">$5,000</td>
          <td className="py-2 px-4 text-center font-bold text-blue-700">3</td>
        </tr>
        <tr>
          <td className="py-2 px-4">Juan</td>
          <td className="py-2 px-4 font-mono">$4,500</td>
          <td className="py-2 px-4 text-center font-bold text-blue-700">4</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const RankVisual = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 -z-10"></div>
    <table className="min-w-full text-sm">
      <thead className="bg-slate-800 text-white">
        <tr>
          <th className="py-2 px-4 text-left rounded-tl-md">Nombre</th>
          <th className="py-2 px-4 text-left">Salario (DESC)</th>
          <th className="py-2 px-4 text-center bg-amber-500 rounded-tr-md">Rango (RANK)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-100">
          <td className="py-2 px-4">Elena</td>
          <td className="py-2 px-4 font-mono">$6,000</td>
          <td className="py-2 px-4 text-center font-bold text-amber-600">1</td>
        </tr>
        <tr className="border-b border-amber-200 bg-amber-50 relative">
          <td className="py-2 px-4">Carlos</td>
          <td className="py-2 px-4 font-mono font-semibold">$5,000</td>
          <td className="py-2 px-4 text-center font-bold text-amber-600">2</td>
        </tr>
        <tr className="border-b border-amber-200 bg-amber-50 relative">
          <td className="py-2 px-4">Ana</td>
          <td className="py-2 px-4 font-mono font-semibold">$5,000</td>
          <td className="py-2 px-4 text-center font-bold text-amber-600">2</td>
        </tr>
        <tr className="relative">
          <td className="py-2 px-4">Juan</td>
          <td className="py-2 px-4 font-mono">$4,500</td>
          <td className="py-2 px-4 text-center font-bold text-amber-600">
            4 <span className="text-xs text-amber-400 ml-1 font-normal">(salto)</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const SumOverVisual = () => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <table className="min-w-full text-sm">
      <thead className="bg-slate-800 text-white">
        <tr>
          <th className="py-2 px-4 text-left rounded-tl-md">Nombre</th>
          <th className="py-2 px-4 text-left">Salario</th>
          <th className="py-2 px-4 text-right bg-emerald-600 rounded-tr-md">Total Salarios (SUM OVER)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-slate-100">
          <td className="py-2 px-4">Elena</td>
          <td className="py-2 px-4 font-mono">$6,000</td>
          <td className="py-2 px-4 text-right font-bold text-emerald-600 bg-emerald-50">$20,500</td>
        </tr>
        <tr className="border-b border-slate-100">
          <td className="py-2 px-4">Carlos</td>
          <td className="py-2 px-4 font-mono">$5,000</td>
          <td className="py-2 px-4 text-right font-bold text-emerald-600 bg-emerald-50">$20,500</td>
        </tr>
        <tr className="border-b border-slate-100">
          <td className="py-2 px-4">Ana</td>
          <td className="py-2 px-4 font-mono">$5,000</td>
          <td className="py-2 px-4 text-right font-bold text-emerald-600 bg-emerald-50">$20,500</td>
        </tr>
        <tr>
          <td className="py-2 px-4">Juan</td>
          <td className="py-2 px-4 font-mono">$4,500</td>
          <td className="py-2 px-4 text-right font-bold text-emerald-600 bg-emerald-50 rounded-br-md">$20,500</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const PartitionByVisual = () => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
    {/* Grupo IT */}
    <div className="border-2 border-blue-200 rounded-lg overflow-hidden">
      <div className="bg-blue-100 text-blue-800 px-4 py-2 font-semibold flex items-center gap-2">
        <SplitSquareHorizontal size={18} /> Partición: Departamento IT
      </div>
      <table className="min-w-full text-sm">
        <tbody>
          <tr className="border-b border-blue-50">
            <td className="py-2 px-4 w-1/3">Elena</td>
            <td className="py-2 px-4 w-1/3 font-mono">$6,000</td>
            <td className="py-2 px-4 w-1/3 text-right font-bold text-blue-700 bg-blue-50">Total: $11,000</td>
          </tr>
          <tr>
            <td className="py-2 px-4 w-1/3">Carlos</td>
            <td className="py-2 px-4 w-1/3 font-mono">$5,000</td>
            <td className="py-2 px-4 w-1/3 text-right font-bold text-blue-700 bg-blue-50">Total: $11,000</td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Grupo Ventas */}
    <div className="border-2 border-purple-200 rounded-lg overflow-hidden">
      <div className="bg-purple-100 text-purple-800 px-4 py-2 font-semibold flex items-center gap-2">
        <SplitSquareHorizontal size={18} /> Partición: Departamento Ventas
      </div>
      <table className="min-w-full text-sm">
        <tbody>
          <tr className="border-b border-purple-50">
            <td className="py-2 px-4 w-1/3">Ana</td>
            <td className="py-2 px-4 w-1/3 font-mono">$5,000</td>
            <td className="py-2 px-4 w-1/3 text-right font-bold text-purple-700 bg-purple-50">Total: $9,500</td>
          </tr>
          <tr>
            <td className="py-2 px-4 w-1/3">Juan</td>
            <td className="py-2 px-4 w-1/3 font-mono">$4,500</td>
            <td className="py-2 px-4 w-1/3 text-right font-bold text-purple-700 bg-purple-50">Total: $9,500</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const AdvantagesVisual = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex flex-col items-center opacity-80">
      <h4 className="text-red-700 font-semibold mb-4 text-sm">Antes: Subconsultas Complejas</h4>
      <div className="w-full space-y-2">
        <div className="bg-white p-2 rounded border border-red-200 text-xs text-slate-400">SELECT ...</div>
        <div className="pl-4 space-y-2 border-l-2 border-red-300 ml-2">
           <div className="bg-white p-2 rounded border border-red-200 text-xs text-slate-400">FROM (SELECT ...</div>
           <div className="pl-4 space-y-2 border-l-2 border-red-300 ml-2">
              <div className="bg-white p-2 rounded border border-red-200 text-xs text-slate-400">JOIN (SELECT ...</div>
           </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-red-600 font-medium text-center">Difícil de leer y lento de procesar</p>
    </div>
    
    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex flex-col items-center">
      <h4 className="text-emerald-700 font-semibold mb-4 text-sm">Ahora: Funciones de Ventana</h4>
      <div className="w-full space-y-2">
        <div className="bg-white p-3 rounded border border-emerald-200 text-xs text-slate-700 font-mono shadow-sm">
          SELECT id, nombre, <br/>
          <span className="text-emerald-600 font-bold">SUM(salario) OVER (...)</span> <br/>
          FROM tabla;
        </div>
      </div>
      <p className="mt-4 text-xs text-emerald-700 font-medium text-center">Lineal, claro y optimizado directamente en SQL</p>
    </div>
  </div>
);

const ConclusionVisual = () => (
  <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
    <div className="flex items-center gap-3 mb-6">
      <LayoutDashboard className="text-indigo-400" />
      <h4 className="text-white font-semibold">Panel de Reporte Ejecutivo</h4>
    </div>
    
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <table className="min-w-full text-xs text-slate-300">
        <thead className="bg-slate-950 text-slate-400">
          <tr>
            <th className="py-3 px-4 text-left">Empleado</th>
            <th className="py-3 px-4 text-left">Detalle Individual</th>
            <th className="py-3 px-4 text-right border-l border-slate-700 text-blue-400">Métricas de Ventana (Agregadas)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          <tr>
            <td className="py-3 px-4 font-medium text-white">Elena M.</td>
            <td className="py-3 px-4 text-slate-400">Ventas • $6,000</td>
            <td className="py-3 px-4 text-right">
              <span className="bg-blue-900/50 text-blue-300 py-1 px-2 rounded-md mr-2">Top #1</span>
              <span className="bg-indigo-900/50 text-indigo-300 py-1 px-2 rounded-md">% Total Dept: 35%</span>
            </td>
          </tr>
          <tr>
            <td className="py-3 px-4 font-medium text-white">Carlos G.</td>
            <td className="py-3 px-4 text-slate-400">Ventas • $5,000</td>
            <td className="py-3 px-4 text-right">
              <span className="bg-blue-900/50 text-blue-300 py-1 px-2 rounded-md mr-2">Top #2</span>
              <span className="bg-indigo-900/50 text-indigo-300 py-1 px-2 rounded-md">% Total Dept: 29%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);


// --- Main Application Structure ---
type LessonSectionProps = {
    title:string;
    description:React.ReactNode;
    code?: string;
    VisualComponent: React.ElementType;
    isHighlight: boolean
}
const LessonSection: React.FC<LessonSectionProps> = ({ title, description, code, VisualComponent, isHighlight }) => {
  return (
    <section className={`py-12 ${isHighlight ? 'bg-indigo-50/50' : 'bg-white'}`}>
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">
            {title}
          </h2>
          <div className="text-lg text-slate-600 leading-relaxed space-y-4">
            {description}
          </div>
          
          {code && (
            <div className="mt-6 rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <div className="bg-slate-800 text-slate-300 text-xs px-4 py-2 flex items-center gap-2 border-b border-slate-700">
                <Code size={14} /> SQL Query
              </div>
              <pre className="bg-slate-900 p-4 overflow-x-auto text-sm text-blue-300 font-mono">
                <code>{code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Visual Content */}
        <div className="w-full">
          <VisualComponent />
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
     

      {/* Hero Title */}
      <div className="bg-slate-900 text-white py-16 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Funciones de Ventana (Window Functions) 
                      </h1>
  
        </div>
      </div>

      {/* Main Content Sections */}
      <main>
        <LessonSection 
          title="Introducción a las funciones de ventana"
          description={
            <p>
              Las Window Functions permiten realizar cálculos sobre un conjunto de filas relacionadas con cada fila actual, sin reducir el número de resultados como ocurre con <code>GROUP BY</code>. Esto significa que cada fila conserva su identidad original, mientras se le agregan valores calculados en función de otras filas.
            </p>
          }
          VisualComponent={IntroVisual}
          isHighlight={false}
        />

        <LessonSection 
          title="ROW_NUMBER(): Numeración de filas según un orden"
          description={
            <>
              <p>
                La función <code>ROW_NUMBER()</code> asigna un número secuencial único a cada fila según un criterio de orden definido con la cláusula <code>OVER</code>.
              </p>
              <p>
                Aquí, los empleados se numeran según su salario de mayor a menor, generando un ranking único sin empates.
              </p>
            </>
          }
          code={`SELECT nombre, salario,
ROW_NUMBER() OVER (ORDER BY salario DESC) as ranking
FROM empleados;`}
          VisualComponent={RowNumberVisual}
          isHighlight={true}
        />

        <LessonSection 
          title="RANK(): Clasificación con empates"
          description={
            <>
              <p>
                La función <code>RANK()</code> también genera una clasificación, pero <strong>permite empates</strong>. Si dos filas tienen el mismo valor, reciben el mismo rango y el siguiente valor salta las posiciones intermedias.
              </p>
              <p>
                Esto es útil cuando se desea reflejar posiciones reales en presencia de valores iguales (por ejemplo, dos personas en primer lugar).
              </p>
            </>
          }
          code={`SELECT nombre, salario,
RANK() OVER (ORDER BY salario DESC) as rango
FROM empleados;`}
          VisualComponent={RankVisual}
          isHighlight={false}
        />

        <LessonSection 
          title="SUM() OVER: Agregación sin agrupar filas"
          description={
            <>
              <p>
                Las funciones clásicas de agregación también pueden utilizarse como funciones de ventana. En este caso, <code>SUM()</code> calcula el total sin agrupar los resultados.
              </p>
              <p>
                El resultado es que cada fila muestra el salario individual junto con una nueva columna que repite el total de todos los salarios combinados.
              </p>
            </>
          }
          code={`SELECT nombre, salario,
SUM(salario) OVER () as total_salarios
FROM empleados;`}
          VisualComponent={SumOverVisual}
          isHighlight={true}
        />

        <LessonSection 
          title="PARTITION BY: Segmentación de datos"
          description={
            <>
              <p>
                La cláusula <code>PARTITION BY</code> permite dividir los datos en grupos (particiones) dentro de la ventana, aplicando los cálculos de forma independiente a cada grupo.
              </p>
              <p>
                En este ejemplo, el total de salarios se calcula <em>por departamento</em>, manteniendo el detalle y la fila de cada empleado individual.
              </p>
            </>
          }
          code={`SELECT nombre, departamento, salario,
SUM(salario) OVER (PARTITION BY departamento) as total_dep
FROM empleados;`}
          VisualComponent={PartitionByVisual}
          isHighlight={false}
        />

        <LessonSection 
          title="Ventajas de las funciones de ventana"
          description={
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <span><strong>Evitan subconsultas complejas:</strong> Simplifican el código drásticamente.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <span><strong>Mejoran la legibilidad:</strong> Las consultas son más fáciles de entender y mantener.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <span><strong>Análisis avanzado nativo:</strong> Permiten análisis estadísticos directamente en SQL.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <span><strong>Mantienen el detalle:</strong> Agregan contexto analítico sin colapsar las filas de datos originales.</span>
              </li>
            </ul>
          }
          VisualComponent={AdvantagesVisual}
          isHighlight={true}
        />

        <LessonSection 
          title="Análisis avanzado sin perder detalle"
          description={
            <p>
              Las funciones de ventana son herramientas fundamentales para el análisis de datos modernos en SQL. Permiten calcular rankings, totales y métricas avanzadas sin perder la granularidad de los datos, lo que las hace especialmente útiles en reportes y análisis estadísticos robustos dentro de SQLite.
            </p>
          }
          VisualComponent={ConclusionVisual}
          isHighlight={false}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center text-sm">
        <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-4">
          <Database className="text-slate-600" size={32} />
          <p>© {new Date().getFullYear()} Academia SQL. Diseñado para propósitos educativos.</p>
        </div>
      </footer>
    </div>
  );
}