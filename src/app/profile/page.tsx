"use client";

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profile-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/molecules/card";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/components/toast-provider";
import { Input } from "@/components/atoms/input";
import { useAuth } from "@/components/auth-provider";
import { Avatar } from "@/components/atoms/avatar";

export default function ProfilePage() {
  const { photoUrl, setPhotoUrl, init, name, email, headline, setProfile } =
    useProfileStore();
  const [preview, setPreview] = useState<string | undefined>(photoUrl);
  const [localName, setLocalName] = useState(name || "");
  const [localEmail, setLocalEmail] = useState(email || "");
  const [localHeadline, setLocalHeadline] = useState(headline || "");
  const { show } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    init();
  }, [init]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="px-4 py-10 min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Picture</label>
            <div className="flex items-center gap-4">
              <Avatar
                name={localName || user?.displayName || user?.email || "You"}
                src={preview}
                size={64}
              />
              <input
                id="photo-input"
                className="hidden"
                type="file"
                accept="image/*"
                onChange={onFile}
              />
              <Button asChild variant="outline">
                <label htmlFor="photo-input">Choose Photo</label>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-muted-foreground">Name</label>
              <Input
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <Input
                value={localEmail}
                onChange={(e) => setLocalEmail(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-muted-foreground">Headline</label>
              <Input
                placeholder="e.g., Full-stack Developer, AI Enthusiast"
                value={localHeadline}
                onChange={(e) => setLocalHeadline(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setPhotoUrl(preview);
                setProfile({
                  name: localName,
                  email: localEmail,
                  headline: localHeadline,
                });
                show("Profile updated.", "success");
              }}>
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPreview(undefined);
                setPhotoUrl(undefined);
                show("Profile picture removed.", "success");
              }}>
              Remove Photo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
