import { useNewPrescription } from "@hooks/useNewPrescription";
import AddMedicine from "./buttons/AddMedicine";
import MedicineComponent from "./Medicine/MedicineIndex";
import defaultMedicine from "@data/defaultMedicine.json";

export default function Medicines() {
    const { prescription, setPrescription } = useNewPrescription();
    
    const setMedicines = (newMedicines: MedicineInterface[]) =>
        setPrescription((oldP) => ({ ...oldP, medicines: newMedicines })) // Un raccourci pour modifier les médicaments de l'ordonnance

    const addMedicineHandler = () => {
        setPrescription((oldP) => ({ ...oldP, medicines: [...oldP.medicines, defaultMedicine] }))
    }; // Methode du bouton addMedicine pour ajouter un médicament à l'ordonnance

    return <>
        {
            prescription.medicines.map((p, i) => {
                const modifyMedicine = (newMedicine: MedicineInterface) => {
                    const newMedicines = [...prescription.medicines];
                    newMedicines[i] = newMedicine;
                    setMedicines(newMedicines)
                }
                const dropMedicine = () => {
                    if (prescription.medicines.length === 1) {
                        setMedicines([defaultMedicine])
                        return
                    }
                    const newMedicines = [...prescription.medicines].splice(i, 1);
                    setMedicines(newMedicines)
                }
                return <MedicineComponent key={p.name} medicine={p}
                    onChange={modifyMedicine} drop={dropMedicine} />
            }
            )
        }
        <AddMedicine onClick={addMedicineHandler} />
    </>
}   
