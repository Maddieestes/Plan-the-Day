
$(document).ready(function(){

    $("#currentDay").text(moment().format('dddd, MMMM Do'));
   var displayHour; 
   var currentTimeHH = moment().format('H')
   var startTime = 10; 
   var workingHours = 10; 

   //creating time blocks 
   for (var i = 0; i<= workingHours; i++) {
    var rowEl = $('<div>'); 
    rowEl.addClass ('col-lg-12 col-md-12 col-sm-12 col-12 row');

       // time displayed for the day 
       displayTime = startTime + i; 
       displayHour = displayHourCalc(displayTime);


       //Create hour display
       var hourElDiv = $('<div>');
       hourElDiv.addClass('col-lg-1 col-md-1 col-sm-1 col-1 p-0');
       var hourEl = $("<p>"); 
       hourEl.addClass('hour');
       hourEl.text (displayHour);

       //attaching hours to the rows/columns
       hourElDiv.append(hourEl); 
       rowEl.append(hourElDiv);
       
       //Create event text display
       var eventElDiv = $('<div>');
       eventElDiv.addClass('col-lg-10 col-sm-10 col-sm-10 col-10 p-0');
       var eventEl = $("<textarea>");
       eventEl.addClass('textarea description');
       eventDescID = "event" + i;
       eventEl.attr('id', eventDescID);
       if (currentTimeHH > displayTime) {
           eventEl.addClass('textarea description past');
           eventEl.attr('readonly', 'readonly');
       } else if (currentTimeHH < displayTime) {
           eventEl.addClass('textarea description future');
       } else {
           eventEl.addClass('textarea description present');
       }

       //text entry for users event
       var buttonElDiv = $('<div>');
       buttonElDiv.addClass('col-lg-1 col-md-1 col-sm-1 col-1 custom-btnele p-0');
       var buttonEl = $("<button>");
       buttonEl.addClass('saveBtn');
       var btnID = i;
       buttonEl.attr('id', btnID);
       
       // creating save icon 
       var iconEl = $('<i>');
       iconEl.addClass('fas fa-save');
       buttonEl.append(iconEl);

       //Append event to row 
       eventElDiv.append(eventEl);
       rowEl.append(eventElDiv);

       buttonElDiv.append(buttonEl);
       rowEl.append(buttonElDiv);

       $(".container").append(rowEl);
       
       retrieveEventDetails(i);
       
   }

    //setting time to 24hour display
   function displayHourCalc(displayTime) {  
       var displayHour;
       if (displayTime >= 24) {
           return;
        }
        if (displayTime > 0 && displayTime < 12) {
            displayHour = displayTime + " AM";
        } else if (displayTime < 24 && displayTime > 12) {
            displayHour = (displayTime - 12) + " PM";
        } else if (displayTime == 24) {
            displayHour = (displayTime - 12) + " AM";
        } else if (displayTime == 12) {
            displayHour = displayTime + " PM";
        } else { 
            console.log ('invalid display time')
            return;
        }; 
        return displayHour;
   }

   //saving event when icon button is clicked
   var saveBtn = $('.saveBtn');
   saveBtn.on('click',function () {
        var eventId = $(this).attr('id');
        var eventDesc = $(this).parent().siblings().children('.description').val();
        localStorage.setItem(eventId,eventDesc);

   } );
   
   //retrieving stored user info
   function retrieveEventDetails(storageKey) {
       var eventDesc = localStorage.getItem(storageKey);
       console.log(eventDesc);
       var eventDescID = "event" + storageKey;
       if (eventDesc) {
           console.log(eventDescID);
           $('#'+ eventDescID).text(eventDesc);
        }

   };
  
 });
