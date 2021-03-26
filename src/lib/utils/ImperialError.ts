import type { ImperialErrorInterface } from "../helpers/interfaces";

export class ImperialError extends Error {
	public status?: number;
	public path?: string;

	constructor(errorData?: ImperialErrorInterface) {
		super(errorData?.message);
		this.name = "ImperialError";
		this.status = errorData?.status;
		this.path = errorData?.path;
	}
}