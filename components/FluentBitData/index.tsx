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

function limitRecords(d: FlbStdoutEventData[], max: number): FlbStdoutEventData[] {
  while (d.length > max) {
    d.shift();
  }
  return d;
}

export default function FluentBitData({ limit, connection }: FluentBitDataProps) {
  const domElement = useRef(null);

  const [records, setRecords] = useState([] as FlbStdoutEventData[]);

  useEffect(() => {
    if (!domElement.current) {
      return;
    }

    const el = domElement.current as Element;
    el.scrollTop = el.scrollHeight;
  }, [records]);

  useEffect(() => {
    const stdoutListener: FlbStdoutEventListener = (data) => {
      setRecords(r => limitRecords([...r, ...data], limit))
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
    <div ref={domElement} className={styles.container}>
      {records.map(r => (
        <ObjectInspector key={r.id} data={r.data}
        />
      ))}
    </div>
  )
}
