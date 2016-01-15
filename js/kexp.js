/**
 * Created by JKardong on 11/30/15.
 */

$(document).ready(function() {

    //=======================================
    // Attach JS Events to Button Functions
    //=======================================

    //Add Show Logic
    addNewShow.Show();

    //Blank Play Show/Hide
    addBlankPlay.Show();

    //Air Break Show/Hide
    addAirBreak.Show();

    //Calendar Button Clicks
    CalendarSelect.Show();

    //=======================================
    // Set Form State
    //=======================================
    $('#blank-play-container').hide();
    $('#air-break-container').hide();
    $('#new-show-container').hide();

    //=======================================
    // Set The Date
    //=======================================
    $( '#kexp-date' ).html(getDateTime.FullDayMonth());
    $( '#kexp-time' ).html(getDateTime.CurrentTime());

    //=======================================
    //Set Globals
    //=======================================
    var created = '';
    var played = '';
    var song_title = '';
    var artist = '';
    var release = '';
    var label = '';

    //=======================================
    // Blank Play Radio Buttons
    //=======================================
    Image1 = new Image();
    Image1.src="img/radio/blue.gif";
    Image2 = new Image();
    Image2.src="img/radio/blue-selected.gif";
    Image3 = new Image();
    Image3.src="img/radio/green.gif";
    Image4 = new Image();
    Image4.src="img/radio/green-selected.gif";
    Image5 = new Image();
    Image5.src="img/radio/grey.gif";
    Image6 = new Image();
    Image6.src="img/radio/grey-selected.gif";
    Image7 = new Image();
    Image7.src="img/radio/red.gif";
    Image8 = new Image();
    Image8.src="img/radio/red-selected.gif";
    Image9 = new Image();
    Image9.src="img/radio/yellow.gif";
    Image10 = new Image();
    Image10.src="img/radio/yellow-selected.gif";

    //=======================================
    //Set Selleck URL
    //=======================================
    var url = 'http://selleck.kexp.org:8080/playlist'
    url = 'http://10.10.4.111:8080/playlist'

    //=======================================
    //Dispaly URL - Test
    //=======================================
    LogConsole.logCalledURL(url);

    //=======================================
    // Call Selleck PLAY
    //=======================================
    callSelleckPlay(url);

    //=======================================
    // Set SHOW - TEST todo- Remove - JBK - 1/8/2016
    //=======================================
    //setShowDetail(url);
    getPlaylistAJAX(url);

    //=======================================
    // set NEW SHOW - DJ LIST
    //=======================================
    setDropDown(url, $('#air-host-name'));

    //=======================================
    // set NEW SHOW - PROGRAM TITLE
    //=======================================
    setDropDown(url, $('#air-program-title'));

    //=======================================
    // Set PLAY COUNT
    //=======================================
    setPlayCount();


}); //End DOM load


/*==================================================================================================
 JS CALLS TO SELLECK
 ===================================================================================================*/


//=======================================
// Call PLAY - JSON
//=======================================
function callSelleckPlay(url){

    var selleckPlay = $.getJSON(url, function(data) {

        })
        .success(function(data){

            $.each(data, function(i, play){

                //Add Row To Playlist
                AddPlayRowToGrid.addPlay(play);

            });

        })
        .done(function() {
            LogConsole.logSuccess("Pull From Selleck Worked")
        })
        .fail(function() {
            LogConsole.logError("Error calling Selleck. Function callSelleckPlay()")
        })
        .error(function(){
            LogConsole.logError("Error calling Selleck. Function callSelleckPlay()")
        });

};

//=======================================
// Call SHOW - JSON
//=======================================
function setShowDetail(url){

    //Debug
    LogConsole.logMessage("Set Show Detail")

    //Set Vars - TODO - HOOK UP LOGIC
    var imgURL = 'img/header/img-cheryl.PNG';
    var imgDefaultURL = 'img/header/img-default.png';
    var showDJ = "Cheryl Waters";
    var showName = "The Midday Show";
    var showSlogan = "A show for the ages and ages."

    //Call Selleck For Show Detail
    var selleckPlay = $.getJSON(url, function(data) {


        })
        .success(function(data){

            //Set DJ Image
            $("#dj-image").attr("src",imgURL);

            //Set Show DJ
            $("#show-dj").append(showDJ);

            //Set Show Name
            $("#show-name").append(showName);

            //Set Show Slogan
            $("#show-slogan").append(showSlogan);

        })
        .fail(function() {

            //Set DJ Image
            $("#dj-image").attr("src",imgDefaultURL);

            //Set Show DJ
            $("#show-dj").append("KEXP DJ");

            //Set Show Name
            $("#show-name").append("Where The Music Matters");

            //Set Show Slogan
            $("#show-slogan").append("KEXP.ORG 90.3 Seattle");

            //Throw Error
            console.log('Error Calling Show Detail');
        })

};

//=======================================
// Set Show Detail - TODO - decide which method to use
//=======================================
function getPlaylistAJAX(url){

    //Log Action
    LogConsole.logMessage("Set Show Details")

    //Break URL
    //url = 'http://10.10.4.111:8080/playlists';

    //Set Vars - TODO - HOOK UP LOGIC
    var imgURL = 'img/header/img-cheryl.PNG';
    var imgDefaultURL = 'img/header/img-default.png';
    var showDJ = "Cheryl Waters";
    var showName = "The Midday Show";
    var showSlogan = "A show for the ages and ages."

    //Call Selleck
    $.ajax({

        url: url,
        type: 'GET',
        timeout: 10000,
        success: function(data){

            //Log Action
            LogConsole.logMessage("Success Call To Selleck");

            //TODO - hook up when real API is returning results
            //JSON.stringify(data);

            //Set DJ Image
            $("#dj-image").attr("src",imgURL);

            //Set Show DJ
            $("#show-dj").append(showDJ);

            //Set Show Name
            $("#show-name").append(showName);

            //Set Show Slogan
            $("#show-slogan").append(showSlogan);

        },
        error: function(e){

            //Log Action
            LogConsole.logMessage("Failure Setting Show Details");

            //Set DJ Image
            $("#dj-image").attr("src",imgDefaultURL);

            //Set Show DJ
            $("#show-dj").append("KEXP DJ");

            //Set Show Name
            $("#show-name").append("Where The Music Matters");

            //Set Show Slogan
            $("#show-slogan").append("KEXP.ORG 90.3 Seattle");

        }
    });
}

//=======================================
// Call Selleck PLAY COUNT - JSON
//=======================================
function setPlayCount(){

    //TODO - HOOK UP LOGIC
    $( '#play-high').append("10");
    $( '#play-medium').append("2");
    $( '#play-light').append("3");
    $( '#play-local').append("4");
    $( '#play-recurrent').append("5");
    $( '#play-break').append("6");

};


//=======================================
// DropDown Population
//=======================================

function setDropDown(url, dropDown){

    //Set Message To Console
    LogConsole.logMessage("Populate DropDown ID: '" + dropDown.attr('id') +  "' | Call: " + url);

    //Call Selleck
    $.ajax({

        type: "GET",
        contentType: "application/json; charset=utf-8",
        url: url,
        data: "{}",
        dataType: "json",

        success: function (data) {

            //Loop Through Each Value
            $.each(data, function(i, play){

                //Add Options To DropDownList
                $(dropDown).append($("<option></option>").val(play.played).html(play.artist));

            });
        },

        error: function(err){

            //Log Error
            LogConsole.logError(err.responseText);
        }
    });
};



/*==================================================================================================
 BUTTON FUNCTIONS
 ===================================================================================================*/

//
var CalendarSelect = {

    Show: function(){

        $('#kexp-date-picker').click(function(){

            alert('Calendar Logic');
        })
    }


}

//=======================================
// Add show to the header
//=======================================
var addNewShow = {

    Show: function(){

        $('#new-show-button').click(function(){

            //Toggle Visibility
            $('#new-show-container').slideToggle(300);

            //Hide Blank Play
            addBlankPlay.Hide();

            //Hide Air Break
            addAirBreak.Hide();

        });
    },
    Remove: function(){

    },
    Hide: function(){

        $('#new-show-container').slideUp(300);
    }
}

//=======================================
// Insert Blank Play Button Logic
//=======================================
var addBlankPlay = {

    Show: function(){

        //Attach Click Event To Blank Play
        $('#blank-play-button').click(function(){

            //Toggle The Blank Play
            $('#blank-play-container').slideToggle(300);

            //Hide Air Break If Displayed
            addAirBreak.Hide();

            //Hide New Show
            addNewShow.Hide();

        });
    },
    Hide: function(){

        $('#blank-play-container').slideUp(300);
    },
    Add: function(){

        //TODO - Hook up save to API
    }
};

//=======================================
// Air Break Button Logic
//=======================================
var addAirBreak = {

    Show: function(){

        //Attach Click Event
        $('#air-break-button').click(function() {

            //Set Current Time
            $('#airbreak-time').text(getDateTime.CurrentTime());

            //Show Air Break
            $('#air-break-container').slideToggle(300);

            //Hide Blank Play
            addBlankPlay.Hide();

            //Hide New Show
            addNewShow.Hide();

        });
    },
    Hide: function(){

        $('#air-break-container').slideUp(300);
    },
    Add: function(){

        //TODO - Hook up save to API
    }
};


//=======================================
// Create Reject/Save to playlist row
//=======================================
var addButtonGroup = {

    SaveReject: function(){

        var buttonGroup = [

            '<div class="small-1 medium-1 large-1 columns hide-buttons">',
            '<a href="#"><img src="img/img-edit.png" /></a>',
            '<a href="#" class="small hollow button song-button">REJECT</a>',
            '<a href="#" class="small button song-button">SAVE</a>',
            '</div>'

        ].join('');

        //Return Button Group
        return buttonGroup;

    },
    CancelSave: function(){

        var buttonGroup = [

            '<div class="small-1 medium-1 large-1 columns hide-buttons">',
            '<a href="#"><img src="img/img-edit.png" /></a>',
            '<a href="#" class="small hollow button song-button">CANCEL</a>',
            '<a href="#" class="small button song-button">SAVE</a>',
            '</div>'

        ].join('');

        //Return Button Group
        return buttonGroup;

    },

};

//=======================================
// Edit Button Event Handling
//=======================================
var imgEdit = {

    click: function(){

        alert('hit shit');
    }

}

/*==================================================================================================
 PLAY GRID FUNCTIONS
 ===================================================================================================*/

var AddPlayRowToGrid = {

    addPlay: function(play){

        //Log
        LogConsole.logMessage("Add Play: " + play.artist + ' - ' + play.song_title);

        //Set Each Play To Vars
        created = play.created;
        played = play.played;
        song_title = play.song_title;
        artist = play.artist;
        release = play.release;
        label = play.label;

        //Construct Playlist Row
        var row = [

            '<div class="row kexp-customWidth collapse kexp-playlist-row-container">',
            '<div class="large-1 columns">',
            played.substr(12,7),
            '</div>',
            '<div class="large-2 columns">',
            '<img src="images\/playlist\/img-artwork-stubb.jpg"/>',
            '</div>',
            '<div class="large-3 columns">',
            '<div class="kexp-playlist-artist">',
            play.artist,
            '</br>',
            play.song_title,
            '</br>',
            play.release,
            '</br>',
            play.label,
            '&nbsp;',

            '</div>',
            '</div>',
            '<div class="large-4 columns">',
            '<textarea rows="5"/>',
            '</div>',
            '<div class="large-2 columns">',
            addButtonGroup.SaveReject(),
            '</div>',
            '</div>'
        ].join('');





        //Add Row
        Playlist.addPlay(row);

    },
    removePlay: function(playID) {

        //Log
        LogConsole.logMessage("Remove Play: " + playID);
    }

};

//Creates Row For Adding to Playlist
function rowCreator(row,id){

    this.row=row;
    this.id=id;

    var table_row=document.createElement("tr");

    for(var cell=0;cell<this.row.length;++cell)
    {
        var td=document.createElement("td");
        td.innerHTML=row[cell];
        table_row.appendChild(td);
    }

    document.getElementById(this.id).appendChild(table_row);
}

//Example
//rowCreator(['cell','cell2'],'table');
//rowCreator(['hello','world'],'table');
//rowCreator(['hello fuckwad','world'],'table');

//=======================================
// OOP For Row Create - NOT USED 12/10/2015
//=======================================
function CreatePlayListRow(){

    var createdDate = null;
    var playedDate = null;
    var songTitle = null;
    var artistName = null;
    var releaseDate = null;
    var labelName = null;

    Object.defineProperty(this, 'PlayListRow', {


        get: function() {

            //Construct Playlist Row
            var PlayListRow = [
                '<div class="row collapse">',
                '<div class="large-3 columns">',
                '<div class="panel">',
                getDateTime.CurrentTime(),
                '</div>',
                '</div>',
                '<div class="large-6 columns">',
                '<div class="panel">',
                artistName,
                '</div>',
                '</div>',
                '<div class="large-3 columns">',
                '<div class="panel">',
                songTitle,
                '</div>',
                '</div>',
                '</div>'
            ].join('');

            //Return Populated Row
            return PlayListRow;

        },

        set: function(value) {


        }

    });

}

/*==================================================================================================
 HELPER FUNCTIONS
 ===================================================================================================*/

//=======================================
// Radio Buttons on Blank Play
//=======================================
function setRadio(radio_id, unchecked_image, checked_image, image_id, is_grouped) {

    //Set Vars
    var radio_object = document.getElementById(radio_id);
    var image = document.getElementById(image_id);

    // Define the grouped radio buttons and images so they can be cleared.
    var high = document.getElementById("high");
    var med = document.getElementById("med");
    var light = document.getElementById("light");

    var high_image = document.getElementById("high-image");
    var med_image = document.getElementById("med-image");
    var light_image = document.getElementById("light-image");

    // Clear the grouped radio buttons if needed.
    if(is_grouped == true) {

        high.checked = false;
        med.checked = false;
        light.checked = false;

        high_image.src = "img/radio/blue.gif";
        med_image.src = "img/radio/red.gif";
        light_image.src = "img/radio/yellow.gif";
    }

    if(radio_object.checked == false) {
        radio_object.checked = true;
        image.src = checked_image;
    }
    else {
        radio_object.checked = false;
        image.src = unchecked_image;
    }
}
function matchSelectionSizes(selection_id) {
    var selection = document.getElementById(selection_id);

    document.getElementById("artist-select").style.height = selection.style.height;
    document.getElementById("album-select").style.height = selection.style.height;
    document.getElementById("song-select").style.height = selection.style.height;
    document.getElementById("label-select").style.height = selection.style.height;
}

//=======================================
// Logger To Console
//=======================================
var LogConsole = {

    logMessage: function(message){
        console.log(getDateTime.CurrentTime() + ": Playlist Message: " + message);
    },
    logError: function(message){
        console.log(getDateTime.CurrentTime() + ": Error Reported: " + message);
    },
    logSuccess: function(message){
        console.log(getDateTime.CurrentTime() + ": Success Reported: " + message);
    },
    logCalledURL: function(URL){
        console.log(getDateTime.CurrentTime() + ": Called URL: " + URL);
    }
}

//=======================================
// PLAYLIST CRUD
//=======================================
var Playlist = {

    addPlay: function(play){

        //Add Value To
        $('#playlist-master').before(play)

    },
    removePlay: function(play){

    },
    updatePlay: function(play){

    }
}

//=======================================
// CONFIRM OR DENY PLAY
//=======================================
function validatePlay(message){

    console.log('Called Method: ' + message);
};

//=======================================
// DATE FUNCTION - MONTH/DAY/YEAR RETURNED
//=======================================

//Basic Day Time Stamp
var getDateTime = {

    FullDayMonth: function(){

        //Get the Date
        var date = new Date();

        //Return Value
        return getDateTime.DayOfWeek() + ' ' + date.getDate() + ' ' + getDateTime.MonthofYear() + ' ' + date.getFullYear();
    },

    MonthofYear: function() {

        //Get The Month
        //Set Vars
        var month = 'DATE';

        //Get the Date
        var date = new Date();

        //Get The Month
        switch(date.getMonth()){
            case 0: month = 'January'; break;
            case 1: month = 'February'; break;
            case 2: month = 'March'; break;
            case 3: month = 'April'; break;
            case 4: month = 'May'; break;
            case 5: month = 'June'; break;
            case 6: month = 'July'; break;
            case 7: month = 'August'; break;
            case 8: month = 'September'; break;
            case 9: month = 'October'; break;
            case 10: month = 'November'; break;
            case 11: month = 'December'; break;
            default: month = 'MONTH'
        }

        //Return Month
        return month;

    },

    DayOfWeek: function(){

        //Set Vars
        var day = 'DAY';

        //Get the Date
        var date = new Date();

        //Get the Day
        switch (date.getDay()){
            case 0: day = 'Sunday'; break;
            case 1: day = 'Monday'; break;
            case 2: day = 'Tuesday'; break;
            case 3: day = 'Wednesday'; break;
            case 4: day = 'Thursday'; break;
            case 5: day = 'Friday'; break;
            case 6: day = 'Saturday'; break;
            default : day = 'DAY';
        };

        //Return Day Of The Week
        return day;

    },

    CurrentTime: function(){

        //Set Time
        var currentTime = new Date().toLocaleTimeString().toString();

        //Return Time
        return currentTime;

    }


}

/*==================================================================================================
 SAVE FUNCTIONS - ARE NOT USED
 ===================================================================================================*/

function Fuck(url){

    var text = $('#message-text');

    $.ajax({

        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data){

            writeToPlaylist(text.html(JSON.stringify(data)));

        },
        error: function(e){

            writeToPlaylist(e.message);
            //alert(e);
        }

    });

};

//=======================================
// Legacy Call Using AJAX - Do Not Modify - WORKS
//=======================================
function callSelleckAJAXLegacy(){

    var text = $('#message-text');

    $.ajax({

        url: 'http://cache.kexp.org/cache/latestPlay',
        type: 'GET',
        beforeSend: validatePlay,
        crossDomain: true,
        dataType: 'jsonp',
        success: function(data){

            alert(JSON.stringify(data))
            //writeToPlaylist(text.html(JSON.stringify(data)));

        },
        error: function(e){

            writeToPlaylist(e.message);
            //alert(e);
        }

    });

};

//=======================================
// Call Selleck Using AJAX
//=======================================
function callSelleckAJAX(url){

    $.ajax({

        url: url,
        type: 'GET',
        beforeSend: validatePlay('callSelleckAJAX'),
        dataType: 'json',
        success: function(data){

            writeToPlaylist(JSON.stringify(data));

        },
        error: function(e){

            writeToPlaylist(e.message);
            //alert(e.message);
        }

    });

};