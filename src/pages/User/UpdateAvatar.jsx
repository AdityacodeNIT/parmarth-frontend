import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Loader2, User, Camera, X, ArrowLeft } from "lucide-react";
import { setUser } from "@/features/Auth/authSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { userAPI } from "@/api/userAPI";

const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError("");
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemovePreview = () => {
    setAvatar(null);
    setPreview(null);
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("avatar", avatar);

      console.log('Uploading avatar...');
      const response = await userAPI.updateAvatar(formData);
      console.log('Avatar upload response:', response);

      if (response.status >= 200 && response.status < 300) {
        // Backend returns { data: { user: updatedUser } }
        const updatedUserData = {
          data: response.data.data.user
        };
        
        console.log('Updating Redux with:', updatedUserData);
        dispatch(setUser(updatedUserData));
        
        // Navigate back to profile
        navigate("/user");
      }
    } catch (error) {
      console.error("Avatar update failed:", error);
      console.error("Error response:", error.response?.data);
      setError(error.response?.data?.message || "Failed to update avatar. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentAvatar = preview || user?.data?.avatar;

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/user")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          <CardTitle className="text-2xl text-center">Update Profile Photo</CardTitle>
          <CardDescription className="text-center">
            Upload a new avatar for your account (Max 5MB)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {currentAvatar ? (
                <img
                  src={currentAvatar}
                  alt="Avatar Preview"
                  className="w-40 h-40 rounded-full object-cover border-4 border-border shadow-lg"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-muted flex items-center justify-center border-4 border-border shadow-lg">
                  <User className="w-16 h-16 text-muted-foreground" />
                </div>
              )}

              {/* Remove Preview Button */}
              {preview && (
                <button
                  onClick={handleRemovePreview}
                  className="absolute top-0 right-0 p-2 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Camera Icon Overlay */}
              <label className="absolute bottom-0 right-0 p-3 bg-primary text-primary-foreground rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Upload Instructions */}
          {!preview && (
            <div className="text-center space-y-2">
              <label className="flex flex-col items-center gap-2 cursor-pointer p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <ImagePlus className="w-12 h-12 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">Click to upload</span> or drag and drop
                </div>
                <div className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 5MB
                </div>
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleFormSubmit}
            disabled={!avatar || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating…
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Update Avatar
              </>
            )}
          </Button>

          {/* Info */}
          <p className="text-xs text-center text-muted-foreground">
            Your profile photo will be visible to other users on the platform
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateAvatar;
