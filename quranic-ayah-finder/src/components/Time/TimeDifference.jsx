export default function TimeDifference(postDate) {
    // function that returns the time difference between two dates
    // whether in mins, hours, days, weeks, months, years ...
    const msInMinute = 60 * 1000;
    const currentDate = new Date()
    const timeDiffInMin = Math.round(
         Math.abs(currentDate - new Date(postDate)) / msInMinute
    );

    // minutes
    if (timeDiffInMin < 60) {
        return timeDiffInMin + (timeDiffInMin != 1 ? ' minutes' : ' minute')
    }
    // hours
    else if (timeDiffInMin < (60*24)) {
        const timeDiffInHours = Math.round(timeDiffInMin/60)
        return timeDiffInHours +( timeDiffInHours != 1 ? ' hours': ' hour')
    }
    // days
    else if (timeDiffInMin < (60*24*7)) {
        const timeDiffInDays = Math.round(timeDiffInMin/(60*24))
        return timeDiffInDays + (timeDiffInDays != 1 ? ' days':' day')
    }
    // weeks
    else if (timeDiffInMin < (60*24*30)) {
        const timeDiffInWeeks = Math.round(timeDiffInMin/(60*24*7))
        return timeDiffInWeeks + (timeDiffInWeeks != 1 ? ' weeks':' week')
    }
    // months
    else if (timeDiffInMin < (60*24*30*12)) {
        const timeDiffInMonths = Math.round(timeDiffInMin/(60*24*30))
        return timeDiffInMonths + (timeDiffInWeeks != 1 ? ' months':' month')
    }
    // year
    else {
        const timeDiffInYears = Math.round(timeDiffInMin/(60*24*30*12))
        return timeDiffInYears + (timeDiffInYears != 1 ? ' years':' year')
    }
}