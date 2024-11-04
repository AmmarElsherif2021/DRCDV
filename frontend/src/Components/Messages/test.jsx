import React, { useState } from 'react'
import { ChevronUp, ChevronDown, ChartBar } from 'lucide-react'

const DataTable = ({ data }) => {
  const [expanded, setExpanded] = useState(false)

  if (!data?.labels || !data?.values) return null

  return (
    <div
      className={`overflow-hidden transition-all duration-300`}
      style={{ maxHeight: expanded ? '100vh' : '50vh', overflow: 'auto' }}
    >
      <div className='overflow-auto'>
        <table className='min-w-full divide-y divide-gray-200 table-auto'>
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

export default DataTable
