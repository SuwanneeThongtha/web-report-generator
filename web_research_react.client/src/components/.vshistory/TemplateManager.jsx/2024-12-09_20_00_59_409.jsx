import React, { useState } from 'react';
import { Search, FileText, FolderOpen, Ruler, CheckSquare, Plus } from 'lucide-react';

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
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Template Manager</h1>

            {/* Action Buttons */}
            <div className="flex justify-start gap-4 mb-8">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Import Word Template
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    Save
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    Refresh
                </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Templates Section */}
                <div className="col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Templates</h2>
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search templates"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            {templates.map((template) => (
                                <div
                                    key={template.name}
                                    className={`p-3 rounded-md cursor-pointer transition-colors ${selectedTemplate.name === template.name
                                            ? 'bg-blue-50 border border-blue-200'
                                            : 'hover:bg-gray-50 border border-transparent'
                                        }`}
                                    onClick={() => setSelectedTemplate(template)}
                                >
                                    <div className="text-blue-600 font-medium">{template.name}</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Groups: {template.group} | Bookmarks: {template.bookmarks}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bookmark Groups */}
                    <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Bookmark Groups</h2>
                            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>New Group</span>
                            </button>
                        </div>
                        <div className="space-y-2">
                            {bookmarkGroups.map((group) => (
                                <div key={group.name} className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        {group.icon}
                                        <span className="font-medium text-gray-700">{group.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-sm">({group.count})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Template Properties */}
                {selectedTemplate && (
                    <div className="col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Template Properties</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <div className="mt-1 text-gray-900">{selectedTemplate.name}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <div className="mt-1 text-gray-900 break-all">{selectedTemplate.location}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Created</label>
                                    <div className="mt-1 text-gray-900">{selectedTemplate.created}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <div className="mt-1">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {selectedTemplate.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TemplateManager;