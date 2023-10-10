
export type StreamKind = 'logs' | 'metrics' | 'traces'

export type IdRecord = LogEvent | MetricTraceEvent

interface Event {
  id: number
  rawEvent: string
  rawMetadata: string
}

export interface LogEvent extends Event {
  record: [[number, unknown], unknown]
}

export interface MetricTraceEvent extends Event {
  record: unknown
}

export interface LogStream {
  records: LogEvent[]
  kind: 'logs'
}

export interface MetricTraceStream {
  records: MetricTraceEvent[]
  kind: 'metrics' | 'traces'
}

export type Stream = LogStream | MetricTraceStream
