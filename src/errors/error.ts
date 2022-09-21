/**
 * Error
 * @typedef {object} Error
 * @property {number} statusCode.required
 * @property {string} message.required
 */
export default class Error {
    statusCode!: number;
    message!: string;
}