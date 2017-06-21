function autoParse(name){
	var name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	return results ? results[1] : "";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function runThis(c, d, base){
	var cookie = readCookie(c);
	var purl = autoParse('purl');
	var ifrm = document.createElement("IFRAME");
	ifrm.style.display = "none";

	if (purl && !cookie) {
		document.cookie = c + "=" + purl + "; domain=" + base + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
		ifrm.setAttribute("src", location.protocol + "//" + d + "/" + purl + "/tracker.html?source=init");
	} else if (cookie) {
		ifrm.setAttribute("src", location.protocol + "//" + d + "/" + cookie + "/tracker.html?source=tattoo");
	} else {
		return;
	}
	document.body.appendChild(ifrm);
}

function cbEndpoint(str){
	var referrer = autoParse('source'); //returns source from query string
	var callBack = "https://studio.afw.mdl.io/api/OutboundApp/AppCallbackForm?serviceTypeId=2019";
	var url = callBack + str;
	var d = new Date();
	var date = d.toISOString();
	var content;
	var xhttp = new XMLHttpRequest();

	if (referrer !== "init") {
		content = "eventid=201913&date="+date+"&eventoption="+referrer;
	} else {
		content = "eventid=201912&date="+date+"&eventoption=SetCookie";
	}

	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(content);
}

function setCK(purl, baseURL){
	ifrm = document.createElement("IFRAME");
	ifrm.setAttribute("src", baseURL + "?purl=" + purl);
	ifrm.style.display = "none";
	document.body.appendChild(ifrm);
}
