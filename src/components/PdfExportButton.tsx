import React from 'react';

interface PdfExportButtonProps {
  studentName: string;
}

export const PdfExportButton: React.FC<PdfExportButtonProps> = ({ studentName }) => {
  const handlePrint = () => {
    // Set document title temporarily to name the PDF download nicely
    const originalTitle = document.title;
    const dateStr = new Date().toISOString().split('T')[0];
    document.title = `디자이너_인바디_진단표_${studentName}_${dateStr}`;
    
    window.print();
    
    // Restore original title
    document.title = originalTitle;
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="btn btn-primary print-btn"
      aria-label="결과 보고서 PDF 저장"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        width="18"
        height="18"
        className="mr-2 inline"
      >
        <path fillRule="evenodd" d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174A3 3 0 0 0 2.25 9.518v7.352a3 3 0 0 0 2.476 2.973c.423.064.848.12 1.274.173v2.609c0 1.036.84 1.875 1.875 1.875h8.25c1.036 0 1.875-.84 1.875-1.875v-2.609c.426-.053.851-.11 1.274-.173a3 3 0 0 0 2.476-2.973V9.518a3 3 0 0 0-2.476-2.972L18 6.365V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.255v-2.88a.375.375 0 0 0-.375-.375h-8.25a.375.375 0 0 0-.375.375v2.88c2.973-.117 6.027-.117 9 0ZM15 18.75h-6v2.625c0 .069.056.125.125.125h5.75c.069 0 .125-.056.125-.125V18.75ZM4.72 9.518c.23-.035.46-.07.692-.103V10.5a.75.75 0 0 0 1.5 0v-1.19c1.97-.085 3.97-.085 5.94 0V10.5a.75.75 0 0 0 1.5 0v-1.19c.232.033.461.068.692.103a1.5 1.5 0 0 1 1.238 1.486v5.297a1.5 1.5 0 0 1-1.238 1.486c-.23.035-.46.07-.692.103v-1.54a.75.75 0 0 0-1.5 0v1.54c-1.97.085-3.97.085-5.94 0v-1.54a.75.75 0 0 0-1.5 0v1.54c-.232-.033-.461-.068-.692-.103a1.5 1.5 0 0 1-1.238-1.486v-5.297c0-.742.513-1.37 1.238-1.486Z" clipRule="evenodd" />
        <path d="M16.5 11.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
      </svg>
      리포트 PDF 저장
    </button>
  );
};
