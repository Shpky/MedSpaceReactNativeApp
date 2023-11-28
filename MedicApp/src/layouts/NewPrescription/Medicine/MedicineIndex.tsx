import Picker from '@components/Picker';
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

export default function Medicine({ medicineProp, onChange, drop }: {
    medicineProp: MedicineInterface, onChange?: (newMedicine: MedicineInterface) => void
    drop: () => void
}) {

    const [medicine, setMedicine] = useState(medicineProp);
    
    useEffect(() => {
        onChange && onChange(medicine)
    }, [medicine])


    return <Container>
        <Name name={medicine.name}
            onChange={(e) => setMedicine({ ...medicine, name: e.nativeEvent.text })} />

        <Company company={medicine.company}
            onChange={(e) => setMedicine({ ...medicine, company: e.nativeEvent.text })} />

        <Dosage dosage={{ quantity: medicine.dosage, unit: medicine.dosageType }}
            onChangeDosage={(e) => setMedicine({ ...medicine, dosage: parseInt(e.nativeEvent.text) })}
            onChangeUnit={(e) => setMedicine({ ...medicine, dosageType: e.nativeEvent.text })} />

        <Frequency frequency={medicine.frequency} key={medicine.frequency?.toString()}
            setFrequency={(newFrequency) => setMedicine({ ...medicine, frequency: newFrequency })} />

        <Duration date={medicine.duration} key={medicine.duration?.toString()} text="Fin du traitement"
            setDate={(newDuration) => setMedicine({ ...medicine, duration: newDuration })} />

        <Renew renew={medicine.to_renew}
            onChange={(e) => setMedicine({ ...medicine, to_renew: parseInt(e.nativeEvent.text) })} />

        <Notes notes={medicine.notes}
            onChange={(e) => setMedicine({ ...medicine, notes: e.nativeEvent.text })} />
        <DeleteButton onClick={drop} />
    </Container >
}
