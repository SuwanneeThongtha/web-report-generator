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
        { name: 'Basic Info', count: 3, icon: <FileText size={16} /> },
        { name: 'Equipment Details', count: 5, icon: <FolderOpen size={16} /> },
        { name: 'Measurements', count: 4, icon: <Ruler size={16} /> },
        { name: 'Results', count: 1, icon: <CheckSquare size={16} /> }
    ];

    return (
        <div className="container py-4">
            <h1 className="display-4 text-center mb-4">Template Manager</h1>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mb-4">
                <button className="btn btn-primary">
                    Import Word Template
                </button>
                <button className="btn btn-outline-secondary">
                    Save
                </button>
                <button className="btn btn-outline-secondary">
                    Refresh
                </button>
            </div>

            <div className="row g-4">
                {/* Main Content Column */}
                <div className="col-lg-8">
                    {/* Templates Section */}
                    <div className="card mb-4">
                        <div className="card-body">
                            <h2 className="card-title h4 mb-3">Templates</h2>
                            <div className="position-relative mb-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <Search size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search templates"
                                    />
                                </div>
                            </div>
                            <div className="list-group">
                                {templates.map((template) => (
                                    <button
                                        key={template.name}
                                        className={`list-group-item list-group-item-action ${selectedTemplate.name === template.name ? 'active' : ''
                                            }`}
                                        onClick={() => setSelectedTemplate(template)}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="mb-1">{template.name}</h6>
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
                                <h2 className="card-title h4 mb-0">Bookmark Groups</h2>
                                <button className="btn btn-link text-decoration-none">
                                    <Plus size={16} className="me-1" />
                                    New Group
                                </button>
                            </div>
                            <div className="list-group">
                                {bookmarkGroups.map((group) => (
                                    <div key={group.name} className="list-group-item list-group-item-action">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center gap-2">
                                                {group.icon}
                                                <span>{group.name}</span>
                                            </div>
                                            <span className="badge bg-secondary rounded-pill">
                                                {group.count}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Template Properties Sidebar */}
                <div className="col-lg-4">
                    {selectedTemplate && (
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title h4 mb-3">Template Properties</h2>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name:</label>
                                    <div>{selectedTemplate.name}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Location:</label>
                                    <div className="text-break">{selectedTemplate.location}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Created:</label>
                                    <div>{selectedTemplate.created}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Status:</label>
                                    <div>
                                        <span className="badge bg-success">
                                            {selectedTemplate.status}
                                        </span>
                                    </div>
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