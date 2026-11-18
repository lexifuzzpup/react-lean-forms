import type { ReactNode } from "react";

export function FormRow({ children }: { children: ReactNode }) {
    return <div className="form-row">{ children }</div>
}