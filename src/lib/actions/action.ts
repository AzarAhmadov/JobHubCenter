"use server"

import { revalidatePath } from "next/cache";
import { VacancyDB, VacancyDBAdmin, VacancyDBAdminPanel } from "../models/models";
import { connectToDb } from "../utils/renderFunction";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const Vacancy = async (formData: FormData) => {
    const {
        company_name,
        about_company,
        job_type,
        category,
        location,
        apply_method_1,
        apply_method_2,
        desc,
        salary,
        job_title,
        last_date,
        path
    } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newVacancy = new VacancyDB({
            company_name,
            about_company,
            job_type,
            category,
            location,
            apply_method_1,
            apply_method_2,
            desc,
            salary,
            last_date,
            job_title,
            path
        });

        await newVacancy.save();
        revalidatePath("/Create");
        revalidatePath("/");
    } catch (err) {
        return { error: "Something went wrong!" };
    }
}

export const VacancyPostFromAdmin = async (formData: FormData) => {
    const {
        company_name,
        about_company,
        company_logo,
        job_type,
        category,
        location,
        apply_method_1,
        apply_method_2,
        desc,
        salary,
        job_title,
        last_date,
        path
    } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newVacancy = new VacancyDBAdmin({
            company_name,
            about_company,
            company_logo,
            job_type,
            category,
            location,
            apply_method_1,
            apply_method_2,
            desc,
            salary,
            last_date,
            job_title,
            path
        });

        await newVacancy.save();
        revalidatePath("/Create");
        revalidatePath("/");
    } catch (err) {
        return { error: "Something went wrong!" };
    }
}

export const deleteVacansy = async (formData: FormData) => {
    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await VacancyDB.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/dashboard");
        revalidatePath("/");
    } catch (err) {
        return { error: "Something went wrong!" };
    }
};

export const VacancyPostFromAdminDelete = async (formData: FormData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectToDb();
        await VacancyDBAdmin.findByIdAndDelete(id);
        console.log("deleted from db");
        revalidatePath("/dashboard");
        revalidatePath("/");
    } catch (err) {
        return { error: "Something went wrong!" };
    }

}

export const AdminLogin = async (formData: FormData) => {
    const {
        login, password
    } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newAdmin = new VacancyDBAdminPanel({
            login, password
        });

        await newAdmin.save();
        revalidatePath("/admin");
        revalidatePath("/");
    } catch (err) {
        return { error: "Something went wrong!" };
    }
}

export const LoginAccount = async (formData: FormData) => {
    const login = formData.get('login')
    const password = formData.get('password')

    if (login === process.env.NEXT_PUBLIC_USER && password === process.env.NEXT_PUBLIC_PASSWORD) {
        redirect('admin/dashboard')
    }

    cookies().set('token', '0');
}