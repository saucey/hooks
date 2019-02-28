import Moment from 'moment';

const shortDateFormat = 'DD MMM YYYY';
const longDateFormat = 'ddd DD MMM YYYY';
const shortDateTimeFormat = 'DD MMM YYYY HH:mm:ss';
const longDateTimeFormat = 'ddd DD MMM YYYY HH:mm:ss';
const dateTimePickerFormat = 'YYYY-MM-DDTHH:mm:ss';
const timeFormat = 'HH:mm:ss';

export const dateTimeHelper = {
    shortDate(date: string): string { return Moment(date).format(shortDateFormat); },  
    getCurrentDate(): string { return Moment().format('DD/MM/YYYY')},
    shortDateFromDate(date: Date | null): string { return date ? Moment(date).format(shortDateFormat) : ""; },
    shortDateTimeFromDate(date: Date | null): string { return date ? Moment(date).format(shortDateTimeFormat) : ""; },
    longDateFromDate(date: Date | null): string { return date ? Moment(date).format(longDateFormat) : ""; },
    longDateTimeFromDate(date: Date | null): string { return date ? Moment(date).format(longDateTimeFormat) : ""; },
    toDateTimePickerValueFromDate (date: Date | null): string { return date ? Moment(date).format(dateTimePickerFormat) : ""; },
    getCurrentDateAsDate() : Date { return Moment().toDate(); },
    toJsonDateFromDateTimePicker(date: string) : string | null { return date ? new Date(date).toJSON() : null },
    timeFromDate(date: Date | null): string { return date ? Moment(date).format(timeFormat) : ""; } ,  
    
    getFormattedDate(date:Date):string { return Moment(date).format('DD/MM/YYYY')},
    getStartOfThisMonth(date:Date)   { return Moment(date).startOf('month'); },
    getStartOfNextMonth(date:Date)   { return Moment(date).add(1,'month').startOf('month'); },
    getStartOfNextMonthAsDate(date:Date)   { return Moment(date).add(1,'month').startOf('month').format('DD/MM/YYYY'); },
    getEndOfNextMonth(date:Date)   { return Moment(date).add(1,'month').endOf('month'); },
    getDaysDifferenceBetweenDates(date1:Date, date2:Date) { return Moment(date2).diff(Moment(date1), 'days');},
    getDaysUsedThisMonth (startDate:Date):number { return this.getDaysDifferenceBetweenDates(startDate, this.getStartOfNextMonth(startDate).toDate())},
    getDaysTotalThisMonth(startDate:Date):number { return this.getDaysDifferenceBetweenDates(this.getStartOfThisMonth(startDate).toDate(), this.getStartOfNextMonth(startDate).toDate())},
    getEndDateForQuarterly(date:Date) { return Moment(date).add(1, 'quarter');},
    getEndDateForSemiAnnually(date:Date) { return Moment(date).add(6, 'month');},
    getEndDateForAnnually(date:Date) { return Moment(date).add(1, 'year');},
    getEndDateForQuarterlyAsDate(date:Date) { return Moment(date).add(1, 'quarter').format('DD/MM/YYYY');},
    getEndDateForSemiAnnuallyAsDate(date:Date) { return Moment(date).add(6, 'month').format('DD/MM/YYYY');},
    getEndDateForAnnuallyAsDate(date:Date) { return Moment(date).add(1, 'year').format('DD/MM/YYYY');},
    getEndDateForPeriodAsDate(date:Date, productFrequencyName:string) {
      let endDate = {"Annually": this.getEndDateForAnnuallyAsDate(date), "Semi-Annually": this.getEndDateForSemiAnnuallyAsDate(date), "Quarterly":this.getEndDateForQuarterlyAsDate(date)};
      return endDate[productFrequencyName];},

    getStartOfThisQuarter(date:Date) { return Moment(date).startOf('quarter'); },
    getStartOfNextQuarter(date:Date) { return Moment(date).add(1,'quarter').startOf('quarter'); },
    getEndOfNextQuarter(date:Date) { return Moment(date).add(1,'quarter').endOf('quarter'); },
};
