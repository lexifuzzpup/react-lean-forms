import { useState } from "react";

export interface FormFieldHook {
    value: string;
    error?: string;
    setValue(value: string): void;
    setError(error?: string): void;
}

export function useFormField(defaultValue: string): FormFieldHook {
    const [ value, setValue ] = useState<string>(defaultValue);
    const [ error, setError ] = useState<string | undefined>();

    return { value, setValue, error, setError };
}