/**
 * Removes the prescriptions from the wcalendar that are not related to the given prescription.
 * @param prescription - The prescription to filter the wcalendar.
 * @param wcalendar - The wcalendar to filter.
 * @returns The filtered wcalendar.
 */
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
/**
 * Generates a calendar with week colors based on the given prescription and calendar.
 * @param prescription - The prescription interface.
 * @param calendar - The Wcalendar object.
 * @returns The weekColor object representing the generated calendar.
 */
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

/**
 * Determines the status of the prise based on the given array of priseInterface objects.
 * @param prise - An array of priseInterface objects.
 * @returns The status of the prise: "green" if all priseInterface objects have consumed set to true,
 * "orange" if at least one priseInterface object has consumed set to true, and "red" otherwise.
 */
const statusPrise = (prise: priseInterface[]): string => {

    let status = prise.every((p) => p.consumed == true)
    if (status) return "green"
    status = prise.some((p) => p.consumed == true)
    if (status) return "orange"
    return "red"
}