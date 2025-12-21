import React from "react";
import { Link } from "react-router-dom";
import { Settings, Lock, Image } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UpdateDetails = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Account Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your personal information and security
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Update profile details */}
          <Button
            asChild
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <Link to="/changeDetails" className="no-underline!">
              <Settings className="w-4 h-4 text-muted-foreground" />
              Update Profile Details
            </Link>
          </Button>

          {/* Change password */}
          <Button
            asChild
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <Link to="/changePassword" className="no-underline!">
              <Lock className="w-4 h-4 text-muted-foreground " />
              Change Password
            </Link>
          </Button>

          {/* Update avatar */}
          <Button
            asChild
            variant="outline"
            className="w-full justify-start gap-3"
          >
            <Link to="/updateAvatar" className="no-underline!">
              <Image className="w-4 h-4 text-muted-foreground" />
              Update Profile Photo
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateDetails;
