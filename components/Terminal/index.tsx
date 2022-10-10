import { useEffect, useRef } from 'react'
import type { Terminal as XtermJS } from 'xterm'
import { FlbConnection, FlbStderrEventListener } from '../../util/flb_connection'

import styles from './index.module.css'

export interface TerminalProps {
  connection: FlbConnection
}

export default function Terminal({ connection }: TerminalProps) {
  const domElement = useRef(null);

  useEffect(() => {
    let term: XtermJS

    const timer = setTimeout(async () => {
      if (!domElement.current) {
        console.error('xterm.js dynamically imported in "useEffect", but dom element is not mounted');
        return;
      }
      // Importing "xterm" in the server will cause problems, that's why we
      // need a dynamic import inside useEffect, which only runs in the
      // browser.

      // We do this inside a timer callback to prevent the Terminal instance
      // from being initialized twice due to react 18 strict mode:
      // https://github.com/vercel/next.js/issues/35822#issue-1189952475
      const { Terminal } = await import('xterm')
      term = new Terminal({ convertEol: true, cols: 120 })
      term.open(domElement.current)
    })

    const stderrListener: FlbStderrEventListener = (data) => {
      if (term) {
        term.write(data);
      } else {
        console.error('Received stderr data but terminal widget is not ready:', data);
      }
    }

    connection.on('stderr', stderrListener);

    return () => {
      clearTimeout(timer)
      if (term) {
        term.dispose();
      }
      connection.off('stderr', stderrListener);
    }
  }, [connection])

  return (<div className={styles.container} ref={domElement} />) 
}
