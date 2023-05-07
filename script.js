if (!location.hash.startsWith("#")) {
	location.href = "#home";
}

function getPage() {
	let href = window.location.href.split("#");
	href = href[href.length - 1];
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.body.innerHTML = this.responseText;

			let sheets = document.querySelectorAll('link[rel="stylesheet"]');
			for (let sheet of sheets) sheet.parentNode.removeChild(sheet);

			let basic = document.createElement("link");
			basic.rel = "stylesheet";
			basic.href = "style.css";
			document.head.appendChild(basic);

			let custom = document.createElement("link");
			custom.rel = "stylesheet";
			custom.href = "style.css";
			custom.href = "./" + href + "/style.css";
			document.head.appendChild(custom);

			if (href == "home") {
				const sections = document.querySelectorAll(".section");

				sections.forEach(function (element) {
					element.addEventListener("click", function (event) {
						let target = event.target;
						if (target.nodeName != "DIV") {
							if (target.nodeName == "LI") {
								target = target.parentNode.parentNode;
							} else {
								target = target.parentNode;
							}
						}
						target = target.firstElementChild.textContent;
						target = target.replace(/[^A-z0-9 ]+/g, "");
						target = target.toLowerCase().replace(/ +/g, "_");
						history.pushState({ page: "#" + target }, target, "#" + target);
						getPage();
					});
				});
			} else {
				let custom = document.createElement("link");
				custom.rel = "stylesheet";
				custom.href = "style.css";
				custom.href =
					"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
				document.head.appendChild(custom);

				let backButton = document.createElement("a");
				backButton.classList.add("back");
				backButton.href = "javascript:history.back()";

				let icon = document.createElement("i");
				icon.className = "fas fa-redo";
                backButton.appendChild(icon);

				document.body.appendChild(backButton);
			}
		}
	};
	xhr.open("GET", "./" + href + "/index.html", true);
	xhr.send();
	console.log("The page has finished loading!");
}

window.onload = getPage();

window.addEventListener("popstate", function (event) {
	getPage();
});
