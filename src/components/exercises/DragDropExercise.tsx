import type { DragDropExerciseType } from "../../types/exercises";




/*
  Si desordena=true, es barregen els ítems per dificultar que estudiants copiin.
  Uso sentence.id com a key de React i data-id al DOM per mantenir la identitat real de cada element.
  L’índex i (de 1 fins a data.sentences.length - 1) només és visual i no correspon a l’id real de cada ítem.
*/
function DragDropExercise({data,desordena,}: {
    data: DragDropExerciseType;
    desordena: boolean;
  }) {
  const sentencesToRender = desordena
? [...data.sentences].sort(() => Math.random() - 0.5)
    : data.sentences;

  return (
    <div>

      <h3>
        <b>{data.id}</b> {data.title}
      </h3>
      


      {/*Renderitzo la llista d'items de l'exercici!*/}
      <ol>
        {sentencesToRender.map((sentence, i) => (
          <li key={sentence.id} data-id={sentence.id}>
            {i + 1}. {sentence.text}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default DragDropExercise;