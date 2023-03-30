
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './App.css';

const TABS = {
  LOGS: 'logs',
  METRICS: 'metrics',
  TRACES: 'traces',
};

function App() {
  const [activeTab, setActiveTab] = useState(TABS.LOGS);
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [traces, setTraces] = useState([]);
  const [lastIds, setLastIds] = useState({
    logs: null,
    metrics: null,
    traces: null,
  });

  useEffect(() => {
    const fetchData = async (endpoint) => {
      try {
        const from = lastIds[endpoint] ? `?from=${lastIds[endpoint] + 1}` : '';
        const response = await axios.get(`http://127.0.0.1:2025/${endpoint}${from}`);
        const startId = parseInt(response.headers['vivo-stream-start-id']);
        const endId = parseInt(response.headers['vivo-stream-end-id']);

        setLastIds((prevLastIds) => ({ ...prevLastIds, [endpoint]: endId }));

        const dataLines = response.data.split('\n').filter((line) => line.trim() !== '');
        const parsedData = dataLines.map((line) => JSON.parse(line));

        switch (endpoint) {
          case TABS.LOGS:
            setLogs((prevLogs) => [ ...parsedData]);
            break;
          case TABS.METRICS:
            setMetrics((prevMetrics) => [...prevMetrics, ...parsedData]);
            break;
          case TABS.TRACES:
            setTraces((prevTraces) => [...prevTraces, ...parsedData]);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    const intervalIds = {
      logs: setInterval(() => fetchData(TABS.LOGS), 2000),
      metrics: setInterval(() => fetchData(TABS.METRICS), 2000),
      traces: setInterval(() => fetchData(TABS.TRACES), 2000),
    };

    return () => {
      clearInterval(intervalIds.logs);
      clearInterval(intervalIds.metrics);
      clearInterval(intervalIds.traces);
    };
  }, [lastIds]);

const renderData = (data, type) => {
  if (data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Metadata</th>
          <th>Event</th>
        </tr>
      </thead>
      <tbody>
        {data.slice().reverse().map((record, index) => {
          const timestamp = new Date(record[0][0] / 1000000).toLocaleString();
          const metadata = JSON.stringify(record[0][1]);
          const event = JSON.stringify(record[1]);

          return (
            <tr key={`${type}-${index}`}>
              <td>{timestamp}</td>
              <td>{metadata}</td>
              <td className="json-data">{event}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vivo!</h1>
        <nav>
          <button onClick={() => setActiveTab(TABS.LOGS)}>Logs</button>
          <button onClick={() => setActiveTab(TABS.METRICS)}>Metrics</button>
          <button onClick={() => setActiveTab(TABS.TRACES)}>Traces</button>
        </nav>
        {activeTab === TABS.LOGS && renderData(logs)}
        {activeTab === TABS.METRICS && renderData(metrics)}
        {activeTab === TABS.TRACES && renderData(traces)}
      </header>
    </div>
  );
}


export default App;

