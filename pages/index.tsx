import TabContext from "@mui/lab/TabContext"
import TabList from "@mui/lab/TabList"
import TabPanel from "@mui/lab/TabPanel"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Container from "@mui/material/Container"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Tab from "@mui/material/Tab"
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import type { FluentBitOpts } from '../common/types'
import FluentBitData from "../components/FluentBitData"
import Terminal from "../components/Terminal"
import { flbConnection, FlbConnection } from '../util/flb_connection'

type Datasource = FluentBitOpts['datasource']

function exampleCurlCommand(token: string) {
  return `curl -H 'Content-Type: application/json' -d '{"hello":"world!"}' ${window.location.href}flb/${token}`
}

function exampleFluentbitForwardCommand() {
  const host = window.location.hostname
  return `fluent-bit -i cpu -o forward -phost=${host}`
}

function exampleFluentbitCommand(token: string) {
  const host = window.location.hostname
  const port = window.location.port
  const tls = window.location.protocol === 'https:' ? 'on' : 'off'
  return `fluent-bit -i cpu -o http -pformat=json -phost=${host} -pport=${port} -puri=/flb/${token} -ptls=${tls}`
}

const Home: NextPage = () => {
  const [datasource, setDatasource] = useState<Datasource>('http')
  const [connection, setConnection] = useState<FlbConnection | null>(null)
  const [token, setToken] = useState('')

  useEffect(() => {
    const conn = flbConnection(datasource)
    setConnection(conn)
    conn.once('token-received', tok => {
      setToken(tok)
    })
    return () => {
      conn.close()
    }
  }, [datasource])

  if (connection === null) {
    return null
  }

  return (
    <Box my={4}>
      <Container>
        <Card elevation={0} sx={{ border: "1px solid rgba(63, 81, 181, 0.14)" }}>
          <CardHeader
            title="Vivo: Live Data Viewer"
            subheader="All your events in only one space"
            action={<DataSourceSelector dataSource={datasource} onChange={setDatasource} />}
            sx={{ bgcolor: "rgba(63, 81, 181, 0.08)" }}
            titleTypographyProps={{ color: "#0D3D61", fontSize: "20px", fontWeight: 700 }}
            subheaderTypographyProps={{ color: "#0D3D61B3", fontSize: "14px", mt: 1 }} />
          <CardContent sx={{ bgcolor: "white" }}>
            <Box>
              {datasource === "http" && token !== "" && (
                <Box p={2}>
                  <details>
                    <summary>
                      <Typography variant="h6" sx={{ display: "inline", paddingLeft: ".5rem" }}>Instructions</Typography>
                    </summary>
                    <Typography variant="caption" color="GrayText">Token</Typography>
                    <pre style={{ marginTop: 0, marginBottom: ".5rem", overflowX: "auto" }}>{token}</pre>

                    <Typography variant="caption" color="GrayText">Example CURL command</Typography>
                    <pre style={{ marginTop: 0, marginBottom: ".5rem", overflowX: "auto" }}>{exampleCurlCommand(token)}</pre>

                    <Typography variant="caption" color="GrayText">Example FluentBit command</Typography>
                    <pre style={{ marginTop: 0, marginBottom: 0, overflowX: "auto" }}>{exampleFluentbitCommand(token)}</pre>
                  </details>
                </Box>
              )}

              {datasource === "forward" && (
                <Box p={2}>
                  <details>
                    <summary>
                      <Typography variant="h6" sx={{ display: "inline", paddingLeft: ".5rem" }}>Instructions</Typography>
                    </summary>
                    <Typography variant="caption" color="GrayText">Example FluentBit command</Typography>
                    <pre style={{ marginTop: 0, marginBottom: 0, overflowX: "auto" }}>{exampleFluentbitForwardCommand()}</pre>
                  </details>
                </Box>
              )}

              <Box my={2}>
                <Data connection={connection} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Home

type DataProps = {
  connection: FlbConnection
}

function Data(props: DataProps) {
  const [value, setValue] = useState<"stdout" | "stderr">('stdout')

  return (
    <TabContext value={value}>
      <Box display="grid" gridTemplateColumns="auto 1fr">
        <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
          <TabList orientation="vertical" onChange={(_, newVal) => {
            setValue(newVal)
          }}>
            <Tab label="Standard Output" value="stdout" sx={{ whiteSpace: "nowrap" }} />
            <Tab label="Standard Error" value="stderr" sx={{ whiteSpace: "nowrap" }} />
          </TabList>
        </Box>
        <TabPanel value="stdout" sx={{ py: 0 }}>
          <Box>
            <FluentBitData connection={props.connection} limit={100} />
          </Box>
        </TabPanel>
        <TabPanel value="stderr" sx={{ py: 0 }}>
          <Box>
            <Terminal connection={props.connection} />
          </Box>
        </TabPanel>
      </Box>
    </TabContext >
  )
}

type DataSourceSelectorProps = {
  dataSource: Datasource
  onChange: (ds: Datasource) => void
}

function DataSourceSelector(props: DataSourceSelectorProps) {
  return (
    <FormControl sx={{ minWidth: "calc(11ch + 4rem)" }}>
      <InputLabel>Data Source</InputLabel>
      <Select label="Data Source" autoWidth value={props.dataSource} onChange={ev => {
        props.onChange(ev.target.value as Datasource)
      }}>
        <MenuItem value="cpu">CPU</MenuItem>
        <MenuItem value="dummy">Dummy</MenuItem>
        <MenuItem value="http">HTTP</MenuItem>
        <MenuItem value="forward">Forward</MenuItem>
      </Select>
    </FormControl>
  )
}
