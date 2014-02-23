var LOCATION = "https://resplendent-fire-8202.firebaseio.com/users/";

var getName = function(roster) {
  //todo clean name of illegal chars
  return roster.username + "/" + roster.team;
}

var getRosterFromForm = function() {
  var team = $("#teamname").val();
  var username = $("#username").val();

  var roster = {"team": team, "username": username, "players" : [] };
  
  var textboxes = $("#roster input").each(function( index ) {
      roster.players.push($( this ).val());
  });

  return roster;
};

var save = function() {
  var roster = getRosterFromForm(); 
  console.log(roster);
  rosterExists(roster);
}

var rosterExists = function(roster) {

  var fb = new Firebase(LOCATION);
  fb.child(roster.username).child(roster.team).once('value', 
  function(snapshot) {
    console.log(snapshot);
    if (snapshot.val() === null) {
         console.log("doest NOT exist");
         saveRoster(roster);
     } else {
         console.log("already exists. cannot save");
     }
  });
}

var saveRoster = function(roster) {

 // save roster under jokecamp/United II
  var fb = new Firebase(LOCATION);
  var user = fb.child(roster.username);
  var entry = user.child(roster.team);

  entry.set(roster);
  addRosterLink(roster);
  console.log("roster saved to db as " + getName(roster));
};

var addRosterLink = function(roster) {
  $("#existing").append("<li><a href='index.html?username=" + roster.username + "&team=" + roster.team + "'>" + roster.team + "</a></li>");
};

$(function() {
    $("#save").click(save);
});