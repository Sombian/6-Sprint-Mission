import { useCallback, useEffect, useRef, useState } from "react";

export const enum Cause
{
	PATTERN,
	REQUIRED,
	MINLENGTH,
	MAXLENGTH,
}

export const enum Trigger
{
	BLUR,
	FOCUS,
	INPUT,
	SUBMIT,
}

export default function useForm(id: string, onSubmit: (data: FormData) => void, onCheck: (input: HTMLInputElement, values: Record<string, string>, causes: Set<Cause>) => Nullish<string>, triggers: Trigger[])
{
	const form = useRef<Nullable<HTMLFormElement>>(null);

	const [errors, set_errors] = useState<Record<string, string>>({});
	const [checks, set_checks] = useState<Record<string, boolean>>({});

	const [disabled, set_disabled] = useState(true);
	//
	// usseful macro 1st
	//
	const getValues = useCallback((form: HTMLFormElement) =>
	{
		const values: Record<string, string> = {};

		for (const [key, value] of new FormData(form).entries())
		{
			values[key] = typeof value === "string" ? value : "#FILE";
		}
		return values;
	},
	[]);
	//
	// useful macro 2nd
	//
	const getCauses = useCallback((input: HTMLInputElement) =>
	{
		const causes: Set<Cause> = new Set();
	
		if (input.required && input.value.length === 0)
		{
			causes.add(Cause.REQUIRED);
		}
		if (input.minLength && input.value.length < input.minLength)
		{
			causes.add(Cause.MINLENGTH);
		}
		if (0 < input.maxLength && input.maxLength < input.value.length)
		{
			causes.add(Cause.MAXLENGTH);
		}
		if (input.pattern && !new RegExp(input.pattern).test(input.value))
		{
			causes.add(Cause.PATTERN);
		}
		return causes;
	},
	[]);
	//
	// useful macro 3rd
	//
	const validate = useCallback((form: HTMLFormElement, input: HTMLInputElement) =>
	{
		// cache
		const message = onCheck(input, getValues(form), getCauses(input)) ?? "";

		set_errors((errors) =>
		{
			return errors[input.name] === message ? errors :  { ...errors, [input.name]: message };
		});
		set_checks((checks) =>
		{
			return checks[input.name] === !message ? checks : { ...checks, [input.name]: !message };
		});
		//
		// (QoL) :valid & :invalid selector
		//
		input.setCustomValidity(message);
	},
	[onCheck, getValues, getCauses]);

	useEffect(() =>
	{
		// buffer
		const _errors: typeof errors = {};
		// buffer
		const _checks: typeof checks = {};

		form.current = document.getElementById(id) as HTMLFormElement;

		for (const input of form.current.querySelectorAll<HTMLInputElement>("input[name]"))
		{
			_errors[input.name] = ""; _checks[input.name] = !input.required;
		}
		//
		// default value
		//
		set_errors(_errors);
		set_checks(_checks);
	},
	[id]);

	useEffect(() =>
	{
		if (form.current)
		{
			//
			// capture
			//
			const target = form.current;

			for (const trigger of new Set(triggers))
			{
				switch (trigger)
				{
					case Trigger.BLUR:
					{
						for (const input of target.querySelectorAll<HTMLInputElement>("input[name]"))
						{
							input.onblur = (event) => validate(target, input);
						}
						break;
					}
					case Trigger.FOCUS:
					{
						for (const input of target.querySelectorAll<HTMLInputElement>("input[name]"))
						{
							input.onfocus = (event) => validate(target, input);
						}
						break;
					}
					case Trigger.INPUT:
					{
						for (const input of target.querySelectorAll<HTMLInputElement>("input[name]"))
						{
							input.oninput = (event) => validate(target, input);
						}
						break;
					}
				}
			}

			target.onsubmit = (event) =>
			{
				//
				// conditional validate
				//
				if (triggers.includes(Trigger.SUBMIT))
				{
					for (const input of target.querySelectorAll<HTMLInputElement>("input[name]"))
					{
						validate(target, input);
					}
				}
				//
				// send form data
				//
				if (!disabled)
				{
					onSubmit(new FormData(target));
				}
				//
				// fuck you
				//
				event.preventDefault();
			};
		}
	},
	[form, disabled, validate, onSubmit, triggers]);

	useEffect(() =>
	{
		for (const check of Object.values(checks))
		{
			if (!check)
			{
				return set_disabled(true);
			}
		}
		return set_disabled(false);
	},
	[checks]);

	const verify = useCallback((name: string) =>
	{
		// @ts-ignore
		validate(form.current, form.current.elements[name] as HTMLInputElement);
	},
	[validate]);

	return { errors, verify, disabled };
}
