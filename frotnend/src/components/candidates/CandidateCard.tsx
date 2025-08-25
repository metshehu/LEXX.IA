
import React from "react";
import { BarChart3, MapPin, Clock, Code, ExternalLink, Star, StarHalf, StarOff } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CustomButton } from "@/components/ui/custom-button";
import { Candidate } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: Candidate;
  onSelect?: (candidate: Candidate) => void;
  highlighted?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onSelect,
  highlighted = false
}) => {
  const renderSkillBadges = (skills: string[], limit = 4) => {
    const displaySkills = skills.slice(0, limit);
    const remaining = skills.length - limit;

    return (
      <>
        {displaySkills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
        {remaining > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs cursor-help">
                  +{remaining} more
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="p-2">
                <div className="text-xs">
                  {skills.slice(limit).join(", ")}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </>
    );
  };

  const renderMatchScore = (score: number) => {
    // Generates stars based on match score
    const fullStars = Math.floor(score / 20);
    const hasHalfStar = score % 20 >= 10;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />
        ))}
        {hasHalfStar && <StarHalf key="half-star" className="h-4 w-4 text-primary" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
        ))}
      </div>
    );
  };

  const truncateSummary = (text: string, length = 180) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  };

  return (
    <Card className={cn(
      "glass-card overflow-hidden transition-all duration-300 hover:shadow-md",
      highlighted && "ring-2 ring-primary/50 shadow-lg"
    )}>
      <CardHeader className="p-4 flex flex-row items-center space-x-4 bg-secondary/30 bg-noise">
        <div className="relative rounded-full overflow-hidden w-14 h-14 border-2 border-background bg-muted flex items-center justify-center">
          {candidate.imageUrl ? (
            <img
              src={candidate.imageUrl}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold text-muted-foreground">
              {candidate.name.charAt(0)}
            </span>
          )}
          
          <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary border-2 border-background" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg truncate">{candidate.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
        </div>
        
        <div className="flex flex-col items-end">
          <Badge 
            variant={candidate.matchScore > 85 ? "default" : "secondary"}
            className={cn(
              "text-xs font-medium mb-1",
              candidate.matchScore > 85 ? "text-primary-foreground" : "text-foreground/70"
            )}
          >
            {candidate.matchScore}% Match
          </Badge>
          {renderMatchScore(candidate.matchScore)}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>{candidate.location}{candidate.remote ? " (Remote)" : ""}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{candidate.yearsOfExperience} years exp.</span>
          </div>
          
          <div className="flex items-center">
            <Code className="h-3.5 w-3.5 mr-1" />
            <span>{candidate.languages.slice(0, 3).join(", ")}</span>
          </div>
        </div>
        
        <div className="text-sm">
          <p className="text-muted-foreground mb-1">
            {truncateSummary(candidate.summary)}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {renderSkillBadges(candidate.skills)}
        </div>
        
        <div className="pt-2 flex justify-between items-center gap-2">
          <CustomButton
            variant="outline"
            size="sm"
            className="flex-1"
          >
            View Profile
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </CustomButton>
          
          <CustomButton
            onClick={() => onSelect && onSelect(candidate)}
            size="sm"
            className="flex-1"
          >
            Select Candidate
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateCard;
