import { useState } from "react";
import "./App.css";
import standardExam from "./data/mm/U4/standardExam.json";
import ExerciseRenderer from "./core/ExerciseRenderer";
import fletxaDreta from "./assets/paginadorDre.png";
import fletxaEsquerra from "./assets/paginadorEsq.png";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const exercises = standardExam.exercises;
  const currentExercise = exercises[currentIndex];

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev < exercises.length - 1 ? prev + 1 : prev
    );
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <section
      id="center"
      className="flex items-center justify-center gap-6 min-h-screen"
    >
      {/* LEFT ARROW */}
      <button
        onClick={goPrev}
        className="p-4"
        disabled={currentIndex === 0}
      >
        <img
          src={fletxaEsquerra}
          alt="Previous exercise"
          className={`w-10 h-10 ${
            currentIndex === 0 ? "opacity-30" : "hover:scale-110"
          }`}
        />
      </button>

      {/* EXERCISE */}
      <div className="w-full max-w-3xl">
        <ExerciseRenderer
          exercise={currentExercise}
          desordena={true}
          key={currentExercise.id}
        />
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={goNext}
        className="p-4"
        disabled={currentIndex === exercises.length - 1}
      >
        <img
          src={fletxaDreta}
          alt="Next exercise"
          className={`w-10 h-10 ${
            currentIndex === exercises.length - 1
              ? "opacity-30"
              : "hover:scale-110"
          }`}
        />
      </button>
    </section>
  );
}

export default App;