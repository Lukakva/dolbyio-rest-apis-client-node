import { sendGet, sendDelete } from '../../internal/httpHelpers';
import { getAll } from '../internal/httpHelpers';
import * as Urls from '../../urls';
import JwtToken from '../../types/jwtToken';
import {
    GetRecordingsOptions,
    GetAllRecordingsOptions,
    GetRecordingsResponse,
    Recording,
    GetConferenceRecordingsOptions,
    GetAllConferenceRecordingsOptions,
    GetConferenceRecordingsResponse,
} from '../types/recordings';

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks only the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * This API returns presigned URLs for secure download of the recording files.
 * The URL returned in the response is an AWS S3 presigned URL with a validity of ten minutes.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns A {@link GetRecordingsResponse} object through a {@link Promise}.
 */
export const getRecordings = async (accessToken: JwtToken, options: GetRecordingsOptions): Promise<GetRecordingsResponse> => {
    const optionsDefault: GetRecordingsOptions = {
        from: 0,
        to: 9999999999999,
        max: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.max.toString(),
    };
    if (opts.start) params['start'] = opts.start;
    if (opts.region) params['region'] = opts.region;
    if (opts.type) params['type'] = opts.type;
    if (opts.mediaType) params['mediaType'] = opts.mediaType;

    const requestOptions = {
        hostname: Urls.getCommsHostname(),
        path: '/v2/monitor/recordings',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as GetRecordingsResponse;
};

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks only the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * This API returns presigned URLs for secure download of the recording files.
 * The URL returned in the response is an AWS S3 presigned URL with a validity of ten minutes.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns An array of {@link Recording} objects through a {@link Promise}.
 */
export const getAllRecordings = async (accessToken: JwtToken, options: GetAllRecordingsOptions): Promise<Array<Recording>> => {
    const optionsDefault: GetAllRecordingsOptions = {
        from: 0,
        to: 9999999999999,
        page_size: 100,
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.page_size.toString(),
    };
    if (opts.region) params['region'] = opts.region;
    if (opts.type) params['type'] = opts.type;
    if (opts.mediaType) params['mediaType'] = opts.mediaType;

    const requestOptions = {
        hostname: Urls.getCommsHostname(),
        path: '/v2/monitor/recordings',
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    return await getAll<Recording>(requestOptions, 'recordings');
};

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * This API returns presigned URLs for secure download of the recording files.
 * The URL returned in the response is an AWS S3 presigned URL with a validity of ten minutes.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-conference-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns A {@link GetConferenceRecordingsResponse} object through a {@link Promise}.
 */
export const getConferenceRecordings = async (accessToken: JwtToken, options: GetConferenceRecordingsOptions): Promise<GetConferenceRecordingsResponse> => {
    const optionsDefault: GetConferenceRecordingsOptions = {
        from: 0,
        to: 9999999999999,
        max: 100,
        confId: '',
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.max.toString(),
    };
    if (opts.start) params['start'] = opts.start;

    const requestOptions = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/monitor/conferences/${opts.confId}/recordings`,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    const response = await sendGet(requestOptions);
    return response as GetConferenceRecordingsResponse;
};

/**
 * Get a list of the recorded conference metadata, such as duration or size of the recording.
 * This API checks only the recordings that have ended during a specific time range.
 * Recordings are indexed based on the ending time.
 *
 * This API returns presigned URLs for secure download of the recording files.
 * The URL returned in the response is an AWS S3 presigned URL with a validity of ten minutes.
 *
 * @link https://docs.dolby.io/communications-apis/reference/get-conference-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param options Options to request the recordings.
 *
 * @returns An array of {@link Recording} objects through a {@link Promise}.
 */
export const getAllConferenceRecordings = async (accessToken: JwtToken, options: GetAllConferenceRecordingsOptions): Promise<Array<Recording>> => {
    const optionsDefault: GetAllConferenceRecordingsOptions = {
        from: 0,
        to: 9999999999999,
        page_size: 100,
        confId: '',
    };

    const opts = Object.assign(optionsDefault, options);

    const params = {
        from: opts.from.toString(),
        to: opts.to.toString(),
        max: opts.page_size.toString(),
    };

    const requestOptions = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/monitor/conferences/${opts.confId}/recordings`,
        params,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    return await getAll<Recording>(requestOptions, 'recordings');
};

/**
 * Deletes all recording data related to a specific conference, even data downloaded using the v1 Monitor API.
 *
 * **Warning**: After deleting the recording, it is not possible to restore the recording data.
 *
 * @link https://docs.dolby.io/communications-apis/reference/delete-conference-recordings
 *
 * @param accessToken Access token to use for authentication.
 * @param confId Identifier of the conference.
 */
export const deleteRecording = async (accessToken: JwtToken, confId: string): Promise<void> => {
    const requestOptions = {
        hostname: Urls.getCommsHostname(),
        path: `/v2/monitor/conferences/${confId}/recordings`,
        headers: {
            Accept: 'application/json',
            Authorization: `${accessToken.token_type} ${accessToken.access_token}`,
        },
    };

    await sendDelete(requestOptions);
};
