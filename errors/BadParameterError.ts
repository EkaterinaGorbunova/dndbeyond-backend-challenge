class BadParameterError extends Error {
  constructor(message: string = 'Wrong parameter') {
    super(message);
    this.name = 'BadParameterError';
  }
}
export default BadParameterError;
