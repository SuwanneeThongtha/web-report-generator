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
    const [bookmarkGroups] = useState([
        { name: 'Basic Info', count: 3, icon: <FileText className="w-4 h-4" /> },
        { name: 'Equipment Details', count: 5, icon: <FolderOpen className="w-4 h-4" /> },
        { name: 'Measurements', count: 4, icon: <Ruler className="w-4 h-4" /> },
        { name: 'Results', count: 1, icon: <CheckSquare className="w-4 h-4" /> }
    ]);

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Template Manager</h1>
                    <div className="space-x-2">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                            <span>Import Word Template</span>
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
                        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Refresh</button>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6 bg-white rounded-lg shadow">
                    {/* Left Sidebar */}
                    <div className="col-span-1 border-r p-4">
                        <div className="mb-6">
                            <h2 className="font-semibold mb-2">Templates</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search templates"
                                    className="w-full pl-10 pr-4 py-2 border rounded-md"
                                />
                            </div>
                            <div className="mt-4 space-y-2">
                                {templates.map((template) => (
                                    <div
                                        key={template.name}
                                        className={`p-2 rounded-md cursor-pointer ${selectedTemplate.name === template.name ? 'bg-blue-50' : ''
                                            }`}
                                        onClick={() => setSelectedTemplate(template)}
                                    >
                                        <div className="font-medium">{template.name}</div>
                                        <div className="text-sm text-gray-500">
                                            Groups: {template.group} | Bookmarks: {template.bookmarks}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold">Bookmark Groups</h2>
                                <button className="text-blue-500 text-sm">+ New</button>
                            </div>
                            <div className="space-y-2">
                                {bookmarkGroups.map((group) => (
                                    <div
                                        key={group.name}
                                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                                    >
                                        <div className="flex items-center gap-2">
                                            {group.icon}
                                            <span>{group.name}</span>
                                        </div>
                                        <span className="text-gray-500">({group.count})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-3 p-4">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-4">Template Properties</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                                        <div>{selectedTemplate.name}</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location:</label>
                                        <div>{selectedTemplate.location}</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Created:</label>
                                        <div>{selectedTemplate.created}</div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status:</label>
                                        <div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                {selectedTemplate.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold">Bookmark Configuration</h3>
                                    <div className="space-x-2">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                            Scan Template
                                        </button>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                            Auto-Group
                                        </button>
                                    </div>
                                </div>
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left p-2">Bookmark Name</th>
                                            <th className="text-left p-2">Group</th>
                                            <th className="text-left p-2">Data Type</th>
                                            <th className="text-left p-2">Required</th>
                                            <th className="text-left p-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-2">InspectorName</td>
                                            <td className="p-2">
                                                <select className="border rounded p-1">
                                                    <option>Basic Info</option>
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <select className="border rounded p-1">
                                                    <option>Text</option>
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <input type="checkbox" checked className="rounded" />
                                            </td>
                                            <td className="p-2">
                                                <button className="text-blue-500">Configure</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4">Template Preview</h3>
                                <div className="border rounded-lg p-4 text-gray-500 text-center">
                                    [Word document preview with highlighted bookmarks]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateManager;