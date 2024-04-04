import {} from "/common/index.js";

const [state, button] = [new Map(), document.querySelector("form button")];

button.addEventListener("click", (event) =>
{
	for (const errors of state.values())
	{
		if (errors.filter((element, index, array) => typeof element === "string").isNotEmpty)
		{
			return;
		}
	}
	location.href = button.dataset.href;
});

for (const field of document.querySelectorAll("form .field"))
{
	const input = field.querySelector("input");
	//
	// add password visibility toggle button to input
	//
	if (input.type === "password")
	{
		const [img, srcs] = [document.createElement("img"),
		{
			text: "/assets/icons/visible.svg",
			password: "/assets/icons/invisible.svg",
		}];

		img.addEventListener("click", (event) =>
		{
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
			}
			// apply src
			img.src = srcs[input.type];
		});
		// apply src
		img.src = srcs[input.type];
		// insert toggle button
		field.querySelector(".wrapper").append(img);
	}
	//
	// UUID collision check
	//
	let UUID;

	while (state.has(UUID = crypto.randomUUID()))
	{
		continue;
	}
	//
	// add input validations
	//
	input["validators"] = [
		(event) =>
		{
			if (event.target.value.isEmpty)
			{
				return `${한글.을를(event.target.alt)} 입력해주세요.`;
			}
		},
		(event) =>
		{
			if (!new RegExp(input.pattern).test(input.value))
			{
				return `잘못된 ${event.target.alt} 형식입니다.`;
			}
		},
		(event) =>
		{
			if (event.target.hasAttribute("minlength") && event.target.value.length < event.target.minLength)
			{
				return `${한글.을를(event.target.alt)} ${event.target.minLength}자 이상 입력해주세요.`;
			}
		},
		(event) =>
		{
			if (event.target.hasAttribute("maxlength") && event.target.maxLength < event.target.value.length)
			{
				return `${한글.을를(event.target.alt)} ${event.target.minLength}자 이하 입력해주세요.`;
			}
		}
	];
	// default state
	state.set(UUID, new Array(input["validators"].length).fill("null"));
	
	function handler(event)
	{
		// disable
		button.disabled = true;

		for (const [index, validator] of Object.entries(input["validators"]))
		{
			if (state.get(UUID)[index] = validator(event))
			{
				// update error message
				return field.dataset["error"] = state.get(UUID)[index];
			}
		}
		// clear error message
		field.dataset["error"] = "null";

		for (const errors of state.values())
		{
			if (errors.filter((element, index, array) => typeof element === "string").isNotEmpty)
			{
				return;
			}
		}
		// enable
		button.disabled = false;
	}

	input.addEventListener("blur", handler);
	input.addEventListener("input", handler);
}
//
// [!] SECURITY BREACH
//
(new MutationObserver((records, observer) =>
{
	for (const record of records)
	{
		if (0 < record.removedNodes.length && document.querySelectorAll("form .field input").length < state.size)
		{
			window.location.reload();
		}
	}
})).observe(document.querySelector("form"), { subtree: true, childList: true });

function santuary()
{
	for (const input of document.querySelectorAll("form .field input"))
	{
		Object.defineProperty(input, "validators",
		{
			value: Object.freeze(input["validators"]), writable: false, configurable: false,
		});
	}
}

export { santuary };
