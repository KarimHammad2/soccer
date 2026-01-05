import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  avatar?: string;
  badge?: string;
};

export function AvatarWithBadge({ name, avatar, badge }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        {badge ? <Badge variant="secondary">{badge}</Badge> : null}
      </div>
    </div>
  );
}

