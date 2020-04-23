import { useState } from 'react';

function useToggle(initiaValue = false) {
    const [value, setValue] = useState(initiaValue);
    const toggle = () => {
        setValue(!value)
    }
    return [value, toggle]
}
export default useToggle;