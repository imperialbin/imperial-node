import type { Schema } from "./schemaValidator";

export const OptionsSchema = {
	editors: {
		message: "an Array of Strings",
		test: (value) => Array.isArray(value) && value.filter((element) => typeof element !== "string").length === 0,
	},
	longerUrls: {
		message: "a Boolean",
		test: (value) => typeof value === "boolean",
	},
	shortUrls: {
		message: "a Boolean",
		test: (value) => typeof value === "boolean",
	},
	instantDelete: {
		message: "a Boolean",
		test: (value) => typeof value === "boolean",
	},
	imageEmbed: {
		message: "a Boolean",
		test: (value) => typeof value === "boolean",
	},
	expiration: {
		message: "a Number",
		test: (value) => typeof value === "number",
	},
	encrypted: {
		message: "a Boolean",
		test: (value) => typeof value === "boolean",
	},
	password: {
		message: "a String",
		test: (value) => typeof value === "string",
	},
	language: {
		message: "a String",
		test: (value) => typeof value === "string",
	},
	public: {
		message: "a Boolean",
		test: (value) => typeof value === "boolean",
	},
} as Schema;
