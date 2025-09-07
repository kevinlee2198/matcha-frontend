"use client";

import { getPosts } from "@/server-actions/post/post-server-actions";
import { Slice } from "@/types/api/page-api-dto";
import { CompanyApiResponseSummaryDto } from "@/types/company/company-api-response-dto";
import { PostApiResponseFullDto } from "@/types/post/post-api-response-dto";
import { Building2, RefreshCw, TrendingUp } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useState, useTransition } from "react";
import SignInButton from "../auth/signin-button";
import CreatePostDialog from "../post/create-post-dialog";
import PostCard from "../post/post-card";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const POST_BATCH_SIZE = 10;

interface Props {
  session: Session | null;
  trendingCompanies: CompanyApiResponseSummaryDto[];
  trendingPosts: Slice<PostApiResponseFullDto>;
}

function HomePage({ session, trendingCompanies, trendingPosts }: Props) {
  const [posts, setPosts] = useState<PostApiResponseFullDto[]>(
    trendingPosts.content
  );
  const [hasMore, setHasMore] = useState(!trendingPosts.empty);
  const [offset, setOffset] = useState(trendingPosts.numberOfElements);
  const [pending, startTransition] = useTransition();

  function handleRefresh() {
    startTransition(async () => {
      const result = await getPosts({
        offset: 0,
        size: POST_BATCH_SIZE,
        sort: "trending",
      });
      setPosts(result.content);
      setOffset(POST_BATCH_SIZE);
      setHasMore(!result.empty);
    });
  }

  function handleLoadMore() {
    startTransition(async () => {
      const result = await getPosts({
        offset,
        size: POST_BATCH_SIZE,
        sort: "trending",
      });
      setPosts((prev) => [...prev, ...result.content]);
      setOffset((prev) => prev + POST_BATCH_SIZE);
      setHasMore(!result.empty);
    });
  }

  function handlePostCreated() {
    startTransition(async () => {
      const result = await getPosts({
        offset: 0,
        size: POST_BATCH_SIZE,
        sort: "trending",
      });
      setPosts((prev) => [...prev, ...result.content]);
      setOffset((prev) => prev + POST_BATCH_SIZE);
      setHasMore(!result.empty);
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Trending Companies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingCompanies.map((company, index) => (
                  <div
                    key={company.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Link href={`/companies/${company.id}`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          #{index + 1}
                        </span>
                        <span className="font-medium text-foreground">
                          {company.name}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
                <Link href={"/companies"}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start mt-4"
                  >
                    View All Companies
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Active Users
                  </span>
                  <span className="font-semibold text-foreground">12.4k</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Posts Today
                  </span>
                  <span className="font-semibold text-foreground">847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Companies
                  </span>
                  <span className="font-semibold text-foreground">500+</span>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Latest Discussions
                  </h2>
                  <p className="text-muted-foreground">
                    Anonymous workplace conversations from professionals
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={pending}
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        pending ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </Button>
                  {session && (
                    <CreatePostDialog onPostCreated={handlePostCreated} />
                  )}
                </div>
              </div>
              {!session && (
                <Card className="mb-6 border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Join the Conversation
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Sign in to create posts, comment, and engage with the
                        community
                      </p>
                      <SignInButton />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} session={session} />
              ))}

              {pending && posts.length === 0 && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading posts...</p>
                </div>
              )}

              {posts.length === 0 && !pending && (
                <Card className="text-center py-12">
                  <CardContent>
                    <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Be the first to share your workplace experience!
                    </p>
                    {session ? (
                      <CreatePostDialog onPostCreated={handlePostCreated} />
                    ) : (
                      <SignInButton />
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {hasMore && posts.length > 0 && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={pending}
                >
                  {pending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Loading...
                    </>
                  ) : (
                    "Load More Posts"
                  )}
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
