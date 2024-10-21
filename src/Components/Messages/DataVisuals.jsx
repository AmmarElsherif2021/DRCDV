/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react'
import { Image, Button } from 'react-bootstrap'
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

export const Table = ({ columns, data }) => {
  const tableRef = useRef(null)

  useEffect(() => {
    if (tableRef.current && columns && data) {
      d3.select(tableRef.current).selectAll('*').remove()

      const table = d3.select(tableRef.current).append('table')
      const thead = table.append('thead')
      const tbody = table.append('tbody')

      thead
        .append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text((d) => d)

      const rows = tbody.selectAll('tr').data(data).enter().append('tr')

      rows
        .selectAll('td')
        .data((row) => columns.map((column) => row[column]))
        .enter()
        .append('td')
        .text((d) => d)
    }
  }, [columns, data])

  return <div ref={tableRef}></div>
}

export const ExcelViewer = ({ data }) => {
  const [sheets, setSheets] = useState([])
  const [activeSheet, setActiveSheet] = useState(0)

  useEffect(() => {
    if (data) {
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data

        if (parsedData.labels && parsedData.values) {
          setSheets([
            {
              name: 'Sheet1',
              data: [parsedData.labels, ...parsedData.values],
            },
          ])
        } else {
          const workbook = XLSX.read(data, { type: 'base64' })
          const sheetsData = workbook.SheetNames.map((name) => ({
            name,
            data: XLSX.utils.sheet_to_json(workbook.Sheets[name], {
              header: 1,
            }),
          }))
          setSheets(sheetsData)
        }
      } catch (error) {
        console.error('Error processing Excel data:', error)
        setSheets([])
      }
    }
  }, [data])

  if (sheets.length === 0)
    return <div>No Excel data available or error in processing.</div>

  const activeData = sheets[activeSheet].data

  return (
    <div>
      {sheets.length > 1 && (
        <div>
          {sheets.map((sheet, index) => (
            <button key={sheet.name} onClick={() => setActiveSheet(index)}>
              {sheet.name}
            </button>
          ))}
        </div>
      )}
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            {activeData[0].map((cell, index) => (
              <th key={index}>{cell}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activeData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
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

//Enhanced Att.
export const EnhancedAttachment = ({ attachment }) => {
  const renderDownloadLink = () => (
    <Button asChild className='mt-2'>
      <a
        href={`data:${attachment.contentType};base64,${attachment.data}`}
        download={attachment.filename}
      >
        Download {attachment.filename}
      </a>
    </Button>
  )

  const renderContent = () => {
    if (attachment.isImage) {
      return (
        <div className='relative w-full h-48'>
          <img
            src={`data:${attachment.contentType};base64,${attachment.data}`}
            alt={attachment.filename}
            className='object-contain w-full h-full'
          />
        </div>
      )
    }

    if (attachment.contentType === 'text/csv' && attachment.chartData) {
      return <Chart data={attachment.chartData} />
    }

    if (
      attachment.contentType ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return <ExcelViewer data={attachment.data} />
    }

    // Fallback for other file types
    return (
      <div className='flex items-center space-x-2'>
        <Camera size={24} />
        <span>{attachment.filename}</span>
      </div>
    )
  }

  return (
    <div className='attachment-wrapper space-y-2'>
      {renderContent()}
      {renderDownloadLink()}
    </div>
  )
}
