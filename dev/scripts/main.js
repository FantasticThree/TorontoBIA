var events = {};
events.clientID = 'LSYF2M1LMY4HXFFC3FAXQCP4DCWHRHUCIT2UTCFI03RF0ZG1';
events.clientSecret = 'MUHQ2Q5JOZDSVKIZWEQANDK2QA4PHCMCAEHW1QNBEIFHZFTK';
events.version = '20130815';

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
		// for (var key in data.response.venues){
			// if (data.response.venues[key].categories[0].name === 'Sports Bar') {
				console.log(data.response.venues);
			// }
		// }
	});
};

events.getInfo();