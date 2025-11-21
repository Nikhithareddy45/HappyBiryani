// ======================================================================
//  ULTRA-SIMPLIFIED UNIVERSAL SKELETON SYSTEM (DROP-IN REPLACEMENT)
// ======================================================================
import React from "react";
import { View, ViewStyle } from "react-native";

type Dim = number | `${number}%`;

interface SkeletonProps {
  width?: Dim;
  height?: Dim;
  rounded?: number | "full";
  className?: string;
}

export const Skeleton = ({
  width = "100%",
  height = 20,
  rounded = 8,
  className = "",
}: SkeletonProps) => {
  const style: ViewStyle = {
    width,
    height,
    borderRadius: rounded === "full" ? 9999 : rounded,
  };

  return (
    <View className={`bg-gray-300 animate-pulse ${className}`} style={style} />
  );
};

// Helper layouts
export const Row = ({ children, className = "" }: any) => (
  <View className={`flex-row items-center ${className}`}>{children}</View>
);

export const Column = ({ children, className = "" }: any) => (
  <View className={`flex-col ${className}`}>{children}</View>
);

// ======================================================================
//  INDIVIDUAL SKELETON COMPONENTS
// ======================================================================

// ---------------- Store Card ----------------
export const StoreCardSkeleton = () => (
  <View className="bg-white rounded-xl shadow-lg mb-10 overflow-hidden">
    <Skeleton height={150} rounded={0} />

    <Column className="p-3 gap-3">
      <Skeleton height={24} width="60%" />

      <Row className="gap-2">
        <Skeleton width={16} height={16} rounded="full" />
        <Skeleton width="80%" height={14} />
      </Row>

      <Row className="gap-2">
        <Skeleton width={16} height={16} rounded="full" />
        <Skeleton width="40%" height={14} />
      </Row>

      <Row className="gap-2">
        <Skeleton width={16} height={16} rounded="full" />
        <Skeleton width="50%" height={14} />
      </Row>
    </Column>
  </View>
);

// ---------------- Carousel ----------------
export const CarouselSkeleton = () => (
  <Column className="items-center mt-3 w-full">
    <Skeleton height={180} rounded={12} className="mb-3" />

    <Row className="gap-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} width={8} height={8} rounded="full" />
      ))}
    </Row>
  </Column>
);

// ---------------- Heading ----------------
export const HeadingSkeleton = () => (
  <Row className="justify-between mb-4">
    <Skeleton width="40%" height={28} />
    <Skeleton width={60} height={20} />
  </Row>
);

// ---------------- Horizontal Card ----------------
export const HorizontalStoreCardSkeleton = () => (
  <View className="bg-white rounded-xl shadow-sm mr-4 w-72">
    <Skeleton height={160} rounded={12} />

    <View className="absolute top-3 left-3">
      <Skeleton width={80} height={24} rounded="full" />
    </View>

    <Column className="p-4 gap-2">
      <Skeleton width="75%" height={20} />

      <Row className="gap-2">
        <Skeleton width={16} height={16} rounded="full" />
        <Skeleton width="85%" height={14} />
      </Row>

      <Row className="gap-2">
        <Skeleton width={16} height={16} rounded="full" />
        <Skeleton width="50%" height={14} />
      </Row>

      <Row className="gap-2">
        <Skeleton width={16} height={16} rounded="full" />
        <Skeleton width="45%" height={14} />
      </Row>
    </Column>
  </View>
);

// ---------------- Quick Action ----------------
export const QuickActionSkeleton = () => (
  <Column className="bg-white rounded-xl p-4 shadow-sm flex-1">
    <Skeleton width={48} height={48} rounded="full" className="mb-2" />
    <Skeleton width="80%" height={18} className="mb-1" />
    <Skeleton width="90%" height={14} />
  </Column>
);

// ---------------- Form Field ----------------
export const FormFieldSkeleton = () => (
  <Column className="mb-4">
    <Skeleton width="30%" height={20} className="mb-2" />
    <Skeleton width="100%" height={48} rounded={12} />
  </Column>
);

// ---------------- Form ----------------
export const FormSkeleton = () => (
  <View className="bg-white rounded-xl p-6 shadow-sm">
    <FormFieldSkeleton />
    <FormFieldSkeleton />
    <FormFieldSkeleton />

    <Column className="mb-6">
      <Skeleton width="40%" height={20} className="mb-2" />
      <Skeleton width="100%" height={120} rounded={12} />
    </Column>

    <Skeleton width="100%" height={48} rounded={12} className="mb-3" />
    <Skeleton width="100%" height={48} rounded={12} />
  </View>
);

// ---------------- Location Header ----------------
export const LocationHeaderSkeleton = () => (
  <Row className="px-4 py-3 bg-white">
    <Skeleton width={24} height={24} rounded="full" className="mr-2" />
    <Skeleton width={200} height={20} />
  </Row>
);

// ---------------- Store Detail ----------------
export const StoreDetailSkeleton = () => (
  <View className="flex-1 bg-background">
    <Skeleton height={256} rounded={0} width="100%" />

    <Column className="p-6">
      <Skeleton height={32} width="80%" className="mb-4" />
      <Skeleton height={20} width="100%" className="mb-2" />
      <Skeleton height={20} width="90%" className="mb-6" />

      {/* Location */}
      <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <Skeleton height={24} width="40%" className="mb-4" />
        <Row className="mb-4">
          <Skeleton width={24} height={24} rounded="full" className="mr-3" />
          <Column className="flex-1 gap-2">
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="80%" />
          </Column>
        </Row>
        <Skeleton width="100%" height={48} rounded={12} />
      </View>

      {/* Contact */}
      <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <Skeleton height={24} width="40%" className="mb-4" />

        <Row className="justify-between mb-3">
          <Row className="flex-1">
            <Skeleton width={24} height={24} rounded="full" className="mr-3" />
            <Skeleton height={16} width="50%" />
          </Row>
          <Skeleton width={60} height={36} rounded={12} />
        </Row>

        <Row className="mb-3">
          <Skeleton width={24} height={24} rounded="full" className="mr-3" />
          <Skeleton height={16} width="60%" />
        </Row>
      </View>

      {/* Hours */}
      <View className="bg-white rounded-xl p-6 shadow-sm mb-4">
        <Skeleton height={24} width="30%" className="mb-4" />
        <Row>
          <Skeleton width={24} height={24} rounded="full" className="mr-3" />
          <Skeleton height={16} width="40%" />
        </Row>
      </View>

      {/* Gallery */}
      <View className="bg-white rounded-xl p-6 shadow-sm">
        <Skeleton height={24} width="30%" className="mb-4" />
        <Row className="gap-3">
          <Skeleton width={192} height={192} rounded={12} />
          <Skeleton width={192} height={192} rounded={12} />
        </Row>
      </View>
    </Column>
  </View>
);

// ---------------- Home Screen ----------------
export const HomeScreenSkeleton = () => (
  <View className="flex-1 bg-background">
    <LocationHeaderSkeleton />
    <CarouselSkeleton />

    <View className="px-4 mt-6">
      <HeadingSkeleton />
      <Row>
        <HorizontalStoreCardSkeleton />
        <HorizontalStoreCardSkeleton />
        <HorizontalStoreCardSkeleton />
      </Row>
    </View>

    <View className="px-4 mt-8 mb-6">
      <HeadingSkeleton />
      <Row>
        <HorizontalStoreCardSkeleton />
        <HorizontalStoreCardSkeleton />
        <HorizontalStoreCardSkeleton />
      </Row>
    </View>

    <View className="px-4 mb-8">
      <Skeleton width={140} height={24} className="mb-4" />
      <Row className="gap-3">
        <QuickActionSkeleton />
        <QuickActionSkeleton />
      </Row>
    </View>
  </View>
);

// ---------------- Stores Screen ----------------
export const StoresScreenSkeleton = () => (
  <View className="flex-1 bg-background p-4">
    <Skeleton width="40%" height={28} className="mb-2" />
    <Skeleton width="80%" height={16} className="mb-6" />
    <StoreCardSkeleton />
    <StoreCardSkeleton />
    <StoreCardSkeleton />
    <StoreCardSkeleton />
  </View>
);

// ---------------- Contact Screen ----------------
export const ContactScreenSkeleton = () => (
  <View className="flex-1 bg-background p-6">
    <Skeleton width="60%" height={32} className="mb-2" />
    <Skeleton width="80%" height={16} className="mb-6" />

    <FormSkeleton />

    <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
      <Skeleton width="50%" height={24} className="mb-4" />

      <Row className="mb-3">
        <Skeleton width={24} height={24} rounded="full" className="mr-3" />
        <Skeleton width="70%" height={16} />
      </Row>

      <Row className="mb-3">
        <Skeleton width={24} height={24} rounded="full" className="mr-3" />
        <Skeleton width="60%" height={16} />
      </Row>

      <Row>
        <Skeleton width={24} height={24} rounded="full" className="mr-3" />
        <Column className="flex-1 gap-2">
          <Skeleton height={16} width="100%" />
          <Skeleton height={16} width="80%" />
        </Column>
      </Row>
    </View>
  </View>
);

export { Skeleton as SkeletonLoader };
