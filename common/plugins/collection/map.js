const SCOPE = Map.prototype;

function isEmpty()
{
	return this.size === 0;
}
/* property */
Object.defineProperty(SCOPE, isEmpty.name, { get: isEmpty });

function isNotEmpty()
{
	return this.size !== 0;
}
/* property */
Object.defineProperty(SCOPE, isNotEmpty.name, { get: isNotEmpty });
