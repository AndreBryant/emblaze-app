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

		this.rimTop = new PIXI.Sprite(PIXI.Texture.WHITE);

		const rt = this.rimTop;
		rt.tint = rimColor;
		rt.x = 0;
		rt.y = cHeight - keyboardHeight - keyboardHeight * 0.02;
		rt.height = keyboardHeight * 0.02;
		rt.width = cWidth;
		rt.zIndex = 0;
		this.container.addChild(rt);

		this.rimBottom = new PIXI.Sprite(PIXI.Texture.WHITE);

		const rb = this.rimBottom;
		rb.tint = 0x000000;
		rb.x = 0;
		rb.y = cHeight - keyboardHeight;
		rb.height = keyboardHeight * 0.02;
		rb.width = cWidth;
		rb.zIndex = 0;
		this.container.addChild(rb);

		this.particleSystems = Array.from({ length: this.lastKey - this.startKey + 1 }, (_, i) => {
			const particleHeight = keyboardHeight * 0.5;
			const isBlack = this.#checkType(i + this.startKey);
			const wkWidth = cWidth / this.#countWhite(this.lastKey);
			const wkp = this.#countWhite(i + this.startKey);

			const ps = new PIXI.Sprite(PIXI.Texture.WHITE);

			ps.visible = true;

			ps.y = this.rimTop.y - particleHeight;
			ps.x = isBlack ? wkp * wkWidth - (wkWidth * 0.6) / 2 : (wkp - 1) * wkWidth;
			ps.zIndex = 1;

			ps.height = particleHeight;
			ps.width = isBlack ? wkWidth * 0.6 : wkWidth;

			ps.opacity = 0.5;

			return { sprite: ps, isPlaying: false };
		});

		for (const ps of this.particleSystems) {
			this.container.addChild(ps.sprite);
		}
	}

	reset() {
		this.particleSystems.forEach((ps) => {
			if (ps) {
				ps.sprite.visible = false;
				ps.isPlaying = false;
			}
		});
	}

	getContainer() {
		return this.container;
	}

	startParticle(keyIndex, track = 0) {
		const ps = this.particleSystems[keyIndex - this.startKey];
		ps.sprite.visible = true;
		ps.isPlaying = true;
	}

	stopParticle(keyIndex, track = 0) {
		const ps = this.particleSystems[keyIndex - this.startKey];
		ps.sprite.visible = false;
		ps.isPlaying = false;
	}

	#checkType(keyIndex) {
		return MOD_KEY_MAPPING[keyIndex % 12];
	}

	#countWhite(index) {
		let wkp = 0;
		for (let i = this.startKey; i <= index; i++) {
			wkp += Math.abs(this.#checkType(i) - 1);
		}
		return wkp;
	}
}
