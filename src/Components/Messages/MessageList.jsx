import { useRef, useEffect } from 'react'
import { ListGroup, Image } from 'react-bootstrap'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { useTable } from 'react-table'
import userAvatar from '../../assets/profile.svg'

// Register Chart.js components
ChartJS.register(...registerables)

const renderAttachment = (attachment) => {
  if (attachment.isImage) {
    return (
      <Image
        src={`data:${attachment.contentType};base64,${attachment.data}`}
        alt={attachment.filename}
        style={{ maxWidth: '100%', height: 'auto' }}
        fluid
      />
    )
  } else if (attachment.contentType === 'text/csv') {
    const data = attachment.chartData
    if (!data) {
      return <div>Error: No chart data available</div>
    }
    if (!data.labels) {
      return <div>Error: Missing labels in chart data</div>
    }
    if (!data.label) {
      return <div>Error: Missing label in chart data</div>
    }
    if (!data.values) {
      return <div>Error: Missing values in chart data</div>
    }
    if (!data.chartType) {
      return <div>Error: Missing chart type in chart data</div>
    }
    if (data && data.labels && data.label && data.values) {
      const chartData = {
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(75,192,192,0.6)',
            hoverBorderColor: 'rgba(75,192,192,1)',
            data: data.values,
          },
        ],
      }
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      }
      switch (data.chartType) {
        case 'bar':
          return <Bar data={chartData} options={chartOptions} />
        case 'line':
          return <Line data={chartData} options={chartOptions} />
        case 'pie':
          return <Pie data={chartData} options={chartOptions} />
        case 'table':
          const columns = [
            { Header: 'Label', accessor: 'label' },
            { Header: 'Value', accessor: 'value' },
          ]
          const tableData = data.labels.map((label, index) => ({
            label,
            value: data.values[index],
          }))
          return <TableComponent columns={columns} data={tableData} />
        default:
          return <div>Unsupported chart type</div>
      }
    } else {
      return <div>Invalid chart data</div>
    }
  }
  return (
    <a
      href={`data:${attachment.contentType};base64,${attachment.data}`}
      download={attachment.filename}
      className='text-white'
    >
      {attachment.filename}
    </a>
  )
}

const TableComponent = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })
  return (
    <table
      {...getTableProps()}
      style={{ width: '100%', marginTop: '10px', wordWrap: 'break-word' }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export const MessagingList = ({ messages, currentUserId }) => {
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ListGroup
      ref={listRef}
      style={{
        height: '60vh',
        overflowY: 'auto',
      }}
    >
      {messages?.map((message, index) => (
        <ListGroup.Item
          key={message._id || index}
          className={`d-flex justify-content-${
            message.sender._id === currentUserId ? 'end' : 'start'
          } border-0 bg-transparent`}
        >
          <div
            className={`d-flex align-items-start ${
              message.sender._id === currentUserId
                ? 'flex-row-reverse'
                : 'flex-row'
            }`}
            style={{ maxWidth: '70%' }}
          >
            <Image
              src={userAvatar}
              alt={message.sender.username}
              roundedCircle
              style={{ width: '2.5rem', height: '2.5rem' }}
            />
            <div
              className={`mx-2 p-3 rounded ${
                message.sender._id === currentUserId
                  ? 'bg-primary text-white'
                  : 'bg-light text-dark'
              }`}
              style={{ wordBreak: 'break-word' }}
            >
              <p className='mb-1'>{message.text}</p>
              {message.attachments?.map((attachment, i) => (
                <div key={i} className='mt-2' style={{ maxWidth: '100%' }}>
                  {renderAttachment(attachment)}
                </div>
              ))}
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default MessagingList
