export type RootStackParamList = {
    Home: undefined;
    Treatment: undefined;
    NewPrescription: { prescriptionUpdate?: PrescriptionInterface };
    UserPage: undefined;
    RepportPage: undefined;
    Prescription: { prescription: PrescriptionInterface };
};
