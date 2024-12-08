// components/TodoItem.tsx
"use client"
import { useTodoStore } from '@/store/useTodoStore';
import { FC, useState } from 'react';
import { motion } from 'framer-motion';

interface TodoItemProps {
    id: string;
    text: string;
    completed: boolean;
}

const TodoItem: FC<TodoItemProps> = ({ id, text, completed }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(text);

    const toggleTodo = useTodoStore((state) => state.toggleTodo);
    const editTodo = useTodoStore((state) => state.editTodo);
    const deleteTodo = useTodoStore((state) => state.deleteTodo);

    const handleEdit = () => {
        if (isEditing) editTodo(id, newText);
        setIsEditing(!isEditing);
    };

    return (
        <motion.div
            className="flex items-center justify-between p-3 bg-gray-100 rounded-md mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleTodo(id)}
                    className="w-5 h-5 text-blue-500"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="text-gray-800 rounded-md border px-2"
                    />
                ) : (
                    <span className={`${completed ? 'line-through' : ''} text-lg`}>
                        {text}
                    </span>
                )}
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleEdit}
                    className="text-blue-500 hover:underline"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={() => deleteTodo(id)}
                    className="text-red-500 hover:underline"
                >
                    Delete
                </button>
            </div>
        </motion.div>
    );
};

export default TodoItem;
