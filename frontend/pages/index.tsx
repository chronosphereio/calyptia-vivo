import TabPanel from "@mui/lab/TabPanel"
import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import Tab from "@mui/material/Tab"
import type { NextPage } from 'next'
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { useEffect, useState } from 'react'
import { FluentBitLogs, FluentBitMetricTraces } from '../components/FluentBitData'
import useFluentBitStream, { StreamKind } from '../hooks/useFluentBitStream';

const Home: NextPage = () => {

  return (
    <Box my={4}>
      <Container>
        <Card elevation={0} sx={{ border: "1px solid rgba(63, 81, 181, 0.14)" }}>
          <CardContent sx={{ bgcolor: "white" }}>
            <Box>
              <Box my={2}>
                <Data />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Home

const VIVO_EXPORTER_URL = process.env.NEXT_VIVO_EXPORTER_URL ?? 'http://127.0.0.1:2025';
const VIVO_POLL_INTERVAL = parseInt(process.env.NEXT_VIVO_POLL_INTERVAL ?? '300');

function Data() {
  const [kind, setKind] = useState<StreamKind>('logs');
  const { records: logs, setActive: setLogsActive } = useFluentBitStream({
    vivoExporterUrl: VIVO_EXPORTER_URL,
    limit: 100,
    pollInterval: VIVO_POLL_INTERVAL,
    kind: 'logs'
  });

  const { records: metrics, setActive: setMetricsActive } = useFluentBitStream({
    vivoExporterUrl: VIVO_EXPORTER_URL,
    limit: 100,
    pollInterval: VIVO_POLL_INTERVAL,
    kind: 'metrics'
  });

  const { records: traces, setActive: setTracesActive } = useFluentBitStream({
    vivoExporterUrl: VIVO_EXPORTER_URL,
    limit: 100,
    pollInterval: VIVO_POLL_INTERVAL,
    kind: 'traces'
  });

  useEffect(() => {
    switch (kind) {
      case 'logs':
        setLogsActive(true);
        setMetricsActive(false);
        setTracesActive(false);
        break;
      case 'metrics':
        setLogsActive(false);
        setMetricsActive(true);
        setTracesActive(false);
        break;
      case 'traces':
        setLogsActive(false);
        setMetricsActive(false);
        setTracesActive(true);
        break;
    }
  }, [kind])


  return (
    <TabContext value={kind}>
      <Box display="grid" gridTemplateColumns="auto 1fr">
        <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
          <TabList orientation="vertical" onChange={(_, newVal) => {
            setKind(newVal)
          }}>
            <Tab label="Logs" value="logs" sx={{ whiteSpace: "nowrap" }} />
            <Tab label="Metrics" value="metrics" sx={{ whiteSpace: "nowrap" }} />
            <Tab label="Traces" value="traces" sx={{ whiteSpace: "nowrap" }} />
          </TabList>
        </Box>
        <TabPanel value="logs" sx={{ py: 0 }}>
          <Box>
            <FluentBitLogs records={logs} />
          </Box>
        </TabPanel>
        <TabPanel value="metrics" sx={{ py: 0 }}>
          <Box>
            <FluentBitMetricTraces records={metrics} />
          </Box>
        </TabPanel>
        <TabPanel value="traces" sx={{ py: 0 }}>
          <Box>
            <FluentBitMetricTraces records={traces} />
          </Box>
        </TabPanel>
      </Box>
    </TabContext >
  )
}

