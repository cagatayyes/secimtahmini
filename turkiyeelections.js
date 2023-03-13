let HOVER_COLOR = "#EFAE88";
const MAP_COLOR = "#fff2e3";
const ERDOGAN_COLOR = "#ff8700";
const KILICDAROGLU_COLOR = "#ff2400";
const INCE_COLOR = "#0d5ea6";
const OGAN_COLOR = "#800000";
const OTHER_COLOR = "#09471a";
/* const HDP_COLOR = "#800080"; */

let cityCount = 0;
const totalCityCount = 81;
let selectedCities = [];

const CUMHURBASKANI = {
	ERDOGAN: { name: "RECEP TAYYİP ERDOĞAN", id: 0, cities: [] },
	INCE: { name: "MUHARREM İNCE", id: 1, cities: [] },
	KILICDAROGLU: { name: "KEMAL KILIÇDAROĞLU", id: 2, cities: [] },
	OGAN: { name: "SİNAN OĞAN", id: 3, cities: [] },
	DIGER: { name: "DİĞER/KARARSIZ", id: 4, cities: [] },
};

d3.json("./data/tr-cities.json").then(function (data) {
	let width = 1200;
	height = 450;
	let projection = d3.geoEqualEarth();
	projection.fitSize([width, height], data);
	let path = d3.geoPath().projection(projection);

	let svg = d3
		.select("#map_container")
		.append("svg")
		.attr("width", width)
		.attr("height", height);

	let g = svg
		.append("g")
		.selectAll("path")
		.data(data.features)
		.join("path")
		.attr("d", path)
		.attr("fill", MAP_COLOR)
		.attr("stroke", "#000")
		.on("mouseover", function (d, i) {
			if (window.selectedPresidentId >= 0) {
				if (!isCitySelected(d.properties.number)) {
					d3.select(this).attr("fill", HOVER_COLOR);
				}
			}
		})

		.on("mouseout", function (d, i) {
			if (!isCitySelected(d.properties.number)) {
				d3.select(this).attr("fill", MAP_COLOR);
			}
		})
		.on("click", function (d, i) {
			d.noFill = d.noFill || false;
			const selectedCityCode = d.properties.number;
			// ŞU AN CALISIYOR KODU SADELEŞTİR. TODO
			if (d.noFill) {
				// SEÇİLİ

				const selectedPartyColor = this.getAttribute("fill");

				switch (selectedPartyColor) {
					case ERDOGAN_COLOR:
						const erdoganIndex =
							CUMHURBASKANI.ERDOGAN.cities.indexOf(
								selectedCityCode
							);
						CUMHURBASKANI.ERDOGAN.cities.splice(erdoganIndex, 1);
						break;
					case KILICDAROGLU_COLOR:
						const kilicdarogluIndex =
							CUMHURBASKANI.KILICDAROGLU.cities.indexOf(
								selectedCityCode
							);
						CUMHURBASKANI.KILICDAROGLU.cities.splice(
							kilicdarogluIndex,
							1
						);
						break;
					case INCE_COLOR:
						const inceIndex =
							CUMHURBASKANI.INCE.cities.indexOf(selectedCityCode);
						CUMHURBASKANI.INCE.cities.splice(inceIndex, 1);
						break;
					case OGAN_COLOR:
						const oganIndex =
							CUMHURBASKANI.OGAN.cities.indexOf(selectedCityCode);
						CUMHURBASKANI.OGAN.cities.splice(oganIndex, 1);
						break;
					case OTHER_COLOR:
						const otherIndex =
							CUMHURBASKANI.DIGER.cities.indexOf(
								selectedCityCode
							);
						CUMHURBASKANI.DIGER.cities.splice(otherIndex, 1);
						break;
					default:
						break;
				}
			}

			if (window.selectedPresidentId >= 0) {
				switch (window.selectedPresidentId) {
					case 0:
						const erdoganIndex =
							CUMHURBASKANI.ERDOGAN.cities.indexOf(
								selectedCityCode
							);

						if (erdoganIndex >= 0) {
							CUMHURBASKANI.ERDOGAN.cities.splice(
								erdoganIndex,
								1
							);
							d3.select(this).attr("fill", MAP_COLOR);

							break;
						} else {
							CUMHURBASKANI.ERDOGAN.cities.push(selectedCityCode);
							d3.select(this).attr("fill", HOVER_COLOR);

							break;
						}
					case 1:
						const inceIndex =
							CUMHURBASKANI.INCE.cities.indexOf(selectedCityCode);
						if (inceIndex >= 0) {
							CUMHURBASKANI.INCE.cities.splice(
								inceIndex,
								1
							);
							d3.select(this).attr("fill", MAP_COLOR);

							break;
						} else {
							CUMHURBASKANI.INCE.cities.push(selectedCityCode);
							d3.select(this).attr("fill", HOVER_COLOR);

							break;
						}
					case 2:
						const kilicdarogluIndex =
							CUMHURBASKANI.KILICDAROGLU.cities.indexOf(
								selectedCityCode
							);
						if (kilicdarogluIndex >= 0) {
							CUMHURBASKANI.KILICDAROGLU.cities.splice(
								kilicdarogluIndex,
								1
							);
							d3.select(this).attr("fill", MAP_COLOR);

							break;
						} else {
							CUMHURBASKANI.KILICDAROGLU.cities.push(
								selectedCityCode
							);
							d3.select(this).attr("fill", HOVER_COLOR);

							break;
						}
					case 3:
						const oganIndex =
							CUMHURBASKANI.OGAN.cities.indexOf(selectedCityCode);
						if (oganIndex >= 0) {
							CUMHURBASKANI.OGAN.cities.splice(
								oganIndex,
								1
							);
							d3.select(this).attr("fill", MAP_COLOR);

							break;
						} else {
							CUMHURBASKANI.OGAN.cities.push(selectedCityCode);

							d3.select(this).attr("fill", HOVER_COLOR);

							break;
						}
					case 4:
						const otherIndex =
							CUMHURBASKANI.DIGER.cities.indexOf(
								selectedCityCode
							);
						if (otherIndex >= 0) {
							CUMHURBASKANI.DIGER.cities.splice(
								otherIndex,
								1
							);
							d3.select(this).attr("fill", MAP_COLOR);

							break;
						} else {
							CUMHURBASKANI.DIGER.cities.push(selectedCityCode);
							d3.select(this).attr("fill", HOVER_COLOR);

							break;
						}
					default:
						break;
				}
				if (!isCitySelected(selectedCityCode)) {
					selectedCities.push(selectedCityCode);

					document.getElementById("selected-cities").innerHTML =
						"Seçilen İl: " +
						selectedCities.length +
						"/" +
						totalCityCount;
				}

				if (selectedCities.length > 0) {
					document.getElementById("selected-cities").style.display =
						"none";

					document.getElementById("won-city-count").style.display =
						"flex";

					document.getElementById(
						"erdogan-won-city-count"
					).innerHTML = CUMHURBASKANI.ERDOGAN.cities.length;

					document.getElementById(
						"kilicdaroglu-won-city-count"
					).innerHTML = CUMHURBASKANI.KILICDAROGLU.cities.length;

					document.getElementById("ince-won-city-count").innerHTML =
						CUMHURBASKANI.INCE.cities.length;

					document.getElementById("ogan-won-city-count").innerHTML =
						CUMHURBASKANI.OGAN.cities.length;

					document.getElementById("others-won-city-count").innerHTML =
						CUMHURBASKANI.DIGER.cities.length;
				}
			}

			d.noFill = !d.noFill;
		});

	g = svg.append("g");

	g.selectAll("text")
		.data(data.features)
		.enter()
		.append("text")
		.text(function (d) {
			return d.properties.name;
		})
		.attr("x", function (d) {
			return path.centroid(d)[0];
		})
		.attr("y", function (d) {
			return path.centroid(d)[1];
		})
		.attr("text-anchor", "middle")
		.attr("font-size", "9pt")
		.attr("style", "color: black;")
		.attr("style", "pointer-events: none;");
});

function downloadMap() {
	let div = document.getElementById("map_container");
	html2canvas(div).then(function (canvas) {
		var destCanvas = document.createElement("canvas");
		destCanvas.width = canvas.width;
		destCanvas.height = canvas.height;
		var destCtx = destCanvas.getContext("2d");
		destCtx.drawImage(canvas, 0, 0);

		const ctx = destCanvas.getContext("2d");
		ctx.textBaseline = "top";
		ctx.font = "24px Calibri";
		ctx.fillStyle = "black";
		ctx.textAlign = "start";
		var textWidth = ctx.measureText(
			"cagatayyes.github.io/turkey-elections"
		);
		ctx.fillText(
			"cagatayyes.github.io/turkiye-elections",
			canvas.width - 370,
			5
		);
		/* ctx.fillText("Türkiye Cumhuriyeti 13. Cumhurbaşkanı", 10, canvas.height - 35); */

		destCanvas.toBlob(function (blob) {
			saveAs(blob, "secimSonuclari2023.png");
		});
	});
}

function selectPresident(president) {
	window.selectedPresident = president;
	window.selectedPresidentId = CUMHURBASKANI[president].id;

	switch (window.selectedPresidentId) {
		case 0:
			HOVER_COLOR = ERDOGAN_COLOR;
			break;
		case 1:
			HOVER_COLOR = INCE_COLOR;
			break;
		case 2:
			HOVER_COLOR = KILICDAROGLU_COLOR;
			break;
		case 3:
			HOVER_COLOR = OGAN_COLOR;
			break;
		case 4:
			HOVER_COLOR = OTHER_COLOR;
			break;
		default:
			break;
	}

	document.getElementById("selected-president").innerHTML =
		"Seçilen Aday: " + CUMHURBASKANI[president].name;
}

function isCitySelected(city) {
	const index = selectedCities.indexOf(city);

	return index >= 0;
}
