export const internalError = {
  status: 500,
  message: "Internal Error occurred",
};
export const statusCode = Object.freeze({
  Success: 200,
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  InternalError: 500,
  Failure: 300,
  Exists: 409,
  InvalidData: 422,
  SessionTimeout: 599,
  Timeout: 408,
  Created: 201,
  No_Content: 204,
});

export const userTypes = Object.freeze({
  ATHLETE: "Athlete",
  STAFF: "Staff",
});
