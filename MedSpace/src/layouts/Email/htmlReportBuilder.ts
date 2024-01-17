import { generateCalendar } from "./intakecalculator";

const htmlReportBuilder = (week: string[], num: string) => {

    let dayOfWeek = ["D", "L", "M", "M", "J", "V", "S"]
    let htmlcalendar: string = ""
    let htmlweek = `<div style="display: flex; justify-content: space-evenly;align-items: center;">`
    htmlweek += `<div style="display: flex; justify-content: space-evenly;align-items: center;"><p style="font-size: 20px; font-weight: bold;">${num}</p></div>`
    week.map((day, index) => {

        htmlweek += `<div style="display: flex; justify-content: space-evenly;align-items: center;"><p style="font-size: 20px; font-weight: bold;">${dayOfWeek[index]}</p><div style="alignSelf:center;height: 15px; width: 15px; background-color: ${day};border-radius: 50%;"></div></div>`
    })

    htmlweek += `</div>`
    htmlcalendar += htmlweek
}
const superHtmlReportBuiler = (rowCalendar: Wcalendar, prescription: PrescriptionInterface): string => {
    let calendar = generateCalendar(prescription, rowCalendar);
    let htmlcalendar: string = ""
    Object.keys(calendar).forEach((key) => {
        htmlcalendar += htmlReportBuilder(calendar[key], key)
    })
    return htmlcalendar
}

export default superHtmlReportBuiler