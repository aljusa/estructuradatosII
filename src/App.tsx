import { useState } from 'react'

import Lesson1 from './components/Lesson1'
import Lesson2 from './components/Lesson2'
import Lesson3 from './components/Lesson3'
import Lesson4 from './components/Lesson4'
import Lesson5 from './components/Lesson5'
import Lesson6 from './components/Lesson6'
import Lesson7 from './components/Lesson7'

const lessons = {
  lesson1: Lesson1,
  lesson2: Lesson2,
  lesson3: Lesson3,
  lesson4: Lesson4,
  lesson5: Lesson5,
  lesson6: Lesson6,
  lesson7: Lesson7,

  
} as const

type LessonKey = keyof typeof lessons

function App() {
  const [lesson, setLesson] = useState<LessonKey>('lesson1')

  const renderLesson = () => {
    const LessonComponent = lessons[lesson]
    return <LessonComponent />
  }

  return (
    <div>
      <select
        value={lesson}
        onChange={(e) => setLesson(e.target.value as LessonKey)}
      >
        {Array.from({ length: 7 }, (_, i) => i + 1).map((n) => (
          <option key={n} value={`lesson${n}`}>
            Lección {n}
          </option>
        ))}
      </select>

      <hr />

      {renderLesson()}
    </div>
  )
}

export default App
