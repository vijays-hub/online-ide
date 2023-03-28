import { REQUEST_STATUS } from "types/enums";
import { APIResponse } from "../types";

const getErrorResponse = (message: string) =>
  ({
    status: REQUEST_STATUS.ERROR,
    data: null,
    message,
  } as APIResponse);

const getSuccessResponse = ({ data, message }: Partial<APIResponse>) =>
  ({
    status: REQUEST_STATUS.SUCCESS,
    data,
    message,
  } as APIResponse);

export { getErrorResponse, getSuccessResponse };
