const parseDate = (str) => {
    console.log(str)
    str = str.toString();
    let dd = str.slice(0,2);
    let mm = str.slice(3,5);
    let yyyy = str.slice(6,10);
    let dateStr = mm+dd+yyyy
    console.log(dd,' ',mm,' ', yyyy)
    let date = new Date(dateStr);
    console.log(date)
    return date;
}

module.exports = {
    parseDate
}
