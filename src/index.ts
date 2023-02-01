import * as authentication from './authentication';
import * as communications from './communications';
import * as media from './media';
import * as streaming from './streaming';

declare const __VERSION__: string;

const version: string = __VERSION__;

export { authentication, communications, media, streaming, version };
