/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react'
import { Image, Button, Table, Alert } from 'react-bootstrap'

import { Camera } from 'lucide-react'
import * as d3 from 'd3'
import * as XLSX from 'xlsx'

import { Document, Page } from 'react-pdf'
export const Chart = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current && data.labels && data.values) {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 }
      const width = 400 - margin.left - margin.right
      const height = 300 - margin.top - margin.bottom

      d3.select(chartRef.current).selectAll('*').remove()

      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const x = d3.scaleBand().range([0, width]).padding(0.1)
      const y = d3.scaleLinear().range([height, 0])

      x.domain(data.labels)
      y.domain([0, d3.max(data.values)])

      svg
        .selectAll('.bar')
        .data(data.values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d, i) => x(data.labels[i]))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y(d))
        .attr('height', (d) => height - y(d))
        .attr('fill', 'steelblue')

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))

      svg.append('g').call(d3.axisLeft(y))
    }
  }, [data])

  return <div ref={chartRef}></div>
}

export const ExcelViewer = ({ data }) => {
  const [sheets, setSheets] = useState([])
  const [activeSheet, setActiveSheet] = useState(0)
  const [tableData, setTableData] = useState({ headers: [], rows: [] })

  useEffect(() => {
    if (data) {
      try {
        if (typeof data === 'string') {
          const workbook = XLSX.read(data, { type: 'base64' })
          const sheetsData = workbook.SheetNames.map((name) => {
            const sheet = workbook.Sheets[name]
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 })
            return {
              name,
              headers: jsonData[0] || [],
              rows: jsonData.slice(1) || [],
            }
          })
          setSheets(sheetsData)
          if (sheetsData.length > 0) {
            setTableData({
              headers: sheetsData[0].headers,
              rows: sheetsData[0].rows,
            })
          }
        } else if (data.labels && data.values) {
          setSheets([
            {
              name: 'Sheet1',
              headers: data.labels,
              rows: data.values,
            },
          ])
          setTableData({
            headers: data.labels,
            rows: data.values,
          })
        }
      } catch (error) {
        console.error('Error processing Excel data:', error)
        setSheets([])
        setTableData({ headers: [], rows: [] })
      }
    }
  }, [data])

  const handleSheetChange = (index) => {
    setActiveSheet(index)
    setTableData({
      headers: sheets[index].headers,
      rows: sheets[index].rows,
    })
  }

  if (!data)
    return (
      <div className='p-4 text-center text-gray-500'>
        No Excel data available
      </div>
    )

  return (
    <div className='w-full'>
      {sheets.length > 1 && (
        <div className='mb-4 flex gap-2'>
          {sheets.map((sheet, index) => (
            <button
              key={sheet.name}
              onClick={() => handleSheetChange(index)}
              className={`px-3 py-1 text-sm rounded-md transition-colors
                ${
                  activeSheet === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
                }`}
            >
              {sheet.name}
            </button>
          ))}
        </div>
      )}

      <div className='w-full overflow-x-auto'>
        <table className='min-w-full border-collapse'>
          <thead>
            <tr className='bg-gray-50'>
              {tableData.headers.map((header, index) => (
                <th
                  key={index}
                  className='px-4 py-2 border border-gray-200 text-left text-sm font-medium text-gray-700'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                {Array.isArray(row)
                  ? row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className='px-4 py-2 border border-gray-200 text-sm text-gray-900'
                      >
                        {cell?.toString()}
                      </td>
                    ))
                  : tableData.headers.map((header, cellIndex) => (
                      <td
                        key={cellIndex}
                        className='px-4 py-2 border border-gray-200 text-sm text-gray-900'
                      >
                        {row[header]?.toString()}
                      </td>
                    ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const Attachment = ({ attachment }) => {
  if (attachment.isImage) {
    return (
      <Image
        src={`data:${attachment.contentType};base64,${attachment.data}`}
        alt={attachment.filename}
        style={{ maxWidth: '100%', height: 'auto' }}
        fluid
      />
    )
  }

  if (attachment.contentType === 'text/csv') {
    return attachment.chartData ? (
      <Chart data={attachment.chartData} />
    ) : (
      <div>Error: No chart data available for CSV</div>
    )
  }

  if (
    attachment.contentType ===
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return <ExcelViewer data={attachment.data} />
  }

  if (attachment.contentType === 'application/pdf') {
    return (
      <div>
        <a
          href={`data:application/pdf;base64,${attachment.data}`}
          download={attachment.filename}
          className='btn btn-primary'
        >
          Download PDF
        </a>
        <Document file={`data:application/pdf;base64,${attachment.data}`}>
          <Page pageNumber={1} />
        </Document>
      </div>
    )
  }

  // Fallback for other file types
  return (
    <a
      href={`data:${attachment.contentType};base64,${attachment.data}`}
      download={attachment.filename}
      className='btn btn-secondary'
    >
      Download {attachment.filename}
    </a>
  )
}

export const EnhancedAttachment = ({ attachment }) => {
  const [tableData, setTableData] = useState({ headers: [], rows: [] })

  useEffect(() => {
    if (attachment) {
      try {
        if (attachment.contentType === 'text/csv') {
          if (attachment.chartData) {
            setTableData({
              headers: attachment.chartData.labels,
              rows: attachment.chartData.values.map((value, index) => ({
                [attachment.chartData.labels[0]]:
                  attachment.chartData.labels[index],
                [attachment.chartData.labels[1]]: value,
              })),
            })
          }
        } else if (
          attachment.contentType ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
          if (attachment.data && typeof attachment.data === 'object') {
            const parsedData =
              typeof attachment.data === 'string'
                ? JSON.parse(attachment.data)
                : attachment.data

            if (Array.isArray(parsedData)) {
              setTableData({
                headers: parsedData[0] || [],
                rows: parsedData.slice(1) || [], //,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
              })
            } else if (parsedData.headers && parsedData.rows) {
              setTableData(parsedData)
            }
          }
        }
      } catch (error) {
        console.error('Error processing table data:', error)
      }
    }
  }, [attachment])

  const renderDownloadButton = () => (
    <Button
      variant='primary'
      className='mt-2'
      href={`data:${attachment.contentType};base64,${attachment.data}`}
      download={attachment.filename}
    >
      Download {attachment.filename}
    </Button>
  )

  if (!attachment) return null

  // Handle image attachments
  if (attachment.isImage) {
    return (
      <div className='attachment-wrapper'>
        <div
          className='position-relative'
          style={{ width: '100%', height: '12rem' }}
        >
          <Image
            src={`data:${attachment.contentType};base64,${attachment.data}`}
            alt={attachment.filename}
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </div>
        {renderDownloadButton()}
      </div>
    )
  }

  // Handle CSV and XLSX data
  if (
    [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ].includes(attachment.contentType)
  ) {
    if (!tableData.headers.length) {
      return (
        <div>
          <Alert variant='info'>No data available</Alert>
          {renderDownloadButton()}
        </div>
      )
    }

    return (
      <div>
        <div style={{ overflowX: 'auto' }}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                {tableData.headers.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.isArray(row)
                    ? row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))
                    : tableData.headers.map((header, cellIndex) => (
                        <td key={cellIndex}>{row[header]}</td>
                      ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {renderDownloadButton()}
      </div>
    )
  }

  // Fallback for other file types
  return (
    <div>
      <div className='d-flex align-items-center gap-2'>
        <Camera size={24} />
        <span>{attachment.filename}</span>
      </div>
      {renderDownloadButton()}
    </div>
  )
}
