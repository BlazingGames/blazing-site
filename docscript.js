function docLoad() {
	let navBar = document.getElementById("navbar");
	
	let navBarTitle = document.createElement("div");
	navBarTitle.id = "navbartitle";
	navBarTitle.innerHTML = "<a href='#title'>"+document.getElementById("title").innerHTML+"</a>";
	navBar.appendChild(navBarTitle);

	let navBarList = document.createElement("ol");
	navBar.appendChild(navBarList);

	const sections = document.getElementById("description").getElementsByClassName("section");
	for (const section of sections) {
		let sectionTitle = section.getElementsByClassName("sectitle")[0].innerHTML;
		section.id = toCamelCase(sectionTitle);

		let navBarSection = document.createElement("li");
		navBarList.appendChild(navBarSection);

		let sectionTitleDiv = document.createElement("div");
		sectionTitleDiv.innerHTML = "<a href='#" + toCamelCase(sectionTitle) + "'>"+sectionTitle+"</a>";
		navBarSection.appendChild(sectionTitleDiv);

		let sectionList = document.createElement("ul");
		navBarSection.appendChild(sectionList);

		let unorderedFunctions = {};
		const functions = section.querySelectorAll(".function");
		for (const func of functions) {
			let funcTitle = func.getElementsByClassName("funtitle")[0].innerHTML;
			func.id = toCamelCase(funcTitle);

			const icons = func.querySelectorAll(".funicons > i");

			for (const element of icons) {
				loadDocIcon(element);
			}

			unorderedFunctions[funcTitle] = func;
			section.removeChild(func);
		}
		
		const orderedFunctions = Object.keys(unorderedFunctions).sort().reduce(
			(obj, key) => { 
			  obj.push(unorderedFunctions[key]); 
			  return obj;
			},
			[]
		);

		for (const func of orderedFunctions) {
			let funcTitle = func.getElementsByClassName("funtitle")[0].innerHTML;

			let sectionFunction = document.createElement("li");
			sectionList.appendChild(sectionFunction);

			let functionTitleDiv = document.createElement("div");
			functionTitleDiv.innerHTML = "<a href='#" + toCamelCase(funcTitle) + "'>"+funcTitle+"</a>";
			sectionFunction.appendChild(functionTitleDiv);

			section.appendChild(func);
		}
	}
}

function loadDocIcon(element)
{
	let img = document.createElement("img");
	
	console.log(element.classList);

	let tooltipText = "";

	if(element.classList.contains("normalTurtleOnly"))
	{
		img.src = "../resources/turtle.png";
		tooltipText = "Turtles Only";
	}
	else if(element.classList.contains("swordTurtleOnly"))
	{
		img.src = "../resources/sword_turtle.png";
		tooltipText = "Sword Turtles Only";
	}

	element.classList.add("tooltip");

	let tooltip = document.createElement('span');
	tooltip.classList.add('tooltiptext');
	tooltip.innerHTML = tooltipText;

	element.appendChild(img);
	element.appendChild(tooltip);
}

function toCamelCase(text)
{
	let result = "";
	let previousChar = "a";

	for (let i = 0; i < text.length; i++) {
		let char = text.charAt(i);
		
		if(previousChar == " ")
		{
			char = char.toUpperCase();
		}
		else
		{
			char = char.toLowerCase();
		}
		previousChar = char;
		if(char != " ")
		{
			result += char;
		}
	}

	return result;
}

addEventListener("load", docLoad);
hljs.highlightAll();