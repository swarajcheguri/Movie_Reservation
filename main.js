(function () {
    var $ = jQuery;
    var movieBooking = (function () {
        var seatsSelected = "", seatSelectedCount = 0;
        var noOfSeatsRequired = 0;
        var intailize = function () {
            bindChairs();
            disableEnableConfrim();
            bindSelecdrdwn();
            confirmSeats();
            enableDrpdwn();
            enableDrpdwnExe();
            findSeats();
        };
        var enableDrpdwn = function () {
            $('#name').unbind("keyup").keyup(function () {
                enableDrpdwnExe();

            });
        };
        var enableDrpdwnExe = function () {
            if ($('#name').val().trim().length != 0) {
                $('#noOfSeats').removeAttr('disabled');
            } else {
                $('#noOfSeats').attr('disabled', true);
            }
        };
        var findSeats = function () {
            if ($('.seatsTable .whiteSeat').length == 0) {

                $('#noOfSeats').attr('disabled', true).hide();
                $('#seatsNotAvailable').show();
            }


        };
        var bindSelecdrdwn = function () {
            $('#noOfSeats').unbind('change').change(function () {
                $('.seatsTable .greenSeat').removeClass('greenSeat').addClass('whiteSeat');
                resetCounts();
                noOfSeatsRequired = parseInt($(this).val());
                if (noOfSeatsRequired != 0) {
                    $('.overlayDiv').hide();
                } else {
                    $('.overlayDiv').show();
                }
            });
        }
        var bindChairs = function () {
            $('.chair').unbind('click').click(function () {
                if ($(this).hasClass('whiteSeat')) {
                    if (seatSelectedCount == noOfSeatsRequired) {
                        alert("You already made selection for the given count. To select new seats either increase the selection or deselect the selected seats");
                    }
                    else {
                        $(this).removeClass('whiteSeat').addClass('greenSeat');

                        seatsSelected = seatsSelected + $(this).data('seatno') + ",";
                        seatSelectedCount++;

                    }
                }
                else if ($(this).hasClass('greenSeat')) {

                    $(this).removeClass('greenSeat').addClass('whiteSeat');
                    seatsSelected = seatsSelected.replace($(this).data('seatno') + ",", "");
                    seatSelectedCount--;
                }
                disableEnableConfrim();
            });
        }
        var disableEnableConfrim = function () {
            if (seatSelectedCount == noOfSeatsRequired && noOfSeatsRequired != 0) {
                $('.confirmSeats').removeAttr("disabled");
            }
            else {
                $('.confirmSeats').attr("disabled", true);
            }

        };

        var confirmSeats = function () {
            $('.confirmSeats').unbind('click').click(function () {
                var confirUser = confirm("Are you sure to confirm this seats");
                if (confirUser == true) {
                var seatsHTML = '<tr><td>' + $('#name').val().trim() + '</td><td>' + seatSelectedCount + '</td><td>' + seatsSelected.substring(0, seatsSelected.length - 1) + '</td>';
                noOfSeatsRequired = 0;
                disableEnableConfrim();
                $('.tblSeatsInformation tbody').append(seatsHTML);
                $('.seatsTable .greenSeat').removeClass('greenSeat').addClass('redSeat');
                $('#name').val("");
                $('#noOfSeats').val("0").trigger('change');
            } 
                
            });
        };
        var resetCounts = function () {
            noOfSeatsRequired = 0;
            disableEnableConfrim();
            seatSelectedCount = 0;
            seatsSelected = '';
            enableDrpdwnExe();
            findSeats();
        };
        return {
            start: intailize

        }

    })();


    $(document).ready(function () {


        movieBooking.start();

    });
}());