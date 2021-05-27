import { useState } from 'react'


export const useForm = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = (str) => {
        setValue(str)
    }
    return {
        value,
        type,
        onChange,
        reset
    }

}