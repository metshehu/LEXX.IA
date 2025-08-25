import React, { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, FileText, ChevronRight, Brain, User } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";
import ChatInterface from "@/components/chat/ChatInterface";
import CandidateList from "@/components/candidates/CandidateList";
import { Candidate } from "@/utils/mockData";

interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [jobData, setJobData] = useState<any | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [canHover, setCanHover] = useState(true);
  const lastHoveredRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const handleJobExtracted = (data: any) => {
    setJobData(data);
    // Automatically switch to candidates tab after job is extracted
    setTimeout(() => {
      setActiveTab("candidates");
    }, 1000);
  };

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleScroll = () => {
setHoveredImage(null);
    setCanHover(false);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setCanHover(true);
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    const newThumbnails: string[] = [];

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const img = new Image();
          img.onload = () => {
            // Create thumbnail
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const maxWidth = 854; // 480p width
            const maxHeight = 480; // 480p height
            const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
            newThumbnails.push(thumbnailUrl);
            setThumbnails(prev => [...prev, thumbnailUrl]);
            newImages.push(e.target.result as string);
            setUploadedImages(prev => [...prev, e.target.result as string]);
          };
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageClick = () => {
    setHoveredImage(null);
    setCanHover(false);
    setTimeout(() => {
      setCanHover(true);
      if (lastHoveredRef.current !== null) {
        setHoveredImage(lastHoveredRef.current);
      }
    }, 1500);
  };

  const handleMouseEnter = (index: number) => {
    lastHoveredRef.current = index;
    if (!canHover) return;
    setHoveredImage(index);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
    lastHoveredRef.current = null;
  };

  return (
    <div className={className}>
      <div className="glass-card rounded-xl overflow-hidden shadow-md border border-border/40 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-16">
            <h1 className="text-3xl font-bold mb-1">AI Recruitment Dashboard</h1>
            <p className="text-muted-foreground">
              Use natural language to describe job requirements and find matching candidates
            </p>
          </div>
          <img 
            src="/kurv.png" 
            alt="AI Recruitment" 
            className="h-32 w-32 object-contain animate-slide-up"
            style={{ animationDelay: '0.2s' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="glass">
                <TabsTrigger value="chat" className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="candidates" className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>Candidates</span>
                </TabsTrigger>
              </TabsList>

              <div className="text-sm text-muted-foreground">
                {jobData ? (
                  <span className="text-primary font-medium">Job requirements extracted ✓</span>
                ) : (
                  "Describe your job to see matching candidates"
                )}
              </div>
            </div>

            <TabsContent value="chat" className="mt-0 space-y-4">
              <ChatInterface onJobExtracted={handleJobExtracted} />
            </TabsContent>

            <TabsContent value="candidates" className="mt-0">
              {jobData ? (
                <CandidateList 
                  jobTitle={jobData.title}
                  onSelectCandidate={handleSelectCandidate}
                />
              ) : (
                <Card className="p-8 text-center glass-card border-[#39195A]">
                  <CardHeader>
                    <Brain className="h-12 w-12 mx-auto text-[#9B58FE] opacity-50 mb-4" />
                    <CardTitle className="text-white font-semibold">No Job Description Yet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      Use the Chat interface to describe your job position in natural language and let the AI extract requirements.
                    </p>
                    <CustomButton 
                      onClick={() => setActiveTab("chat")}
                      className="mx-auto bg-[#9B58FE] text-white hover:bg-[#7700ff] transition-colors"
                    >
                      Go to Chat
                      <ChevronRight className="ml-1 h-4 w-4 text-white" />
                    </CustomButton>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col glass-card overflow-hidden">
            <CardHeader className="bg-[#9B58FE]/10 border-b border-[#39195A]">
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2 text-[#9B58FE]" />
                <span className="text-gray-800 font-semibold">Candidate Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 flex flex-col h-[600px]">
              {selectedCandidate ? (
                <div className="p-6 space-y-4 h-full">
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-border">
                      {selectedCandidate.imageUrl ? (
                        <img
                          src={selectedCandidate.imageUrl}
                          alt={selectedCandidate.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-semibold text-muted-foreground">
                          {selectedCandidate.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">
                        {selectedCandidate.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedCandidate.title}
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-border/40" />

                  <div>
                    <h4 className="font-medium mb-2">Profile Summary</h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedCandidate.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Education</h4>
                    <p className="text-muted-foreground text-sm">
                      {selectedCandidate.education}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Skills</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      {selectedCandidate.skills.map((skill) => (
                        <li key={skill}>• {skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Programming Languages</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      {selectedCandidate.languages.map((language) => (
                        <li key={language}>• {language}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 flex flex-col space-y-2">
                    <CustomButton>Schedule Interview</CustomButton>
                    <CustomButton variant="outline">Download Resume</CustomButton>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col flex-1 justify-between h-full p-8 text-center">
                  {uploadedImages.length === 0 && (
                    <div className="flex-1 flex items-center justify-center">
                      <div>
                        <Users className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-30" />
                        <h3 className="text-lg font-medium mb-2">No Candidate Selected</h3>
                        <p className="text-muted-foreground">
                          Select a candidate from the list to view their detailed profile
                        </p>
                      </div>
                    </div>
                  )}
                  <div>
                    {uploadedImages.length > 0 && (
                      <div 
                        className="mb-4 h-[400px] overflow-y-auto pr-4"
                        onScroll={handleScroll}
                      >
                        <div className="grid grid-cols-3 gap-4">
                          {uploadedImages.map((img, index) => (
                            <div
                              key={index}
                              className="relative"
                              onMouseEnter={() => handleMouseEnter(index)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <img
                                src={thumbnails[index] || img}
                                alt={`Uploaded Resume ${index + 1}`}
                                className="w-[100px] h-[100px] object-cover rounded-lg cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {hoveredImage !== null && (
                      <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(hoveredImage)}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleImageClick}
                      >
                        <img
                          src={uploadedImages[hoveredImage]}
                          alt={`Full Uploaded Resume ${hoveredImage + 1}`}
                          className="max-w-[80%] max-h-[80%] object-contain shadow-2xl"
                        />
                      </div>
                    )}
                    <Separator className="mb-8" />
                    <div className="flex gap-4 justify-center">
                      <CustomButton
                        onClick={() => fileInputRef.current?.click()}
                        type="button"
                        className="bg-[#9B58FE] text-white hover:bg-[#7700ff] transition-colors"
                      >
                        Upload Resume
                      </CustomButton>
                      {uploadedImages.length > 0 && (
                        <CustomButton
                          onClick={() => {
                            setUploadedImages([]);
                            setThumbnails([]);
                          }}
                          type="button"
                          className="bg-transparent text-[#9B58FE] hover:bg-[#9B58FE]/10 transition-colors"
                        >
                          Clear
                        </CustomButton>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
