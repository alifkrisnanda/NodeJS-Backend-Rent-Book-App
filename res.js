'use strict'

exports.ok = function(values, res) {
		var invalid;
	if ( values.length > 0 ){
		invalid = values

	} else {
		invalid = 'not found'
	}
	const data = {
		'status': 200,
		'values': invalid
	};
	res.json(data);
	res.end();
};                                             