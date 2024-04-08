import "./plugins/index.js";

if (/\b(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d{1,5})?)\b/.test(window.location))
{
	const viewport = {
		["Mobile@Min"]: 375, ["Mobile@Max"]: 768 - 1, ["Tablet@Min"]: 768, ["Tablet@Max"]: 1200 - 1, ["PC@Min"]: 1200, ["PC@FHD"]: 1920,
	};

	let index = Object.keys(viewport).length - 1;

	switch (window.opener)
	{
		case null:
		{
			window.open(window.location, "simulation", ["popup", `width=${viewport[Object.keys(viewport)[index]]}`].join(","));
			break;
		}
		default:
		{
			function simulate()
			{
				window.resizeTo(viewport[Object.keys(viewport)[index]] + (window.outerWidth - window.innerWidth), window.outerHeight);
			}

			window.addEventListener("keydown", (event) =>
			{
				switch (event.key)
				{
					case "ArrowRight":
					{
						index = (index + 1).clamp(0, Object.keys(viewport).length - 1);
						simulate();
						break;
					}
					case "ArrowLeft":
					{
						index = (index - 1).clamp(0, Object.keys(viewport).length - 1);
						simulate();
						break;
					}
				}
			});
			break;
		}
	}
}
