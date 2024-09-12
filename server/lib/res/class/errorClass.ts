class CustomError extends Error {
  error: any;
  status: number;

  constructor(error: any, status: number) {
    super(error);
    this.error = error;
    this.status = status;
  }

  getErrorResponse() {
    return {
      success: false,
      status: this.status,
      message: this.error,
      data: {},
      error: this.error,
    };
  }
}

export default CustomError;
