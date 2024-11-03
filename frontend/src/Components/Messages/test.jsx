import { useState, useMemo } from 'react'
import { Image, Button, Table, Card, ButtonGroup } from 'react-bootstrap'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

const MIME_TYPES = {
  CSV: 'text/csv',
  IMAGE: 'image/',
}

const CHART_TYPES = {
  BAR: 'bar',
  LINE: 'line',
  PIE: 'pie',
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
]

// Helper function to normalize attachment data
const normalizeAttachmentData = (data) => {
  if (!data) return ''
  if (typeof data === 'string') return data
  if (typeof data === 'object' && data.data) {
    if (typeof data.data === 'string') return data.data
    if (Array.isArray(data.data)) {
      return btoa(String.fromCharCode.apply(null, data.data))
    }
  }
  if (Array.isArray(data)) {
    return btoa(String.fromCharCode.apply(null, data))
  }
  return data
}

// Parse CSV string to structured data
const parseCSV = (csvString) => {
  try {
    const rows = csvString.split('\n').map((row) => row.split(','))
    const headers = rows[0].map((header) => header.trim())
    const values = rows.slice(1).map((row) =>
      row.map((cell) => {
        const num = parseFloat(cell)
        return isNaN(num) ? cell.trim() : num
      }),
    )

    return {
      labels: headers,
      values: values.filter((row) => row.length === headers.length), // Filter out incomplete rows
    }
  } catch (error) {
    console.error('Error parsing CSV:', error)
    return null
  }
}

const DownloadButton = ({ contentType, data, filename }) => {
  const normalizedData = normalizeAttachmentData(data)

  return (
    <Button
      variant='outline-primary'
      href={`data:${contentType};base64,${normalizedData}`}
      download={filename}
      className='d-flex align-items-center gap-2'
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
        <polyline points='7 10 12 15 17 10' />
        <line x1='12' y1='15' x2='12' y2='3' />
      </svg>
      Download
    </Button>
  )
}

const ChartView = ({ data }) => {
  const [chartType, setChartType] = useState(CHART_TYPES.BAR)

  const chartData = useMemo(() => {
    if (!data?.values || !data?.labels) return []

    // Transform data for charts
    return data.values.map((row, index) => {
      const dataPoint = { name: row[0] } // First column as name
      data.labels.slice(1).forEach((label, i) => {
        dataPoint[label] = row[i + 1]
      })
      return dataPoint
    })
  }, [data])

  const chartIcons = {
    [CHART_TYPES.BAR]: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <rect x='3' y='3' width='18' height='18' rx='2' />
        <path d='M8 15v-5m4 5V8m4 7v-3' />
      </svg>
    ),
    [CHART_TYPES.LINE]: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M3 12h18M3 6h18M3 18h18' />
      </svg>
    ),
    [CHART_TYPES.PIE]: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M12 2v20M2 12h20' />
        <circle cx='12' cy='12' r='10' />
      </svg>
    ),
  }

  const dataKeys = data?.labels?.slice(1) || []

  const ChartComponents = {
    [CHART_TYPES.BAR]: (
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        {dataKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={COLORS[index % COLORS.length]}
            stackId='stack'
          />
        ))}
      </BarChart>
    ),
    [CHART_TYPES.LINE]: (
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type='monotone'
            dataKey={key}
            stroke={COLORS[index % COLORS.length]}
          />
        ))}
      </LineChart>
    ),
    [CHART_TYPES.PIE]: (
      <PieChart>
        <Pie
          data={chartData}
          dataKey={dataKeys[0]}
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={150}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    ),
  }

  return (
    <Card className='mb-4' style={{ fontSize: '0.8em' }}>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <ButtonGroup>
          {Object.entries(chartIcons).map(([type, icon]) => (
            <Button
              key={type}
              variant={chartType === type ? 'primary' : 'outline-primary'}
              onClick={() => setChartType(type)}
              className='d-flex align-items-center gap-2'
              style={{ fontSize: '0.8em' }}
            >
              {icon}
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </Card.Header>
      <Card.Body>
        <ResponsiveContainer width='100%' height={300}>
          {ChartComponents[chartType]}
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  )
}

const DataTable = ({ data }) => {
  if (!data?.labels || !data?.values) return null

  const tableContent = useMemo(
    () => (
      <Table striped bordered hover className='mb-0'>
        <thead>
          <tr>
            {data.labels.map((header, index) => (
              <th
                key={index}
                style={{ fontSize: '0.8em' }}
                className='position-sticky top-0 bg-white'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.values.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, cellIndex) => (
                <td key={cellIndex} style={{ fontSize: '0.8em' }}>
                  {value?.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    ),
    [data.labels, data.values],
  )

  return (
    <div
      className='table-responsive'
      style={{
        maxHeight: '40vh',
        width: '40rem',
        maxWidth: '50vw',
        overflowY: 'auto',
      }}
    >
      {tableContent}
    </div>
  )
}

const FileIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
  >
    <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
    <polyline points='14 2 14 8 20 8' />
  </svg>
)

const EnhancedAttachment = ({ attachment }) => {
  const [showPlot, setShowPlot] = useState(false)

  if (!attachment) return null

  const normalizedData = normalizeAttachmentData(attachment.data)

  // Handle image attachments
  if (attachment.contentType?.startsWith(MIME_TYPES.IMAGE)) {
    return (
      <div className='mb-3'>
        <div
          className='position-relative'
          style={{ height: 'auto', width: '100%' }}
        >
          <Image
            src={`data:${attachment.contentType};base64,${normalizedData}`}
            alt={attachment.filename}
            className='w-100 h-auto'
            style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className='mt-3'>
          <DownloadButton
            contentType={attachment.contentType}
            data={normalizedData}
            filename={attachment.filename}
          />
        </div>
      </div>
    )
  }

  // Handle CSV attachments
  if (attachment.contentType === MIME_TYPES.CSV) {
    // Parse CSV data if not already parsed
    const chartData = attachment.chartData || parseCSV(atob(normalizedData))

    if (chartData) {
      return (
        <div className='mb-3'>
          <div className='d-flex justify-content-between align-items-center mb-3'>
            <Button
              variant='outline-primary'
              onClick={() => setShowPlot(!showPlot)}
              className='d-flex align-items-center gap-2'
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                {showPlot ? (
                  <path d='M19 9l-7 7-7-7' />
                ) : (
                  <path d='M9 18l6-6-6-6' />
                )}
              </svg>
              {showPlot ? 'Hide Charts' : 'Show Charts'}
            </Button>
            <DownloadButton
              contentType={attachment.contentType}
              data={normalizedData}
              filename={attachment.filename}
            />
          </div>
          {showPlot && <ChartView data={chartData} />}
          <Card>
            <Card.Header>Data Table</Card.Header>
            <Card.Body className='p-0'>
              <DataTable data={chartData} />
            </Card.Body>
          </Card>
        </div>
      )
    }
  }

  // Default placeholder for other file types
  return (
    <div className='d-flex align-items-center gap-2 p-3 border rounded'>
      <FileIcon />
      <span className='flex-grow-1'>{attachment.filename}</span>
      <DownloadButton
        contentType={attachment.contentType}
        data={normalizedData}
        filename={attachment.filename}
      />
    </div>
  )
}

export default EnhancedAttachment