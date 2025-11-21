import { Banner } from "@/types/common";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
const { width } = Dimensions.get("window");

interface BannerCarouselProps {
  banners: Banner[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      const nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
      scrollViewRef.current?.scrollTo({ x: width * nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, banners.length]);

  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    setActiveIndex(index);
  };

  return (
    <View className="mb-6">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {banners.map((banner, index) => (
          <View key={index} style={{ width }} className="px-3">
            {banner.media_type === "image" ? (
              <Image
                source={{ uri: banner.file }}
                className="w-full h-60 rounded-xl"
                resizeMode="cover"
              />
            ) : (
              <Video
                source={{ uri: banner.file }}
                className="w-full h-60 rounded-xl"
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-3">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full mx-1 ${
              index === activeIndex ? "w-8 bg-primary" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};
