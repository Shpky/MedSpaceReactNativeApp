interface PrescriptionInterface {
    title: string,
    doctor: DoctorInterface | null,
    medicines: MedicineInterface[],
    patient: PatientInterface[]
    notes: string,
    date: string,
}