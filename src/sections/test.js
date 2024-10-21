import React from 'react'
import { Image } from 'react-bootstrap'
import { Chart, Table, ExcelViewer } from './DataVisuals'
import { Document, Page } from 'react-pdf'

import React from 'react';
import { Chart, Table, ExcelViewer } from '@/components/ui/data-visuals';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const EnhancedAttachment = ({ attachment }) => {
  const renderDownloadLink = () => (
    <Button
      asChild
      className="mt-2"
    >
      <a
        href={`data:${attachment.contentType};base64,${attachment.data}`}
        download={attachment.filename}
      >
        Download {attachment.filename}
      </a>
    </Button>
  );

  const renderContent = () => {
    if (attachment.isImage) {
      return (
        <div className="relative w-full h-48">
          <img
            src={`data:${attachment.contentType};base64,${attachment.data}`}
            alt={attachment.filename}
            className="object-contain w-full h-full"
          />
        </div>
      );
    }

    if (attachment.contentType === 'text/csv' && attachment.chartData) {
      return <Chart data={attachment.chartData} />;
    }

    if (
      attachment.contentType ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return <ExcelViewer data={attachment.data} />;
    }

    // Fallback for other file types
    return (
      <div className="flex items-center space-x-2">
        <Camera size={24} />
        <span>{attachment.filename}</span>
      </div>
    );
  };

  return (
    <div className="attachment-wrapper space-y-2">
      {renderContent()}
      {renderDownloadLink()}
    </div>
  );
};

export default EnhancedAttachment;

export default EnhancedAttachment
