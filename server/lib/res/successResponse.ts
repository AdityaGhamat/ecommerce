export function successResponse(message: string, data: {}, status: number) {
  return {
    success: true,
    status: status,
    message: message,
    data: data,
    error: {},
  };
}
