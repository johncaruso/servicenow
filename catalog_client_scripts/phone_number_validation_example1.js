/*global g_form*/
function onChange(control, oldValue, newValue, isLoading) {
    'use strict';
    if (isLoading || newValue === '') { //if loading, or newvalue is empty
        return;
    }
    var n = parseInt(newValue, 10);
    console.log(n);
    console.log(n.length);

    if (parseInt(newValue, 10).toString().length === 10) { //ensure its 10 numbers
        g_form.hideFieldMsg(control, true);
        var newPhone = '(' + control.value.substr(0, 3) + ')' + control.value.substr(3, 3) + '-' + control.value.substr(6, 4);
        control.value = newPhone;
    } else {
        g_form.showFieldMsg(control, 'The phone number must be in this format: 1234567890.', 'error');
    }
}
