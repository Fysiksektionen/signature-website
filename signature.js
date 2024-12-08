const URL = 'https://f.kth.se/signature';
async function getTemplate() {
	return fetch(URL + '/signature.html').then(function(response) {
		return response.text();
	}) .then(function (text) {
		return text;
	}).catch(function(err) {
		console.log('Could not fetch signature template.', err);
	});
}

async function getSignature(template) {
	var signatureFields = ['name', 'job', 'year', 'mail', 'phone'];

	const signature = template.replace(
		new RegExp("\\$" + signatureFields.join('|\\$'), 'gi'),
		(match) => document.getElementById(match.substring(1)).value
	);

	return signature;
}

async function writeSignature() {
	const template = await getTemplate();

	const signature = await getSignature(template);

	document.getElementById("preview").innerHTML = signature;
}

function copySignature() {
	htmlContent = document.getElementById("preview").innerHTML;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const item = new ClipboardItem({ 'text/html': blob });

  navigator.clipboard.write([item]).then(function () {
    console.log('HTML content copied to clipboard!');
  }).catch(function (err) {
    console.error('Error copying to clipboard:', err);
  });
}
