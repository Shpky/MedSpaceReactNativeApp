interface PrescriptionInterface {
    title: string,
    doctor: DoctorInterface | null,
    medicines: MedicineInterface[],
    notes: string,
    date: Date | null, //Data d'ajout ? ou start
}
