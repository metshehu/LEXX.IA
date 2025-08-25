import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CustomButton } from "@/components/ui/custom-button";
import { Heart, FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface CVFile {
  name: string;
}

const CandidateDetails = () => {
  const [uploadedCVs, setUploadedCVs] = useState<CVFile[]>([]);
  const [selectedCV, setSelectedCV] = useState<CVFile | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  let user = localStorage.getItem("name");

  // If no name is saved, use default
  if (!user) {
    user = "NardiTest";
    localStorage.setItem("name", user); // optionally save the default too
  }

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const res = await fetch(
          `https://cv-anallyzzer.onrender.com/get-cv/${user}/`,
        );
        const data = await res.json();
        setUploadedCVs(data.users.map((name: string) => ({ name })));
      } catch (error) {
        console.error("Failed to load CVs:", error);
      }
    };

    fetchCVs();
  }, [user]);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `https://cv-anallyzzer.onrender.com/api/upload/${user}/`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setUploadedCVs((prev) => [...prev, { name: data.filename }]);
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    }
  };

  const UploadModal = () =>
    uploadModalOpen ? (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg space-y-4">
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

  if (selectedCV) {
    return (
      <Card className="p-6 bg-pink-100/20 backdrop-blur-sm border-pink-200/20 flex flex-col">
        <div className="space-y-6">
          <h3 className="text-white text-xl font-semibold">
            CV File: {selectedCV.name}
          </h3>
          <CustomButton
            onClick={() => setSelectedCV(null)}
            className="mt-4"
            variant="secondary"
          >
            Back
          </CustomButton>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-pink-100/20 backdrop-blur-sm border-pink-200/20 flex flex-col">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white mb-4">Uploaded CVs</h3>
        <div className="space-y-0 max-h-[500px] overflow-y-auto pr-2">
          {uploadedCVs.map((file, index) => (
            <React.Fragment key={file.name}>
              <div
                onClick={() => setSelectedCV(file)}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300",
                  "hover:bg-pink-100/10",
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{file.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">
                    {file.name}
                  </h4>
                </div>
              </div>
              {index < uploadedCVs.length - 1 && (
                <Separator className="bg-pink-200/20" />
              )}
            </React.Fragment>
          ))}
        </div>
        <CustomButton onClick={() => setUploadModalOpen(true)}>
          Upload Files
        </CustomButton>
        <UploadModal />
      </div>
    </Card>
  );
};

export default CandidateDetails;
