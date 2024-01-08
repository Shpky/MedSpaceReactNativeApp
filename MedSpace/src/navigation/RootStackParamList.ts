export type RootStackParamList = {
    Loading: undefined;
    Home: undefined;
    Treatment: undefined;
    NewPrescription: { prescriptionUpdate?: PrescriptionInterface } | undefined;
    UserPage: undefined;
    Rapport: undefined;
    Prescription: { prescription: PrescriptionInterface };
    Calendar: undefined;
    Login: undefined;
    Profil: undefined;
};
