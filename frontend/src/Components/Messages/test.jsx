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

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884d8',
  '#82ca9d',
]
const CHART_TYPES = { BAR: 'bar', LINE: 'line', PIE: 'pie' }
const CHART_HEIGHT = 400

const IconButton = ({ icon: Icon, onClick, title, active = false }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md hover:bg-gray-100 transition-colors
      ${active ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
    title={title}
  >
    <Icon size={20} />
  </button>
)

const ChartView = ({ data }) => {
  const [chartType, setChartType] = useState(CHART_TYPES.BAR)
  const dataKeys = data?.labels?.slice(1) || []

  const chartData = data.values.map((row) => ({
    name: row[0],
    ...data.labels.slice(1).reduce(
      (acc, label, i) => ({
        ...acc,
        [label]: row[i + 1],
      }),
      {},
    ),
  }))

  const ChartComponents = {
    [CHART_TYPES.BAR]: (
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray='3 3' strokeOpacity={0.5} />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip wrapperStyle={{ outline: 'none' }} />
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
        <Tooltip wrapperStyle={{ outline: 'none' }} />
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
          outerRadius={140}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip wrapperStyle={{ outline: 'none' }} />
      </PieChart>
    ),
  }

  return (
    <div className='bg-white rounded-lg shadow-sm'>
      <div className='flex items-center gap-2 p-3 border-b'>
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
    <div className='bg-white rounded-lg shadow-sm'>
      <div className='border-b sticky top-0 z-10 bg-white'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='bg-gray-50'>
                {data.labels.map((header, index) => (
                  <th
                    key={index}
                    className='px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 bg-gray-50'
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[600px]' : 'max-h-[300px]'}`}
      >
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <tbody className='bg-white divide-y divide-gray-200'>
              {data.values.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className='hover:bg-gray-50 transition-colors'
                >
                  {row.map((value, cellIndex) => (
                    <td
                      key={cellIndex}
                      className='px-6 py-4 whitespace-nowrap text-sm text-gray-700'
                    >
                      {value?.toString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className='w-full py-2 px-4 text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 border-t'
      >
        {expanded ? (
          <>
            <ChevronUp size={16} />
            <span>Show less</span>
          </>
        ) : (
          <>
            <ChevronDown size={16} />
            <span>Show more</span>
          </>
        )}
      </button>
    </div>
  )
}

const EnhancedAttachment = ({ attachment }) => {
  const [showPlot, setShowPlot] = useState(false)

  if (!attachment) return null

  const normalizedData =
    typeof attachment.data === 'string'
      ? attachment.data
      : btoa(String.fromCharCode.apply(null, attachment.data))

  return (
    <div className='rounded-lg shadow-sm overflow-hidden'>
      <div className='flex items-center justify-between p-3 bg-gray-50 border-b'>
        <div className='flex items-center gap-2'>
          <TableIcon size={20} className='text-gray-600' />
          <span className='text-sm font-medium text-gray-700'>
            {attachment.filename}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <IconButton
            icon={showPlot ? ChevronUp : ChevronDown}
            onClick={() => setShowPlot(!showPlot)}
            title={showPlot ? 'Hide Charts' : 'Show Charts'}
          />
          <IconButton
            icon={Download}
            onClick={() => {
              const link = document.createElement('a')
              link.href = `data:${attachment.contentType};base64,${normalizedData}`
              link.download = attachment.filename
              link.click()
            }}
            title='Download'
          />
        </div>
      </div>

      <div className='space-y-4 p-4'>
        {showPlot && attachment.chartData && (
          <ChartView data={attachment.chartData} />
        )}
        {attachment.chartData && <DataTable data={attachment.chartData} />}
      </div>
    </div>
  )
}

export default EnhancedAttachment
