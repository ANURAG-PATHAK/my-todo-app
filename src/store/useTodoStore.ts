// store/useTodoStore.ts
import { create } from 'zustand';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    date: string; // To track tasks by day
}

interface TodoState {
    todos: Todo[];
    addTodo: (text: string, date: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
    deleteTodo: (id: string) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
    todos: [], // Initialize with an empty array first
    addTodo: (text, date) =>
        set((state) => {
            const newTodo = {
                id: Date.now().toString(),
                text,
                completed: false,
                date,
            };
            const updatedTodos = [...state.todos, newTodo];
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { todos: updatedTodos };
        }),
    toggleTodo: (id) =>
        set((state) => {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { todos: updatedTodos };
        }),
    editTodo: (id, text) =>
        set((state) => {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, text } : todo
            );
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { todos: updatedTodos };
        }),
    deleteTodo: (id) =>
        set((state) => {
            const updatedTodos = state.todos.filter((todo) => todo.id !== id);
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { todos: updatedTodos };
        }),
}));
