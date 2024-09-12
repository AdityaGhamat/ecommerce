export function errorResponse(error: any, status: number) {
  return {
    success: false,
    status: status,
    message: error,
    data: {},
    error: error,
  };
}
