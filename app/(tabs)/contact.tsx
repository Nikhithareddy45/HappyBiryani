import { BackButton } from '@/components/ui/BackButton';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { TextArea } from '../../components/ui/TextArea';
import { sendContactUs } from '../../services/api';
import { ContactData } from '../../types/common';


export default function ContactScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactData>>({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const validate = () => {
    const newErrors: Partial<ContactData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await sendContactUs(formData);
      Alert.alert('Success', 'Your message has been sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <View className="items-center gap-2 flex-row">
          <BackButton />
          <Text className="text-2xl font-bold text-primary mb-2 ">Contact Us</Text>
        </View>
        <Text className="text-gray-600 mb-6">
          We would love to hear from you. Send us a message!
        </Text>

        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Input
            label="Name"
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            error={errors.name}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            maxLength={10}
            error={errors.phone}
          />

          <TextArea
            label="Message"
            placeholder="Enter your message"
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            lines={5}
            error={errors.message}
          />

          <Button
            title="Submit"
            onPress={handleSubmit}
            loading={loading}
            className="mb-3"
          />

          <Button
            title="Report an Issue"
            outline
            onPress={() => router.push('/reportIssue')}
          />
        </View>

        <View className="bg-white rounded-xl p-6 mt-6 shadow-sm">
          <Text className="text-xl font-bold text-primary mb-4">Get in Touch</Text>

          <View className="flex-row items-center mb-3">
            <Text className="text-xl mr-3">📧</Text>
            <Text className="text-base text-gray-700">contact@happybiryani.com</Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Text className="text-xl mr-3">📞</Text>
            <Text className="text-base text-gray-700">+91 1800-XXX-XXXX</Text>
          </View>

          <View className="flex-row items-start">
            <Text className="text-xl mr-3">📍</Text>
            <Text className="text-base text-gray-700 flex-1">
              HappyBiryani Head Office{'\n'}
              Hyderabad, Telangana, India
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
