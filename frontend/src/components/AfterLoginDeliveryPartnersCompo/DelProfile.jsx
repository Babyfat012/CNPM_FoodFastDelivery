import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import BackgroundImage from '../../assets/profile.jpg'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const DelProfile = () => {
  const [delProfile, setDelProfile] = useState(null);
  const navigate = useNavigate();

  const callDelProfile = async () => {
    try {
      const res = await fetch('http://localhost:3000/auth/DelLayout/DelProfile', { // Update with the correct backend URL and port
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });

      if (res.status !== 200) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const textData = await res.text(); // Get response as text
      console.log("Response text:", textData);

      if (!textData) {
        throw new Error("No data received");
      }

      try {
        const data = JSON.parse(textData); // Manually parse JSON
        console.log(data);
        setDelProfile(data);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        navigate('/DelLogin');
      }
    } catch (err) {
      console.log(err);
      navigate('/DelLogin');
    }
  };

  useEffect(() => {
    callDelProfile();
  }, []);

  return (
    <div className="bg-gradient-to-r from-white via-yellow-100 to-white ml-60 mt-[78px] w-full font-poppins h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover blur-sm opacity-30"
        />
      </div>

      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow w-full max-w-xl p-8 border border-yellow-300 relative z-10">
        <CardContent className="text-center">
          <Typography variant="h4" className="text-yellow-500 font-bold mb-4">
            Profile
          </Typography>

          <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
            Personal Information
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Name: <strong>{delProfile && delProfile.ownerName}</strong>
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Email: <strong>{delProfile && delProfile.email}</strong>
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Phone: <strong>{delProfile && delProfile.phone}</strong>
          </Typography>
          <Typography variant="body1" className="text-gray-800">
            Address: <strong>{delProfile && delProfile.address}</strong>
          </Typography>

          <div className="mt-4">
            <Typography variant="h6" className="text-yellow-600 font-bold mb-2">
              Documents 
            </Typography>
            <Typography variant="body1" className="text-gray-800">
              Driving License Number: <strong>{delProfile && delProfile.drivingLicenceNo}</strong>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DelProfile;
