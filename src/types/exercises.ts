export type Sentence = {
  id: number; /*typescript no diferencia entre integers i floats... ojo*/
  text: string;
};

export type Score = {
  total: number;
};



export type DragDropExerciseType = {
  id: string;
  type: "drag_and_drop";
  title: string;
  wordBank: string[];
  sentences: Sentence[];
  score: Score;
};



