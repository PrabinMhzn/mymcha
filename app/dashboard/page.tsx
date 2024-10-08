"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchProfile();
    }
  }, [user, router]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(data);
    }
  };

  if (!user || !profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Welcome, {profile.first_name}!
          </h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
              <p>
                Name: {profile.first_name} {profile.last_name}
              </p>
              <p>Email: {profile.email}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
              <p>No recent activity to display.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                Edit Profile
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
