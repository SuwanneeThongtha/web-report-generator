import React, { useState } from 'react';
import { Search, FileText, FolderOpen, Ruler, CheckSquare } from 'lucide-react';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([
    {
      name: 'Equipment_Inspection.docx',
      location: 'C:\\templates\\Equipment_Inspection.docx',
      created: '2024-12-06',
      status: 'Active',
      bookmarks: 15,
      group: 4
    },
    {
      name: 'Safety_Check.docx',
      location: 'C:\\templates\\Safety_Check.docx',
      created: '2024-12-06',
      status: 'Active',
      bookmarks: 12,
      group: 3
    }
  ]);

  // Add a handler to demonstrate setTemplates usage
  const handleImportTemplate = () => {
    setTemplates([...templates, {
      name: 'New_Template.docx',
      location: 'C:\\templates\\New_Template.docx',
      created: new Date().toISOString().split('T')[0],
      status: 'Active',
      bookmarks: 0,
      group: 1
    }]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Template Manager</h1>
        <button 
          onClick={handleImportTemplate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Import Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="border p-4 rounded">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search templates" 
              className="border rounded p-2 w-full"
            />
          </div>
          
          {templates.map((template, index) => (
            <div key={index} className="border-b p-2">
              <FileText className="w-4 h-4 inline mr-2" />
              {template.name}
            </div>
          ))}
        </div>

        <div className="col-span-3 border p-4 rounded">
          <h2 className="text-xl mb-4">Template Details</h2>
          {templates.length > 0 && (
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Name:</strong> {templates[0].name}
                </div>
                <div>
                  <strong>Location:</strong> {templates[0].location}
                </div>
                <div>
                  <strong>Created:</strong> {templates[0].created}
                </div>
                <div>
                  <strong>Status:</strong> {templates[0].status}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;