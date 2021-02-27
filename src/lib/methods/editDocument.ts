import { request } from "https";
import type { Imperial } from "..";
import type { ImperialResponseEditDocument } from "../helpers/interfaces";
import parseId from "../utils/parseId";
import parseResponse from "../utils/parseResponse";
import prepareRequest from "../utils/prepareRequest";

export const editDocument = function (
	this: Imperial,
	id: string | URL,
	newText: string,
	callback?: (error: unknown, data?: ImperialResponseEditDocument) => void
): Promise<ImperialResponseEditDocument> | void {
	if (callback !== undefined && typeof callback !== "function") {
		// Throw an error if the data is not a string
		const err = new TypeError("Parameter `callback` must be callable!");
		if (!callback) return Promise.reject(err);
		throw err;
	}

	if (!this.token) {
		// Throw an error if the token was not set
		const err = new Error("This method requires a token to be set in the constructor!");
		if (!callback) return Promise.reject(err);
		return callback(err);
	}

	if (!id) {
		// Throw an error if the id was empty to not stress the servers
		const err = new Error("No `id` was provided!");
		if (!callback) return Promise.reject(err);
		return callback(err);
	}

	if (!newText) {
		// Throw an error if the id was empty to not stress the servers
		const err = new Error("No `newText` was provided!");
		if (!callback) return Promise.reject(err);
		return callback(err);
	}

	if (typeof id !== "string" && !(id instanceof URL)) {
		// Throw an error if the id is not in the correct type
		const err = new TypeError("Parameter `id` must be a string or an URL!");
		if (!callback) return Promise.reject(err);
		return callback(err);
	}

	if (typeof newText !== "string") {
		// Throw an error if the data is not a string
		const err = new TypeError("Parameter `newText` must be a string!");
		if (!callback) return Promise.reject(err);
		return callback(err);
	}

	const documentId = parseId(id, this.HOSTNAMEREGEX);

	if (!documentId) {
		// Throw an error if the data was empty to not stress the servers
		const err = new Error("No `id` was provided!");
		if (!callback) return Promise.reject(err);
		return callback(err);
	}

	const data = {
		document: documentId,
		newCode: newText,
	};

	const dataString = JSON.stringify(data);

	const opts = prepareRequest({
		method: "PATCH",
		path: `/document/`,
		hostname: this.HOSTNAME,
		token: this.token,
	});

	if (!callback)
		return new Promise((resolve, reject) => {
			const httpRequest = request(opts, (response) => {
				resolve(parseResponse(response));
			});
			httpRequest.on("error", reject);
			httpRequest.write(dataString);
			httpRequest.end();
		});

	const httpRequest = request(opts, (response) => {
		parseResponse(response).then((data) => callback(null, data), callback);
	});
	httpRequest.on("error", callback);
	httpRequest.write(dataString);
	httpRequest.end();
};
