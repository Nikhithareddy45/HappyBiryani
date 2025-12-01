import { Banner, ContactData, Store } from "../types/common";

export const BASE_URL = "https://happy-biryani-backend.coolify.mr-professor.in/api/1";

export const getBanners = async (): Promise<Banner[]> => {
  try {
    const response = await fetch(`${BASE_URL}/banners/`);
    if (!response.ok) throw new Error("Failed to fetch banners");
    const data = await response.json();
    
    return data.results || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

export const getStores = async (): Promise<Store[]> => {
  try {
    const response = await fetch(`${BASE_URL}/stores/`);
    if (!response.ok) throw new Error("Failed to fetch stores");
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching stores:", error);
    return [];
  }
};

export const getStoreById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/stores/${id}/`);
    if (!response.ok) throw new Error("Failed to fetch store details");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching store:", error);
    return null;
  }
};

export const sendContactUs = async (formData: ContactData) => {
  try {
    const payload = {
      name: formData.name,
      phone_number: formData.phone,
      email: formData.email,
      description: formData.message,
    };

    const response = await fetch(`${BASE_URL}/contact-us/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("Error Body:", errorData);
      throw new Error(errorData || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};


export const reportIssue = async (formData: ContactData) =>  {
  try {
    const payload = {
      name: formData.name,
      phone_number: formData.phone,
      email: formData.email,
      description: formData.message,
    };


    const response =await fetch(`${BASE_URL}/issue-report/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("Error Body:", errorData);
      throw new Error(errorData || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
