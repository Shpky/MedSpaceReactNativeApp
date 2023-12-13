interface PatientInterface {
    name: string,
    icone: string,
    prescriptions: PrescriptionInterface[],
    actualUser: Boolean,
    earliesttime: string,
    latesttime: string
}
