import React from "react";
import { useState } from "react";

function useTwoOptionContext(contextName, option1, option2) {
    const [ context, setContext ] = useState(() => {
        return localStorage.getItem(contextName) || option1;
    });

    const toggleContext = () => {
        setContext((prevValue) => {
            const newValue = prevValue === option1 ? option2 : option1;
            localStorage.setItem(contextName, newValue);
            return newValue;
        });
    };

    const contextValue = React.useMemo(() => {
        return [
            context,
            toggleContext
        ];
    }, [context]);

    return [ context, toggleContext, contextValue ];
}

export default useTwoOptionContext;