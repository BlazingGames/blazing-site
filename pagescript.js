let currentPage = null;
let maxPage = null;

function page(n)
{
	const pageN = document.querySelectorAll(".page"+n);

	if(pageN.length <= 0) {
		return;
	}

	if(currentPage != null) 
	{
		const pageC = document.querySelectorAll(".page"+currentPage);
		for(const handler of pageC)
		{
			handler.classList.add("hidden");
		}
	}

	currentPage = n;

	for(const handler of pageN)
	{
		handler.classList.remove("hidden");
	}

	let pageDown = document.getElementById("pageDown");
	let pageUp = document.getElementById("pageUp");

	if(currentPage < maxPage)
	{
		pageDown.classList.remove("hidden");
	}
	else
	{
		pageDown.classList.add("hidden");
	}

	if(currentPage > 1)
	{
		pageUp.classList.remove("hidden");
	}
	else
	{
		pageUp.classList.add("hidden");
	}
}

function loadPages(maxPages) 
{
	maxPage = maxPages;

	const description = document.getElementById("description");

	let pageDown = document.createElement("a");
	pageDown.classList.add("pageDown", "hidden");
	pageDown.id = "pageDown";
	pageDown.onclick = () => {
		if(currentPage == null) {
			page(1);
		}
		page(currentPage+1);
	};
	pageDown.innerHTML = "<i class='fas fa-arrow-down'>";

	let pageUp = document.createElement("a");
	pageUp.classList.add("pageUp", "hidden");
	pageUp.id = "pageUp";
	pageUp.onclick = () => {
		if(currentPage == null) {
			page(1);
		}
		page(currentPage-1);
	};
	pageUp.innerHTML = "<i class='fas fa-arrow-up'>";

	description.appendChild(pageDown);
	description.appendChild(pageUp);

	page(1);
}