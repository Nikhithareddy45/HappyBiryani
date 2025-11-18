import { BackButton } from '@/components/ui/BackButton';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/TextArea';
import { reportIssue } from '../services/api';
import { ContactData } from '../types/common';


export default function ReportIssueScreen() {
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
      newErrors.message = 'Please describe the issue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await reportIssue(formData);
      Alert.alert(
        'Success',
        'Your issue has been reported successfully! We will get back to you soon.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      Alert.alert('Error', 'Failed to report issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6">
        <View className="items-center gap-2 flex-row">
          <BackButton />
          <Text className="text-2xl font-bold text-primary mb-2 ">Report Issue</Text>
        </View>
        <Text className="text-gray-600 mb-6">
          Help us improve by reporting any issues you have encountered.
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
            label="Issue Details"
            placeholder="Please describe the issue in detail"
            value={formData.message}
            onChangeText={(text) => setFormData({ ...formData, message: text })}
            lines={6}
            error={errors.message}
          />

          <Button
            title="Submit Report"
            onPress={handleSubmit}
            loading={loading}
          />
        </View>

        <View className="bg-secondary/10 rounded-xl p-4 mt-6">
          <Text className="text-sm text-gray-700">
            💡 <Text className="font-semibold">Tip:</Text> Please provide as much detail as possible
            to help us resolve the issue quickly. Include information like store name, date, and
            specific problems you encountered.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
