import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { FormInput } from '../../components/forms/FormInput';
import { FormTextarea } from '../../components/forms/FormTextarea';
import { ImageUpload } from '../../components/forms/ImageUpload';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { useUIStore } from '../../../store/ui.store';
import {
  profileService,
  type UpdateProfileDto,
  type SocialLink,
  SOCIAL_PLATFORMS
} from '../../../services/profile.service';
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaBehance,
  FaDribbble,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaSnapchat,
  FaPlus,
  FaTrash,
  FaFileUpload,
  FaFilePdf
} from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';

// Icon mapping
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: FaLinkedinIn,
  github: FaGithub,
  twitter: FaTwitter,
  behance: FaBehance,
  dribbble: FaDribbble,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
  telegram: FaTelegram,
  snapchat: FaSnapchat,
};

export const ProfileEdit = () => {
  const { showToast } = useUIStore();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  const [formData, setFormData] = useState<UpdateProfileDto>({
    fullName: '',
    title: '',
    bio: '',
    profileImage: '',
    cvFile: '',
    email: '',
    phone: '',
    socialLinks: [],
    yearsOfExperience: 0,
    certificates: [],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setFetching(true);
    try {
      const data = await profileService.get();
      setFormData({
        fullName: data.fullName || '',
        title: data.title || '',
        bio: data.bio || '',
        profileImage: data.profileImage || '',
        cvFile: data.cvFile || '',
        email: data.email || '',
        phone: data.phone || '',
        socialLinks: data.socialLinks || [],
        yearsOfExperience: data.yearsOfExperience || 0,
        certificates: data.certificates || [],
      });
    } catch (error: any) {
      showToast('فشل تحميل الملف الشخصي', 'error');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await profileService.update(formData);
      showToast('تم تحديث الملف الشخصي بنجاح', 'success');
      fetchProfile();
    } catch (error: any) {
      showToast(error.response?.data?.message || 'حدث خطأ', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCVUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      showToast('يرجى اختيار ملف PDF أو Word', 'error');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('حجم الملف يجب أن لا يتجاوز 5 ميجابايت', 'error');
      return;
    }

    setUploadingCV(true);

    // Convert to data URL (temporary solution until upload endpoint is ready)
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setFormData({ ...formData, cvFile: dataUrl });
      showToast('تم رفع السيرة الذاتية بنجاح', 'success');
      setUploadingCV(false);
    };
    reader.onerror = () => {
      showToast('فشل رفع السيرة الذاتية', 'error');
      setUploadingCV(false);
    };
    reader.readAsDataURL(file);
  };

  const addSocialLink = (platformId: string) => {
    const platform = SOCIAL_PLATFORMS.find(p => p.id === platformId);
    if (!platform) return;

    // Check if platform already exists
    if (formData.socialLinks?.some(link => link.platform === platformId)) {
      showToast('هذه المنصة مضافة بالفعل', 'error');
      return;
    }

    const newLink: SocialLink = {
      platform: platformId,
      url: '',
      icon: platform.icon,
    };

    setFormData({
      ...formData,
      socialLinks: [...(formData.socialLinks || []), newLink],
    });
    setShowPlatformPicker(false);
  };

  const updateSocialLink = (index: number, url: string) => {
    const updatedLinks = [...(formData.socialLinks || [])];
    updatedLinks[index] = { ...updatedLinks[index], url };
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const removeSocialLink = (index: number) => {
    const updatedLinks = [...(formData.socialLinks || [])];
    updatedLinks.splice(index, 1);
    setFormData({ ...formData, socialLinks: updatedLinks });
  };

  const getAvailablePlatforms = () => {
    const usedPlatforms = formData.socialLinks?.map(link => link.platform) || [];
    return SOCIAL_PLATFORMS.filter(p => !usedPlatforms.includes(p.id));
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[color:var(--color-admin-text-primary)] mb-6">
        إدارة الملف الشخصي
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <h2 className="text-xl font-semibold text-[color:var(--color-admin-text-primary)] mb-4">
            المعلومات الشخصية
          </h2>
          <div className="space-y-4">
            <ImageUpload
              label="الصورة الشخصية"
              value={formData.profileImage || ''}
              onChange={(url) => setFormData({ ...formData, profileImage: url })}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="الاسم الكامل"
                value={formData.fullName || ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
              <FormInput
                label="المسمى الوظيفي"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <FormTextarea
              label="نبذة تعريفية"
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="البريد الإلكتروني"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <FormInput
                label="رقم الهاتف"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+966 5x xxx xxxx"
              />
            </div>
            <FormInput
              label="سنوات الخبرة"
              type="number"
              min={0}
              value={formData.yearsOfExperience?.toString() || '0'}
              onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
            />
          </div>
        </Card>

        {/* CV Upload */}
        <Card>
          <h2 className="text-xl font-semibold text-[color:var(--color-admin-text-primary)] mb-4">
            السيرة الذاتية
          </h2>
          <div className="space-y-4">
            {formData.cvFile ? (
              <div className="flex items-center justify-between p-4 bg-[color:var(--color-admin-bg-tertiary)] rounded-lg border border-[color:var(--color-admin-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                    <FaFilePdf className="text-red-500 text-xl" />
                  </div>
                  <div>
                    <p className="text-[color:var(--color-admin-text-primary)] font-medium">
                      السيرة الذاتية
                    </p>
                    <a
                      href={formData.cvFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[color:var(--color-admin-accent-blue)] hover:underline"
                    >
                      عرض الملف
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, cvFile: '' })}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[color:var(--color-admin-border)] rounded-lg cursor-pointer hover:border-[color:var(--color-admin-accent-blue)] transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCVUpload}
                  className="hidden"
                  disabled={uploadingCV}
                />
                {uploadingCV ? (
                  <LoadingSpinner size="md" />
                ) : (
                  <>
                    <FaFileUpload className="text-4xl text-[color:var(--color-admin-text-muted)] mb-3" />
                    <p className="text-[color:var(--color-admin-text-primary)] font-medium mb-1">
                      اضغط لرفع السيرة الذاتية
                    </p>
                    <p className="text-sm text-[color:var(--color-admin-text-muted)]">
                      PDF أو Word (حد أقصى 5 ميجابايت)
                    </p>
                  </>
                )}
              </label>
            )}
          </div>
        </Card>

        {/* Social Links */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[color:var(--color-admin-text-primary)]">
              روابط التواصل الاجتماعي
            </h2>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPlatformPicker(!showPlatformPicker)}
                className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-colors"
                disabled={getAvailablePlatforms().length === 0}
              >
                <FaPlus />
                <span>إضافة منصة</span>
              </button>

              {/* Platform Picker Dropdown */}
              {showPlatformPicker && (
                <>
                  {/* Backdrop to close on click outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowPlatformPicker(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 w-64 bg-[color:var(--color-admin-bg-secondary)] border border-[color:var(--color-admin-border)] rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {getAvailablePlatforms().map((platform) => {
                        const Icon = ICON_MAP[platform.id];
                        return (
                          <button
                            key={platform.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addSocialLink(platform.id);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[color:var(--color-admin-bg-tertiary)] transition-colors"
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: platform.color }}
                            >
                              {Icon && <Icon className="text-sm" />}
                            </div>
                            <span className="text-[color:var(--color-admin-text-primary)]">
                              {platform.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Social Links List */}
          <div className="space-y-3">
            {formData.socialLinks && formData.socialLinks.length > 0 ? (
              formData.socialLinks.map((link, index) => {
                const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
                const Icon = ICON_MAP[link.platform];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-[color:var(--color-admin-bg-tertiary)] rounded-lg border border-[color:var(--color-admin-border)]"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: platform?.color || '#666' }}
                    >
                      {Icon && <Icon />}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-[color:var(--color-admin-text-secondary)] mb-1">
                        {platform?.name || link.platform}
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateSocialLink(index, e.target.value)}
                        placeholder={`https://${link.platform}.com/username`}
                        className="w-full px-3 py-2 bg-[color:var(--color-admin-bg-primary)] border border-[color:var(--color-admin-border)] rounded-lg text-[color:var(--color-admin-text-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-admin-accent-blue)]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <HiXMark className="text-xl" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-[color:var(--color-admin-text-muted)]">
                <p>لا توجد روابط تواصل اجتماعي</p>
                <p className="text-sm mt-1">اضغط على "إضافة منصة" لإضافة روابطك</p>
              </div>
            )}
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[color:var(--color-admin-accent-blue)] text-white rounded-lg hover:bg-[#3A8EFF] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            disabled={loading}
          >
            {loading && <LoadingSpinner size="sm" />}
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
};
