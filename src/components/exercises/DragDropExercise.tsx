import { useState } from "react";
import type { DragDropExerciseType } from "../../types/exercises";

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function DragDropExercise({
  data,
  desordena,
}: {
  data: DragDropExerciseType;
  desordena: boolean;
}) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedFromSentence, setSelectedFromSentence] = useState<number | null>(null);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [wordBank, setWordBank] = useState<string[]>(() =>
    desordena ? shuffle(data.wordBank) : data.wordBank
  );

  const [sentencesToRender] = useState(() =>
    desordena ? shuffle(data.sentences) : data.sentences
  );

  const [showScore, setShowScore] = useState(true);

  // BOX → SENTENCE
  const handleDropOnSentence = (sentenceId: number) => {
    if (!selectedWord) return;

    const newWord = selectedWord;
    const previousWord = answers[sentenceId];

    setAnswers((prev) => ({
      ...prev,
      [sentenceId]: newWord,
    }));

    setWordBank((prev) => {
      let updated = prev.filter((w) => w !== newWord);

      if (previousWord) {
        updated = [...updated, previousWord];
      }

      return updated;
    });

    setSelectedWord(null);
  };

  // SENTENCE → BOX
  const handleDropOnBox = () => {
    if (selectedFromSentence === null) return;

    const word = answers[selectedFromSentence];
    if (!word) return;

    setAnswers((prev) => {
      const updated = { ...prev };
      delete updated[selectedFromSentence];
      return updated;
    });

    setWordBank((prev) => [...prev, word]);

    setSelectedFromSentence(null);
  };

const calculateScore = () => {
  return data.wordBank.length - wordBank.length;
};

  return (
    <div className="w-11/12 md:w-3/4 mx-auto p-4 border rounded-lg shadow-sm bg-white">

      {/* HEADER */}
      <h3 className="text-lg font-semibold mb-6">
        <b>{data.id}</b> {data.title}
      </h3>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col gap-6">

        {/* WORD BANK */}
        <div className="border rounded-lg p-4 bg-gray-50">

          <ul
            className="flex flex-wrap gap-2 justify-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnBox}
          >
            {wordBank.map((word) => (
              <li
                key={word}
                draggable
                onDragStart={() => {
                  setSelectedWord(word);
                  setSelectedFromSentence(null);
                }}
                className="px-3 py-1 bg-white border rounded cursor-grab active:scale-95 transition"
              >
                {word}
              </li>
            ))}
          </ul>
        </div>

        {/* SENTENCES */}
        <div className="border rounded-lg p-4 overflow-y-auto h-[40vh]">

          <ol className="space-y-6">
            {sentencesToRender.map((sentence, i) => {
              const parts = sentence.text.split("_____");

              return (
                <li
                  key={sentence.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOnSentence(sentence.id)}
                  className="text-left leading-relaxed"
                >
                  <span className="font-medium mr-2">
                    {i + 1}.
                  </span>

                  {parts[0]}

                  {/* GAP */}
                  <span className="inline-flex items-center justify-center min-w-[90px] mx-2">
                    {answers[sentence.id] ? (
                      <span
                        draggable
                        onDragStart={() => {
                          setSelectedFromSentence(sentence.id);
                          setSelectedWord(null);
                        }}
                        className="cursor-grab bg-blue-100 px-2 py-1 rounded active:scale-95 transition"
                      >
                        {answers[sentence.id]}
                      </span>
                    ) : (
                      <span className="w-[90px] border-b border-dashed border-gray-400" />
                    )}
                  </span>

                  {parts[1]}
                </li>
              );
            })}
          </ol>
        </div>
      </div>




      {/* SCORE */}
      {showScore && (
        <div className="mt-4 font-semibold">
          completats: {calculateScore()} / {data.sentences.length}
        </div>
      )}
    </div>
  );
}

export default DragDropExercise;