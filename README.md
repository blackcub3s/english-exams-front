# English exams

An application to do english exams online implementing the type of exercises from the book english exams of macmillan education.

# tech stack

- react
- typescript
- vite
- tailwindcss

# project structure

- data: contains the exams data
- components: contains the components for each type of exercise ([DragDropExercise](src/components/exercises/DragDropExercise.tsx), [DoubleDragDropExercise](src/components/exercises/DoubleDragDropExercise.tsx), [GapFillExercise](src/components/exercises/GapFillExercise.tsx)), etc.
- core: contains the [ExerciseRenderer](src/core/ExerciseRenderer.tsx) component, which is a component that renders the exercises based on the type of exercise.
- types: contains the types for each type of exercise.
- utils: contains the utils for each type of exercise.

# how to run

- npm install
- npm run dev