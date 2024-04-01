import "/common/index.js";

const icons = Object.freeze({
	["text"]: "/assets/icons/visible.svg",
	["password"]: "/assets/icons/invisible.svg",
});

for (const element of document.querySelectorAll("form .field:has(input[type=\"password\"])"))
{
	const [img, input] = [document.createElement("img"), element.querySelector("input")];
	// apply src
	img.src = icons[input.type];

	img.addEventListener("click", (event) => {
		switch (input.type)
		{
			case "password":
			{
				input.type = "text";
				break;
			}
			case "text":
			{
				input.type = "password";
				break;
			}
			default:
			{
				throw new Error();
			}
		}
		// apply src
		img.src = icons[input.type];
	});
	// create
	element.querySelector(".wrapper").append(img);
}
