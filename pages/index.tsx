import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { flbConnection, FlbConnection } from '../util/flb_connection'
import FluentBitData from '../components/FluentBitData'
import Terminal from '../components/Terminal'
import type { FluentBitOpts } from '../common/types'

type Datasource = FluentBitOpts['datasource']

function exampleCurlCommand(token: string) {
  return `curl -H 'Content-Type: application/json' -d '{"hello":"world!"}' ${window.location.href}flb/${token}`
}

function exampleFluentbitCommand(token: string) {
  const host = window.location.hostname;
  const port = window.location.port;
  const tls = window.location.protocol === 'https:' ? 'on' : 'off'
  return `fluent-bit -i cpu -o http -pformat=json -phost=${host} -pport=${port} -puri=/flb/${token} -ptls=${tls}`
}

const Home: NextPage = () => {
  const [datasource, setDatasource] = useState<Datasource>('http');
  const [connection, setConnection] = useState<FlbConnection>();
  const [token, setToken] = useState('')

  function changeDatasource(newValue: string) {
    if (newValue !== 'cpu' && newValue !== 'dummy' && newValue !== 'http') {
      console.warn('invalid datasource', newValue)
      return;
    }
    setDatasource(newValue);
  }

  useEffect(() => {
    const conn = flbConnection(datasource)
    setConnection(conn)
    conn.once('token-received', tok => {
      setToken(tok);
    })
    return () => {
      conn.close();
    }
  }, [datasource])

  return (
    <div id="main">
    {connection ? (
      <>
        <h2>Fluent-bit</h2>
        <div>
        <h4>data source:</h4>
        <div className="source">
          <select value={datasource} onChange={e => changeDatasource(e.target.value)}>
            <option value="cpu">CPU</option>
            <option value="dummy">Dummy</option>
            <option value="http">HTTP</option>
          </select>
        </div>
        {datasource === 'http' ? (
        <div className="samples">
          <div>Token: <pre>{token}</pre></div>
          <div>Example CURL command: <pre>{exampleCurlCommand(token)}</pre></div>
          <div>Example FluentBit command: <pre>{exampleFluentbitCommand(token)}</pre></div>
        </div>
        ) : <></>}
        </div>
        <div>
          <h3>stdout:</h3>
          <FluentBitData connection={connection} limit={100} />
        </div>
        <div>
          <h3>stderr:</h3>
          <Terminal connection={connection} />
        </div>
      </>
    ): null}
    </div>
  )
}

export default Home
