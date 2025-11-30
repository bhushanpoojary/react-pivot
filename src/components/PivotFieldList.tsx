import { useState } from 'react';
import type { PivotField, PivotConfig } from '../lib/types';

export interface PivotFieldListProps {
  fields: PivotField[];
  config: PivotConfig;
  onConfigChange: (config: PivotConfig) => void;
  className?: string;
}

type DropZone = 'rows' | 'columns' | 'values' | 'filters' | 'available';

export function PivotFieldList({
  fields,
  config,
  onConfigChange,
  className = '',
}: PivotFieldListProps) {
  const [draggedFieldId, setDraggedFieldId] = useState<string | null>(null);

  // Get available fields (not assigned to any zone)
  const assignedFieldIds = new Set([
    ...config.rows,
    ...config.columns,
    ...config.values,
    ...(config.filters?.map(f => f.fieldId) || []),
  ]);
  const availableFields = fields.filter(f => !assignedFieldIds.has(f.id));

  const handleDragStart = (fieldId: string) => {
    setDraggedFieldId(fieldId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (zone: DropZone, e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedFieldId) return;

    const newConfig = { ...config };

    // Remove from all zones
    newConfig.rows = newConfig.rows.filter(id => id !== draggedFieldId);
    newConfig.columns = newConfig.columns.filter(id => id !== draggedFieldId);
    newConfig.values = newConfig.values.filter(id => id !== draggedFieldId);
    newConfig.filters = (newConfig.filters || []).filter(f => f.fieldId !== draggedFieldId);

    // Add to new zone
    if (zone === 'rows') {
      newConfig.rows.push(draggedFieldId);
    } else if (zone === 'columns') {
      newConfig.columns.push(draggedFieldId);
    } else if (zone === 'values') {
      newConfig.values.push(draggedFieldId);
    }
    // If zone is 'available' or 'filters', just leave it unassigned

    onConfigChange(newConfig);
    setDraggedFieldId(null);
  };

  const removeField = (fieldId: string, zone: DropZone) => {
    const newConfig = { ...config };
    
    if (zone === 'rows') {
      newConfig.rows = newConfig.rows.filter(id => id !== fieldId);
    } else if (zone === 'columns') {
      newConfig.columns = newConfig.columns.filter(id => id !== fieldId);
    } else if (zone === 'values') {
      newConfig.values = newConfig.values.filter(id => id !== fieldId);
    }
    
    onConfigChange(newConfig);
  };

  const renderFieldChip = (fieldId: string, zone: DropZone) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return null;

    const tooltipText = zone === 'available' 
      ? 'Drag to Rows, Columns, or Values' 
      : `Field: ${field.label}${field.aggregation ? ` (${field.aggregation})` : ''} • Drag to move`;

    return (
      <div
        key={fieldId}
        className="pivot-field-chip"
        draggable
        onDragStart={() => handleDragStart(fieldId)}
        title={tooltipText}
      >
        <span>{field.label}</span>
        {zone !== 'available' && (
          <button
            className="pivot-field-remove"
            onClick={() => removeField(fieldId, zone)}
            aria-label={`Remove ${field.label}`}
            title="Remove field"
          >
            ×
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={`pivot-field-list ${className}`}>
      <div className="pivot-drop-zones">
        <div
          className="pivot-drop-zone"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('rows', e)}
        >
          <div className="pivot-zone-label">Rows</div>
          <div className="pivot-zone-content">
            {config.rows.map(fieldId => renderFieldChip(fieldId, 'rows'))}
            {config.rows.length === 0 && (
              <div className="pivot-zone-placeholder">Drop row fields here</div>
            )}
          </div>
        </div>

        <div
          className="pivot-drop-zone"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('columns', e)}
        >
          <div className="pivot-zone-label">Columns</div>
          <div className="pivot-zone-content">
            {config.columns.map(fieldId => renderFieldChip(fieldId, 'columns'))}
            {config.columns.length === 0 && (
              <div className="pivot-zone-placeholder">Drop column fields here</div>
            )}
          </div>
        </div>

        <div
          className="pivot-drop-zone"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('values', e)}
        >
          <div className="pivot-zone-label">Values</div>
          <div className="pivot-zone-content">
            {config.values.map(fieldId => renderFieldChip(fieldId, 'values'))}
            {config.values.length === 0 && (
              <div className="pivot-zone-placeholder">Drop value fields here</div>
            )}
          </div>
        </div>
      </div>

      <div className="pivot-available-fields">
        <div className="pivot-zone-label">Available Fields</div>
        <div 
          className="pivot-zone-content"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop('available', e)}
        >
          {availableFields.map(field => (
            <div
              key={field.id}
              className="pivot-field-chip available"
              draggable
              onDragStart={() => handleDragStart(field.id)}
            >
              <span>{field.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
