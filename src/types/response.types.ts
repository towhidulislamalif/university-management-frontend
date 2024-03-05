// Import BaseQueryApi from @reduxjs/toolkit/query
import { BaseQueryApi } from '@reduxjs/toolkit/query';

export interface IResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: IError;
  meta?: IMeta;
}

interface IError {
  status: number;
  data: Error;
}

interface Error {
  success: boolean;
  message: string;
  errorSources: ErrorSource[];
  err: Record<string, unknown>;
  stack: string;
}

interface ErrorSource {
  path: string;
  message: string;
}

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export type ReduxRes<T> = IResponse<T> & BaseQueryApi;
