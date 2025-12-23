import api from './api';
import type { ApiResponse } from '../types/api.types';

// Social link interface matching the backend
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

// Certificate interface matching the backend
export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

// Profile interface matching the backend schema
export interface Profile {
  _id: string;
  fullName: string;
  title: string;
  bio: string;
  profileImage?: string;
  cvFile?: string;
  email: string;
  phone?: string;
  socialLinks: SocialLink[];
  yearsOfExperience: number;
  certificates: Certificate[];
  createdAt: string;
  updatedAt: string;
}

// Update DTO matching the backend
export interface UpdateProfileDto {
  fullName?: string;
  title?: string;
  bio?: string;
  profileImage?: string;
  cvFile?: string;
  email?: string;
  phone?: string;
  socialLinks?: SocialLink[];
  yearsOfExperience?: number;
  certificates?: Certificate[];
}

// Available social media platforms
export const SOCIAL_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', icon: 'FaLinkedinIn', color: '#0A66C2' },
  { id: 'github', name: 'GitHub', icon: 'FaGithub', color: '#181717' },
  { id: 'twitter', name: 'Twitter/X', icon: 'FaTwitter', color: '#1DA1F2' },
  { id: 'behance', name: 'Behance', icon: 'FaBehance', color: '#1769FF' },
  { id: 'dribbble', name: 'Dribbble', icon: 'FaDribbble', color: '#EA4C89' },
  { id: 'instagram', name: 'Instagram', icon: 'FaInstagram', color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', icon: 'FaFacebookF', color: '#1877F2' },
  { id: 'youtube', name: 'YouTube', icon: 'FaYoutube', color: '#FF0000' },
  { id: 'tiktok', name: 'TikTok', icon: 'FaTiktok', color: '#000000' },
  { id: 'whatsapp', name: 'WhatsApp', icon: 'FaWhatsapp', color: '#25D366' },
  { id: 'telegram', name: 'Telegram', icon: 'FaTelegram', color: '#0088CC' },
  { id: 'snapchat', name: 'Snapchat', icon: 'FaSnapchat', color: '#FFFC00' },
] as const;

export const profileService = {
  async get(): Promise<Profile> {
    const response = await api.get<ApiResponse<Profile>>('/profile');
    return response.data.data;
  },

  async update(data: UpdateProfileDto): Promise<Profile> {
    const response = await api.put<ApiResponse<Profile>>('/profile', data);
    return response.data.data;
  },

  async uploadCV(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post<ApiResponse<{ url: string }>>('/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.url;
  },
};
