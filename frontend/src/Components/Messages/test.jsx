import React, { useState, useRef, useEffect } from 'react'

const DataTable = ({ data }) => {
  const [expanded, setExpanded] = useState(false)
  const [scrollShadows, setScrollShadows] = useState({
    left: false,
    right: false,
  })
  const scrollContainerRef = useRef(null)

  // Handle scroll shadows
  const updateScrollShadows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current
      setScrollShadows({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 1,
      })
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      updateScrollShadows()
      scrollContainer.addEventListener('scroll', updateScrollShadows)
      window.addEventListener('resize', updateScrollShadows)

      return () => {
        scrollContainer.removeEventListener('scroll', updateScrollShadows)
        window.removeEventListener('resize', updateScrollShadows)
      }
    }
  }, [])

  if (!data?.labels || !data?.values) return null

  return (
    <div className='flex flex-col w-full'>
      {/* Table Container */}
      <div
        className={`relative transition-all duration-300 ease-in-out`}
        style={{
          maxHeight: expanded ? '80vh' : '50vh',
          minHeight: '200px',
        }}
      >
        {/* Scroll Shadows */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
            scrollShadows.left ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none transition-opacity duration-200 ${
            scrollShadows.right ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Table Wrapper */}
        <div
          ref={scrollContainerRef}
          className='overflow-auto w-full h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'
        >
          <table className='min-w-full table-auto border-collapse'>
            <thead>
              <tr className='bg-gray-50'>
                {data.labels.map((header, index) => (
                  <th
                    key={index}
                    className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky top-0 bg-gray-50 shadow-sm z-20'
                    style={{ minWidth: '120px' }}
                  >
                    <div className='flex items-center justify-between'>
                      <span className='truncate'>{header}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {data.values.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className='hover:bg-gray-50 transition-colors duration-150'
                >
                  {row.map((value, cellIndex) => (
                    <td
                      key={cellIndex}
                      className='px-4 py-2.5 text-sm text-gray-900 truncate max-w-xs'
                    >
                      <div className='truncate'>{value?.toString()}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className='w-full text-center py-2 hover:bg-gray-100 text-gray-500 border-t transition-colors duration-150 flex items-center justify-center gap-1'
      >
        {expanded ? (
          <>
            <ChevronUp size={16} />
            <span className='text-sm'>Show Less</span>
          </>
        ) : (
          <>
            <ChevronDown size={16} />
            <span className='text-sm'>Show More</span>
          </>
        )}
      </button>
    </div>
  )
}

export default DataTable
