export const FLUENT_BIT_EXEC_PATH = process.env.FLUENT_BIT_EXEC_PATH || '/fluent-bit/bin/fluent-bit'
export const FLUENT_BIT_HTTP_HOST = process.env.FLUENT_BIT_HTTP_HOST || '127.0.0.1'
export const FLUENT_BIT_HTTP_PORT = (() => {
  let port = parseInt(process.env.FLUENT_BIT_HTTP_PORT || '8888')
  if (Number.isNaN(port) || port < 0 || port > 0xffff) {
    return 8888
  }
  return port
})()

