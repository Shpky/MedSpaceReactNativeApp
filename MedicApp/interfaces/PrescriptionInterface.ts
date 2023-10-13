interface PrescriptionInterface {
    title: string,
    doctor: DoctorInterface,
    medicines: MedicineInterface[],
    patient: PatientInterface[]
    notes: string,
    date: string,
}