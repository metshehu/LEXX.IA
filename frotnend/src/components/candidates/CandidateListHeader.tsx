
import React from "react";
import { ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CandidateListHeaderProps {
  jobTitle: string;
  candidateCount: number;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const CandidateListHeader: React.FC<CandidateListHeaderProps> = ({
  jobTitle,
  candidateCount,
  showFilters,
  setShowFilters,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-primary/5 text-primary px-2 py-0.5 text-xs font-normal">
            Job Posting
          </Badge>
          <h2 className="text-xl font-semibold">{jobTitle}</h2>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {candidateCount} matching candidates
        </p>
      </div>
      
      <div className="flex items-center gap-2 self-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={cn(showFilters && "bg-accent/50", "gap-1.5")}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        
        <Select
          defaultValue={sortBy}
          onValueChange={setSortBy}
        >
          <SelectTrigger className="w-[140px] h-9 text-sm">
            <ArrowUpDown className="h-4 w-4 mr-1.5" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="match">Match Score</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CandidateListHeader;
