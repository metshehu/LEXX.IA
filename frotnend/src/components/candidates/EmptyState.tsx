import React from "react";
import { Users } from "lucide-react";
import { CustomButton } from "@/components/ui/custom-button";

interface EmptyStateProps {
  hasFilters: boolean;
  clearAllFilters: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, clearAllFilters }) => {
  return (
    <div className="text-center py-12 glass-card rounded-lg border-[#39195A]">
      <Users className="h-10 w-10 text-[#9B58FE] mx-auto mb-4 opacity-50" />
      <h3 className="text-lg font-semibold text-white mb-2">No matching candidates</h3>
      <p className="text-muted-foreground mb-6">
        Try adjusting your search criteria or filters
      </p>
      {hasFilters && (
        <CustomButton
          variant="outline"
          className="bg-[#9B58FE]/10 text-[#9B58FE] hover:bg-[#9B58FE]/20 border-[#39195A] transition-colors"
          onClick={clearAllFilters}
        >
          Clear All Filters
        </CustomButton>
      )}
    </div>
  );
};

export default EmptyState;
