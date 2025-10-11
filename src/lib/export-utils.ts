// Export utility functions for TerraPulse

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.error('No data to export');
    return;
  }

  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
}

export function exportToPDF(title: string, content: string) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download PDF');
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            padding: 40px; 
            background: white; 
            color: black;
            line-height: 1.6;
          }
          h1 { 
            color: #00FF41; 
            margin-bottom: 10px;
            font-size: 32px;
          }
          h2 { 
            color: #10B981;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 24px;
          }
          .header {
            border-bottom: 3px solid #00FF41;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .meta {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 12px; 
            text-align: left;
          }
          th { 
            background: #00FF41; 
            color: black;
            font-weight: 600;
          }
          tr:nth-child(even) {
            background: #f9f9f9;
          }
          ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          li {
            margin: 8px 0;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌍 ${title}</h1>
          <p class="meta">Generated: ${new Date().toLocaleString()}</p>
          <p class="meta">TerraPulse - AI-Powered Land Regeneration Platform</p>
        </div>
        ${content}
        <div class="footer">
          <p>TerraPulse © ${new Date().getFullYear()} | Built for LandReGen Hackathon</p>
          <p>Powered by Satellite Data, AI & Climate Passion</p>
        </div>
      </body>
    </html>
  `);
  
  printWindow.document.close();
  setTimeout(() => {
    printWindow.print();
    setTimeout(() => printWindow.close(), 250);
  }, 500);
}
