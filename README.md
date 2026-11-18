# react-lean-forms

## Example:
```tsx
import { FormField, FormRow, FormSubmit, useFormData } from "react-lean-forms";

export function Register() {
    const form = useFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    return <>
        <form
            onSubmit={async e => {
                e.preventDefault();

                form.clearErrors();
                const payload = form.toJson();

                const response = await fetch("/api/register", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: { "Content-Type": "application/json" }
                }).then(response => response.json());

                if(response.error) {
                    const field = form.getField(response.field);
                    if(field) field.setError(response.error);
                }
            }}
        >
            <h1>Register an account</h1>
            <FormField type="text" displayName="Username" field={form.fields.username} required />
            <FormRow>
                <FormField type="text" displayName="First Name" field={form.fields.firstName} required />
                <FormField type="text" displayName="Last Name" field={form.fields.lastName} required />
            </FormRow>
            <FormField type="text" displayName="Password" field={form.fields.password} required />
            <FormSubmit text="Register" />
        </form>
    </>
}
```

To install dependencies:

```bash
bun install
```

To type check:

```bash
bun check
```