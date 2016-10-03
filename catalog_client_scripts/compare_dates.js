function onSubmit() {
    //validate that the start date is before the end date
    var st = getDateFromFormat(g_form.getValue("resource_start_date"), g_user_date_time_format);
    var et = getDateFromFormat(g_form.getValue("resource_est_end_date"), g_user_date_time_format);
    if (st > et) {
        g_form.hideAllFieldMsgs();
        alert("Estimated end date must be after the start date.");
        g_form.showErrorBox("resource_est_end_date", "Estimated end date must be after the start date.");
        return false;
    }
    //validate that the start date is before the today's date
    var newTime = new GwtDate(st);
    var tm = new GwtDate();
    tm.now();
    tm.subtractHours(24);
    if (newTime.compare(tm, true) < 0) {
        g_form.hideAllFieldMsgs();
        alert("Start date must be after the today\'s date.");
        g_form.showErrorBox("resource_start_date", "Start date must be after the today\'s date.");
        return false;
    }
}