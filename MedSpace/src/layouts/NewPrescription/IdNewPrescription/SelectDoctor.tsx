import { Pressable, Text, StyleSheet } from 'react-native';
import { useState, useRef, ElementRef, createRef, LegacyRef } from 'react';
import useDoctor from '@hooks/useDoctors';
import { Picker } from '@react-native-picker/picker'

/**
 * Permet de sélectionner un médecin dans une liste
 *
 
 * @param  onSelect callback appelé lorsqu'un médecin est sélectionné
 */
export default function SelectDoctor({ onSelect }: { onSelect: ((doctor: DoctorInterface) => void) }): JSX.Element {
    const [doctors] = useDoctor();
    const pickerRef = useRef<LegacyRef<Picker<DoctorInterface>>>(null);

    // Todo
    return <>


    </>
}

const style = StyleSheet.create({
    picker: {
        opacity: 0,
        width: 0,
        height: 0,
    }
})
