
// ======================= JAVASCRIPT DATEPICKER BE v1.2.0

// ----------------------- Global variables

var JDPBE_GLOBALS   = {     // Numbers of days from present that will be disabled in the calendar
                            // For example: [0,1,2,7] will disable today, tomorrow,
                            //  the day after, and a week from today
                            notAvailDates       : [],
                            // Disable navigation of past months
                            noPastMonths        : true,
                            // Number of future months to allow
                            allowFutureMonths   : 12,
                            // Date chosen by user as date object, set by code
                            selectedDate        : null,
                            // Call post processing function OnDateSelectionProcess()
                            callPostProcessor   : true,
                            // Calendar div z-index
                            calendarDivZIndex   : 2,
                            // ID of textbox to receive the date, obtained in code
                            textboxID           : ""       };


// ----------------------- Functions

// Called after date is selected
function OnDateSelectionProcess() {
    // Edit as required
    console.log("Selected date: " + JDPBE_GLOBALS.selectedDate.toDateString());
}

// Converts a date into "12-Oct-1984" format
function getDateString(dt) {
    return dt.getDate() + "-" + 
        ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][dt.getMonth()] + 
        "-" + dt.getFullYear();
}

// Converts a date into "July 2010" format
function getMonthYearString(dt) {
    return ["January","February","March","April","May","June","July",
        "August","September","October","November","December"][dt.getMonth()] +
        " " + dt.getFullYear();
}

// Called when the user clicks a calendar button
function chooseDate(e) {
    var targ;
    // Crossbrowser way to find the target
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
    
    // Find the calendar panel div
    var div = targ.parentNode.parentNode.parentNode.parentNode.parentNode;
    // Handle changing of month
    if (targ.value=="<" || targ.value==">") {
        createCalendar(div, new Date(targ.getAttribute("date")), JDPBE_GLOBALS.textboxID);
        return;
    }
    // Store selected date in global
    JDPBE_GLOBALS.selectedDate = parseMyDate(targ.getAttribute("date"));
    // Enter the date in related textbox if its id is set
    if (JDPBE_GLOBALS.textboxID) {
        var textbox = document.getElementById(JDPBE_GLOBALS.textboxID);
        textbox.value = targ.getAttribute("date"); // Set the selected date
        div.parentNode.removeChild(div); // Remove the calendar box
    }
    // Else no action, panel remains open with selected date (not implemented)
    // Call a processing function if set so in global var
    if (JDPBE_GLOBALS.callPostProcessor) {
        OnDateSelectionProcess();
    }
}

// Parse a date in d-MMM-yyyy format
function parseMyDate(d) {
    if (d=="") return new Date("NotADate"); // For Safari
    var a = d.split("-");
    if (a.length!=3) return new Date(d); // Missing 2 dashes
    var m = -1; // Now find the month
    if (a[1]=="Jan") m=0;
    if (a[1]=="Feb") m=1;
    if (a[1]=="Mar") m=2;
    if (a[1]=="Apr") m=3;
    if (a[1]=="May") m=4;
    if (a[1]=="Jun") m=5;
    if (a[1]=="Jul") m=6;
    if (a[1]=="Aug") m=7;
    if (a[1]=="Sep") m=8;
    if (a[1]=="Oct") m=9;
    if (a[1]=="Nov") m=10;
    if (a[1]=="Dec") m=11;
    if (m<0) return new Date(d); // Couldn't find the month
    return new Date(a[2],m,a[0],0,0,0,0);
}


// Returns true if limit of allowed future months has been reached
function MonthLimitReached(dateObj) {
    var fDate = new Date();
    fDate.setMonth(fDate.getMonth() + (JDPBE_GLOBALS.allowFutureMonths - 1));
    if (dateObj.valueOf() >= fDate.valueOf()) return true;
    else return false;
}

// Returns true if given date is in the past
function DateInThePast(dateObj) {
    var nowDate = new Date();
    // Remove time component of date object
    var todayDateOnly = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate());
    if (dateObj.valueOf() < todayDateOnly.valueOf()) return true;
    else return false;
}

// Checks given date against global list, returns true if not available
function DateNotAvailable(dateObj) {
    var nowDate = new Date();
    if (JDPBE_GLOBALS.notAvailDates) {
        for (var i = 0; i < JDPBE_GLOBALS.notAvailDates.length; i++) {
            // Remove time component of date object
            var fDate = new Date(nowDate.getFullYear(),nowDate.getMonth(),nowDate.getDate());
            fDate.setDate(fDate.getDate() + JDPBE_GLOBALS.notAvailDates[i]);
            if (dateObj.valueOf() == fDate.valueOf()) return true;
        }
    }
    return false;
}

// Creates the calendar for a given month
function createCalendar(div, month, idOfTextbox) {
    if (idOfTextbox) {
        var textbox = document.getElementById(idOfTextbox);
    }
    var tbl = document.createElement("table");
    // Set and ID on the table, for other code to see it well
    tbl.id = "datepickerinnertable";
    var topRow = tbl.insertRow(-1);
    
    // ----------------------- Set up top row buttons, changing month and year
    
    // Previous month button
    var td = topRow.insertCell(-1);
    var lastMonthBn = document.createElement("input");
    lastMonthBn.type="button"; // Have to immediately set the type due to IE
    td.appendChild(lastMonthBn);
    lastMonthBn.value="<";
    if (JDPBE_GLOBALS.noPastMonths && DateInThePast(month)) {
        lastMonthBn.disabled = "disabled";
    }
    else {
        lastMonthBn.onclick=chooseDate;
    }
    lastMonthBn.setAttribute("date",new Date(month.getFullYear(),month.getMonth()-1,1,0,0,0,0).toString());
    // Textbox for display of month and year
    var td = topRow.insertCell(-1);
    td.colSpan=5;
    var mon = document.createElement("input");
    mon.type="text";
    td.appendChild(mon);
    mon.value = getMonthYearString(month);
    mon.size=15;
    mon.disabled="disabled";
    mon.className="monthDsp";
    // Next month button
    var td = topRow.insertCell(-1);
    var nextMonthBn = document.createElement("input");
    nextMonthBn.type="button";
    td.appendChild(nextMonthBn);
    nextMonthBn.value = ">";
    if (MonthLimitReached(month)) {
        nextMonthBn.disabled = "disabled";
    }
    else {
        nextMonthBn.onclick=chooseDate;
    }
    nextMonthBn.setAttribute("date",new Date(month.getFullYear(),month.getMonth()+1,1,0,0,0,0).toString());
     
    var daysRow = tbl.insertRow(-1);
    daysRow.insertCell(-1).innerHTML="Mon";  
    daysRow.insertCell(-1).innerHTML="Tue";
    daysRow.insertCell(-1).innerHTML="Wed";
    daysRow.insertCell(-1).innerHTML="Thu";
    daysRow.insertCell(-1).innerHTML="Fri";
    daysRow.insertCell(-1).innerHTML="Sat";
    daysRow.insertCell(-1).innerHTML="Sun";
    daysRow.className="daysRow";
    
    // ----------------------- Make the calendar
    if (idOfTextbox) {
        var selected = parseMyDate(textbox.value); // Try parsing the date
    }
    var today = new Date();
    date = new Date(month.getFullYear(),month.getMonth(),1,0,0,0,0); // Starting at the 1st of the month
    var extras = (date.getDay() + 6) % 7; // How many days of the last month do we need to include?
    date.setDate(date.getDate()-extras); // Skip back to the previous monday
    while (1) { // Loop for each week
        var tr = tbl.insertRow(-1);
        for (var i=0; i < 7; i++) { // Loop each day of this week
            var td = tr.insertCell(-1);
            var inp = document.createElement("input");
            inp.type = "button";
            td.appendChild(inp);
            inp.value = date.getDate();
            // If date is in the past, disable button
            if (DateInThePast(date)) {
                if (inp.className) inp.className += " ";
                inp.className += "pastdate";
            }
            else {
                // If date the not available global list, mark it
                if (DateNotAvailable(date)) {
                    if (inp.className) inp.className += " ";
                    inp.className += "notavailable";
                }
                else {
                    inp.onclick = chooseDate;
                }
            }
            inp.setAttribute("date",getDateString(date));
            if (date.getMonth() != month.getMonth()) {
                if (inp.className) inp.className += " ";
                inp.className += "othermonth";
            }
            if (date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()) {
                if (inp.className) inp.className += " ";
                inp.className += "today";
            }
            if (idOfTextbox) {
                if (!isNaN(selected) && date.getDate()==selected.getDate() && date.getMonth()==selected.getMonth() && date.getFullYear()==selected.getFullYear()) {
                    if (inp.className) inp.className += " ";
                    inp.className += "selected";
                    inp.onclick = null;
                }
            }
            date.setDate(date.getDate()+1); // Increment a day
        }
        // We are done if we've moved on to the next month
        if (date.getMonth() != month.getMonth()) {
            break;
        }
    }
    // At the end, we do a quick insert of the newly made table, hopefully to remove any chance of screen flicker
    if (div.hasChildNodes()) { // For flicking between months
        div.replaceChild(tbl, div.childNodes[0]);
    }
    else { // For creating the calendar on first click of the icon
        div.appendChild(tbl);
    }
}

// Called when the calendar icon is clicked
function showDatePicker(idOfTextbox) {
    // Set the global textbox id variable
    JDPBE_GLOBALS.textboxID = idOfTextbox;
    var textbox = document.getElementById(idOfTextbox);
    // See if the date picker is already there, if so, remove it
    var x = textbox.parentNode.getElementsByTagName("div");
    for (var i=0; i < x.length; i++) {
        if (x[i].getAttribute("class")=="datepickerdropdown") {
            textbox.parentNode.removeChild(x[i]);
            return false;
        }
    }
    // Use input date, or current date if input not valid
    var date = parseMyDate(textbox.value);
    if (isNaN(date)) date = new Date();
    // Create the dropdown box
    var div = document.createElement("div");
    div.className="datepickerdropdown";
    div.style.zIndex = JDPBE_GLOBALS.calendarDivZIndex;
    createCalendar(div, date, idOfTextbox); // Create the calendar
    insertAfter(div, textbox); // Add the calendar just after the textbox
    return false;
}

// Adds an item after an existing one
function insertAfter(newItem, existingItem) {
    if (existingItem.nextSibling) { // Find the next sibling, and add newItem before it
        existingItem.parentNode.insertBefore(newItem, existingItem.nextSibling); 
    }
    else { // In case the existingItem has no sibling after itself, append it
        existingItem.parentNode.appendChild(newItem);
    }
}
