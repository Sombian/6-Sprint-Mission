if (false)
{
	const device = Object.freeze({
		["Mobile@Min"]: 375, ["Mobile@Max"]: 744, ["Tablet@Min"]: 768, ["Tablet@Max"]: 1199, ["PC@Min"]: 1200, ["PC"]: 1920,
	});

	Object.defineProperty(Number.prototype, "clamp", {
		value(min, max)
		{
			return this < min ? min : max < this ? max : this;
		}
	});

	let index = Object.keys(device).length - 1;

	switch (window.opener)
	{
		case null:
		{
			window.open(window.location, "emulator", ["popup", `width=${device[Object.keys(device)[index]]}`].join(","));
			break;
		}
		default:
		{
			function emulate(value)
			{
				index = value.clamp(0, Object.keys(device).length - 1); window.resizeTo(device[Object.keys(device)[index]] + (window.outerWidth - window.innerWidth), window.outerHeight);
			}

			window.addEventListener("keydown", (event) =>
			{
				switch (event.key)
				{
					case "ArrowUp": case "ArrowRight":
					{
						emulate(index + 1);
						break;
					}
					case "ArrowDown": case "ArrowLeft":
					{
						emulate(index - 1);
						break;
					}
				}
			});
			break;
		}
	}
}
