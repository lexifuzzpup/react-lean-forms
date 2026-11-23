import { useFormField, type FormFieldHook } from "./formField";

export type FormDataHook<T> = {
    getField(name: any): FormFieldHook | undefined;
    toJson(): T;
    clearErrors(): void;
    resetFields(): void;
    fields: Record<keyof T, FormFieldHook>;
};

export function useFormData<T extends { [ key: string ]: string }>(fields: T): FormDataHook<T> {
    const fieldHooks: Record<any, FormFieldHook> = {};

    for(const [ fieldName, defaultValue ] of Object.entries(fields)) {
        fieldHooks[fieldName] = useFormField(defaultValue);
    }

    return {
        fields: fieldHooks,
        getField: (name: any) => fieldHooks[name],
        toJson: () => {
            const json: Record<string, string> = {};
            for(const [ fieldName, hook ] of Object.entries(fieldHooks)) {
                json[fieldName] = hook.value;
            }
            return json as T;
        },
        clearErrors: () => {
            for(const hook of Object.values(fieldHooks)) {
                hook.setError();
            }
        },
        resetFields: () => {
            for(const [ fieldName, hook ] of Object.entries(fieldHooks)) {
                hook.setValue(fields[fieldName]!);
            }
        },
    } satisfies FormDataHook<T>;
}