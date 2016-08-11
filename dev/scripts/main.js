var events = {};
events.clientID = 'LSYF2M1LMY4HXFFC3FAXQCP4DCWHRHUCIT2UTCFI03RF0ZG1';
events.clientSecret = 'MUHQ2Q5JOZDSVKIZWEQANDK2QA4PHCMCAEHW1QNBEIFHZFTK';
events.version = '20130815';

//Store Scenarios In Object

var scenarios = [
	{
		instance: "Transport yourself to the center of helm's deep during the Battle of Hornburg to throw a battle axe into the skull of an Uruk Hai.",
		searchValue: "BATL"
	},
	{
		instance: "Stroll down Park Place with Rich Uncle Penny Bags making it rain because you know you’re about to pass GO.",
		searchValue: "castle board game cafe"
	},
	{
		instance: "Kill some time during the Punic Wars against Carthage by throwing rocks at some other rocks with your fellow soldiers.",
		searchValue: "Track & Field"
	},
	{
		instance: "Spank some balls with a wooden paddle while sipping on a Negroni with all your pals.",
		searchValue: "spin toronto"
	},
	{
		instance: "Cease to be conscious of ones self as the one who is engaged in hitting a bulls-eye that confronts you.",
		searchValue: "archery district"
	},
	{
		instance: "Break into a museum with an elite team of thieves tasked with acquiring an illusive and mysterious relic.",
		searchValue: "escape games"
	},
	{
		instance: "Travel back in time to be a contestant on American Gladiators only to have your dreams of winning shattered by some muscle bound behemoth named Bronco.",
		searchValue: "Pursuit OCR"
	},
	{
		instance: "Dangle off the edge of Yellow Mountain while you watch your safety line slowly drift 900 meters to the ground.",
		searchValue: "Boulderz"
	},
	{
		instance: "Spend your free time in the ice age bouncing on the stretched skin of a wooly mammoth.",
		searchValue: "Sky Zone"
	},
	{
		instance: "Sip a tasty non-fat-one-pump-no-whip mocha while being smothered by a barrage of kitties.",
		searchValue: "TOT cat cafe"
	},
	{
		instance: "Exist inside a gelatinous ectoplasm playing for Manchester United in the FA Cup Final.",
		searchValue: "Bubble Soccer Toronto"
	},
	{
		instance: "Run through a post apocalyptic battle field equipped with a photon blaster.",
		searchValue: "Laser Quest"
	},
];
//Pull Two Scenarios At Random Out Of Object

var rouletteScenario1 = Math.floor(Math.random() * 12) + 0;
var rouletteScenario2 = Math.floor(Math.random() * 12) + 0;
function getNewRandom(currentNum) {
	var newRandom = Math.floor(Math.random() * 12);
	if(newRandom === currentNum) {
		return getNewRandom(currentNum);
	}
	else {
		return newRandom
	}
}
var myNum = getNewRandom(rouletteScenario1);

//Display Scenario On Page

$('.option1').append(scenarios[rouletteScenario1].instance);
$('.option2').append(scenarios[myNum].instance);
$('#option1').val(scenarios[rouletteScenario1].searchValue);
$('#option2').val(scenarios[myNum].searchValue);

// var userChoice = "";

$("input[type=radio]").on("click", function(){
var userChoice = $("input[type=radio]:checked").val();
events.getInfo(userChoice);
console.log(userChoice);
});

events.getInfo = function(userChoice) {
	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/search?',
		method: 'GET',
		dataType: 'json',
		data: {
			client_id: events.clientID,
			client_secret: events.clientSecret,
			v: events.version,
			near: 'toronto',
			query: userChoice
		}
	}).then(function(data){
		console.log(data.response.venues);
		console.log(userChoice);

		events.displayInfo(data.response.venues[0]);
		console.log(data.response.venues[0]);
	});
};

events.displayInfo = function(venue){
//GRAB NAME, URL, PHONE#, ADDRESS, STORE HOURS FROM FIRST RESULT
    var venueName = venue.name;
    var venueURL = venue.url;
    var venuePhone = venue.contact.formattedPhone;
    var venueAddress = venue.location.formattedAddress;
//APPEND TO HTML
    $('.activityTitle').text(venueName);
//DUMP INTO CONTAINER
};