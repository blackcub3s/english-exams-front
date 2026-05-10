import DragDropExercise from "../components/exercises/DragDropExercise";
import GapFillExercise from "../components/exercises/GapFillExercise";
//import MultipleChoiceExercise from "../components/exercises/MultipleChoiceExercise";

function ExerciseRenderer({ exercise }) {
  switch (exercise.type) {
    case "drag_and_drop":
      return <DragDropExercise data={exercise} />;

    case "gap_fill":
      return <GapFillExercise data={exercise} />;
    /*
    case "multiple_choice":
      return <MultipleChoiceExercise data={exercise} />;
    */
    default:
      return <p>Tipo no soportado</p>;
  }
}

export default ExerciseRenderer;