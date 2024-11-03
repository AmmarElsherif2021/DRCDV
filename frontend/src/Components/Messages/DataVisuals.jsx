import { useState } from 'react'
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
import {
  Download,
  ChevronDown,
  ChevronUp,
  BarChart2,
  LineChart as LineIcon,
  PieChart as PieIcon,
  File,
  Image as ImageIcon,
  Table as TableIcon,
} from 'lucide-react'

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

// Constants for sizing
const MAX_IMAGE_HEIGHT = 400
const MAX_TABLE_HEIGHT = 300
const INITIAL_TABLE_HEIGHT = 200
const CHART_HEIGHT = 300

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
      values: values.filter((row) => row.length === headers.length),
    }
  } catch (error) {
    console.error('Error parsing CSV:', error)
    return null
  }
}

const IconButton = ({
  icon: Icon,
  onClick,
  title,
  className = '',
  active = false,
}) => (
  <button
    onClick={onClick}
    title={title}
    className={`p-0 border-0 bg-transparent ${className}`}
    style={{ color: '#ffffff' }}
  >
    <Icon size={18} className='text' />
  </button>
)

const DownloadButton = ({ contentType, data, filename }) => (
  <IconButton
    icon={Download}
    onClick={() => {
      const link = document.createElement('a')
      link.href = `data:${contentType};base64,${data}`
      link.download = filename
      link.click()
    }}
    title='Download'
    className='hover:bg-gray-100/80'
  />
)

const AttachmentHeader = ({ icon: Icon, title, actions }) => (
  <div
    className='flex items-center justify-between p-2 bg-gray-50 border-b flex-row'
    style={{
      //backgroundColor: '#433456',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '2.5rem',
      color: '#ffffff',
    }}
  >
    <Icon size={18} />

    <div className='flex gap-1 flex-row'>{actions}</div>
  </div>
)
const ChartView = ({ data }) => {
  const [chartType, setChartType] = useState(CHART_TYPES.BAR)
  const dataKeys = data?.labels?.slice(1) || []

  const chartData = data.values.map((row) => {
    const dataPoint = { name: row[0] }
    data.labels.slice(1).forEach((label, i) => {
      dataPoint[label] = row[i + 1]
    })
    return dataPoint
  })

  const ChartComponents = {
    [CHART_TYPES.BAR]: (
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.5} />
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
        <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.5} />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type='monotone'
            dataKey={key}
            stroke={COLORS[index % COLORS.length]}
            strokeWidth={2}
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
          outerRadius={100}
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
    <div className='bg-white rounded-lg border'>
      <div className='flex items-center gap-1 p-2 border-b bg-gray-50'>
        <IconButton
          icon={BarChart2}
          onClick={() => setChartType(CHART_TYPES.BAR)}
          title='Bar Chart'
          active={chartType === CHART_TYPES.BAR}
        />
        <IconButton
          icon={LineIcon}
          onClick={() => setChartType(CHART_TYPES.LINE)}
          title='Line Chart'
          active={chartType === CHART_TYPES.LINE}
        />
        <IconButton
          icon={PieIcon}
          onClick={() => setChartType(CHART_TYPES.PIE)}
          title='Pie Chart'
          active={chartType === CHART_TYPES.PIE}
        />
      </div>
      <div className='p-4'>
        <ResponsiveContainer width='100%' height={CHART_HEIGHT}>
          {ChartComponents[chartType]}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const DataTable = ({ data }) => {
  const [expanded, setExpanded] = useState(false)

  if (!data?.labels || !data?.values) return null

  return (
    <div
      className={`overflow-hidden transition-all duration-300`}
      style={{ maxHeight: '50vh', overflow: 'auto' }}
    >
      <div className='overflow-auto' style={{ overflow: 'auto' }}>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              {data.labels.map((header, index) => (
                <th
                  key={index}
                  className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {data.values.map((row, rowIndex) => (
              <tr key={rowIndex} className='hover:bg-gray-50'>
                {row.map((value, cellIndex) => (
                  <td
                    key={cellIndex}
                    className='px-4 py-2 whitespace-nowrap text-sm text-gray-900'
                  >
                    {value?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className='w-full text-center py-1 hover:bg-gray-100 text-gray-500 border-t'
      >
        {expanded ? (
          <ChevronUp size={16} className='mx-auto' />
        ) : (
          <ChevronDown size={16} className='mx-auto' />
        )}
      </button>
    </div>
  )
}

const EnhancedAttachment = ({ attachment }) => {
  const [showPlot, setShowPlot] = useState(false)

  if (!attachment) return null

  const normalizedData = normalizeAttachmentData(attachment.data)

  if (attachment.contentType?.startsWith(MIME_TYPES.IMAGE)) {
    return (
      <div className='rounded-lg   overflow-hidden'>
        <AttachmentHeader
          icon={ImageIcon}
          title={attachment.filename}
          actions={
            <DownloadButton
              contentType={attachment.contentType}
              data={normalizedData}
              filename={attachment.filename}
            />
          }
        />
        <div className='relative'>
          <img
            src={`data:${attachment.contentType};base64,${normalizedData}`}
            alt={attachment.filename}
            className='w-full h-auto object-contain'
            style={{ maxHeight: MAX_IMAGE_HEIGHT }}
          />
        </div>
      </div>
    )
  }

  if (attachment.contentType === MIME_TYPES.CSV) {
    const chartData = attachment.chartData || parseCSV(atob(normalizedData))

    if (chartData) {
      return (
        <div className='flex rounded-lg border bg-white overflow-hidden flex-row'>
          <AttachmentHeader
            icon={TableIcon}
            title={attachment.filename}
            actions={
              <>
                <IconButton
                  icon={showPlot ? ChevronUp : ChevronDown}
                  onClick={() => setShowPlot(!showPlot)}
                  title={showPlot ? 'Hide Charts' : 'Show Charts'}
                />
                <DownloadButton
                  contentType={attachment.contentType}
                  data={normalizedData}
                  filename={attachment.filename}
                />
              </>
            }
          />
          <div
            className={`space-y-2 transition-all duration-300 ${showPlot ? 'py-4' : ''}`}
          >
            {showPlot && <ChartView data={chartData} />}
            <DataTable data={chartData} />
          </div>
        </div>
      )
    }
  }

  return (
    <div className='rounded-lg border bg-white overflow-hidden'>
      <AttachmentHeader
        icon={File}
        title={attachment.filename}
        actions={
          <DownloadButton
            contentType={attachment.contentType}
            data={normalizedData}
            filename={attachment.filename}
          />
        }
      />
    </div>
  )
}

export default EnhancedAttachment
