import React, { Component } from 'react';
import { Search, FileText, Settings, Ruler, CheckSquare } from 'lucide-react';

class NewInspectionReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                template: 'Equipment Inspection',
                client: 'ABC Company',
                reference: 'INS-2024-001',
                inspectorName: 'John Smith',
                inspectionDate: '',
                serialNumber: '',
                pressure: '',
                status: 'Pass',
                comments: ''
            },
            templates: ['Equipment Inspection', 'Safety Check', 'Maintenance Report'],
            clients: ['ABC Company', 'XYZ Corporation', 'Acme Industries'],
            validation: {
                inspectorName: true,
                inspectionDate: true,
                serialNumber: true,
                pressure: true
            },
            isDirty: false,
            lastSaved: null
        };

        // Binding methods
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateField = this.validateField.bind(this);
        this.saveDraft = this.saveDraft.bind(this);
        this.autoSave = this.autoSave.bind(this);
    }

    componentDidMount() {
        // Set up auto-save timer
        this.autoSaveTimer = setInterval(this.autoSave, 30000);

        // Load any saved draft data
        this.loadSavedDraft();
    }

    componentWillUnmount() {
        // Clear auto-save timer
        clearInterval(this.autoSaveTimer);
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: value
            },
            isDirty: true
        }), () => {
            this.validateField(name, value);
        });
    }

    validateField(fieldName, value) {
        let isValid = true;
        const validationRules = {
            serialNumber: /^[A-Z]{3}-\d{3}-\d{3}$/,
            pressure: value => !isNaN(value) && value >= 0 && value <= 1000
        };

        if (validationRules[fieldName]) {
            if (typeof validationRules[fieldName] === 'function') {
                isValid = validationRules[fieldName](value);
            } else {
                isValid = validationRules[fieldName].test(value);
            }
        }

        this.setState(prevState => ({
            validation: {
                ...prevState.validation,
                [fieldName]: isValid
            }
        }));

        return isValid;
    }

    validateForm() {
        const { formData } = this.state;
        let isValid = true;

        // Required fields
        const requiredFields = ['inspectorName', 'inspectionDate', 'serialNumber'];
        requiredFields.forEach(field => {
            if (!formData[field]) {
                isValid = false;
                this.setState(prevState => ({
                    validation: {
                        ...prevState.validation,
                        [field]: false
                    }
                }));
            }
        });

        // Validate all fields
        Object.keys(formData).forEach(field => {
            if (!this.validateField(field, formData[field])) {
                isValid = false;
            }
        });

        return isValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.validateForm()) {
            // Submit form data to backend
            console.log('Submitting report:', this.state.formData);
        }
    }

    async autoSave() {
        if (this.state.isDirty) {
            await this.saveDraft();
        }
    }

    async saveDraft() {
        try {
            // Simulate API call to save draft
            await new Promise(resolve => setTimeout(resolve, 500));

            this.setState({
                isDirty: false,
                lastSaved: new Date()
            });

            console.log('Draft saved:', this.state.formData);
        } catch (error) {
            console.error('Error saving draft:', error);
        }
    }

    async loadSavedDraft() {
        try {
            // Simulate API call to load draft
            await new Promise(resolve => setTimeout(resolve, 500));
            // Implementation would load actual saved draft data
        } catch (error) {
            console.error('Error loading draft:', error);
        }
    }

    render() {
        const { formData, validation } = this.state;

        return (
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h3">New Inspection Report</h1>
                    <div className="btn-group">
                        <button
                            className="btn btn-success"
                            onClick={this.handleSubmit}
                        >
                            Generate Report
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={this.saveDraft}
                        >
                            Save Draft
                        </button>
                        <button className="btn btn-outline-primary">Preview</button>
                    </div>
                </div>

                <div className="row">
                    {/* Form Section */}
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Report Setup</h5>

                                <div className="mb-3">
                                    <label className="form-label">Select Template</label>
                                    <select
                                        className="form-select"
                                        name="template"
                                        value={formData.template}
                                        onChange={this.handleInputChange}
                                    >
                                        {this.state.templates.map(template => (
                                            <option key={template} value={template}>
                                                {template}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Select Client</label>
                                    <select
                                        className="form-select"
                                        name="client"
                                        value={formData.client}
                                        onChange={this.handleInputChange}
                                    >
                                        {this.state.clients.map(client => (
                                            <option key={client} value={client}>
                                                {client}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="btn btn-link btn-sm mt-1">View Client Details</button>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Report Reference</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.reference}
                                        readOnly
                                    />
                                    <small className="text-muted">Auto-generated from database</small>
                                </div>

                                <hr />

                                <h6 className="mb-3">Basic Info</h6>
                                <div className="mb-3">
                                    <label className="form-label required">Inspector Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${!validation.inspectorName ? 'is-invalid' : ''}`}
                                        name="inspectorName"
                                        value={formData.inspectorName}
                                        onChange={this.handleInputChange}
                                    />
                                    <small className="text-muted">From database user profile</small>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label required">Inspection Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${!validation.inspectionDate ? 'is-invalid' : ''}`}
                                        name="inspectionDate"
                                        value={formData.inspectionDate}
                                        onChange={this.handleInputChange}
                                    />
                                </div>

                                <h6 className="mb-3">Equipment Details</h6>
                                <div className="mb-3">
                                    <label className="form-label required">Serial Number</label>
                                    <input
                                        type="text"
                                        className={`form-control ${!validation.serialNumber ? 'is-invalid' : ''}`}
                                        name="serialNumber"
                                        value={formData.serialNumber}
                                        onChange={this.handleInputChange}
                                    />
                                    <small className="text-muted">Format: XXX-000-000</small>
                                </div>

                                <h6 className="mb-3">Measurements</h6>
                                <div className="mb-3">
                                    <label className="form-label required">Pressure (PSI)</label>
                                    <input
                                        type="number"
                                        className={`form-control ${!validation.pressure ? 'is-invalid' : ''}`}
                                        name="pressure"
                                        value={formData.pressure}
                                        onChange={this.handleInputChange}
                                    />
                                    <small className="text-muted">Range: 0-1000 PSI</small>
                                </div>

                                <h6 className="mb-3">Results</h6>
                                <div className="mb-3">
                                    <label className="form-label required">Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={formData.status}
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="Pass">Pass</option>
                                        <option value="Fail">Fail</option>
                                        <option value="Warning">Warning</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Comments</label>
                                    <textarea
                                        className="form-control"
                                        name="comments"
                                        value={formData.comments}
                                        onChange={this.handleInputChange}
                                        rows="3"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="col-8">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title mb-0">Report Preview</h5>
                                    <button className="btn btn-primary btn-sm">Print Preview</button>
                                </div>
                                <div className="border rounded p-3 bg-light" style={{ minHeight: '600px' }}>
                                    [Live preview of the report with entered data]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewInspectionReport;