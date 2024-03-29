const SCOPE = Array.prototype;

function skip(count)
{
	if (count <= 0)
	{
		return this;
	}
	else
	{
		return this.slice(count);
	}
}
/* method */
Object.defineProperty(SCOPE, skip.name, { value: skip });

function take(count)
{
	if (count <= 0)
	{
		return [];
	}
	else
	{
		return this.slice(0, count);
	}
}
/* method */
Object.defineProperty(SCOPE, take.name, { value: take });

function isEmpty()
{
	return this.length === 0;
}
/* property */
Object.defineProperty(SCOPE, isEmpty.name, { get: isEmpty });

function isNotEmpty()
{
	return this.length !== 0;
}
/* property */
Object.defineProperty(SCOPE, isNotEmpty.name, { get: isNotEmpty });
