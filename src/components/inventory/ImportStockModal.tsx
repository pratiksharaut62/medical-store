import React, { useState, useRef } from "react";
import { Upload, X, FileText, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ImportStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: (file: File) => void;
}

export function ImportStockModal({ isOpen, onClose, onImportSuccess }: ImportStockModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file: File) => {
    setError(null);
    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV or Excel file (.csv, .xlsx)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File size exceeds 5MB limit");
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Execute import logic here
      if (onImportSuccess) onImportSuccess(selectedFile);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Import Stock Inventory</h2>
            <p className="text-xs text-text-secondary">
              Upload CSV or Excel file containing batch details, expiry dates, and MRPs.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-text-secondary hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-text-secondary"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".csv, .xlsx, .xls"
            onChange={handleChange}
            className="hidden"
          />

          {!selectedFile ? (
            <>
              <div className="mb-3 rounded-full bg-slate-100 p-3 dark:bg-slate-800">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="mb-1 text-sm font-medium text-text-primary">
                Click to upload or drag and drop
              </p>
              <p className="mb-4 text-xs text-text-secondary">
                Accepts .csv or .xlsx (Max size: 5MB)
              </p>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                Select File
              </Button>
            </>
          ) : (
            <div className="flex w-full items-center justify-between rounded-lg border border-border bg-background p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="truncate text-left">
                  <p className="truncate text-sm font-medium text-text-primary">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Error Messaging */}
        {error && (
          <div className="mt-3 flex items-center gap-2 text-xs text-red-500">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between">
          <a
            href="/templates/stock_import_template.csv"
            download
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <Download size={14} />
            Download Medical Stock Template
          </a>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={!selectedFile}
              onClick={handleUpload}
            >
              Upload & Import
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}