const SCOPE = String.prototype;

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
