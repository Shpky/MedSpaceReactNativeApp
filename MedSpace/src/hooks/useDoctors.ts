import { useContext } from "react";
import { DoctorContext } from "../contexts/DoctorContext";

export default function useDoctors() {
    const context = useContext(DoctorContext);
    if (!context) {
        throw new Error("useDoctors must be used within an PasswordProvider");
    }
    return context;
}
