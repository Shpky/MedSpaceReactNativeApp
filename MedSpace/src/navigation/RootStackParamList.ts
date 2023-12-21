export type RootStackParamList = {
    Home: undefined;
    Treatment: undefined;
    NewPrescription: { prescriptionUpdate?: PrescriptionInterface } | undefined;
    UserPage: undefined;
    RepportPage: undefined;
    Prescription: { prescription: PrescriptionInterface };
    Calendar: undefined;
    Login: undefined;
    Profil: undefined;
};
