import UnfoldLess from "@mui/icons-material/UnfoldLess"
import UnfoldMore from "@mui/icons-material/UnfoldMore"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from 'react'
import {
  FlbConnection, FlbErrorEventListener, FlbStdoutEventData,
  FlbStdoutEventListener
} from '../../util/flb_connection'



export interface FluentBitDataProps {
  connection: FlbConnection
  limit: number
}

function limitRecords(d: FlbStdoutEventData[], max: number): FlbStdoutEventData[] {
  const delta = d.length - max
  if (delta > 0) {
    return d.slice(delta)
  }
  return d
}

export default function FluentBitData({ limit, connection }: FluentBitDataProps) {
  const [records, setRecords] = useState([] as FlbStdoutEventData[])
  const [foldMap, setFoldMap] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const stdoutListener: FlbStdoutEventListener = (data) => {
      setRecords(r => limitRecords(r.concat(data), limit))
    }

    const errorListener: FlbErrorEventListener = (data) => {
      console.error('Failed to parse stdout JSON:', data.message)
      console.error('Raw payload:', data.raw)
    }

    connection.on('stdout', stdoutListener)
    connection.on('error', errorListener)

    return () => {
      connection.off('stdout', stdoutListener)
      connection.off('error', errorListener)
    }
  }, [connection, limit])

  const onFold = (id: string) => {
    setFoldMap(m => ({ ...m, [id]: !m[id] }))
  }

  return (
    <Box p={2} bgcolor="#FAFAFA" border="1px solid rgba(63, 81, 181, 0.08)" borderRadius={1} maxHeight="60vh" sx={{ overflowY: "auto" }}>
      <List sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {records.map(r => {
          const fold = Object.entries(foldMap).some(([k, v]) => k === r.id && v)
          return (
            <ListItem key={r.id}>
              <Box borderLeft="3px solid #7B61FF" borderRadius="3px" bgcolor={fold ? "#F1F0F9" : "white"} width="100%" px={2} py={0}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Box>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Typography color="#7B61FF">{new Date(Number(r.data.date) * 1000).toLocaleString()}</Typography>
                      <IconButton onClick={() => onFold(r.id)}>
                        {fold ? (
                          <UnfoldMore sx={{ color: "#7B61FF" }} />
                        ) : (
                          <UnfoldLess sx={{ color: "#7B61FF" }} />
                        )}
                      </IconButton>
                    </Stack>
                  </Box>
                  <code style={{ whiteSpace: "pre" }}>{JSON.stringify({ ...r.data, date: undefined }, null, fold ? 2 : undefined)}</code>
                </Stack>
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
