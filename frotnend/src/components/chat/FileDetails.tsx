import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CustomButton } from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import { Plus, MoreVertical } from "lucide-react"; // 3-dot menu icon

interface UploadedFile {
    name: string;
}
interface FileDetailsProps {
        onReviewFile: (fileName: string) => void;
}

    const FileDetails: React.FC<FileDetailsProps> = ({ onReviewFile }) => {

    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string>("normal");

    let user = localStorage.getItem("name");
    if (!user) {
        user = "qerimqerimAi";
        localStorage.setItem("name", user);
    }

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const res = await fetch(
                    `http://127.0.0.1:8000/get-files/${user}/${fileType}`,
                );
                const data = await res.json();
                setUploadedFiles(data.users.map((name: string) => ({ name })));
            } catch (error) {
                console.error("Failed to load files:", error);
            }
        };

        fetchFiles();
    }, [user, fileType]);

    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch(
                `http://127.0.0.1:8000/api/upload/${user}/${fileType}`,
                { method: "POST", body: formData },
            );

            const data = await res.json();

            if (res.ok) {
                setUploadedFiles((prev) => [...prev, { name: data.filename }]);
            } else {
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed. Please try again.");
        }
    };
    const handleReviewFile= async (fileName: string) => {
            onReviewFile(fileName); // 👈 send filename to ChatPage

            setOpenMenu(null);
        // You can add API call here to delete from server
    };



    const handleDeleteFile = async (fileName: string) => {
        const response = await fetch(
            `http://127.0.0.1:8000/api/delete/${user}/${fileName}/${fileType}/`,
            {
                method: "DELETE",
            },
        );

        if (response.ok) {
            setUploadedFiles((prev) => prev.filter((f) => f.name !== fileName));

            setOpenMenu(null);
        } else {
            const error = await response.json();
            console.error("Delete failed:", error);
        }
        // You can add API call here to delete from server
    };

    const UploadModal = () =>
        uploadModalOpen ? (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                <Card className="w-full max-w-md p-6 bg-white shadow-lg space-y-4">
                    <div className="space-y-4">
                        <label className="block text-gray-700 font-medium text-center">
                            Choose a file to upload
                        </label>

                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleFileUpload(file);
                                    setUploadModalOpen(false);
                                }
                            }}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                        <CustomButton
                            variant="secondary"
                            onClick={() => setUploadModalOpen(false)}
                        >
                            Cancel
                        </CustomButton>
                    </div>
                </Card>
            </div>
        ) : null;

    return (
        <Card className="p-0 bg-white border-gray-200 h-full overflow-hidden rounded-none">
            {/* Header */}
            <div className="bg-[#A32B3D] flex justify-between  p-4">
                <h3 className="text-xl font-semibold text-white">Uploaded Files</h3>
                <button
                    className="top-2 right-2 p-1 rounded-full hover:bg-gray-200"
                    onClick={() => {
                        if (fileType == "normal") {
                            setFileType("akt");
                        } else {
                            setFileType("normal");
                        }
                    }}
                >
                    <MoreVertical className="w-5 h-5 text-black-600" />
                </button>
            </div>

            {/* Scrollable content */}
            <div className="p-4 grid grid-cols-2 gap-4 h-full overflow-y-auto">
                {/* Add button */}
                <div
                    onClick={() => {
                        setUploadModalOpen(true);
                    }}
                    className="bg-[#A32B3D] text-white rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#8E2332] transition-colors h-28"
                >
                    <Plus size={28} />
                    <span className="text-xs mt-1">Add File</span>
                </div>

                {/* Files */}
                {uploadedFiles.map((file) => {
                    const isPDF = file.name.toLowerCase().includes(".pdf");
                    const isWord = file.name.toLowerCase().includes(".docx");

                    return (
                        <div
                            key={file.name}
                            className={cn(
                                "relative rounded-lg p-3 flex flex-col items-center justify-center bg-gray-50 shadow hover:shadow-lg transition cursor-pointer h-28",
                            )}
                        >
                            {/* 3-dot button */}
                            <button
                                onClick={() =>
                                    setOpenMenu(openMenu === file.name ? null : file.name)
                                }
                                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
                            >
                                <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Dropdown */}
                            {openMenu === file.name && (
                                <div className="absolute top-10 right-2 w-32 bg-white border rounded-lg shadow-lg z-50">
                                    <button
                                        onClick={() => handleReviewFile(file.name)}
                                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                    >
                                        Review File
                                    </button>
                                    <button
                                        onClick={() => handleDeleteFile(file.name)}
                                        className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                    >
                                        Delete File
                                    </button>
                                </div>
                            )}
                            {/* File Icon */}
                            {isPDF && (
                                <img
                                    src="/PdfLogo.png"
                                    alt="PDF"
                                    className="w-8 h-8 object-contain"
                                />
                            )}
                            {isWord && (
                                <img
                                    src="/WordLogo.png"
                                    alt="Word"
                                    className="w-8 h-8 object-contain"
                                />
                            )}

                            {/* File Name */}
                            <p className="mt-2 text-xs text-black text-center truncate w-full">
                                {file.name}
                            </p>
                        </div>
                    );
                })}
            </div>

            <UploadModal />
        </Card>
    );
};

export default FileDetails;
