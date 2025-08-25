import React, { useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface DashboardAccessProps {
  children: React.ReactNode;
  onRequireSignIn?: () => void;
}

const DashboardAccess: React.FC<DashboardAccessProps> = ({ children, onRequireSignIn }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      toast({ title: "You must be signed in to access the dashboard.", });
      if (onRequireSignIn) onRequireSignIn();
      navigate("/", { replace: true, state: { from: location } });
    }
  }, [isAuthenticated, navigate, location, onRequireSignIn]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
};

export default DashboardAccess; 