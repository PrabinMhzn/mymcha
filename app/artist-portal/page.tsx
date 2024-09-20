"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Upload,
  User,
} from "lucide-react";

export default function ArtistPortal() {
  const [name, setName] = useState("John Doe");
  const [bio, setBio] = useState(
    "I am a passionate artist specializing in abstract and geometric designs. My work is inspired by urban landscapes and natural patterns."
  );
  const [designs, setDesigns] = useState([
    {
      id: 1,
      name: "Abstract Splash",
      image: "/assets/pexels-2.jpeg",
      sales: 24,
      revenue: 720,
    },
    {
      id: 2,
      name: "Geometric Dreams",
      image: "/assets/pexels-3.jpeg",
      sales: 18,
      revenue: 540,
    },
    {
      id: 3,
      name: "Urban Vibes",
      image: "/assets/pexels-4.jpeg",
      sales: 31,
      revenue: 930,
    },
  ]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Profile updated", { name, bio });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log("File uploaded", e.target.files);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Artist Portal</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="designs">Your Designs</TabsTrigger>
          <TabsTrigger value="upload">Upload Design</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Artist Profile</CardTitle>
              <CardDescription>Update your artist information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="designs">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designs.map((design) => (
              <Card key={design.id}>
                <CardHeader>
                  <CardTitle>{design.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src={design.image}
                    alt={design.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Sales: {design.sales}</span>
                    <span>Revenue: ${design.revenue}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Edit Design
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Design</CardTitle>
              <CardDescription>
                Add a new design to your collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="designName">Design Name</Label>
                  <Input id="designName" placeholder="Enter design name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designFile">Design File</Label>
                  <Input id="designFile" type="file" onChange={handleUpload} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designDescription">Description</Label>
                  <Textarea
                    id="designDescription"
                    placeholder="Describe your design"
                  />
                </div>
                <Button type="submit">Upload Design</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">73</div>
                <p className="text-xs text-muted-foreground">
                  +5.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,190</div>
                <p className="text-xs text-muted-foreground">
                  +10.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Designs
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  +1 new design this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Profile Views
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,429</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
