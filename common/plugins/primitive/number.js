const SCOPE = Number.prototype;

function clamp(min, max)
{
	return this < min ? min : max < this ? max : this;
}
/* method */
Object.defineProperty(SCOPE, clamp.name, { value: clamp });
