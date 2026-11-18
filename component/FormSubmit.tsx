export function FormSubmit({ text }: { text?: string }) {
    return <input type="submit" value={ text ?? "Submit" } />
}