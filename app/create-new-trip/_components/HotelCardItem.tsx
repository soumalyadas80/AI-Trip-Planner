'use client'
import { Button } from "@/components/ui/button";
import { Star, Wallet2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Hotel } from "./ChatBox";
import axios from "axios";

type Props = {
  hotel: Hotel;
};

function HotelCardItem({ hotel }: Props) {

  const [photoUrl, setPhotoUrl] = useState<string>("/placeholder.jpg");
  const [isLoading, setIsLoading] = useState(true);

  const GetGooglePlaceDetail = async () => {
    if (!hotel?.hotel_name) return;

    try {
      setIsLoading(true);
      const result = await axios.post('/api/google-place-detail', {
        placeName: hotel.hotel_name
      });
      
      // If we got a valid URL, use it; otherwise keep the placeholder
      if (result.data && typeof result.data === 'string' && result.data.startsWith('http')) {
        setPhotoUrl(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch hotel image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetGooglePlaceDetail();
  }, [hotel?.hotel_name]);

  return (
    <div className="flex flex-col rounded-2xl shadow-md hover:shadow-primary transition overflow-hidden bg-white h-full">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={photoUrl}
          alt={hotel?.hotel_name || "Hotel Image"}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-lg text-gray-800">
          {hotel.hotel_name}
        </h2>
        <p className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin size={16} /> {hotel.hotel_address}
        </p>

        {/* Price & Rating */}
        <div className="flex justify-between items-center mt-1">
          <p className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-1 rounded-lg text-sm">
            <Wallet2 size={16} /> {hotel.price_per_night}
          </p>
          <p className="flex items-center gap-1 text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded-lg text-sm">
            <Star size={16} /> {hotel.rating}
          </p>
        </div>

        {/* View Button pinned at bottom */}
        <div className="mt-auto">
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}`}
            target="_blank"
          >
            <Button
              variant="outline"
              className="w-full hover:bg-primary hover:text-white transition"
            >
              View on Map
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelCardItem;
