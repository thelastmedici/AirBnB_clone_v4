$('document').ready(function () {
	const url = "http://localhost:5001/api/v1/status/";
	$.get(url, function (data) {
		if (data.status === "OK") {
			$('DIV#api_status').addClass("available");
		}
		else {
			$('DIV#api_status').removeClass("available");
		}
	})
	const placeUrl = "http://localhost:5001/api/v1/places_search/";
	function placeSearch (filter) {
		$.ajax({
			url: placeUrl,
			type: 'POST',
			data: filter,
			contentType: 'application/json',
			dataType: 'json',
			success: function(data) {
				$('SECTION.places').append();
				for (const place of data ) {
					let guest;
					let room;
					let bathroom;
					if (place.max_guest <= 1) {
						guest = "Guest";
					}
					else { guest = "Guests"; }
					if (place.number_rooms <= 1) {
						room = "Bedroom";
					}
					else { room = "Bedrooms"; }
					if (place.number_bathrooms <= 1) {
						bathroom = "Bathroom";
					}
					else { bathroom = "Bathrooms"; }
					const placeHtml = `<article>
					<div class="title_box">
					<h2>${place.name}</h2>
					<div class="price_by_night">$${place.price_by_night}</div>
					</div>
					<div class="information">
					<div class="max_guest">${place.max_guest } ${guest}</div>
						<div class="number_rooms">${place.number_rooms} ${room}</div>
						<div class="number_bathrooms">${place.number_bathrooms} ${bathroom}</div>
					</div>
					<div class="description">
					${place.description}
					</div>
				</article>`;
					$('SECTION.places').append(placeHtml);
				}
		}});
	}
	placeSearch('{}');
	let check = [];
	let checkName = [];
	$('INPUT[type="checkbox"]').change(function () {
		if ($(this).is(":checked")) {
			check.push($(this).attr("data-id"));
            checkName.push($(this).attr("data-name"));
		}
		else {
			let index = check.indexOf($(this).attr("data-id"));
			check.splice(index, 1);
			index = checkName.indexOf($(this).attr("data-name"));
			checkName.splice(index, 1);
		}
		$('DIV.amenities H4').text(checkName.join(", "));
		});
	$('BUTTON').on('click', function () {
		$('SECTION ARTICLE').remove();
		placeSearch(JSON.stringify({"amenities": check}));
	})
});