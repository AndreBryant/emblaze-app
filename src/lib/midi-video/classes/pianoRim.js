import * as PIXI from 'pixi.js';

const MOD_KEY_MAPPING = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

export class PianoRim {
	constructor(rimColor = 0x550055, keyboardHeight, cHeight, cWidth, startKey, lastKey) {
		this.startKey = startKey;
		this.lastKey = lastKey;

		this.rimColor = rimColor;
		this.container = new PIXI.Container();
		this.container.sortableChildren = true;
		this.container.zIndex = 100;

		this.rim = new PIXI.Sprite(PIXI.Texture.WHITE);

		let rim = this.rim;
		rim.tint = rimColor;
		rim.x = 0;
		rim.y = cHeight - keyboardHeight;
		rim.height = keyboardHeight * 0.02;
		rim.width = cWidth;

		this.container.addChild(rim);
	}

	getContainer() {
		return this.container;
	}

	playParticle(keyIndex) {}

	#checkType(keyIndex) {
		return MOD_KEY_MAPPING[keyIndex % 12];
	}
}
