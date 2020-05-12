export default function (date) {
    return getDateStr(date) + " " + getTimeStr(date)
}

function getDateStr(date) {
    const dateDay = dayOfYear(date)
    const currentDay = dayOfYear(new Date())

    if (dateDay === currentDay) {
        return ""
    }

    if (currentDay - dateDay === 1) {
        return "Вчера"
    }

    if (currentDay - dateDay === 2) {
        return "Позавчера"
    }

    if (currentDay - dateDay === 3) {
        return "3 дня назад"
    }

    if (currentDay - dateDay === 4) {
        return "4 дня назад"
    }

    if (currentDay - dateDay === 5) {
        return "5 дней назад"
    }

    if (currentDay - dateDay === 6) {
        return "6 дней назад"
    }

    if (currentDay - dateDay >= 7 && currentDay - dateDay <= 14) {
        return "Неделю назад"
    }

    if (currentDay - dateDay >= 15 && currentDay - dateDay <= 21) {
        return "2 недели назад"
    }

    if (currentDay - dateDay >= 22 && currentDay - dateDay <= 28) {
        return "3 недели назад"
    }

    if (currentDay - dateDay > 29 && currentDay - dateDay <= 31) {
        return "4 недели назад"
    }

    return date.getFullYear() + "." + date.getMonth() + "." + date.getDay()
}

/*
найти разницу в днях. далее по разнице выдавать нужный лейбл.
 */
function getTimeStr(date) {
    return date.getHours() + ":" + ((date.getMinutes() < 10) ?  "0" + date.getMinutes() : date.getMinutes())
}

function isLeapYear(date) {
    const year = date.getFullYear();
    if ((year & 3) !== 0) return false;
    return ((year % 100) !== 0 || (year % 400) === 0);
};

function dayOfYear(date) {
    const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const mn = date.getMonth();
    const dn = date.getDate();
    let dayOfYear = dayCount[mn] + dn;
    if (mn > 1 && isLeapYear(date)) dayOfYear++;
    return dayOfYear;
};