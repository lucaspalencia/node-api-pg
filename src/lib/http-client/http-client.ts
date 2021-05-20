import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { injectable } from "inversify"
import { StatusCodes } from "http-status-codes"

import { Logger } from "#/lib/logger"
import { HttpClientResponse } from "#/lib/http-client/http-client-response"
import { HttpClientRequest } from "#/lib/http-client/http-client-request"

@injectable()
export class HttpClient {
  protected readonly axios: AxiosInstance

  private readonly logger = Logger.getLogger(HttpClient.name)

  private readonly maxContentLengthForLogging = 50000

  public constructor(public readonly url = "") {
    this.axios = axios.create({
      baseURL: url,
      validateStatus: this.isValidStatus.bind(this),
    })
    this.axios.interceptors.request.use(this.logRequest.bind(this), this.logError.bind(this))
    this.axios.interceptors.response.use(this.logResponse.bind(this), this.logError.bind(this))
  }

  public async request(request: HttpClientRequest): Promise<HttpClientResponse> {
    const response = await this.axios.request(request)

    return new HttpClientResponse(response.status, response.data)
  }

  protected isValidStatus(status: number): boolean {
    return status < StatusCodes.INTERNAL_SERVER_ERROR
  }

  private logRequest(request: AxiosRequestConfig): AxiosRequestConfig {
    const url = this.getFullUrlFromRequest(request)

    this.logger.info(`Request ${request.method?.toUpperCase()} ${url}`, {
      url,
      method: request.method,
      headers: request.headers,
      data: this.stringifyBody(request.data),
    })

    return request
  }

  private logResponse(response: AxiosResponse): AxiosResponse {
    const url = this.getFullUrlFromRequest(response.config)

    this.logger.info(`Response ${response.config.method?.toUpperCase()} ${url} ${response.status}`, {
      url,
      method: response.config.method,
      headers: response.headers,
      status: response.status,
      data: this.stringifyBody(response.data),
    })

    return response
  }

  private logError(error: AxiosError): void {
    const url = this.getFullUrlFromRequest(error.config)
    const message = `Error ${error.config.method?.toUpperCase()} ${url} ${error.response?.status} ${error.message}`

    this.logger.error(message, {
      url,
      message: error.message,
      method: error.config.method,
      headers: error.response?.headers,
      status: error.response?.status,
      data: this.stringifyBody(error.response?.data),
    })

    throw error
  }

  private getFullUrlFromRequest(request?: AxiosRequestConfig): string {
    const baseURL = request?.baseURL ?? ""
    const url = request?.url ?? ""
    const fullUrl = [baseURL.replace(/\/$/, ""), url.replace(/^\//, "")]

    return `${fullUrl[0]}/${fullUrl[1]}`
  }

  private stringifyBody(body: unknown): string {
    try {
      const stringifiedBody = JSON.stringify(body)

      if (stringifiedBody.length > this.maxContentLengthForLogging) {
        return "*too big to log*"
      }

      return stringifiedBody
    } catch (error: unknown) {
      return ""
    }
  }
}
