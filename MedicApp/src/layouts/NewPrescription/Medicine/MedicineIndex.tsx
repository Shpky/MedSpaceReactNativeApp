import { useState, useEffect } from 'react';
import Container from '@containers/FormBubble';
import Name from './Name';
import Company from './Company';
import Dosage from './Dosage';
import Frequency from './Frequency';
import Duration from '../DateForm';
import Renew from './Renew';
import Notes from './Notes';
import DeleteButton from '../buttons/DeleteMedicine';

type MedicineProps = {
    medicine: MedicineInterface, onChange?: (newMedicine: MedicineInterface) => void
    drop: () => void
}

export default function Medicine({ medicine, onChange, drop }: MedicineProps) {

    const [medicineState, setMedicine] = useState(medicine);

    useEffect(() => {
        onChange?.(medicineState)
    }, [medicineState])


    return <Container>
        <Name name={medicineState.name}
            onChange={(e) => setMedicine({ ...medicineState, name: e.nativeEvent.text })} />

        <Company company={medicineState.company}
            onChange={(e) => setMedicine({ ...medicineState, company: e.nativeEvent.text })} />

        <Dosage dosage={{ quantity: medicineState.dosage, unit: medicineState.dosageType }}
            onChangeDosage={(e) => setMedicine({ ...medicineState, dosage: parseInt(e.nativeEvent.text) })}
            onChangeUnit={(e) => setMedicine({ ...medicineState, dosageType: e.nativeEvent.text })} />

        <Frequency frequency={medicineState.frequency} key={medicineState.frequency?.toString()}
            setFrequency={(newFrequency) => setMedicine({ ...medicineState, frequency: newFrequency })} />

        <Duration date={medicineState.duration} key={medicineState.duration?.toString()} text="Fin du traitement"
            setDate={(newDuration) => setMedicine({ ...medicineState, duration: newDuration })} />

        <Renew renew={medicineState.to_renew}
            onChange={(e) => setMedicine({ ...medicineState, to_renew: parseInt(e.nativeEvent.text) })} />

        <Notes notes={medicineState.notes}
            onChange={(e) => setMedicine({ ...medicineState, notes: e.nativeEvent.text })} />
        <DeleteButton onClick={drop} />
    </Container >
}
