import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export interface ClubCardData {
  id: string;
  name: string;
  description: string;
  photoUrl: string;
  tags: string[];
}

export function ClubCardSearch({ club }: { club: ClubCardData }) {
  return (
    <Card className="overflow-hidden py-0 gap-0">
      <div className="relative h-36 w-full">
        <Image
          src={club.photoUrl}
          alt={club.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{club.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {club.description}
        </CardDescription>
      </CardHeader>
      {club.tags.length > 0 && (
        <CardContent className="pb-4">
          <div className="flex flex-wrap gap-1.5">
            {club.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-medium text-sky-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
