import { useState } from "react";
import { CounterContext } from './CounterContextObject'

export default function CounterContextProvider({ children }) {

    const [counter, setCounter] = useState(0);

    return <CounterContext.Provider value={{ counter, setCounter }}>
        {children}
    </CounterContext.Provider>
}

export { CounterContext } from './CounterContextObject'

