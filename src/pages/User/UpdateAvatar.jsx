import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Loader2, User } from "lucide-react";

import UserContext from "../../context/UserContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { getUserDetail, userDetail } = useContext(UserContext);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/updateAvatar`,
        formData,
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        getUserDetail(response.data);
        navigate("/user");
      }
    } catch (error) {
      console.error(
        "Avatar update failed:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const currentAvatar =
    preview ||
    userDetail?.data?.avatar ||
    userDetail?.data?.user?.avatar;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Update Profile Photo</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload a new avatar for your account
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            {currentAvatar ? (
              <img
                src={currentAvatar}
                alt="Avatar Preview"
                className="w-28 h-28 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-muted flex items-center justify-center border border-border">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Upload */}
          <label className="flex flex-col items-center gap-2 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImagePlus size={18} />
              <span>Select new photo</span>
            </div>
          </label>

          {/* Submit */}
          <Button
            className="w-full"
            onClick={handleFormSubmit}
            disabled={!avatar || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating…
              </>
            ) : (
              "Update Avatar"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateAvatar;
