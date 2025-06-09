// src/app/page.tsx
import { MainLayout } from "@/presentation/templates/MainLayout";
import { DashboardPage } from "@/presentation/pages/DashboardPage";

export default function Home() {
    return (
        <MainLayout>
            <DashboardPage />
        </MainLayout>
    );
}
