async function userAuthorization(formData, url) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message);
	}

	const { token, ...userData } = data;
	localStorage.setItem('token', JSON.stringify(data.token));

	return userData;
}

async function userLogout() {
	const token = JSON.parse(localStorage.getItem('token'));
	const response = await fetch('/logout', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	if (response.ok) {
		['token', 'user'].forEach((key) => {
			localStorage.removeItem(key);
		});
		location.reload();
	}
}

export { userAuthorization, userLogout };
