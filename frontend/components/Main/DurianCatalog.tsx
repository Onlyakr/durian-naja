"use client";

import { useEffect, useState } from "react";
import { DurianService, Durian } from "@/services/durian.service";
import { DurianCard } from "@/components/Main/MainEmpolyee"; 
import { Loader2, AlertCircle, FileQuestion, RefreshCw } from "lucide-react";

export default function DurianCatalog() {
  const [durians, setDurians] = useState<Durian[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDurians = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await DurianService.getAll();
      setDurians(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDurians();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 animate-in fade-in">
        <Loader2 className="h-10 w-10 animate-spin mb-3 text-yellow-500" />
        <p className="font-medium">กำลังโหลดข้อมูลทุเรียน...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50/50 rounded-xl border border-red-100 p-6">
        <AlertCircle className="h-12 w-12 mb-3 opacity-80" />
        <p className="font-semibold text-lg">{error}</p>
        <button 
          onClick={fetchDurians} 
          className="mt-4 flex items-center gap-2 px-5 py-2 bg-white border border-red-200 rounded-full hover:bg-red-50 text-red-700 transition shadow-sm font-medium"
        >
          <RefreshCw className="h-4 w-4" /> ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  if (durians.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white/50 rounded-xl border border-gray-100 border-dashed">
        <FileQuestion className="h-12 w-12 mb-3 opacity-50" />
        <p className="text-lg">ยังไม่มีข้อมูลสายพันธุ์ทุเรียนในระบบ</p>
        <button 
          onClick={fetchDurians}
          className="mt-2 text-sm text-yellow-600 hover:underline"
        >
          รีเฟรชข้อมูล
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex justify-end mb-4">
            <button 
                onClick={fetchDurians}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-yellow-600 transition-colors"
            >
                <RefreshCw className="h-3 w-3" /> รีเฟรชข้อมูล
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {durians.map((durian) => (
              <DurianCard key={durian.id} durian={durian} />
            ))}
        </div>
    </div>
  );
}