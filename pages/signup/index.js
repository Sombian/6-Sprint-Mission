import { santuary } from "/pages/login/index.js";

const [new_password, confirm_password] = [document.querySelector("#new-password"), document.querySelector("#confirm-password")];

new_password.addEventListener("input", (event) =>
{
	if (confirm_password.value.isNotEmpty)
	{
		confirm_password["validate"](event);
	}
});

confirm_password["validators"] = [
	(event) =>
	{
		if (event.target.value.isEmpty)
		{
			return event.target.placeholder;
		}
	},
	(event) =>
	{
		if (new_password["validity"] === "invalid")
		{
			return "비밀번호를 확인해 주세요.";
		}
	},
	(event) =>
	{
		if (new_password.value !== confirm_password.value)
		{
			return "비밀번호가 일치하지 않습니다.";
		}
	}
];

export { santuary };
