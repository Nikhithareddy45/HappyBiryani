import { BackButton } from "@/components/ui/BackButton";
// import Heading from "@/components/ui/Heading";
import { Leaf, MapPin, Milk, ShieldCheck, Sparkles, TriangleAlert, Utensils } from "lucide-react-native";
import { Image, ScrollView, Text, View } from "react-native";

const About = () => {
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View className="w-[90%] mx-auto gap-4 mt-4 ">
        <View className="items-center flex-row py-1">
          <BackButton />
          <Text className="text-2xl font-bold text-primary">About Us</Text>
        </View>
        <Image
          source={require("@/assets/images/about.png")}
          className="rounded-2xl"
          style={{ width: "100%", height: 220 }}
          resizeMode="cover"
        />

        {/* 🏁 Introduction */}
        <Text className="text-base font-primary text-gray-700 text-center leading-6 px-3">
          Welcome to <Text className="font-bold text-primary">Happy Biryani</Text> —
          your one-stop destination for authentic, flavorful biryanis crafted with passion
          by the best local chefs and restaurants. We bring together foodies and the
          finest biryani outlets around you.
        </Text>

        {/* ❤️ Why Choose Us */}
        <View className="bg-orange-50 p-5 rounded-xl mt-6">
          <Text className="text-2xl font-bold text-primary mb-3">
            Why Choose Us? ❤️
          </Text>
          <View className="gap-4">
            <View className="flex-row items-start gap-3">
              <ShieldCheck color="#0fbb2eff" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800">
                  Verified Stores
                </Text>
                <Text className="text-sm text-gray-600">
                  All outlets are verified, trusted, and quality checked.
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <MapPin color="#01aff1" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800">
                  Location-Based
                </Text>
                <Text className="text-sm text-gray-600">
                  Discover the nearest outlets with real-time distance.
                </Text>
              </View>
            </View>

            <View className="flex-row items-start gap-3">
              <Sparkles color="#ffdf0ff8" />
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-800">
                  Quality First
                </Text>
                <Text className="text-sm text-gray-600">
                  Only the top-rated biryani spots make it to our listings.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 🌟 Our Vision */}
        <View className="bg-primary/10 p-5 rounded-xl mt-6">
          <Text className="text-2xl font-bold text-primary mb-3">Our Vision 🌟</Text>
          <Text className="text-base text-gray-700 leading-6">
            To become India’s most loved and trusted local food discovery platform —
            empowering small restaurants, delighting every foodie, and celebrating
            authentic biryani culture.
          </Text>
        </View>


        {/* 🌿 Authentic Commitment Section */}
        {/* <View className="p-5 rounded-xl mt-2 bg-gray-50">
          <Text className="text-2xl font-bold text-primary mb-3">
            Experience Authentic & Healthy Biryani 🍛
          </Text>
          <Text className="text-base text-gray-700 text-center leading-6">
            Made with only fresh, high-quality ingredients in clean, hygienic conditions.
            We ensure purity, natural flavors, and zero compromise on your health.
          </Text>

        </View> */}
          <View className="mt-5 gap-4 px-4">
            <View className="flex-row items-center gap-3">
              <Utensils color="#22bbe5ff"/>
              <Text className="text-base text-gray-800">Clean Kitchen</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Leaf color="#52cc10ff"/>
              <Text className="text-base text-gray-800">100% Natural Ingredients</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Milk color='#cfa51eff'/>
              <Text className="text-base text-gray-800">Pure & Home-Grind Materials</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <TriangleAlert color="#d52d2dc0"/>
              <Text className="text-base text-gray-800">No Artificial Additives</Text>
            </View>
          </View>
        <View className="mt-6 border-t border-gray-300 pt-3 ">
          {/* Our Commitment */}
          <View className="">
            <Text className="text-lg font-bold text-gray-800 mb-1">
              Our Commitment:
            </Text>
            <Text className="text-sm text-red-600 leading-5">
              • No stored chicken.{"\n"}
              • No pre-packaged chili, turmeric, or ginger-garlic paste.{"\n"}
              • Every spice is freshly home-ground for purity and taste.
            </Text>
          </View>

          <View className="mt-4">
            <Text className="text-lg font-bold text-green-800 text-center">
              ALL MATERIALS ARE PURE AND HOME GRIND
            </Text>
            <Text className="text-sm text-gray-600 text-center mt-2 leading-5">
              For your health and safety, every utensil is thoroughly washed and
              sanitized with hot water.
            </Text>
          </View>
        </View>



        {/* 🔥 Footer */}
        <View className="mt-10 mb-4">
          <Text className="text-center text-gray-500 text-sm">
            Prepared & Marketed by
          </Text>
          <Text className="text-center text-xl font-extrabold text-[#ac1e24]">
            HAPPY BIRYANI
          </Text>
          <Text className="text-center text-gray-600 text-base mt-1 font-semibold">
            📞 To order call: 8499 007 009
          </Text>
          <Text className="text-center text-gray-500 text-xs mt-2">
            © 2025 Happy Biryani — All Rights Reserved
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default About;