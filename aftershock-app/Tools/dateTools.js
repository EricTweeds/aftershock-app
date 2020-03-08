module.exports.formatMonthDay = function(timestamp) {
    let months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    var date = new Date(Date.parse(timestamp));
    let day = date.getUTCDate();
    let month = months[date.getUTCMonth()];
    return (month + " " + day);
}