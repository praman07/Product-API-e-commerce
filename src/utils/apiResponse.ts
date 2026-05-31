class ApiResponse<T = null> {
  success: boolean;

  constructor(
    public message: string,
    public data: T | null = null,
  ) {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
