import "react";

declare module "react"
{
	interface HTMLAttributes<T>
	{
		class?: string; // please STFU, camel case hurt my eyes
	}
}
