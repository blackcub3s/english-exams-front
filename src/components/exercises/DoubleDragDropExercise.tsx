import { useState, useEffect } from "react";
import type { DoubleDragDropExerciseType } from "../../types/exercises";

function shuffle<T>(array: T[]) {
    return [...array].sort(() => Math.random() - 0.5);
}

type SelectedFromSentence = {
    sentenceId: number;
    slotIndex: 1 | 2;
};

type DoubleAnswer = {
    word1: string | null;
    word2: string | null;
    withSpace: boolean;
};

function DoubleDragDropExercise({
    data,
    desordena,
    savedState,
    onStateChange,
}: {
    data: DoubleDragDropExerciseType;
    desordena: boolean;
    savedState?: any;
    onStateChange?: (state: any) => void;
}) {
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [selectedFromSentence, setSelectedFromSentence] = useState<SelectedFromSentence | null>(null);

    const [localWordBank] = useState<string[]>(() =>
        desordena ? shuffle(data.wordBank) : data.wordBank
    );

    const [localSentences] = useState(() =>
        desordena ? shuffle(data.sentences) : data.sentences
    );

    const answers: Record<number, DoubleAnswer> = savedState?.answers || {};
    const wordBank = savedState?.wordBank || localWordBank;
    const sentencesToRender = savedState?.sentencesToRender || localSentences;

    const [showScore, setShowScore] = useState(true);

    useEffect(() => {
        if (!savedState && onStateChange) {
            onStateChange({
                answers,
                wordBank,
                sentencesToRender,
            });
        }
    }, [data.id]);

    const handleDropOnSentence = (sentenceId: number, slotIndex: 1 | 2) => {
        if (!selectedWord) return;

        const newWord = selectedWord;
        const currentAnswer = answers[sentenceId] || { word1: null, word2: null, withSpace: false };
        const previousWord = slotIndex === 1 ? currentAnswer.word1 : currentAnswer.word2;

        const newAnswers = {
            ...answers,
            [sentenceId]: {
                ...currentAnswer,
                [slotIndex === 1 ? 'word1' : 'word2']: newWord
            }
        };

        let newWordBank = wordBank.filter((w: string) => w !== newWord);
        if (previousWord) {
            newWordBank = [...newWordBank, previousWord];
        }

        onStateChange?.({
            answers: newAnswers,
            wordBank: newWordBank,
            sentencesToRender,
        });

        setSelectedWord(null);
    };

    const handleDropOnBox = () => {
        if (!selectedFromSentence) return;

        const { sentenceId, slotIndex } = selectedFromSentence;
        const currentAnswer = answers[sentenceId];
        if (!currentAnswer) return;

        const word = slotIndex === 1 ? currentAnswer.word1 : currentAnswer.word2;
        if (!word) return;

        const newAnswers = {
            ...answers,
            [sentenceId]: {
                ...currentAnswer,
                [slotIndex === 1 ? 'word1' : 'word2']: null
            }
        };

        // Optional: if both words are empty now, we can remove the entry
        if (!newAnswers[sentenceId].word1 && !newAnswers[sentenceId].word2) {
            delete newAnswers[sentenceId];
        }

        const newWordBank = [...wordBank, word];

        onStateChange?.({
            answers: newAnswers,
            wordBank: newWordBank,
            sentencesToRender,
        });

        setSelectedFromSentence(null);
    };

    const toggleSpace = (sentenceId: number) => {
        const currentAnswer = answers[sentenceId] || { word1: null, word2: null, withSpace: false };
        const newAnswers = {
            ...answers,
            [sentenceId]: {
                ...currentAnswer,
                withSpace: !currentAnswer.withSpace
            }
        };
        onStateChange?.({
            answers: newAnswers,
            wordBank: wordBank,
            sentencesToRender,
        });
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
                <div
                    className="border rounded-lg p-4 bg-gray-50 min-h-[80px]"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropOnBox}
                >
                    <ul className="flex flex-wrap gap-2 justify-center h-full w-full">
                        {wordBank.map((word: string) => (
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
                        {sentencesToRender.map((sentence: any, i: number) => {
                            const parts = sentence.text.split("_____");
                            const currentAnswer = answers[sentence.id] || { word1: null, word2: null, withSpace: false };

                            return (
                                <li
                                    key={sentence.id}
                                    className="text-left leading-relaxed flex flex-wrap items-center"
                                >
                                    <span className="font-medium mr-2">
                                        {i + 1}.
                                    </span>

                                    {parts[0]}

                                    {/* DOUBLE GAP CONTAINER */}
                                    <span className="inline-flex items-center justify-center min-w-[120px] mx-2 gap-1 bg-gray-50 p-1 rounded border border-gray-200">

                                        {/* SLOT 1 */}
                                        <span
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={() => handleDropOnSentence(sentence.id, 1)}
                                            className={`min-w-[50px] min-h-[30px] flex items-center justify-center rounded transition-colors ${!currentAnswer.word1 ? 'border-b border-dashed border-gray-400 bg-gray-100' : ''}`}
                                        >
                                            {currentAnswer.word1 && (
                                                <span
                                                    draggable
                                                    onDragStart={() => {
                                                        setSelectedFromSentence({ sentenceId: sentence.id, slotIndex: 1 });
                                                        setSelectedWord(null);
                                                    }}
                                                    className="cursor-grab bg-blue-100 px-2 py-1 rounded active:scale-95 transition"
                                                >
                                                    {currentAnswer.word1}
                                                </span>
                                            )}
                                        </span>

                                        {/* TOGGLE SPACE BUTTON */}
                                        {(currentAnswer.word1 || currentAnswer.word2) && (
                                            <button
                                                onClick={() => toggleSpace(sentence.id)}
                                                className="px-1.5 py-0.5 text-xs font-mono font-bold text-gray-500 hover:bg-gray-200 hover:text-black rounded"
                                                title={currentAnswer.withSpace ? "Remove space" : "Add space"}
                                            >
                                                {currentAnswer.withSpace ? "␣" : "+"}
                                            </button>
                                        )}
                                        {(!currentAnswer.word1 && !currentAnswer.word2) && (
                                            <span className="px-1.5 text-xs text-gray-300">+</span >
                                        )}

                                        {/* SLOT 2 */}
                                        <span
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={() => handleDropOnSentence(sentence.id, 2)}
                                            className={`min-w-[50px] min-h-[30px] flex items-center justify-center rounded transition-colors ${!currentAnswer.word2 ? 'border-b border-dashed border-gray-400 bg-gray-100' : ''}`}
                                        >
                                            {currentAnswer.word2 && (
                                                <span
                                                    draggable
                                                    onDragStart={() => {
                                                        setSelectedFromSentence({ sentenceId: sentence.id, slotIndex: 2 });
                                                        setSelectedWord(null);
                                                    }}
                                                    className="cursor-grab bg-blue-100 px-2 py-1 rounded active:scale-95 transition"
                                                >
                                                    {currentAnswer.word2}
                                                </span>
                                            )}
                                        </span>

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
                    completats: {Math.floor(calculateScore() / 2)} / {data.sentences.length}
                </div>
            )}
        </div>
    );
}

export default DoubleDragDropExercise;
