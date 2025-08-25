
import React, { useState } from "react";
import { Candidate, mockCandidates } from "@/utils/mockData";
import CandidateCard from "./CandidateCard";
import CandidateListHeader from "./CandidateListHeader";
import SearchInput from "./SearchInput";
import SkillsFilter from "./SkillsFilter";
import EmptyState from "./EmptyState";

interface CandidateListProps {
  jobTitle?: string;
  candidates?: Candidate[];
  onSelectCandidate?: (candidate: Candidate) => void;
}

const CandidateList: React.FC<CandidateListProps> = ({
  jobTitle = "Senior React Developer",
  candidates = mockCandidates,
  onSelectCandidate
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("match");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [highlightedCandidateId, setHighlightedCandidateId] = useState<string | null>(null);
  
  // All unique skills from all candidates
  const allSkills = Array.from(
    new Set(candidates.flatMap((candidate) => candidate.skills))
  );

  // Filter candidates based on search term and selected skills
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      searchTerm === "" ||
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.every((skill) => candidate.skills.includes(skill));

    return matchesSearch && matchesSkills;
  });

  // Sort candidates based on selected sort option
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchScore - a.matchScore;
      case "experience":
        return b.yearsOfExperience - a.yearsOfExperience;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.matchScore - a.matchScore;
    }
  });

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };
  
  const clearFilters = () => {
    setSelectedSkills([]);
  };
  
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedSkills([]);
  };

  const handleSelectCandidate = (candidate: Candidate) => {
    setHighlightedCandidateId(candidate.id);
    if (onSelectCandidate) {
      onSelectCandidate(candidate);
    }
  };

  return (
    <div className="space-y-4">
      <CandidateListHeader 
        jobTitle={jobTitle}
        candidateCount={filteredCandidates.length}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <SearchInput 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {showFilters && (
        <SkillsFilter 
          allSkills={allSkills}
          selectedSkills={selectedSkills}
          toggleSkillFilter={toggleSkillFilter}
          clearFilters={clearFilters}
        />
      )}
      
      {filteredCandidates.length === 0 ? (
        <EmptyState 
          hasFilters={searchTerm !== "" || selectedSkills.length > 0}
          clearAllFilters={clearAllFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onSelect={handleSelectCandidate}
              highlighted={candidate.id === highlightedCandidateId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateList;
