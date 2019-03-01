
function check(){
	var token = getToken();
	if(token == null)
	{
		console.log("Token was null");
		window.location.href="/";
	}
	else
	{
		$.post("/login",{"token":token})
	}
}

function getToken() {
	const token = localStorage.getItem('TRYSTAUCTION');
	if (typeof(token) === "undefined" || !token || token === '')
		return null;
	return token;
}
