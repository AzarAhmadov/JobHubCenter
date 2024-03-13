import { Analytics } from "@vercel/analytics/react"
import '@/assets/css/globals.css'
import I18nProviderClientProvider from "@/components/I18nProviderClientProvider/I18nProviderClientProvider";

export const metadata = {
    metadataBase: new URL("https://jobhubcenter.vercel.app"),
    title: "Job Hub Center",
    description: "Job Portal is a new online platform for job seekers. You can easily find what you want.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/x-icon" href="/images/logo.png" />
            </head>
            <body className='body'>
                <I18nProviderClientProvider>
                    <div className='row'>
                        <div>
                            {children}
                        </div>
                    </div>
                    <Analytics />
                </I18nProviderClientProvider>
            </body>
        </html>
    );
}