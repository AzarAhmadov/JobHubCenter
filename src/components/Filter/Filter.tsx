'use client'

import React, { useEffect, useState } from "react";
import styles from './Filter.module.css'
import { categories, jobType } from "@/constants/data";
import { useScopedI18n } from "@/locales/client";
import { getCategory, getLand } from "@/lib/utils/renderFunction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter: React.FC = () => {

    const f = useScopedI18n('filter')
    const t = useScopedI18n('categories')

    const [activeSection, setActiveSection] = useState<number | null>(0);
    const [checkedJobType, setCheckedJobType] = useState<string | null>(null);
    const [checkedCategory, setCheckedCategory] = useState<string | null>(null);
    const [checkedSalary, setCheckedSalary] = useState<boolean | any>(false);

    const toggleSection = (sectionIndex: number) => {
        setActiveSection(activeSection === sectionIndex ? null : sectionIndex);
    };

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const typeParam = params.get('type');
        const categoryParam = params.get('category');
        const salariedParam = params.get('salaried');
        setCheckedJobType(typeParam);
        setCheckedCategory(categoryParam);
        setCheckedSalary(salariedParam)
    }, [searchParams]);


    const handleJobTypeChange = (jobTypeLabel: string) => {
        if (checkedJobType === jobTypeLabel) {
            setCheckedJobType(null);
            router.push(pathname);
        } else {
            setCheckedJobType(jobTypeLabel);
            router.push(pathname + '?' + createQueryString('type', jobTypeLabel));
        }
    }

    const handleCategoryChange = (categoryLabel: string) => {
        if (checkedCategory === categoryLabel) {
            setCheckedCategory(null);
            router.push(pathname);
        } else {
            setCheckedCategory(categoryLabel);
            router.push(pathname + '?' + createQueryString('category', categoryLabel));
        }
    }

    const handleSalaryChange = () => {
        const newCheckedSalary = !checkedSalary;
        setCheckedSalary(newCheckedSalary);
        if (!newCheckedSalary) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('salaried');
            router.push(pathname + (params.toString() ? '?' + params.toString() : ''));
        } else {
            router.push(pathname + '?' + createQueryString('salaried', String(newCheckedSalary)));
        }
    }

    const handleReset = () => {
        setCheckedJobType(null);
        setCheckedCategory(null);
        setCheckedSalary(false);
        router.push(pathname)
    }

    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <div className={`${styles.section} ${activeSection === 0 ? styles.active : ''}`}>
                    <h3 onClick={() => toggleSection(0)} className={`${styles.title} font-poppions-light`}>
                        {f('job_type')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                    </h3>

                    <ul className={`${styles.list} font-poppions-thin`}>
                        {
                            jobType.map((el, idx) => (
                                <li key={idx}>
                                    <input
                                        type="checkbox"
                                        id={el.id}
                                        readOnly
                                        checked={el.label === checkedJobType}
                                        onChange={() => handleJobTypeChange(el.label)}
                                    />

                                    <label htmlFor={el.id}>{getLand(el.label, f)}</label>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className={`${styles.section} ${activeSection === 1 ? styles.active : ''}`}>
                    <h3 onClick={() => toggleSection(1)} className={`${styles.title} font-poppions-light`}>
                        {f('categories')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                    </h3>

                    <ul className={`${styles.list} font-poppions-thin`}>
                        {
                            categories.map((el, idx) => (
                                <li key={idx}>
                                    <input type="checkbox" readOnly id={el.id} checked={el.label === checkedCategory} onChange={() => handleCategoryChange(el.label)} />
                                    <label htmlFor={el.id}>{getCategory(el.id, t)}</label>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className={`${styles.section} ${activeSection === 2 ? styles.active : ''}`}>
                    <h3 onClick={() => toggleSection(2)} className={`${styles.title} font-poppions-light`}>
                        {f('salary')}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                    </h3>

                    <ul className={`${styles.list} font-poppions-thin`}>
                        <li>
                            <input type="checkbox" id="salary" readOnly checked={checkedSalary} onChange={handleSalaryChange} />
                            <label htmlFor="salary">{f('salary_title')}</label>
                        </li>
                    </ul>
                </div>

                <button name="reset" onClick={handleReset} className={`${styles.reset} font-poppions-light`}>
                    {f('reset')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path><path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path></svg>
                </button>
            </div>
        </section>

    )
}

export default Filter;


