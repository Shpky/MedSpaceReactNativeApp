interface MedicineInterface {
    name: string, /* nom générique */
    company: string, /* nom du labo */
    dosage: number,
    dosageType: string,
    frequency: RoutineInterface | DailyInterface | WeeklyInterface,
    duration: number,
    durationType: string,
    administration_route: string,
    warning: boolean,
    notes?: string,
    substitutable?: boolean,
    to_renew?: string,
}

interface RoutineInterface {
    morning: boolean,
    noon: boolean,
    evening: boolean,
}

interface DailyInterface {
    startTime: TimeInterface,
    endTime: TimeInterface,
    count: number,
}

interface WeeklyInterface {
    startDay: Date,
    days: number, /* tous les cb de jours ex-> 1 = tous les jours, 2 = tous les 2 jours, etc */
}

interface TimeInterface {
    hour: number,
    minute: number
}
