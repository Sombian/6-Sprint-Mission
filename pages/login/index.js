import {} from "/common/index.js";

const [status, button] = [new Map(), document.querySelector("form button")];

button.addEventListener("click", (event) =>
{
	if (!button.disabled)
	{
		location.href = button.dataset.href;
	}
	return false;
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

	while (status.has(UUID = crypto.randomUUID()))
	{
		continue;
	}
	//
	// add input validations
	//
	input.validators = [
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
	// default status
	status.set(UUID, null);
	
	function handler(event)
	{
		// disable
		button.disabled = true;

		for (const validator of input.validators)
		{
			status.set(UUID, validator(event));

			if (status.get(UUID) !== undefined)
			{
				// update error message
				field.dataset.error = status.get(UUID);
				return;
			}
		}
		// clear error message
		field.dataset.error = "";

		for (const error of status.values())
		{
			if (error !== undefined)
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
		if (0 < record.removedNodes.length && document.querySelectorAll("form .field input").length < status.size)
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
			value: Object.freeze(input.validators), writable: false, configurable: false,
		});
	}
}

export { santuary };
