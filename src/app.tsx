import './App.css'
import standardExam from "./data/mm/U4/standardExam.json"
import ExerciseRenderer from "./core/ExerciseRenderer"

function App() {
  return (
    <>
    <section id="center">
      <h1>Examen tema 4</h1>
      <h2>Vocabulary</h2>

      <ExerciseRenderer 
        exercise={standardExam.exercises[0]} 
        desordena={true}/>
    </section>

    <div className="p-10 bg-red-500 text-white">
      TAILWIND TEST
    </div>
    </>
  )
}

export default App