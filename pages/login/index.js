import "/common/index.js";

const images = {
	text: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAQlBMVEUAAABKVGJLVWNMU2RKU2NKVWJMVmRLVGNKVGNLVGNKVWJLVWNKVWJKVWJKVGFFUGBMVWNHVWBQVWVKVWVQUHBLVWNIljmgAAAAFXRSTlMAf+8fT9+AP4+/z6+fX08QbzAwMBBWUA9CAAAAo0lEQVQoz82OWQ7DMAhEDTbenaUt979qgcRKlQNUmY8n6yEPuL/mPQC2dLefiGyh6H99QGyLGL90pnH5yEVsyjnIrHO8PAgLU+W2OgdzksxnTFqpT+DjBqpKzEpAZSHli4PQG11gb9ztR1FKiRUqK507opUEeVphPHacZ6yNK3GZR85Jl+ol5yTLivqZQdyDFxsaauUVD8QWhNXdkjaAsbtH5AtjEQX9zVLj7wAAAABJRU5ErkJggg==",
	password: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAS1BMVEUAAABKVGJMVmRKVWNLVWNKVWNKU2JKVWJKVGJLU2RQWGhLVWNJVWFKVGJKVGNLVGNMVGRAUGBLVWJNVWVQUGBNVmRIVmFQUHBLVWP9UUI3AAAAGHRSTlMAf4CP76BP32AfIL8/z69vQBDvMBCPXxBZUncGAAAAv0lEQVQoz62R2xLDIAhEQRRjYm697v9/acXaadKZ9KHTfUD0DAwu9Ff13QHo4Ow4d8zzsiMB7u48qmLod8SfJk1ESQPg3kAAIVpEtLBQ8iYHDnAD4ohpJeIX6cB2QyZSz2T5XEEcLfram73lg19tTGiJCTCiSGQxl3iJQ62o5ForxrjasTyboEi81GGaF2zkMhnx9d1oI/ZfFRG4fkDY2BURtLA+Fg+UNkoc0ST0oTwz37I5erAF/kION5foFz0AeokJjxLpqXUAAAAASUVORK5CYII=",
};

for (const wrapper of document.querySelectorAll("form > .field > .wrapper:has(input[type=\"password\"])"))
{
	const [img, input] = [document.createElement("img"), wrapper.querySelector("input")];
	// apply src
	img.src = images[input.type];

	img.addEventListener("click", (event) => {
		switch (input.type)
		{
			case "password":
			{
				input.type = "text";
				break;
			}
			case "text":
			{
				input.type = "password";
				break;
			}
			default:
			{
				throw new Error();
			}
		}
		// apply src
		img.src = images[input.type];
	});
	// create
	wrapper.append(img);
}
