import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

interface ProductImageUploadProps {
  productId: string;
  currentImages: string[];
  onImagesUpdate: (images: string[]) => void;
  maxImages?: number;
}

export default function ProductImageUpload({ 
  productId, 
  currentImages, 
  onImagesUpdate,
  maxImages = 5 
}: ProductImageUploadProps) {
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(currentImages);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      showToast('error', `Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          showToast('error', 'Only image files are allowed');
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          showToast('error', 'Image size must be less than 5MB');
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}/${Date.now()}_${i}.${fileExt}`;
        const filePath = `products/${fileName}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      const updatedImages = [...images, ...uploadedUrls];
      setImages(updatedImages);
      onImagesUpdate(updatedImages);
      
      showToast('success', `${uploadedUrls.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      showToast('error', 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    
    setImages(updatedImages);
    onImagesUpdate(updatedImages);

    // Optionally delete from storage
    try {
      const fileName = imageToRemove.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('product-images')
          .remove([`products/${fileName}`]);
      }
      showToast('success', 'Image removed');
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  const handleSetPrimary = (index: number) => {
    const reordered = [images[index], ...images.filter((_, i) => i !== index)];
    setImages(reordered);
    onImagesUpdate(reordered);
    showToast('success', 'Primary image updated');
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
              Product Images
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {images.length} / {maxImages} images
            </p>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-xl overflow-hidden group"
          >
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              {index === 0 && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                  Primary
                </div>
              )}
              {index !== 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSetPrimary(index)}
                  className="p-2 bg-white rounded-full shadow-lg"
                  title="Set as primary"
                >
                  <Check className="w-4 h-4 text-stone-700" />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRemoveImage(index)}
                className="p-2 bg-red-500 text-white rounded-full shadow-lg"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}

        {/* Upload Button */}
        {images.length < maxImages && (
          <label className="relative aspect-square rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-600 flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 gradient-bg"></div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-stone-400 mb-2" />
                <span className="text-sm text-stone-500 dark:text-stone-400 text-center px-2">
                  Upload Image
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {/* Help Text */}
      <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
        <p className="text-xs text-stone-600 dark:text-stone-400">
          💡 <strong>Tips:</strong> Upload high-quality images (min 800x800px). First image will be the primary image. 
          Supported formats: JPG, PNG, WebP. Max size: 5MB per image.
        </p>
      </div>
    </div>
  );
}
