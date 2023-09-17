export const ResumeService = {
    fetchResumeData: async () => {
        const response = await fetch('/api/resume-data');
        return await response.json();
    }
};


