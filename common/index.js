import "./plugins/index.js";

if (/\b(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(?::\d{1,5})?)\b/.test(window.location))
{
	const device = Object.freeze({
		["Mobile@Min"]: 375, ["Mobile@Max"]: 744, ["Tablet@Min"]: 768, ["Tablet@Max"]: 1199, ["PC@Min"]: 1200, ["PC@FHD"]: 1920,
	});

	let index = Object.keys(device).length - 1;

	switch (window.opener)
	{
		case null:
		{
			window.open(window.location, "simulation", ["popup", `width=${device[Object.keys(device)[index]]}`].join(","));
			break;
		}
		default:
		{
			function simulate()
			{
				window.resizeTo(device[Object.keys(device)[index]] + (window.outerWidth - window.innerWidth), window.outerHeight);
			}

			window.addEventListener("keydown", (event) =>
			{
				switch (event.key)
				{
					case "ArrowUp": case "ArrowRight":
					{
						index = (index + 1).clamp(0, Object.keys(device).length - 1);
						simulate();
						break;
					}
					case "ArrowDown": case "ArrowLeft":
					{
						index = (index - 1).clamp(0, Object.keys(device).length - 1);
						simulate();
						break;
					}
				}
			});
			break;
		}
	}
}
