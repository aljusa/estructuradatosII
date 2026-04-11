import React from 'react';
import { Code2, Zap, ArrowRight, Table as TableIcon, Layers, Search, CheckCircle } from 'lucide-react';

// --- Visual Components ---

const DatabaseRelation = () => (
  <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
    <div className="bg-white border border-blue-200 rounded-lg shadow-sm w-48 overflow-hidden">
      <div className="bg-blue-600 text-white text-center font-bold py-2 text-sm">Tabla: usuarios</div>
      <div className="p-0 text-sm">
        <div className="flex justify-between border-b px-3 py-2 bg-blue-50">
          <span className="font-mono font-bold text-blue-700">id (PK)</span>
          <span>INT</span>
        </div>
        <div className="flex justify-between border-b px-3 py-2">
          <span>nombre</span>
          <span>TEXT</span>
        </div>
        <div className="flex justify-between px-3 py-2">
          <span>email</span>
          <span>TEXT</span>
        </div>
      </div>
    </div>

    <div className="relative flex items-center justify-center w-24 h-12">
      <div className="absolute w-full h-0.5 bg-indigo-400"></div>
      <div className="absolute bg-indigo-100 border border-indigo-400 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold">
        Relación 1:N
      </div>
    </div>

    <div className="bg-white border border-emerald-200 rounded-lg shadow-sm w-48 overflow-hidden">
      <div className="bg-emerald-600 text-white text-center font-bold py-2 text-sm">Tabla: pedidos</div>
      <div className="p-0 text-sm">
        <div className="flex justify-between border-b px-3 py-2">
          <span className="font-mono font-bold">pedido_id</span>
          <span>INT</span>
        </div>
        <div className="flex justify-between border-b px-3 py-2 bg-emerald-50">
          <span className="font-mono font-bold text-emerald-700">usuario_id (FK)</span>
          <span>INT</span>
        </div>
        <div className="flex justify-between px-3 py-2">
          <span>producto</span>
          <span>TEXT</span>
        </div>
      </div>
    </div>
  </div>
);
type VennDiagramProps = {
    type: string;
}

const VennDiagram: React.FC<VennDiagramProps> = ({ type }) => {
  const isInner = type === 'inner';
  const isLeft = type === 'left';
  const isRight = type === 'right';

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
      <svg width="300" height="180" viewBox="0 0 300 180" className="drop-shadow-sm">
        {/* Defs para la intersección */}
        <defs>
          <clipPath id="leftCircle">
            <circle cx="110" cy="90" r="70" />
          </clipPath>
          <clipPath id="rightCircle">
            <circle cx="190" cy="90" r="70" />
          </clipPath>
        </defs>

        {/* Círculo Izquierdo (Usuarios) */}
        <circle cx="110" cy="90" r="70" 
          fill={isLeft ? "#bfdbfe" : "transparent"} 
          stroke={isLeft ? "#3b82f6" : "#cbd5e1"} 
          strokeWidth="3" 
        />
        
        {/* Círculo Derecho (Pedidos) */}
        <circle cx="190" cy="90" r="70" 
          fill={isRight ? "#bbf7d0" : "transparent"} 
          stroke={isRight ? "#22c55e" : "#cbd5e1"} 
          strokeWidth="3" 
        />

        {/* Intersección */}
        <circle cx="110" cy="90" r="70" 
          fill={isInner || isLeft || isRight ? "#818cf8" : "transparent"} 
          clipPath="url(#rightCircle)"
          stroke="transparent"
        />
        
        <text x="80" y="95" className="text-sm font-bold fill-slate-700" textAnchor="middle">Usuarios</text>
        <text x="220" y="95" className="text-sm font-bold fill-slate-700" textAnchor="middle">Pedidos</text>
      </svg>
      <div className="mt-4 text-sm text-slate-600 font-medium bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
        {isInner && "Solo los registros que existen en ambas tablas."}
        {isLeft && "Todos los Usuarios, más los Pedidos que coincidan."}
        {isRight && "Todos los Pedidos, más los Usuarios que coincidan."}
      </div>
    </div>
  );
};

const IndexPerformance = () => (
  <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
    {/* Sin índice */}
    <div className="flex-1 bg-white border border-red-200 rounded-lg p-4 shadow-sm text-center opacity-80">
      <h4 className="font-bold text-red-700 mb-2 border-b border-red-100 pb-2">Sin Índice (Escaneo Completo)</h4>
      <div className="flex items-center justify-center space-x-2 my-4">
        <TableIcon className="text-slate-400" size={32} />
        <div className="flex flex-col items-center text-red-500">
          <span className="text-xs font-mono">Secuencial O(n)</span>
          <ArrowRight size={24} />
        </div>
        <Search className="text-red-400" size={32} />
      </div>
      <p className="text-xs text-slate-500">Lee cada fila de la tabla buscando la coincidencia. Lento en tablas grandes.</p>
    </div>

    {/* Con índice */}
    <div className="flex-1 bg-white border border-emerald-300 rounded-lg p-4 shadow-md text-center transform hover:scale-105 transition-transform">
      <h4 className="font-bold text-emerald-700 mb-2 border-b border-emerald-100 pb-2 flex items-center justify-center gap-2">
        <Zap size={18} /> Con Índice B-Tree
      </h4>
      <div className="flex items-center justify-center space-x-2 my-4">
        <div className="relative">
          <TableIcon className="text-emerald-600" size={32} />
          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1 border border-yellow-500">
            <Zap size={10} className="text-yellow-800"/>
          </div>
        </div>
        <div className="flex flex-col items-center text-emerald-500">
          <span className="text-xs font-mono font-bold">Búsqueda Rápida O(log n)</span>
          <ArrowRight size={24} strokeWidth={3} />
        </div>
        <CheckCircle className="text-emerald-500" size={32} />
      </div>
      <p className="text-xs text-slate-600">Salta directamente a la ubicación de los datos usando una estructura de árbol.</p>
    </div>
  </div>
);

const DataFlow = () => (
  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 my-6">
    <div className="flex items-center justify-center gap-4 mb-8 w-full max-w-lg">
      <div className="bg-blue-100 border border-blue-300 text-blue-800 p-3 rounded shadow-sm text-sm font-bold flex-1 text-center">
        Usuarios
      </div>
      <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-3 rounded shadow-sm text-sm font-bold flex-1 text-center">
        Pedidos
      </div>
      <div className="bg-purple-100 border border-purple-300 text-purple-800 p-3 rounded shadow-sm text-sm font-bold flex-1 text-center">
        Productos
      </div>
    </div>
    
    <div className="flex flex-col items-center relative">
      <div className="flex gap-16 mb-2">
        <ArrowRight size={24} className="text-slate-400 rotate-90" />
        <ArrowRight size={24} className="text-slate-400 rotate-90" />
        <ArrowRight size={24} className="text-slate-400 rotate-90" />
      </div>
      
      <div className="bg-slate-800 text-white p-3 rounded-lg shadow-lg flex items-center gap-2 z-10 font-mono text-sm">
        <Code2 size={18} className="text-indigo-400"/>
        <span>Motor de Consultas JOIN</span>
      </div>

      <ArrowRight size={32} className="text-indigo-500 rotate-90 my-2" />

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl shadow-xl font-bold flex flex-col items-center w-64 text-center">
        <Layers className="mb-2" />
        Vista Consolidada
        <span className="text-xs font-normal text-indigo-100 mt-1">Información unificada y lista para la aplicación</span>
      </div>
    </div>
  </div>
);
type CodeSnippetProps = {
  code: React.ReactNode;
  language?: string;
};
const CodeSnippet: React.FC<CodeSnippetProps> = ({
  code,
  language = "python",
}) => (
  <div className="bg-slate-900 rounded-lg overflow-hidden my-4 shadow-md">
    <div className="flex items-center justify-between px-4 py-2 bg-slate-800">
      <span className="text-xs font-mono text-slate-400">{language}</span>
      <div className="flex space-x-1">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
    </div>
    <pre className="p-4 text-sm font-mono text-slate-50 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

// --- Main Application ---

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans p-4 md:p-8">
      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <header className="bg-slate-900 text-white p-8 md:p-12 border-b-4 border-indigo-500">
      
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
            Consultas con JOIN 
          </h1>
      
        </header>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-16">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2">
              
              Introducción al uso de JOIN en bases de datos relacionales
            </h2>
            <div className="prose max-w-none text-slate-600 leading-relaxed">
              <p>
                En bases de datos relacionales, los datos se organizan en múltiples tablas para evitar redundancia y mejorar la estructura. Las operaciones <strong>JOIN</strong> permiten combinar información de dos o más tablas a partir de relaciones definidas entre ellas, generalmente mediante claves primarias y foráneas. 
              </p>
              <p className="mt-2">
                En Python, el módulo <code>sqlite3</code> facilita ejecutar estas consultas directamente sobre bases de datos SQLite, unificando el poder del lenguaje con la robustez del motor de base de datos.
              </p>
            </div>
            
            {/* Visual Suggestion 1 */}
            <DatabaseRelation />
            <p className="text-sm text-center text-slate-500 italic mt-2">
              Visualización de cómo los datos se enlazan entre sí mediante claves (ID y Usuario_ID).
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2">
              
              INNER JOIN: combinación de coincidencias
            </h2>
            <div className="prose max-w-none text-slate-600 leading-relaxed">
              <p>
                El <strong>INNER JOIN</strong> devuelve únicamente los registros que tienen correspondencia en <em>ambas</em> tablas. Es útil cuando solo interesa la información que está completamente relacionada (por ejemplo, solo los usuarios que han hecho una compra).
              </p>
            </div>
            
            <CodeSnippet code={`import sqlite3\n\nconn = sqlite3.connect("ejemplo.db")\ncursor = conn.cursor()\n\nquery = """\nSELECT usuarios.nombre, pedidos.producto\nFROM usuarios\nINNER JOIN pedidos ON usuarios.id = pedidos.usuario_id\n"""\ncursor.execute(query)\n\nfor row in cursor.fetchall():\n    print(row)`} />
            <p className="text-sm text-slate-600 bg-slate-50 border-l-4 border-slate-300 p-3 rounded">
              💡 <strong>Resultado:</strong> Aquí, solo se muestran los usuarios que tienen pedidos asociados.
            </p>

            {/* Visual Suggestion 2 */}
            <VennDiagram type="inner" />
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2">
              
              LEFT JOIN: inclusión total de la tabla izquierda
            </h2>
            <div className="prose max-w-none text-slate-600 leading-relaxed">
              <p>
                El <strong>LEFT JOIN</strong> devuelve todos los registros de la tabla izquierda (en este caso, <code>usuarios</code>), incluso si no tienen coincidencias en la tabla derecha (<code>pedidos</code>). En los casos sin coincidencia, los valores de la tabla derecha aparecen como <code>NULL</code>.
              </p>
            </div>
            
            <CodeSnippet code={`query = """\nSELECT usuarios.nombre, pedidos.producto\nFROM usuarios\nLEFT JOIN pedidos ON usuarios.id = pedidos.usuario_id\n"""\ncursor.execute(query)`} />
            <p className="text-sm text-slate-600 bg-slate-50 border-l-4 border-slate-300 p-3 rounded">
              💡 <strong>Utilidad:</strong> Esto permite identificar, por ejemplo, usuarios que <em>no</em> han realizado pedidos.
            </p>

            {/* Visual Suggestion 3 */}
            <VennDiagram type="left" />
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2">
              
              RIGHT JOIN en SQLite: simulación mediante LEFT JOIN
            </h2>
            <div className="prose max-w-none text-slate-600 leading-relaxed">
              <p>
                A diferencia de otros motores, SQLite no implementa directamente la cláusula <strong>RIGHT JOIN</strong>. Sin embargo, se puede simular fácilmente invirtiendo el orden de las tablas en un <code>LEFT JOIN</code>.
              </p>
            </div>
            
            <CodeSnippet language="sql" code={`SELECT pedidos.producto, usuarios.nombre\nFROM pedidos\nLEFT JOIN usuarios ON pedidos.usuario_id = usuarios.id`} />
            <p className="text-sm text-slate-600 bg-slate-50 border-l-4 border-slate-300 p-3 rounded">
              💡 <strong>Prioridad:</strong> En este caso, se priorizan todos los registros de pedidos, incluso si no tienen un usuario válido asociado (útil para auditorías de datos huérfanos).
            </p>

            {/* Visual Suggestion 4 */}
            <VennDiagram type="right" />
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 border-b-2 border-indigo-100 pb-2 mb-4 flex items-center gap-2">
              
              Consideraciones prácticas
            </h2>
            <div className="prose max-w-none text-slate-600 leading-relaxed mb-6">
              <p>Al trabajar con JOIN en SQLite desde Python, es importante tener en cuenta ciertos aspectos que afectan la correcta ejecución y el rendimiento:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>Consistencia:</strong> Las claves foráneas deben estar bien definidas para garantizar relaciones limpias.</li>
                <li><strong>Rendimiento:</strong> El uso de <em>índices</em> en las columnas involucradas en el JOIN (usualmente las claves foráneas) mejora significativamente el rendimiento.</li>
                <li><strong>Optimización:</strong> Seleccionar únicamente las columnas necesarias (evitar <code>SELECT *</code>) previene una sobrecarga de memoria innecesaria en la aplicación Python.</li>
              </ul>
            </div>

            {/* Visual Suggestion 5 */}
            <IndexPerformance />
          </section>

          {/* Section 6 */}
          <section className="bg-indigo-50 -mx-8 md:-mx-12 px-8 md:px-12 py-12 border-t border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4 text-center">
              La importancia en aplicaciones reales
            </h2>
            <div className="prose max-w-none text-indigo-800/80 leading-relaxed text-center max-w-3xl mx-auto">
              <p>
                Las operaciones <strong>JOIN</strong> son el tejido conectivo de las bases de datos relacionales. Son esenciales para reconstruir información que fue distribuida en distintas tablas durante el proceso de normalización. 
              </p>
              <p className="mt-4 font-medium">
                Dominar sus variantes permite crear consultas más expresivas y eficientes, habilidades fundamentales en el desarrollo backend de aplicaciones con Python y SQLite.
              </p>
            </div>

            {/* Visual Suggestion 6 */}
            <DataFlow />
          </section>

        </div>
      </main>
      
    </div>
  );
}