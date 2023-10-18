import defaultSave from "../defaultSave.json";

export default class Save implements SaveInterface {
    constructor(
        public prescriptions: PrescriptionInterface[],
        public doctors: DoctorInterface[],
        public patients: PatientInterface[]
    ) { }

    toJson(): SaveInterface {
        return {
            prescriptions: this.prescriptions,
            doctors: this.doctors,
            patients: this.patients
        }
    }
    static default(): Save {
        return Object.assign(new Save([], [], []), defaultSave);
    }
    static fromJson(json: SaveInterface): Save {
        return new Save(
            json.prescriptions,
            json.doctors,
            json.patients
        );
    }
}