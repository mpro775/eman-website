import api from './api';

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface UploadOptions {
  maxSize?: number; // in bytes, default 10MB
  allowedTypes?: string[]; // default ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  folder?: string; // optional folder path
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10MB
const DEFAULT_ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

/**
 * Upload image file to server
 * Supports both File object and base64 string
 */
export const uploadImage = async (
  file: File | string,
  options: UploadOptions = {}
): Promise<UploadResponse> => {
  const {
    maxSize = DEFAULT_MAX_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    folder,
  } = options;

  let fileToUpload: File;
  let isBase64 = false;

  // Handle base64 string
  if (typeof file === 'string') {
    isBase64 = true;
    // Convert base64 to File object
    const response = await fetch(file);
    const blob = await response.blob();
    const filename = `image_${Date.now()}.${blob.type.split('/')[1] || 'jpg'}`;
    fileToUpload = new File([blob], filename, { type: blob.type });
  } else {
    fileToUpload = file;
  }

  // Validate file type
  if (!allowedTypes.includes(fileToUpload.type)) {
    throw new Error(
      `نوع الملف غير مدعوم. الأنواع المدعومة: ${allowedTypes.join(', ')}`
    );
  }

  // Validate file size
  if (fileToUpload.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    throw new Error(`حجم الملف كبير جداً. الحد الأقصى: ${maxSizeMB} MB`);
  }

  // Create FormData
  const formData = new FormData();
  formData.append('file', fileToUpload);
  if (folder) {
    formData.append('folder', folder);
  }

  try {
    // Try to upload to backend
    const response = await api.post<{ data: UploadResponse }>(
      '/upload/image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 seconds timeout for large files
      }
    );

    return response.data.data;
  } catch (error: any) {
    // If upload endpoint doesn't exist, fallback to base64
    if (error.response?.status === 404 || error.response?.status === 501) {
      // Return base64 URL as fallback
      if (isBase64) {
        return {
          url: file as string,
          filename: fileToUpload.name,
          size: fileToUpload.size,
          mimetype: fileToUpload.type,
        };
      }

      // Convert File to base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            url: reader.result as string,
            filename: fileToUpload.name,
            size: fileToUpload.size,
            mimetype: fileToUpload.type,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(fileToUpload);
      });
    }

    throw error;
  }
};

/**
 * Validate image file before upload
 */
export const validateImageFile = (
  file: File,
  options: UploadOptions = {}
): { valid: boolean; error?: string } => {
  const {
    maxSize = DEFAULT_MAX_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
  } = options;

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `نوع الملف غير مدعوم. الأنواع المدعومة: ${allowedTypes.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return {
      valid: false,
      error: `حجم الملف كبير جداً. الحد الأقصى: ${maxSizeMB} MB`,
    };
  }

  return { valid: true };
};

