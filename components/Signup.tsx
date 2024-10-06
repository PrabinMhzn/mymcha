"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    artistName: "",
    bio: "",
    website: "",
    instagram: "",
    profileImage: null as File | null,
    portfolioImages: [] as File[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "profileImage") {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      } else if (name === "portfolioImages") {
        setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    if (formData.password !== formData.confirmPassword) {
      setNotification({
        type: "error",
        message: "Passwords do not match",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Sign up the user
      const { user } = await signup(formData.email, formData.password);

      if (user) {
        // Upload profile image if provided
        let profileImageUrl = null;
        if (formData.profileImage) {
          const { error: imageError } = await supabase.storage
            .from("profile-images")
            .upload(`${user.id}/profile.jpg`, formData.profileImage);
          if (imageError) throw imageError;
          profileImageUrl =
            supabase.storage
              .from("profile-images")
              .getPublicUrl(`${user.id}/profile.jpg`)?.data?.publicUrl ?? null;
        }

        // Upload portfolio images if provided
        const portfolioImageUrls: string[] = [];
        if (isArtist && formData.portfolioImages.length > 0) {
          for (let i = 0; i < formData.portfolioImages.length; i++) {
            const { error: imageError } = await supabase.storage
              .from("portfolio-images")
              .upload(
                `${user.id}/portfolio-${i}.jpg`,
                formData.portfolioImages[i]
              );
            if (imageError) throw imageError;
            const url = supabase.storage
              .from("portfolio-images")
              .getPublicUrl(`${user.id}/portfolio-${i}.jpg`)?.data?.publicUrl;
            if (url) portfolioImageUrls.push(url);
          }
        }

        // Insert user profile data
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          is_artist: isArtist,
          artist_name: isArtist ? formData.artistName : null,
          bio: isArtist ? formData.bio : null,
          website: isArtist ? formData.website : null,
          instagram: isArtist ? formData.instagram : null,
          profile_image_url: profileImageUrl,
          portfolio_image_urls: isArtist ? portfolioImageUrls : null,
        });

        if (profileError) throw profileError;

        setNotification({
          type: "success",
          message: "Account created successfully!",
        });

        // Redirect to appropriate dashboard
        setTimeout(
          () => router.push(isArtist ? "/artist-dashboard" : "/dashboard"),
          2000
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setNotification({
        type: "error",
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            {isArtist ? "Join Our Artist Community" : "Sign Up"}
          </h1>
          {notification && (
            <div
              className={`mb-4 p-4 rounded ${
                notification.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {notification.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-center mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={isArtist}
                  onChange={(e) => setIsArtist(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">I am an artist</span>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {isArtist && (
              <>
                <div>
                  <Label htmlFor="artistName">Artist Name</Label>
                  <Input
                    id="artistName"
                    name="artistName"
                    type="text"
                    required
                    value={formData.artistName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    required
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="website">Website (optional)</Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram">Instagram (optional)</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="portfolioImages">
                    Portfolio Images (up to 5)
                  </Label>
                  <Input
                    id="portfolioImages"
                    name="portfolioImages"
                    type="file"
                    accept="image/*"
                    multiple
                    max={5}
                    onChange={handleFileChange}
                  />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  {isArtist ? "Submit Application" : "Sign Up"}
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Log in here
        </Link>
      </p>
    </div>
  );
}
