var events = {};
events.clientID = 'LSYF2M1LMY4HXFFC3FAXQCP4DCWHRHUCIT2UTCFI03RF0ZG1';
events.clientSecret = 'MUHQ2Q5JOZDSVKIZWEQANDK2QA4PHCMCAEHW1QNBEIFHZFTK';
events.version = '20130815';

//Store Scenarios In Object

var scenarios = [
	{
		instance: "Transport yourself to the center of helm's deep during the Battle of Hornburg to throw a battle axe into the skull of an Uruk Hai.",
		value: "BATL"
	},
	{
		instance: "Stroll down Park Place with Rich Uncle Penny Bags making it rain because you know you’re about to pass GO.",
		value: "castle board game cafe"
	},
	{
		instance: "Kill some time during the Punic Wars against Carthage by throwing rocks at some other rocks with your fellow soldiers.",
		value: "Track & Field"
	},
	{
		instance: "Spank some balls with a wooden paddle while sipping on a Negroni with all your pals.",
		value: "spin toronto"
	},
	{
		instance: "Cease to be conscious of ones self as the one who is engaged in hitting a bulls-eye that confronts you.",
		value: "archery district"
	},
	{
		instance: "Break into a museum with an elite team of thieves tasked with acquiring an illusive and mysterious relic.",
		value: "escape games"
	},
	{
		instance: "Travel back in time to be a contestant on American Gladiators only to have your dreams of winning shattered by some muscle bound behemoth named Bronco.",
		value: "Pursuit OCR"
	},
	{
		instance: "Dangle off the edge of Yellow Mountain while you watch your safety line slowly drift 900 meters to the ground.",
		value: "Boulderz"
	},
	{
		instance: "Spend your free time in the ice age bouncing on the stretched skin of a wooly mammoth.",
		value: "Sky Zone"
	},
	{
		instance: "Sip a tasty non-fat-one-pump-no-whip mocha while being smothered by a barrage of kitties.",
		value: "TOT cat cafe"
	},
	{
		instance: "Exist inside a gelatinous ectoplasm playing for Manchester United in the FA Cup Final.",
		value: "Bubble Soccer Toronto"
	},
	{
		instance: "Run through a post apocalyptic battle field equipped with a photon blaster.",
		value: "Laser Quest"
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

events.getInfo = function() {
	$.ajax({
		url: 'https://api.foursquare.com/v2/venues/search?',
		method: 'GET',
		dataType: 'json',
		data: {
			client_id: events.clientID,
			client_secret: events.clientSecret,
			v: events.version,
			near: 'toronto',
			query: 'laser quest'
		}
	}).then(function(data){
		console.log(data.response.venues);
	});
};

events.getInfo();