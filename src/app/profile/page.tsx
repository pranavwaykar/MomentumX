"use client"

import { useEffect, useState } from "react";
import { useProfileStore } from "@/store/profile-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/molecules/card";
import { Button } from "@/components/atoms/button";
import { useToast } from "@/components/toast-provider";

export default function ProfilePage() {
  const { photoUrl, setPhotoUrl, init } = useProfileStore();
  const [preview, setPreview] = useState<string | undefined>(photoUrl);
  const { show } = useToast();

  useEffect(() => {
    init();
    setPreview(photoUrl);
  }, [init]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {preview ? (
              <img src={preview} alt="Preview" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-muted" />
            )}
            <input type="file" accept="image/*" onChange={onFile} />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setPhotoUrl(preview);
                show("Profile picture updated.", "success");
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
              Remove
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
