type Sentence = {
  id: number;
  text: string;
};

function DragDropExercise({ data }: any) {
  return (
    <>
      <div>
        <h3>
          <b>{data.id}</b> {data.title}
        </h3>
      </div>

      <ol>
        {data.sentences.map((sentence: Sentence) => (
          <li key={sentence.id}>
            {sentence.text}
          </li>
        ))}
      </ol>
    </>
  );
}

export default DragDropExercise;