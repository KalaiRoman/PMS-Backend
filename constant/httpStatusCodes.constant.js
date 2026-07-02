const STATUS_CODES = [
  // Success
  {
    code: 200,
    key: "SUCCESS",
    message: "Request completed successfully."
  },
  {
    code: 201,
    key: "CREATED",
    message: "Resource created successfully."
  },
  {
    code: 202,
    key: "ACCEPTED",
    message: "Request accepted."
  },
  {
    code: 204,
    key: "NO_CONTENT",
    message: "No content available."
  },

  // Client Errors
  {
    code: 400,
    key: "BAD_REQUEST",
    message: "Invalid request."
  },
  {
    code: 401,
    key: "UNAUTHORIZED",
    message: "Authentication required."
  },
  {
    code: 403,
    key: "FORBIDDEN",
    message: "Access denied."
  },
  {
    code: 404,
    key: "NOT_FOUND",
    message: "Resource not found."
  },
  {
    code: 405,
    key: "METHOD_NOT_ALLOWED",
    message: "Method not allowed."
  },
  {
    code: 406,
    key: "NOT_ACCEPTABLE",
    message: "Request is not acceptable."
  },
  {
    code: 408,
    key: "REQUEST_TIMEOUT",
    message: "Request timeout."
  },
  {
    code: 409,
    key: "CONFLICT",
    message: "Resource already exists."
  },
  {
    code: 410,
    key: "GONE",
    message: "Resource no longer exists."
  },
  {
    code: 413,
    key: "PAYLOAD_TOO_LARGE",
    message: "Uploaded file is too large."
  },
  {
    code: 415,
    key: "UNSUPPORTED_MEDIA_TYPE",
    message: "Unsupported file format."
  },
  {
    code: 422,
    key: "VALIDATION_ERROR",
    message: "Validation failed."
  },
  {
    code: 429,
    key: "TOO_MANY_REQUESTS",
    message: "Too many requests."
  },

  // Server Errors
  {
    code: 500,
    key: "INTERNAL_SERVER_ERROR",
    message: "Internal server error."
  },
  {
    code: 501,
    key: "NOT_IMPLEMENTED",
    message: "Feature not implemented."
  },
  {
    code: 502,
    key: "BAD_GATEWAY",
    message: "Bad gateway."
  },
  {
    code: 503,
    key: "SERVICE_UNAVAILABLE",
    message: "Service temporarily unavailable."
  },
  {
    code: 504,
    key: "GATEWAY_TIMEOUT",
    message: "Gateway timeout."
  }
];

export default STATUS_CODES;
