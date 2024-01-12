import { useNewPrescription } from "@hooks/useNewPrescription";
import AddMedicine from "./buttons/AddMedicine";
import MedicineComponent from "./Medicine/MedicineIndex";
import defaultMedicine from "@data/defaultMedicine.json";
import { useCallback } from "react";

export default function Medicines() {
    const { prescription, setPrescription } = useNewPrescription();

    const addMedicineHandler = () => {
        setPrescription((oldP) => ({ ...oldP, medicines: [...oldP.medicines, defaultMedicine] }))
    }; // Methode du bouton addMedicine pour ajouter un médicament à l'ordonnance

    return <>
        {
            prescription.medicines.map((p, i) => {

                const modifyMedicine = (newMedicine: MedicineInterface) => {
                    setPrescription((old) => ({
                        ...old,
                        medicines: old.medicines.map((mp, mi) => mi === i ? newMedicine : mp)
                    }))
                }
                const dropMedicine = () => {
                    if (prescription.medicines.length === 1) {
                        setPrescription((old) => ({
                            ...old,
                            medicines: [defaultMedicine]
                        }))
                        return
                    }
                    const newMedicines = prescription.medicines.splice(i, 1);
                    setPrescription((old) => ({
                        ...old,
                        medicines: newMedicines
                    }))
                }

                return <MedicineComponent key={i} medicine={p}
                    onChange={modifyMedicine} drop={dropMedicine} />
            }
            )
        }
        <AddMedicine onClick={addMedicineHandler} />
    </>
}   
