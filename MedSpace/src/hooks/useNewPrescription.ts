import { useContext } from 'react';
import { NewPrescriptionContext } from '../contexts/NewPrescriptionContext';

export function useNewPrescription() {
    const context = useContext(NewPrescriptionContext);
    if (!context) {
        throw new Error("useNewPrescription must be used within an NewPrescriptionProvider");
    }
    
    return context;
}
