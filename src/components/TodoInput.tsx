// components/TodoInput.tsx
"use client"
import { useState } from 'react';
import { useTodoStore } from '@/store/useTodoStore';

const TodoInput = () => {
    const [text, setText] = useState('');
    const addTodo = useTodoStore((state) => state.addTodo);
    const today = new Date().toISOString().split('T')[0]; // Get today's date

    const handleSubmit = () => {
        if (!text.trim()) return;
        addTodo(text.trim(), today);
        setText('');
    };

    return (
        <div className="flex items-center space-x-2 mt-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-3 py-2 border rounded-md"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Add
            </button>
        </div>
    );
};

export default TodoInput;
