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

    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

    const bookmarkGroups = [
        { name: 'Basic Info', count: 3, icon: <FileText className="w-4 h-4" /> },
        { name: 'Equipment Details', count: 5, icon: <FolderOpen className="w-4 h-4" /> },
        { name: 'Measurements', count: 4, icon: <Ruler className="w-4 h-4" /> },
        { name: 'Results', count: 1, icon: <CheckSquare className="w-4 h-4" /> }
    ];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Template Manager</h1>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-8">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50">
                    Import Word Template
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50">
                    Save
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50">
                    Refresh
                </button>
            </div>

            {/* Templates Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Templates</h2>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search templates"
                        className="w-full pl-10 pr-4 py-2 border rounded"
                    />
                </div>
                {templates.map((template) => (
                    <div
                        key={template.name}
                        className="mb-2 p-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedTemplate(template)}
                    >
                        <div className="text-blue-600">{template.name}</div>
                        <div className="text-sm text-gray-600">
                            Groups: {template.group} | Bookmarks: {template.bookmarks}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bookmark Groups */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Bookmark Groups</h2>
                    <button className="text-blue-600 hover:text-blue-800">+ New</button>
                </div>
                {bookmarkGroups.map((group) => (
                    <div key={group.name} className="flex items-center justify-between p-2 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                            {group.icon}
                            <span>{group.name}</span>
                        </div>
                        <span className="text-gray-500">({group.count})</span>
                    </div>
                ))}
            </div>

            {/* Template Properties */}
            {selectedTemplate && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Template Properties</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name:</label>
                            <div className="mt-1">{selectedTemplate.name}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location:</label>
                            <div className="mt-1">{selectedTemplate.location}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Created:</label>
                            <div className="mt-1">{selectedTemplate.created}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateManager;