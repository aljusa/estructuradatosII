import React, { useState } from 'react';

// --- Componentes Reutilizables ---

const CodeBlock = ({ code, language = 'python' }: { code: string; language?: string }) => (
  <div className="relative rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-700 my-5 shadow-lg">
    <div className="bg-[#2d2d2d] text-gray-400 text-xs px-4 py-2 uppercase tracking-widest font-semibold flex justify-between items-center select-none">
      <span>{language}</span>
    </div>
    <pre className="p-5 overflow-x-auto text-[13px] sm:text-sm text-[#d4d4d4] font-mono leading-relaxed">
      <code>{code}</code>
    </pre>
  </div>
);

const Heading = ({
  children,
  level = 1
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
}) => {
  const styles = {
    1: "text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 tracking-tight",
    2: "text-xl sm:text-2xl font-bold text-gray-800 mt-8 mb-4",
    3: "text-lg sm:text-xl font-semibold text-gray-800 mt-6 mb-3"
  };

  const Tag = `h${level}` as `h${1 | 2 | 3}`;

  return <Tag className={styles[level]}>{children}</Tag>;
};

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-700 leading-relaxed mb-4 text-base sm:text-lg">{children}</p>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="mb-2 text-gray-700 flex items-start">
    <span className="text-blue-500 mr-2 mt-0.5">•</span>
    <span>{children}</span>
  </li>
);

// --- Contenido de las Pestañas ---

const tabsData = [
  {
    id: 'tab1',
    label: '1️⃣ Capas personalizadas',
    title: '1️⃣ Crear capas personalizadas',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>1️⃣ Crear capas personalizadas</Heading>
        <Paragraph>Cuando necesitas comportamiento especial.</Paragraph>
        
        <CodeBlock code={`import tensorflow as tf\nfrom tensorflow.keras import layers\n\nclass MiCapa(layers.Layer):\n    def __init__(self, units=32):\n        super(MiCapa, self).__init__()\n        self.units = units\n\n    def build(self, input_shape):\n        self.w = self.add_weight(\n            shape=(input_shape[-1], self.units),\n            initializer='random_normal',\n            trainable=True\n        )\n        self.b = self.add_weight(\n            shape=(self.units,),\n            initializer='zeros',\n            trainable=True\n        )\n\n    def call(self, inputs):\n        return tf.matmul(inputs, self.w) + self.b`} />
        
        <Heading level={3}>🔎 Explicación</Heading>
        <ul className="list-none pl-0 space-y-2 mb-6">
          <ListItem><code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm">build()</code> crea pesos.</ListItem>
          <ListItem><code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm">call()</code> define la operación forward.</ListItem>
          <ListItem><code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm">add_weight()</code> registra pesos entrenables.</ListItem>
        </ul>
        
        <Paragraph>Uso:</Paragraph>
        <CodeBlock code={`model = tf.keras.Sequential([\n    MiCapa(64),\n    layers.ReLU(),\n    layers.Dense(10)\n])`} />
      </div>
    )
  },
  {
    id: 'tab2',
    label: '2️⃣ Modelo personalizado',
    title: '2️⃣ Crear modelo personalizado con tf.keras.Model',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>2️⃣ Crear modelo personalizado con <code className="bg-gray-100 text-pink-600 px-2 py-1 rounded-md text-[0.8em] align-middle">tf.keras.Model</code></Heading>
        <Paragraph>Cuando necesitas arquitectura compleja.</Paragraph>
        
        <CodeBlock code={`class MiModelo(tf.keras.Model):\n    def __init__(self):\n        super(MiModelo, self).__init__()\n        self.flatten = layers.Flatten()\n        self.d1 = layers.Dense(128, activation='relu')\n        self.d2 = layers.Dense(10)\n\n    def call(self, x):\n        x = self.flatten(x)\n        x = self.d1(x)\n        return self.d2(x)\n\nmodel = MiModelo()`} />
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6 rounded-r-lg">
          <p className="text-blue-900 font-medium">🔎 Ventaja: permite múltiples inputs, outputs y lógica personalizada.</p>
        </div>
      </div>
    )
  },
  {
    id: 'tab3',
    label: '3️⃣ Custom Loss',
    title: '3️⃣ Custom Loss Function',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>3️⃣ Custom Loss Function</Heading>
        
        <CodeBlock code={`def mi_loss(y_true, y_pred):\n    return tf.reduce_mean(tf.square(y_true - y_pred)) + 0.01`} />
        
        <Paragraph>Compilar:</Paragraph>
        
        <CodeBlock code={`model.compile(optimizer='adam', loss=mi_loss)`} />
        
        <Paragraph>Puedes agregar penalizaciones o reglas propias.</Paragraph>
      </div>
    )
  },
  {
    id: 'tab4',
    label: '4️⃣ Custom Metric',
    title: '4️⃣ Custom Metric',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>4️⃣ Custom Metric</Heading>
        
        <CodeBlock code={`class MiAccuracy(tf.keras.metrics.Metric):\n    def __init__(self, name='mi_accuracy', **kwargs):\n        super().__init__(name=name, **kwargs)\n        self.aciertos = self.add_weight(name='aciertos', initializer='zeros')\n        self.total = self.add_weight(name='total', initializer='zeros')\n\n    def update_state(self, y_true, y_pred, sample_weight=None):\n        pred = tf.argmax(y_pred, axis=1)\n        y_true = tf.cast(y_true, tf.int64)\n        matches = tf.cast(tf.equal(pred, y_true), tf.float32)\n        self.aciertos.assign_add(tf.reduce_sum(matches))\n        self.total.assign_add(tf.cast(tf.size(y_true), tf.float32))\n\n    def result(self):\n        return self.aciertos / self.total\n\n    def reset_states(self):\n        self.aciertos.assign(0.)\n        self.total.assign(0.)`} />
      </div>
    )
  },
  {
    id: 'tab5',
    label: '5️⃣ Transfer Learning',
    title: '5️⃣ Transfer Learning',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>5️⃣ Transfer Learning</Heading>
        <Paragraph>Usamos modelo preentrenado (ej. MobileNetV2).</Paragraph>
        
        <CodeBlock code={`base_model = tf.keras.applications.MobileNetV2(\n    input_shape=(224,224,3),\n    include_top=False,\n    weights='imagenet'\n)\n\nbase_model.trainable = False  # congelar capas\n\nmodel = tf.keras.Sequential([\n    base_model,\n    layers.GlobalAveragePooling2D(),\n    layers.Dense(1, activation='sigmoid')\n])\n\nmodel.compile(optimizer='adam',\n              loss='binary_crossentropy',\n              metrics=['accuracy'])`} />
        
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6 rounded-r-lg">
          <p className="text-green-900 font-medium">🔎 Solo entrenas la última capa.</p>
        </div>
      </div>
    )
  },
  {
    id: 'tab6',
    label: '6️⃣ Fine Tuning',
    title: '6️⃣ Fine Tuning',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>6️⃣ Fine Tuning</Heading>
        <Paragraph>Descongelar últimas capas:</Paragraph>
        
        <CodeBlock code={`base_model.trainable = True\n\nfor layer in base_model.layers[:-20]:\n    layer.trainable = False\n\nmodel.compile(optimizer=tf.keras.optimizers.Adam(1e-5),\n              loss='binary_crossentropy',\n              metrics=['accuracy'])`} />
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-6 rounded-r-lg">
          <p className="text-yellow-900 font-medium">🔎 Se usa learning rate pequeño.</p>
        </div>
      </div>
    )
  },
  {
    id: 'tab7',
    label: '7️⃣ TensorBoard',
    title: '7️⃣ TensorBoard',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>7️⃣ TensorBoard</Heading>
        <Paragraph>Visualización profesional.</Paragraph>
        
        <CodeBlock code={`log_dir = "logs"\n\ntensorboard_callback = tf.keras.callbacks.TensorBoard(\n    log_dir=log_dir,\n    histogram_freq=1\n)\n\nmodel.fit(x_train, y_train,\n          epochs=5,\n          validation_split=0.1,\n          callbacks=[tensorboard_callback])`} />
        
        <Paragraph>Ejecutar en terminal:</Paragraph>
        <CodeBlock code={`tensorboard --logdir=logs`} language="bash" />
        
        <Paragraph>Permite ver:</Paragraph>
        <ul className="list-none pl-0 space-y-2 mb-6">
          <ListItem>Loss</ListItem>
          <ListItem>Accuracy</ListItem>
          <ListItem>Histogramas</ListItem>
          <ListItem>Arquitectura</ListItem>
          <ListItem>Embeddings</ListItem>
        </ul>
      </div>
    )
  },
  {
    id: 'tab8',
    label: '8️⃣ Deployment',
    title: '8️⃣ Deployment básico',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>8️⃣ Deployment básico</Heading>
        
        <Paragraph>Guardar modelo completo:</Paragraph>
        <CodeBlock code={`model.save("modelo_produccion")`} />
        
        <Paragraph>Cargar en otra app:</Paragraph>
        <CodeBlock code={`modelo = tf.keras.models.load_model("modelo_produccion")\npred = modelo.predict(nuevos_datos)`} />
        
        <Heading level={2}>Exportar a TensorFlow Lite (móvil)</Heading>
        <CodeBlock code={`converter = tf.lite.TFLiteConverter.from_saved_model("modelo_produccion")\ntflite_model = converter.convert()\n\nwith open("modelo.tflite", "wb") as f:\n    f.write(tflite_model)`} />
      </div>
    )
  },
  {
    id: 'tab9',
    label: '📊 Resumen',
    title: '📊 Resumen Nivel Avanzado',
    content: (
      <div className="animate-fadeIn">
        <Heading level={1}>📊 Resumen Nivel Avanzado</Heading>
        
        <div className="overflow-x-auto mt-6 rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-700 font-bold">
              <tr>
                <th scope="col" className="px-6 py-4 border-r border-gray-200">Tema</th>
                <th scope="col" className="px-6 py-4">Cuándo usarlo</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">Capa personalizada</td>
                <td className="px-6 py-4 text-gray-700">Operación matemática nueva</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">Modelo subclassing</td>
                <td className="px-6 py-4 text-gray-700">Arquitectura compleja</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">Custom loss</td>
                <td className="px-6 py-4 text-gray-700">Penalizaciones especiales</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">Custom metric</td>
                <td className="px-6 py-4 text-gray-700">Métrica de negocio</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">Transfer learning</td>
                <td className="px-6 py-4 text-gray-700">Pocos datos</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">Fine tuning</td>
                <td className="px-6 py-4 text-gray-700">Mejorar modelo preentrenado</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">TensorBoard</td>
                <td className="px-6 py-4 text-gray-700">Monitoreo profesional</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900 border-r border-gray-100">Deployment</td>
                <td className="px-6 py-4 text-gray-700">Producción</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      {/* Definición de animaciones en CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        /* Ocultar scrollbar pero permitir scroll */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="max-w-6xl mx-auto md:py-8 md:px-6">
        <div className="bg-white md:rounded-2xl md:shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[90vh] md:min-h-[800px] border border-gray-200">
          
          {/* Navegación (Tabs) */}
          <nav className="w-full md:w-72 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 flex-shrink-0 flex flex-row md:flex-col overflow-x-auto hide-scrollbar z-10">
            <div className="p-4 md:p-6 sticky left-0 bg-gray-50 shadow-[10px_0_10px_-10px_rgba(0,0,0,0.1)] md:shadow-none hidden md:block">
              <h2 className="font-bold text-gray-800 text-lg uppercase tracking-wider">Módulos Avanzados</h2>
              <p className="text-sm text-gray-500 mt-1">TensorFlow & Keras</p>
            </div>
            
            <div className="flex md:flex-col md:px-3 md:pb-6 gap-1 p-2 md:p-0">
              {tabsData.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-shrink-0 md:w-full text-left px-4 py-3 md:px-5 md:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 whitespace-nowrap md:whitespace-normal outline-none focus:ring-2 focus:ring-blue-500/50
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-md transform md:translate-x-1' 
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}
                    `}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Área de Contenido */}
          <main className="flex-grow bg-white p-6 sm:p-8 md:p-12 overflow-y-auto w-full relative">
            <div className="max-w-3xl mx-auto">
              {tabsData.find(t => t.id === activeTab)?.content}
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}