interface PrescriptionInterface {
    title: string,
    doctor: DoctorInterface | null,
    medicines: MedicineInterface[],
    notes: string,
    date: string,
}