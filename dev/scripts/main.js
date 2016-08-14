var events = {};
var wiki = {};
events.clientID = 'LSYF2M1LMY4HXFFC3FAXQCP4DCWHRHUCIT2UTCFI03RF0ZG1';
events.clientSecret = 'MUHQ2Q5JOZDSVKIZWEQANDK2QA4PHCMCAEHW1QNBEIFHZFTK';
events.version = '20130815';

//Store Scenarios In Object

var scenarios = [
	{
		instance: "Transport yourself to the center of helm's deep during the Battle of Hornburg to throw a battle axe into the skull of an Uruk Hai.",
		searchValue: "BATL",
		image: "public/styles/images/BATL.jpg",
		activity: 'axe throwing'
	},
	{
		instance: "Stroll down Park Place with Rich Uncle Penny Bags making it rain because you know you’re about to pass GO.",
		searchValue: "castle board game cafe",
		image: "public/styles/images/Castle.jpg",
		activity: 'board game'
	},
	{
		instance: "Kill some time during the Punic Wars against Carthage by throwing rocks at some other rocks with your fellow soldiers.",
		searchValue: "Track & Field",
		image: "public/styles/images/trackAndField.jpg",
		activity: 'bocce'
	},
	{
		instance: "Spank some balls with a wooden paddle while sipping on a Negroni with all your pals.",
		searchValue: "spin toronto",
		image: "public/styles/images/Spin.jpg",
		activity: 'ping pong'
	},
	{
		instance: "Cease to be conscious of ones self as the one who is engaged in hitting a bulls-eye that confronts you.",
		searchValue: "archery district",
		image: "public/styles/images/ArcheryDistrict.jpg",
		activity: 'history of archery'
	},
	{
		instance: "Break into a museum with an elite team of thieves tasked with acquiring an illusive and mysterious relic.",
		searchValue: "escape games",
		image: "public/styles/images/escapeRoom.jpeg",
		activity: 'escape room'
	},
	{
		instance: "Travel back in time to be a contestant on American Gladiators only to have your dreams of winning shattered by some muscle bound behemoth named Bronco.",
		searchValue: "Pursuit OCR",
		image: "public/styles/images/pursuitOCR.jpg",
		activity: 'obstacle racing'
	},
	{
		instance: "Dangle off the edge of Yellow Mountain while you watch your safety line slowly drift 900 meters to the ground.",
		searchValue: "Boulderz",
		image: "public/styles/images/Boulderz.jpg",
		activity: 'bouldering'
	},
	{
		instance: "Spend your free time in the ice age bouncing on the stretched skin of a wooly mammoth.",
		searchValue: "Sky Zone",
		image: "public/styles/images/SkyZone.jpg",
		activity: 'trampoline'
	},
	{
		instance: "Sip a tasty non-fat-one-pump-no-whip mocha while being smothered by a barrage of kitties.",
		searchValue: "TOT cat cafe",
		image: "public/styles/images/CatCafe.jpg",
		activity: 'cat cafe'
	},
	{
		instance: "Exist inside a gelatinous ectoplasm playing for Manchester United in the FA Cup Final.",
		searchValue: "Bubble Soccer Toronto",
		image: "public/styles/images/BubbleSoccer.jpg",
		activity: 'bubble bump football'
	},
	{
		instance: "Run through a post apocalyptic battle field equipped with a photon blaster.",
		searchValue: "Laser Quest",
		image: "public/styles/images/LaserQuest.jpg",
		activity: 'laser tag'
	},
];
//Pull Two Scenarios At Random Out Of Object

function wouldYouRather() {
	var rouletteScenario1 = Math.floor(Math.random() * 12) + 0;
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

	$('.option1 p').html(scenarios[rouletteScenario1].instance);
	$('.option2 p').html(scenarios[myNum].instance);
	$('#option1').val(rouletteScenario1);
	$('#option2').val(myNum);
};

function init() {
		wouldYouRather();
		$(".showResult").hide();
	$("input[type=radio]").on("click", function(){
		var userChoice = $("input[type=radio]:checked").val();
		events.getInfo(scenarios[userChoice].searchValue);
		events.getTip(scenarios[userChoice].searchValue);
		events.eventNumber = userChoice;
		wiki.getInfo(scenarios[userChoice].activity);
		$(".showResult").show();
	});
};

events.getInfo = function(userChoice) {
	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/search?',
		method: 'GET',
		dataType: 'json',
		data: {
			client_id: events.clientID,
			client_secret: events.clientSecret,
			v: events.version,
			near: 'Toronto',
			query: userChoice
		}
	}).then(function(data){
		if (data.response.venues[0].categories[0].name === "Track") {
			//GET THE CORRECT TRACK AND FIELD RESULT
			events.displayInfo(data.response.venues[1])
		}else {
			events.displayInfo(data.response.venues[0]);
		}
		// console.log(userChoice);
		console.log(data.response.venues[0]);
		// console.log(data.response.venues[0].categories[0].name)
	});
};


events.getTip = function(userChoice) {
	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/explore?',
		method: 'GET',
		dataType: 'json',
		data: {
			client_id: events.clientID,
			client_secret: events.clientSecret,
			v: events.version,
			near: 'Toronto',
			query: userChoice
		}
	}).then(function(data){
		// console.log(userChoice);
		// console.log(data.response.groups[0].items[0]);
		// console.log(data.response.groups[0].items[0].venue.location.lng);
		events.displayTip(data.response.groups[0].items[0].tips[0].text);
	});
};

wiki.getInfo = function(query) {
	$.ajax({
		url: 'http://en.wikipedia.org/w/api.php',
		method: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'json',
			action: 'query',
			prop: 'extracts',
			exintro: true,
			titles: query

		}
	}).then(function(response) {
		for (var key in response.query.pages){
		// console.log(response.query.pages[key].revisions[0]["*"]);
		// wiki.displayInfo(response.query.pages[key].revisions[0]["*"]);
		wiki.displayInfo(response.query.pages[key].extract);
		};
	});
};

wiki.displayInfo = function(wikiLink){
	$('.wikiContainer').empty();
		var activityLink = $('<p>').append(wikiLink);
		$('.wikiContainer').append(activityLink);
}

events.displayInfo = function(venue, userNumber){
//GRAB NAME, URL, PHONE#, ADDRESS, STORE HOURS FROM FIRST RESULT
    var venueName = venue.name;
    var venueURL = venue.url;
	// console.log(venueURL);
    var venuePhone = venue.contact.formattedPhone;
    var venueAddress = venue.location.formattedAddress;
//APPEND TO HTML
    $(".activityTitle").text(venueName);
	$(".resultImage").html($("<img>").attr("src", scenarios[events.eventNumber].image));
	var displayURL = $("<a target=\"_blank\">").attr("href", venueURL);
	var urlText = $(displayURL).text("See Site");
	$('.url').html(displayURL);
	$(".location").text(venueAddress[0] + ", " +venueAddress[1] + ", " +venueAddress[2]);
	$(".phoneNumber").text(venuePhone);
};

events.displayTip = function(data){
		$(".userTip").empty();
	var tipTitle = $("<h4>").text("User Tip from FourSquare");
	var tip = $("<p>").text(data);
	// console.log(data);
	$(".userTip").append(tipTitle);
	$(".userTip").append(tip);
}

init();

$('.reset a').on('click', function(){
	//smooth scroll
	$('html,body').animate({
	    scrollTop: $("header").offset().top},
	    'slow');
	$(".userTip").empty();
	init();
});

//smooth scroll
$("label").click(function() {
    $('html,body').animate({
        scrollTop: $("main").offset().top},
        'slow');
});