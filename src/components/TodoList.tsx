// components/TodoList.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useTodoStore } from '../store/useTodoStore';
import { motion } from 'framer-motion';

const TodoList = () => {
    const { todos, toggleTodo, editTodo, deleteTodo } = useTodoStore();
    const [currentDate, setCurrentDate] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newText, setNewText] = useState<string>('');

    useEffect(() => {
        // Set the date only after the component has mounted (client-side)
        const today = new Date().toISOString().split('T')[0];
        setCurrentDate(today);
    }, []);

    // Don't render anything until the date is set (hydration issue fix)
    if (!currentDate) return <div>Loading...</div>;

    // Filter todos by today's date
    const todayTodos = todos.filter((todo) => todo.date === currentDate);

    // Handle editing a todo item
    const handleEditClick = (id: string, text: string) => {
        setEditingId(id);
        setNewText(text);
    };

    const handleSaveEdit = () => {
        if (editingId && newText) {
            editTodo(editingId, newText);
            setEditingId(null); // Reset editing state
            setNewText('');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold">{"Today's Tasks"}</h2>
            <ul>
                {todayTodos.map((todo) => (
                    <motion.li
                        key={todo.id}
                        className={`flex items-center justify-between p-2 my-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {editingId === todo.id ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={newText}
                                    onChange={(e) => setNewText(e.target.value)}
                                    className="px-2 py-1 border border-gray-300 rounded"
                                />
                                <button
                                    onClick={handleSaveEdit}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingId(null)} // Cancel editing
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <span>{todo.text}</span>
                                <div>
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        {todo.completed ? 'Undo' : 'Complete'}
                                    </button>
                                    <button
                                        onClick={() => handleEditClick(todo.id, todo.text)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
