const PrescriptionCalendarFounder = (prescription: PrescriptionInterface, wcalendar: Wcalendar): Wcalendar => {
    
        for (const key in wcalendar) {
            for (const dayKey in wcalendar[key]) {
                for (const prise of wcalendar[key][dayKey]) {
                    if (prise.releatedTreatment != prescription.title) {
                        wcalendar[key][dayKey].slice(wcalendar[key][dayKey].indexOf(prise), 1)
                        
                        if (wcalendar[key][dayKey].length == 0) {
                            delete wcalendar[key][dayKey]
                            if (Object.keys(wcalendar[key]).length == 0) {
                                delete wcalendar[key]
                            }
                        }
                    }

                }
            }
        }
    
    console.log(wcalendar)
    return wcalendar
}

type weekColor = { [Wnumber: string]: string[] }
export const generateCalendar = (prescription: PrescriptionInterface, calendar: Wcalendar): weekColor => {
    let weekColor: weekColor = {}
    
    const wcalendar: Wcalendar = PrescriptionCalendarFounder(prescription, calendar)
    for (const key in wcalendar) {
        weekColor[key] = ["grey", "grey", "grey", "grey", "grey", "grey", "grey"]
        for (const dayKey in wcalendar[key]) {
            let ckey = new Date(dayKey).getDay()
            weekColor[key][ckey] = statusPrise(wcalendar[key][dayKey])
        }
    }
    console.log("weekcolor", weekColor)
    return weekColor
}

const statusPrise = (prise: priseInterface[]): string => {

    let status = prise.every((p) => p.consome == true)
    if (status) return "green"
    status = prise.some((p) => p.consome == true)
    if (status) return "orange"
    return "red"
}