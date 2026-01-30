import DurianCatalog from "@/components/Main/DurianCatalog";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 md:p-8">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">สายพันธุ์ทุเรียน</h1>
            <p className="text-gray-500 mt-1">ข้อมูลสายพันธุ์ทั้งหมดในสวน Durian Platform</p>
          </div>
        </div>

        <DurianCatalog />
      </div>
    </div>
  );
}