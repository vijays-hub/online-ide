import { REQUEST_STATUS } from "types/enums";
import { APIResponse } from "../types";
import { v4 as uuid } from "uuid";

const getErrorResponse = (message: string, error: unknown = {}) =>
  ({
    status: REQUEST_STATUS.ERROR,
    data: null,
    message,
    error
  } as APIResponse);

const getSuccessResponse = ({ data, message }: Partial<APIResponse>) =>
  ({
    status: REQUEST_STATUS.SUCCESS,
    data,
    message,
  } as APIResponse);

const generateUniqueId = () => uuid();

export { getErrorResponse, getSuccessResponse, generateUniqueId };
