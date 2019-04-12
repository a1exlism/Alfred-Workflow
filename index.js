"use strict";
const alfy = require("alfy");

const token = require('./token');

// TODO: 添加对应颜色
const aqiDict = (aqi) => {
	if(aqi < 51)
		return 'Good';
	else if ( aqi < 101 )
		return 'Moderate';
	else if ( aqi < 151 )
		return 'Unhealthy for Sensitive Group';
	else if ( aqi < 200 )
		return 'Unhealthy';
	else if ( aqi < 301 )
		return 'Very Unhealthy';
	else
		return 'Hazardous';
};

//	http status match
const statusMatch = [{status: 'ok'}];

// WARNING INPUT: alfy.input
let query = 'http://api.waqi.info/feed/' + encodeURI(alfy.input)+ '/?token=' + token;

alfy.fetch(query).then(res => {
	let data = res.data;
	let APL = aqiDict(data.aqi);
	//	WARNING: items is Object Array
	const items = [{
		title: `${data.aqi}(${APL}) in ${data.city.name}`,
		subtitle: `Update at ${Date(data.time.v)}`,
		arg: data.city.url,
		icon: {
			// "type": "filetype", BETTER: not sure why
			"path": `icons/${APL}.png`
		}
		// icon: alfy.icon.get(APL)
	}];
	alfy.output(items);
});
/* alfy.output([
	{
		title: 'Unicorn',
		subtitle: alfy.input
	}
]);
 */
