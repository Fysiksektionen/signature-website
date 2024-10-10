const URL = 'http://0.0.0.0/signature';
async function getTemplate() {
	return fetch(URL + '/signature.html').then(function(response) {
		return response.text();
	}) .then(function (text) {
		return text;
	}).catch(function(err) {
		console.log('Could not fetch signature template.', err);
	});
}

async function getSignature() {
	const template = await getTemplate();

	var signatureFields = ['name', 'job', 'year', 'mail', 'phone'];

	const signature = template.replace(
		new RegExp("\\$" + signatureFields.join('|\\$'), 'gi'),
		(match) => document.getElementById(match.substring(1)).value
	);

	return signature;
}

async function writeSignature() {
	const signature = await getSignature();

	document.getElementById("preview").innerHTML = signature;

	cleanedSignature = signature.replace(/</g, "&lt").replace(/>/g, "&gt");

	document.getElementById("code").innerHTML = cleanedSignature;
}
