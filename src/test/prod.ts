/* Amazing tests done at 6 am */
/* eslint-disable */

import test from "tape";
// @ts-ignore
import tapDiff from "tap-diff";
import { readFileSync } from "fs";
import { Imperial } from "../lib";

test.createStream().pipe(tapDiff()).pipe(process.stdout);

const [apikey, documentUrl] = ((): string[] => {
	const path = `${__dirname}/../../test_data.txt`;
	let fileContent: null | string = null;
	try {
		fileContent = readFileSync(path, "utf-8").trim();
	} catch (err) {
		/* File not found */
	}

	if (!fileContent) return [];

	return fileContent.split(/\r?\n/);
})();

if (!apikey || !documentUrl) {
	console.log("> No token or valid documentUrl provided, aborting tests!");
	process.exit(0);
}

console.log(apikey, documentUrl);

test("verify - valid token", async (t) => {
	try {
		const client = new Imperial(apikey);
		const res = await client.verify();
		t.ok(res.success, "token should be valid");
		t.match(res.message, /\svalid!$/i, "message should say it's valid");
		t.end();
	} catch (e) {
		if (e && e.statusCode === 429) {
			t.fail(e.statusCodeText);
			t.end();
		} else {
			t.fail(e);
			t.end();
		}
	}
});

test("verify - invalid token", async (t) => {
	try {
		const client = new Imperial("blahblah" /* Ah yes the invalid token */);
		const res = await client.verify();
		t.notok(res.success, "token should not be valid");
		t.match(res.message, /\sinvalid!$/i, "message should say it's invalid");
		t.end();
	} catch (e) {
		if (e.message == "No or invalid token was provided in the constructor!") {
			t.pass(e.message);
			t.end();
		} else if (e && e.statusCode === 429) {
			t.fail(e.statusCodeText);
			t.end();
		} else {
			t.fail(e);
			t.end();
		}
	}
});

test("verify - no token", async (t) => {
	try {
		const client = new Imperial();
		await client.verify();
		t.fail("should have thrown an error");
		t.end();
	} catch (e) {
		if (e && e.message === "No or invalid token was provided in the constructor!") {
			t.pass(`Throws an error: "${e}"`);
			t.end();
		} else if (e && e.statusCode === 429) {
			t.fail(e.statusCodeText);
			t.end();
		} else {
			t.fail(e);
			t.end();
		}
	}
});

test("postCode - valid", async (t) => {
	try {
		const client = new Imperial(apikey);
		const res = await client.postCode("hi from test!", { instantDelete: true });
		t.ok(res.success, "request should be completed");
		t.strictEqual(res.instantDelete, true, "instantDelete should be set to true");
		t.end();
	} catch (e) {
		if (e && e.statusCode === 429) {
			t.fail(e.statusCodeText);
			t.end();
		} else {
			t.fail(e);
			t.end();
		}
	}
});

test("postCode - invalid", async (t) => {
	try {
		const client = new Imperial(apikey);
		// @ts-ignore
		await client.postCode();
		t.fail("should have thrown an error");
		t.end();
	} catch (e) {
		if (e && e.message === "No text was provided!") {
			t.pass(`Throws an error: "${e}"`);
			t.end();
		} else if (e && e.statusCode === 429) {
			t.fail(e.statusCodeText);
			t.end();
		} else {
			t.fail(e);
			t.end();
		}
	}
});

test("getCode - valid", async (t) => {
	try {
		const client = new Imperial(apikey);
		const res = await client.getCode(documentUrl); // new magic epic url
		t.ok(res.success, "request should be completed");
		t.strictEqual(typeof res.document, "string", "document should be type of string");
		t.end();
	} catch (e) {
		if (e && e.statusCode === 429) {
			t.fail(e.statusCodeText);
			t.end();
		} else {
			t.fail(e);
			t.end();
		}
	}
});

test("getCode - invalid", async (t) => {
	try {
		const client = new Imperial(apikey);
		// @ts-ignore
		await client.getCode();
		t.fail("should have thrown an error");
		t.end();
	} catch (e) {
		if (e && e.message === "No documentId was provided!") {
			t.pass(`Throws an error: "${e}"`);
			t.end();
		} else if (e && e.statusCode === 429) {
			t.fail(e.statusCodeText);
			t.end();
		} else {
			t.fail(e);
			t.end();
		}
	}
});
