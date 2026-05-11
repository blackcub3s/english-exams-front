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

  const [showScore, setShowScore] = useState(false);

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
    let correct = 0;
    sentencesToRender.forEach((s) => {
      if (answers[s.id]) correct++;
    });
    return correct;
  };

  return (
    <div className="w-1/2 mx-auto p-4 border rounded-lg shadow-sm bg-white">

      {/* HEADER */}
      <h3 className="text-lg font-semibold mb-4">
        <b>{data.id}</b> {data.title}
      </h3>

      {/* WORD BANK */}
      <ul
        className="flex flex-wrap gap-2 justify-center border border-dashed bg-gray-100 p-3 rounded mb-6 min-h-[50px]"
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

      {/* SENTENCES */}
      <ol className="space-y-4">
        {sentencesToRender.map((sentence, i) => {
          const parts = sentence.text.split("_____");

          return (
            <li
              key={sentence.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDropOnSentence(sentence.id)}
              className="text-left leading-relaxed"
            >
              <span className="font-medium mr-2">{i + 1}.</span>

              {parts[0]}

              {/* GAP DUOLINGO STYLE */}
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

      {/* BUTTON */}
      <button
        onClick={() => setShowScore(true)}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Check answers
      </button>

      {/* SCORE */}
      {showScore && (
        <div className="mt-4 font-semibold">
          Score: {calculateScore()} / {data.sentences.length}
        </div>
      )}
    </div>
  );
}

export default DragDropExercise;