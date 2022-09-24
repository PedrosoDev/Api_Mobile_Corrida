/**
 * Error
 * @typedef {object} Error
 * @property {number} statusCode.required
 * @property {string} message.required
 */
export default class ResponseError extends Error {
  statusCode!: number;
  message!: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "ResponseError";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this.message, new.target.prototype);
  }
}
