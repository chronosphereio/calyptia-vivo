import { useState, useEffect, useRef } from 'react'
import { ObjectInspector } from 'react-inspector';
import { FlbConnection,
         FlbStdoutEventData,
         FlbStdoutEventListener,
         FlbErrorEventListener } from '../../util/flb_connection'

import styles from './index.module.css'


export interface FluentBitDataProps {
  connection: FlbConnection
  limit: number
}

function reverseMap<T>(array: FlbStdoutEventData[], fn: (r: FlbStdoutEventData) => T) {
  const rv = []
  for (let i = array.length - 1; i >= 0; i--) {
    rv.push(fn(array[i]))
  }
  return rv;
}

function limitRecords(d: FlbStdoutEventData[], max: number): FlbStdoutEventData[] {
  const delta = d.length - max;
  if (delta > 0) {
    return d.slice(delta)
  }
  return d;
}

export default function FluentBitData({ limit, connection }: FluentBitDataProps) {
  const [records, setRecords] = useState([] as FlbStdoutEventData[]);

  useEffect(() => {
    const stdoutListener: FlbStdoutEventListener = (data) => {
      setRecords(r => limitRecords(r.concat(data), limit))
    };

    const errorListener: FlbErrorEventListener = (data) => {
      console.error('Failed to parse stdout JSON:', data.message)
      console.error('Raw payload:', data.raw)
    };

    connection.on('stdout', stdoutListener);
    connection.on('error', errorListener);

    return () => {
      connection.off('stdout', stdoutListener);
      connection.off('error', errorListener);
    }
  }, [connection, limit])

  return (
    <div className={styles.container}>
      {reverseMap(records, (r => (
        <ObjectInspector key={r.id} data={r.data}
        />
      )))}
    </div>
  )
}
