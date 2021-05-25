import { ConfigServiceInterface } from '../src/config';
import { Handler } from 'aws-lambda';
import { LambdaInterface } from '../src/lambda';
import { LogFormatterInterface } from '../src/formatter';
import { Environment, LogAttributes, LogAttributesWithMessage, LogLevel } from './Log';

type LoggerOptions = {
  logLevel?: LogLevel
  serviceName?: string
  sampleRateValue?: number
  logFormatter?: LogFormatterInterface
  customConfigService?: ConfigServiceInterface
  persistentLogAttributes?: LogAttributes
  environment?: Environment
};

type LambdaFunctionContext = {
  functionName: string
  memoryLimitInMB: number
  functionVersion: string
  coldStart: boolean
  invokedFunctionArn: string
  awsRequestId: string
};

type PowertoolLogData = LogAttributes & {
  environment?: Environment
  serviceName: string
  sampleRateValue?: number
  lambdaFunctionContext: LambdaFunctionContext
  xRayTraceId?: string
  awsRegion: string
};

type UnformattedAttributes = {
  environment?: Environment
  error?: Error
  serviceName: string
  sampleRateValue?: number
  lambdaContext?: LambdaFunctionContext
  xRayTraceId?: string
  awsRegion: string
  logLevel: LogLevel
  timestamp: Date
  message: string
};

type LogItemMessage = string | LogAttributesWithMessage;
type LogItemExtraInput = Array<Error | LogAttributes>;

type HandlerMethodDecorator = (target: LambdaInterface, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<Handler>) => TypedPropertyDescriptor<Handler> | void;

export {
  LogItemMessage,
  LogItemExtraInput,
  HandlerMethodDecorator,
  LambdaFunctionContext,
  UnformattedAttributes,
  PowertoolLogData,
  LoggerOptions
};