export type Vacancy = {
    id: number,
    img: string;
    company_name: string;
    job: string;
    path: string;
    detail_jobs: {
        location: string;
        time: string;
        time_post: string;
    }[];
    date: string;
    salary?: string;
    desc: string;
    category: string;
};

export type CategoryType = {
    title: string;
    path: string;
    icon: React.ReactNode;
}

export type JobKey = 'commission' | 'freelance' | 'fullTime' | 'internship' | 'partTime' | 'volunteer' | 'Scholarship';
export type JobCategoriesKey = 'construction' | 'design' | 'education' | 'finance' | 'healthcare' | 'SosialServices';