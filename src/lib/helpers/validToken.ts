const tokenRegex = /^IMPERIAL-[a-zA-Z\d]{8}(-[a-zA-Z\d]{4}){3}-[a-zA-Z\d]{12}$/;

/**
 *  Simple token validation function
 *  @param token The token to check
 *  @returns `true` if the token is valid and `false` if the token was invalid
 *  @internal
 */
export const validateToken = (token?: string): boolean => {
	if (typeof token !== "string") return false;
	return tokenRegex.test(token);
};