import RNPickerSelect from 'react-native-picker-select';
import { useFocusEffect } from '@react-navigation/native';
import DataManager from '../../services/dataManager';
import { useEffect, useState } from 'react';
import defaultSaveForTest from '@data/defaultSaveForTest.json';
import defaultPatient from '@data/defaultPatient.json';

const ProfilePicker = () => {

    const dataManager = new DataManager();
    const [save, setSave] = useState<SaveInterface>(defaultSaveForTest);
    const [actualuser, setActualuser] = useState<PatientInterface>(save.patients[0]);
    const [filteredPatients, setFilteredPatients] = useState<PatientInterface[]>([defaultPatient]);



    const fetchData = async () => {
        await dataManager.init();
        setSave(await dataManager.getSaveData());
        save.patients = save.patients.sort((a, b) => (a.actualuser === b.actualuser ? 0 : a.actualuser ? -1 : 1))
        setActualuser(save.patients.find(patient => patient.actualuser === true) as PatientInterface)
        setFilteredPatients(save.patients.filter((patient) => patient.actualuser === false));
    };
    const reloadPage = () => {

        //@ts-ignore
        navigation.navigate('UserInformation');
    };
    const changeProfile = (value: string) => {
        if (value !== actualuser.name) {
            save.patients.forEach(patient => {
                patient.name === value
                    ? (patient.actualuser = true)
                    : (actualuser.name === patient.name ? (patient.actualuser = false) : null);
            });
            setActualuser(save.patients.find(patient => patient.actualuser === true) as PatientInterface)
            dataManager.setSaveData(save);
            console.log("changement de profile", actualuser.name, value)
            reloadPage();
        }
    };
    useEffect(() => {
        fetchData();
    });
    return (

        
    )


}


export default ProfilePicker;