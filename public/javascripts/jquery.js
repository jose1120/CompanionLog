$(document).ready(function()
{
  $('#calendar').fullCalendar({
    dayClick: function() {
      location.href="/createevent"
    }
  });
});
