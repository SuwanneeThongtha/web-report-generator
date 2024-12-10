import React, { useState } from 'react';
import { Search, FileText, FolderOpen, Ruler, CheckSquare } from 'lucide-react';

const TemplateManager = () => {
    const [templates, setTemplates] = useState([
        {
            name: 'Equipment_Inspection.docx',
            location: 'C:\\templates\\Equipment_Inspection.docx',
            created: '2024-12-05',
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

    const [selectedBookmark, setSelectedBookmark] = useState({
        name: 'InspectorName',
        group: 'Basic Info',
        dataType: 'Text',
        required: true
    });

    const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

    const bookmarkGroups = [
        { name: 'Basic Info', count: 3, icon: <FileText size={16} /> },
        { name: 'Equipment Details', count: 5, icon: <FolderOpen size={16} /> },
        { name: 'Measurements', count: 4, icon: <Ruler size={16} /> },
        { name: 'Results', count: 3, icon: <CheckSquare size={16} /> }
    ];

    return (
        <div className="container-fluid p-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4">
                <h1 className="h4 mb-0">Template Manager</h1>
                <div className="d-flex gap-2">
                    <button className="btn btn-primary btn-sm">
                        New Inspection Report
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <i className="bi bi-file-earmark-plus me-1"></i>
                        Import Word Template
                    </button>
                    <button className="btn btn-outline-primary btn-sm">Save</button>
                    <button className="btn btn-outline-primary btn-sm">Refresh</button>
                </div>
            </div>

            <div className="row g-4">
                {/* Left Sidebar */}
                <div className="col-3">
                    {/* Templates Section */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Templates</h5>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <Search size={14} />
                                </span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    placeholder="Search templates..."
                                />
                            </div>
                            <div className="list-group list-group-flush">
                                {templates.map((template) => (
                                    <button
                                        key={template.name}
                                        className={`list-group-item list-group-item-action ${selectedTemplate.name === template.name ? 'active' : ''
                                            }`}
                                        onClick={() => setSelectedTemplate(template)}
                                    >
                                        <div className="d-flex flex-column">
                                            <small>{template.name}</small>
                                            <small className="text-muted">
                                                Groups: {template.group} | Bookmarks: {template.bookmarks}
                                            </small>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bookmark Groups */}
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title mb-0">Bookmark Groups</h5>
                                <button className="btn btn-link btn-sm p-0">+ New</button>
                            </div>
                            <div className="list-group list-group-flush">
                                {bookmarkGroups.map((group) => (
                                    <div key={group.name} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                            {group.icon}
                                            <span className="small">{group.name}</span>
                                        </div>
                                        <span className="badge bg-secondary rounded-pill">
                                            {group.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="col-9">
                    {/* Template Properties */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Template Properties</h5>
                            <div className="row">
                                <div className="col-3">
                                    <label className="form-label fw-bold">Name:</label>
                                    <div>{selectedTemplate.name}</div>
                                </div>
                                <div className="col-5">
                                    <label className="form-label fw-bold">Location:</label>
                                    <div>{selectedTemplate.location}</div>
                                </div>
                                <div className="col-2">
                                    <label className="form-label fw-bold">Created:</label>
                                    <div>{selectedTemplate.created}</div>
                                </div>
                                <div className="col-2">
                                    <label className="form-label fw-bold">Status:</label>
                                    <div>
                                        <span className="badge bg-success">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bookmark Configuration */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title mb-0">Bookmark Configuration</h5>
                                <div>
                                    <button className="btn btn-primary btn-sm me-2">Scan Template</button>
                                    <button className="btn btn-outline-primary btn-sm">Auto-Group</button>
                                </div>
                            </div>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Bookmark Name</th>
                                        <th>Group</th>
                                        <th>Data Type</th>
                                        <th>Required</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{selectedBookmark.name}</td>
                                        <td>
                                            <select className="form-select form-select-sm" value={selectedBookmark.group}>
                                                <option>Basic Info</option>
                                                <option>Equipment Details</option>
                                                <option>Measurements</option>
                                                <option>Results</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select className="form-select form-select-sm" value={selectedBookmark.dataType}>
                                                <option>Text</option>
                                                <option>Number</option>
                                                <option>Date</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedBookmark.required}
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary btn-sm">Configure</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Template Preview */}
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Template Preview</h5>
                            <div className="border rounded p-3 bg-light">
                                [Word document preview with highlighted bookmarks]
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateManager;