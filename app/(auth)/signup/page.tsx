"use client";

import json from "./page.json";

import Link from "next/link";
import Image from "next/image";

import useForm, { Cause, Trigger } from "@/app/_hooks/useForm";

export default function Page()
{
	const signup = useForm("signup", [Trigger.BLUR, Trigger.CHANGE], (data) =>
	{
		console.log(data);
	});

	signup.block(({ input, key }) =>
	{
		return false;
	});

	signup.effect(({ input, trigger }) =>
	{
		switch (input.name)
		{
			case "비밀번호":
			{
				if (signup.values["비밀번호 확인"])
				{
					signup.notify("비밀번호 확인");
				}
				break;
			}
		}
	});

	signup.verify(({ input, trigger }) =>
	{
		const causes = signup.causes(input);

		switch (input.name)
		{
			case "비밀번호 확인":
			{
				if (signup.errors["비밀번호"])
				{
					return "비밀번호를 확인해주세요";
				}
				if (signup.values["비밀번호"] !== signup.values["비밀번호 확인"])
				{
					return "비밀번호가 일치하지 않습니다";
				}
				break;
			}
		}
		if (causes.has(Cause.REQUIRED))
		{
			return `${input.name}을(를) 입력해주세요`;
		}
		if (causes.has(Cause.PATTERN))
		{
			return `올바른 ${input.name}을(를) 입력해주세요`;
		}
		if (causes.has(Cause.MINLENGTH))
		{
			return `${input.name}을(를) ${input.minLength}자 이상 입력해주세요`;
		}
		if (causes.has(Cause.MAXLENGTH))
		{
			return `${input.name}을(를) ${input.maxLength}자 이하 입력해주세요`;
		}
		return null;
	});

	return (
		<>
			{/* form */}
			<form id="signup" class="flex flex-col">
				<div class="flex flex-col mobile:gap-[16px] tablet:gap-[16px] desktop:gap-[24px]">
				{json.map((args, index) =>
				(
					<div key={index} class="group flex flex-col mobile:gap-[8px] tablet:gap-[8px] desktop:gap-[16px]">
						<label for={args.id} class="text-[#1F2937] font-[700] mobile:text-[14px] tablet:text-[18px] desktop:text-[18px]">
						{
							args.id
						}
						</label>
						<div class="flex h-[56px] px-[24px] bg-[#F3F4F6] rounded-[12px] border group-has-[:valid]:border-[#3692FF] group-has-[.error]:border-[#F74747]">
							<input { ...args } name={args.id} class="grow text-[#1F2937] text-[16px] font-[400] outline-none bg-transparent placeholder:text-[#9CA3AF]"/>
							{
								args.type === "password" && <Image src="/icons/invisible.svg" alt="visibility" width={24} height={24} onClick={(event) =>
								{
									const input = document.getElementById(args.id) as HTMLInputElement;

									switch (input.type)
									{
										case "text":
										{
											input.type = "password";
											event.currentTarget.src = "/icons/invisible.svg";
											break;
										}
										case "password":
										{
											input.type = "text";
											event.currentTarget.src = "/icons/visible.svg";
											break;
										}
									}
								}}/>
							}
						</div>
						{
							signup.errors[args.id] && <div class="error text-[#F74747] text-[15px] font-[600] group-[:not(:has(:invalid))]:hidden">{signup.errors[args.id]}</div>
						}
					</div>
				))}
				</div>
				<button type="submit" disabled={signup.disabled} class="button h-[56px] rounded-[40px] text-[16px] font-[600] mobile:mt-[16px] tablet:mt-[24px] desktop:mt-[24px]">
					회원가입
				</button>
			</form>
			{/* 3rd-party */}
			<div class="flex items-center justify-between h-[74px] px-[24px] mt-[24px] rounded-[8px] text-[#1F2937] text-[16px] font-[500] bg-[#E6F2FF]">
				간편 로그인 하기
				<div class="flex gap-[16px]">
					<Image src="/icons/google.svg" alt="google" width={42} height={42}/>
					<Image src="/icons/kakaotalk.svg" alt="kakaotalk" width={42} height={42}/>
				</div>
			</div>
			{/* assistance */}
			<div class="mt-[24px] text-center text-[#1F2937] text-[15px] font-[500]">
				이미 회원이신가요? <Link href="/signin" class="text-[#3182F6] underline">로그인</Link>
			</div>
		</>
	);
}
