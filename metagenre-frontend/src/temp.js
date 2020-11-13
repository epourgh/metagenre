const { useReducer } = require("react");

const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement'
}

function Reducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { count: state.count + action.payload.count };
        case ACTIONS.DECREMENT:
            return { count: state.count - action.payload.count };
        default:
            return state
    }
}

export default function App() {
    const [state, dispatch] = useReducer(reducer, {count: 0});
    const [count, setCount] = useState(0);

    function increment() {
        dispatch({type: ACTIONS.INCREMENT, payload: {numeber: count }}) // count comes from the JSX callback
    }

    // ...

}
