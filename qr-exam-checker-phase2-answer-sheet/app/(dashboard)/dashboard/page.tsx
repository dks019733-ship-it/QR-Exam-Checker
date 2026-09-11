import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileText, GraduationCap, ScanLine, Users, FileImage } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");
  const cards = [
    ["นักเรียน", "จัดการนักเรียนและห้องเรียน", Users],
    ["ข้อสอบ", "สร้างชุดข้อสอบและนำเข้าเฉลย", FileText],
    ["ตรวจข้อสอบ", "สแกน QR และตรวจใบคำตอบ", ScanLine],
    ["รายงาน", "ดูคะแนนรายคนและรายห้อง", GraduationCap],
    ["กระดาษคำตอบ", "แก้ตราโรงเรียน วิชา ชื่อ และรหัสนักเรียน", FileImage]
  ] as const;
  return (
    <main className="min-h-screen p-5 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-muted-foreground">QR Exam Checker</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">สวัสดี{session.user.name ? ` ${session.user.name}` : ""}</h1>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([title, description, Icon]) => (
            <a key={title} href={title === "กระดาษคำตอบ" ? "/dashboard/answer-sheet" : "#"} className="rounded-2xl border bg-card p-5 shadow-sm transition hover:bg-muted/40">
              <Icon className="mb-8 h-5 w-5" />
              <h2 className="font-semibold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
