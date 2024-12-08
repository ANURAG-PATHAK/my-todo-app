// app/page.tsx
import TodoList from '@/components/TodoList';
import TodoInput from '@/components/TodoInput';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  return (
    <main className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">{"Today's Tasks"}</h1>
      <TodoInput />
      <AnimatePresence>
        <TodoList />
      </AnimatePresence>
    </main>
  );
}
