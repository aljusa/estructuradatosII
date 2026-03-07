import React, { useState } from 'react';
import {   ChevronRight, BookOpen } from 'lucide-react';

// --- Componente para los bloques de código con botón de copiar ---
const CodeBlock: React.FC<{ code: string }> = ({ code }) => {

  

  return (
    <div className="relative group my-6">
      <div className="absolute flex items-center justify-between w-full px-4 py-2 bg-slate-800 rounded-t-lg border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400">python</span>
        
      </div>
      <pre className="bg-slate-900 text-slate-50 p-4 pt-12 rounded-lg overflow-x-auto text-sm font-mono shadow-lg border border-slate-800">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// --- Definición de la estructura de las pestañas respetando el texto original ---
interface TabData {
  id: string;
  label: string;
  shortLabel: string;
  content: React.ReactNode;
}

const tabsData: TabData[] = [
  {
    id: 'tab-1',
    shortLabel: '1️⃣ Densa (MNIST)',
    label: '1️⃣ Red neuronal densa para clasificación (MNIST)',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">1️⃣ Red neuronal densa para clasificación (MNIST)</h1>
        <p className="mb-4 text-slate-600 text-lg">MNIST contiene imágenes 28x28 en escala de grises.</p>
        
        <CodeBlock code={`import tensorflow as tf
from tensorflow.keras import layers, models

# Cargar datos
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

# Normalizar
x_train = x_train / 255.0
x_test = x_test / 255.0

# Modelo denso (fully connected)
model = models.Sequential([
    layers.Flatten(input_shape=(28, 28)),
    layers.Dense(128, activation='relu'),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5, validation_split=0.1)

model.evaluate(x_test, y_test)`} />

        <h3 className="text-2xl font-bold mt-10 mb-5 text-slate-800 flex items-center gap-2">
          <span>🔎</span> Explicación
        </h3>
        <ul className="list-none space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">•</span>
            <span><code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded border border-slate-200 text-sm font-mono">Flatten()</code> convierte 28x28 → vector 784.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">•</span>
            <span><code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded border border-slate-200 text-sm font-mono">Dense(128)</code> crea 128 neuronas.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">•</span>
            <span><code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded border border-slate-200 text-sm font-mono">softmax</code> genera probabilidades para 10 clases.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 mt-1">•</span>
            <span><code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded border border-slate-200 text-sm font-mono">sparse_categorical_crossentropy</code> para clasificación multiclase.</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'tab-2',
    shortLabel: '2️⃣ Dropout',
    label: '2️⃣ Uso de Dropout',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">2️⃣ Uso de Dropout</h1>
        <p className="mb-4 text-slate-600 text-lg">Dropout evita overfitting apagando neuronas aleatoriamente.</p>
        
        <CodeBlock code={`model = models.Sequential([
    layers.Flatten(input_shape=(28, 28)),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])`} />
        
        <p className="mt-6 text-slate-700 bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-2">
          <span>👉</span> 
          <span><code className="bg-white text-pink-600 px-1.5 py-0.5 rounded border border-slate-200 text-sm font-mono">0.5</code> significa que desactiva 50% de neuronas en entrenamiento.</span>
        </p>
      </>
    ),
  },
  {
    id: 'tab-3',
    shortLabel: '3️⃣ Activación',
    label: '3️⃣ Función de activación personalizada',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">3️⃣ Función de activación personalizada</h1>
        
        <CodeBlock code={`def mi_activacion(x):
    return tf.nn.relu(x) * tf.math.sigmoid(x)

model = models.Sequential([
    layers.Flatten(input_shape=(28,28)),
    layers.Dense(128, activation=mi_activacion),
    layers.Dense(10, activation='softmax')
])`} />
        
        <p className="mt-6 text-slate-600 text-lg">Puedes crear cualquier función matemática diferenciable.</p>
      </>
    ),
  },
  {
    id: 'tab-4',
    shortLabel: '4️⃣ tf.data',
    label: '4️⃣ Uso de tf.data',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">4️⃣ Uso de tf.data</h1>
        <p className="mb-4 text-slate-600 text-lg">Más eficiente para grandes datasets.</p>
        
        <CodeBlock code={`train_dataset = tf.data.Dataset.from_tensor_slices((x_train, y_train))
train_dataset = train_dataset.shuffle(10000).batch(32)

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(train_dataset, epochs=5)`} />
        
        <p className="mt-8 mb-4 font-semibold text-slate-800 text-lg">Ventajas:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 marker:text-blue-500">
          <li>Mejor rendimiento</li>
          <li>Permite pipelines complejos</li>
          <li>Escalable a producción</li>
        </ul>
      </>
    ),
  },
  {
    id: 'tab-5',
    shortLabel: '5️⃣ Callbacks',
    label: '5️⃣ Callbacks',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-8 text-slate-900 leading-tight">5️⃣ Callbacks</h1>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-slate-800 border-b border-slate-200 pb-2">EarlyStopping</h2>
        <CodeBlock code={`early_stop = tf.keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=3
)`} />
        <p className="mt-4 mb-10 text-slate-600 text-lg">Detiene entrenamiento si no mejora.</p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-800 border-b border-slate-200 pb-2">ModelCheckpoint</h2>
        <CodeBlock code={`checkpoint = tf.keras.callbacks.ModelCheckpoint(
    "mejor_modelo.keras",
    save_best_only=True
)

model.fit(x_train, y_train,
          epochs=20,
          validation_split=0.1,
          callbacks=[early_stop, checkpoint])`} />
      </>
    ),
  },
  {
    id: 'tab-6',
    shortLabel: '6️⃣ CNN',
    label: '6️⃣ CNN básica para imágenes',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">6️⃣ CNN básica para imágenes</h1>
        <p className="mb-4 text-slate-600 text-lg">Las CNN detectan patrones espaciales.</p>
        
        <CodeBlock code={`model = models.Sequential([
    layers.Reshape((28,28,1), input_shape=(28,28)),
    layers.Conv2D(32, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D((2,2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)`} />
        
        <p className="mt-6 text-slate-700 font-medium bg-slate-50 p-4 rounded border border-slate-200 flex gap-2">
          <span>🔎</span> CNN suele superar a redes densas en imágenes.
        </p>
         <CodeBlock code={`import numpy as np
n= 0
pred = model.predict(x_test[n:n+1])
plt.imshow(x_test[n], cmap='gray')
plt.title(f"Predicción: {np.argmax(pred)}")
plt.show()`} />
      </>
    ),
  },
  {
    id: 'tab-7',
    shortLabel: '7️⃣ Augmentation',
    label: '7️⃣ Data Augmentation',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">7️⃣ Data Augmentation</h1>
        <p className="mb-4 text-slate-600 text-lg">Genera imágenes modificadas automáticamente.</p>
        
        <CodeBlock code={`data_augmentation = tf.keras.Sequential([
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])

model = models.Sequential([
    layers.Reshape((28,28,1), input_shape=(28,28)),
    data_augmentation,
    layers.Conv2D(32, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(10, activation='softmax')
])`} />
        
        <p className="mt-6 text-slate-600 text-lg">Mejora generalización.</p>
      </>
    ),
  },
  {
    id: 'tab-8',
    shortLabel: '8️⃣ Hiperparámetros',
    label: '8️⃣ Ajuste de hiperparámetros (manual simple)',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">8️⃣ Ajuste de hiperparámetros (manual simple)</h1>
        
        <CodeBlock code={`learning_rates = [0.01, 0.001, 0.0001]

for lr in learning_rates:
    model = models.Sequential([
        layers.Flatten(input_shape=(28,28)),
        layers.Dense(128, activation='relu'),
        layers.Dense(10, activation='softmax')
    ])
    
    model.compile(optimizer=tf.keras.optimizers.Adam(lr),
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    
    print(f"Entrenando con LR={lr}")
    model.fit(x_train, y_train, epochs=3, verbose=0)`} />
        
        <p className="mt-8 mb-4 font-semibold text-slate-800 text-lg">Hiperparámetros comunes:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 marker:text-blue-500">
          <li>learning rate</li>
          <li>número de capas</li>
          <li>número de neuronas</li>
          <li>batch size</li>
        </ul>
      </>
    ),
  },
  {
    id: 'tab-9',
    shortLabel: '9️⃣ GradientTape',
    label: '9️⃣ Custom Training Loop con GradientTape',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">9️⃣ Custom Training Loop con GradientTape</h1>
        <p className="mb-4 text-slate-600 text-lg">Control total del entrenamiento.</p>
        
        <CodeBlock code={`optimizer = tf.keras.optimizers.Adam()
loss_fn = tf.keras.losses.SparseCategoricalCrossentropy()

model = models.Sequential([
    layers.Flatten(input_shape=(28,28)),
    layers.Dense(128, activation='relu'),
    layers.Dense(10)
])

for epoch in range(3):
    for x_batch, y_batch in train_dataset:
        
        with tf.GradientTape() as tape:
            logits = model(x_batch, training=True)
            loss = loss_fn(y_batch, logits)
        
        grads = tape.gradient(loss, model.trainable_variables)
        optimizer.apply_gradients(zip(grads, model.trainable_variables))
    
    print("Epoch:", epoch, "Loss:", loss.numpy())`} />
        
        <p className="mt-8 mb-4 font-semibold text-slate-800 text-lg">Aquí ves exactamente cómo:</p>
        <ol className="list-decimal pl-6 space-y-3 text-slate-700 marker:text-blue-500 marker:font-bold">
          <li>Se calcula el error</li>
          <li>Se calculan gradientes</li>
          <li>Se actualizan pesos</li>
        </ol>
      </>
    ),
  },
  {
    id: 'tab-10',
    shortLabel: '🔟 Pesos',
    label: '🔟 Guardar y cargar pesos manualmente',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-6 text-slate-900 leading-tight">🔟 Guardar y cargar pesos manualmente</h1>
        
        <p className="mb-2 text-slate-600 text-lg">Guardar solo pesos:</p>
        <CodeBlock code={`model.save_weights("pesos.weights.h5")`} />
        
        <p className="mt-8 mb-2 text-slate-600 text-lg">Cargar:</p>
        <CodeBlock code={`model.load_weights("pesos.weights.h5")`} />
        
        <p className="mt-8 text-amber-800 bg-amber-50 p-4 rounded-lg border border-amber-200 flex items-center gap-3 shadow-sm">
          <span className="text-xl">⚠️</span> 
          <span className="font-medium">Debes recrear la arquitectura antes de cargar pesos.</span>
        </p>
      </>
    ),
  },
  {
    id: 'tab-11',
    shortLabel: '📊 Resumen',
    label: '📊 Resumen',
    content: (
      <>
        <h1 className="text-3xl font-bold mb-8 text-slate-900 leading-tight">📊 Resumen</h1>
        
        <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-slate-800 font-semibold w-1/8">Concepto</th>
                <th className="py-4 px-6 text-slate-800 font-semibold w-7/8">Descripcion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium">CNN</td>
                <td className="py-4 px-6 text-slate-600">Redes Neuronales Convolucionales utilizadas principalmente en visión por computadora. Detectan patrones espaciales en imágenes mediante capas convolucionales.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium">Dropout</td>
                <td className="py-4 px-6 text-slate-600">Técnica de regularización que desactiva aleatoriamente neuronas durante el entrenamiento para reducir el sobreajuste.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium">tf.data</td>
                <td className="py-4 px-6 text-slate-600">API de TensorFlow para crear pipelines eficientes de carga y procesamiento de datos, optimizando rendimiento y escalabilidad.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium">Callbacks</td>
                <td className="py-4 px-6 text-slate-600">Funciones que se ejecutan durante el entrenamiento para monitorear, guardar modelos, ajustar learning rate o detener entrenamiento automáticamente.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium">GradientTape</td>
                <td className="py-4 px-6 text-slate-600">Herramienta de TensorFlow para calcular gradientes automáticamente, esencial para entrenar modelos personalizados y entender backpropagation.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium">Data Augmentation</td>
                <td className="py-4 px-6 text-slate-600">Técnica que genera variaciones artificiales de imágenes (rotaciones, zoom, flips, etc.) para mejorar la generalización del modelo.</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-medium">Hiperparámetros</td>
                <td className="py-4 px-6 text-slate-600">Parámetros configurables antes del entrenamiento (learning rate, batch size, epochs, etc.) que influyen directamente en el desempeño del modelo.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
];

export default function App() {
  const [activeTabId, setActiveTabId] = useState<string>(tabsData[0].id);

  const activeTab = tabsData.find(t => t.id === activeTabId) || tabsData[0];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans text-slate-900">
      
      {/* Navegación móvil (Scroll horizontal) */}
      <div className="md:hidden sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex overflow-x-auto gap-2 p-3 hide-scrollbar items-center">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                activeTabId === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Navegación Desktop (Sidebar) */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 border-r border-slate-200 bg-slate-50/50 shrink-0 h-screen sticky top-0 overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <BookOpen size={24} />
            <span>TensorFlow</span>
          </div>
          <p className="text-slate-500 text-sm mt-2">Nivel intermedio</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabsData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                activeTabId === tab.id
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:bg-slate-200/50 border border-transparent'
              }`}
            >
              <span className="truncate pr-2">{tab.label}</span>
              <ChevronRight 
                size={16} 
                className={`transition-transform duration-200 shrink-0 ${
                  activeTabId === tab.id ? 'text-blue-500 translate-x-1' : 'text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2'
                }`} 
              />
            </button>
          ))}
        </nav>
      </aside>

      {/* Área de contenido principal */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto p-6 md:p-10 lg:p-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {activeTab.content}
        </div>
      </main>

      {/* Estilos globales para esconder scrollbars si es necesario */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}