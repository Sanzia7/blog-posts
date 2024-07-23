export const getRoles = () =>
	fetch('http://localhost:3007/roles').then((loadedRoles) => loadedRoles.json())
