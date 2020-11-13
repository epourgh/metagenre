import { useState } from "react";

const { useReducer } = require("react");

const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle-todo',
    DELETE_TODO: 'delete-todo'
}

function reducer(todo, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, newToDo(action.payload.name)]
        case ACTIONS.TOGGLE_TODO:
            return todos.map(todo => {

                if (todo.id === ACTIONS.payload.id) {
                    return { ... todo, complete: !todo.complete }
                }

                return todo
            })
        case ACTIONS.DELETE_TODO:
            return todos.filter(todo => todo.id !== action.payload.id)
        default:
            return todos
    }
}

function newToDo(name) {
    return { id: Date.now(), name: name, complete: false}
}

export default function App() {
    const [todos, dispatch] = useReducer(reducer, []);
    const [name, setName] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({type: ACTIONS.ADD_TODO, payload: {name: name }}) // count comes from the JSX callback
        setName('');
    }

    function ToDo({todo, dispatch}) {
        return (
            <div>
                <span style={{color: todo.complete?'#AAA':'#000'}}>
                    {todo.name}
                </span>
                <button onClick={() => dispatch({type: ACTIONS.TOGGLE_TODO, payload: { id: todo.id }})}>toggle</button>
                <button onClick={() => dispatch({type: ACTIONS.DELETE_TODO, payload: { id: todo.id }})}>delete</button>
            </div>
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={ e => setName(e.target.value)} />
            </form>
            {todos.map(todo => {
                return <ToDo key={todo.id} todo={todo} />;
            })}
        </>
    )

}
