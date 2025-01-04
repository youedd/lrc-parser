
export class Tokenizer {
	pos: number;

	constructor(private readonly input: string) {
		this.pos = 0;
	}

	next() {
		if (this.eof()) {
			return null;
		}

		const char = this.input[this.pos];
		this.pos++;
		return char;
	}

	private eof(): boolean {
		return this.pos >= this.input.length;
	}
}
