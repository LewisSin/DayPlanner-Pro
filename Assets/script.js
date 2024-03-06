// Ensure jQuery executes once the DOM is fully loaded
$(function () {
    // Display current date and time in the header using Day.js
    let now = dayjs().format("DD/MM/YYYY HH:mm");
    let currentHour = dayjs().format("H");

    $("#currentDay").text(now);
    
    // Event listener for saving text input to local storage on button click
    $(".saveBtn").click(function () {
        let blockTime = $(this).closest(".time-block").attr("id");
        let eventData = $(this).siblings(".description").val();
        
        localStorage.setItem(blockTime, eventData);
    });

    // Retrieve and display stored events for each time block from local storage
    function loadEvents() {
        $(".time-block").each(function () {
            let blockId = $(this).attr("id");
            $(this).find(".description").val(localStorage.getItem(blockId));
        });
    }
    loadEvents();

    // Update each time block's styling based on the current time
    $(".time-block").each(function () {
        let blockHour = parseInt($(this).attr("id").replace("hour-", ""));
        if (currentHour == blockHour) {
            $(this).addClass("present").removeClass("past future");
        } else if (currentHour > blockHour) {
            $(this).addClass("past").removeClass("present future");
        } else {
            $(this).addClass("future").removeClass("past present");
        }
    });

    // Clear local storage and refresh the page to reset the calendar
    $("#reset").click(function () {
        localStorage.clear();
        window.location.reload();
    });
});
