import React, { useState } from 'react';

// Componente para resaltar código en línea dentro del texto
const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded-md text-[0.9em] font-mono border border-slate-200">
    {children}
  </code>
);

// Componente para los bloques de código (estilo IDE moderno)
const CodeBlock = ({ code }: { code: string }) => (
  <div className="relative group rounded-xl bg-[#0f172a] overflow-hidden my-6 border border-slate-700 shadow-xl">
    <div className="flex items-center px-4 py-3 bg-[#1e293b] border-b border-slate-700">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
      </div>
      <span className="ml-4 text-xs text-slate-400 font-mono tracking-wider uppercase">python</span>
    </div>
    <div className="p-5 overflow-x-auto">
      <pre className="text-[0.95rem] font-mono text-slate-50 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

// Título principal de cada pestaña
const TabTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
    {children}
  </h1>
);

// Subtítulos
const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-bold text-slate-800 mt-10 mb-5 flex items-center gap-2">
    {children}
  </h3>
);

// Párrafos
const Paragraph = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-slate-600 leading-relaxed mb-4 text-lg ${className}`}>
    {children}
  </p>
);

// Listas
const List = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 space-y-3 text-slate-600 mb-6 text-lg marker:text-slate-400">
    {children}
  </ul>
);

export default function App() {
  const [activeTab, setActiveTab] = useState(1);

  // Definición de las pestañas y su contenido exacto
  const tabs = [
    {
      id: 1,
      title: "1️⃣ Operaciones básicas",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>1️⃣ Crear tensores y operaciones básicas</TabTitle>
          <CodeBlock
            code={`import tensorflow as tf\n\n# Crear tensores\na = tf.constant([1, 2, 3])\nb = tf.constant([4, 5, 6])\n\nprint("Tensor a:", a)\nprint("Tensor b:", b)\n\n# Operaciones básicas\nsuma = a + b\nmultiplicacion = a * b\n\nprint("Suma:", suma)\nprint("Multiplicación:", multiplicacion)`}
          />
          <SubTitle>🔎 Explicación</SubTitle>
          <List>
            <li><InlineCode>tf.constant()</InlineCode> crea un tensor inmutable.</li>
            <li>TensorFlow funciona como NumPy pero optimizado para GPU.</li>
            <li>Las operaciones matemáticas funcionan igual que en arrays.</li>
          </List>
          <Paragraph>
            Un tensor es básicamente una <strong>estructura de datos multidimensional</strong> (vector, matriz, etc.).
          </Paragraph>
        </div>
      )
    },
    {
      id: 2,
      title: "2️⃣ Uso de tf.Variable",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>2️⃣ Uso de <InlineCode>tf.Variable</InlineCode></TabTitle>
          <CodeBlock
            code={`# Variable entrenable\npeso = tf.Variable(2.0)\n\nprint("Valor inicial:", peso.numpy())\n\n# Cambiar valor\npeso.assign(5.0)\n\nprint("Nuevo valor:", peso.numpy())`}
          />
          <SubTitle>🔎 Explicación</SubTitle>
          <List>
            <li><InlineCode>tf.Variable</InlineCode> es mutable.</li>
            <li>Se usa para parámetros que cambian durante el entrenamiento (pesos y bias).</li>
            <li><InlineCode>.assign()</InlineCode> modifica el valor.</li>
          </List>
          <Paragraph className="bg-blue-50 text-blue-800 p-4 rounded-lg border border-blue-100">
            👉 Los modelos entrenan ajustando <InlineCode>Variables</InlineCode>.
          </Paragraph>
        </div>
      )
    },
    {
      id: 3,
      title: "3️⃣ Modelo con Sequential",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>3️⃣ Modelo simple con Sequential</TabTitle>
          <CodeBlock
            code={`from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Dense\n\nmodelo = Sequential([\n    Dense(1, input_shape=(1,))\n])\n\nmodelo.summary()`}
          />
          <SubTitle>🔎 Explicación</SubTitle>
          <List>
            <li><InlineCode>Sequential</InlineCode> crea una red capa por capa.</li>
            <li><InlineCode>Dense(1)</InlineCode> = una neurona.</li>
            <li><InlineCode>input_shape=(1,)</InlineCode> = una entrada numérica.</li>
          </List>
          <Paragraph>
            Es la forma más simple de crear redes neuronales.
          </Paragraph>
        </div>
      )
    },
    {
      id: 4,
      title: "4️⃣ Regresión Lineal",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>4️⃣ Regresión Lineal</TabTitle>
          <div className="mb-6">
            <Paragraph>Vamos a predecir:</Paragraph>
            <p className="text-2xl font-bold text-slate-900 mt-1">y = 2x + 1</p>
          </div>
          <CodeBlock
            code={`import numpy as np

# Datos
x = np.array([1, 2, 3, 4, 5], dtype=float)
y = np.array([3, 5, 7, 9, 11], dtype=float)

# Modelo
modelo = Sequential([
    Dense(1, input_shape=(1,))
])

modelo.compile(optimizer='sgd', loss='mse')

modelo.fit(x, y, epochs=100, verbose=0)

print("Predicción para x=6:", modelo.predict(np.array([[6.0]])))`}
          />
          <SubTitle>🔎 Explicación</SubTitle>
          <List>
            <li><InlineCode>optimizer='sgd'</InlineCode> → ajusta pesos.</li>
            <li><InlineCode>loss='mse'</InlineCode> → error cuadrático medio.</li>
            <li>Después de entrenar, debería predecir cercano a <strong>13</strong>.</li>
          </List>
          <Paragraph>
            Aquí TensorFlow aprende peso≈2 y bias≈1.
          </Paragraph>
        </div>
      )
    },
    {
      id: 5,
      title: "5️⃣ Clasificación binaria",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>5️⃣ Clasificación binaria simple</TabTitle>
          <div className="mb-6">
            <Paragraph>Ejemplo:</Paragraph>
            <Paragraph className="!mb-1">Si x &gt; 0 → clase 1</Paragraph>
            <Paragraph>Si x &lt;= 0 → clase 0</Paragraph>
          </div>
          <CodeBlock
            code={`# Datos
x = np.array([-2, -1, 0, 1, 2], dtype=float)
y = np.array([0, 0, 0, 1, 1], dtype=float)

modelo = Sequential([
    Dense(1, activation='sigmoid', input_shape=(1,))
])

modelo.compile(optimizer='sgd',
               loss='binary_crossentropy',
               metrics=['accuracy'])

modelo.fit(x, y, epochs=200, verbose=0)

print("Predicción para 3:", modelo.predict(np.array([[3.0]])))`}
          />
          <SubTitle>🔎 Explicación</SubTitle>
          <List>
            <li><InlineCode>sigmoid</InlineCode> convierte salida en probabilidad (0–1).</li>
            <li><InlineCode>binary_crossentropy</InlineCode> se usa para clasificación binaria.</li>
            <li>La salida será algo cercano a 1.</li>
          </List>
        </div>
      )
    },
    {
      id: 6,
      title: "6️⃣ Entrenar (model.fit)",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>6️⃣ Entrenar con <InlineCode>model.fit()</InlineCode></TabTitle>
          <Paragraph>Estructura general:</Paragraph>
          <CodeBlock
            code={`modelo.fit(\n    x, y,\n    epochs=100,\n    batch_size=32,\n    validation_split=0.2\n)`}
          />
          <SubTitle>Parámetros importantes</SubTitle>
          <List>
            <li><InlineCode>epochs</InlineCode> → cuántas veces ve los datos.</li>
            <li><InlineCode>batch_size</InlineCode> → tamaño de lote.</li>
            <li><InlineCode>validation_split</InlineCode> → porcentaje para validar.</li>
          </List>
        </div>
      )
    },
    {
      id: 7,
      title: "7️⃣ Evaluar modelo",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>7️⃣ Evaluar modelo</TabTitle>
          <CodeBlock
            code={`loss, accuracy = modelo.evaluate(x, y)\n\nprint("Loss:", loss)\nprint("Accuracy:", accuracy)`}
          />
          <List>
            <li><InlineCode>evaluate()</InlineCode> prueba el modelo.</li>
            <li>Devuelve pérdida y métricas definidas.</li>
          </List>
        </div>
      )
    },
    {
      id: 8,
      title: "8️⃣ Guardar y cargar",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>8️⃣ Guardar y cargar modelo</TabTitle>
          <SubTitle>Guardar</SubTitle>
          <CodeBlock
            code={`modelo.save("mi_modelo.keras")`}
          />
          <SubTitle>Cargar</SubTitle>
          <CodeBlock
            code={`from tensorflow.keras.models import load_model

modelo_cargado = load_model("mi_modelo.keras")

print(modelo_cargado.predict(np.array([[6.0]])))`}
          />
          <Paragraph>
            Esto permite usar el modelo después sin volver a entrenar.
          </Paragraph>
        <Paragraph>
              <a href="https://netron.app/"> <strong>https://netron.app/</strong></a> permite visualizar el modelo.
         </Paragraph>
        </div>
      )
    },
    {
      id: 9,
      title: "🎯 Resumen",
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TabTitle>🎯 Resumen Conceptual</TabTitle>
          <div className="overflow-x-auto mt-8">
            <table className="w-full text-left border-collapse bg-white shadow-sm rounded-xl overflow-hidden ring-1 ring-slate-200">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-lg">Concepto</th>
                  <th className="px-6 py-4 font-semibold text-lg">Qué hace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600 text-lg">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Tensor</td>
                  <td className="px-6 py-4">Datos multidimensionales</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Variable</td>
                  <td className="px-6 py-4">Parámetro entrenable</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Sequential</td>
                  <td className="px-6 py-4">Modelo simple por capas</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">Dense</td>
                  <td className="px-6 py-4">Capa totalmente conectada</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">compile()</td>
                  <td className="px-6 py-4">Configura entrenamiento</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">fit()</td>
                  <td className="px-6 py-4">Entrena</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">evaluate()</td>
                  <td className="px-6 py-4">Evalúa</td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">save()</td>
                  <td className="px-6 py-4">Guarda modelo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white font-sans text-slate-900">
      
      {/* Navegación Móvil (Horizontal arriba) */}
      <nav className="md:hidden flex overflow-x-auto border-b border-slate-200 bg-slate-50 shadow-sm z-10 sticky top-0 scrollbar-hide">
        <div className="flex p-2 gap-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </nav>

      {/* Navegación Desktop (Barra lateral izquierda) */}
      <aside className="hidden md:flex flex-col w-80 bg-slate-50 border-r border-slate-200 h-full overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-8 border-b border-slate-200 sticky top-0 bg-slate-50 z-20">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span className="text-3xl">🧠</span> TensorFlow
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Guía de conceptos básicos</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-5 py-4 rounded-xl text-sm font-semibold transition-all duration-200 border border-transparent ${
                activeTab === tab.id
                  ? 'bg-white text-blue-700 shadow-sm border-slate-200 ring-1 ring-black/5 scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 h-full overflow-y-auto bg-white p-6 md:p-12 lg:p-20 scroll-smooth">
        <div className="max-w-4xl mx-auto pb-20">
          {tabs.find(t => t.id === activeTab)?.content}
        </div>
      </main>
      
    </div>
  );
}