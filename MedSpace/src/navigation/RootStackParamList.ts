export type RootStackParamList = {
    Loading: undefined;
    Home: undefined;
    Treatment: undefined;
    NewPrescription: { prescriptionUpdate?: PrescriptionInterface } | undefined;
    UserPage: undefined;
    Rapport: undefined;
    Prescription: { prescriptionName: String };
    Calendar: undefined;
    Login: undefined;
    Profil: undefined;
    Email: { prescription: PrescriptionInterface };
};
