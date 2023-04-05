import UnfoldLess from "@mui/icons-material/UnfoldLess"
import UnfoldMore from "@mui/icons-material/UnfoldMore"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { useState } from 'react'



export interface FluentBitDataProps {
  records: { id: number, record: unknown}[]
}

export function FluentBitLogs({ records }: FluentBitDataProps) {
  const [foldMap, setFoldMap] = useState<Record<string, boolean>>({})


  const onFold = (id: string) => {
    setFoldMap(m => ({ ...m, [id]: !m[id] }))
  }

  return (
    <Box p={2} bgcolor="#FAFAFA" border="1px solid rgba(63, 81, 181, 0.08)" borderRadius={1} maxHeight="60vh" sx={{ overflowY: "auto" }}>
      <List sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {records.map(r => {
          const recordId = r.id.toString();
          const timestamp = Math.floor((r.record as any)[0][0] / 1e6)
          const fold = Object.entries(foldMap).some(([k, v]) => k === recordId && v)
          const record = (r.record as any)[1];
          const meta = (r.record as any)[0][1];
          return (
            <ListItem key={recordId}>
              <Box borderLeft="3px solid #7B61FF" borderRadius="3px" bgcolor={fold ? "#F1F0F9" : "white"} width="100%" px={2} py={0}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Box>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Typography color="#7B61FF">{new Date(timestamp).toLocaleString()}</Typography>
                      <IconButton onClick={() => onFold(recordId)}>
                        {fold ? (
                          <UnfoldMore sx={{ color: "#7B61FF" }} />
                        ) : (
                          <UnfoldLess sx={{ color: "#7B61FF" }} />
                        )}
                      </IconButton>
                    </Stack>
                  </Box>
                  <code style={{ whiteSpace: "pre" }}>{JSON.stringify({ ...meta, date: undefined }, null, fold ? 2 : undefined)}</code>
                  <code style={{ whiteSpace: "pre" }}>{JSON.stringify({ ...record, date: undefined }, null, fold ? 2 : undefined)}</code>
                </Stack>
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export function FluentBitMetricTraces({ records }: FluentBitDataProps) {
  const [foldMap, setFoldMap] = useState<Record<string, boolean>>({})


  const onFold = (id: string) => {
    setFoldMap(m => ({ ...m, [id]: !m[id] }))
  }

  return (
    <Box p={2} bgcolor="#FAFAFA" border="1px solid rgba(63, 81, 181, 0.08)" borderRadius={1} maxHeight="60vh" sx={{ overflowY: "auto" }}>
      <List sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {records.map((r) => {
          const recordId = r.id.toString();
          const fold = Object.entries(foldMap).some(([k, v]) => k === recordId.toString() && v)
          return (
            <ListItem key={recordId}>
              <Box borderLeft="3px solid #7B61FF" borderRadius="3px" bgcolor={fold ? "#F1F0F9" : "white"} width="100%" px={2} py={0}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Box>
                    <Stack direction="row" gap={1} alignItems="center">
                      <IconButton onClick={() => onFold(recordId.toString())}>
                        {fold ? (
                          <UnfoldMore sx={{ color: "#7B61FF" }} />
                        ) : (
                          <UnfoldLess sx={{ color: "#7B61FF" }} />
                        )}
                      </IconButton>
                    </Stack>
                  </Box>
                  <code style={{ whiteSpace: "pre" }}>{JSON.stringify(r, null, fold ? 2 : undefined)}</code>
                </Stack>
              </Box>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
