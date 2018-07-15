function fill_showcase(data) {
	var reference_content = document.querySelector("#onsite-reference .onsite-content");
	var reference_item = create_item(data.data.reference.item);
	reference_content.appendChild(reference_item);

	var showcase_items = document.querySelector("#onsite-items");
	data.data.recommendation.forEach((item) => {
		var recommendation_item = create_item(item);
		showcase_items.appendChild(recommendation_item);
	});

	var product_titles = document.querySelectorAll(".onsite-item-name");
	product_titles.forEach((p) => {
		var title_container_height = p.parentNode.clientHeight;
		while (p.offsetHeight > title_container_height) {
			p.textContent = p.textContent.replace(/\W*\s(\S)*(\s...)?$/, ' ...');
		}
	});

	document.querySelector("#onsite-left-btn").addEventListener("click", prevPage);
	document.querySelector("#onsite-right-btn").addEventListener("click", nextPage);
}

function create_item(item_data) {
	var item = document.createElement("a");
	item.href = "https:" + item_data.detailUrl;
	item.className = "onsite-item";

	var figure = document.createElement("figure");
	var item_img = document.createElement("img");
	item_img.src = "https:" + item_data.imageName;
	figure.appendChild(item_img);
	item.appendChild(figure);

	var text_section = document.createElement("section");
	var name_container = document.createElement("div");
	var item_name_paragraph = document.createElement("p");

	var item_name = document.createTextNode(item_data.name);

	item_name_paragraph.className = "onsite-item-name";
	name_container.className = "onsite-item-name-container";
	item_name_paragraph.appendChild(item_name);
	name_container.appendChild(item_name_paragraph);
	text_section.appendChild(name_container);

	var price_container = document.createElement("div");
	price_container.className = "onsite-price-container";

	if (item_data.oldPrice != null) {
		var item_oldprice_paragraph = document.createElement("p");
		item_oldprice_paragraph.className = "onsite-oldprice";
		var item_oldprice = document.createTextNode("De: " + item_data.oldPrice);
		item_oldprice_paragraph.appendChild(item_oldprice);
		text_section.appendChild(item_oldprice_paragraph);
	}

	var item_price_paragraph = document.createElement("p");
	item_price_paragraph.className = "onsite-price-text";
	var item_price_prefix = document.createTextNode("Por: ");
	item_price_paragraph.appendChild(item_price_prefix);
	var item_price_strong = document.createElement("strong");
	item_price_strong.className = "onsite-price";
	var item_price_text = document.createTextNode(item_data.price);
	item_price_strong.appendChild(item_price_text);
	item_price_paragraph.appendChild(item_price_strong);
	text_section.appendChild(item_price_paragraph);

	var price_conditions_paragraph = document.createElement("p");
	price_conditions_paragraph.className = "onsite-price-conditions";
	price_conditions_paragraph.innerHTML = item_data.productInfo.paymentConditions.replace(/(\d+)(\.)(\d+)/, "R$ $1,$3");
	text_section.appendChild(price_conditions_paragraph);

	var price_conditions_affix_paragraph = document.createElement("p");
	price_conditions_affix_paragraph.className = "onsite-price-conditions-affix";
	var conditions_affix_text = document.createTextNode("sem juros");
	price_conditions_affix_paragraph.appendChild(conditions_affix_text);
	text_section.appendChild(price_conditions_affix_paragraph);

	text_section.appendChild(price_container);
	item.appendChild(text_section);

	return item;
}

function nextPage() {
	document.querySelector("#onsite-left-btn").classList.remove("onsite-disabled");

	var showcase_items = document.querySelector("#onsite-items");
	var items = document.querySelectorAll("#onsite-items .onsite-item");
	var item_width = items[0].offsetWidth;

	var current_margin = parseFloat(showcase_items.style.marginLeft.replace("px", ""));
	if (isNaN(current_margin)) current_margin = 0;
	var new_margin = (current_margin - item_width);

	var items_shown = (showcase_items.offsetWidth + current_margin) / item_width;

	var margin_limit = (items.length - items_shown) * item_width * -1;

	if (new_margin < margin_limit) {
		new_margin = margin_limit;
		document.querySelector("#onsite-right-btn").classList.add("onsite-disabled");
	}

	showcase_items.style["margin-left"] = new_margin + "px";

	return false;
}

function prevPage() {
	document.querySelector("#onsite-right-btn").classList.remove("onsite-disabled");

	var showcase_items = document.querySelector("#onsite-items");
	var item_width = document.querySelector("#onsite-items .onsite-item").offsetWidth;

	var current_margin = parseFloat(showcase_items.style.marginLeft.replace("px", ""));
	if (isNaN(current_margin)) current_margin = 0;
	var new_margin = (current_margin + item_width);
	if (new_margin > 0) {
		new_margin = 0;
		document.querySelector("#onsite-left-btn").classList.add("onsite-disabled");
	}

	showcase_items.style["margin-left"] = new_margin + "px";

	return false;
}
