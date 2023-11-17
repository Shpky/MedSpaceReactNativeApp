import Picker from '@components/Picker';
import { useState, useEffect } from 'react';
import Container from '@containers/FormBubble';
import Name from './Name';
import Company from './Company';
import Dosage from './Dosage';
import Frequency from './Frequency';
import Duration from './Duration';

export default function index({ medicine, onChange }: {
    medicine: MedicineInterface, onChange?: (newMedicine: MedicineInterface) => void
}) {

    useEffect(() => {
        onChange && onChange(medicine)
    }, [medicine])


    return <Container>
        <Name name={medicine.name} onChange={(e) => medicine.name = e.nativeEvent.text} />

        <Company company={medicine.company} onChange={(e) => medicine.company = e.nativeEvent.text} />

        <Dosage dosage={{ quantity: medicine.dosage, unit: medicine.dosageType }} onChangeDosage={(e) => medicine.dosage = parseInt(e.nativeEvent.text)}
            onChangeUnit={(e) => medicine.dosageType = e.nativeEvent.text} />

        <Frequency frequency={medicine.frequency}
            setFrequency={(newFrequency) => medicine.frequency = newFrequency} />

        <Duration duration={medicine.duration}
            setDuration={(newDuration) => medicine.duration = newDuration} />

    </Container >
}
