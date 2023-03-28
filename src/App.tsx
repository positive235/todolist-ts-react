/**
 * This code was developed by positive235(https://github.com/positive235) with the help of ChatGPT,
 * created by OpenAI.
 * 
 * Developer: positive235(https://github.com/positive235)
 * Debugging: Performed by positive235(https://github.com/positive235)
 * Code Modifications: Made by positive235(https://github.com/positive235)
 * 
 * Source: ChatGPT(https://chat.openai.com/chat)
 * Assistance provided by ChatGPT on: 2023-03-27
 */


import React, {useState} from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

interface Todo {
    id: number;
    text: string;
}

const App: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() === '') return;
        setTodos([...todos, {id: Date.now(), text: inputValue}]);
        setInputValue('');
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // const handleKeyPress = (e: React.KeyboardEvent) => {
    //     if (e.key === 'Enter') {
    //         addTodo();
    //     }
    // };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const newTodos = [...todos];
        const [reorderedItem] = newTodos.splice(result.source.index, 1);
        newTodos.splice(result.destination.index, 0, reorderedItem);
        setTodos(newTodos);
    };

    // const moveTodoUp = (index: number) => {
    //     if (index === 0) return;
    //     const newTodos = [...todos];
    //     [newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]];
    //     setTodos(newTodos);
    // }

    // const moveTodoDown = (index: number) => {
    //     if (index === todos.length - 1) return;
    //     const newTodos = [...todos];
    //     [newTodos[index + 1], newTodos[index]] = [newTodos[index], newTodos[index + 1]];
    //     setTodos(newTodos);
    // }

    return (
        <div className="App">
            <h1>Todo List📝</h1>
            <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>➕</button>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {todos.map((todo, index) => (
                                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                                    {(provided) => (
                                        <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        >
                                            🟰 {todo.text} <button onClick={() => deleteTodo(todo.id)}>❌</button>

                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                </DragDropContext>
                
        </div>
    );

};

export default App;