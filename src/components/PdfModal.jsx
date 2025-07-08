import React from "react";
import { X, FileText, ExternalLink, Download } from "lucide-react";

const PdfModal = ({ isOpen, citation, onClose }) => {
  if (!isOpen || !citation) return null;

  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement("a");
    link.href = citation.link;
    link.download = `${citation.source.replace(/\s+/g, "_")}.pdf`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {citation.source}
            </h3>
            <p className="text-sm text-gray-600">{citation.paragraph}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Highlighted Citation */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Highlighted Citation
            </h4>
            <p className="text-sm text-yellow-700 italic leading-relaxed">
              "{citation.text}"
            </p>
          </div>

          {/* Simulated PDF Content */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Document Preview
              </h4>
              <p className="text-sm text-gray-600">
                {citation.source} - {citation.paragraph}
              </p>
            </div>

            {/* Simulated PDF content with highlighted text */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4 font-mono text-sm">
              <div className="mb-4 text-gray-700">
                <p className="mb-2">
                  7. Having heard the arguments advanced by learned counsel for
                  both the parties and gone through the paper-book, I am of the
                  considered view that
                </p>
                <p className="bg-yellow-200 px-2 py-1 rounded inline-block">
                  {citation.text}
                </p>
              </div>
              <div className="text-gray-600">
                <p className="mb-2">
                  8. Besides this, with respect to the compensation awarded
                  under the other conventional heads as well as multiplier,
                  applying the principles of law laid down by Hon'ble Supreme
                  Court in Pranay Sethi's case(supra) and in Smt. Sarla Verma...
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <a
                href={citation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Original PDF</span>
              </a>
              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
