
import React from "react";
import { Filter, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SkillsFilterProps {
  allSkills: string[];
  selectedSkills: string[];
  toggleSkillFilter: (skill: string) => void;
  clearFilters: () => void;
}

const SkillsFilter: React.FC<SkillsFilterProps> = ({
  allSkills,
  selectedSkills,
  toggleSkillFilter,
  clearFilters,
}) => {
  return (
    <div className="glass-card p-4 rounded-lg animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Filter Candidates</h3>
        </div>
        
        {selectedSkills.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear Filters
          </Button>
        )}
      </div>
      
      <Separator className="bg-border/40" />
      
      <div>
        <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-muted-foreground" />
          Skills
        </h4>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all",
                !selectedSkills.includes(skill) && "hover:bg-accent/50"
              )}
              onClick={() => toggleSkillFilter(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsFilter;
