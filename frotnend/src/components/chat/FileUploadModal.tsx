// components/FileUploadModal.tsx
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog } from "@radix-ui/react-dialog";
import { Card } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ open, onClose, onUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
      onClose();
    }
  }, [onUpload, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg space-y-4">
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center cursor-pointer">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-gray-600">Drop the file here...</p>
            ) : (
              <p className="text-gray-600">Drag and drop a file here, or click to select one</p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <CustomButton variant="secondary" onClick={onClose}>
              Cancel
            </CustomButton>
          </div>
        </Card>
      </div>
    </Dialog>
  );
};

