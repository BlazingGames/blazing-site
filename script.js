let itemGIFs = [
	'nether_star', 'speed_upgrade', 'netherite_upgrade', 'luck_upgrade_tier_1', 'luck_upgrade_tier_2', 'luck_upgrade_tier_3',
	'storage_upgrade_tier_1', 'storage_upgrade_tier_2', 'storage_upgrade_tier_3', 'storage_upgrade_tier_4', 'storage_upgrade_tier_5',
	'pattern_upgrade_1x2', 'pattern_upgrade_2x2', 'pattern_upgrade_3x3', 'experience_bottle', 'enchanting_table',
	'silk_touch_upgrade', 'flame_upgrade', 'chunkloader_upgrade', 'sweeping_upgrade_tier_1', 'sweeping_upgrade_tier_2', 
	'sweeping_upgrade_tier_3', 'compass', 'teleport_anchor', 'builder_wand'
];

let altTranslations = {
	"builder_wand": "Builder's Wand"
};

function onLoad() {
	const sections = document.getElementsByClassName("sectionbutton");

	for (const element of sections) 
	{
		element.addEventListener("click", function (event) {
			let target = event.currentTarget;
			console.log(target.id);
			let page = "../" + target.id;
			if(document.body.classList.contains("homepage"))
			{
				page = "./" + target.id;
			}
			window.location.assign(page);
		});
	}

	if(!document.body.classList.contains("homepage"))
	{
		let backButton = document.createElement("a");
		backButton.classList.add("back");
		backButton.href = "javascript:history.back()";
		backButton.innerHTML = "<i class='fas fa-arrow-left'>";

		document.body.appendChild(backButton);

		let homeButton = document.createElement("a");
		homeButton.classList.add("home");
		homeButton.href = "../index.html";
		homeButton.innerHTML = "<i class='fas fa-home'>";

		document.body.appendChild(homeButton);

		document.getElementById("siteheader").innerHTML = "<a href='../index.html'>BlazingSite</a>"
	}

	const items = document.querySelectorAll(".mcitem");

	for (const element of items) {
		loadMcItem(element);
	}

	const altarAvailability = document.querySelectorAll(".altarAvailability");

	for (const element of altarAvailability) {
		loadAltarAvailability(element);
	}

	const shapelessIcons = document.querySelectorAll(".recipe .shapeless");

	for (const element of shapelessIcons) {
		element.classList.add("tooltip");

		let tooltip = document.createElement('span');
		tooltip.classList.add('tooltiptext');
		tooltip.innerHTML = "Shapeless Recipe";

		element.addEventListener("mouseover", () => {
			let boundingRect = tooltip.getBoundingClientRect();

			let contentRect = document.body.getBoundingClientRect();

			let left = (boundingRect.left - contentRect.left);
			let right = (boundingRect.right - contentRect.left);

			if(left < 0) tooltip.style.transform = "translate(-50%, 0) translate(" + (-left) + "px, 0)";
			if(right > contentRect.width) tooltip.style.transform = "translate(-50%, 0) translate(" + (contentRect.width-right) + "px, 0)";
		});

		element.appendChild(tooltip);
	}

	const galleries = document.querySelectorAll(".recipegallery");

	for (const element of galleries) {
		loadGallery(element);
	}

	console.log("The page has finished loading!");
}

function loadMcItem(element)
{
	let itemId = null;
	let overrideTooltip = element.innerHTML;

	console.log(overrideTooltip);
	element.innerHTML = "";

	element.classList.forEach(className => {
		if(className != "mcitem")
		{
			itemId = className;
		}
	});

	if(itemId == null)
	{
		return;
	}

	element.classList.add("tooltip");

	let imageAlt = itemId;
	if(itemId in altTranslations) {
		imageAlt = altTranslations[itemId];
	}
	else {
		while(imageAlt.includes("_"))
		{
			imageAlt = imageAlt.replace("_", " ");
		}
		imageAlt = toTitleCase(imageAlt);

		let split = imageAlt.split(" ");

		for (let i = 0; i < split.length; i++) {
			let element = split[i];
			
			if(element.match(/^[1-9][0-9]*$/))
			{
				element = romanize(parseInt(element));
			}

			split[i] = element;
		}

		imageAlt = split.join(" ");
	}
	

	if(overrideTooltip.length > 0)
	{
		imageAlt = overrideTooltip;
	}

	let img = document.createElement('img');
	img.src = "../resources/"+ itemId + (itemGIFs.includes(itemId) ? ".gif" : ".png");
	img.alt = imageAlt;

	let tooltip = document.createElement('span');
	tooltip.classList.add('tooltiptext');
	tooltip.innerHTML = imageAlt;

	element.addEventListener("mouseover", () => {
		let boundingRect = tooltip.getBoundingClientRect();

		let contentRect = document.body.getBoundingClientRect();

		let left = (boundingRect.left - contentRect.left);
		let right = (boundingRect.right - contentRect.left);

		if(left < 0) tooltip.style.transform = "translate(-50%, 0) translate(" + (-left) + "px, 0)";
		if(right > contentRect.width) tooltip.style.transform = "translate(-50%, 0) translate(" + (contentRect.width-right) + "px, 0)";
	});

	element.appendChild(img);
	element.appendChild(tooltip);
}

function loadGallery(element)
{
	let controllers = document.createElement("div");

	controllers.classList.add("galleryControllers");

	let leftController = document.createElement("div");

	leftController.innerHTML = '<i class="fas fa-angle-left"></i>';

	leftController.classList.add("left");
	controllers.appendChild(leftController);

	let middleController = document.createElement("div");

	middleController.classList.add("middle");
	controllers.appendChild(middleController);

	let rightController = document.createElement("div");

	rightController.innerHTML = '<i class="fas fa-angle-right"></i>';

	rightController.classList.add("right");
	controllers.appendChild(rightController);

	let clearBoth = document.createElement("div");

	clearBoth.classList.add("clearBoth");
	controllers.appendChild(clearBoth);

	element.appendChild(controllers);

	let recipes = element.getElementsByClassName("recipe");
	console.log(recipes);

	element.getCurrentIndex = () => {
		let i = 0;
		for (const recipe of recipes) {
			if(recipe.classList.contains("gallerySelected"))
			{
				return i;
			}
			i++;
		}
		recipes[0].classList.add("gallerySelected");
		return 0;
	};

	element.moveGallery = (dir) => {
		let curIndex = element.getCurrentIndex();
		curIndex += dir;

		if(curIndex < 0) curIndex = recipes.length - 1;
		if(curIndex >= recipes.length) curIndex = 0;

		for(let i = 0; i < recipes.length; i++)
		{
			if(i == curIndex)
			{
				recipes[i].classList.add("gallerySelected");
			}
			else
			{
				recipes[i].classList.remove("gallerySelected");
			}
		}

		middleController.innerHTML = (curIndex+1) + "/" + recipes.length;
	}

	leftController.onclick = () => element.moveGallery(-1);
	rightController.onclick = () => element.moveGallery(1);

	element.moveGallery(0);
}

function toTitleCase(text)
{
	let result = "";

	let previousChar = " ";

	for(let i = 0; i < text.length; i++)
	{
		let char = text.charAt(i);
		if(previousChar == " ")
		{
			char = char.toUpperCase();
		}
		else
		{
			char = char.toLowerCase();
		}
		result += char;
		previousChar = char;
	}

	return result;
}

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

function loadAltarAvailability(element)
{
	let availability = element.innerHTML.split(",");
	element.innerHTML = "";

	let table = document.createElement("table");
	let altarTierRow = document.createElement("tr");
	altarTierRow.classList.add("altarTier");
	let altarTierD = document.createElement("td");
	altarTierD.innerHTML = "<a href='../altar_of_enchanting'>Altar Tier</a>";
	altarTierRow.appendChild(altarTierD);
	let maxLevelRow = document.createElement("tr");
	maxLevelRow.classList.add("maxLevel");
	let maxLevelD = document.createElement("td");
	maxLevelD.innerHTML = "Max. Available Level";
	maxLevelRow.appendChild(maxLevelD);

	let string = null;
	let amount = 0;

	let tier = 0;
	for (const level of availability)
	{
		tier++;
		let current = "";
		if(isNaN(+level))
		{
			current = level;
		}
		else if(+level > 0)
		{
			current = romanize(+level);
		}

		if(string == null) string = current;

		if(current == string) 
		{
			amount++;
		}
		else 
		{
			maxLevelRow.appendChild(getAltarLevelElement(string, amount));
			string = current;
			amount = 1;
		}

		let altarTierEl = document.createElement("td");
		altarTierEl.innerHTML = romanize(tier);

		altarTierRow.appendChild(altarTierEl);
	}
	let maxLevelEl = getAltarLevelElement(string, amount);

	if(amount >= availability.length && string == "")
	{
		maxLevelEl.innerHTML = "Treasure";
	}

	maxLevelRow.appendChild(maxLevelEl);

	table.appendChild(altarTierRow);
	table.appendChild(maxLevelRow);
	element.appendChild(table);
}

function getAltarLevelElement(string, amount)
{
	let maxLevelEl = document.createElement("td");

	maxLevelEl.classList.add(string == "" ? "notavailable" : "available");
	maxLevelEl.colSpan = amount;
	maxLevelEl.innerHTML = string;

	return maxLevelEl;
}

addEventListener("load", onLoad);