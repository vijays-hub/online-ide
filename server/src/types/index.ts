import { ALLOWED_LANGUAGES, REQUEST_STATUS } from "./enums";

type CodeExcerpt = {
  language: ALLOWED_LANGUAGES;
  excerpt: string;
};

type APIResponse = {
  status: REQUEST_STATUS;
  message: string;
  error?: unknown;
  data: unknown;
};

export type { CodeExcerpt, APIResponse };
