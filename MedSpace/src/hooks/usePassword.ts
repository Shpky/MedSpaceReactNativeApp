import { useContext } from "react";
import { PasswordContext } from "../contexts/PasswordContext";

export default function usePassword() {
    const context = useContext(PasswordContext);

    if (!context) {
        throw new Error("usePassword must be used within an PasswordProvider");
    }

    return context;
}
