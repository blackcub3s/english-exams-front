import DragDropExercise from "../components/exercises/DragDropExercise";
import GapFillExercise from "../components/exercises/GapFillExercise";
//import MultipleChoiceExercise from "../components/exercises/MultipleChoiceExercise";

function ExerciseRenderer({ exercise, desordena, savedState, onStateChange }: any) {
  switch (exercise.type) {
    case "drag_and_drop":
      return <DragDropExercise data={exercise} desordena={desordena} savedState={savedState} onStateChange={onStateChange} />;

    case "gap_fill":
      return <GapFillExercise data={exercise} savedState={savedState} onStateChange={onStateChange} />;
    /*
    case "multiple_choice":
      return <MultipleChoiceExercise data={exercise} savedState={savedState} onStateChange={onStateChange} />;
    */
    default:
      return <p>Tipo no soportado</p>;
  }
}

export default ExerciseRenderer;