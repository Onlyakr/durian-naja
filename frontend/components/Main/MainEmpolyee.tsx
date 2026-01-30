import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Durian {
  id: string;
  name: string;
  description: string;
  imageURL: string;
}

interface DurianCardProps {
  durian: Durian;
}

export function DurianCard({ durian }: DurianCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-none group">
      
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={durian.imageURL}
          alt={durian.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-yellow-900">
          {durian.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-6">
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {durian.description}
        </p>
      </CardContent>
    </Card>
  );
}