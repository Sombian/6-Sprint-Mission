import { validate, sanctuary } from "/pages/login/index.js";

const [new_password, confirm_password] = [document.querySelector("#new-password"), document.querySelector("#confirm-password")];

new_password.addEventListener("input", (event) =>
{
	if (confirm_password.value.isNotEmpty)
	{
		validate(confirm_password);
	}
});

confirm_password["validators"] = () => 
{
	return [
		(input) =>
		{
			if (input.value.isEmpty)
			{
				return input.placeholder;
			}
		},
		(input) =>
		{
			if (new_password["message"]())
			{
				return "비밀번호를 확인해 주세요.";
			}
		},
		(input) =>
		{
			if (new_password.value !== confirm_password.value)
			{
				return "비밀번호가 일치하지 않습니다.";
			}
		}
	];
};

export { sanctuary };
