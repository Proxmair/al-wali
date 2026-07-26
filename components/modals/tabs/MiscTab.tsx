"use client";

import { useState } from "react";
import { Loader2, Upload } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const MiscTab = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bannerText: "",
  });

  const [bannerDesktopImage, setBannerDesktopImage] =
    useState<File | null>(null);

  const [bannerMobileImage, setBannerMobileImage] =
    useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDesktopImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    setBannerDesktopImage(e.target.files[0]);
  };

  const handleMobileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    setBannerMobileImage(e.target.files[0]);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("bannerText", formData.bannerText);

      if (bannerDesktopImage) {
        data.append(
          "bannerDesktopImage",
          bannerDesktopImage
        );
      }

      if (bannerMobileImage) {
        data.append(
          "bannerMobileImage",
          bannerMobileImage
        );
      }

      const response = await fetch("/api/misc", {
        method: "PUT",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong."
        );
      }

      console.log(result);

      setFormData({
        bannerText: "",
      });

      setBannerDesktopImage(null);
      setBannerMobileImage(null);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="bannerText">
            Banner Text
          </Label>

          <textarea
            id="bannerText"
            name="bannerText"
            value={formData.bannerText}
            onChange={handleChange}
            placeholder="Enter banner text"
            className="min-h-28 w-full rounded-md border p-3 text-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bannerDesktopImage">
            Banner Desktop Image
          </Label>

          <Input
            id="bannerDesktopImage"
            type="file"
            accept="image/*"
            onChange={handleDesktopImageChange}
          />

          {bannerDesktopImage && (
            <div className="rounded-lg border p-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {bannerDesktopImage.name}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="bannerMobileImage">
            Banner Mobile Image
          </Label>

          <Input
            id="bannerMobileImage"
            type="file"
            accept="image/*"
            onChange={handleMobileImageChange}
          />

          {bannerMobileImage && (
            <div className="rounded-lg border p-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {bannerMobileImage.name}
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
};

export default MiscTab;