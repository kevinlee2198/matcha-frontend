import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PostApiResponseFullDto from "@/server-actions/post/post-api-response-full-dto";

interface Props {
  post: PostApiResponseFullDto;
}

function PostDetailView({ post }: Props) {
  const { title, content, subject } = post;

  return (
    <Card className="shadow-lg bg-card text-card-foreground rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <div className="text-muted-foreground text-sm mt-1">
          A post about <span className="font-medium">{subject.name}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Post Content
          </h2>
          <p className="text-muted-foreground whitespace-pre-wrap">{content}</p>
        </section>

        <Separator />

        <section className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            About {subject.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Age:</span>{" "}
              {subject.age}
            </p>
            <p>
              <span className="font-medium text-foreground">Height:</span>{" "}
              {subject.height} cm
            </p>
            <p>
              <span className="font-medium text-foreground">Location:</span>{" "}
              {subject.location}
            </p>
            <p>
              <span className="font-medium text-foreground">Ethnicity:</span>{" "}
              {subject.ethnicity}
            </p>
            <p>
              <span className="font-medium text-foreground">Occupation:</span>{" "}
              {subject.occupation}
            </p>
            <p>
              <span className="font-medium text-foreground">College:</span>{" "}
              {subject.college}
            </p>
          </div>
        </section>

        <Separator />

        <section className="space-x-2 pt-2">
          {subject.age && <Badge variant="secondary">{subject.age} y/o</Badge>}
          {subject.height && (
            <Badge variant="secondary">{subject.height} cm</Badge>
          )}
          {subject.occupation && (
            <Badge variant="secondary">{subject.occupation}</Badge>
          )}
          {subject.college && (
            <Badge variant="secondary">{subject.college}</Badge>
          )}
          {subject.location && (
            <Badge variant="secondary">{subject.location}</Badge>
          )}
        </section>
      </CardContent>
    </Card>
  );
}

export default PostDetailView;
