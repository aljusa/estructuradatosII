import { useState } from 'react'

import Lesson1 from './components/Lesson1'
import Lesson2 from './components/Lesson2'
import Lesson3 from './components/Lesson3'
import Lesson4 from './components/Lesson4'
import Lesson5 from './components/Lesson5'
import Lesson6 from './components/Lesson6'
import Lesson7 from './components/Lesson7'
import Lesson8 from './components/Lesson8'
import Lesson9 from './components/Lesson9'
import Lesson10 from './components/Lesson10'
import Lesson11 from './components/Lesson11'
import Lesson12 from './components/Lesson12'
import Lesson13 from './components/Lesson13'
import Lesson14 from './components/Lesson14'
import Lesson15 from './components/Lesson15'
import Lesson16 from './components/Lesson16'
import Lesson17 from './components/Lesson17'

const lessons = {
  lesson1: Lesson1,
  lesson2: Lesson2,
  lesson3: Lesson3,
  lesson4: Lesson4,
  lesson5: Lesson5,
  lesson6: Lesson6,
  lesson7: Lesson7,
  lesson8: Lesson8,
  lesson9: Lesson9,
  lesson10: Lesson10,
  lesson11: Lesson11,
  lesson12: Lesson12,
  lesson13: Lesson13,
  lesson14: Lesson14,
  lesson15: Lesson15,
  lesson16: Lesson16,
  lesson17: Lesson17,
  
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
        {Array.from({ length: 17 }, (_, i) => i + 1).map((n) => (
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
