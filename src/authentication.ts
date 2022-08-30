import { sendPost } from './internal/httpHelpers';
import { AUTH_HOSTNAME } from './internal/urls';
import JwtToken from './types/jwtToken';

/**
 * Generates an API token.
 * To make any API call, you must acquire a JWT (JSON Web Token) format API token.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-api-token
 * @link https://docs.dolby.io/media-apis/reference/get-api-token
 *
 * @param appKey Your Dolby.io App Key.
 * @param appSecret Your Dolby.io App Secret.
 *
 * @returns A `JwtToken` object through a `Promise`.
 */
export const getApiAccessToken = async (appKey: string, appSecret: string, expiresIn: number | undefined): Promise<JwtToken> => {
    let body = 'grant_type=client_credentials';
    if (expiresIn) {
        body += `&expires_in=${expiresIn}`;
    }

    const authz = Buffer.from(`${appKey}:${appSecret}`).toString('base64');

    const options = {
        hostname: AUTH_HOSTNAME,
        path: '/v1/auth/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache',
            Authorization: `Basic ${authz}`,
        },
        body,
    };

    const response = await sendPost(options);
    return response as JwtToken;
};