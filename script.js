let itemGIFs = [
	'nether_star', 'speed_upgrade', 'netherite_upgrade', 'luck_upgrade_tier_1', 'luck_upgrade_tier_2', 'luck_upgrade_tier_3',
	'storage_upgrade_tier_1', 'storage_upgrade_tier_2', 'storage_upgrade_tier_3', 'storage_upgrade_tier_4', 'storage_upgrade_tier_5',
	'pattern_upgrade_1x2', 'pattern_upgrade_2x2', 'pattern_upgrade_3x3', 'experience_bottle', 'enchanting_table',
	'silk_touch_upgrade', 'flame_upgrade', 'chunkloader_upgrade', 'sweeping_upgrade_tier_1', 'sweeping_upgrade_tier_2', 
	'sweeping_upgrade_tier_3', 'compass', 'teleport_anchor', 'builder_wand', 'blueprint', 'sculk', 'any_wool', 'any_boat', 
	'nether_star_chunk', 'any_bed', 'magma_block', 'warped_stem'
];

let altTranslations = {
	"builder_wand": "Builder's Wand",
	"rabbit_foot": "Rabbit's Foot",
	"cod": "Raw Cod",
	"salmon": "Raw Salmon",
	"turtle_helmet": "Turtle Shell",
	"hay_block": "Hay Bale"
};

function onLoad() {
	const sections = document.getElementsByClassName("sectionbutton");

	for (const element of sections) 
	{
		element.addEventListener("click", function (event) {
			let target = event.currentTarget;
			let page = "../" + target.id + "/index.html";
			if(document.body.classList.contains("homepage"))
			{
				page = "./" + target.id + "/index.html";
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

		document.getElementById("siteheader").innerHTML = "<a href='../index.html'>BlazingSite</a>";
	}

	const enchantmentDetails = document.querySelectorAll(".enchantmentDetails");

	for (const element of enchantmentDetails) {
		loadEnchantmentDetails(element);
	}

	const items = document.querySelectorAll(".mcitem");

	for (const element of items) {
		loadMcItem(element);
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
	let stackSize = 1;
	let overrideTooltip = element.innerHTML;

	element.innerHTML = "";

	let stackSizeRegex = /^stack\d+$/;

	element.classList.forEach(className => {
		if(className == "mcitem")
		{
			return;
		}

		if(stackSizeRegex.test(className))
		{
			stackSize = parseInt(className.slice(5));
			return;
		}
		
		itemId = className;
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

	if(stackSize > 1)
	{
		imageAlt = stackSize + "x " + imageAlt;
	}

	let img = document.createElement('img');
	img.src = "../resources/"+ itemId + (itemGIFs.includes(itemId) ? ".gif" : ".png");
	img.alt = imageAlt;
	element.appendChild(img);

	if(stackSize > 1) 
	{
		let stackSizeElement = document.createElement('span');
		stackSizeElement.classList.add("stacksize");
		stackSizeElement.innerHTML = stackSize + "";
		element.appendChild(stackSizeElement);
	}

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

function loadEnchantmentDetails(element)
{
	let enchantmentLevels = [];

	for(const child of element.children) 
	{
		if(child.classList.contains("level")) 
		{
			enchantmentLevels.push(child.innerHTML.split(","));
		}
	}

	element.innerHTML = "";

	let table = document.createElement("table");

	let topRow = document.createElement("tr");
	topRow.classList.add("topRow");
	let levelD = document.createElement("td");
	levelD.innerHTML = "Level";
	topRow.appendChild(levelD);
	let minAltarTierD = document.createElement("td");
	minAltarTierD.innerHTML = "<a href='../altar_of_enchanting'>Altar Tier</a>";
	topRow.appendChild(minAltarTierD); 
	let expAmountD = document.createElement("td");
	expAmountD.innerHTML = "Required Levels";
	topRow.appendChild(expAmountD); 
	let lapisAmountD = document.createElement("td");
	lapisAmountD.innerHTML = "Amount of <i class='mcitem lapis_lazuli'></i>";
	topRow.appendChild(lapisAmountD); 
	let requiredItemD = document.createElement("td");
	requiredItemD.innerHTML = "Extra Material";
	topRow.appendChild(requiredItemD);
	table.appendChild(topRow);

	let currentEnchantmentLevel = null;
	let enchantmentLevelElement = null;

	let currentAltarTier = null;
	let altarTierElement = null;

	let currentExpAmount = null;
	let currentExpElement = null;

	let currentLapisAmount = null;
	let currentLapisElement = null;

	let currentItemId = null;
	let currentStack = null;
	let itemElement = null;

	let level = 0;
	for(const enchantmentLevel of enchantmentLevels)
	{
		level++;

		let levelRow = document.createElement("tr");

		// Enchantment Level
		let enchLevel = romanize(level);
		if(enchantmentLevel.length > 5)
		{
			enchLevel = enchantmentLevel[5];
		}

		if(enchLevel != currentEnchantmentLevel) 
		{
			enchantmentLevelElement = document.createElement("td");
			enchantmentLevelElement.rowSpan = 0;
			enchantmentLevelElement.innerHTML = enchLevel;
			levelRow.appendChild(enchantmentLevelElement);
		}
		currentEnchantmentLevel = enchLevel;
		enchantmentLevelElement.rowSpan++;

		// Min. Required Altar Tier
		let tier = enchantmentLevel[0];
		if(!isNaN(+tier) && +tier > 0) 
		{
			tier = romanize(+tier);
		}

		if(tier != currentAltarTier) 
		{
			altarTierElement = document.createElement("td");
			altarTierElement.rowSpan = 0;
			altarTierElement.innerHTML = tier;
			levelRow.appendChild(altarTierElement);
		}
		currentAltarTier = tier;
		altarTierElement.rowSpan++;

		// Required Levels
		let levels = enchantmentLevel[2];
		if(levels != currentExpAmount) 
		{
			currentExpElement = document.createElement("td");
			currentExpElement.rowSpan = 0;
			currentExpElement.innerHTML = levels;
			levelRow.appendChild(currentExpElement);
		}
		currentExpAmount = levels;
		currentExpElement.rowSpan++;

		// Required Lapis Amount
		let lapis = enchantmentLevel[1];
		if(lapis != currentLapisAmount) 
		{
			currentLapisElement = document.createElement("td");
			currentLapisElement.rowSpan = 0;
			currentLapisElement.innerHTML = lapis;
			levelRow.appendChild(currentLapisElement);
		}
		currentLapisAmount = lapis;
		currentLapisElement.rowSpan++;

		// Required Extra Material
		let stack = enchantmentLevel[3];
		let id = enchantmentLevel[4];
		if(currentItemId != id || currentStack != stack) 
		{
			let mcItem = document.createElement("i");
			mcItem.classList.add("mcitem", id, "stack"+stack)

			itemElement = document.createElement("td");
			itemElement.classList.add("extraMaterial");
			itemElement.rowSpan = 0;
			itemElement.appendChild(mcItem);
			levelRow.appendChild(itemElement);
		}
		currentStack = stack;
		currentItemId = id;
		itemElement.rowSpan++;

		table.appendChild(levelRow);
	}

	element.appendChild(table);
}

addEventListener("load", onLoad);