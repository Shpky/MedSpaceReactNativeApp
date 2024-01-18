import OpenAutoComplete from './OpenAutoComplete';
import Container from '@components/form/Container/ContainerIndex';
import Name from './Name';
import Company from './Company';
import Dosage from './Dosage';
import Frequency from './Frequency';
import Duration from '../IdNewPrescription/SelectDate';
import Renew from './Renew';
import Notes from './Notes';
import DeleteButton from '../buttons/DeleteMedicine';

type MedicineProps = {
    medicine: MedicineInterface, onChange: (newMedicine: MedicineInterface) => void
    drop: () => void
}

/**
 * Affiche une bulle de formulaire pour compléter un médicament (et ses informations associées)
 * 
 * @param medicine la base du médicament à afficher
 * @param onChange callback appelé à chaque modification du médecin
 * @param drop method appelé lors du clique sur le bouton "Supprimer"
 */
export default function Medicine({ medicine, onChange, drop }: MedicineProps) {

    return <Container>
        <OpenAutoComplete onChange={(m) => onChange(m)} />
        <Name name={medicine.name}
            onChange={(e) => onChange({ ...medicine, name: e.nativeEvent.text })} />

        <Company company={medicine.company}
            onChange={(e) => onChange({ ...medicine, company: e.nativeEvent.text })} />

        <Dosage dosage={{ quantity: medicine.dosage, unit: medicine.dosageType }}
            onChangeDosage={(e) => onChange({ ...medicine, dosage: parseInt(e.nativeEvent.text) })}
            onChangeUnit={(e) => onChange({ ...medicine, dosageType: e.nativeEvent.text })} />

        <Frequency frequency={medicine.frequency} key={medicine.frequency?.toString()}
            setFrequency={(newFrequency) => onChange({ ...medicine, frequency: newFrequency })} />

        <Duration date={medicine.duration} key={medicine.duration?.toString()} customText="Fin du traitement"
            setDate={(newDuration) => onChange({ ...medicine, duration: newDuration })} />

        <Renew renew={medicine.to_renew}
            onChange={(e) => onChange({ ...medicine, to_renew: parseInt(e.nativeEvent.text) })} />

        <Notes notes={medicine.notes}
            onChange={(e) => onChange({ ...medicine, notes: e.nativeEvent.text })} />
        <DeleteButton onClick={drop} />
    </Container >
}
