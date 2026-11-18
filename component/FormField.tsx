import type { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";
import type { FormFieldHook } from "../hook/formField";

export interface FormFieldOptions {
    type: HTMLInputTypeAttribute | "textarea";
    displayName: string;
    field: FormFieldHook;
    autoComplete?: HTMLInputAutoCompleteAttribute;
    required?: boolean;
}

export function FormField({ type, displayName, field, autoComplete, required }: FormFieldOptions) {
    const inputId = "formfield-" + crypto.randomUUID();
    const title = displayName + (required ? " (required)" : "");

    let inputElement;

    if(type === "textarea") {
        inputElement = <textarea id={inputId}
            value={field.value}
            autoComplete={autoComplete}
            required={required}
            onChange={(event) => field.setValue(event.target.value)}
            className={ field.error && "error" } 
            title={title} />
    } else {
        inputElement = <input id={inputId}
            type={type}
            value={field.value}
            autoComplete={autoComplete}
            required={required}
            onChange={(event) => field.setValue(event.target.value)}
            className={ field.error && "error" } 
            title={title} />
    }

    return (
        <div
            className="form-field"
            title={title}
        >
            <label
                htmlFor={inputId}
                className={required ? "required" : undefined}
                title={title}
            >
                {displayName}
            </label>
            {inputElement}
            <span className="error">
                {field.error ?? ""}
            </span>
        </div>
    );
}