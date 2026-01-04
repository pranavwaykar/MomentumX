"use client";

import { useEffect } from "react";
import { useProblemsStore } from "@/store/problems-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/toast-provider";
import {
  Heart,
  UserPlus,
  Megaphone,
  CheckCircle,
  XCircle,
  Bell,
  Trash2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function NotificationsPage() {
  const {
    problems,
    joinRequests,
    notifications,
    init,
    acceptRequest,
    rejectRequest,
    markNotificationAsRead,
    clearNotifications,
  } = useProblemsStore();
  const { user } = useAuth();
  const { show } = useToast();

  useEffect(() => {
    init();
  }, [init]);

  const myProblemIds = new Set(
    problems
      .filter((p) => {
        const email = user?.email || "";
        return (
          (p.author.email && p.author.email === email) ||
          p.author.name === (user?.displayName || "You")
        );
      })
      .map((p) => p.id)
  );

  const pendingRequests = joinRequests.filter(
    (r) => myProblemIds.has(r.problemId) && r.status === "pending"
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "join_request":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "new_proposal":
        return <Megaphone className="h-4 w-4 text-purple-500" />;
      case "request_accepted":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "request_rejected":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your proposals and team requests.
          </p>
        </div>
        {notifications.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearNotifications}
            className="text-muted-foreground">
            <Trash2 className="mr-2 h-4 w-4" /> Clear All
          </Button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" /> Recent Activity
          </h2>
          {notifications.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
              No recent activity.
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <Card
                  key={n.id}
                  className={`transition-colors ${
                    !n.isRead ? "bg-primary/5 border-primary/20" : ""
                  }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">{getNotificationIcon(n.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{n.title}</p>
                          <span className="text-[10px] text-muted-foreground">
                            {formatDate(n.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {n.message}
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                          {n.targetId && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              asChild>
                              <Link href={`/discovery/${n.targetId}`}>
                                View Problem
                              </Link>
                            </Button>
                          )}
                          {!n.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-xs text-primary"
                              onClick={() => markNotificationAsRead(n.id)}>
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <UserPlus className="h-5 w-5" /> Team Requests
          </h2>
          {pendingRequests.length === 0 ? (
            <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground text-sm">
              No pending join requests.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((req) => {
                const problem = problems.find((p) => p.id === req.problemId);
                return (
                  <Card key={req.id}>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base flex items-center justify-between">
                        <span className="line-clamp-1">{problem?.title}</span>
                        <Badge variant="outline" className="text-[10px] h-5">
                          Pending
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {req.user.name}
                        </span>{" "}
                        wants to join{req.role ? ` as ${req.role}` : ""}.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <Button
                          size="sm"
                          className="h-8 text-xs flex-1"
                          onClick={() => {
                            acceptRequest(req.id);
                            show("Request accepted.", "success");
                          }}>
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs flex-1"
                          onClick={() => {
                            rejectRequest(req.id);
                            show("Request rejected.", "success");
                          }}>
                          Reject
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full h-8 text-xs"
                        asChild>
                        <Link href={`/discovery/${req.problemId}`}>
                          View Problem
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
