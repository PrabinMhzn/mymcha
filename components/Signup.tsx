"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { BaseForm } from "@/components/BaseForm";
import { ArtistForm } from "@/components/ArtistForm";

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
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      console.log("Submitting signup form:", {
        ...formData,
        password: "[REDACTED]",
      });
      const { user } = await signup(
        formData.email,
        formData.password,
        isArtist ? "artist" : "user",
        formData.firstName,
        formData.lastName
      );

      if (user) {
        console.log("Signup successful, user:", user);
        setNotification({
          type: "success",
          message:
            "Account created successfully! Please check your email to confirm your account.",
        });

        setTimeout(
          () => router.push(isArtist ? "/artist/dashboard" : "/dashboard"),
          2000
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setNotification({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during signup",
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

            <BaseForm
              formData={formData}
              handleInputChange={handleInputChange}
            />

            {isArtist && (
              <ArtistForm
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

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
