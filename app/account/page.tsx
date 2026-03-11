import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar"
import * as React from "react"
import { PlusIcon } from "lucide-react"

export default function Page() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar size="lg">
        <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="@profile" />
        <AvatarFallback>CV</AvatarFallback>
      </Avatar>
      <Avatar className="grayscale">
      <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="@profile" />
      <AvatarFallback>CV</AvatarFallback>
      <AvatarBadge>
        <PlusIcon />
      </AvatarBadge>
    </Avatar>
    </div>
  )
}