import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ArtistFormProps = {
  formData: {
    artistName: string;
    bio: string;
    website: string;
    instagram: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const ArtistForm: React.FC<ArtistFormProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="artistName">Artist Name</Label>
        <Input
          id="artistName"
          name="artistName"
          type="text"
          value={formData.artistName}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="instagram">Instagram</Label>
        <Input
          id="instagram"
          name="instagram"
          type="text"
          value={formData.instagram}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
};
