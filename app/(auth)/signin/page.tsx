"use client";

import json from "./page.json";

import Link from "next/link";
import Image from "next/image";

import useForm, { Cause, Trigger } from "@/app/_hooks/useForm";

export default function Page()
{
	const { errors, verify, disabled } = useForm("signin",
	// onSubmit
	(data) =>
	{
		console.log(data);
	},
	// onCheck
	(input, values, causes) =>
	{
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
	},
	// triggers
	[Trigger.BLUR, Trigger.INPUT]);
	
	return (
		<>
			{/* form */}
			<form id="signin" class="flex flex-col">
				<div class="flex flex-col mobile:gap-[16px] tablet:gap-[16px] desktop:gap-[24px]">
				{json.map((args, index) =>
				(
					<div key={index} class="group flex flex-col mobile:gap-[8px] tablet:gap-[8px] desktop:gap-[16px]">
						<label htmlFor={args.id} class="text-[#1F2937] font-[700] mobile:text-[14px] tablet:text-[18px] desktop:text-[18px]">
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
							errors[args.id] && <div class="error text-[#F74747] text-[15px] font-[600] group-[:not(:has(:invalid))]:hidden">{errors[args.id]}</div>
						}
					</div>
				))}
				</div>
				<button type="submit" disabled={disabled} class="button h-[56px] rounded-[40px] text-[16px] font-[600] mobile:mt-[16px] tablet:mt-[24px] desktop:mt-[24px]">
					로그인
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
				판다마켓이 처음이신가요? <Link href="/signup" class="text-[#3182F6] underline">회원가입</Link>
			</div>
		</>
	);
}
