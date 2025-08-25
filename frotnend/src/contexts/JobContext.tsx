
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { JobData, mockJobs } from '@/utils/mockData';

interface JobContextType {
  jobs: JobData[];
  currentJob: JobData | null;
  addJob: (job: JobData) => void;
  setCurrentJob: (job: JobData | null) => void;
  updateJob: (jobId: string, updates: Partial<JobData>) => void;
  removeJob: (jobId: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<JobData[]>(mockJobs);
  const [currentJob, setCurrentJob] = useState<JobData | null>(null);

  const addJob = (job: JobData) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  const updateJob = (jobId: string, updates: Partial<JobData>) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      )
    );
  };

  const removeJob = (jobId: string) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    if (currentJob?.id === jobId) {
      setCurrentJob(null);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        currentJob,
        addJob,
        setCurrentJob,
        updateJob,
        removeJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = (): JobContextType => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
